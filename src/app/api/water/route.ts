import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    logs: [],
    total_ml: 1500,
    target_ml: 2500,
    percent_complete: 60,
  });
}

export async function POST(request: Request) {
  const body = await request.json();
  return NextResponse.json({
    water_log: { id: "new-log", amount_ml: body.amount_ml, logged_at: new Date().toISOString() },
    daily_total_ml: 1750,
    target_ml: 2500,
    percent_complete: 70,
  }, { status: 201 });
}
