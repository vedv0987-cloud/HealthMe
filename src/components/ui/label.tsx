"use client";

import * as React from "react";
import FormLabel from "@mui/material/FormLabel";

function Label({
  className,
  children,
  ...props
}: React.ComponentProps<"label">) {
  return (
    <FormLabel
      className={className}
      sx={{
        fontSize: "0.875rem",
        fontWeight: 500,
        lineHeight: 1,
        mb: 0.5,
        display: "flex",
        alignItems: "center",
        gap: 1,
      }}
      {...(props as React.ComponentProps<typeof FormLabel>)}
    >
      {children}
    </FormLabel>
  );
}

export { Label };
