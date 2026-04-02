"use client";

import { useState } from "react";
import { Camera, ScanLine, ShieldCheck, ShieldAlert, ShieldX, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type Ingredient = { name: string; plain: string; safety: "safe" | "caution" | "avoid"; why: string };

const mockIngredients: Ingredient[] = [
  { name: "Whole Wheat Flour", plain: "Regular atta/wheat", safety: "safe", why: "Natural whole grain ingredient" },
  { name: "Sugar", plain: "Added sugar", safety: "caution", why: "Adds empty calories. Check how high it is in the ingredient list" },
  { name: "Palm Oil", plain: "Cheap cooking oil", safety: "caution", why: "High in saturated fat. Better alternatives: rice bran oil, olive oil" },
  { name: "Salt", plain: "Common salt", safety: "safe", why: "Safe in moderation. WHO recommends <2000mg sodium/day" },
  { name: "Sodium Benzoate (E211)", plain: "Chemical preservative", safety: "caution", why: "Generally safe, but may trigger reactions in sensitive individuals" },
  { name: "Tartrazine (E102)", plain: "Artificial yellow color", safety: "avoid", why: "Linked to hyperactivity in children. Banned in some countries" },
  { name: "TBHQ", plain: "Synthetic antioxidant preservative", safety: "avoid", why: "Petroleum-derived. Possible health concerns with high consumption" },
];

const safetyConfig = {
  safe: { label: "Safe", icon: ShieldCheck, color: "text-emerald-600 bg-emerald-500/10" },
  caution: { label: "Caution", icon: ShieldAlert, color: "text-amber-600 bg-amber-500/10" },
  avoid: { label: "Avoid", icon: ShieldX, color: "text-rose-600 bg-rose-500/10" },
};

export default function IngredientScanPage() {
  const [scanned, setScanned] = useState(false);

  const safeCount = mockIngredients.filter((i) => i.safety === "safe").length;
  const cautionCount = mockIngredients.filter((i) => i.safety === "caution").length;
  const avoidCount = mockIngredients.filter((i) => i.safety === "avoid").length;
  const score = Math.round(((safeCount * 100 + cautionCount * 50) / (mockIngredients.length * 100)) * 100);

  return (
    <div className="space-y-6">
      <h1 className="font-heading text-2xl font-bold flex items-center gap-2">
        <ScanLine className="size-6 text-primary" />
        Ingredient Decoder
      </h1>
      <p className="text-sm text-muted-foreground">Scan ingredient lists on packaged foods to understand what you&apos;re really eating.</p>

      {!scanned ? (
        <div className="space-y-4">
          <div className="aspect-[4/3] rounded-2xl bg-muted/50 border-2 border-dashed border-muted-foreground/20 flex flex-col items-center justify-center">
            <Camera className="size-12 text-muted-foreground/30 mb-3" />
            <p className="text-sm text-muted-foreground">Point camera at ingredient list</p>
          </div>
          <Button className="w-full h-12" onClick={() => setScanned(true)}>
            <Camera className="size-4 mr-2" />
            Scan Ingredients (Demo)
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Clean Score */}
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="relative w-24 h-24 mx-auto mb-3">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="none" className="stroke-muted" strokeWidth="8" />
                  <circle cx="50" cy="50" r="40" fill="none" className={score >= 60 ? "stroke-emerald-500" : score >= 40 ? "stroke-amber-500" : "stroke-rose-500"} strokeWidth="8" strokeDasharray={`${score * 2.51} 251`} strokeLinecap="round" />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-2xl font-bold font-mono">{score}</span>
              </div>
              <p className="text-sm font-medium">Clean Eating Score</p>
              <p className="text-xs text-muted-foreground mt-1">
                {safeCount} safe, {cautionCount} caution, {avoidCount} avoid
              </p>
            </CardContent>
          </Card>

          {avoidCount > 0 && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-500/10">
              <AlertTriangle className="size-4 text-rose-600 shrink-0" />
              <p className="text-xs text-rose-700 dark:text-rose-400">Contains {avoidCount} ingredient(s) to avoid</p>
            </div>
          )}

          {mockIngredients.map((ing) => {
            const config = safetyConfig[ing.safety];
            return (
              <Card key={ing.name}>
                <CardContent className="p-3">
                  <div className="flex items-start justify-between mb-1">
                    <div>
                      <p className="text-sm font-medium">{ing.name}</p>
                      <p className="text-xs text-muted-foreground">{ing.plain}</p>
                    </div>
                    <span className={cn("inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full shrink-0", config.color)}>
                      <config.icon className="size-3" />
                      {config.label}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">{ing.why}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
