import * as React from "react";
import MuiTextField from "@mui/material/TextField";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea"> & { error?: boolean; helperText?: string }
>(({ className, error, helperText, ...props }, ref) => {
  return (
    <MuiTextField
      inputRef={ref}
      multiline
      minRows={3}
      variant="outlined"
      size="small"
      fullWidth
      error={error}
      helperText={helperText}
      className={className}
      slotProps={{
        input: props as Record<string, unknown>,
      }}
    />
  );
});

Textarea.displayName = "Textarea";

export { Textarea };
