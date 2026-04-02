"use client"

import { cn } from "@/lib/utils"
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

interface WeightDataPoint {
  date: string
  weight: number
}

interface WeightChartProps {
  data: WeightDataPoint[]
  className?: string
}

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean
  payload?: Array<{ value: number }>
  label?: string
}) {
  if (!active || !payload?.length) return null

  return (
    <div className="rounded-lg border bg-background px-3 py-2 shadow-md">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-sm font-semibold">
        {payload[0].value.toFixed(1)} kg
      </p>
    </div>
  )
}

export function WeightChart({ data, className }: WeightChartProps) {
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

  return (
    <div className={cn("h-[300px] w-full", className)}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
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
            domain={["dataMin - 2", "dataMax + 2"]}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="weight"
            stroke="#10B981"
            strokeWidth={2}
            dot={{ fill: "#10B981", r: 4 }}
            activeDot={{ r: 6, fill: "#10B981" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
