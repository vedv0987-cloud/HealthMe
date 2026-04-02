import {
  LayoutDashboard,
  BookOpen,
  Camera,
  Bot,
  UserCircle,
  ChefHat,
  TrendingUp,
  Timer,
  Users,
  UserCog,
  Settings,
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
  { label: "Ria", href: "/ria", icon: Bot },
  { label: "Profile", href: "/profile", icon: UserCircle },
];

export const SIDEBAR_NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Food Diary", href: "/diary", icon: BookOpen },
  { label: "Log Meal", href: "/log", icon: Camera },
  { label: "Ria AI Coach", href: "/ria", icon: Bot },
  { label: "Recipes", href: "/recipes", icon: ChefHat },
  { label: "Progress", href: "/progress", icon: TrendingUp },
  { label: "Fasting", href: "/fasting", icon: Timer },
  { label: "Community", href: "/community", icon: Users },
  { label: "Coach", href: "/coach", icon: UserCog },
  { label: "Settings", href: "/settings", icon: Settings },
];
