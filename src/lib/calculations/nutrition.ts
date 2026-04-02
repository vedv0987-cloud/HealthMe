export type Gender = "male" | "female";

export type ActivityLevel =
  | "sedentary"
  | "lightly_active"
  | "moderately_active"
  | "very_active"
  | "extra_active";

export type Goal =
  | "lose_weight"
  | "maintain_weight"
  | "gain_weight"
  | "build_muscle";

const ACTIVITY_MULTIPLIERS: Record<ActivityLevel, number> = {
  sedentary: 1.2,
  lightly_active: 1.375,
  moderately_active: 1.55,
  very_active: 1.725,
  extra_active: 1.9,
};

/**
 * Calculate Basal Metabolic Rate using the Mifflin-St Jeor equation.
 */
export function calculateBMR(
  weightKg: number,
  heightCm: number,
  age: number,
  gender: Gender
): number {
  if (gender === "male") {
    return 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
  }
  return 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
}

/**
 * Calculate Total Daily Energy Expenditure from BMR and activity level.
 */
export function calculateTDEE(
  bmr: number,
  activityLevel: ActivityLevel
): number {
  return Math.round(bmr * ACTIVITY_MULTIPLIERS[activityLevel]);
}

/**
 * Calculate Body Mass Index.
 */
export function calculateBMI(weightKg: number, heightCm: number): number {
  const heightM = heightCm / 100;
  return parseFloat((weightKg / (heightM * heightM)).toFixed(1));
}

/**
 * Calculate daily macro targets based on calorie goal and user objective.
 * Returns grams of protein, carbs, fat, and fiber.
 */
export function calculateMacros(
  calories: number,
  goal: Goal
): {
  proteinG: number;
  carbsG: number;
  fatG: number;
  fiberG: number;
} {
  let proteinPct: number;
  let carbsPct: number;
  let fatPct: number;
  let fiberG: number;

  switch (goal) {
    case "lose_weight":
      proteinPct = 0.35;
      carbsPct = 0.35;
      fatPct = 0.3;
      fiberG = 30;
      break;
    case "build_muscle":
      proteinPct = 0.35;
      carbsPct = 0.4;
      fatPct = 0.25;
      fiberG = 30;
      break;
    case "gain_weight":
      proteinPct = 0.25;
      carbsPct = 0.45;
      fatPct = 0.3;
      fiberG = 28;
      break;
    case "maintain_weight":
    default:
      proteinPct = 0.3;
      carbsPct = 0.4;
      fatPct = 0.3;
      fiberG = 25;
      break;
  }

  return {
    proteinG: Math.round((calories * proteinPct) / 4),
    carbsG: Math.round((calories * carbsPct) / 4),
    fatG: Math.round((calories * fatPct) / 9),
    fiberG,
  };
}

/**
 * Calculate daily water intake target in milliliters.
 * Base formula: 35ml per kg of body weight, adjusted for activity level.
 */
export function calculateDailyWaterTarget(
  weightKg: number,
  activityLevel: ActivityLevel
): number {
  const baseWater = weightKg * 35;

  const activityBonus: Record<ActivityLevel, number> = {
    sedentary: 0,
    lightly_active: 300,
    moderately_active: 500,
    very_active: 750,
    extra_active: 1000,
  };

  return Math.round(baseWater + activityBonus[activityLevel]);
}
