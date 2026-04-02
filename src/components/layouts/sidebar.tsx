"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import MuiAvatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import MuiTooltip from "@mui/material/Tooltip";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import { Logo } from "@/components/atoms/logo";
import { SIDEBAR_NAV_ITEMS } from "@/constants/navigation";
import { useUiStore } from "@/stores/ui-store";

function SidebarNavContent({ collapsed }: { collapsed: boolean }) {
  const pathname = usePathname();

  return (
    <List sx={{ px: 1 }}>
      {SIDEBAR_NAV_ITEMS.map((item) => {
        const isActive =
          pathname === item.href || pathname.startsWith(`${item.href}/`);
        const Icon = item.icon;

        const button = (
          <ListItem key={item.href} disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              component={Link}
              href={item.href}
              selected={isActive}
              sx={{
                borderRadius: 2,
                minHeight: 40,
                justifyContent: collapsed ? "center" : "flex-start",
                px: collapsed ? 1.5 : 2,
                "&.Mui-selected": {
                  bgcolor: "primary.main",
                  color: "primary.contrastText",
                  "&:hover": { bgcolor: "primary.dark" },
                  "& .MuiListItemIcon-root": { color: "primary.contrastText" },
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: collapsed ? 0 : 36,
                  color: isActive ? "primary.contrastText" : "text.secondary",
                }}
              >
                <Icon size={20} />
              </ListItemIcon>
              {!collapsed && (
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontSize: "0.875rem",
                    fontWeight: isActive ? 600 : 500,
                  }}
                />
              )}
            </ListItemButton>
          </ListItem>
        );

        if (collapsed) {
          return (
            <MuiTooltip key={item.href} title={item.label} placement="right" arrow>
              {button}
            </MuiTooltip>
          );
        }

        return button;
      })}
    </List>
  );
}

function SidebarUserCard({ collapsed }: { collapsed: boolean }) {
  if (collapsed) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", px: 1, py: 1.5 }}>
        <MuiAvatar src="/avatars/user.jpg" alt="User" sx={{ width: 28, height: 28 }} />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.5,
        mx: 1,
        px: 1.5,
        py: 1.5,
        borderRadius: 2,
        bgcolor: "action.hover",
      }}
    >
      <MuiAvatar src="/avatars/user.jpg" alt="User" sx={{ width: 28, height: 28 }} />
      <Box sx={{ minWidth: 0 }}>
        <Typography variant="body2" fontWeight={500} noWrap>
          User
        </Typography>
        <Chip label="Free Plan" size="small" color="secondary" sx={{ height: 18, fontSize: "0.625rem" }} />
      </Box>
    </Box>
  );
}

/** Desktop sidebar */
export function DesktopSidebar() {
  const sidebarOpen = useUiStore((s) => s.sidebarOpen);
  const toggleSidebar = useUiStore((s) => s.toggleSidebar);
  const collapsed = !sidebarOpen;

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 64 : 256 }}
      transition={{ type: "spring", bounce: 0.15, duration: 0.4 }}
      style={{
        display: "none",
        flexDirection: "column",
        height: "100vh",
        position: "sticky",
        top: 0,
        overflow: "hidden",
        zIndex: 40,
      }}
    >
      <Box
        sx={{
          display: { xs: "none", lg: "flex" },
          flexDirection: "column",
          height: "100%",
          borderRight: 1,
          borderColor: "divider",
          bgcolor: "background.paper",
        }}
      >
        {/* Logo + collapse toggle */}
        <Box
          sx={{
            display: "flex",
            height: 64,
            alignItems: "center",
            borderBottom: 1,
            borderColor: "divider",
            px: collapsed ? 0 : 1.5,
            justifyContent: collapsed ? "center" : "space-between",
          }}
        >
          {!collapsed && <Logo size="sm" showText />}
          <IconButton onClick={toggleSidebar} size="small">
            {collapsed ? <ChevronRightIcon fontSize="small" /> : <ChevronLeftIcon fontSize="small" />}
          </IconButton>
        </Box>

        {/* Nav items */}
        <Box sx={{ flex: 1, overflowY: "auto", py: 1 }}>
          <SidebarNavContent collapsed={collapsed} />
        </Box>

        {/* User card */}
        <Divider />
        <Box sx={{ py: 1 }}>
          <SidebarUserCard collapsed={collapsed} />
        </Box>
      </Box>
    </motion.aside>
  );
}

/** Mobile sidebar (Drawer) */
export function MobileSidebar() {
  const sidebarOpen = useUiStore((s) => s.sidebarOpen);
  const setSidebarOpen = useUiStore((s) => s.setSidebarOpen);

  return (
    <Drawer
      open={sidebarOpen}
      onClose={() => setSidebarOpen(false)}
      sx={{
        "& .MuiDrawer-paper": {
          width: 280,
          bgcolor: "background.paper",
        },
      }}
    >
      {/* Logo */}
      <Box
        sx={{
          display: "flex",
          height: 64,
          alignItems: "center",
          borderBottom: 1,
          borderColor: "divider",
          px: 2,
        }}
      >
        <Logo size="sm" showText />
      </Box>

      {/* Nav */}
      <Box sx={{ flex: 1, overflowY: "auto", py: 1 }}>
        <SidebarNavContent collapsed={false} />
      </Box>

      {/* User card */}
      <Divider />
      <Box sx={{ py: 1 }}>
        <SidebarUserCard collapsed={false} />
      </Box>
    </Drawer>
  );
}
