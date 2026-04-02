"use client";

import * as React from "react";
import Box from "@mui/material/Box";

function ScrollArea({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <Box
      className={className}
      sx={{
        position: "relative",
        overflow: "auto",
        height: "100%",
        "&::-webkit-scrollbar": { width: 6 },
        "&::-webkit-scrollbar-track": { bgcolor: "transparent" },
        "&::-webkit-scrollbar-thumb": {
          bgcolor: "divider",
          borderRadius: 3,
        },
      }}
      {...props}
    >
      {children}
    </Box>
  );
}

function ScrollBar({ className }: { className?: string; orientation?: string }) {
  // MUI handles scrollbar styling via CSS above
  return <span className={className} style={{ display: "none" }} />;
}

export { ScrollArea, ScrollBar };
