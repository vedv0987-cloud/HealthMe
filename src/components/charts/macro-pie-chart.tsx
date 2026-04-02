"use client"

import { cn } from "@/lib/utils"
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

interface MacroPieChartProps {
  protein: number
  carbs: number
  fat: number
  className?: string
}

const COLORS = {
  Protein: "#8b5cf6",
  Carbs: "#f97316",
  Fat: "#10B981",
} as const

function CustomTooltip({
  active,
  payload,
}: {
  active?: boolean
  payload?: Array<{ name: string; value: number }>
}) {
  if (!active || !payload?.length) return null

  return (
    <div className="rounded-lg border bg-background px-3 py-2 shadow-md">
      <p className="text-sm font-medium">{payload[0].name}</p>
      <p className="text-xs text-muted-foreground">{payload[0].value}g</p>
    </div>
  )
}

export function MacroPieChart({
  protein,
  carbs,
  fat,
  className,
}: MacroPieChartProps) {
  const total = protein + carbs + fat

  const data = [
    { name: "Protein", value: protein },
    { name: "Carbs", value: carbs },
    { name: "Fat", value: fat },
  ]

  if (total === 0) {
    return (
      <div
        className={cn(
          "flex h-[200px] items-center justify-center text-sm text-muted-foreground",
          className
        )}
      >
        No data yet
      </div>
    )
  }

  return (
    <div className={cn("relative h-[200px] w-full", className)}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={80}
            paddingAngle={3}
            dataKey="value"
            strokeWidth={0}
            isAnimationActive
          >
            {data.map((entry) => (
              <Cell
                key={entry.name}
                fill={COLORS[entry.name as keyof typeof COLORS]}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl font-bold tabular-nums">{total}</p>
          <p className="text-xs text-muted-foreground">grams</p>
        </div>
      </div>
    </div>
  )
}
