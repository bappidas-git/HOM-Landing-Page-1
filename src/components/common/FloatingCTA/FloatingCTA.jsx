/**
 * FloatingCTA Component
 * Floating call and WhatsApp buttons
 */

import { useState, useCallback } from 'react';
import { Box, Fab, Tooltip, Zoom, useScrollTrigger } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import CloseIcon from '@mui/icons-material/Close';
import { motion, AnimatePresence } from 'framer-motion';
import { useUIContext } from '@/context/UIContext';
import styles from './FloatingCTA.module.css';

/**
 * FloatingCTA component
 */
const FloatingCTA = () => {
  const { isMobile, isTablet } = useUIContext();
  const [isExpanded, setIsExpanded] = useState(false);

  // Show after scrolling 200px
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 200,
  });

  // Toggle expanded state
  const toggleExpanded = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, []);

  // Handle call click
  const handleCallClick = useCallback(() => {
    window.location.href = 'tel:+917026034444';
  }, []);

  // Handle WhatsApp click
  const handleWhatsAppClick = useCallback(() => {
    window.open('https://wa.me/917026034444?text=Hi, I am interested in Nambiar District 25 Phase 2. Please share more details.', '_blank');
  }, []);

  // Adjust bottom position for mobile (account for bottom navigation)
  const bottomOffset = (isMobile || isTablet) ? 90 : 24;

  // Animation variants for action buttons
  const actionVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.8,
    },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.2,
        ease: 'easeOut',
      },
    }),
    exit: {
      opacity: 0,
      y: 10,
      scale: 0.8,
      transition: { duration: 0.15 },
    },
  };

  return (
    <Zoom in={trigger}>
      <Box
        className={styles.container}
        style={{ bottom: bottomOffset }}
      >
        {/* Action Buttons */}
        <AnimatePresence>
          {isExpanded && (
            <Box className={styles.actionButtons}>
              {/* WhatsApp Button */}
              <motion.div
                custom={0}
                variants={actionVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <Tooltip title="WhatsApp" placement="left" arrow>
                  <Fab
                    size="medium"
                    className={styles.whatsappFab}
                    onClick={handleWhatsAppClick}
                    aria-label="WhatsApp"
                  >
                    <WhatsAppIcon />
                  </Fab>
                </Tooltip>
              </motion.div>

              {/* Call Button */}
              <motion.div
                custom={1}
                variants={actionVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <Tooltip title="Call Now" placement="left" arrow>
                  <Fab
                    size="medium"
                    className={styles.callFab}
                    onClick={handleCallClick}
                    aria-label="Call Now"
                  >
                    <PhoneIcon />
                  </Fab>
                </Tooltip>
              </motion.div>
            </Box>
          )}
        </AnimatePresence>

        {/* Main Toggle Button */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={isExpanded ? { rotate: 45 } : { rotate: 0 }}
          transition={{ duration: 0.2 }}
        >
          <Fab
            color="secondary"
            className={styles.mainFab}
            onClick={toggleExpanded}
            aria-label={isExpanded ? 'Close contact options' : 'Show contact options'}
          >
            {isExpanded ? <CloseIcon /> : <PhoneIcon />}
          </Fab>
        </motion.div>

        {/* Pulse Effect (when not expanded) */}
        {!isExpanded && (
          <motion.div
            className={styles.pulse}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        )}
      </Box>
    </Zoom>
  );
};

export default FloatingCTA;
