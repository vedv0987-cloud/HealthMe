"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { toast } from "sonner";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import MuiButton from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import AppleIcon from "@mui/icons-material/Apple";
import { Logo } from "@/components/atoms/logo";
import { loginSchema, type LoginFormData } from "@/lib/validators/auth";
import { createClient } from "@/lib/supabase/client";
import { signInWithProvider } from "@/lib/auth/oauth";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: LoginFormData) {
    setLoading(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });
      if (error) {
        toast.error(error.message);
      } else {
        router.push("/dashboard");
        router.refresh();
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleOAuth(provider: "google" | "facebook" | "apple") {
    try {
      await signInWithProvider(provider);
    } catch {
      toast.error(`${provider} sign-in failed. Please try again.`);
    }
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
        py: 6,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ width: "100%", maxWidth: 440 }}
      >
        <Paper elevation={0} sx={{ p: 4, borderRadius: 4, border: 1, borderColor: "divider" }}>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 3 }}>
            <Logo size="md" />
            <Typography variant="h5" fontWeight={700} sx={{ mt: 2 }}>
              Welcome back
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              Log in to continue your health journey
            </Typography>
          </Box>

          <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
            <TextField
              label="Email address"
              type="email"
              placeholder="you@example.com"
              fullWidth
              size="small"
              error={!!errors.email}
              helperText={errors.email?.message}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailOutlinedIcon fontSize="small" sx={{ color: "text.secondary" }} />
                    </InputAdornment>
                  ),
                },
              }}
              {...register("email")}
            />

            <Box>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 0.5 }}>
                <Typography variant="body2" fontWeight={500}>
                  Password
                </Typography>
                <Link href="/forgot-password" style={{ fontSize: "0.75rem", color: "inherit", textDecoration: "none" }}>
                  Forgot password?
                </Link>
              </Box>
              <TextField
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                fullWidth
                size="small"
                error={!!errors.password}
                helperText={errors.password?.message}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOutlinedIcon fontSize="small" sx={{ color: "text.secondary" }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          size="small"
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOffIcon fontSize="small" /> : <VisibilityIcon fontSize="small" />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
                {...register("password")}
              />
            </Box>

            <MuiButton
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
              endIcon={!loading && <ArrowForwardIcon />}
              sx={{ py: 1.2 }}
            >
              {loading ? "Logging in..." : "Log In"}
            </MuiButton>
          </Box>

          <Divider sx={{ my: 3 }}>
            <Typography variant="caption" color="text.secondary">
              or continue with
            </Typography>
          </Divider>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
            <MuiButton
              variant="outlined"
              color="inherit"
              fullWidth
              startIcon={<GoogleIcon />}
              onClick={() => handleOAuth("google")}
              sx={{ py: 1 }}
            >
              Continue with Google
            </MuiButton>

            <MuiButton
              variant="outlined"
              color="inherit"
              fullWidth
              startIcon={<FacebookIcon sx={{ color: "#1877F2" }} />}
              onClick={() => handleOAuth("facebook")}
              sx={{ py: 1 }}
            >
              Continue with Facebook
            </MuiButton>

            <MuiButton
              variant="outlined"
              color="inherit"
              fullWidth
              startIcon={<AppleIcon />}
              onClick={() => handleOAuth("apple")}
              sx={{ py: 1 }}
            >
              Continue with Apple
            </MuiButton>
          </Box>

          <Typography variant="body2" align="center" sx={{ mt: 3 }} color="text.secondary">
            Don&apos;t have an account?{" "}
            <Link href="/register" style={{ color: "inherit", fontWeight: 600, textDecoration: "none" }}>
              Sign up free
            </Link>
          </Typography>
        </Paper>
      </motion.div>
    </Box>
  );
}
