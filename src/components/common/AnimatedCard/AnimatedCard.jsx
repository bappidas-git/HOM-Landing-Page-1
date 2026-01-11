/**
 * AnimatedCard Component
 * Card component with hover effects and scroll animations
 */

import { forwardRef } from 'react';
import { Card, CardContent, CardMedia, CardActions, Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import styles from './AnimatedCard.module.css';

/**
 * AnimatedCard component with animations
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Card content
 * @param {string} props.title - Card title
 * @param {string} props.subtitle - Card subtitle
 * @param {string} props.description - Card description
 * @param {string} props.image - Image URL
 * @param {string} props.imageAlt - Image alt text
 * @param {number} props.imageHeight - Image height
 * @param {React.ReactNode} props.icon - Icon element
 * @param {React.ReactNode} props.actions - Card action buttons
 * @param {string} props.variant - Card variant: 'elevated' | 'outlined' | 'filled'
 * @param {string} props.hoverEffect - Hover effect: 'lift' | 'glow' | 'scale' | 'border' | 'none'
 * @param {boolean} props.animate - Whether to animate on scroll
 * @param {number} props.animationDelay - Animation delay
 * @param {number} props.index - Index for stagger animation
 * @param {string} props.className - Additional CSS class
 * @param {function} props.onClick - Click handler
 */
const AnimatedCard = forwardRef(({
  children,
  title,
  subtitle,
  description,
  image,
  imageAlt = '',
  imageHeight = 200,
  icon,
  actions,
  variant = 'elevated',
  hoverEffect = 'lift',
  animate = true,
  animationDelay = 0,
  index = 0,
  className,
  onClick,
  ...props
}, ref) => {
  // Calculate stagger delay based on index
  const staggerDelay = animationDelay + (index * 0.1);

  // Animation variants
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: staggerDelay,
        ease: 'easeOut',
      },
    },
  };

  // Hover animation variants based on effect type
  const hoverVariants = {
    lift: {
      y: -10,
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
      transition: { duration: 0.3 },
    },
    glow: {
      boxShadow: '0 0 30px rgba(139, 154, 70, 0.4)',
      transition: { duration: 0.3 },
    },
    scale: {
      scale: 1.03,
      boxShadow: '0 15px 35px rgba(0, 0, 0, 0.12)',
      transition: { duration: 0.3 },
    },
    border: {
      boxShadow: '0 0 0 3px #8B9A46',
      transition: { duration: 0.3 },
    },
    none: {},
  };

  // Tap animation
  const tapVariants = {
    scale: 0.98,
    transition: { duration: 0.1 },
  };

  // Variant class mapping
  const variantClass = {
    elevated: styles.elevated,
    outlined: styles.outlined,
    filled: styles.filled,
  };

  const cardContent = (
    <>
      {/* Image */}
      {image && (
        <CardMedia
          component="img"
          height={imageHeight}
          image={image}
          alt={imageAlt || title}
          className={styles.media}
        />
      )}

      {/* Icon */}
      {icon && (
        <Box className={styles.iconContainer}>
          {icon}
        </Box>
      )}

      {/* Content */}
      <CardContent className={styles.content}>
        {title && (
          <Typography
            variant="h5"
            component="h3"
            className={styles.title}
            gutterBottom
          >
            {title}
          </Typography>
        )}

        {subtitle && (
          <Typography
            variant="subtitle2"
            color="secondary"
            className={styles.subtitle}
            gutterBottom
          >
            {subtitle}
          </Typography>
        )}

        {description && (
          <Typography
            variant="body2"
            color="text.secondary"
            className={styles.description}
          >
            {description}
          </Typography>
        )}

        {children}
      </CardContent>

      {/* Actions */}
      {actions && (
        <CardActions className={styles.actions}>
          {actions}
        </CardActions>
      )}
    </>
  );

  // Create motion card
  const MotionCard = motion(Card);

  return (
    <MotionCard
      ref={ref}
      className={clsx(
        styles.card,
        variantClass[variant],
        styles[`hover${hoverEffect.charAt(0).toUpperCase() + hoverEffect.slice(1)}`],
        { [styles.clickable]: !!onClick },
        className
      )}
      variants={animate ? cardVariants : undefined}
      initial={animate ? 'hidden' : undefined}
      whileInView={animate ? 'visible' : undefined}
      viewport={{ once: true, amount: 0.2 }}
      whileHover={hoverEffect !== 'none' ? hoverVariants[hoverEffect] : undefined}
      whileTap={onClick ? tapVariants : undefined}
      onClick={onClick}
      {...props}
    >
      {cardContent}
    </MotionCard>
  );
});

AnimatedCard.displayName = 'AnimatedCard';

export default AnimatedCard;
