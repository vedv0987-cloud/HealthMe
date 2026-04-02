"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronsLeft, ChevronsRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Logo } from "@/components/atoms/logo";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { SIDEBAR_NAV_ITEMS } from "@/constants/navigation";
import { useUiStore } from "@/stores/ui-store";
import { useIsDesktop } from "@/hooks/use-media-query";

function SidebarNavContent({ collapsed }: { collapsed: boolean }) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1 px-2">
      {SIDEBAR_NAV_ITEMS.map((item) => {
        const isActive =
          pathname === item.href || pathname.startsWith(`${item.href}/`);
        const Icon = item.icon;

        const link = (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "group relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              collapsed && "justify-center px-2",
              isActive
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            {isActive && (
              <motion.span
                layoutId="sidebar-active-bg"
                className="absolute inset-0 rounded-lg bg-primary/10"
                transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
              />
            )}
            <Icon
              className={cn(
                "relative z-10 size-5 shrink-0",
                isActive && "text-primary"
              )}
            />
            {!collapsed && (
              <span className="relative z-10 truncate">{item.label}</span>
            )}
          </Link>
        );

        if (collapsed) {
          return (
            <Tooltip key={item.href}>
              <TooltipTrigger render={link} />
              <TooltipContent side="right">{item.label}</TooltipContent>
            </Tooltip>
          );
        }

        return link;
      })}
    </nav>
  );
}

function SidebarUserCard({ collapsed }: { collapsed: boolean }) {
  if (collapsed) {
    return (
      <div className="flex justify-center px-2 py-3">
        <Avatar size="sm">
          <AvatarImage src="/avatars/user.jpg" alt="User" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 rounded-lg border border-border bg-muted/40 px-3 py-2.5 mx-2">
      <Avatar size="sm">
        <AvatarImage src="/avatars/user.jpg" alt="User" />
        <AvatarFallback>U</AvatarFallback>
      </Avatar>
      <div className="flex flex-col min-w-0">
        <span className="truncate text-sm font-medium text-foreground">
          User
        </span>
        <Badge variant="secondary" className="w-fit text-[10px] px-1.5 h-4">
          Free Plan
        </Badge>
      </div>
    </div>
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
      className="hidden lg:flex flex-col h-screen sticky top-0 border-r border-border bg-background z-40 overflow-hidden"
    >
      {/* Logo + collapse toggle */}
      <div
        className={cn(
          "flex h-16 shrink-0 items-center border-b border-border px-3",
          collapsed ? "justify-center" : "justify-between"
        )}
      >
        <Logo size="sm" showText={!collapsed} />
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={toggleSidebar}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <ChevronsRight className="size-4" />
          ) : (
            <ChevronsLeft className="size-4" />
          )}
        </Button>
      </div>

      {/* Nav items */}
      <ScrollArea className="flex-1 py-3">
        <SidebarNavContent collapsed={collapsed} />
      </ScrollArea>

      {/* User card */}
      <div className="shrink-0 border-t border-border py-3">
        <SidebarUserCard collapsed={collapsed} />
      </div>
    </motion.aside>
  );
}

/** Mobile sidebar (Sheet drawer) */
export function MobileSidebar() {
  const sidebarOpen = useUiStore((s) => s.sidebarOpen);
  const setSidebarOpen = useUiStore((s) => s.setSidebarOpen);

  return (
    <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
      <SheetContent side="left" className="w-72 p-0">
        <SheetTitle className="sr-only">Navigation</SheetTitle>

        {/* Logo */}
        <div className="flex h-16 items-center border-b border-border px-4">
          <Logo size="sm" showText />
        </div>

        {/* Nav */}
        <ScrollArea className="flex-1 py-3">
          <SidebarNavContent collapsed={false} />
        </ScrollArea>

        {/* User card */}
        <div className="mt-auto border-t border-border py-3">
          <SidebarUserCard collapsed={false} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
