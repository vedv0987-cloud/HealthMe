"use client";

import Link from "next/link";
import { Logo } from "@/components/atoms/logo";

const footerLinks = {
  Product: [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "Recipes", href: "#" },
    { label: "AI Coach", href: "#" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Careers", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Press", href: "#" },
  ],
  Support: [
    { label: "Help Center", href: "#" },
    { label: "Contact", href: "#" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
  Connect: [
    { label: "Twitter", href: "#" },
    { label: "Instagram", href: "#" },
    { label: "YouTube", href: "#" },
    { label: "Discord", href: "#" },
  ],
};

export function LandingFooter() {
  return (
    <footer className="border-t py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-8">
          <div className="col-span-2 md:col-span-1">
            <Logo size="sm" showText />
            <p className="text-sm text-muted-foreground mt-3">
              Your AI-powered health companion.
            </p>
          </div>
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold text-sm mb-3">{title}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t pt-6 flex flex-col md:flex-row justify-between items-center gap-2 text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} HealMe. All rights reserved.</p>
          <p>Made with love in India</p>
        </div>
      </div>
    </footer>
  );
}
