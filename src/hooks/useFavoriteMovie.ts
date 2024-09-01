import { useAppStore } from "../store";
import { Movie } from "../types";

export default function useFavoriteMovie(imdbId: Movie["imdbID"]) {
  const isFavorite = useAppStore((store) =>
    Boolean(store.favoritedMovieIds[imdbId])
  );
  const setMovieFavoriteStatus = useAppStore(
    (store) => store.setMovieFavoriteStatus
  );

  return {
    isFavorite,
    toggleFavorite: () => {
      setMovieFavoriteStatus(imdbId, !isFavorite);
    },
  };
}
