"use client";

import Link from "next/link";
import { UserCog, MessageCircle, Calendar, ArrowUpCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";

const steps = [
  { icon: UserCog, title: "Get matched", description: "We pair you with a certified coach based on your goals" },
  { icon: MessageCircle, title: "Chat anytime", description: "Message your coach for personalized diet and workout plans" },
  { icon: Calendar, title: "Video sessions", description: "Schedule video consultations for in-depth guidance" },
];

export default function CoachPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-heading text-2xl font-bold">My Coach</h1>

      <Card>
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-violet-500/10 flex items-center justify-center mx-auto mb-4">
            <UserCog className="size-8 text-violet-600" />
          </div>
          <h2 className="font-heading text-lg font-semibold mb-2">
            Get personalized guidance
          </h2>
          <p className="text-sm text-muted-foreground mb-6 max-w-sm mx-auto">
            Connect with certified nutritionists and fitness trainers who understand your culture and goals.
          </p>
          <Link href="/upgrade" className={buttonVariants()}>
            <ArrowUpCircle className="size-4 mr-2" />
            Upgrade to Pro
          </Link>
        </CardContent>
      </Card>

      <div>
        <h2 className="font-medium text-sm text-muted-foreground mb-3">How coaching works</h2>
        <div className="space-y-3">
          {steps.map((s, i) => (
            <Card key={i}>
              <CardContent className="flex items-center gap-4 p-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0">
                  <s.icon className="size-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold">{s.title}</p>
                  <p className="text-xs text-muted-foreground">{s.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
