"use client"

import { cn } from "@/lib/utils"
import { motion, type Variant } from "framer-motion"
import type { ReactNode } from "react"

interface FadeInProps {
  children: ReactNode
  delay?: number
  duration?: number
  direction?: "up" | "down" | "left" | "right" | "none"
  className?: string
}

const directionOffset: Record<string, { x?: number; y?: number }> = {
  up: { y: 24 },
  down: { y: -24 },
  left: { x: 24 },
  right: { x: -24 },
  none: {},
}

export function FadeIn({
  children,
  delay = 0,
  duration = 0.5,
  direction = "up",
  className,
}: FadeInProps) {
  const offset = directionOffset[direction]

  const initial: Variant = {
    opacity: 0,
    ...offset,
  }

  const animate: Variant = {
    opacity: 1,
    x: 0,
    y: 0,
  }

  return (
    <motion.div
      initial={initial}
      animate={animate}
      transition={{ duration, delay, ease: "easeOut" }}
      className={cn("", className)}
    >
      {children}
    </motion.div>
  )
}
