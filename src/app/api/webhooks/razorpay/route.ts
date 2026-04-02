import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get("x-razorpay-signature");
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

  if (!signature || !secret) {
    return NextResponse.json({ error: "Missing signature or secret" }, { status: 400 });
  }

  // Verify webhook signature
  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(body)
    .digest("hex");

  if (expectedSignature !== signature) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const event = JSON.parse(body);
  const eventType = event.event;

  switch (eventType) {
    case "subscription.activated":
      // Update user subscription_tier and subscription_expires_at
      console.log("Subscription activated:", event.payload);
      break;
    case "subscription.charged":
      // Extend subscription, create invoice record
      console.log("Subscription charged:", event.payload);
      break;
    case "subscription.cancelled":
      // Mark as cancelled, keep active until period end
      console.log("Subscription cancelled:", event.payload);
      break;
    case "subscription.halted":
      // Downgrade to free tier
      console.log("Subscription halted:", event.payload);
      break;
    case "payment.failed":
      // Send payment failed notification
      console.log("Payment failed:", event.payload);
      break;
    case "refund.processed":
      // Update invoice, send confirmation
      console.log("Refund processed:", event.payload);
      break;
    default:
      console.log("Unhandled event:", eventType);
  }

  return NextResponse.json({ received: true });
}
