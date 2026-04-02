"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";

import { BOTTOM_NAV_ITEMS } from "@/constants/navigation";

export function BottomNav() {
  const pathname = usePathname();

  const activeIndex = BOTTOM_NAV_ITEMS.findIndex(
    (item) => pathname === item.href || pathname.startsWith(`${item.href}/`)
  );

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 40,
        display: { lg: "none" },
      }}
    >
      <Box
        sx={{
          borderTop: 1,
          borderColor: "divider",
          bgcolor: "background.paper",
          backdropFilter: "blur(12px)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            height: 64,
            maxWidth: 480,
            mx: "auto",
            alignItems: "flex-end",
            justifyContent: "space-around",
            px: 1,
            pb: 0.5,
          }}
        >
          {BOTTOM_NAV_ITEMS.map((item, index) => {
            const isActive =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            const Icon = item.icon;
            const isCenterAction = index === 2;

            if (isCenterAction) {
              return (
                <Box
                  key={item.href}
                  component={Link}
                  href={item.href}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    mt: -2.5,
                    textDecoration: "none",
                  }}
                >
                  <Fab
                    color="primary"
                    size="medium"
                    sx={{
                      boxShadow: "0 4px 14px rgba(16, 185, 129, 0.4)",
                    }}
                  >
                    <Icon size={24} />
                  </Fab>
                  <Typography
                    variant="caption"
                    sx={{
                      mt: 0.25,
                      fontSize: "0.625rem",
                      fontWeight: 500,
                      color: isActive ? "primary.main" : "text.secondary",
                    }}
                  >
                    {item.label}
                  </Typography>
                </Box>
              );
            }

            return (
              <Box
                key={item.href}
                component={Link}
                href={item.href}
                sx={{
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 0.25,
                  pt: 1,
                  pb: 0.5,
                  px: 1.5,
                  textDecoration: "none",
                }}
              >
                <Icon
                  size={20}
                  style={{
                    color: isActive ? "var(--mui-palette-primary-main)" : "var(--mui-palette-text-secondary)",
                    transition: "color 0.2s",
                  }}
                />
                <Typography
                  variant="caption"
                  sx={{
                    fontSize: "0.625rem",
                    fontWeight: 500,
                    color: isActive ? "primary.main" : "text.secondary",
                  }}
                >
                  {item.label}
                </Typography>

                {isActive && (
                  <motion.span
                    layoutId="bottom-nav-indicator"
                    style={{
                      position: "absolute",
                      bottom: -2,
                      height: 4,
                      width: 20,
                      borderRadius: 2,
                      background: "var(--mui-palette-primary-main)",
                    }}
                    transition={{ type: "spring", bounce: 0.25, duration: 0.4 }}
                  />
                )}
              </Box>
            );
          })}
        </Box>
      </Box>

      {/* Safe area spacer */}
      <Box
        sx={{
          height: "env(safe-area-inset-bottom)",
          bgcolor: "background.paper",
          backdropFilter: "blur(12px)",
        }}
      />
    </Box>
  );
}
