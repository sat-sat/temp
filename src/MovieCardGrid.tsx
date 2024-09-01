import MovieCard from "./MovieCard";
import styles from "./MovieCardGrid.module.css";
import { Movie } from "./types";

export interface MovieCardGridProps {
  movies: Movie[];
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
