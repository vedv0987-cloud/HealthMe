"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Smartphone } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/atoms/logo";

export default function VerifyOtpPage() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(30);
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  function handleChange(index: number, value: string) {
    if (!/^\d*$/.test(value)) return;
    const next = [...otp];
    next[index] = value.slice(-1);
    setOtp(next);
    if (value && index < 5) {
      refs.current[index + 1]?.focus();
    }
    if (next.every((d) => d !== "")) {
      handleVerify(next.join(""));
    }
  }

  function handleKeyDown(index: number, e: React.KeyboardEvent) {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      refs.current[index - 1]?.focus();
    }
  }

  async function handleVerify(code: string) {
    setLoading(true);
    try {
      // Placeholder - would call POST /api/auth/verify-otp
      await new Promise((r) => setTimeout(r, 1000));
      toast.success("Phone verified!");
      window.location.href = "/onboarding";
    } catch {
      toast.error("Invalid code. Please try again.");
      setOtp(["", "", "", "", "", ""]);
      refs.current[0]?.focus();
    } finally {
      setLoading(false);
    }
  }

  function resend() {
    if (cooldown > 0) return;
    toast.success("OTP sent!");
    setCooldown(30);
    const interval = setInterval(() => {
      setCooldown((c) => {
        if (c <= 1) { clearInterval(interval); return 0; }
        return c - 1;
      });
    }, 1000);
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
            <Smartphone className="size-8 text-primary" />
          </div>
          <h1 className="font-heading text-2xl font-bold mt-4">
            Enter verification code
          </h1>
          <p className="text-sm text-muted-foreground mt-2">
            We sent a 6-digit code to your phone
          </p>

          <div className="flex justify-center gap-2 mt-8">
            {otp.map((digit, i) => (
              <input
                key={i}
                ref={(el) => { refs.current[i] = el; }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                className="w-12 h-14 text-center text-2xl font-bold font-mono rounded-xl border bg-card focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                autoFocus={i === 0}
              />
            ))}
          </div>

          {loading && (
            <p className="text-sm text-muted-foreground mt-4">Verifying...</p>
          )}

          <div className="mt-6">
            <button
              onClick={resend}
              disabled={cooldown > 0}
              className="text-sm text-muted-foreground hover:text-foreground disabled:opacity-50"
            >
              {cooldown > 0
                ? `Resend OTP in ${cooldown}s`
                : "Didn't receive it? Resend OTP"}
            </button>
          </div>

          <Button
            variant="ghost"
            className="mt-4 text-sm"
            onClick={() => window.history.back()}
          >
            Change phone number
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
