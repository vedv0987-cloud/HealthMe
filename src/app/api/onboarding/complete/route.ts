import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  // Placeholder - would update user profile with onboarding data
  // and set onboarding_completed = true
  return NextResponse.json({
    success: true,
    user: {
      onboarding_completed: true,
      daily_calorie_target: body.daily_calorie_target || 2000,
      ...body,
    },
  });
}
