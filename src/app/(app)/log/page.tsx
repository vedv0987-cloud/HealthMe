"use client"

import { useState } from "react"
import { Search, Camera, Star, Clock, Heart, ScanBarcode } from "lucide-react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const tabs = [
  { id: "search", label: "Search", icon: Search },
  { id: "recent", label: "Recent", icon: Clock },
  { id: "favorites", label: "Favorites", icon: Heart },
  { id: "scan", label: "Scan", icon: ScanBarcode },
] as const

const quickFoods = [
  { name: "Roti", kcal: 120, emoji: "🫓" },
  { name: "Rice", kcal: 130, emoji: "🍚" },
  { name: "Dal", kcal: 150, emoji: "🍲" },
  { name: "Chicken", kcal: 200, emoji: "🍗" },
  { name: "Paneer", kcal: 180, emoji: "🧀" },
  { name: "Salad", kcal: 80, emoji: "🥗" },
]

export default function LogPage() {
  const [activeTab, setActiveTab] = useState<string>("search")
  const [query, setQuery] = useState("")

  return (
    <div className="flex flex-col gap-6 pb-8">
      <div>
        <h1 className="text-2xl font-heading font-bold">Log Meal</h1>
        <p className="text-sm text-muted-foreground">
          Search or scan foods to log
        </p>
      </div>

      {/* Search input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search foods..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="h-10 pl-9"
        />
      </div>

      {/* Tab bar */}
      <div className="flex gap-1 rounded-lg bg-muted p-1">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex flex-1 items-center justify-center gap-1.5 rounded-md px-2 py-1.5 text-xs font-medium transition-colors",
                activeTab === tab.id
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className="size-3.5" />
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* Search results placeholder */}
      {query && (
        <div className="flex flex-col items-center gap-2 py-8 text-center">
          <Search className="size-8 text-muted-foreground/50" />
          <p className="text-sm text-muted-foreground">
            Search results for &ldquo;{query}&rdquo;
          </p>
          <p className="text-xs text-muted-foreground/70">
            Results will appear here
          </p>
        </div>
      )}

      {/* Quick Add section */}
      {!query && activeTab === "search" && (
        <div>
          <h2 className="mb-3 text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            Quick Add
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {quickFoods.map((food) => (
              <Card
                key={food.name}
                className="cursor-pointer transition-colors hover:bg-muted/50"
              >
                <CardContent className="flex items-center gap-3">
                  <span className="text-2xl">{food.emoji}</span>
                  <div>
                    <p className="text-sm font-medium">{food.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {food.kcal} kcal
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Recent tab */}
      {activeTab === "recent" && !query && (
        <div className="flex flex-col items-center gap-2 py-8 text-center">
          <Clock className="size-8 text-muted-foreground/50" />
          <p className="text-sm text-muted-foreground">No recent foods</p>
          <p className="text-xs text-muted-foreground/70">
            Foods you log will appear here
          </p>
        </div>
      )}

      {/* Favorites tab */}
      {activeTab === "favorites" && !query && (
        <div className="flex flex-col items-center gap-2 py-8 text-center">
          <Star className="size-8 text-muted-foreground/50" />
          <p className="text-sm text-muted-foreground">No favorites yet</p>
          <p className="text-xs text-muted-foreground/70">
            Star foods to save them here
          </p>
        </div>
      )}

      {/* Scan tab */}
      {activeTab === "scan" && !query && (
        <div className="flex flex-col items-center gap-2 py-8 text-center">
          <ScanBarcode className="size-8 text-muted-foreground/50" />
          <p className="text-sm text-muted-foreground">
            Scan a barcode or food label
          </p>
          <p className="text-xs text-muted-foreground/70">
            Point your camera at a barcode to get started
          </p>
        </div>
      )}

      {/* Scan with Camera button */}
      <Button
        className="h-12 w-full bg-emerald-600 text-white hover:bg-emerald-700"
        size="lg"
      >
        <Camera className="size-5" />
        Scan with Camera
      </Button>
    </div>
  )
}
