"use client";

import { create } from "zustand";

type UiState = {
  sidebarOpen: boolean;
  activeModal: string | null;
};

type UiActions = {
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  openModal: (modalId: string) => void;
  closeModal: () => void;
};

export const useUiStore = create<UiState & UiActions>()((set) => ({
  sidebarOpen: false,
  activeModal: null,

  toggleSidebar: () =>
    set((state) => ({ sidebarOpen: !state.sidebarOpen })),

  setSidebarOpen: (open) => set({ sidebarOpen: open }),

  openModal: (modalId) => set({ activeModal: modalId }),

  closeModal: () => set({ activeModal: null }),
}));
