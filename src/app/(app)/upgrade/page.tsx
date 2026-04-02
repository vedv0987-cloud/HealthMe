"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, ShieldCheck, ArrowRight } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const plans = [
  {
    id: "smart",
    name: "Smart",
    badge: "Most Popular",
    monthly: { inr: 199, usd: 4.99 },
    annual: { inr: 1499, usd: 39.99 },
    monthlyEquiv: { inr: 125, usd: 3.33 },
    features: [
      "Unlimited AI meal scanning",
      "Full 14M+ food database",
      "Ria AI Coach — unlimited",
      "Custom macro goals",
      "AI meal plans",
      "Barcode scanner",
      "Weekly insights report",
      "Ad-free experience",
    ],
    featured: true,
  },
  {
    id: "pro",
    name: "Pro",
    monthly: { inr: 999, usd: 14.99 },
    annual: { inr: 7999, usd: 119.99 },
    monthlyEquiv: { inr: 667, usd: 10 },
    features: [
      "Everything in Smart",
      "1 Dedicated Diet Coach",
      "Personalized workout plans",
      "2 video consultations/month",
      "CGM integration",
      "Body composition tracking",
      "Priority support",
    ],
  },
  {
    id: "elite",
    name: "Elite",
    badge: "Best Value",
    monthly: { inr: 1999, usd: 29.99 },
    annual: { inr: 15999, usd: 249.99 },
    monthlyEquiv: { inr: 1333, usd: 20.83 },
    features: [
      "Everything in Pro",
      "2 Coaches (Diet + Fitness)",
      "Unlimited video calls",
      "CGM device + Smart Scale included",
      "Blood test metabolic panel",
      "Family sharing (4 members)",
    ],
  },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function UpgradePage() {
  const [annual, setAnnual] = useState(true);

  return (
    <div className="space-y-8 pb-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="font-heading text-2xl font-bold">
          Unlock your full potential
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Choose the plan that fits your goals
        </p>
        <span className="inline-block mt-2 text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
          You&apos;re on Free
        </span>
      </motion.div>

      <div className="flex justify-center">
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
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-4"
      >
        {plans.map((plan) => (
          <motion.div key={plan.id} variants={item}>
            <Card
              className={cn(
                "relative overflow-hidden",
                plan.featured && "ring-2 ring-primary"
              )}
            >
              {plan.badge && (
                <span className="absolute top-0 right-0 bg-primary text-white text-xs font-semibold px-3 py-1 rounded-bl-xl">
                  {plan.badge}
                </span>
              )}
              <CardContent className="p-5">
                <div className="flex items-baseline justify-between mb-3">
                  <div>
                    <h3 className="font-heading text-lg font-bold">
                      {plan.name}
                    </h3>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-2xl font-bold font-mono">
                        ₹
                        {annual
                          ? plan.monthlyEquiv.inr
                          : plan.monthly.inr}
                      </span>
                      <span className="text-sm text-muted-foreground">/mo</span>
                    </div>
                    {annual && (
                      <p className="text-xs text-muted-foreground">
                        ₹{plan.annual.inr.toLocaleString()}/year
                      </p>
                    )}
                  </div>
                  <Link
                    href={`/checkout?plan=${plan.id}&billing=${annual ? "annual" : "monthly"}`}
                    className={buttonVariants({
                      variant: plan.featured ? "default" : "outline",
                      className: "shrink-0",
                    })}
                  >
                    Get {plan.name}
                    <ArrowRight className="size-4 ml-1" />
                  </Link>
                </div>
                <ul className="space-y-1.5">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <Check className="size-4 text-emerald-500 mt-0.5 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <Card>
        <CardContent className="flex items-center gap-3 p-4">
          <ShieldCheck className="size-5 text-emerald-500 shrink-0" />
          <div>
            <p className="text-sm font-medium">7-day money-back guarantee</p>
            <p className="text-xs text-muted-foreground">
              Try any plan risk-free. Not satisfied? Full refund, no questions.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
