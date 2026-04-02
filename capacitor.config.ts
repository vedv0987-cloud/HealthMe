import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "app.healme.main",
  appName: "HealMe",
  webDir: "out",

  android: {
    allowMixedContent: false,
  },

  server: {
    // Production: load from bundled files
    // Development: uncomment and set your local IP for live reload
    // url: "http://192.168.1.XXX:3000",
    // cleartext: true,
    androidScheme: "https",
  },

  plugins: {
    SplashScreen: {
      launchAutoHide: true,
      launchShowDuration: 2000,
      backgroundColor: "#10B981",
      androidSplashResourceName: "splash",
      androidScaleType: "CENTER_CROP",
      showSpinner: false,
    },
    StatusBar: {
      style: "DARK",
      backgroundColor: "#FFFFFF",
    },
    Keyboard: {
      resize: "body",
      resizeOnFullScreen: true,
    },
    PushNotifications: {
      presentationOptions: ["badge", "sound", "alert"],
    },
  },
};

export default config;
