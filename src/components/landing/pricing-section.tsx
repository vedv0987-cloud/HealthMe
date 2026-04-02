"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

const plans = [
  {
    name: "Free",
    monthly: "₹0",
    annual: "₹0",
    period: "forever",
    features: [
      "Basic calorie tracking",
      "5 photo scans/day",
      "Limited food database",
      "Daily summary",
      "Community access",
    ],
    cta: "Get Started Free",
    popular: false,
  },
  {
    name: "Smart",
    monthly: "₹199",
    annual: "₹125",
    annualTotal: "₹1,499/year",
    period: "/month",
    features: [
      "Unlimited photo scans",
      "Full food database (14M+)",
      "Ria AI Coach unlimited",
      "Barcode scanner",
      "Custom macro goals",
      "AI meal plans",
      "Weekly insights",
      "Ad-free",
    ],
    cta: "Start Smart Plan",
    popular: true,
  },
  {
    name: "Pro",
    monthly: "₹999",
    annual: "₹667",
    annualTotal: "₹7,999/year",
    period: "/month",
    features: [
      "Everything in Smart",
      "1 Dedicated Diet Coach",
      "Personalized workouts",
      "Video calls (2/month)",
      "CGM integration",
      "Body composition",
      "Priority support",
    ],
    cta: "Go Pro",
    popular: false,
  },
  {
    name: "Elite",
    monthly: "₹1,999",
    annual: "₹1,333",
    annualTotal: "₹15,999/year",
    period: "/month",
    features: [
      "Everything in Pro",
      "2 Coaches (Diet + Fitness)",
      "Unlimited video calls",
      "CGM device included",
      "Smart Scale included",
      "Blood test panel",
      "Family sharing (4)",
    ],
    cta: "Join Elite",
    popular: false,
  },
];

export function PricingSection() {
  const [annual, setAnnual] = useState(true);

  return (
    <section id="pricing" className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Plans that grow with you
          </h2>
          <div className="inline-flex items-center rounded-full border p-1 gap-1">
            <button
              onClick={() => setAnnual(false)}
              className={cn(
                "px-4 py-1.5 rounded-full text-sm font-medium transition-colors",
                !annual ? "bg-primary text-white" : "text-muted-foreground"
              )}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={cn(
                "px-4 py-1.5 rounded-full text-sm font-medium transition-colors",
                annual ? "bg-primary text-white" : "text-muted-foreground"
              )}
            >
              Annual
              <span className="ml-1 text-xs opacity-80">Save 33%</span>
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={cn(
                "relative rounded-2xl border bg-card p-6 flex flex-col",
                plan.popular && "ring-2 ring-primary shadow-lg"
              )}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full">
                  Most Popular
                </span>
              )}
              <h3 className="font-heading text-lg font-semibold">{plan.name}</h3>
              <div className="mt-3 mb-1">
                <span className="text-3xl font-bold">
                  {annual ? plan.annual : plan.monthly}
                </span>
                {plan.name !== "Free" && (
                  <span className="text-sm text-muted-foreground">/mo</span>
                )}
              </div>
              {annual && plan.annualTotal && (
                <p className="text-xs text-muted-foreground mb-4">
                  {plan.annualTotal}
                </p>
              )}
              {!annual && plan.name === "Free" && (
                <p className="text-xs text-muted-foreground mb-4">forever</p>
              )}

              <ul className="flex-1 space-y-2 my-4">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Check className="size-4 text-emerald-500 mt-0.5 shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/register"
                className={buttonVariants({
                  variant: plan.popular ? "default" : "outline",
                  className: "w-full mt-2",
                })}
              >
                {plan.cta}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
