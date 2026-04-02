import {
  LayoutDashboard,
  BookOpen,
  Camera,
  Compass,
  UserCircle,
  Bot,
  ChefHat,
  TrendingUp,
  Timer,
  Users,
  UserCog,
  Settings,
  Heart,
  FileText,
  type LucideIcon,
} from "lucide-react";

export type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export const BOTTOM_NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/dashboard", icon: LayoutDashboard },
  { label: "Diary", href: "/diary", icon: BookOpen },
  { label: "Log", href: "/log", icon: Camera },
  { label: "Discover", href: "/discover", icon: Compass },
  { label: "Profile", href: "/profile", icon: UserCircle },
];

export const SIDEBAR_NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Food Diary", href: "/diary", icon: BookOpen },
  { label: "Log Meal", href: "/log", icon: Camera },
  { label: "Ria AI Coach", href: "/ria", icon: Bot },
  { label: "Discover", href: "/discover", icon: Compass },
  { label: "Recipes", href: "/recipes", icon: ChefHat },
  { label: "Progress", href: "/progress", icon: TrendingUp },
  { label: "Gut Health", href: "/progress/gut-health", icon: Heart },
  { label: "Fasting", href: "/fasting", icon: Timer },
  { label: "Community", href: "/community", icon: Users },
  { label: "Reports", href: "/progress/report", icon: FileText },
  { label: "Coach", href: "/coach", icon: UserCog },
  { label: "Settings", href: "/settings/notifications", icon: Settings },
];
