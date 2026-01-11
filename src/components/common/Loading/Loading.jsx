/**
 * Loading Component
 * Displays various loading states including spinner, skeleton, and overlay
 * Uses Lottie for enhanced page loading animations
 */

import { Box, CircularProgress, LinearProgress, Typography, Skeleton } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import Lottie from 'lottie-react';
import styles from './Loading.module.css';

// Simple loading animation data (minimal spinner)
const loadingAnimationData = {
  v: '5.5.7',
  fr: 60,
  ip: 0,
  op: 120,
  w: 200,
  h: 200,
  nm: 'Loading',
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: 'Circle',
      sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        r: {
          a: 1,
          k: [
            { t: 0, s: [0], e: [360] },
            { t: 120, s: [360] },
          ],
        },
        p: { a: 0, k: [100, 100, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: { a: 0, k: [100, 100, 100] },
      },
      ao: 0,
      shapes: [
        {
          ty: 'el',
          s: { a: 0, k: [80, 80] },
          p: { a: 0, k: [0, 0] },
          nm: 'Ellipse',
        },
        {
          ty: 'st',
          c: { a: 0, k: [0, 0.416, 1, 1] },
          o: { a: 0, k: 100 },
          w: { a: 0, k: 6 },
          lc: 2,
          lj: 1,
          d: [
            { n: 'd', nm: 'dash', v: { a: 0, k: 60 } },
            { n: 'g', nm: 'gap', v: { a: 0, k: 200 } },
          ],
          nm: 'Stroke',
        },
      ],
      ip: 0,
      op: 120,
      st: 0,
    },
  ],
};

/**
 * Loading spinner component
 * @param {Object} props - Component props
 * @param {string} props.variant - Loading variant: 'spinner' | 'linear' | 'skeleton' | 'overlay' | 'page'
 * @param {string} props.size - Size: 'small' | 'medium' | 'large'
 * @param {string} props.color - Color: 'primary' | 'secondary' | 'inherit'
 * @param {string} props.message - Loading message
 * @param {boolean} props.fullScreen - Whether to show full screen overlay
 * @param {number} props.skeletonCount - Number of skeleton items
 * @param {string} props.skeletonVariant - Skeleton variant: 'text' | 'circular' | 'rectangular' | 'rounded'
 */
const Loading = ({
  variant = 'spinner',
  size = 'medium',
  color = 'secondary',
  message,
  fullScreen = false,
  skeletonCount = 3,
  skeletonVariant = 'rectangular',
  skeletonHeight = 100,
  skeletonWidth = '100%',
}) => {
  // Size mapping for CircularProgress
  const sizeMap = {
    small: 24,
    medium: 40,
    large: 60,
  };

  // Animation variants
  const containerVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const spinnerVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.3 },
    },
    exit: {
      scale: 0.8,
      opacity: 0,
      transition: { duration: 0.2 },
    },
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.05, 1],
      opacity: [0.8, 1, 0.8],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  // Spinner variant
  if (variant === 'spinner') {
    const content = (
      <motion.div
        variants={spinnerVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className={styles.spinnerContainer}
      >
        <CircularProgress size={sizeMap[size]} color={color} thickness={4} />
        {message && (
          <Typography variant="body2" color="text.secondary" className={styles.message}>
            {message}
          </Typography>
        )}
      </motion.div>
    );

    if (fullScreen) {
      return (
        <motion.div
          variants={containerVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className={styles.fullScreenOverlay}
        >
          {content}
        </motion.div>
      );
    }

    return content;
  }

  // Linear progress variant
  if (variant === 'linear') {
    return (
      <Box className={styles.linearContainer}>
        <LinearProgress color={color} />
        {message && (
          <Typography variant="body2" color="text.secondary" className={styles.message}>
            {message}
          </Typography>
        )}
      </Box>
    );
  }

  // Skeleton variant
  if (variant === 'skeleton') {
    return (
      <Box className={styles.skeletonContainer}>
        {Array.from({ length: skeletonCount }).map((_, index) => (
          <Skeleton
            key={index}
            variant={skeletonVariant}
            width={skeletonWidth}
            height={skeletonHeight}
            animation="wave"
            className={styles.skeletonItem}
          />
        ))}
      </Box>
    );
  }

  // Overlay variant (for covering content while loading)
  if (variant === 'overlay') {
    return (
      <AnimatePresence>
        <motion.div
          variants={containerVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className={styles.overlay}
        >
          <motion.div variants={spinnerVariants}>
            <CircularProgress size={sizeMap[size]} color={color} thickness={4} />
            {message && (
              <Typography variant="body2" color="white" className={styles.overlayMessage}>
                {message}
              </Typography>
            )}
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  }

  // Page loading variant (full page with Lottie animation)
  if (variant === 'page') {
    return (
      <motion.div
        variants={containerVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className={styles.pageLoader}
      >
        <motion.div className={styles.pageLoaderContent} variants={pulseVariants} animate="animate">
          <Box className={styles.logoContainer}>
            <Typography variant="h4" className={styles.logoText}>
              District 25
            </Typography>
            <Typography variant="caption" className={styles.tagline}>
              THE SOHO LIFE RETURNS
            </Typography>
          </Box>
          <Box className={styles.lottieContainer}>
            <Lottie
              animationData={loadingAnimationData}
              loop
              autoplay
              style={{ width: 80, height: 80 }}
            />
          </Box>
          {message && (
            <Typography variant="body2" color="text.secondary" className={styles.pageMessage}>
              {message}
            </Typography>
          )}
        </motion.div>
      </motion.div>
    );
  }

  // Default spinner
  return (
    <Box className={styles.defaultContainer}>
      <CircularProgress size={sizeMap[size]} color={color} />
    </Box>
  );
};

export default Loading;
