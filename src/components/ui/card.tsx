import * as React from "react";
import MuiCard from "@mui/material/Card";
import MuiCardContent from "@mui/material/CardContent";
import MuiCardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

function Card({
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & { size?: "default" | "sm" }) {
  return (
    <MuiCard className={className} {...(props as React.ComponentProps<typeof MuiCard>)}>
      {children}
    </MuiCard>
  );
}

function CardHeader({ className, children, ...props }: React.ComponentProps<"div">) {
  return (
    <Box className={className} sx={{ px: 2.5, pt: 2.5, pb: 1 }} {...props}>
      {children}
    </Box>
  );
}

function CardTitle({ className, children, ...props }: React.ComponentProps<"div">) {
  return (
    <Typography variant="h6" component="div" className={className} {...props}>
      {children}
    </Typography>
  );
}

function CardDescription({ className, children, ...props }: React.ComponentProps<"div">) {
  return (
    <Typography variant="body2" color="text.secondary" className={className} {...props}>
      {children}
    </Typography>
  );
}

function CardAction({ className, children, ...props }: React.ComponentProps<"div">) {
  return (
    <Box className={className} sx={{ ml: "auto" }} {...props}>
      {children}
    </Box>
  );
}

function CardContent({ className, children, ...props }: React.ComponentProps<"div">) {
  return (
    <MuiCardContent className={className} sx={{ px: 2.5, py: 1.5, "&:last-child": { pb: 2 } }} {...(props as React.ComponentProps<typeof MuiCardContent>)}>
      {children}
    </MuiCardContent>
  );
}

function CardFooter({ className, children, ...props }: React.ComponentProps<"div">) {
  return (
    <>
      <Divider />
      <Box
        className={className}
        sx={{
          display: "flex",
          alignItems: "center",
          px: 2.5,
          py: 1.5,
          bgcolor: "action.hover",
        }}
        {...props}
      >
        {children}
      </Box>
    </>
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
};
