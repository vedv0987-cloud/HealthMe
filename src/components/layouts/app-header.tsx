"use client";

import { Bell, Menu, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUiStore } from "@/stores/ui-store";
import { useIsDesktop } from "@/hooks/use-media-query";

interface AppHeaderProps {
  title?: string;
}

export function AppHeader({ title = "Dashboard" }: AppHeaderProps) {
  const { theme, setTheme } = useTheme();
  const toggleSidebar = useUiStore((s) => s.toggleSidebar);
  const isDesktop = useIsDesktop();

  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur-md lg:px-6">
      {/* Mobile hamburger */}
      {!isDesktop && (
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
        >
          <Menu className="size-5" />
        </Button>
      )}

      {/* Page title */}
      <h1 className="font-heading text-lg font-semibold text-foreground truncate">
        {title}
      </h1>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Right-side actions */}
      <div className="flex items-center gap-1">
        {/* Theme toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          aria-label="Toggle theme"
        >
          <Sun className="size-4 scale-100 rotate-0 transition-transform dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute size-4 scale-0 rotate-90 transition-transform dark:scale-100 dark:rotate-0" />
        </Button>

        {/* Notifications */}
        <Button variant="ghost" size="icon" aria-label="Notifications">
          <Bell className="size-4" />
        </Button>

        {/* User avatar */}
        <Avatar size="sm" className="ml-1 cursor-pointer">
          <AvatarImage src="/avatars/user.jpg" alt="User avatar" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
