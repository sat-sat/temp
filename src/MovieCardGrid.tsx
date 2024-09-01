import MovieCard from "./MovieCard";
import styles from "./MovieCardGrid.module.css";
import { Movie } from "./types";

export interface MovieCardGridProps {
  onMovieCardClick: (movieId: string) => void;
  movies: Movie[];
}

export default function MovieCardGrid({
  onMovieCardClick,
  movies,
}: MovieCardGridProps) {
  return (
    <div className={styles.moviesGrid}>
      {movies.map((movie) => (
        <MovieCard
          key={movie.imdbID}
          movie={movie}
          onClick={onMovieCardClick}
        />
      ))}
    </div>
  );
}
