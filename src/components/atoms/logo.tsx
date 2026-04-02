"use client"

import { cn } from "@/lib/utils"

interface LogoProps {
  size?: "sm" | "md" | "lg"
  className?: string
  showText?: boolean
}

const sizeMap = {
  sm: 24,
  md: 32,
  lg: 48,
} as const

export function Logo({ size = "md", className, showText = false }: LogoProps) {
  const px = sizeMap[size]

  return (
    <div className={cn("inline-flex items-center gap-2", className)}>
      <svg
        width={px}
        height={px}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="HealMe logo"
      >
        {/* Leaf shape forming left side of H */}
        <path
          d="M10 38C10 38 10 18 24 6C20 18 18 26 18 38"
          stroke="#10B981"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        {/* Right stem of H */}
        <path
          d="M30 10V38"
          stroke="#059669"
          strokeWidth="3"
          strokeLinecap="round"
        />
        {/* Heartbeat line forming the crossbar of H */}
        <path
          d="M18 24H22L24 20L26 28L28 24H30"
          stroke="#10B981"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        {/* Small leaf accent */}
        <path
          d="M30 10C34 10 38 14 38 18C34 18 30 14 30 10Z"
          fill="#10B981"
          opacity="0.6"
        />
      </svg>
      {showText && (
        <span
          className={cn(
            "font-heading font-bold text-foreground",
            size === "sm" && "text-base",
            size === "md" && "text-xl",
            size === "lg" && "text-2xl"
          )}
        >
          HealMe
        </span>
      )}
    </div>
  )
}
