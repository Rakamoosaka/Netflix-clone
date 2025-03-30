"use client";

import React, { useCallback, useMemo } from "react";
import axios from "axios";
import { AiOutlinePlus, AiOutlineCheck } from "react-icons/ai";

import useCurrentUser from "@/hooks/useCurrentUser";
import useFavorites from "@/hooks/useFavourites";

interface FavoriteButtonProps {
  movieId: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movieId }) => {
  const { mutate: mutateFavourites } = useFavorites();
  const { data: currentUser, mutate } = useCurrentUser();

  const isFavourite = useMemo(() => {
    const list = currentUser?.favouriteIds || [];
    return list.includes(movieId);
  }, [currentUser, movieId]);

  const toggleFavourites = useCallback(async () => {
    try {
      let response;
      if (isFavourite) {
        response = await axios.delete("/api/favourite", { data: { movieId } });
      } else {
        response = await axios.post("/api/favourite", { movieId });
      }

      const updatedFavouriteIds = response?.data?.favouriteIds;

      // Update both the currentUser state and the favorites cache
      mutate({ ...currentUser, favouriteIds: updatedFavouriteIds });
      mutateFavourites();
    } catch (error) {
      console.error("Failed to update favourites:", error);
    }
  }, [movieId, isFavourite, currentUser, mutate, mutateFavourites]);

  const Icon = isFavourite ? AiOutlineCheck : AiOutlinePlus;

  return (
    <div
      onClick={toggleFavourites}
      className="cursor-pointer group/item w-6 h-6 lg:w-10  lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300"
    >
      <Icon className="text-white" size={25} />
    </div>
  );
};

export default FavoriteButton;
