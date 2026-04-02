"use client";

import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <AlertTriangle className="size-16 text-destructive/30 mb-4" />
      <h1 className="font-heading text-2xl font-bold">Something went wrong</h1>
      <p className="text-muted-foreground mt-2 text-center max-w-sm">
        We&apos;re already working on it. Try again in a moment.
      </p>
      <div className="flex gap-3 mt-6">
        <Button onClick={reset}>Try Again</Button>
        <Button variant="outline" onClick={() => (window.location.href = "/")}>
          Go Home
        </Button>
      </div>
    </div>
  );
}
