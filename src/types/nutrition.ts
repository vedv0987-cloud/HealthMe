export type MealType = "breakfast" | "lunch" | "dinner" | "snack";

export type MacroBreakdown = {
  proteinG: number;
  carbsG: number;
  fatG: number;
  fiberG: number;
};

export type NutritionSummary = {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
};

export type DailyNutrition = {
  date: string;
  totalCalories: number;
  targetCalories: number;
  totalProtein: number;
  targetProtein: number;
  totalCarbs: number;
  targetCarbs: number;
  totalFat: number;
  targetFat: number;
  totalWater: number;
  targetWater: number;
  meals: MealLogEntry[];
  healthScore: number;
};

export type FoodSearchResult = {
  id: string;
  name: string;
  brand: string | null;
  category: string;
  caloriesPerServing: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
  servingSizeG: number;
  servingUnit: string;
  imageUrl: string | null;
};

export type MealLogEntry = {
  id: string;
  foodName: string;
  mealType: MealType;
  calories: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
  quantity: number;
  photoUrl: string | null;
  loggedAt: Date;
};
