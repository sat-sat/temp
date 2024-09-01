import { Alert, Loader } from "@mantine/core";
import { IconExclamationCircleFilled } from "@tabler/icons-react";
import { useCallback, useState } from "react";
import { useLocation } from "react-router-dom";
import MovieCard from "./MovieCard";
import styles from "./SearchResultsPage.module.css";
import useQueryMoviesByTitle from "./useQueryMoviesByTitle";

export default function SearchResultsPage() {
  const [page, setPage] = useState(0);
  const location = useLocation();
  const search = location.state?.search;
  const { isPending, isFetching, isError, error, data, isPlaceholderData } =
    useQueryMoviesByTitle({
      title: search,
      page,
    });

  const onMovieCardClick = useCallback((movieId: string) => {
    console.log(`Clicked on movie with ID: ${movieId}`);
  }, []);

  return (
    <div>
      {isPending ? (
        <Loader />
      ) : isError ? (
        <Alert
          variant="light"
          color="red"
          title="Search Error"
          icon={<IconExclamationCircleFilled />}
        >
          {error.message}
        </Alert>
      ) : (
        <div className={styles.moviesGrid}>
          {data.movies.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              movie={movie}
              onClick={onMovieCardClick}
            />
          ))}
        </div>
      )}
      <span>Current Page: {page + 1}</span>
      <button
        onClick={() => setPage((old) => Math.max(old - 1, 0))}
        disabled={page === 0}
      >
        Previous Page
      </button>
      <button
        onClick={() => {
          if (!isPlaceholderData && !data?.error) {
            setPage((old) => old + 1);
          }
        }}
        // Disable the Next Page button until we know a next page is available
        disabled={isPlaceholderData || !!data?.error}
      >
        Next Page
      </button>
      {isFetching ? <span> Loading...</span> : null}
    </div>
  );
}
