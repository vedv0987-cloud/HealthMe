import * as React from "react";
import MuiSkeleton from "@mui/material/Skeleton";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <MuiSkeleton
      variant="rectangular"
      animation="pulse"
      className={className}
      sx={{ borderRadius: 1 }}
      {...(props as React.ComponentProps<typeof MuiSkeleton>)}
    />
  );
}

export { Skeleton };
