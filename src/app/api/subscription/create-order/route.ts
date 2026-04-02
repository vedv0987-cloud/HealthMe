import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { plan_id, billing_period } = await request.json();

  // Placeholder - would create Razorpay order/subscription
  const prices: Record<string, Record<string, number>> = {
    smart: { monthly: 199, annual: 1499 },
    pro: { monthly: 999, annual: 7999 },
    elite: { monthly: 1999, annual: 15999 },
  };

  const amount = prices[plan_id]?.[billing_period] || 199;

  return NextResponse.json({
    subscription_id: `sub_${Date.now()}`,
    razorpay_key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_demo",
    amount: amount * 100, // paise
    currency: "INR",
    plan_name: plan_id.charAt(0).toUpperCase() + plan_id.slice(1),
  });
}
