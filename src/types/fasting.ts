export type FastingZone =
  | "fed"
  | "early_fasting"
  | "fat_burning"
  | "ketosis"
  | "deep_ketosis";

export type FastingProtocol = "16:8" | "18:6" | "20:4" | "OMAD" | "custom";

export type FastingState = {
  isActive: boolean;
  protocol: FastingProtocol;
  startedAt: Date;
  targetEndAt: Date;
  elapsedHours: number;
  remainingHours: number;
  progressPercent: number;
  currentZone: FastingZone;
};
