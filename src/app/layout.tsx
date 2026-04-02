import type { Metadata, Viewport } from "next";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
import { MuiThemeProvider } from "@/components/providers/mui-theme-provider";
import { NativeProvider } from "@/components/providers/native-provider";
import { AuthDeepLinkProvider } from "@/components/providers/auth-deep-link-provider";
import { AuthGuardProvider } from "@/components/providers/auth-guard-provider";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "HealMe — AI-Powered Health & Nutrition Tracker",
    template: "%s | HealMe",
  },
  description:
    "Track calories, macros, water, exercise, and sleep with AI photo scanning. Built for Indian diets, loved globally. Free to start.",
  keywords: [
    "calorie tracker",
    "nutrition app",
    "Indian diet tracker",
    "AI meal scanner",
    "weight loss app",
    "macro tracker",
  ],
  openGraph: {
    title: "HealMe — AI-Powered Health & Nutrition Tracker",
    description:
      "Track calories, macros, water, exercise, and sleep with AI photo scanning.",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export const viewport: Viewport = {
  themeColor: "#10B981",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <MuiThemeProvider>
            <NativeProvider>
              <AuthDeepLinkProvider>
                <AuthGuardProvider>
                  {children}
                </AuthGuardProvider>
              </AuthDeepLinkProvider>
            </NativeProvider>
            <Toaster richColors position="top-center" />
          </MuiThemeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
