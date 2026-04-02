"use client";

import { useEffect } from "react";

/**
 * Hook to handle native Android features via Capacitor.
 * Only runs when Capacitor is available (inside the Android app).
 * No-ops gracefully in web browser.
 */
export function useNativeBackButton() {
  useEffect(() => {
    let cleanup: (() => void) | undefined;

    async function setup() {
      try {
        const { App } = await import("@capacitor/app");
        const listener = await App.addListener(
          "backButton",
          ({ canGoBack }) => {
            if (canGoBack) {
              window.history.back();
            } else {
              App.exitApp();
            }
          }
        );
        cleanup = () => listener.remove();
      } catch {
        // Not running in Capacitor — ignore
      }
    }

    setup();
    return () => cleanup?.();
  }, []);
}

export function useNativeSplashScreen() {
  useEffect(() => {
    async function hide() {
      try {
        const { SplashScreen } = await import("@capacitor/splash-screen");
        await SplashScreen.hide();
      } catch {
        // Not running in Capacitor — ignore
      }
    }
    hide();
  }, []);
}

export function useNativeStatusBar(isDark: boolean) {
  useEffect(() => {
    async function update() {
      try {
        const { StatusBar } = await import("@capacitor/status-bar");
        await StatusBar.setStyle({
          style: isDark ? "DARK" as never : "LIGHT" as never,
        });
        await StatusBar.setBackgroundColor({
          color: isDark ? "#0F172A" : "#FFFFFF",
        });
      } catch {
        // Not running in Capacitor — ignore
      }
    }
    update();
  }, [isDark]);
}

/** Check if running inside Capacitor native app */
export function isNative(): boolean {
  if (typeof window === "undefined") return false;
  return !!(window as unknown as Record<string, unknown>).Capacitor;
}
