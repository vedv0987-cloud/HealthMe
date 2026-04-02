import * as React from "react";
import MuiTextField from "@mui/material/TextField";

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "color"> {
  error?: boolean;
  helperText?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, helperText, ...props }, ref) => {
    return (
      <MuiTextField
        inputRef={ref}
        type={type}
        variant="outlined"
        size="small"
        fullWidth
        error={error}
        helperText={helperText}
        className={className}
        slotProps={{
          htmlInput: props,
        }}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };
