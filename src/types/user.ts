export type ActivityLevel = "sedentary" | "light" | "moderate" | "active" | "very_active";

export type DietaryGoal = "lose_weight" | "maintain" | "gain_muscle" | "improve_health";

export type DietaryPreference =
  | "none"
  | "vegetarian"
  | "vegan"
  | "eggetarian"
  | "pescatarian"
  | "keto"
  | "paleo";

export type SubscriptionTier = "free" | "pro" | "premium";

export type UserProfile = {
  id: string;
  name: string;
  email: string;
  avatarUrl: string | null;
  heightCm: number;
  weightKg: number;
  targetWeightKg: number;
  activityLevel: ActivityLevel;
  dietaryGoal: DietaryGoal;
  dietaryPreference: DietaryPreference;
  dailyCalorieTarget: number;
  dailyProteinG: number;
  dailyCarbsG: number;
  dailyFatG: number;
  dailyWaterMl: number;
  subscriptionTier: SubscriptionTier;
  onboardingCompleted: boolean;
  streakDays: number;
  xpPoints: number;
  level: number;
};

export type OnboardingData = {
  step: number;
  name?: string;
  email?: string;
  heightCm?: number;
  weightKg?: number;
  targetWeightKg?: number;
  activityLevel?: ActivityLevel;
  dietaryGoal?: DietaryGoal;
  dietaryPreference?: DietaryPreference;
  dailyCalorieTarget?: number;
  dailyProteinG?: number;
  dailyCarbsG?: number;
  dailyFatG?: number;
  dailyWaterMl?: number;
};
