"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/atoms/logo";
import { createClient } from "@/lib/supabase/client";

export default function VerifyEmailPage() {
  const [resending, setResending] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  async function resend() {
    if (cooldown > 0) return;
    setResending(true);
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user?.email) {
        await supabase.auth.resend({ type: "signup", email: user.email });
        toast.success("Verification email sent!");
        setCooldown(60);
        const interval = setInterval(() => {
          setCooldown((c) => {
            if (c <= 1) { clearInterval(interval); return 0; }
            return c - 1;
          });
        }, 1000);
      }
    } catch {
      toast.error("Failed to resend");
    } finally {
      setResending(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="rounded-2xl border bg-card p-8 shadow-sm text-center">
          <Logo size="md" />
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mt-6">
            <Mail className="size-8 text-primary" />
          </div>
          <h1 className="font-heading text-2xl font-bold mt-4">
            Check your email
          </h1>
          <p className="text-sm text-muted-foreground mt-2">
            We sent a verification link to your email address. Click the link to
            verify your account.
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            It expires in 24 hours.
          </p>

          <div className="mt-6 space-y-3">
            <Button
              variant="outline"
              className="w-full"
              onClick={resend}
              disabled={resending || cooldown > 0}
            >
              <RefreshCw className={`size-4 mr-2 ${resending ? "animate-spin" : ""}`} />
              {cooldown > 0 ? `Resend in ${cooldown}s` : "Resend Email"}
            </Button>
          </div>

          <Link
            href="/register"
            className="block text-sm text-muted-foreground mt-4 hover:text-foreground"
          >
            Wrong email? Go back
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
