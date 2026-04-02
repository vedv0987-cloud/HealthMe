"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function CtaSection() {
  return (
    <section className="py-20 bg-gradient-to-r from-emerald-600 to-emerald-500 dark:from-emerald-800 dark:to-emerald-700">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto px-4 text-center text-white"
      >
        <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
          Start your transformation today
        </h2>
        <p className="text-lg opacity-90 mb-8">
          Join 1M+ Indians who&apos;ve already taken control of their health
        </p>
        <Link
          href="/register"
          className="inline-flex items-center gap-2 bg-white text-emerald-700 font-semibold px-8 py-3 rounded-xl hover:bg-white/90 transition-colors text-base"
        >
          Get Started Free
          <ArrowRight className="size-4" />
        </Link>
      </motion.div>
    </section>
  );
}
