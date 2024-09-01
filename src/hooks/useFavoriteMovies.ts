import { useQueries } from "@tanstack/react-query";
import { useAppStore } from "../store";
import { fetchMovieById, transformMovieEntry } from "./useQueryMovieById";

export default function useFavoriteMovies() {
  const favoriteMovieIds = useAppStore((store) =>
    Object.keys(store.favoritedMovieIds)
  );

  const queries = useQueries({
    queries: favoriteMovieIds.map((imdbId) => ({
      queryKey: ["movie", imdbId],
      queryFn: () => fetchMovieById({ imdbId }),
    })),
  });

  return {
    movies: queries
      .filter((query) => !query.isError && query.data)
      .map((query) => transformMovieEntry(query.data) || []),
    isPending: queries.some((query) => query.isPending),
    isError: queries.some((query) => query.isError),
    ...queries,
  };
}
