/**
 * Admin Login Page
 * Authentication page for admin panel access - Matching reference code design
 */

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Alert,
  CircularProgress,
} from "@mui/material";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useAuthContext } from "@/context/AuthContext";
import { ADMIN_ROUTES } from "@/lib/constants";

/**
 * Admin Login Page Component
 */
const AdminLoginPage = () => {
  const router = useRouter();
  const {
    login,
    isAuthenticated,
    isLoading,
    isInitialized,
    error,
    clearError,
  } = useAuthContext();

  // State
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginError, setLoginError] = useState("");

  // Redirect if already authenticated
  useEffect(() => {
    if (isInitialized && isAuthenticated) {
      router.replace(ADMIN_ROUTES.DASHBOARD);
    }
  }, [isAuthenticated, isInitialized, router]);

  // Clear errors on mount
  useEffect(() => {
    clearError();
    setLoginError("");
  }, [clearError]);

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setLoginError("");
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setLoginError("");
    clearError();

    const result = await login(formData.email, formData.password, true);

    if (result.success) {
      toast.success("Login successful! Redirecting...");
      router.push(ADMIN_ROUTES.DASHBOARD);
    } else {
      setLoginError(result.error || "Invalid credentials");
      toast.error(result.error || "Login failed");
    }

    setIsSubmitting(false);
  };

  // Show loading while checking auth
  if (!isInitialized || isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          background: (theme) =>
            theme.palette.mode === "dark"
              ? "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f0f23 100%)"
              : "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #6B8DD6 100%)",
        }}
      >
        <CircularProgress size={48} sx={{ color: "#fff" }} />
      </Box>
    );
  }

  // Don't show login if already authenticated
  if (isAuthenticated) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Admin Login | District 25</title>
        <meta
          name="description"
          content="Admin login for Nambiar District 25"
        />
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: (theme) =>
            theme.palette.mode === "dark"
              ? "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f0f23 100%)"
              : "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #6B8DD6 100%)",
          p: 2,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Paper
            elevation={24}
            sx={{
              p: 4,
              width: "100%",
              maxWidth: 420,
              borderRadius: 3,
              background: (theme) =>
                theme.palette.mode === "dark"
                  ? "rgba(30, 30, 50, 0.95)"
                  : "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(10px)",
            }}
          >
            {/* Logo/Header */}
            <Box sx={{ textAlign: "center", mb: 4 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mx: "auto",
                  mb: 2,
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 800,
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    filter: "drop-shadow(0 4px 16px rgba(102, 126, 234, 0.3))",
                  }}
                >
                  District 25
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Sign in to manage your leads
              </Typography>
            </Box>

            {/* Error Alert */}
            {(loginError || error) && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {loginError || error}
              </Alert>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                sx={{ mb: 2 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Icon
                        icon="mdi:email-outline"
                        style={{ fontSize: 20, color: "#667eea" }}
                      />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                fullWidth
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                required
                sx={{ mb: 3 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Icon
                        icon="mdi:lock-outline"
                        style={{ fontSize: 20, color: "#667eea" }}
                      />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        <Icon
                          icon={
                            showPassword
                              ? "mdi:eye-off-outline"
                              : "mdi:eye-outline"
                          }
                          style={{ fontSize: 20 }}
                        />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={isSubmitting}
                sx={{
                  py: 1.5,
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  borderRadius: 2,
                  textTransform: "none",
                  fontSize: "1rem",
                  fontWeight: 600,
                  boxShadow: "0 8px 24px rgba(102, 126, 234, 0.3)",
                  "&:hover": {
                    background:
                      "linear-gradient(135deg, #5a72d4 0%, #6a4190 100%)",
                    boxShadow: "0 12px 32px rgba(102, 126, 234, 0.4)",
                  },
                }}
              >
                {isSubmitting ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  <>
                    <Icon
                      icon="mdi:login"
                      style={{ marginRight: 8, fontSize: 20 }}
                    />
                    Sign In
                  </>
                )}
              </Button>
            </form>

            {/* Back to Site */}
            <Box sx={{ textAlign: "center", mt: 3 }}>
              <Button
                onClick={() => router.push("/")}
                startIcon={<Icon icon="mdi:arrow-left" />}
                sx={{ textTransform: "none", color: "text.secondary" }}
              >
                Back to Website
              </Button>
            </Box>
          </Paper>
        </motion.div>
      </Box>
    </>
  );
};

export default AdminLoginPage;
