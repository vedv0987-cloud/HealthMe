"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { UserProfile } from "@/types/user";

type UserState = {
  user: UserProfile | null;
  isLoading: boolean;
};

type UserActions = {
  setUser: (user: UserProfile) => void;
  setLoading: (isLoading: boolean) => void;
  clearUser: () => void;
};

export const useUserStore = create<UserState & UserActions>()(
  persist(
    (set) => ({
      user: null,
      isLoading: false,

      setUser: (user) => set({ user }),
      setLoading: (isLoading) => set({ isLoading }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: "healme-user",
    }
  )
);
