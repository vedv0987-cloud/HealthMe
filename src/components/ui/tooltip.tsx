"use client";

import * as React from "react";
import MuiTooltip from "@mui/material/Tooltip";

function TooltipProvider({ children }: { children: React.ReactNode; delay?: number }) {
  return <>{children}</>;
}

function Tooltip({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

function TooltipTrigger({
  children,
  className,
  ...props
}: React.ComponentProps<"button"> & { asChild?: boolean }) {
  return (
    <span className={className} {...(props as React.ComponentProps<"span">)}>
      {children}
    </span>
  );
}

function TooltipContent({
  children,
  side = "top",
  className,
}: {
  children?: React.ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  sideOffset?: number;
  align?: string;
  alignOffset?: number;
  className?: string;
}) {
  // This component is a placeholder. In MUI, Tooltip wraps the trigger.
  // For a full migration, use MuiTooltip directly in consuming components.
  return <span className={className}>{children}</span>;
}

// Direct MUI Tooltip export for consumers that want to use it directly
export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider, MuiTooltip };
