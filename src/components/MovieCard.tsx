import { Image } from "@mantine/core";
import { useState } from "react";
import { Movie } from "../types";
import styles from "./MovieCard.module.css";
import MovieDetailModal from "./MovieDetailModal";

export interface MovieProps {
  movie: Pick<Movie, "imdbID" | "poster">;
}

export default function MovieCard({ movie }: MovieProps) {
  const [showDetailModal, setShowDetailModal] = useState(false);

  return (
    <>
      {showDetailModal && (
        <MovieDetailModal
          isOpen={showDetailModal}
          setIsOpen={setShowDetailModal}
          movieId={movie.imdbID}
        />
      )}
      <Image
        className={styles.movieCardImage}
        onClick={() => setShowDetailModal(true)}
        fit="cover"
        radius="md"
        src={movie.poster}
        fallbackSrc="https://placehold.co/235x352?text=Movie+poster+is+not+available."
      />
    </>
  );
}
