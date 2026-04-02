"use client";

import { useState } from "react";
import { Bookmark, Share2, ThumbsDown, Bot, FlaskConical, AlertTriangle, Lightbulb, TrendingUp, ChefHat } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const articles = [
  { type: "research", badge: "Research", badgeColor: "bg-blue-500", icon: FlaskConical, title: "New Study: Eating 2 servings of curd daily reduced Type 2 diabetes risk by 18% in Indian adults", source: "ICMR, 2026", summary: "A large-scale study across 15 Indian cities found that regular curd consumption significantly improved insulin sensitivity..." },
  { type: "myth", badge: "Myth Buster", badgeColor: "bg-rose-500", icon: AlertTriangle, title: "Myth: Drinking water during meals dilutes digestive enzymes", source: "WHO", summary: "There is no scientific evidence that water interferes with digestion. In fact, water aids nutrient absorption and prevents overeating." },
  { type: "tip", badge: "Expert Tip", badgeColor: "bg-violet-500", icon: Lightbulb, title: "Eat a fruit between 4-6 PM to prevent evening junk cravings", source: "Dr. Rujuta Diwekar", summary: "The post-lunch energy dip often leads to unhealthy snacking. A seasonal fruit provides natural sugars and fiber." },
  { type: "trending", badge: "Trending", badgeColor: "bg-amber-500", icon: TrendingUp, title: "Millet revolution: Why jowar and bajra are replacing wheat in Indian kitchens", source: "Health Today", summary: "India declared 2023 the International Year of Millets, and the trend continues. Millets are gluten-free, high in fiber..." },
  { type: "recipe", badge: "Quick Recipe", badgeColor: "bg-emerald-500", icon: ChefHat, title: "5-min Moong Dal Chilla — 180 cal, 14g protein", source: "HealMe Kitchen", summary: "Perfect post-workout snack. Mix moong dal batter with ginger, green chili, and cook like a dosa." },
  { type: "alert", badge: "FSSAI Alert", badgeColor: "bg-red-600", icon: AlertTriangle, title: "Brand XYZ honey found adulterated with sugar syrup — check your pantry", source: "FSSAI", summary: "The Food Safety and Standards Authority of India has issued a recall for three batches of XYZ brand honey..." },
  { type: "ai", badge: "Ria Insight", badgeColor: "bg-primary", icon: Bot, title: "You haven't eaten any green vegetables in 5 days", source: "Ria AI", summary: "Your iron and folate intake is 40% below target. Try adding palak, methi, or broccoli to your next meal." },
];

const topics = ["All", "Weight Loss", "Diabetes", "PCOS", "Heart Health", "Gut Health", "Fitness", "Ayurveda", "Mental Wellness"];

export default function HealthFeedPage() {
  const [topic, setTopic] = useState("All");

  return (
    <div className="space-y-6">
      <h1 className="font-heading text-2xl font-bold">Health Feed</h1>

      <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1">
        {topics.map((t) => (
          <button key={t} onClick={() => setTopic(t)} className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${topic === t ? "bg-primary text-white" : "bg-muted text-muted-foreground"}`}>
            {t}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {articles.map((a, i) => (
          <Card key={i}>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className={`inline-flex items-center gap-1 text-[10px] font-bold text-white px-2 py-0.5 rounded-full ${a.badgeColor}`}>
                  <a.icon className="size-3" />
                  {a.badge}
                </span>
                <span className="text-xs text-muted-foreground">{a.source}</span>
              </div>
              <h3 className="text-sm font-semibold leading-snug">{a.title}</h3>
              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{a.summary}</p>
              <div className="flex items-center gap-2 mt-3">
                <Button variant="ghost" size="sm" className="h-7 text-xs"><Bookmark className="size-3 mr-1" />Save</Button>
                <Button variant="ghost" size="sm" className="h-7 text-xs"><Share2 className="size-3 mr-1" />Share</Button>
                <Button variant="ghost" size="sm" className="h-7 text-xs text-muted-foreground"><ThumbsDown className="size-3 mr-1" />Not for me</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
