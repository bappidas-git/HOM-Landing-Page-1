/**
 * Admin Index Page
 * Professional redirect page with branded loading experience
 */

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import {
  Box,
  Typography,
  CircularProgress,
  Fade,
  LinearProgress,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthContext } from '@/context/AuthContext';
import { ADMIN_ROUTES } from '@/lib/constants';

// Animation variants
const containerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.5, staggerChildren: 0.2 }
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.3 }
  }
};

const logoVariants = {
  initial: { scale: 0.8, opacity: 0 },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 20
    }
  }
};

const textVariants = {
  initial: { y: 20, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5 }
  }
};

const pulseAnimation = {
  scale: [1, 1.05, 1],
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: 'easeInOut'
  }
};

const AdminIndexPage = () => {
  const router = useRouter();
  const { isAuthenticated, isInitialized } = useAuthContext();
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Initializing');

  // Progress animation
  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    return () => clearInterval(progressInterval);
  }, []);

  // Loading text animation
  useEffect(() => {
    const texts = [
      'Initializing',
      'Checking authentication',
      'Loading dashboard',
      'Almost ready'
    ];
    let index = 0;

    const textInterval = setInterval(() => {
      index = (index + 1) % texts.length;
      setLoadingText(texts[index]);
    }, 800);

    return () => clearInterval(textInterval);
  }, []);

  // Authentication redirect
  useEffect(() => {
    if (isInitialized) {
      const timer = setTimeout(() => {
        if (isAuthenticated) {
          router.replace(ADMIN_ROUTES.DASHBOARD);
        } else {
          router.replace(ADMIN_ROUTES.LOGIN);
        }
      }, 1500); // Allow animation to complete

      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, isInitialized, router]);

  return (
    <>
      <Head>
        <title>Loading... | Admin - District 25</title>
      </Head>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Animated background elements */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            overflow: 'hidden',
            zIndex: 0,
          }}
        >
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              style={{
                position: 'absolute',
                borderRadius: '50%',
                background: 'rgba(139, 154, 70, 0.1)',
                width: 200 + i * 100,
                height: 200 + i * 100,
                left: `${20 + i * 15}%`,
                top: `${10 + i * 10}%`,
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
                x: [0, 30, 0],
                y: [0, -20, 0],
              }}
              transition={{
                duration: 5 + i,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.5,
              }}
            />
          ))}
        </Box>

        <AnimatePresence mode="wait">
          <motion.div
            variants={containerVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              zIndex: 1,
            }}
          >
            {/* Logo Container */}
            <motion.div variants={logoVariants} animate={pulseAnimation}>
              <Box
                sx={{
                  width: 120,
                  height: 120,
                  borderRadius: '24px',
                  background: 'linear-gradient(135deg, #8B9A46 0%, #6b7a36 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 20px 60px rgba(139, 154, 70, 0.4)',
                  mb: 4,
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Shine effect */}
                <motion.div
                  style={{
                    position: 'absolute',
                    top: '-50%',
                    left: '-50%',
                    width: '200%',
                    height: '200%',
                    background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.2) 50%, transparent 70%)',
                  }}
                  animate={{
                    x: ['-100%', '100%'],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 1,
                    ease: 'easeInOut',
                  }}
                />
                <Typography
                  variant="h3"
                  sx={{
                    color: 'white',
                    fontWeight: 800,
                    fontFamily: '"Playfair Display", serif',
                    position: 'relative',
                    zIndex: 1,
                  }}
                >
                  D25
                </Typography>
              </Box>
            </motion.div>

            {/* Brand Text */}
            <motion.div variants={textVariants}>
              <Typography
                variant="h5"
                sx={{
                  color: 'white',
                  fontWeight: 600,
                  mb: 1,
                  textAlign: 'center',
                  letterSpacing: '0.5px',
                }}
              >
                District 25
              </Typography>
            </motion.div>

            <motion.div variants={textVariants}>
              <Typography
                variant="body1"
                sx={{
                  color: 'rgba(255, 255, 255, 0.6)',
                  mb: 4,
                  textAlign: 'center',
                }}
              >
                Admin Panel
              </Typography>
            </motion.div>

            {/* Loading Indicator */}
            <motion.div variants={textVariants}>
              <Box sx={{ width: 280, mb: 3 }}>
                <LinearProgress
                  variant="determinate"
                  value={Math.min(progress, 100)}
                  sx={{
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    '& .MuiLinearProgress-bar': {
                      borderRadius: 3,
                      background: 'linear-gradient(90deg, #8B9A46 0%, #a3b15e 100%)',
                    },
                  }}
                />
              </Box>
            </motion.div>

            {/* Loading Text */}
            <motion.div variants={textVariants}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <CircularProgress
                  size={16}
                  sx={{
                    color: '#8B9A46',
                  }}
                />
                <Fade in={true} key={loadingText}>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'rgba(255, 255, 255, 0.5)',
                      fontWeight: 500,
                      minWidth: 160,
                    }}
                  >
                    {loadingText}...
                  </Typography>
                </Fade>
              </Box>
            </motion.div>

            {/* Footer */}
            <motion.div variants={textVariants}>
              <Box sx={{ mt: 6, textAlign: 'center' }}>
                <Typography
                  variant="caption"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.3)',
                    display: 'block',
                  }}
                >
                  Nambiar Builders
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.2)',
                    fontSize: '0.65rem',
                  }}
                >
                  RERA: PRM/KA/RERA/1251/308/PR/200825/008011
                </Typography>
              </Box>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </Box>
    </>
  );
};

export default AdminIndexPage;
