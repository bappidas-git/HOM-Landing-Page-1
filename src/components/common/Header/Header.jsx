/**
 * Header Component
 * Fixed header with navigation, visible on desktop (>1024px)
 */

import { useState, useCallback } from 'react';
import {
  AppBar,
  Toolbar,
  Container,
  Box,
  Button,
  Typography,
  IconButton,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import PhoneIcon from '@mui/icons-material/Phone';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import { useUIContext } from '@/context/UIContext';
import { DESKTOP_NAV_ITEMS } from '@/lib/constants/navigationItems';
import styles from './Header.module.css';

/**
 * Header component with navigation
 */
const Header = () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const {
    isScrolled,
    scrollToSection,
    activeSection,
    openSiteVisitPopup,
    openMobileDrawer,
  } = useUIContext();

  const [hoveredItem, setHoveredItem] = useState(null);

  // Handle navigation click
  const handleNavClick = useCallback((sectionId) => {
    scrollToSection(sectionId);
  }, [scrollToSection]);

  // Handle CTA click
  const handleCTAClick = useCallback(() => {
    openSiteVisitPopup();
  }, [openSiteVisitPopup]);

  // Don't render on mobile/tablet
  if (!isDesktop) {
    return null;
  }

  return (
    <AppBar
      position="fixed"
      className={clsx(styles.appBar, {
        [styles.scrolled]: isScrolled,
        [styles.transparent]: !isScrolled,
      })}
      elevation={0}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters className={styles.toolbar}>
          {/* Logo Section */}
          <Box
            className={styles.logoSection}
            onClick={() => handleNavClick('home')}
            sx={{ cursor: 'pointer' }}
          >
            <Box className={styles.logoWrapper}>
              <Typography variant="h6" className={styles.logoMain}>
                NAMBIAR
              </Typography>
              <Typography variant="caption" className={styles.logoSub}>
                BUILDERS
              </Typography>
            </Box>
            <Box className={styles.divider} />
            <Box className={styles.projectName}>
              <Typography variant="h6" className={styles.projectTitle}>
                District 25
              </Typography>
              <Typography variant="caption" className={styles.projectPhase}>
                PHASE 2
              </Typography>
            </Box>
          </Box>

          {/* Navigation Menu */}
          <Box className={styles.navigation}>
            {DESKTOP_NAV_ITEMS.map((item) => (
              <motion.div
                key={item.id}
                className={styles.navItemWrapper}
                onHoverStart={() => setHoveredItem(item.id)}
                onHoverEnd={() => setHoveredItem(null)}
              >
                <button
                  className={clsx(styles.navItem, {
                    [styles.active]: activeSection === item.sectionId,
                  })}
                  onClick={() => handleNavClick(item.sectionId)}
                  type="button"
                >
                  {item.label}
                </button>

                {/* Active/Hover Indicator */}
                <AnimatePresence>
                  {(activeSection === item.sectionId || hoveredItem === item.id) && (
                    <motion.div
                      className={styles.navIndicator}
                      layoutId="navIndicator"
                      initial={{ opacity: 0, scaleX: 0 }}
                      animate={{ opacity: 1, scaleX: 1 }}
                      exit={{ opacity: 0, scaleX: 0 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </Box>

          {/* CTA Section */}
          <Box className={styles.ctaSection}>
            {/* Phone Number */}
            <Box className={styles.phoneWrapper}>
              <PhoneIcon fontSize="small" className={styles.phoneIcon} />
              <a href="tel:+917026034444" className={styles.phoneNumber}>
                702 603 4444
              </a>
            </Box>

            {/* CTA Button */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                variant="contained"
                color="secondary"
                onClick={handleCTAClick}
                className={styles.ctaButton}
              >
                Book Site Visit
              </Button>
            </motion.div>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
