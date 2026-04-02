"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChefHat, Leaf, ScanLine, FileText, Compass, Sun, Heart, Newspaper } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";

const quickAccess = [
  { title: "Recipes", icon: ChefHat, href: "/recipes", color: "text-orange-600 bg-orange-500/10" },
  { title: "Kitchen Pharmacy", icon: Leaf, href: "/discover/kitchen-pharmacy", color: "text-emerald-600 bg-emerald-500/10" },
  { title: "Menu Scanner", icon: ScanLine, href: "/log/menu-scan", color: "text-violet-600 bg-violet-500/10" },
  { title: "Health Report", icon: FileText, href: "/progress/report", color: "text-blue-600 bg-blue-500/10" },
  { title: "Gut Health", icon: Heart, href: "/progress/gut-health", color: "text-rose-600 bg-rose-500/10" },
  { title: "Seasonal", icon: Sun, href: "/discover/seasonal", color: "text-amber-600 bg-amber-500/10" },
];

const feedItems = [
  { type: "research", badge: "Research", color: "bg-blue-500", title: "Eating 2 servings of curd daily reduced Type 2 diabetes risk by 18% in Indian adults", source: "ICMR, 2026" },
  { type: "myth", badge: "Myth Buster", color: "bg-rose-500", title: "Myth: Drinking water during meals causes weight gain. Fact: No evidence supports this.", source: "WHO" },
  { type: "tip", badge: "Expert Tip", color: "bg-violet-500", title: "Eating a fruit between 4-6 PM prevents evening junk cravings", source: "Dr. Rujuta Diwekar" },
  { type: "trending", badge: "Trending", color: "bg-amber-500", title: "Millet revolution — why jowar and bajra are replacing wheat in Indian kitchens", source: "Health Today" },
];

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06 } } };
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

export default function DiscoverPage() {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <motion.div variants={item}>
        <h1 className="font-heading text-2xl font-bold flex items-center gap-2">
          <Compass className="size-6 text-primary" />
          Discover
        </h1>
      </motion.div>

      {/* Seasonal Banner */}
      <motion.div variants={item}>
        <Card className="overflow-hidden bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-0">
          <CardContent className="p-5">
            <p className="text-xs font-medium opacity-80">April 2026</p>
            <h2 className="font-heading text-lg font-bold mt-1">Summer Wellness Guide</h2>
            <p className="text-sm opacity-90 mt-1">Beat the heat with cooling foods, hydration tips, and summer-friendly recipes.</p>
            <Link href="/discover/seasonal" className={buttonVariants({ variant: "secondary", size: "sm", className: "mt-3 bg-white/20 text-white hover:bg-white/30 border-0" })}>
              Explore
            </Link>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Access Grid */}
      <motion.div variants={item}>
        <div className="grid grid-cols-3 gap-3">
          {quickAccess.map((a) => (
            <Link key={a.title} href={a.href}>
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-3 text-center">
                  <div className={`w-10 h-10 rounded-xl ${a.color} flex items-center justify-center mx-auto mb-2`}>
                    <a.icon className="size-5" />
                  </div>
                  <p className="text-xs font-medium">{a.title}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </motion.div>

      {/* Health Feed */}
      <motion.div variants={item}>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-heading text-lg font-semibold flex items-center gap-2">
            <Newspaper className="size-4" />
            Health Feed
          </h2>
          <Link href="/discover/feed" className="text-xs text-primary hover:underline">See all</Link>
        </div>
        <div className="space-y-3">
          {feedItems.map((f, i) => (
            <motion.div key={i} variants={item}>
              <Card>
                <CardContent className="p-4">
                  <span className={`inline-block text-[10px] font-bold text-white px-2 py-0.5 rounded-full ${f.color} mb-2`}>
                    {f.badge}
                  </span>
                  <p className="text-sm font-medium leading-snug">{f.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">{f.source}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
