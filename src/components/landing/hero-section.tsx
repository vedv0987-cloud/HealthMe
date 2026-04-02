"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="min-h-screen flex items-center pt-20 bg-gradient-to-b from-emerald-50/50 to-background dark:from-emerald-950/20 dark:to-background">
      <div className="max-w-7xl mx-auto px-4 py-12 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-6"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
          >
            Eat Smart.{" "}
            <span className="bg-gradient-to-r from-emerald-500 to-emerald-700 bg-clip-text text-transparent">
              Live Better.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-lg"
          >
            AI-powered nutrition tracking built for Indian diets, loved globally.
            Snap a photo, get instant insights.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-3"
          >
            <Link
              href="/register"
              className={buttonVariants({ size: "lg", className: "text-base px-6 h-11" })}
            >
              Start Free — No Credit Card
              <ArrowRight className="ml-1 size-4" />
            </Link>
            <a
              href="#how-it-works"
              className={buttonVariants({ variant: "outline", size: "lg", className: "text-base px-6 h-11" })}
            >
              <Play className="mr-1 size-4" />
              See How It Works
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap gap-4 text-sm text-muted-foreground pt-2"
          >
            <span className="flex items-center gap-1">
              <span className="font-semibold text-foreground">40M+</span> meals tracked
            </span>
            <span className="flex items-center gap-1">
              <span className="font-semibold text-foreground">4.8★</span> Rating
            </span>
            <span className="flex items-center gap-1">
              <span className="font-semibold text-foreground">Featured</span> by Google
            </span>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="hidden lg:block"
        >
          <div className="relative bg-card rounded-3xl border shadow-xl p-6 max-w-sm mx-auto">
            <div className="text-center mb-4">
              <p className="text-sm text-muted-foreground">Today&apos;s Progress</p>
              <p className="text-3xl font-bold font-heading">1,250</p>
              <p className="text-sm text-muted-foreground">of 2,000 kcal</p>
            </div>
            <div className="w-full h-3 bg-muted rounded-full overflow-hidden mb-6">
              <div className="h-full w-[62%] bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full" />
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Protein", value: "82g", color: "bg-violet-500" },
                { label: "Carbs", value: "156g", color: "bg-orange-500" },
                { label: "Fat", value: "45g", color: "bg-emerald-500" },
              ].map((m) => (
                <div key={m.label} className="text-center">
                  <div className={`w-8 h-1.5 ${m.color} rounded-full mx-auto mb-1`} />
                  <p className="text-xs text-muted-foreground">{m.label}</p>
                  <p className="text-sm font-semibold">{m.value}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
