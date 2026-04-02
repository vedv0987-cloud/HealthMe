"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Target,
  Utensils,
  Bell,
  Plug,
  CreditCard,
  Download,
  HelpCircle,
  LogOut,
  Trash2,
  ChevronRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { createClient } from "@/lib/supabase/client";

const settingsItems = [
  { icon: Target, label: "Goals", href: "#" },
  { icon: Utensils, label: "Dietary Preferences", href: "#" },
  { icon: Bell, label: "Notifications", href: "#" },
  { icon: Plug, label: "Connected Apps", href: "#" },
  { icon: CreditCard, label: "Subscription", href: "#" },
  { icon: Download, label: "Data Export", href: "#" },
  { icon: HelpCircle, label: "Help & Support", href: "#" },
];

export default function ProfilePage() {
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center text-center">
        <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 flex items-center justify-center text-2xl font-bold">
          U
        </div>
        <h1 className="font-heading text-xl font-bold mt-3">User</h1>
        <p className="text-sm text-muted-foreground">user@example.com</p>
        <span className="inline-block mt-2 text-xs font-medium px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400">
          Level 1 — Seedling
        </span>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-muted-foreground">XP Progress</span>
            <span className="font-medium">0 / 100 XP</span>
          </div>
          <Progress value={0} className="h-2" />
        </CardContent>
      </Card>

      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Meals", value: "0" },
          { label: "Streak", value: "0 days" },
          { label: "Plan", value: "Free" },
        ].map((s) => (
          <Card key={s.label}>
            <CardContent className="p-3 text-center">
              <p className="text-lg font-bold">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardContent className="p-0">
          {settingsItems.map((item, i) => (
            <div key={item.label}>
              <Link
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 hover:bg-muted/50 transition-colors"
              >
                <item.icon className="size-4 text-muted-foreground" />
                <span className="text-sm flex-1">{item.label}</span>
                <ChevronRight className="size-4 text-muted-foreground" />
              </Link>
              {i < settingsItems.length - 1 && <Separator />}
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="space-y-2">
        <Button
          variant="ghost"
          className="w-full justify-start text-destructive hover:text-destructive"
          onClick={handleLogout}
        >
          <LogOut className="size-4 mr-2" />
          Log Out
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start text-destructive/60 hover:text-destructive"
        >
          <Trash2 className="size-4 mr-2" />
          Delete Account
        </Button>
      </div>
    </div>
  );
}
