"use client";

import { createTheme } from "@mui/material/styles";

const commonPalette = {
  primary: {
    main: "#10B981",
    light: "#34D399",
    dark: "#059669",
    contrastText: "#FFFFFF",
  },
  secondary: {
    main: "#F97316",
    light: "#FB923C",
    dark: "#EA580C",
    contrastText: "#FFFFFF",
  },
  error: {
    main: "#EF4444",
    light: "#F87171",
    dark: "#DC2626",
  },
  warning: {
    main: "#F59E0B",
    light: "#FBBF24",
    dark: "#D97706",
  },
  info: {
    main: "#8B5CF6",
    light: "#A78BFA",
    dark: "#7C3AED",
  },
  success: {
    main: "#10B981",
    light: "#34D399",
    dark: "#059669",
  },
};

const typography = {
  fontFamily: '"Roboto", "DM Sans", system-ui, -apple-system, sans-serif',
  h1: { fontWeight: 700, fontSize: "2.25rem", lineHeight: 1.2 },
  h2: { fontWeight: 700, fontSize: "1.875rem", lineHeight: 1.3 },
  h3: { fontWeight: 600, fontSize: "1.5rem", lineHeight: 1.4 },
  h4: { fontWeight: 600, fontSize: "1.25rem", lineHeight: 1.4 },
  h5: { fontWeight: 600, fontSize: "1.125rem", lineHeight: 1.5 },
  h6: { fontWeight: 600, fontSize: "1rem", lineHeight: 1.5 },
  button: { textTransform: "none" as const, fontWeight: 600 },
};

const shape = { borderRadius: 12 };

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    ...commonPalette,
    background: {
      default: "#FFFFFF",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#1E293B",
      secondary: "#64748B",
    },
    divider: "rgba(0, 0, 0, 0.08)",
  },
  typography,
  shape,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: "10px 20px",
          fontSize: "0.875rem",
        },
        contained: {
          boxShadow: "none",
          "&:hover": { boxShadow: "0 2px 8px rgba(16, 185, 129, 0.3)" },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          border: "1px solid rgba(0, 0, 0, 0.08)",
          boxShadow: "none",
        },
      },
    },
    MuiTextField: {
      defaultProps: { variant: "outlined", size: "small" },
      styleOverrides: {
        root: { "& .MuiOutlinedInput-root": { borderRadius: 12 } },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { borderRadius: 16 },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          borderBottom: "1px solid rgba(0, 0, 0, 0.08)",
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: { borderRadius: 0 },
      },
    },
    MuiBottomNavigation: {
      styleOverrides: {
        root: {
          borderTop: "1px solid rgba(0, 0, 0, 0.08)",
          height: 64,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { borderRadius: 8, fontWeight: 500 },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: { borderRadius: 4, height: 8 },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          overscrollBehavior: "none",
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
        },
        html: {
          scrollBehavior: "smooth",
          paddingTop: "env(safe-area-inset-top)",
          paddingBottom: "env(safe-area-inset-bottom)",
        },
      },
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    ...commonPalette,
    background: {
      default: "#0F172A",
      paper: "#1E293B",
    },
    text: {
      primary: "#F8FAFC",
      secondary: "#94A3B8",
    },
    divider: "rgba(255, 255, 255, 0.1)",
  },
  typography,
  shape,
  components: {
    ...lightTheme.components,
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          border: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "none",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
        },
      },
    },
    MuiBottomNavigation: {
      styleOverrides: {
        root: {
          borderTop: "1px solid rgba(255, 255, 255, 0.1)",
          height: 64,
        },
      },
    },
  },
});
