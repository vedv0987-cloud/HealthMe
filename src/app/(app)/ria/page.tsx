"use client"

import { useState } from "react"
import { Bot, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const suggestions = [
  "What should I eat?",
  "Meal plan for today",
  "Am I eating enough protein?",
]

export default function RiaPage() {
  const [message, setMessage] = useState("")

  return (
    <div className="flex h-[calc(100vh-8rem)] flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 border-b pb-4">
        <div className="flex size-10 items-center justify-center rounded-full bg-emerald-500">
          <Bot className="size-5 text-white" />
        </div>
        <div>
          <h1 className="text-lg font-heading font-bold">Ria</h1>
          <p className="text-xs text-muted-foreground">AI Health Coach</p>
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-emerald-500" />
          <span className="text-xs text-muted-foreground">Online</span>
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 overflow-y-auto py-6">
        {/* Ria welcome message */}
        <div className="flex gap-3">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-emerald-500">
            <Bot className="size-4 text-white" />
          </div>
          <div className="max-w-[80%] rounded-2xl rounded-tl-sm bg-muted px-4 py-3">
            <p className="text-sm">
              Hi! I&apos;m Ria, your AI nutrition coach. Ask me anything about
              diet, nutrition, or health goals!
            </p>
          </div>
        </div>

        {/* Suggestion chips */}
        <div className="mt-6 flex flex-wrap gap-2 pl-11">
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => setMessage(s)}
              className="rounded-full border border-primary/30 bg-primary/5 px-3 py-1.5 text-xs font-medium text-primary transition-colors hover:bg-primary/10"
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Input bar */}
      <div className="border-t pt-4">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            setMessage("")
          }}
          className="flex gap-2"
        >
          <Input
            placeholder="Ask Ria anything..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="h-10 flex-1"
          />
          <Button
            type="submit"
            size="icon"
            className="size-10 shrink-0 bg-emerald-600 hover:bg-emerald-700"
            disabled={!message.trim()}
          >
            <Send className="size-4 text-white" />
          </Button>
        </form>
      </div>
    </div>
  )
}
