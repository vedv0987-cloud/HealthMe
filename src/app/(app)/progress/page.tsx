"use client"

import { useState } from "react"
import { TrendingDown, Activity, Scale, Lock } from "lucide-react"
import { cn } from "@/lib/utils"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

const periods = ["7D", "30D", "90D", "1Y"] as const

const stats = [
  { label: "Current", value: "78 kg", icon: Scale },
  { label: "Change", value: "-2.5 kg", icon: TrendingDown },
  { label: "BMI", value: "24.1", icon: Activity },
]

const achievements = [
  { name: "First Meal", description: "Log your first meal" },
  { name: "7-Day Streak", description: "Log meals 7 days in a row" },
  { name: "Hydration Hero", description: "Hit water goal 5 days" },
  { name: "Recipe Master", description: "Try 10 recipes" },
]

export default function ProgressPage() {
  const [period, setPeriod] = useState<string>("7D")

  return (
    <div className="space-y-6 pb-8">
      <div>
        <h1 className="text-2xl font-heading font-bold">Progress & Insights</h1>
        <p className="text-sm text-muted-foreground">
          Track your health journey
        </p>
      </div>

      {/* Period selector */}
      <div className="flex gap-2">
        {periods.map((p) => (
          <button
            key={p}
            onClick={() => setPeriod(p)}
            className={cn(
              "flex-1 rounded-lg py-2 text-sm font-medium transition-colors",
              period === p
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            )}
          >
            {p}
          </button>
        ))}
      </div>

      {/* Weight trend chart placeholder */}
      <Card>
        <CardHeader>
          <CardTitle>Weight Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex h-40 items-center justify-center rounded-lg bg-muted/50">
            <p className="text-sm text-muted-foreground">Weight chart</p>
          </div>
        </CardContent>
      </Card>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.label}>
              <CardContent className="flex flex-col items-center gap-1 pt-4 text-center">
                <Icon className="size-5 text-primary" />
                <p className="text-lg font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Calorie trends chart placeholder */}
      <Card>
        <CardHeader>
          <CardTitle>Calorie Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex h-40 items-center justify-center rounded-lg bg-muted/50">
            <p className="text-sm text-muted-foreground">Calorie chart</p>
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <div>
        <h2 className="mb-3 text-lg font-heading font-semibold">
          Your Achievements
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {achievements.map((a) => (
            <Card key={a.name} className="opacity-60">
              <CardContent className="flex flex-col items-center gap-2 pt-4 text-center">
                <div className="flex size-12 items-center justify-center rounded-full bg-muted">
                  <Lock className="size-5 text-muted-foreground" />
                </div>
                <p className="text-xs font-medium">{a.name}</p>
                <p className="text-[10px] text-muted-foreground">
                  {a.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
