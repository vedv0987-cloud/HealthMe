"use client"

import { cn } from "@/lib/utils"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

interface CalorieDataPoint {
  date: string
  calories: number
  target: number
}

interface CalorieChartProps {
  data: CalorieDataPoint[]
  className?: string
}

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean
  payload?: Array<{ value: number; dataKey: string }>
  label?: string
}) {
  if (!active || !payload?.length) return null

  const calories = payload.find((p) => p.dataKey === "calories")

  return (
    <div className="rounded-lg border bg-background px-3 py-2 shadow-md">
      <p className="text-xs text-muted-foreground">{label}</p>
      {calories && (
        <p className="text-sm font-semibold">
          {calories.value.toLocaleString()} kcal
        </p>
      )}
    </div>
  )
}

export function CalorieChart({ data, className }: CalorieChartProps) {
  if (!data.length) {
    return (
      <div
        className={cn(
          "flex h-[300px] items-center justify-center text-sm text-muted-foreground",
          className
        )}
      >
        No data yet
      </div>
    )
  }

  const targetValue = data[0]?.target ?? 2000

  return (
    <div className={cn("h-[300px] w-full", className)}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 8, right: 8, left: -16, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 12 }}
            className="text-muted-foreground"
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            tick={{ fontSize: 12 }}
            className="text-muted-foreground"
            tickLine={false}
            axisLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine
            y={targetValue}
            stroke="#f97316"
            strokeDasharray="6 4"
            strokeWidth={1.5}
            label={{
              value: "Target",
              position: "insideTopRight",
              fontSize: 11,
              fill: "#f97316",
            }}
          />
          <Bar dataKey="calories" radius={[4, 4, 0, 0]} isAnimationActive>
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={entry.calories >= entry.target ? "#f97316" : "#10B981"}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
