"use client";

import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AppError({
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
    <div className="flex flex-col items-center justify-center py-20 px-4">
      <AlertTriangle className="size-12 text-destructive/30 mb-4" />
      <h2 className="font-heading text-xl font-bold">Something went wrong</h2>
      <p className="text-sm text-muted-foreground mt-2 text-center">
        An error occurred while loading this page.
      </p>
      <Button onClick={reset} className="mt-4">
        Try Again
      </Button>
    </div>
  );
}
