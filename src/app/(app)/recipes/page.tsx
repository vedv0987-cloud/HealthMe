"use client"

import { useState } from "react"
import { Search, Clock, Flame, Star } from "lucide-react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

const categories = [
  "Quick & Easy",
  "High Protein",
  "Under 300 Cal",
  "Indian Classics",
  "Keto",
  "Meal Prep",
]

const mockRecipes = [
  {
    id: 1,
    title: "Grilled Chicken Salad",
    time: "25 min",
    kcal: 320,
    rating: 4.5,
    color: "bg-emerald-100",
  },
  {
    id: 2,
    title: "Paneer Tikka Bowl",
    time: "30 min",
    kcal: 410,
    rating: 4.8,
    color: "bg-orange-100",
  },
  {
    id: 3,
    title: "Quinoa Veggie Wrap",
    time: "15 min",
    kcal: 280,
    rating: 4.2,
    color: "bg-violet-100",
  },
  {
    id: 4,
    title: "Oats Smoothie Bowl",
    time: "10 min",
    kcal: 250,
    rating: 4.6,
    color: "bg-emerald-100",
  },
]

export default function RecipesPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  return (
    <div className="space-y-6 pb-8">
      <div>
        <h1 className="text-2xl font-heading font-bold">Recipes</h1>
        <p className="text-sm text-muted-foreground">
          Healthy recipes for every meal
        </p>
      </div>

      {/* Search bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Search recipes..." className="h-10 pl-9" />
      </div>

      {/* Category pills */}
      <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() =>
              setActiveCategory(activeCategory === cat ? null : cat)
            }
            className={cn(
              "shrink-0 rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors",
              activeCategory === cat
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Recipe grid */}
      <div className="grid grid-cols-2 gap-3">
        {mockRecipes.map((recipe) => (
          <Card
            key={recipe.id}
            className="cursor-pointer overflow-hidden transition-colors hover:bg-muted/30"
          >
            {/* Image placeholder */}
            <div
              className={cn(
                "flex h-28 items-center justify-center",
                recipe.color
              )}
            >
              <span className="text-3xl">
                {recipe.id === 1
                  ? "🥗"
                  : recipe.id === 2
                    ? "🍛"
                    : recipe.id === 3
                      ? "🌯"
                      : "🥣"}
              </span>
            </div>
            <CardContent className="space-y-1.5 pt-3">
              <h3 className="text-sm font-semibold leading-tight">
                {recipe.title}
              </h3>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="size-3" />
                  {recipe.time}
                </span>
                <span className="flex items-center gap-1">
                  <Flame className="size-3" />
                  {recipe.kcal} kcal
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="size-3 fill-orange-400 text-orange-400" />
                <span className="text-xs font-medium">{recipe.rating}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
