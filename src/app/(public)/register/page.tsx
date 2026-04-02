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
import LinearProgress from "@mui/material/LinearProgress";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import AppleIcon from "@mui/icons-material/Apple";
import { Logo } from "@/components/atoms/logo";
import { registerSchema, type RegisterFormData } from "@/lib/validators/auth";
import { createClient } from "@/lib/supabase/client";
import { signInWithProvider } from "@/lib/auth/oauth";

function getPasswordStrength(password: string) {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return score;
}

const strengthLabels = ["", "Weak", "Fair", "Good", "Strong"];
const strengthColors = ["inherit", "error", "warning", "info", "success"] as const;

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const password = watch("password", "");
  const strength = getPasswordStrength(password);

  async function onSubmit(data: RegisterFormData) {
    setLoading(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: { data: { full_name: data.name } },
      });
      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Account created! Check your email to verify.");
        router.push("/dashboard");
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
      toast.error(`${provider} sign-up failed. Please try again.`);
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
              Start your health journey
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              Free forever. No credit card needed.
            </Typography>
          </Box>

          <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="Full name"
              placeholder="Your name"
              fullWidth
              size="small"
              error={!!errors.name}
              helperText={errors.name?.message}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonOutlinedIcon fontSize="small" sx={{ color: "text.secondary" }} />
                    </InputAdornment>
                  ),
                },
              }}
              {...register("name")}
            />

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
              <TextField
                label="Create password"
                type={showPassword ? "text" : "password"}
                placeholder="Min 8 characters"
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
                        <IconButton size="small" onClick={() => setShowPassword(!showPassword)} edge="end">
                          {showPassword ? <VisibilityOffIcon fontSize="small" /> : <VisibilityIcon fontSize="small" />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
                {...register("password")}
              />
              {password && (
                <Box sx={{ mt: 1 }}>
                  <LinearProgress
                    variant="determinate"
                    value={strength * 25}
                    color={strengthColors[strength] || "grey"}
                    sx={{ height: 4, borderRadius: 2 }}
                  />
                  <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>
                    {strengthLabels[strength]}
                  </Typography>
                </Box>
              )}
            </Box>

            <TextField
              label="Confirm password"
              type="password"
              placeholder="Repeat password"
              fullWidth
              size="small"
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlinedIcon fontSize="small" sx={{ color: "text.secondary" }} />
                    </InputAdornment>
                  ),
                },
              }}
              {...register("confirmPassword")}
            />

            <FormControlLabel
              control={<Checkbox size="small" {...register("agreeToTerms")} />}
              label={
                <Typography variant="body2">
                  I agree to the{" "}
                  <Link href="/terms" style={{ color: "inherit", fontWeight: 600 }}>
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" style={{ color: "inherit", fontWeight: 600 }}>
                    Privacy Policy
                  </Link>
                </Typography>
              }
            />
            {errors.agreeToTerms && (
              <Typography variant="caption" color="error">
                {errors.agreeToTerms.message}
              </Typography>
            )}

            <MuiButton
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
              sx={{ py: 1.2 }}
            >
              {loading ? "Creating account..." : "Create Free Account"}
            </MuiButton>
          </Box>

          <Divider sx={{ my: 3 }}>
            <Typography variant="caption" color="text.secondary">
              or sign up with
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
            Already have an account?{" "}
            <Link href="/login" style={{ color: "inherit", fontWeight: 600, textDecoration: "none" }}>
              Log in
            </Link>
          </Typography>
        </Paper>
      </motion.div>
    </Box>
  );
}
