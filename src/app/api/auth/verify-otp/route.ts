import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { phone, otp } = await request.json();

  if (!phone || !otp) {
    return NextResponse.json({ error: "Phone and OTP required" }, { status: 400 });
  }

  // Placeholder - would compare hashed OTP, check expiry, max 5 attempts
  if (otp.length !== 6) {
    return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });
  }

  return NextResponse.json({
    verified: true,
    user: { id: "mock-user", phone },
  });
}
