"use client";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <p className="text-7xl font-bold text-muted-foreground/30">404</p>
      <h1 className="font-heading text-2xl font-bold mt-4">Page not found</h1>
      <p className="text-muted-foreground mt-2 text-center">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className={buttonVariants({ className: "mt-6" })}
      >
        Go Home
      </Link>
    </div>
  );
}
