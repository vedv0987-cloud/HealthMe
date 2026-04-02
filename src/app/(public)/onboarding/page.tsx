"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  Heart,
  TrendingDown,
  TrendingUp,
  Dumbbell,
  Activity,
  Stethoscope,
  Monitor,
  Footprints,
  Bike,
  Flame,
  Trophy,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/atoms/logo";
import {
  calculateBMR,
  calculateTDEE,
  calculateMacros,
} from "@/lib/calculations/nutrition";

const TOTAL_STEPS = 8;

type OnboardingData = {
  gender: string;
  dateOfBirth: string;
  heightCm: number;
  weightKg: number;
  targetWeightKg: number;
  goal: string;
  activityLevel: string;
  dietaryPreferences: string[];
  cuisinePreferences: string[];
  allergies: string[];
  medicalConditions: string[];
};

const goals = [
  { value: "lose_weight", label: "Lose Weight", icon: TrendingDown, color: "text-rose-500 bg-rose-500/10" },
  { value: "gain_weight", label: "Gain Weight", icon: TrendingUp, color: "text-blue-500 bg-blue-500/10" },
  { value: "build_muscle", label: "Build Muscle", icon: Dumbbell, color: "text-violet-500 bg-violet-500/10" },
  { value: "maintain", label: "Stay Healthy", icon: Heart, color: "text-emerald-500 bg-emerald-500/10" },
  { value: "improve_health", label: "Improve Health", icon: Activity, color: "text-teal-500 bg-teal-500/10" },
  { value: "manage_condition", label: "Manage Condition", icon: Stethoscope, color: "text-amber-500 bg-amber-500/10" },
];

const activityLevels = [
  { value: "sedentary", label: "Sedentary", desc: "Desk job, little or no exercise", icon: Monitor },
  { value: "lightly_active", label: "Lightly Active", desc: "Light exercise 1-3 days/week", icon: Footprints },
  { value: "moderately_active", label: "Moderately Active", desc: "Moderate exercise 3-5 days/week", icon: Bike },
  { value: "very_active", label: "Very Active", desc: "Hard exercise 6-7 days/week", icon: Flame },
  { value: "extra_active", label: "Extra Active", desc: "Athlete / very hard daily training", icon: Trophy },
];

const dietOptions = [
  "None", "Vegetarian", "Vegan", "Eggetarian", "Pescatarian",
  "Keto", "Low Carb", "Mediterranean", "Paleo", "Gluten Free", "Jain", "Sattvic",
];

const cuisineOptions = [
  "North Indian", "South Indian", "Bengali", "Gujarati", "Maharashtrian",
  "Punjabi", "Continental", "Chinese", "Italian", "Mexican", "Japanese", "Thai",
];

const medicalOptions = [
  "None", "Diabetes (Type 1)", "Diabetes (Type 2)", "Thyroid", "PCOS/PCOD",
  "High Blood Pressure", "High Cholesterol", "Heart Disease", "Kidney Issues",
  "Fatty Liver", "IBS/Digestive Issues", "Anemia", "Pregnancy", "Other",
];

const slideVariants = {
  enter: (direction: number) => ({ x: direction > 0 ? 300 : -300, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({ x: direction > 0 ? -300 : 300, opacity: 0 }),
};

function ChipSelector({
  options,
  selected,
  onToggle,
}: {
  options: string[];
  selected: string[];
  onToggle: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => onToggle(opt)}
          className={cn(
            "px-3 py-1.5 rounded-full text-sm font-medium border transition-all",
            selected.includes(opt)
              ? "bg-primary text-white border-primary"
              : "bg-card text-foreground border-border hover:border-primary/50"
          )}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [data, setData] = useState<OnboardingData>({
    gender: "",
    dateOfBirth: "",
    heightCm: 170,
    weightKg: 70,
    targetWeightKg: 65,
    goal: "",
    activityLevel: "",
    dietaryPreferences: [],
    cuisinePreferences: [],
    allergies: [],
    medicalConditions: [],
  });

  function next() {
    if (step < TOTAL_STEPS) {
      setDirection(1);
      setStep((s) => s + 1);
    }
  }

  function back() {
    if (step > 1) {
      setDirection(-1);
      setStep((s) => s - 1);
    }
  }

  function toggleArray(key: keyof OnboardingData, value: string) {
    setData((prev) => {
      const arr = prev[key] as string[];
      return {
        ...prev,
        [key]: arr.includes(value)
          ? arr.filter((v) => v !== value)
          : [...arr, value],
      };
    });
  }

  function finish() {
    router.push("/dashboard");
  }

  // Calculate results for step 8
  const age = data.dateOfBirth
    ? Math.floor(
        (Date.now() - new Date(data.dateOfBirth).getTime()) / 31557600000
      )
    : 25;
  const bmr = calculateBMR(
    data.weightKg,
    data.heightCm,
    age,
    (data.gender === "male" ? "male" : "female") as "male" | "female"
  );
  const tdee = calculateTDEE(
    bmr,
    (data.activityLevel || "moderately_active") as Parameters<typeof calculateTDEE>[1]
  );
  const macros = calculateMacros(
    tdee,
    (data.goal || "maintain") as Parameters<typeof calculateMacros>[1]
  );
  const calorieTarget = Math.round(
    data.goal === "lose_weight"
      ? tdee - 500
      : data.goal === "gain_weight"
        ? tdee + 500
        : data.goal === "build_muscle"
          ? tdee + 300
          : tdee
  );

  function canProceed() {
    switch (step) {
      case 1: return true;
      case 2: return data.gender && data.heightCm > 0;
      case 3: return data.weightKg > 0;
      case 4: return !!data.goal;
      case 5: return !!data.activityLevel;
      case 6: return true;
      case 7: return true;
      case 8: return true;
      default: return true;
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Progress bar */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b px-4 py-3">
        <div className="max-w-lg mx-auto flex items-center gap-3">
          {step > 1 && (
            <button onClick={back} className="p-1 -ml-1">
              <ChevronLeft className="size-5" />
            </button>
          )}
          <div className="flex-1 flex gap-1">
            {Array.from({ length: TOTAL_STEPS }, (_, i) => (
              <div
                key={i}
                className={cn(
                  "h-1.5 flex-1 rounded-full transition-colors",
                  i < step ? "bg-primary" : "bg-muted"
                )}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">
            {step}/{TOTAL_STEPS}
          </span>
        </div>
      </div>

      {/* Step content */}
      <div className="flex-1 flex items-start justify-center px-4 py-8">
        <div className="w-full max-w-lg">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {step === 1 && (
                <div className="text-center space-y-6">
                  <Logo size="lg" />
                  <div>
                    <h1 className="font-heading text-2xl font-bold">
                      Let&apos;s personalize HealMe for you
                    </h1>
                    <p className="text-muted-foreground mt-2">
                      This takes about 2 minutes
                    </p>
                  </div>
                  <div className="flex justify-center">
                    <Sparkles className="size-16 text-primary animate-pulse" />
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <h2 className="font-heading text-xl font-bold">
                    Tell us about yourself
                  </h2>
                  <div>
                    <Label className="text-sm text-muted-foreground mb-2 block">
                      Gender
                    </Label>
                    <div className="grid grid-cols-3 gap-2">
                      {["male", "female", "other"].map((g) => (
                        <button
                          key={g}
                          onClick={() => setData({ ...data, gender: g })}
                          className={cn(
                            "py-3 rounded-xl border text-sm font-medium transition-all capitalize",
                            data.gender === g
                              ? "border-primary bg-primary/10 text-primary"
                              : "border-border"
                          )}
                        >
                          {g}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="dob">Date of birth</Label>
                    <Input
                      id="dob"
                      type="date"
                      className="mt-1"
                      value={data.dateOfBirth}
                      onChange={(e) =>
                        setData({ ...data, dateOfBirth: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label>Height: {data.heightCm} cm</Label>
                    <input
                      type="range"
                      min={100}
                      max={220}
                      value={data.heightCm}
                      onChange={(e) =>
                        setData({ ...data, heightCm: +e.target.value })
                      }
                      className="w-full mt-2 accent-emerald-500"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>100 cm</span>
                      <span>220 cm</span>
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <h2 className="font-heading text-xl font-bold">
                    What&apos;s your current weight?
                  </h2>
                  <div className="text-center">
                    <span className="text-5xl font-bold font-mono">
                      {data.weightKg}
                    </span>
                    <span className="text-xl text-muted-foreground ml-1">
                      kg
                    </span>
                  </div>
                  <input
                    type="range"
                    min={30}
                    max={200}
                    step={0.5}
                    value={data.weightKg}
                    onChange={(e) =>
                      setData({ ...data, weightKg: +e.target.value })
                    }
                    className="w-full accent-emerald-500"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>30 kg</span>
                    <span>200 kg</span>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-6">
                  <h2 className="font-heading text-xl font-bold">
                    What&apos;s your goal?
                  </h2>
                  <div className="grid grid-cols-2 gap-3">
                    {goals.map((g) => (
                      <Card
                        key={g.value}
                        className={cn(
                          "cursor-pointer transition-all",
                          data.goal === g.value && "ring-2 ring-primary"
                        )}
                        onClick={() => setData({ ...data, goal: g.value })}
                      >
                        <CardContent className="p-4 text-center">
                          <div
                            className={cn(
                              "w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-2",
                              g.color
                            )}
                          >
                            <g.icon className="size-5" />
                          </div>
                          <p className="text-sm font-medium">{g.label}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  {(data.goal === "lose_weight" ||
                    data.goal === "gain_weight") && (
                    <div>
                      <Label>Target weight: {data.targetWeightKg} kg</Label>
                      <input
                        type="range"
                        min={30}
                        max={200}
                        step={0.5}
                        value={data.targetWeightKg}
                        onChange={(e) =>
                          setData({
                            ...data,
                            targetWeightKg: +e.target.value,
                          })
                        }
                        className="w-full mt-2 accent-emerald-500"
                      />
                    </div>
                  )}
                </div>
              )}

              {step === 5 && (
                <div className="space-y-4">
                  <h2 className="font-heading text-xl font-bold">
                    How active are you?
                  </h2>
                  {activityLevels.map((a) => (
                    <Card
                      key={a.value}
                      className={cn(
                        "cursor-pointer transition-all",
                        data.activityLevel === a.value && "ring-2 ring-primary"
                      )}
                      onClick={() =>
                        setData({ ...data, activityLevel: a.value })
                      }
                    >
                      <CardContent className="flex items-center gap-3 p-4">
                        <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center shrink-0">
                          <a.icon className="size-5 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold">{a.label}</p>
                          <p className="text-xs text-muted-foreground">
                            {a.desc}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {step === 6 && (
                <div className="space-y-6">
                  <h2 className="font-heading text-xl font-bold">
                    Any dietary preferences?
                  </h2>
                  <div>
                    <Label className="text-sm text-muted-foreground mb-2 block">
                      Diet type
                    </Label>
                    <ChipSelector
                      options={dietOptions}
                      selected={data.dietaryPreferences}
                      onToggle={(v) => toggleArray("dietaryPreferences", v)}
                    />
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground mb-2 block">
                      Favourite cuisines
                    </Label>
                    <ChipSelector
                      options={cuisineOptions}
                      selected={data.cuisinePreferences}
                      onToggle={(v) => toggleArray("cuisinePreferences", v)}
                    />
                  </div>
                </div>
              )}

              {step === 7 && (
                <div className="space-y-6">
                  <h2 className="font-heading text-xl font-bold">
                    Any health conditions?
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    This helps us personalize your experience. All data is
                    private.
                  </p>
                  <ChipSelector
                    options={medicalOptions}
                    selected={data.medicalConditions}
                    onToggle={(v) => toggleArray("medicalConditions", v)}
                  />
                  <div className="flex items-start gap-2 p-3 rounded-xl bg-muted/50 text-sm text-muted-foreground">
                    <ShieldCheck className="size-4 shrink-0 mt-0.5 text-emerald-500" />
                    <p>
                      Your health data is encrypted and never shared. We use it
                      only to give you safe, personalized recommendations.
                    </p>
                  </div>
                </div>
              )}

              {step === 8 && (
                <div className="space-y-6 text-center">
                  <h2 className="font-heading text-xl font-bold">
                    Your personalized plan is ready!
                  </h2>
                  <div className="grid grid-cols-2 gap-3">
                    <Card>
                      <CardContent className="p-4 text-center">
                        <Flame className="size-5 text-orange-500 mx-auto mb-1" />
                        <p className="text-2xl font-bold font-mono">
                          {calorieTarget}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Daily Calories
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 text-center">
                        <div className="w-3 h-3 rounded-full bg-violet-500 mx-auto mb-1" />
                        <p className="text-2xl font-bold font-mono">
                          {macros.proteinG}g
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Protein
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 text-center">
                        <div className="w-3 h-3 rounded-full bg-orange-500 mx-auto mb-1" />
                        <p className="text-2xl font-bold font-mono">
                          {macros.carbsG}g
                        </p>
                        <p className="text-xs text-muted-foreground">Carbs</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 text-center">
                        <div className="w-3 h-3 rounded-full bg-emerald-500 mx-auto mb-1" />
                        <p className="text-2xl font-bold font-mono">
                          {macros.fatG}g
                        </p>
                        <p className="text-xs text-muted-foreground">Fat</p>
                      </CardContent>
                    </Card>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    These targets auto-adjust as you progress
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom button */}
      <div className="sticky bottom-0 bg-background/80 backdrop-blur-sm border-t p-4">
        <div className="max-w-lg mx-auto">
          {step < TOTAL_STEPS ? (
            <Button
              className="w-full h-12 text-base"
              onClick={next}
              disabled={!canProceed()}
            >
              {step === 1 ? "Let's Go" : "Continue"}
            </Button>
          ) : (
            <Button className="w-full h-12 text-base" onClick={finish}>
              Start My Journey!
            </Button>
          )}
          {step >= 6 && step < 8 && (
            <button
              onClick={next}
              className="w-full text-center text-sm text-muted-foreground mt-2 hover:text-foreground"
            >
              Skip
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
