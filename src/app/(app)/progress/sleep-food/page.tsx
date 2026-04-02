"use client";

import { Moon, TrendingDown, Coffee, Utensils, Brain } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const insights = [
  { icon: Moon, title: "Late dinner = worse sleep", detail: "On days you eat after 9 PM, your sleep quality averages 5.2/10 vs 7.8/10 on earlier dinner days.", recommendation: "Try finishing dinner by 8:30 PM this week.", confidence: "high", confidenceColor: "bg-emerald-500" },
  { icon: Coffee, title: "Caffeine after 3 PM disrupts your sleep", detail: "You logged coffee/tea after 3 PM on 4 days last week. Those nights averaged 45 min less deep sleep.", recommendation: "Switch to green tea or herbal tea after 3 PM.", confidence: "moderate", confidenceColor: "bg-amber-500" },
  { icon: Utensils, title: "High-carb dinners improve your sleep", detail: "Dinners with 60%+ carbs (like rice + dal) correlated with 20% better sleep scores for you.", recommendation: "Include rice or roti with dinner — carbs help produce melatonin.", confidence: "moderate", confidenceColor: "bg-amber-500" },
  { icon: TrendingDown, title: "Heavy dinners hurt sleep quality", detail: "Dinners over 700 cal correlated with 30% lower deep sleep duration and more awakenings.", recommendation: "Keep dinner under 600 cal. Have a lighter meal with more veggies.", confidence: "high", confidenceColor: "bg-emerald-500" },
];

export default function SleepFoodPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold flex items-center gap-2">
          <Brain className="size-6 text-violet-500" />
          Sleep-Food Link
        </h1>
        <p className="text-sm text-muted-foreground mt-1">AI-powered analysis of how your food affects your sleep.</p>
      </div>

      {/* Data requirement notice */}
      <Card className="bg-violet-500/5 border-violet-500/20">
        <CardContent className="p-4 text-center">
          <p className="text-sm font-medium">Insights based on 18 days of data</p>
          <p className="text-xs text-muted-foreground mt-1">More data = more accurate insights. Keep logging meals and sleep!</p>
        </CardContent>
      </Card>

      {/* Insight Cards */}
      <div className="space-y-3">
        <h2 className="font-heading text-lg font-semibold">Your Patterns</h2>
        {insights.map((insight, i) => (
          <Card key={i}>
            <CardContent className="p-4">
              <div className="flex items-start gap-3 mb-2">
                <div className="w-8 h-8 rounded-lg bg-violet-500/10 flex items-center justify-center shrink-0">
                  <insight.icon className="size-4 text-violet-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-sm font-semibold">{insight.title}</h3>
                    <Badge variant="secondary" className={`text-[10px] text-white ${insight.confidenceColor}`}>
                      {insight.confidence}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{insight.detail}</p>
                </div>
              </div>
              <div className="p-2 rounded-lg bg-primary/5 mt-2">
                <p className="text-xs text-primary font-medium">{insight.recommendation}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Placeholder for charts */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm text-muted-foreground">Dinner Time vs Sleep Quality</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-48 rounded-xl bg-muted/50 flex items-center justify-center">
            <p className="text-sm text-muted-foreground">Scatter chart — coming with more data</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
