"use client";

import * as React from "react";
import MuiSwitch from "@mui/material/Switch";

interface SwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  className?: string;
  size?: "sm" | "default";
  name?: string;
}

function Switch({ checked, defaultChecked, onCheckedChange, onChange, disabled, className, size = "default", name }: SwitchProps) {
  return (
    <MuiSwitch
      checked={checked}
      defaultChecked={defaultChecked}
      onChange={(e) => {
        onChange?.(e);
        onCheckedChange?.(e.target.checked);
      }}
      disabled={disabled}
      size={size === "sm" ? "small" : "medium"}
      className={className}
      name={name}
    />
  );
}

export { Switch };
