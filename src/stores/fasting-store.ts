"use client";

import { create } from "zustand";
import type { FastingState } from "@/types/fasting";

type FastingHistoryEntry = FastingState & {
  endedAt: Date;
};

type FastingStoreState = {
  activeSession: FastingState | null;
  history: FastingHistoryEntry[];
};

type FastingActions = {
  startFast: (session: FastingState) => void;
  endFast: () => void;
  cancelFast: () => void;
  setActiveSession: (session: FastingState | null) => void;
};

export const useFastingStore = create<FastingStoreState & FastingActions>()(
  (set, get) => ({
    activeSession: null,
    history: [],

    startFast: (session) => set({ activeSession: session }),

    endFast: () => {
      const { activeSession } = get();
      if (!activeSession) return;

      set((state) => ({
        activeSession: null,
        history: [
          ...state.history,
          { ...activeSession, endedAt: new Date() },
        ],
      }));
    },

    cancelFast: () => set({ activeSession: null }),

    setActiveSession: (session) => set({ activeSession: session }),
  })
);
