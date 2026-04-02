"use client";

import { useState } from "react";
import { Bell, Droplets, Dumbbell, Users, MessageCircle, Megaphone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

type NotifSetting = { label: string; key: string; enabled: boolean; time?: string };

const sections: { title: string; icon: React.ElementType; items: NotifSetting[] }[] = [
  {
    title: "Meal Reminders",
    icon: Bell,
    items: [
      { label: "Breakfast reminder", key: "breakfast", enabled: true, time: "08:00" },
      { label: "Lunch reminder", key: "lunch", enabled: true, time: "12:30" },
      { label: "Dinner reminder", key: "dinner", enabled: true, time: "19:30" },
    ],
  },
  {
    title: "Hydration",
    icon: Droplets,
    items: [
      { label: "Water reminders", key: "water", enabled: true },
    ],
  },
  {
    title: "Progress",
    icon: Dumbbell,
    items: [
      { label: "Daily summary", key: "daily_summary", enabled: true },
      { label: "Weekly report", key: "weekly_report", enabled: true },
      { label: "Streak warnings", key: "streak", enabled: true },
      { label: "Achievement alerts", key: "achievements", enabled: true },
    ],
  },
  {
    title: "Community",
    icon: Users,
    items: [
      { label: "Likes on my posts", key: "likes", enabled: true },
      { label: "Comments on my posts", key: "comments", enabled: true },
      { label: "Challenge updates", key: "challenges", enabled: true },
    ],
  },
  {
    title: "Coach",
    icon: MessageCircle,
    items: [
      { label: "Coach messages", key: "coach_messages", enabled: true },
      { label: "Consultation reminders", key: "consultations", enabled: true },
    ],
  },
  {
    title: "Marketing",
    icon: Megaphone,
    items: [
      { label: "Product updates", key: "product_updates", enabled: false },
      { label: "Special offers", key: "offers", enabled: false },
    ],
  },
];

export default function NotificationSettingsPage() {
  const [settings, setSettings] = useState(sections);

  function toggle(sectionIdx: number, itemIdx: number) {
    setSettings((prev) => {
      const next = [...prev];
      const section = { ...next[sectionIdx] };
      const items = [...section.items];
      items[itemIdx] = { ...items[itemIdx], enabled: !items[itemIdx].enabled };
      section.items = items;
      next[sectionIdx] = section;
      return next;
    });
    toast.success("Setting updated");
  }

  return (
    <div className="space-y-6">
      <h1 className="font-heading text-2xl font-bold">Notifications</h1>
      {settings.map((section, si) => (
        <Card key={section.title}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <section.icon className="size-4" />
              {section.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {section.items.map((item, ii) => (
              <div key={item.key} className="flex items-center justify-between">
                <div>
                  <p className="text-sm">{item.label}</p>
                  {item.time && (
                    <p className="text-xs text-muted-foreground">{item.time}</p>
                  )}
                </div>
                <Switch
                  checked={item.enabled}
                  onCheckedChange={() => toggle(si, ii)}
                />
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
