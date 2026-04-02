import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { phone } = await request.json();

  if (!phone) {
    return NextResponse.json({ error: "Phone number required" }, { status: 400 });
  }

  // Placeholder - would generate OTP, store hashed in DB, send via MSG91/Twilio
  return NextResponse.json({
    sent: true,
    expires_in_seconds: 300,
  });
}
