import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { message } = await request.json();

  return NextResponse.json({
    reply: `Hi! I'm Ria, your AI nutrition coach. You asked: "${message}". I'm here to help you with diet, nutrition, and health goals. This is a demo response — connect the Gemini API for real AI coaching!`,
    session_id: "mock-session",
    suggestions: [
      "What should I eat for dinner?",
      "Help me hit my protein goal",
      "Suggest a quick recipe",
    ],
  });
}
