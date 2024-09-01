import { Alert, Group, Loader, Pagination, Title } from "@mantine/core";
import { IconExclamationCircleFilled } from "@tabler/icons-react";
import { useCallback, useState } from "react";
import { useLocation } from "react-router-dom";
import MovieCardGrid from "./MovieCardGrid";
import styles from "./SearchResultsPage.module.css";
import useQueryMoviesByTitle from "./useQueryMoviesByTitle";
import { OMDB_API_RESULTS_PER_PAGE } from "./vars";

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
        <>
          <Title order={3} c="white" mb="md">
            Search results for &ldquo;{search}&rdquo;
          </Title>
          <MovieCardGrid
            movies={data?.movies || []}
            onMovieCardClick={onMovieCardClick}
          />
        </>
      )}
      {data?.movies && (
        <Pagination.Root
          total={Math.floor(data?.totalResults! / OMDB_API_RESULTS_PER_PAGE)}
          value={page}
          onChange={setPage}
          classNames={styles}
          boundaries={2}
        >
          <Group gap={5} justify="center">
            <Pagination.Previous disabled={page === 1} />
            <Pagination.Items />
            <Pagination.Next
              disabled={
                isPlaceholderData ||
                !!data?.error ||
                page * OMDB_API_RESULTS_PER_PAGE + data.movies.length >=
                  data.totalResults
              }
            />
          </Group>
        </Pagination.Root>
      )}
    </div>
  );
}
