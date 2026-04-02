import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    posts: [
      {
        id: "1",
        content: "Just completed my 30-day streak! Feeling amazing.",
        postType: "progress",
        likesCount: 24,
        commentsCount: 8,
        createdAt: new Date().toISOString(),
        author: { id: "u1", name: "Sneha P.", avatarUrl: null },
      },
    ],
    next_cursor: null,
  });
}

export async function POST(request: Request) {
  const body = await request.json();
  return NextResponse.json({
    post: { id: "new-post", ...body, likesCount: 0, commentsCount: 0, createdAt: new Date().toISOString() },
  }, { status: 201 });
}
