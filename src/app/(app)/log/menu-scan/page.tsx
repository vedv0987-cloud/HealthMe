"use client";

import { useState } from "react";
import { Camera, ScanLine, Check, AlertTriangle, Sparkles, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type MenuItem = { name: string; calories: string; protein: string; rating: "great" | "good" | "splurge"; note: string };

const mockResults: MenuItem[] = [
  { name: "Grilled Paneer Tikka", calories: "280-320", protein: "22g", rating: "great", note: "High protein, fits your goals" },
  { name: "Dal Makhani", calories: "350-400", protein: "14g", rating: "good", note: "Good protein, moderate fat from cream" },
  { name: "Butter Naan", calories: "300-350", protein: "7g", rating: "splurge", note: "High calories, consider plain roti instead" },
  { name: "Chicken Biryani", calories: "500-600", protein: "28g", rating: "good", note: "Good protein but high calories — consider half plate" },
  { name: "Gulab Jamun (2 pcs)", calories: "300-350", protein: "3g", rating: "splurge", note: "Very high sugar — consider sharing or skipping" },
];

const ratingConfig = {
  great: { label: "Great Choice", color: "bg-emerald-500/10 text-emerald-700", icon: Check },
  good: { label: "Good Option", color: "bg-amber-500/10 text-amber-700", icon: Sparkles },
  splurge: { label: "Splurge", color: "bg-rose-500/10 text-rose-700", icon: AlertTriangle },
};

export default function MenuScanPage() {
  const [scanned, setScanned] = useState(false);

  return (
    <div className="space-y-6">
      <h1 className="font-heading text-2xl font-bold flex items-center gap-2">
        <ScanLine className="size-6 text-violet-500" />
        Menu Scanner
      </h1>
      <p className="text-sm text-muted-foreground">Scan a restaurant menu to get AI nutrition estimates and personalized recommendations.</p>

      {!scanned ? (
        <div className="space-y-4">
          <div className="aspect-[4/3] rounded-2xl bg-muted/50 border-2 border-dashed border-muted-foreground/20 flex flex-col items-center justify-center">
            <Camera className="size-12 text-muted-foreground/30 mb-3" />
            <p className="text-sm text-muted-foreground">Point camera at restaurant menu</p>
            <p className="text-xs text-muted-foreground mt-1">Align the menu page within the frame</p>
          </div>
          <Button className="w-full h-12" onClick={() => setScanned(true)}>
            <Camera className="size-4 mr-2" />
            Scan Menu (Demo)
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-500/10">
            <Check className="size-4 text-emerald-600" />
            <p className="text-sm font-medium text-emerald-700">5 dishes detected from menu</p>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1">
            {["Recommended", "Lowest Cal", "Highest Protein"].map((sort, i) => (
              <button key={sort} className={cn("px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap", i === 0 ? "bg-primary text-white" : "bg-muted text-muted-foreground")}>
                {sort}
              </button>
            ))}
          </div>

          {mockResults.map((item) => {
            const config = ratingConfig[item.rating];
            return (
              <Card key={item.name}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-sm font-semibold">{item.name}</h3>
                    <span className={cn("inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full", config.color)}>
                      <config.icon className="size-3" />
                      {config.label}
                    </span>
                  </div>
                  <div className="flex gap-3 text-xs text-muted-foreground mb-2">
                    <span className="font-mono">{item.calories} kcal</span>
                    <span className="font-mono">P: {item.protein}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{item.note}</p>
                  <Button variant="outline" size="sm" className="mt-2 h-7 text-xs">Log this dish</Button>
                </CardContent>
              </Card>
            );
          })}

          <Card className="bg-violet-500/5 border-violet-500/20">
            <CardContent className="flex items-center gap-3 p-3">
              <Bot className="size-5 text-violet-500 shrink-0" />
              <p className="text-xs text-muted-foreground">Ask Ria: &quot;What&apos;s the healthiest combo from this menu?&quot;</p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
