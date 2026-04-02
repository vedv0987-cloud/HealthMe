import type { MealType } from "@/types/nutrition";

export const MACRO_COLORS: Record<string, string> = {
  protein: "#8B5CF6",
  carbs: "#F97316",
  fat: "#10B981",
  fiber: "#3B82F6",
};

export const DEFAULT_WATER_TARGET_ML = 2500;

export const DEFAULT_CALORIE_TARGET = 2000;

export const MEAL_TYPE_LABELS: Record<MealType, string> = {
  breakfast: "Breakfast",
  lunch: "Lunch",
  dinner: "Dinner",
  snack: "Snack",
};

export const MEAL_TYPE_ICONS: Record<MealType, string> = {
  breakfast: "Sunrise",
  lunch: "Sun",
  dinner: "Moon",
  snack: "Cookie",
};
