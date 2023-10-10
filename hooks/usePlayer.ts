import { create } from "zustand";

type PlayerStore = {
  ids: string[];
  activeId?: string;
  setId: (id: string) => void;
  setIds: (ids: string[]) => void;
  reset: () => void;
};

export const usePlayer = create<PlayerStore>(set => ({
  ids: [],
  activeId: undefined,
  setId: id => set({ activeId: id }),
  setIds: ids => set({ ids }),
  reset: () => set({ ids: [] }),
}));
