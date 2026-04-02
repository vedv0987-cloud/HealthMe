import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    user: {
      id: "mock-user-id",
      name: "User",
      email: "user@example.com",
      heightCm: 170,
      weightKg: 78,
      targetWeightKg: 72,
      dailyCalorieTarget: 2000,
      dailyProteinG: 120,
      dailyCarbsG: 200,
      dailyFatG: 65,
      dailyWaterMl: 2500,
      subscriptionTier: "free",
      streakDays: 12,
      xpPoints: 0,
      level: 1,
    },
  });
}

export async function PATCH(request: Request) {
  const body = await request.json();
  return NextResponse.json({ user: { id: "mock-user-id", ...body } });
}
