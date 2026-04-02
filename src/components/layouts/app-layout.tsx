"use client";

import Box from "@mui/material/Box";
import { useIsDesktop } from "@/hooks/use-media-query";
import { AppHeader } from "@/components/layouts/app-header";
import { DesktopSidebar, MobileSidebar } from "@/components/layouts/sidebar";
import { BottomNav } from "@/components/layouts/bottom-nav";

interface AppLayoutProps {
  children: React.ReactNode;
  title?: string;
}

export function AppLayout({ children, title }: AppLayoutProps) {
  const isDesktop = useIsDesktop();

  return (
    <Box sx={{ display: "flex", height: "100vh", bgcolor: "background.default" }}>
      {isDesktop && <DesktopSidebar />}
      {!isDesktop && <MobileSidebar />}

      <Box sx={{ display: "flex", flexDirection: "column", flex: 1, overflow: "hidden" }}>
        <AppHeader title={title} />

        <Box
          component="main"
          sx={{
            flex: 1,
            overflowY: "auto",
            p: { xs: 2, lg: 3 },
            pb: { xs: 12, lg: 3 },
          }}
        >
          {children}
        </Box>
      </Box>

      {!isDesktop && <BottomNav />}
    </Box>
  );
}
