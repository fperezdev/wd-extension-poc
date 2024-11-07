import { create } from "zustand";

interface State {
  selectedThreadId: string | null;
  setSelectedThreadId: (threadId: string | null) => void;
}

export const useStore = create<State>()((set) => ({
  selectedThreadId: null,
  setSelectedThreadId: (threadId) =>
    set((state) => ({ ...state, selectedThreadId: threadId })),
}));
