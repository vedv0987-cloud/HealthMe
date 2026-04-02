"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface StaggerChildrenProps {
  children: ReactNode
  staggerDelay?: number
  delayChildren?: number
  className?: string
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: (custom: { staggerDelay: number; delayChildren: number }) => ({
    opacity: 1,
    transition: {
      staggerChildren: custom.staggerDelay,
      delayChildren: custom.delayChildren,
    },
  }),
}

export const staggerItemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
}

export function StaggerChildren({
  children,
  staggerDelay = 0.08,
  delayChildren = 0.1,
  className,
}: StaggerChildrenProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      custom={{ staggerDelay, delayChildren }}
      className={cn("", className)}
    >
      {children}
    </motion.div>
  )
}
