"use client";

import * as React from "react";
import MuiLinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface ProgressProps {
  value?: number;
  className?: string;
  children?: React.ReactNode;
}

function Progress({ value = 0, className, children }: ProgressProps) {
  return (
    <Box className={className} sx={{ display: "flex", flexWrap: "wrap", gap: 1, alignItems: "center", width: "100%" }}>
      {children}
      <MuiLinearProgress
        variant="determinate"
        value={Math.min(100, Math.max(0, value))}
        sx={{ flex: 1, borderRadius: 2 }}
      />
    </Box>
  );
}

function ProgressTrack({ className, children }: { className?: string; children?: React.ReactNode }) {
  return <Box className={className}>{children}</Box>;
}

function ProgressIndicator({ className }: { className?: string }) {
  return <Box className={className} />;
}

function ProgressLabel({ className, children }: { className?: string; children?: React.ReactNode }) {
  return (
    <Typography variant="body2" fontWeight={500} className={className}>
      {children}
    </Typography>
  );
}

function ProgressValue({ className, children }: { className?: string; children?: React.ReactNode }) {
  return (
    <Typography variant="body2" color="text.secondary" className={className} sx={{ ml: "auto", fontVariantNumeric: "tabular-nums" }}>
      {children}
    </Typography>
  );
}

export { Progress, ProgressTrack, ProgressIndicator, ProgressLabel, ProgressValue };
