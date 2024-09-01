import { useAppStore } from "./store";
import useGetFavoriteMovies from "./useGetFavoriteMovies";
import { transformMovieEntry } from "./useQueryMovieById";

export default function useFavoriteMovies() {
  const favoriteMovieIds = useAppStore((store) =>
    Object.keys(store.favoritedMovieIds)
  );

  const queries = useGetFavoriteMovies(favoriteMovieIds);

  return {
    movies: queries
      .filter((query) => !query.isError && query.data)
      .map((query) => transformMovieEntry(query.data) || []),
    isPending: queries.some((query) => query.isPending),
    isError: queries.some((query) => query.isError),
    ...queries,
  };
}
