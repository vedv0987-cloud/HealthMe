"use client";

import { motion } from "framer-motion";
import { Heart, Leaf, Droplets, Apple, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const factors = [
  { name: "Fiber Intake", weight: "25%", score: 72, target: "25g/day", current: "18g avg", tip: "Add 1 cup of dal or 2 fruits daily", icon: Leaf, color: "text-emerald-600" },
  { name: "Probiotic Foods", weight: "20%", score: 60, target: "5+ days/week", current: "3 days", tip: "Add curd, idli, or buttermilk to daily meals", icon: Heart, color: "text-violet-600" },
  { name: "Food Diversity", weight: "20%", score: 45, target: "30+ foods/week", current: "18 unique foods", tip: "Try 2 new vegetables and 1 new grain this week", icon: Apple, color: "text-orange-600" },
  { name: "Processed Food Ratio", weight: "20%", score: 80, target: "<20% processed", current: "15% processed", tip: "Great job keeping processed foods low!", icon: Check, color: "text-blue-600" },
  { name: "Hydration", weight: "15%", score: 65, target: "80%+ of target", current: "72% avg", tip: "Drink 2 extra glasses of water daily", icon: Droplets, color: "text-cyan-600" },
];

const overallScore = Math.round(factors.reduce((sum, f) => sum + f.score * parseFloat(f.weight) / 100, 0));

const gutFoods = [
  { category: "High-fiber grains", items: "Oats, bajra, jowar, brown rice", logged: true },
  { category: "Leafy greens", items: "Palak, methi, sarson", logged: false },
  { category: "Fermented foods", items: "Curd, idli, kanji, buttermilk", logged: true },
  { category: "Prebiotic foods", items: "Garlic, onion, banana, asparagus", logged: false },
  { category: "Legumes/dal", items: "Moong, masoor, chana, rajma", logged: true },
  { category: "Colorful veggies", items: "Carrot, beetroot, capsicum, tomato", logged: false },
];

export default function GutHealthPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-heading text-2xl font-bold flex items-center gap-2">
        <Heart className="size-6 text-rose-500" />
        Gut Health Score
      </h1>

      {/* Score Ring */}
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex justify-center">
        <Card className="w-full max-w-xs">
          <CardContent className="p-6 text-center">
            <div className="relative w-32 h-32 mx-auto mb-3">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="none" className="stroke-muted" strokeWidth="8" />
                <circle cx="50" cy="50" r="40" fill="none" className={overallScore >= 60 ? "stroke-emerald-500" : overallScore >= 40 ? "stroke-amber-500" : "stroke-rose-500"} strokeWidth="8" strokeDasharray={`${overallScore * 2.51} 251`} strokeLinecap="round" />
              </svg>
              <span className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold font-mono">{overallScore}</span>
                <span className="text-xs text-muted-foreground">/100</span>
              </span>
            </div>
            <p className="text-sm font-medium">Weekly Gut Health Score</p>
            <p className="text-xs text-muted-foreground mt-1">Based on your food logs this week</p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Factor Breakdown */}
      <div className="space-y-3">
        <h2 className="font-heading text-lg font-semibold">Score Breakdown</h2>
        {factors.map((f) => (
          <Card key={f.name}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <f.icon className={`size-4 ${f.color}`} />
                  <span className="text-sm font-medium">{f.name}</span>
                  <span className="text-[10px] text-muted-foreground">({f.weight})</span>
                </div>
                <span className="text-sm font-bold font-mono">{f.score}</span>
              </div>
              <Progress value={f.score} className="h-1.5 mb-2" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Current: {f.current}</span>
                <span>Target: {f.target}</span>
              </div>
              <p className="text-xs text-primary mt-1">{f.tip}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Gut-Friendly Foods Checklist */}
      <div>
        <h2 className="font-heading text-lg font-semibold mb-3">This Week&apos;s Gut Foods</h2>
        <Card>
          <CardContent className="p-4 space-y-3">
            {gutFoods.map((g) => (
              <div key={g.category} className="flex items-start gap-3">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${g.logged ? "border-emerald-500 bg-emerald-500" : "border-muted-foreground/30"}`}>
                  {g.logged && <Check className="size-3 text-white" />}
                </div>
                <div>
                  <p className={`text-sm font-medium ${g.logged ? "" : "text-muted-foreground"}`}>{g.category}</p>
                  <p className="text-xs text-muted-foreground">{g.items}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
