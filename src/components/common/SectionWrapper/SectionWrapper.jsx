/**
 * SectionWrapper Component
 * Wraps page sections with consistent styling and scroll animation
 */

import { forwardRef, useEffect, useRef } from 'react';
import { Container, Box } from '@mui/material';
import { motion, useInView, useAnimation } from 'framer-motion';
import clsx from 'clsx';
import { useUIContext } from '@/context/UIContext';
import styles from './SectionWrapper.module.css';

/**
 * SectionWrapper component for consistent section layouts
 * @param {Object} props - Component props
 * @param {string} props.id - Section ID for navigation
 * @param {React.ReactNode} props.children - Section content
 * @param {string} props.className - Additional CSS class
 * @param {string} props.background - Background variant: 'default' | 'paper' | 'dark' | 'gradient' | 'pattern'
 * @param {boolean} props.fullWidth - Whether to use full width
 * @param {string} props.maxWidth - Container max width: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false
 * @param {string} props.paddingY - Vertical padding: 'none' | 'small' | 'medium' | 'large'
 * @param {boolean} props.animate - Whether to animate on scroll
 * @param {string} props.animationType - Animation type: 'fadeIn' | 'fadeUp' | 'fadeLeft' | 'fadeRight' | 'scale'
 * @param {number} props.animationDelay - Animation delay in seconds
 * @param {Object} props.sx - Additional MUI sx prop
 */
const SectionWrapper = forwardRef(({
  id,
  children,
  className,
  background = 'default',
  fullWidth = false,
  maxWidth = 'lg',
  paddingY = 'large',
  animate = true,
  animationType = 'fadeUp',
  animationDelay = 0,
  sx = {},
  ...props
}, ref) => {
  const sectionRef = useRef(null);
  const { setActiveSection } = useUIContext();
  const controls = useAnimation();
  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.2,
  });

  // Track active section for navigation highlighting
  const activeRef = useRef(null);
  const isActive = useInView(activeRef, {
    margin: '-50% 0px -50% 0px',
  });

  useEffect(() => {
    if (isActive && id) {
      setActiveSection(id);
    }
  }, [isActive, id, setActiveSection]);

  // Start animation when in view
  useEffect(() => {
    if (isInView && animate) {
      controls.start('visible');
    }
  }, [isInView, animate, controls]);

  // Animation variants based on type
  const animationVariants = {
    fadeIn: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { duration: 0.6, delay: animationDelay },
      },
    },
    fadeUp: {
      hidden: { opacity: 0, y: 60 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, delay: animationDelay, ease: 'easeOut' },
      },
    },
    fadeLeft: {
      hidden: { opacity: 0, x: -60 },
      visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.6, delay: animationDelay, ease: 'easeOut' },
      },
    },
    fadeRight: {
      hidden: { opacity: 0, x: 60 },
      visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.6, delay: animationDelay, ease: 'easeOut' },
      },
    },
    scale: {
      hidden: { opacity: 0, scale: 0.95 },
      visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.6, delay: animationDelay, ease: 'easeOut' },
      },
    },
  };

  // Background class mapping
  const backgroundClass = {
    default: styles.bgDefault,
    paper: styles.bgPaper,
    dark: styles.bgDark,
    gradient: styles.bgGradient,
    pattern: styles.bgPattern,
  };

  // Padding class mapping
  const paddingClass = {
    none: styles.paddingNone,
    small: styles.paddingSmall,
    medium: styles.paddingMedium,
    large: styles.paddingLarge,
  };

  const sectionContent = (
    <motion.div
      ref={sectionRef}
      variants={animate ? animationVariants[animationType] : undefined}
      initial={animate ? 'hidden' : undefined}
      animate={controls}
      className={styles.motionWrapper}
    >
      {children}
    </motion.div>
  );

  return (
    <Box
      component="section"
      id={id}
      ref={(node) => {
        activeRef.current = node;
        if (ref) {
          if (typeof ref === 'function') {
            ref(node);
          } else {
            ref.current = node;
          }
        }
      }}
      className={clsx(
        styles.section,
        backgroundClass[background],
        paddingClass[paddingY],
        className
      )}
      sx={sx}
      {...props}
    >
      {fullWidth ? (
        sectionContent
      ) : (
        <Container maxWidth={maxWidth}>
          {sectionContent}
        </Container>
      )}
    </Box>
  );
});

SectionWrapper.displayName = 'SectionWrapper';

export default SectionWrapper;
