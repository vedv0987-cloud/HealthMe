"use client";

import { motion } from "framer-motion";
import { Camera, Sparkles, TrendingUp } from "lucide-react";

const steps = [
  {
    step: 1,
    icon: Camera,
    title: "Snap your meal",
    description: "Take a photo or use voice to log what you ate",
  },
  {
    step: 2,
    icon: Sparkles,
    title: "Get instant breakdown",
    description: "AI detects food, calculates calories, protein, carbs, fat",
  },
  {
    step: 3,
    icon: TrendingUp,
    title: "Track & improve",
    description: "See your daily score, get personalized tips from Ria",
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-heading text-3xl md:text-4xl font-bold text-center mb-16"
        >
          3 taps to better health
        </motion.h2>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          <div className="hidden md:block absolute top-12 left-[20%] right-[20%] h-px border-t-2 border-dashed border-muted-foreground/20" />

          {steps.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="flex flex-col items-center text-center relative"
            >
              <div className="w-10 h-10 rounded-full bg-violet-500 text-white flex items-center justify-center text-sm font-bold mb-4 relative z-10">
                {s.step}
              </div>
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-4">
                <s.icon className="size-7 text-emerald-600" />
              </div>
              <h3 className="font-heading text-lg font-semibold mb-2">
                {s.title}
              </h3>
              <p className="text-sm text-muted-foreground max-w-xs">
                {s.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
