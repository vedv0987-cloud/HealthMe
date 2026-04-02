"use client";

import { useState } from "react";
import { Timer, Play, Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const protocols = [
  { label: "16:8", hours: 16, description: "16h fast, 8h eating" },
  { label: "18:6", hours: 18, description: "18h fast, 6h eating" },
  { label: "20:4", hours: 20, description: "20h fast, 4h eating" },
  { label: "Custom", hours: 0, description: "Set your own" },
];

export default function FastingPage() {
  const [selected, setSelected] = useState("16:8");

  return (
    <div className="space-y-6">
      <h1 className="font-heading text-2xl font-bold">Intermittent Fasting</h1>

      <div className="flex justify-center py-8">
        <div className="relative w-48 h-48">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="42" fill="none" className="stroke-muted" strokeWidth="6" />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <Timer className="size-8 text-muted-foreground mb-1" />
            <p className="text-sm font-medium">Not Fasting</p>
          </div>
        </div>
      </div>

      <Button className="w-full" size="lg">
        <Play className="size-4 mr-2" />
        Start Fast
      </Button>

      <div>
        <h2 className="font-medium text-sm text-muted-foreground mb-3">Select Protocol</h2>
        <div className="grid grid-cols-2 gap-3">
          {protocols.map((p) => (
            <Card
              key={p.label}
              className={cn(
                "cursor-pointer transition-all",
                selected === p.label && "ring-2 ring-primary"
              )}
              onClick={() => setSelected(p.label)}
            >
              <CardContent className="p-4 text-center">
                <p className="font-heading text-lg font-bold">{p.label}</p>
                <p className="text-xs text-muted-foreground">{p.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm flex items-center gap-2">
            <Info className="size-4" />
            What is intermittent fasting?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Intermittent fasting is an eating pattern that cycles between periods of fasting and eating.
            It doesn&apos;t specify which foods to eat but rather when you should eat them.
            Common benefits include weight loss, improved insulin sensitivity, and cellular repair.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm text-muted-foreground">Fasting History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6">
            <Timer className="size-8 text-muted-foreground/30 mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">No fasting sessions yet</p>
            <p className="text-xs text-muted-foreground mt-1">Start your first fast above</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
