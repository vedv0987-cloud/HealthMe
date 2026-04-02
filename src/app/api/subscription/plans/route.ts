import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    plans: [
      {
        id: "free",
        name: "Free",
        price_inr_monthly: 0,
        price_inr_annual: 0,
        price_usd_monthly: 0,
        price_usd_annual: 0,
        features: {
          photo_scans_per_day: 5,
          food_database: "limited",
          ai_chat_per_day: 10,
          barcode_scanner: false,
          meal_plans: false,
          weekly_report: false,
          coach: false,
          ads: true,
        },
      },
      {
        id: "smart",
        name: "Smart",
        price_inr_monthly: 199,
        price_inr_annual: 1499,
        price_usd_monthly: 4.99,
        price_usd_annual: 39.99,
        features: {
          photo_scans_per_day: "unlimited",
          food_database: "full",
          ai_chat_per_day: "unlimited",
          barcode_scanner: true,
          meal_plans: true,
          weekly_report: true,
          coach: false,
          ads: false,
        },
      },
      {
        id: "pro",
        name: "Pro",
        price_inr_monthly: 999,
        price_inr_annual: 7999,
        price_usd_monthly: 14.99,
        price_usd_annual: 119.99,
        features: {
          includes_smart: true,
          coach_diet: true,
          video_consultations: 2,
          cgm_integration: true,
          priority_support: true,
        },
      },
      {
        id: "elite",
        name: "Elite",
        price_inr_monthly: 1999,
        price_inr_annual: 15999,
        price_usd_monthly: 29.99,
        price_usd_annual: 249.99,
        features: {
          includes_pro: true,
          coach_fitness: true,
          unlimited_video: true,
          cgm_device: true,
          smart_scale: true,
          family_sharing: 4,
        },
      },
    ],
  });
}
