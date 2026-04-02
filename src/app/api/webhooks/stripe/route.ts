import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.text();
  const sig = request.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!sig || !webhookSecret) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  // In production, use: stripe.webhooks.constructEvent(body, sig, webhookSecret)
  // For now, parse directly (signature verification placeholder)
  let event;
  try {
    event = JSON.parse(body);
  } catch {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed":
      // Activate subscription
      console.log("Checkout completed:", event.data);
      break;
    case "invoice.payment_succeeded":
      // Extend subscription
      console.log("Payment succeeded:", event.data);
      break;
    case "invoice.payment_failed":
      // Send retry notification
      console.log("Payment failed:", event.data);
      break;
    case "customer.subscription.updated":
      // Sync plan changes
      console.log("Subscription updated:", event.data);
      break;
    case "customer.subscription.deleted":
      // Downgrade to free
      console.log("Subscription deleted:", event.data);
      break;
    default:
      console.log("Unhandled Stripe event:", event.type);
  }

  return NextResponse.json({ received: true });
}
