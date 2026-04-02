"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle, Camera, Bot, Calendar, ChefHat } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const quickActions = [
  { title: "Scan your first meal", icon: Camera, href: "/log" },
  { title: "Chat with Ria", icon: Bot, href: "/ria" },
  { title: "Set up meal plan", icon: Calendar, href: "/ria" },
  { title: "Browse recipes", icon: ChefHat, href: "/recipes" },
];

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<div className="max-w-lg mx-auto text-center py-8"><Skeleton className="h-20 w-20 rounded-full mx-auto" /><Skeleton className="h-8 w-48 mx-auto mt-4" /></div>}>
      <SuccessContent />
    </Suspense>
  );
}

function SuccessContent() {
  const searchParams = useSearchParams();
  const plan = searchParams.get("plan") || "smart";
  const amount = searchParams.get("amount") || "1499";
  const planName = plan.charAt(0).toUpperCase() + plan.slice(1);

  return (
    <div className="max-w-lg mx-auto text-center space-y-6 pb-8">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
      >
        <CheckCircle className="size-20 text-emerald-500 mx-auto" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h1 className="font-heading text-2xl font-bold">
          Welcome to {planName}!
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Your subscription is active. Let&apos;s make the most of it.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card>
          <CardContent className="p-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Plan</span>
              <span className="font-medium">{planName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Amount paid</span>
              <span className="font-mono font-medium">
                ₹{parseInt(amount).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Status</span>
              <span className="text-emerald-600 font-medium">Active</span>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="grid grid-cols-2 gap-3"
      >
        {quickActions.map((a) => (
          <Link key={a.title} href={a.href}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4 text-center">
                <a.icon className="size-6 text-primary mx-auto mb-2" />
                <p className="text-xs font-medium">{a.title}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </motion.div>

      <Link
        href="/dashboard"
        className={buttonVariants({ className: "w-full" })}
      >
        Go to Dashboard
      </Link>
    </div>
  );
}
