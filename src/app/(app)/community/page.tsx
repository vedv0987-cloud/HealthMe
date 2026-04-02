"use client";

import { Heart, MessageCircle, Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const posts = [
  {
    id: "1",
    author: { name: "Sneha P.", initials: "SP" },
    content: "Just completed my 30-day streak! Feeling amazing and down 4kg. The consistency is what matters most.",
    likes: 24,
    comments: 8,
    time: "2h ago",
  },
  {
    id: "2",
    author: { name: "Arjun K.", initials: "AK" },
    content: "Made this high-protein paneer tikka bowl for dinner - 450 kcal, 35g protein! Recipe in comments.",
    likes: 42,
    comments: 15,
    time: "5h ago",
  },
];

export default function CommunityPage() {
  return (
    <div className="space-y-6 relative">
      <h1 className="font-heading text-2xl font-bold">Community</h1>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {["Feed", "Challenges", "Leaderboard"].map((tab, i) => (
          <button
            key={tab}
            className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              i === 0
                ? "bg-primary text-white"
                : "bg-muted text-muted-foreground"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {posts.map((post) => (
          <Card key={post.id}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 flex items-center justify-center text-xs font-bold">
                  {post.author.initials}
                </div>
                <div>
                  <p className="text-sm font-medium">{post.author.name}</p>
                  <p className="text-xs text-muted-foreground">{post.time}</p>
                </div>
              </div>
              <p className="text-sm leading-relaxed mb-3">{post.content}</p>
              <div className="flex items-center gap-4 text-muted-foreground">
                <button className="flex items-center gap-1 text-xs hover:text-foreground transition-colors">
                  <Heart className="size-4" />
                  {post.likes}
                </button>
                <button className="flex items-center gap-1 text-xs hover:text-foreground transition-colors">
                  <MessageCircle className="size-4" />
                  {post.comments}
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Button
        className="fixed bottom-20 right-4 lg:bottom-6 lg:right-6 size-14 rounded-full shadow-lg"
        size="icon"
      >
        <Plus className="size-6" />
      </Button>
    </div>
  );
}
