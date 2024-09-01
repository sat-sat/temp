import { Image } from "@mantine/core";
import { useCallback } from "react";
import styles from "./MovieCard.module.css";
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
    <Image
      className={styles.movieCardImage}
      onClick={_onClick}
      fit="cover"
      radius="md"
      src={movie.poster}
      fallbackSrc="https://placehold.co/235x352?text=Movie+poster+is+not+available."
    />
  );
}
