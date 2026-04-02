"use client"

import { cn } from "@/lib/utils"
import { animate, useInView, useMotionValue, useTransform } from "framer-motion"
import { useEffect, useRef } from "react"

interface AnimatedCounterProps {
  value: number
  duration?: number
  decimals?: number
  prefix?: string
  suffix?: string
  className?: string
}

export function AnimatedCounter({
  value,
  duration = 1.5,
  decimals = 0,
  prefix,
  suffix,
  className,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const motionValue = useMotionValue(0)
  const rounded = useTransform(motionValue, (latest) =>
    latest.toFixed(decimals)
  )
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      const controls = animate(motionValue, value, {
        duration,
        ease: "easeOut",
      })
      return controls.stop
    }
  }, [isInView, value, duration, motionValue])

  useEffect(() => {
    const unsubscribe = rounded.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = `${prefix ?? ""}${latest}${suffix ?? ""}`
      }
    })
    return unsubscribe
  }, [rounded, prefix, suffix])

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {prefix}
      {(0).toFixed(decimals)}
      {suffix}
    </span>
  )
}
