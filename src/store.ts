import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type State = {
  counter: number;
};

type Actions = {
  setCounter: (value: number) => void;
};

export const useAppStore = create<State & Actions>()(
  persist(
    immer((set) => ({
      counter: 0,
      setCounter: (value: number) =>
        set((state) => {
          state.counter = value;
        }),
    })),
    {
      name: "app-storage",
    }
  )
);
