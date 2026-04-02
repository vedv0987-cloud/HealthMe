"use client";

import * as React from "react";
import MuiButton, { type ButtonProps as MuiButtonProps } from "@mui/material/Button";
import MuiIconButton from "@mui/material/IconButton";

type ButtonVariant =
  | "default"
  | "outline"
  | "secondary"
  | "ghost"
  | "destructive"
  | "link";
type ButtonSize = "default" | "xs" | "sm" | "lg" | "icon" | "icon-xs" | "icon-sm" | "icon-lg";

interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children?: React.ReactNode;
  asChild?: boolean;
}

function mapVariant(variant: ButtonVariant): {
  muiVariant: MuiButtonProps["variant"];
  color: MuiButtonProps["color"];
  sx?: MuiButtonProps["sx"];
} {
  switch (variant) {
    case "default":
      return { muiVariant: "contained", color: "primary" };
    case "outline":
      return { muiVariant: "outlined", color: "inherit" };
    case "secondary":
      return { muiVariant: "contained", color: "secondary" };
    case "ghost":
      return { muiVariant: "text", color: "inherit" };
    case "destructive":
      return { muiVariant: "contained", color: "error" };
    case "link":
      return {
        muiVariant: "text",
        color: "primary",
        sx: { textDecoration: "underline", "&:hover": { textDecoration: "underline" } },
      };
    default:
      return { muiVariant: "contained", color: "primary" };
  }
}

function mapSize(size: ButtonSize): MuiButtonProps["size"] {
  switch (size) {
    case "xs":
    case "sm":
    case "icon-xs":
    case "icon-sm":
      return "small";
    case "lg":
    case "icon-lg":
      return "large";
    default:
      return "medium";
  }
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "default", size = "default", className, children, ...props }, ref) => {
    const isIcon = size === "icon" || size === "icon-xs" || size === "icon-sm" || size === "icon-lg";

    if (isIcon) {
      const iconSize = size === "icon-xs" ? "small" : size === "icon-lg" ? "large" : "medium";
      return (
        <MuiIconButton
          ref={ref}
          size={iconSize}
          color={variant === "destructive" ? "error" : variant === "secondary" ? "secondary" : "default"}
          className={className}
          {...(props as React.ComponentProps<typeof MuiIconButton>)}
        >
          {children}
        </MuiIconButton>
      );
    }

    const { muiVariant, color, sx } = mapVariant(variant);

    return (
      <MuiButton
        ref={ref}
        variant={muiVariant}
        color={color}
        size={mapSize(size)}
        className={className}
        sx={{
          ...sx,
          minWidth: "auto",
        }}
        {...(props as React.ComponentProps<typeof MuiButton>)}
      >
        {children}
      </MuiButton>
    );
  }
);

Button.displayName = "Button";

// buttonVariants kept for backward compatibility with Link components using className
function buttonVariants(_opts?: Record<string, unknown>) {
  return "";
}

export { Button, buttonVariants };
export type { ButtonProps };
