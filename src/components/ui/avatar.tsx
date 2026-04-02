"use client";

import * as React from "react";
import MuiAvatar from "@mui/material/Avatar";
import MuiAvatarGroup from "@mui/material/AvatarGroup";
import Box from "@mui/material/Box";

type AvatarSize = "default" | "sm" | "lg";

const sizeMap = { sm: 24, default: 32, lg: 40 };

interface AvatarProps extends React.ComponentProps<"div"> {
  size?: AvatarSize;
}

function Avatar({ className, size = "default", children, ...props }: AvatarProps) {
  return (
    <MuiAvatar
      className={className}
      sx={{ width: sizeMap[size], height: sizeMap[size], fontSize: size === "sm" ? "0.75rem" : "0.875rem" }}
      {...(props as React.ComponentProps<typeof MuiAvatar>)}
    >
      {children}
    </MuiAvatar>
  );
}

function AvatarImage({ className, src, alt, ...props }: React.ComponentProps<"img">) {
  // MUI Avatar handles image via src prop on Avatar itself
  // This is kept for backward compatibility — consumers should put src on Avatar
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }}
      {...props}
    />
  );
}

function AvatarFallback({ className, children, ...props }: React.ComponentProps<"span">) {
  return (
    <Box
      component="span"
      className={className}
      sx={{
        display: "flex",
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "50%",
        bgcolor: "action.selected",
        fontSize: "0.875rem",
        color: "text.secondary",
      }}
      {...props}
    >
      {children}
    </Box>
  );
}

function AvatarBadge({ className, children, ...props }: React.ComponentProps<"span">) {
  return (
    <Box
      component="span"
      className={className}
      sx={{
        position: "absolute",
        right: 0,
        bottom: 0,
        zIndex: 10,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "50%",
        bgcolor: "primary.main",
        color: "primary.contrastText",
        width: 10,
        height: 10,
        ring: 2,
      }}
      {...props}
    >
      {children}
    </Box>
  );
}

function AvatarGroup({ className, children, ...props }: React.ComponentProps<"div">) {
  return (
    <MuiAvatarGroup className={className} {...(props as React.ComponentProps<typeof MuiAvatarGroup>)}>
      {children}
    </MuiAvatarGroup>
  );
}

function AvatarGroupCount({ className, children, ...props }: React.ComponentProps<"div">) {
  return (
    <Box
      className={className}
      sx={{
        display: "flex",
        width: 32,
        height: 32,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "50%",
        bgcolor: "action.selected",
        fontSize: "0.875rem",
        color: "text.secondary",
      }}
      {...props}
    >
      {children}
    </Box>
  );
}

export { Avatar, AvatarImage, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarBadge };
