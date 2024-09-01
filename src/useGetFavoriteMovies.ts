import { useQueries } from "@tanstack/react-query";
import { Movie } from "./types";
import { fetchMovieById } from "./useQueryMovieById";

export default function useGetFavoriteMovies(movieIds: Movie["imdbID"][]) {
  return useQueries({
    queries: movieIds.map((imdbId) => ({
      queryKey: ["movie", imdbId],
      queryFn: () => fetchMovieById({ imdbId }),
    })),
  });
}
