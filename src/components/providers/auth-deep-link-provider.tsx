"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isNative } from "@/hooks/use-native";
import { createClient } from "@/lib/supabase/client";

export function AuthDeepLinkProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    if (!isNative()) return;

    let cleanup: (() => void) | undefined;

    async function setup() {
      try {
        const { App } = await import("@capacitor/app");
        const { Browser } = await import("@capacitor/browser");

        const listener = await App.addListener(
          "appUrlOpen",
          async ({ url }) => {
            if (!url.includes("auth/callback")) return;

            try {
              await Browser.close();
            } catch {
              /* browser may already be closed */
            }

            const hashParams = new URLSearchParams(url.split("#")[1] || "");
            const access_token = hashParams.get("access_token");
            const refresh_token = hashParams.get("refresh_token");

            if (access_token && refresh_token) {
              const supabase = createClient();
              const { error } = await supabase.auth.setSession({
                access_token,
                refresh_token,
              });
              if (!error) {
                router.push("/dashboard");
              }
            }
          }
        );

        cleanup = () => listener.remove();
      } catch {
        // Not in Capacitor environment
      }
    }

    setup();
    return () => cleanup?.();
  }, [router]);

  return <>{children}</>;
}
