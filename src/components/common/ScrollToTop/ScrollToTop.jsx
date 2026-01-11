/**
 * ScrollToTop Component
 * Displays a floating button to scroll back to the top of the page
 */

import { useCallback } from 'react';
import { Fab, Zoom, useScrollTrigger } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { motion } from 'framer-motion';
import { useUIContext } from '@/context/UIContext';
import styles from './ScrollToTop.module.css';

/**
 * ScrollToTop button component
 * @param {Object} props - Component props
 * @param {number} props.threshold - Scroll threshold in pixels before showing button
 * @param {string} props.position - Button position: 'right' | 'left'
 * @param {number} props.bottom - Bottom offset in pixels
 * @param {string} props.color - Button color: 'primary' | 'secondary'
 */
const ScrollToTop = ({
  threshold = 500,
  position = 'right',
  bottom = 90,
  color = 'secondary',
}) => {
  const { scrollToTop, isMobile, isTablet } = useUIContext();

  // Use MUI scroll trigger
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: threshold,
  });

  // Handle click
  const handleClick = useCallback(() => {
    scrollToTop({ behavior: 'smooth' });
  }, [scrollToTop]);

  // Adjust bottom position for mobile (account for bottom navigation)
  const bottomOffset = (isMobile || isTablet) ? bottom + 20 : bottom;

  // Position styles
  const positionStyles = {
    [position]: 20,
    bottom: bottomOffset,
  };

  return (
    <Zoom in={trigger}>
      <motion.div
        className={styles.container}
        style={positionStyles}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Fab
          color={color}
          size="medium"
          aria-label="scroll back to top"
          onClick={handleClick}
          className={styles.fab}
        >
          <KeyboardArrowUpIcon />
        </Fab>
      </motion.div>
    </Zoom>
  );
};

export default ScrollToTop;
