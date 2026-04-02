"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, CreditCard, Building, Wallet, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const planDetails: Record<string, { name: string; monthly: number; annual: number }> = {
  smart: { name: "Smart", monthly: 199, annual: 1499 },
  pro: { name: "Pro", monthly: 999, annual: 7999 },
  elite: { name: "Elite", monthly: 1999, annual: 15999 },
};

const paymentMethods = [
  { id: "upi", label: "UPI", icon: Wallet, desc: "Google Pay, PhonePe, Paytm" },
  { id: "card", label: "Card", icon: CreditCard, desc: "Debit or Credit card" },
  { id: "netbanking", label: "Net Banking", icon: Building, desc: "All major banks" },
];

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="max-w-lg mx-auto space-y-4 py-8"><Skeleton className="h-8 w-48" /><Skeleton className="h-40 w-full" /></div>}>
      <CheckoutContent />
    </Suspense>
  );
}

function CheckoutContent() {
  const searchParams = useSearchParams();
  const planId = searchParams.get("plan") || "smart";
  const billing = searchParams.get("billing") || "annual";
  const plan = planDetails[planId] || planDetails.smart;
  const price = billing === "annual" ? plan.annual : plan.monthly;
  const period = billing === "annual" ? "year" : "month";

  const [method, setMethod] = useState("upi");
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [loading, setLoading] = useState(false);

  function applyCoupon() {
    if (!coupon) return;
    // Placeholder coupon validation
    if (coupon.toUpperCase() === "HEAL20") {
      setCouponApplied(true);
      toast.success("Coupon applied! 20% off");
    } else {
      toast.error("Invalid or expired coupon");
    }
  }

  const discount = couponApplied ? Math.round(price * 0.2) : 0;
  const finalPrice = price - discount;

  async function handlePay() {
    setLoading(true);
    // Placeholder - would integrate Razorpay here
    await new Promise((r) => setTimeout(r, 2000));
    window.location.href = `/checkout/success?plan=${planId}&amount=${finalPrice}`;
  }

  return (
    <div className="max-w-lg mx-auto space-y-6 pb-8">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-heading text-2xl font-bold">Complete your purchase</h1>
        <p className="text-sm text-muted-foreground mt-1">
          {plan.name} Plan — {billing === "annual" ? "Annual" : "Monthly"}
        </p>
      </motion.div>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Order Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between text-sm">
            <span>{plan.name} Plan ({period}ly)</span>
            <span className="font-mono">₹{price.toLocaleString()}</span>
          </div>
          {couponApplied && (
            <div className="flex justify-between text-sm text-emerald-600">
              <span>Discount (20%)</span>
              <span className="font-mono">-₹{discount.toLocaleString()}</span>
            </div>
          )}
          <div className="border-t pt-3 flex justify-between font-semibold">
            <span>Total</span>
            <span className="font-mono text-lg">₹{finalPrice.toLocaleString()}</span>
          </div>
          {billing === "annual" && (
            <p className="text-xs text-muted-foreground">
              That&apos;s just ₹{Math.round(finalPrice / 12)}/month
            </p>
          )}
        </CardContent>
      </Card>

      <div className="flex gap-2">
        <Input
          placeholder="Enter coupon code"
          value={coupon}
          onChange={(e) => setCoupon(e.target.value)}
          disabled={couponApplied}
        />
        <Button
          variant="outline"
          onClick={applyCoupon}
          disabled={couponApplied || !coupon}
        >
          {couponApplied ? <Check className="size-4" /> : "Apply"}
        </Button>
      </div>

      <div>
        <p className="text-sm font-medium mb-3">Payment Method</p>
        <div className="space-y-2">
          {paymentMethods.map((m) => (
            <Card
              key={m.id}
              className={cn(
                "cursor-pointer transition-all",
                method === m.id && "ring-2 ring-primary"
              )}
              onClick={() => setMethod(m.id)}
            >
              <CardContent className="flex items-center gap-3 p-3">
                <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                  <m.icon className="size-5 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{m.label}</p>
                  <p className="text-xs text-muted-foreground">{m.desc}</p>
                </div>
                <div
                  className={cn(
                    "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                    method === m.id
                      ? "border-primary bg-primary"
                      : "border-muted-foreground/30"
                  )}
                >
                  {method === m.id && (
                    <div className="w-2 h-2 rounded-full bg-white" />
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Button
        className="w-full h-12 text-base"
        onClick={handlePay}
        disabled={loading}
      >
        <Lock className="size-4 mr-2" />
        {loading ? "Processing..." : `Pay ₹${finalPrice.toLocaleString()}`}
      </Button>

      <p className="text-xs text-center text-muted-foreground">
        Secured by Razorpay. 256-bit SSL encryption.
      </p>
    </div>
  );
}
