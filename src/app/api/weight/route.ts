import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    logs: [
      { id: "1", weightKg: 80, date: "2024-01-01" },
      { id: "2", weightKg: 79.2, date: "2024-01-08" },
      { id: "3", weightKg: 78.5, date: "2024-01-15" },
      { id: "4", weightKg: 78, date: "2024-01-22" },
    ],
    trend_line: -0.7,
    change_kg: -2,
    change_percent: -2.5,
  });
}

export async function POST(request: Request) {
  const body = await request.json();
  return NextResponse.json({
    weight_log: { id: "new-log", ...body, logged_at: new Date().toISOString() },
    bmi: 24.1,
  }, { status: 201 });
}
