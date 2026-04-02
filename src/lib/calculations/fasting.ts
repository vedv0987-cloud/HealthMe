export type FastingProtocol =
  | "SIXTEEN_EIGHT"
  | "EIGHTEEN_SIX"
  | "TWENTY_FOUR"
  | "FOURTEEN_TEN"
  | "FIVE_TWO"
  | "CUSTOM";

export type FastingZone = {
  name: string;
  description: string;
};

/**
 * Map a fasting protocol enum to its target fasting hours.
 */
export function getFastingTargetHours(protocol: FastingProtocol): number {
  switch (protocol) {
    case "FOURTEEN_TEN":
      return 14;
    case "SIXTEEN_EIGHT":
      return 16;
    case "EIGHTEEN_SIX":
      return 18;
    case "TWENTY_FOUR":
      return 24;
    case "FIVE_TWO":
      return 24;
    case "CUSTOM":
      return 16; // Default to 16:8 for custom
  }
}

/**
 * Determine the current fasting zone based on elapsed hours.
 * Zones are based on metabolic research on fasting stages.
 */
export function getFastingZone(elapsedHours: number): FastingZone {
  if (elapsedHours < 4) {
    return {
      name: "Fed",
      description:
        "Your body is digesting and absorbing nutrients from your last meal. Insulin levels are elevated.",
    };
  }

  if (elapsedHours < 8) {
    return {
      name: "Early Fasting",
      description:
        "Insulin levels are dropping. Your body is starting to use stored glycogen for energy.",
    };
  }

  if (elapsedHours < 14) {
    return {
      name: "Fat Burning",
      description:
        "Glycogen stores are depleting. Your body is increasingly burning fat for fuel. Growth hormone is rising.",
    };
  }

  if (elapsedHours < 20) {
    return {
      name: "Ketosis",
      description:
        "Your body is producing ketones from fat. Autophagy (cellular cleanup) is beginning. Mental clarity often improves.",
    };
  }

  return {
    name: "Deep Ketosis",
    description:
      "Maximum autophagy and cellular repair. Significant ketone production. Anti-inflammatory benefits are at their peak.",
  };
}

/**
 * Calculate comprehensive fasting progress based on start time and target.
 */
export function calculateFastingProgress(
  startTime: Date,
  targetHours: number
): {
  elapsedHours: number;
  remainingHours: number;
  progressPercent: number;
  currentZone: FastingZone;
} {
  const now = new Date();
  const elapsedMs = now.getTime() - startTime.getTime();
  const elapsedHours = parseFloat((elapsedMs / (1000 * 60 * 60)).toFixed(2));
  const remainingHours = parseFloat(
    Math.max(0, targetHours - elapsedHours).toFixed(2)
  );
  const progressPercent = parseFloat(
    Math.min(100, (elapsedHours / targetHours) * 100).toFixed(1)
  );
  const currentZone = getFastingZone(elapsedHours);

  return {
    elapsedHours,
    remainingHours,
    progressPercent,
    currentZone,
  };
}
