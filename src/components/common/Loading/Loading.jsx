/**
 * Loading Component
 * Displays various loading states including spinner, skeleton, and overlay
 */

import { Box, CircularProgress, LinearProgress, Typography, Skeleton } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Loading.module.css';

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
      transition: { duration: 0.3 }
    },
    exit: {
      scale: 0.8,
      opacity: 0,
      transition: { duration: 0.2 }
    },
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.1, 1],
      opacity: [0.7, 1, 0.7],
      transition: {
        duration: 1.5,
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
        <CircularProgress
          size={sizeMap[size]}
          color={color}
          thickness={4}
        />
        {message && (
          <Typography
            variant="body2"
            color="text.secondary"
            className={styles.message}
          >
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
          <Typography
            variant="body2"
            color="text.secondary"
            className={styles.message}
          >
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
            <CircularProgress
              size={sizeMap[size]}
              color={color}
              thickness={4}
            />
            {message && (
              <Typography
                variant="body2"
                color="white"
                className={styles.overlayMessage}
              >
                {message}
              </Typography>
            )}
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  }

  // Page loading variant (full page with logo)
  if (variant === 'page') {
    return (
      <motion.div
        variants={containerVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className={styles.pageLoader}
      >
        <motion.div
          className={styles.pageLoaderContent}
          variants={pulseVariants}
          animate="animate"
        >
          <Box className={styles.logoContainer}>
            <Typography variant="h4" className={styles.logoText}>
              District 25
            </Typography>
            <Typography variant="caption" className={styles.tagline}>
              THE SOHO LIFE RETURNS
            </Typography>
          </Box>
          <CircularProgress
            size={sizeMap.medium}
            color={color}
            thickness={3}
            className={styles.pageSpinner}
          />
          {message && (
            <Typography
              variant="body2"
              color="text.secondary"
              className={styles.pageMessage}
            >
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
