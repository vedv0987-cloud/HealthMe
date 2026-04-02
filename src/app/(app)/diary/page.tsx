"use client"

import { useState } from "react"
import { Coffee, UtensilsCrossed, Sun, Cookie, Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import { Card, CardHeader, CardTitle, CardContent, CardAction } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const

function getWeekDates() {
  const today = new Date()
  const dayOfWeek = today.getDay()
  const monday = new Date(today)
  monday.setDate(today.getDate() - ((dayOfWeek + 6) % 7))

  return DAYS.map((label, i) => {
    const date = new Date(monday)
    date.setDate(monday.getDate() + i)
    return {
      label,
      date: date.getDate(),
      isToday:
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear(),
    }
  })
}

const meals = [
  { name: "Breakfast", icon: Coffee, time: "7:00 - 9:00 AM" },
  { name: "Lunch", icon: Sun, time: "12:00 - 2:00 PM" },
  { name: "Dinner", icon: UtensilsCrossed, time: "7:00 - 9:00 PM" },
  { name: "Snacks", icon: Cookie, time: "Any time" },
]

export default function DiaryPage() {
  const week = getWeekDates()
  const [selectedDay, setSelectedDay] = useState(
    week.findIndex((d) => d.isToday)
  )

  return (
    <div className="space-y-6 pb-8">
      <div>
        <h1 className="text-2xl font-heading font-bold">Food Diary</h1>
        <p className="text-sm text-muted-foreground">Track your daily meals</p>
      </div>

      {/* Date pills */}
      <div className="flex gap-2">
        {week.map((day, i) => (
          <button
            key={day.label}
            onClick={() => setSelectedDay(i)}
            className={cn(
              "flex flex-1 flex-col items-center gap-0.5 rounded-xl py-2 text-xs font-medium transition-colors",
              selectedDay === i
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            )}
          >
            <span>{day.label}</span>
            <span className="text-sm font-semibold">{day.date}</span>
          </button>
        ))}
      </div>

      {/* Daily summary */}
      <Card>
        <CardContent>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold">0</span>
            <span className="text-sm text-muted-foreground">/ 2,000 kcal</span>
          </div>
          <Progress value={0} className="mt-2" />
          <div className="mt-3 flex justify-between text-xs text-muted-foreground">
            <span>Protein: 0g</span>
            <span>Carbs: 0g</span>
            <span>Fat: 0g</span>
          </div>
        </CardContent>
      </Card>

      {/* Meal sections */}
      <div className="space-y-3">
        {meals.map((meal) => {
          const Icon = meal.icon
          return (
            <Card key={meal.name}>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="size-4 text-primary" />
                  </div>
                  <div>
                    <CardTitle>{meal.name}</CardTitle>
                    <p className="text-xs text-muted-foreground">{meal.time}</p>
                  </div>
                </div>
                <CardAction>
                  <Button variant="outline" size="sm">
                    <Plus className="size-3.5" />
                    Add
                  </Button>
                </CardAction>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  No items logged
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
