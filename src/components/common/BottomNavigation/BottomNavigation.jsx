/**
 * BottomNavigation Component
 * Fixed bottom navigation for mobile/tablet devices (≤1024px)
 */

import { useState, useCallback, useMemo } from 'react';
import {
  BottomNavigation as MuiBottomNavigation,
  BottomNavigationAction,
  Paper,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import GridViewIcon from '@mui/icons-material/GridView';
import PoolIcon from '@mui/icons-material/Pool';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SendIcon from '@mui/icons-material/Send';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import { useUIContext } from '@/context/UIContext';
import { BOTTOM_NAV_ITEMS } from '@/lib/constants/navigationItems';
import styles from './BottomNavigation.module.css';

// Icon mapping
const iconMap = {
  Home: HomeIcon,
  GridView: GridViewIcon,
  Pool: PoolIcon,
  LocationOn: LocationOnIcon,
  Send: SendIcon,
};

/**
 * BottomNavigation component
 */
const BottomNavigation = () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const {
    activeSection,
    scrollToSection,
    openPopup,
    isScrolled,
  } = useUIContext();

  // Find current active nav item index
  const activeValue = useMemo(() => {
    const activeIndex = BOTTOM_NAV_ITEMS.findIndex(
      (item) => item.sectionId === activeSection
    );
    return activeIndex >= 0 ? activeIndex : 0;
  }, [activeSection]);

  // Handle navigation action
  const handleChange = useCallback((event, newValue) => {
    const item = BOTTOM_NAV_ITEMS[newValue];

    if (!item) return;

    if (item.isAction && item.action === 'openLeadForm') {
      // Open lead form popup
      openPopup('default', { force: true });
    } else if (item.sectionId) {
      // Scroll to section
      scrollToSection(item.sectionId);
    }
  }, [scrollToSection, openPopup]);

  // Don't render on desktop
  if (isDesktop) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className={styles.container}
      >
        <Paper
          elevation={8}
          className={clsx(styles.paper, {
            [styles.elevated]: isScrolled,
          })}
        >
          <MuiBottomNavigation
            value={activeValue}
            onChange={handleChange}
            showLabels
            className={styles.navigation}
          >
            {BOTTOM_NAV_ITEMS.map((item, index) => {
              const IconComponent = iconMap[item.icon];
              const isActive = activeValue === index;
              const isEnquire = item.isAction;

              return (
                <BottomNavigationAction
                  key={item.id}
                  label={item.label}
                  icon={
                    <motion.div
                      animate={isActive ? { scale: 1.1 } : { scale: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <IconComponent
                        className={clsx(styles.icon, {
                          [styles.enquireIcon]: isEnquire,
                        })}
                      />
                    </motion.div>
                  }
                  className={clsx(styles.action, {
                    [styles.enquireAction]: isEnquire,
                    [styles.activeAction]: isActive && !isEnquire,
                  })}
                />
              );
            })}
          </MuiBottomNavigation>

          {/* Active Indicator */}
          <motion.div
            className={styles.indicator}
            animate={{
              left: `${(activeValue / BOTTOM_NAV_ITEMS.length) * 100 + (100 / BOTTOM_NAV_ITEMS.length / 2)}%`,
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          />
        </Paper>
      </motion.div>
    </AnimatePresence>
  );
};

export default BottomNavigation;
