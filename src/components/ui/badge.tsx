import * as React from "react";
import Chip from "@mui/material/Chip";

type BadgeVariant = "default" | "secondary" | "destructive" | "outline" | "ghost" | "link";

interface BadgeProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, "color"> {
  variant?: BadgeVariant;
}

function mapBadgeVariant(variant: BadgeVariant): {
  muiVariant: "filled" | "outlined";
  color: "primary" | "secondary" | "error" | "default";
} {
  switch (variant) {
    case "default":
      return { muiVariant: "filled", color: "primary" };
    case "secondary":
      return { muiVariant: "filled", color: "secondary" };
    case "destructive":
      return { muiVariant: "filled", color: "error" };
    case "outline":
    case "ghost":
      return { muiVariant: "outlined", color: "default" };
    default:
      return { muiVariant: "filled", color: "primary" };
  }
}

function Badge({ variant = "default", className, children, ...props }: BadgeProps) {
  const { muiVariant, color } = mapBadgeVariant(variant);

  return (
    <Chip
      label={children}
      variant={muiVariant}
      color={color}
      size="small"
      className={className}
      {...(props as React.ComponentProps<typeof Chip>)}
    />
  );
}

export { Badge };
export type { BadgeProps };
