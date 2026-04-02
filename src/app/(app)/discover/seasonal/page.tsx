"use client";

import { Sun, Droplets, Shield, Utensils, Thermometer } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const summerTips = [
  { icon: Droplets, title: "Hydration+", desc: "Increase water target by 500ml. Add coconut water, buttermilk, and lemon water to your day." },
  { icon: Thermometer, title: "Cooling Foods", desc: "Cucumber, watermelon, mint, curd, sattu drink — foods that naturally lower body temperature." },
  { icon: Shield, title: "Heat Protection", desc: "Avoid heavy meals 12-3 PM. Eat lighter lunches with salads and raita." },
  { icon: Utensils, title: "Summer Recipes", desc: "Aam panna, chaas, sattu sharbat, kheer with sabja seeds — all under 200 cal." },
];

const seasonalRecipes = [
  { name: "Aam Panna", cal: 85, time: "10 min", tag: "Cooling" },
  { name: "Cucumber Raita", cal: 65, time: "5 min", tag: "Probiotic" },
  { name: "Sattu Sharbat", cal: 120, time: "3 min", tag: "Energy" },
  { name: "Watermelon Mint Salad", cal: 95, time: "5 min", tag: "Hydrating" },
  { name: "Buttermilk (Masala Chaas)", cal: 45, time: "3 min", tag: "Cooling" },
  { name: "Mango Lassi (Low Sugar)", cal: 150, time: "5 min", tag: "Probiotic" },
];

export default function SeasonalWellnessPage() {
  return (
    <div className="space-y-6">
      {/* Hero */}
      <Card className="overflow-hidden bg-gradient-to-br from-amber-400 to-orange-500 text-white border-0">
        <CardContent className="p-6 text-center">
          <Sun className="size-12 mx-auto mb-2 opacity-90" />
          <h1 className="font-heading text-2xl font-bold">Summer Wellness</h1>
          <p className="text-sm opacity-90 mt-1">April — June 2026</p>
          <p className="text-sm opacity-80 mt-2">Beat the heat with cooling foods, smart hydration, and summer-friendly nutrition.</p>
        </CardContent>
      </Card>

      {/* Tips */}
      <div className="space-y-3">
        {summerTips.map((tip) => (
          <Card key={tip.title}>
            <CardContent className="flex items-start gap-3 p-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0">
                <tip.icon className="size-5 text-amber-600" />
              </div>
              <div>
                <p className="text-sm font-semibold">{tip.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{tip.desc}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Seasonal Meal Plan */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">7-Day Summer Meal Plan</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-3">AI-generated plan with cooling foods and optimal hydration for summer.</p>
          <Button className="w-full">Activate Summer Plan</Button>
        </CardContent>
      </Card>

      {/* Recipes */}
      <div>
        <h2 className="font-heading text-lg font-semibold mb-3">Summer Recipes</h2>
        <div className="grid grid-cols-2 gap-3">
          {seasonalRecipes.map((r) => (
            <Card key={r.name} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-3">
                <div className="w-full h-20 rounded-lg bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/20 dark:to-orange-900/20 flex items-center justify-center mb-2">
                  <Utensils className="size-6 text-amber-500/50" />
                </div>
                <p className="text-sm font-medium">{r.name}</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                  <span>{r.cal} kcal</span>
                  <span>{r.time}</span>
                </div>
                <span className="inline-block text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-700 mt-1">{r.tag}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Festival Guides */}
      <div>
        <h2 className="font-heading text-lg font-semibold mb-3">Upcoming Festivals</h2>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm font-medium">Navratri Fasting Guide</p>
            <p className="text-xs text-muted-foreground mt-1">Complete 9-day meal plan with balanced nutrition during fasts.</p>
            <Button variant="outline" size="sm" className="mt-2">Coming Soon</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
