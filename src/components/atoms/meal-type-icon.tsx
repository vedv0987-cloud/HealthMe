import { cn } from "@/lib/utils"
import {
  Apple,
  Coffee,
  Cookie,
  Moon,
  Stars,
  Sun,
  Sunrise,
  type LucideIcon,
} from "lucide-react"

interface MealTypeIconProps {
  mealType: string
  size?: number
  className?: string
}

const iconMap: Record<string, LucideIcon> = {
  BREAKFAST: Sunrise,
  MORNING_SNACK: Coffee,
  LUNCH: Sun,
  AFTERNOON_SNACK: Apple,
  DINNER: Moon,
  EVENING_SNACK: Cookie,
  MIDNIGHT_SNACK: Stars,
}

export function MealTypeIcon({
  mealType,
  size = 20,
  className,
}: MealTypeIconProps) {
  const Icon = iconMap[mealType.toUpperCase()] ?? Sun

  return <Icon size={size} className={cn("shrink-0", className)} />
}
