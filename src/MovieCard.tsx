import { Image } from "@mantine/core";
import { useCallback } from "react";
import { Movie } from "./types";

export interface MovieProps {
  onClick: (movieId: Movie["imdbID"]) => void;
  movie: Pick<Movie, "imdbID" | "poster">;
}

export default function MovieCard({ onClick, movie }: MovieProps) {
  const _onClick = useCallback(() => {
    onClick(movie.imdbID);
  }, [onClick, movie.imdbID]);

  return (
    <Image onClick={_onClick} fit="cover" radius="md" src={movie.poster} />
  );
}
