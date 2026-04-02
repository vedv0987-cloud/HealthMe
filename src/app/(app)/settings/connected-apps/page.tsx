"use client";

import { Plug } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const apps = [
  { name: "Google Fit", data: "Steps, exercise, weight", connected: false },
  { name: "Apple Health", data: "Steps, heart rate, sleep, weight", connected: false },
  { name: "Fitbit", data: "Steps, heart rate, sleep, exercise", connected: false },
  { name: "Samsung Health", data: "Steps, exercise", connected: false },
  { name: "Garmin Connect", data: "Steps, heart rate, exercise", connected: false },
  { name: "Strava", data: "Running, cycling", connected: false },
];

export default function ConnectedAppsPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-heading text-2xl font-bold">Connected Apps</h1>
      <p className="text-sm text-muted-foreground">
        Sync your data from fitness trackers and health apps.
      </p>
      <div className="space-y-3">
        {apps.map((app) => (
          <Card key={app.name}>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center shrink-0">
                <Plug className="size-5 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium">{app.name}</p>
                  {app.connected && <Badge className="text-[10px]">Connected</Badge>}
                </div>
                <p className="text-xs text-muted-foreground">{app.data}</p>
              </div>
              <Button variant={app.connected ? "outline" : "default"} size="sm">
                {app.connected ? "Disconnect" : "Connect"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
