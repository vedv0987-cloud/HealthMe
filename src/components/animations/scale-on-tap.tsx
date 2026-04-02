"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface ScaleOnTapProps {
  children: ReactNode
  className?: string
}

export function ScaleOnTap({ children, className }: ScaleOnTapProps) {
  return (
    <motion.div
      whileTap={{ scale: 0.97 }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className={cn("", className)}
    >
      {children}
    </motion.div>
  )
}
