/**
 * SectionTitle Component
 * Displays consistent section titles with optional subtitle and decoration
 */

import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import styles from './SectionTitle.module.css';

/**
 * SectionTitle component for section headings
 * @param {Object} props - Component props
 * @param {string} props.title - Main title text
 * @param {string} props.subtitle - Optional subtitle text
 * @param {string} props.preTitle - Optional text above title
 * @param {string} props.align - Text alignment: 'left' | 'center' | 'right'
 * @param {boolean} props.light - Whether to use light (white) text
 * @param {boolean} props.showDecoration - Whether to show decorative line
 * @param {string} props.decorationType - Decoration type: 'line' | 'dots' | 'gradient'
 * @param {boolean} props.animate - Whether to animate
 * @param {number} props.delay - Animation delay in seconds
 * @param {string} props.className - Additional CSS class
 */
const SectionTitle = ({
  title,
  subtitle,
  preTitle,
  align = 'center',
  light = false,
  showDecoration = true,
  decorationType = 'line',
  animate = true,
  delay = 0,
  className,
}) => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: delay,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  // Decoration component
  const Decoration = () => {
    if (!showDecoration) return null;

    switch (decorationType) {
      case 'line':
        return (
          <motion.div
            className={clsx(styles.decoration, styles.line, {
              [styles.light]: light,
            })}
            variants={itemVariants}
          />
        );
      case 'dots':
        return (
          <motion.div
            className={clsx(styles.decoration, styles.dots)}
            variants={itemVariants}
          >
            <span className={clsx(styles.dot, { [styles.light]: light })} />
            <span className={clsx(styles.dot, { [styles.light]: light })} />
            <span className={clsx(styles.dot, { [styles.light]: light })} />
          </motion.div>
        );
      case 'gradient':
        return (
          <motion.div
            className={clsx(styles.decoration, styles.gradient)}
            variants={itemVariants}
          />
        );
      default:
        return null;
    }
  };

  const content = (
    <>
      {preTitle && (
        <motion.div variants={itemVariants}>
          <Typography
            variant="overline"
            component="span"
            className={clsx(styles.preTitle, {
              [styles.light]: light,
            })}
          >
            {preTitle}
          </Typography>
        </motion.div>
      )}

      <motion.div variants={itemVariants}>
        <Typography
          variant="h2"
          component="h2"
          className={clsx(styles.title, {
            [styles.light]: light,
          })}
        >
          {title}
        </Typography>
      </motion.div>

      <Decoration />

      {subtitle && (
        <motion.div variants={itemVariants}>
          <Typography
            variant="subtitle1"
            component="p"
            className={clsx(styles.subtitle, {
              [styles.light]: light,
            })}
          >
            {subtitle}
          </Typography>
        </motion.div>
      )}
    </>
  );

  if (animate) {
    return (
      <motion.div
        className={clsx(styles.container, styles[align], className)}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        {content}
      </motion.div>
    );
  }

  return (
    <Box className={clsx(styles.container, styles[align], className)}>
      {content}
    </Box>
  );
};

export default SectionTitle;
