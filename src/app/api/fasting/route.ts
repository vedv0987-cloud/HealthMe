import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    active_session: null,
    history: [],
  });
}

export async function POST(request: Request) {
  const body = await request.json();
  const now = new Date();
  const targetHours = body.protocol === "F16_8" ? 16 : body.protocol === "F18_6" ? 18 : 16;
  const targetEnd = new Date(now.getTime() + targetHours * 60 * 60 * 1000);

  return NextResponse.json({
    fasting_session: {
      id: "new-session",
      protocol: body.protocol,
      startedAt: now.toISOString(),
      targetEndAt: targetEnd.toISOString(),
      completed: false,
    },
  }, { status: 201 });
}
