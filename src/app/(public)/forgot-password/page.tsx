"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { KeyRound, MailCheck, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/atoms/logo";
import { createClient } from "@/lib/supabase/client";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) {
        toast.error(error.message);
      } else {
        setSent(true);
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="rounded-2xl border bg-card p-8 shadow-sm">
          <div className="flex flex-col items-center mb-6">
            <Logo size="md" />
            {!sent ? (
              <>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mt-4">
                  <KeyRound className="size-6 text-primary" />
                </div>
                <h1 className="font-heading text-2xl font-bold mt-4">
                  Reset your password
                </h1>
                <p className="text-sm text-muted-foreground mt-1 text-center">
                  Enter your email and we&apos;ll send a reset link
                </p>
              </>
            ) : (
              <>
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center mt-4">
                  <MailCheck className="size-6 text-emerald-500" />
                </div>
                <h1 className="font-heading text-2xl font-bold mt-4">
                  Check your inbox
                </h1>
                <p className="text-sm text-muted-foreground mt-1 text-center">
                  We sent a password reset link to{" "}
                  <span className="font-medium text-foreground">{email}</span>
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  Link expires in 1 hour
                </p>
              </>
            )}
          </div>

          {!sent ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="mt-1"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <Button className="w-full" disabled={loading || !email}>
                {loading ? "Sending..." : "Send Reset Link"}
              </Button>
            </form>
          ) : (
            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setSent(false);
                  setLoading(false);
                }}
              >
                Resend Link
              </Button>
            </div>
          )}

          <Link
            href="/login"
            className="flex items-center justify-center gap-1 text-sm text-muted-foreground mt-6 hover:text-foreground"
          >
            <ArrowLeft className="size-3" />
            Back to login
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
