"use client";

import { useTheme } from "next-themes";
import {
  useNativeBackButton,
  useNativeSplashScreen,
  useNativeStatusBar,
} from "@/hooks/use-native";

export function NativeProvider({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useTheme();

  useNativeBackButton();
  useNativeSplashScreen();
  useNativeStatusBar(resolvedTheme === "dark");

  return <>{children}</>;
}
