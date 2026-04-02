"use client";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import MuiAvatar from "@mui/material/Avatar";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { useTheme } from "next-themes";
import { useUiStore } from "@/stores/ui-store";
import { useIsDesktop } from "@/hooks/use-media-query";

interface AppHeaderProps {
  title?: string;
}

export function AppHeader({ title = "Dashboard" }: AppHeaderProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const toggleSidebar = useUiStore((s) => s.toggleSidebar);
  const isDesktop = useIsDesktop();

  return (
    <AppBar
      position="sticky"
      color="inherit"
      sx={{
        bgcolor: "background.default",
        backdropFilter: "blur(12px)",
        zIndex: 30,
      }}
    >
      <Toolbar sx={{ gap: 1, minHeight: 64 }}>
        {!isDesktop && (
          <IconButton
            edge="start"
            onClick={toggleSidebar}
            aria-label="Toggle sidebar"
          >
            <MenuIcon />
          </IconButton>
        )}

        <Typography
          variant="h6"
          noWrap
          sx={{ fontWeight: 600, fontSize: "1.125rem" }}
        >
          {title}
        </Typography>

        <Box sx={{ flex: 1 }} />

        <IconButton
          onClick={() =>
            setTheme(resolvedTheme === "dark" ? "light" : "dark")
          }
          aria-label="Toggle theme"
        >
          {resolvedTheme === "dark" ? (
            <LightModeOutlinedIcon fontSize="small" />
          ) : (
            <DarkModeOutlinedIcon fontSize="small" />
          )}
        </IconButton>

        <IconButton aria-label="Notifications">
          <NotificationsOutlinedIcon fontSize="small" />
        </IconButton>

        <MuiAvatar
          src="/avatars/user.jpg"
          alt="User"
          sx={{ width: 32, height: 32, ml: 0.5, cursor: "pointer" }}
        />
      </Toolbar>
    </AppBar>
  );
}
