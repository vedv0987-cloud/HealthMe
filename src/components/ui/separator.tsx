"use client";

import * as React from "react";
import MuiDivider from "@mui/material/Divider";

interface SeparatorProps extends React.ComponentProps<"hr"> {
  orientation?: "horizontal" | "vertical";
}

function Separator({ className, orientation = "horizontal", ...props }: SeparatorProps) {
  return (
    <MuiDivider
      orientation={orientation}
      flexItem={orientation === "vertical"}
      className={className}
      {...(props as React.ComponentProps<typeof MuiDivider>)}
    />
  );
}

export { Separator };
