"use client";

import { motion } from "framer-motion";
import {
  Camera,
  Bot,
  Utensils,
  Users,
  BarChart3,
  Trophy,
  type LucideIcon,
} from "lucide-react";

const features: {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
  bg: string;
}[] = [
  {
    icon: Camera,
    title: "Snap & Track",
    description:
      "Point your camera at any meal. Our AI identifies dishes, estimates portions, and logs nutrition in 3 seconds.",
    color: "text-emerald-600",
    bg: "bg-emerald-500/10",
  },
  {
    icon: Bot,
    title: "Ria AI Coach",
    description:
      "Your 24/7 AI nutritionist. Ask anything — meal plans, recipe swaps, what to eat when you're sick.",
    color: "text-violet-600",
    bg: "bg-violet-500/10",
  },
  {
    icon: Utensils,
    title: "Indian Kitchen First",
    description:
      "Dal, biryani, dosa, thali — our database knows your kitchen. Serving sizes in katoris, not cups.",
    color: "text-orange-600",
    bg: "bg-orange-500/10",
  },
  {
    icon: Users,
    title: "Expert Coaches",
    description:
      "Connect with certified nutritionists and fitness trainers who understand your culture and goals.",
    color: "text-emerald-600",
    bg: "bg-emerald-500/10",
  },
  {
    icon: BarChart3,
    title: "Smart Insights",
    description:
      "Weekly reports that actually make sense. Nutrient gaps, eating patterns, and personalized tips.",
    color: "text-violet-600",
    bg: "bg-violet-500/10",
  },
  {
    icon: Trophy,
    title: "Gamified Journey",
    description:
      "Streaks, XP, achievements, and community challenges that make healthy living feel like winning.",
    color: "text-orange-600",
    bg: "bg-orange-500/10",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold">
            Everything you need, nothing you don&apos;t
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: i * 0.1,
                type: "spring",
                stiffness: 300,
                damping: 24,
              }}
              className="rounded-2xl border bg-card p-6 hover:shadow-md transition-shadow"
            >
              <div
                className={`w-12 h-12 rounded-xl ${feature.bg} flex items-center justify-center mb-4`}
              >
                <feature.icon className={`size-6 ${feature.color}`} />
              </div>
              <h3 className="font-heading text-lg font-semibold mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
