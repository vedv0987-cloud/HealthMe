"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { XCircle } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";

const reasons = [
  "Insufficient balance in your account",
  "Your bank declined the transaction",
  "Session timed out during payment",
  "Network issue during processing",
];

export default function CheckoutFailedPage() {
  return (
    <div className="max-w-lg mx-auto text-center space-y-6 pb-8">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
      >
        <XCircle className="size-20 text-destructive mx-auto" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h1 className="font-heading text-2xl font-bold">
          Payment didn&apos;t go through
        </h1>
        <p className="text-sm text-muted-foreground mt-2">
          Don&apos;t worry — you haven&apos;t been charged. Here&apos;s what
          might have happened:
        </p>
      </motion.div>

      <motion.ul
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-left space-y-2 mx-auto max-w-xs"
      >
        {reasons.map((r) => (
          <li key={r} className="text-sm text-muted-foreground flex items-start gap-2">
            <span className="text-muted-foreground/50 mt-1">&#8226;</span>
            {r}
          </li>
        ))}
      </motion.ul>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="space-y-3"
      >
        <Button
          className="w-full"
          onClick={() => window.history.back()}
        >
          Try Again
        </Button>
        <Link
          href="/upgrade"
          className={buttonVariants({ variant: "outline", className: "w-full" })}
        >
          Try Different Method
        </Link>
        <Button variant="ghost" className="w-full text-muted-foreground">
          Contact Support
        </Button>
      </motion.div>
    </div>
  );
}
