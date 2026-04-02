import { cn } from "@/lib/utils"

type MacroType = "protein" | "carbs" | "fat" | "fiber" | "calories"

interface MacroBadgeProps {
  type: MacroType
  value: number
  unit?: string
  className?: string
}

const colorMap: Record<MacroType, string> = {
  protein: "bg-violet-500/15 text-violet-500",
  carbs: "bg-orange-500/15 text-orange-500",
  fat: "bg-emerald-500/15 text-emerald-500",
  fiber: "bg-blue-500/15 text-blue-500",
  calories: "bg-primary/15 text-primary",
}

const labelMap: Record<MacroType, string> = {
  protein: "Protein",
  carbs: "Carbs",
  fat: "Fat",
  fiber: "Fiber",
  calories: "Calories",
}

export function MacroBadge({ type, value, unit, className }: MacroBadgeProps) {
  const resolvedUnit = unit ?? (type === "calories" ? "kcal" : "g")

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium",
        colorMap[type],
        className
      )}
    >
      {labelMap[type]}: {value}
      {resolvedUnit}
    </span>
  )
}
