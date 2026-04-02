"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface LoadingSpinnerProps {
  size?: number
  className?: string
}

export function LoadingSpinner({ size = 24, className }: LoadingSpinnerProps) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={cn("text-emerald-500", className)}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.2"
      />
      <path
        d="M12 2a10 10 0 0 1 10 10"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </motion.svg>
  )
}
