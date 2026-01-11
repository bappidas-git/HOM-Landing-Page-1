/**
 * Admin Login Page
 * Authentication page for admin panel access
 */

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  InputAdornment,
  IconButton,
  Alert,
  CircularProgress,
  Link as MuiLink,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Email as EmailIcon,
  Lock as LockIcon,
  Login as LoginIcon,
} from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { useAuthContext } from '@/context/AuthContext';
import { ADMIN_ROUTES } from '@/lib/constants';

// Validation schema
const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  remember: yup.boolean(),
});

// Animation variants
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

const formVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3 },
  },
};

/**
 * Admin Login Page Component
 */
const AdminLoginPage = () => {
  const router = useRouter();
  const { login, isAuthenticated, isLoading, isInitialized, error, clearError } = useAuthContext();

  // State
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Form setup
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      remember: false,
    },
  });

  // Redirect if already authenticated
  useEffect(() => {
    if (isInitialized && isAuthenticated) {
      router.replace(ADMIN_ROUTES.DASHBOARD);
    }
  }, [isAuthenticated, isInitialized, router]);

  // Clear errors on mount
  useEffect(() => {
    clearError();
    setLoginError('');
  }, [clearError]);

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      setLoginError('');
      clearError();

      const result = await login(data.email, data.password, data.remember);

      if (result.success) {
        toast.success('Login successful! Redirecting...');
        router.push(ADMIN_ROUTES.DASHBOARD);
      } else {
        setLoginError(result.error || 'Invalid email or password');
        toast.error(result.error || 'Login failed');
      }
    } catch (err) {
      setLoginError('An unexpected error occurred. Please try again.');
      toast.error('An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Toggle password visibility
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  // Show loading while checking auth
  if (!isInitialized || isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          backgroundColor: '#f5f5f7',
        }}
      >
        <CircularProgress size={48} />
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
        <meta name="description" content="Admin login for Nambiar District 25" />
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f5f5f7',
          backgroundImage: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
          padding: 2,
        }}
      >
        <Container maxWidth="sm">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <Paper
              elevation={0}
              sx={{
                padding: { xs: 3, sm: 5 },
                borderRadius: 4,
                backgroundColor: '#ffffff',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
              }}
            >
              {/* Logo & Title */}
              <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Typography
                  variant="h4"
                  component="h1"
                  sx={{
                    fontWeight: 700,
                    color: '#1a1a2e',
                    mb: 1,
                  }}
                >
                  District 25
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: '#666666' }}
                >
                  Admin Panel Login
                </Typography>
              </Box>

              {/* Error Alert */}
              {(loginError || error) && (
                <Alert
                  severity="error"
                  sx={{ mb: 3 }}
                  onClose={() => {
                    setLoginError('');
                    clearError();
                  }}
                >
                  {loginError || error}
                </Alert>
              )}

              {/* Login Form */}
              <motion.form
                onSubmit={handleSubmit(onSubmit)}
                variants={formVariants}
                initial="hidden"
                animate="visible"
              >
                {/* Email Field */}
                <motion.div variants={itemVariants}>
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Email Address"
                        type="email"
                        placeholder="admin@realestate.com"
                        error={!!errors.email}
                        helperText={errors.email?.message}
                        disabled={isSubmitting}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <EmailIcon color="action" />
                            </InputAdornment>
                          ),
                        }}
                        sx={{ mb: 3 }}
                      />
                    )}
                  />
                </motion.div>

                {/* Password Field */}
                <motion.div variants={itemVariants}>
                  <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter your password"
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        disabled={isSubmitting}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <LockIcon color="action" />
                            </InputAdornment>
                          ),
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={handleTogglePassword}
                                edge="end"
                                size="small"
                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                              >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        sx={{ mb: 2 }}
                      />
                    )}
                  />
                </motion.div>

                {/* Remember Me */}
                <motion.div variants={itemVariants}>
                  <Controller
                    name="remember"
                    control={control}
                    render={({ field }) => (
                      <FormControlLabel
                        control={
                          <Checkbox
                            {...field}
                            checked={field.value}
                            color="primary"
                            disabled={isSubmitting}
                          />
                        }
                        label="Remember me for 7 days"
                        sx={{ mb: 3 }}
                      />
                    )}
                  />
                </motion.div>

                {/* Submit Button */}
                <motion.div variants={itemVariants}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    size="large"
                    disabled={isSubmitting}
                    startIcon={
                      isSubmitting ? (
                        <CircularProgress size={20} color="inherit" />
                      ) : (
                        <LoginIcon />
                      )
                    }
                    sx={{
                      py: 1.5,
                      fontSize: '1rem',
                      fontWeight: 600,
                      textTransform: 'none',
                      borderRadius: 2,
                      backgroundColor: '#8B9A46',
                      '&:hover': {
                        backgroundColor: '#6b7a36',
                      },
                    }}
                  >
                    {isSubmitting ? 'Signing In...' : 'Sign In'}
                  </Button>
                </motion.div>
              </motion.form>

              {/* Demo Credentials */}
              <Box
                sx={{
                  mt: 4,
                  p: 2,
                  backgroundColor: '#f5f5f7',
                  borderRadius: 2,
                  textAlign: 'center',
                }}
              >
                <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 1 }}>
                  Demo Credentials
                </Typography>
                <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                  Email: admin@realestate.com
                </Typography>
                <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                  Password: admin123
                </Typography>
              </Box>

              {/* Back to Site Link */}
              <Box sx={{ textAlign: 'center', mt: 3 }}>
                <MuiLink
                  href="/"
                  underline="hover"
                  sx={{
                    color: '#666666',
                    fontSize: '0.875rem',
                    '&:hover': {
                      color: '#8B9A46',
                    },
                  }}
                >
                  &larr; Back to Website
                </MuiLink>
              </Box>
            </Paper>
          </motion.div>

          {/* Footer */}
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              &copy; {new Date().getFullYear()} Nambiar District 25. All rights reserved.
            </Typography>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default AdminLoginPage;
