"use client";

import { create } from "zustand";
import type { MealLogEntry, DailyNutrition } from "@/types/nutrition";

type NutritionState = {
  selectedDate: Date;
  meals: MealLogEntry[];
  waterIntakeMl: number;
  dailySummary: DailyNutrition | null;
};

type NutritionActions = {
  setSelectedDate: (date: Date) => void;
  addMeal: (meal: MealLogEntry) => void;
  removeMeal: (mealId: string) => void;
  addWater: (ml: number) => void;
  setDailySummary: (summary: DailyNutrition) => void;
  reset: () => void;
};

const initialState: NutritionState = {
  selectedDate: new Date(),
  meals: [],
  waterIntakeMl: 0,
  dailySummary: null,
};

export const useNutritionStore = create<NutritionState & NutritionActions>()(
  (set) => ({
    ...initialState,

    setSelectedDate: (date) => set({ selectedDate: date }),

    addMeal: (meal) =>
      set((state) => ({ meals: [...state.meals, meal] })),

    removeMeal: (mealId) =>
      set((state) => ({
        meals: state.meals.filter((m) => m.id !== mealId),
      })),

    addWater: (ml) =>
      set((state) => ({
        waterIntakeMl: state.waterIntakeMl + ml,
      })),

    setDailySummary: (summary) => set({ dailySummary: summary }),

    reset: () => set(initialState),
  })
);
