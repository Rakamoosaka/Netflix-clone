"use client";

import React from "react";
import { BsFillPlayFill } from "react-icons/bs";
import { useRouter } from "next/navigation";

interface PlayButtonProps {
  movieId: string;
}

const PlayButton: React.FC<PlayButtonProps> = ({ movieId }) => {
  // useRouter is now imported from "next/navigation"
  const router = useRouter();

  return (
    <button
      onClick={() => router.push(`/watch/${movieId}`)}
      className="
        bg-white
        rounded-md
        py-2 md:py-2
        px-2 md:px-4
        w-auto
        text-xs lg:text-lg
        font-semibold
        flex
        flex-row
        items-center
        hover:bg-neutral-300
        transition
        cursor-pointer
      "
    >
      <BsFillPlayFill size={25} className="mr-1" />
      Play
    </button>
  );
};

export default PlayButton;
