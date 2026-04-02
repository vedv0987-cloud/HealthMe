"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Priya S.",
    location: "Mumbai",
    result: "Lost 18 kg in 6 months",
    initials: "PS",
    quote:
      "Finally an app that understands Indian food. I lost 18 kg without giving up dal chawal.",
  },
  {
    name: "Rahul M.",
    location: "Bangalore",
    result: "Lost 12 kg in 4 months",
    initials: "RM",
    quote:
      "Ria's meal suggestions fit my busy IT schedule perfectly. Game changer.",
  },
  {
    name: "Anita K.",
    location: "Delhi",
    result: "Managed PCOS in 8 months",
    initials: "AK",
    quote:
      "My coach helped me manage PCOS through diet alone. My doctor was impressed.",
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-heading text-3xl md:text-4xl font-bold text-center mb-12"
        >
          Real people, real results
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl border bg-card p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 flex items-center justify-center text-sm font-bold">
                  {t.initials}
                </div>
                <div>
                  <p className="font-semibold text-sm">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.location}</p>
                </div>
              </div>
              <span className="inline-block text-xs font-medium px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 mb-3">
                {t.result}
              </span>
              <p className="text-sm text-muted-foreground italic leading-relaxed">
                &ldquo;{t.quote}&rdquo;
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
