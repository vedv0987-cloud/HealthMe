"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Camera,
  Droplets,
  Bot,
  Dumbbell,
  Flame,
  Plus,
  Sun,
  Target,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

const quickActions = [
  { label: "Log Meal", icon: Camera, href: "/log", color: "bg-emerald-500/10 text-emerald-600" },
  { label: "Log Water", icon: Droplets, href: "#", color: "bg-blue-500/10 text-blue-600" },
  { label: "Ask Ria", icon: Bot, href: "/ria", color: "bg-violet-500/10 text-violet-600" },
  { label: "Exercise", icon: Dumbbell, href: "#", color: "bg-orange-500/10 text-orange-600" },
];

const macros = [
  { label: "Protein", current: 82, target: 120, color: "bg-violet-500" },
  { label: "Carbs", current: 156, target: 200, color: "bg-orange-500" },
  { label: "Fat", current: 45, target: 65, color: "bg-emerald-500" },
  { label: "Fiber", current: 18, target: 25, color: "bg-blue-500" },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

export default function DashboardPage() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      <motion.div variants={item}>
        <h1 className="font-heading text-2xl font-bold">
          {getGreeting()}!
        </h1>
        <p className="text-sm text-muted-foreground">
          {new Date().toLocaleDateString("en-IN", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </motion.div>

      {/* Morning Briefing Card */}
      <motion.div variants={item}>
        <Card className="overflow-hidden bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-0">
          <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-3">
              <Sun className="size-5" />
              <p className="text-sm font-medium opacity-90">
                {new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
              </p>
            </div>
            <p className="text-sm opacity-90 mb-3">
              Yesterday you ate 1,742 kcal (94% of target). Protein was strong at 98g. Water was on track at 2,100ml.
            </p>
            <div className="flex items-start gap-2 p-2 rounded-lg bg-white/10 mb-3">
              <Target className="size-4 shrink-0 mt-0.5" />
              <p className="text-sm opacity-95">Try to hit 80g protein today. Add paneer or eggs to lunch.</p>
            </div>
            <div className="flex gap-2">
              <Link href="/log">
                <Button size="sm" className="bg-white/20 text-white hover:bg-white/30 border-0">
                  <Camera className="size-3 mr-1" />Log breakfast
                </Button>
              </Link>
              <Link href="/ria">
                <Button size="sm" className="bg-white/20 text-white hover:bg-white/30 border-0">
                  <Bot className="size-3 mr-1" />Chat with Ria
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={item}>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Calories Today
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-1 mb-2">
              <span className="text-3xl font-bold">1,250</span>
              <span className="text-muted-foreground mb-1">/ 2,000 kcal</span>
            </div>
            <Progress value={62} className="h-2" />
            <p className="text-xs text-muted-foreground mt-1">
              750 kcal remaining
            </p>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={item}>
        <div className="grid grid-cols-4 gap-3">
          {macros.map((m) => (
            <div key={m.label} className="text-center">
              <div className="relative w-12 h-12 mx-auto mb-1">
                <svg className="w-12 h-12 -rotate-90" viewBox="0 0 36 36">
                  <circle
                    cx="18"
                    cy="18"
                    r="14"
                    fill="none"
                    className="stroke-muted"
                    strokeWidth="3"
                  />
                  <circle
                    cx="18"
                    cy="18"
                    r="14"
                    fill="none"
                    className={m.color.replace("bg-", "stroke-")}
                    strokeWidth="3"
                    strokeDasharray={`${(m.current / m.target) * 88} 88`}
                    strokeLinecap="round"
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-[10px] font-semibold">
                  {Math.round((m.current / m.target) * 100)}%
                </span>
              </div>
              <p className="text-xs font-medium">{m.label}</p>
              <p className="text-[10px] text-muted-foreground">
                {m.current}/{m.target}g
              </p>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div variants={item}>
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map((a) => (
            <Link key={a.label} href={a.href}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="flex items-center gap-3 p-4">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${a.color}`}
                  >
                    <a.icon className="size-5" />
                  </div>
                  <span className="text-sm font-medium">{a.label}</span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </motion.div>

      <motion.div variants={item}>
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Water Intake
              </CardTitle>
              <Button size="sm" variant="outline">
                <Plus className="size-3 mr-1" />
                250ml
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-1 mb-2">
              <span className="text-xl font-bold">1,500</span>
              <span className="text-sm text-muted-foreground mb-0.5">
                / 2,500 ml
              </span>
            </div>
            <Progress value={60} className="h-2" />
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={item}>
        <Card>
          <CardContent className="flex items-center gap-3 p-4">
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center">
              <Flame className="size-5 text-orange-500" />
            </div>
            <div>
              <p className="text-sm font-semibold">12 day streak</p>
              <p className="text-xs text-muted-foreground">Keep it going!</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={item}>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Today&apos;s Meals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <Camera className="size-8 text-muted-foreground/30 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">
                No meals logged yet
              </p>
              <Link href="/log">
                <Button size="sm" className="mt-3">
                  Log your first meal
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
