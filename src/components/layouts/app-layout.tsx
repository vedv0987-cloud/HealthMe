"use client";

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
    <div className="flex h-screen bg-background">
      {/* Desktop sidebar */}
      {isDesktop && <DesktopSidebar />}

      {/* Mobile sidebar drawer */}
      {!isDesktop && <MobileSidebar />}

      {/* Main content area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <AppHeader title={title} />

        <main className="flex-1 overflow-y-auto p-4 pb-24 lg:p-6 lg:pb-6">
          {children}
        </main>
      </div>

      {/* Mobile bottom navigation */}
      {!isDesktop && <BottomNav />}
    </div>
  );
}
