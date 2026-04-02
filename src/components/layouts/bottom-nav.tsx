"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { BOTTOM_NAV_ITEMS } from "@/constants/navigation";

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 lg:hidden">
      <div className="h-16 border-t border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-full max-w-lg items-end justify-around px-2 pb-1">
          {BOTTOM_NAV_ITEMS.map((item, index) => {
            const isActive =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            const Icon = item.icon;
            const isCenterAction = index === 2;

            if (isCenterAction) {
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative flex flex-col items-center -mt-5"
                >
                  {/* Elevated circular button */}
                  <span className="flex size-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 transition-transform active:scale-95">
                    <Icon className="size-6" />
                  </span>
                  <span
                    className={cn(
                      "mt-0.5 text-[10px] font-medium",
                      isActive ? "text-emerald-500" : "text-muted-foreground"
                    )}
                  >
                    {item.label}
                  </span>
                </Link>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                className="relative flex flex-col items-center gap-0.5 pt-2 pb-1 px-3"
              >
                <Icon
                  className={cn(
                    "size-5 transition-colors",
                    isActive ? "text-primary" : "text-muted-foreground"
                  )}
                />
                <span
                  className={cn(
                    "text-[10px] font-medium transition-colors",
                    isActive ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  {item.label}
                </span>

                {/* Active indicator dot */}
                {isActive && (
                  <motion.span
                    layoutId="bottom-nav-indicator"
                    className="absolute -bottom-0.5 h-1 w-5 rounded-full bg-primary"
                    transition={{ type: "spring", bounce: 0.25, duration: 0.4 }}
                  />
                )}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Safe area spacer for devices with home indicators */}
      <div className="h-[env(safe-area-inset-bottom)] bg-background/80 backdrop-blur-md" />
    </nav>
  );
}
