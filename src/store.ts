import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type State = {
  favoritedMovieIds: Record<string, boolean>;
};

type Actions = {
  setMovieFavoriteStatus: (imdbId: string, isFavorite: boolean) => void;
};

export const useAppStore = create<State & Actions>()(
  persist(
    immer((set) => ({
      favoritedMovieIds: {},
      setMovieFavoriteStatus: (imdbId, isFavorite) =>
        set((state) => {
          if (isFavorite) {
            state.favoritedMovieIds[imdbId] = isFavorite;
          } else {
            delete state.favoritedMovieIds[imdbId];
          }
        }),
    })),
    {
      name: "app-storage",
    }
  )
);
