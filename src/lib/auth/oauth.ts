import { createClient } from "@/lib/supabase/client";
import { isNative } from "@/hooks/use-native";

type OAuthProvider = "google" | "facebook" | "apple";

export async function signInWithProvider(provider: OAuthProvider) {
  const supabase = createClient();

  if (isNative()) {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: "app.healme.main://auth/callback",
        skipBrowserRedirect: true,
      },
    });
    if (error) throw error;
    if (data.url) {
      const { Browser } = await import("@capacitor/browser");
      await Browser.open({ url: data.url, windowName: "_self" });
    }
  } else {
    await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/api/auth/callback`,
      },
    });
  }
}
