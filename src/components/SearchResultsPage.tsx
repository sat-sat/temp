import {
  Alert,
  Center,
  Group,
  Loader,
  Pagination,
  Text,
  Title,
} from "@mantine/core";
import { IconExclamationCircleFilled } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useQueryMoviesByTitle from "../hooks/useQueryMoviesByTitle";
import { OMDB_API_RESULTS_PER_PAGE } from "../vars";
import MovieCardGrid from "./MovieCardGrid";
import styles from "./SearchResultsPage.module.css";

export default function SearchResultsPage() {
  const [page, setPage] = useState(0);
  const location = useLocation();
  const search = location.state?.search;
  const { isPending, isError, error, data, isPlaceholderData } =
    useQueryMoviesByTitle({
      title: search,
      page,
    });

  useEffect(() => {
    setPage(0);
  }, [search]);

  return (
    <>
      <div>
        {isPending ? (
          <Center>
            <Loader />
          </Center>
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
            <MovieCardGrid movies={data?.movies || []} />
          </>
        )}
        {!data?.movies?.length && !isError && !isPending ? (
          <Text>There are no search results.</Text>
        ) : null}
        {data?.movies?.length ? (
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
        ) : null}
      </div>
    </>
  );
}
