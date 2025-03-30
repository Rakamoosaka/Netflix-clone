"use client";
import React from "react";
import MovieList from "./MovieList";
import useMovieList from "@/hooks/useMovieList";
import useFavorites from "@/hooks/useFavourites";

const MovieListDiv = () => {
  const { data: movies = [] } = useMovieList();
  const { data: favourites = [] } = useFavorites();
  return (
    <div className="pb-40">
      <MovieList title="Trending now" data={movies} />
      <MovieList title="My List" data={favourites} />
    </div>
  );
};

export default MovieListDiv;
