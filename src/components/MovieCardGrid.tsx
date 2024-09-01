import { ComponentProps } from "react";
import MovieCard from "./MovieCard";
import styles from "./MovieCardGrid.module.css";

export interface MovieCardGridProps {
  movies: ComponentProps<typeof MovieCard>["movie"][];
}

export default function MovieCardGrid({ movies }: MovieCardGridProps) {
  return (
    <div className={styles.moviesGrid}>
      {movies.map((movie) => (
        <MovieCard key={movie.imdbID} movie={movie} />
      ))}
    </div>
  );
}
