import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowDown, ArrowUp, type LucideIcon } from "lucide-react"

interface StatCardProps {
  icon: LucideIcon
  label: string
  value: string | number
  trend?: {
    value: number
    positive: boolean
  }
  className?: string
}

export function StatCard({
  icon: Icon,
  label,
  value,
  trend,
  className,
}: StatCardProps) {
  return (
    <Card className={cn("", className)}>
      <CardContent className="flex items-center gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Icon className="size-5" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs text-muted-foreground">{label}</p>
          <div className="flex items-center gap-2">
            <p className="text-lg font-semibold tabular-nums">{value}</p>
            {trend && (
              <span
                className={cn(
                  "inline-flex items-center gap-0.5 text-xs font-medium",
                  trend.positive ? "text-emerald-500" : "text-red-500"
                )}
              >
                {trend.positive ? (
                  <ArrowUp className="size-3" />
                ) : (
                  <ArrowDown className="size-3" />
                )}
                {Math.abs(trend.value)}%
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
