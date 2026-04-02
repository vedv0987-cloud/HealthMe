"use client";

import Link from "next/link";
import { ArrowUpCircle, Calendar, CreditCard, PauseCircle, XCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const actions = [
  { label: "Upgrade Plan", desc: "Get more features", icon: ArrowUpCircle, href: "/upgrade" },
  { label: "Change Billing Period", desc: "Switch to annual and save", icon: Calendar, href: "#" },
  { label: "Update Payment Method", desc: "Change card or UPI", icon: CreditCard, href: "#" },
  { label: "Pause Subscription", desc: "Pause for up to 30 days", icon: PauseCircle, href: "#" },
];

export default function SubscriptionSettingsPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-heading text-2xl font-bold">Subscription</h1>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Current Plan</CardTitle>
            <Badge variant="secondary">Free</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Status</span>
            <span className="text-emerald-600 font-medium">Active</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Member since</span>
            <span>April 2026</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          {actions.map((a, i) => (
            <div key={a.label}>
              <Link href={a.href} className="flex items-center gap-3 px-4 py-3 hover:bg-muted/50 transition-colors">
                <a.icon className="size-4 text-muted-foreground" />
                <div className="flex-1">
                  <p className="text-sm font-medium">{a.label}</p>
                  <p className="text-xs text-muted-foreground">{a.desc}</p>
                </div>
              </Link>
              {i < actions.length - 1 && <Separator />}
            </div>
          ))}
        </CardContent>
      </Card>

      <Button variant="ghost" className="w-full justify-start text-destructive hover:text-destructive">
        <XCircle className="size-4 mr-2" />
        Cancel Subscription
      </Button>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm text-muted-foreground">Billing History</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground text-center py-4">No billing history yet</p>
        </CardContent>
      </Card>
    </div>
  );
}
