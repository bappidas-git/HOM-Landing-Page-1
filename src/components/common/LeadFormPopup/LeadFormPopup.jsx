/**
 * LeadFormPopup Component
 * Modal popup containing the lead capture form
 */

import { useEffect, useCallback, useRef } from 'react';
import {
  Dialog,
  DialogContent,
  IconButton,
  Box,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { motion, AnimatePresence } from 'framer-motion';
import { useUIContext } from '@/context/UIContext';
import { POPUP_TRIGGER_TYPES } from '@/lib/constants';
import LeadForm from '../LeadForm';
import styles from './LeadFormPopup.module.css';

/**
 * LeadFormPopup component
 */
const LeadFormPopup = () => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const timerRef = useRef(null);
  const exitIntentRef = useRef(false);

  const {
    popupState,
    closePopup,
    showTimerPopup,
    showExitIntentPopup,
    isDesktop,
  } = useUIContext();

  const { isOpen, triggerType, title, showSiteVisit } = popupState;

  // Timer popup (30 seconds after page load)
  useEffect(() => {
    timerRef.current = setTimeout(() => {
      showTimerPopup();
    }, 30000);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [showTimerPopup]);

  // Exit intent detection (desktop only)
  useEffect(() => {
    if (!isDesktop) return;

    const handleMouseLeave = (e) => {
      if (e.clientY <= 0 && !exitIntentRef.current) {
        exitIntentRef.current = true;
        showExitIntentPopup();
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isDesktop, showExitIntentPopup]);

  // Handle close
  const handleClose = useCallback(() => {
    closePopup(true); // Mark as dismissed for session
  }, [closePopup]);

  // Handle backdrop click
  const handleBackdropClick = useCallback((event) => {
    if (event.target === event.currentTarget) {
      handleClose();
    }
  }, [handleClose]);

  // Get form source based on trigger type
  const getFormSource = () => {
    switch (triggerType) {
      case POPUP_TRIGGER_TYPES.BROCHURE:
      case POPUP_TRIGGER_TYPES.PRICE:
        return 'popup_form';
      case POPUP_TRIGGER_TYPES.SITE_VISIT:
        return 'site_visit_form';
      case POPUP_TRIGGER_TYPES.EXIT_INTENT:
        return 'exit_intent_form';
      case POPUP_TRIGGER_TYPES.TIMER:
        return 'timer_popup_form';
      default:
        return 'popup_form';
    }
  };

  // Get icon based on trigger type
  const getIcon = () => {
    switch (triggerType) {
      case POPUP_TRIGGER_TYPES.BROCHURE:
        return '📄';
      case POPUP_TRIGGER_TYPES.PRICE:
        return '💰';
      case POPUP_TRIGGER_TYPES.SITE_VISIT:
        return '🏠';
      case POPUP_TRIGGER_TYPES.EXIT_INTENT:
        return '👋';
      case POPUP_TRIGGER_TYPES.TIMER:
        return '🎁';
      default:
        return '📝';
    }
  };

  // Animation variants
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const contentVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.3, ease: 'easeOut' },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: 20,
      transition: { duration: 0.2 },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog
          open={isOpen}
          onClose={handleClose}
          fullScreen={fullScreen}
          maxWidth="sm"
          fullWidth
          className={styles.dialog}
          PaperProps={{
            className: styles.paper,
            component: motion.div,
            variants: contentVariants,
            initial: 'hidden',
            animate: 'visible',
            exit: 'exit',
          }}
          BackdropProps={{
            className: styles.backdrop,
          }}
        >
          {/* Close Button */}
          <IconButton
            onClick={handleClose}
            className={styles.closeButton}
            aria-label="Close"
          >
            <CloseIcon />
          </IconButton>

          {/* Dialog Content */}
          <DialogContent className={styles.content}>
            {/* Header */}
            <Box className={styles.header}>
              <span className={styles.icon}>{getIcon()}</span>
              <Typography variant="h5" className={styles.title}>
                {title}
              </Typography>
              <Typography variant="body2" className={styles.subtitle}>
                Fill in your details and our team will contact you shortly
              </Typography>
            </Box>

            {/* Lead Form */}
            <LeadForm
              source={getFormSource()}
              showSiteVisit={showSiteVisit || triggerType === POPUP_TRIGGER_TYPES.SITE_VISIT}
              compact
              onSuccess={handleClose}
            />
          </DialogContent>

          {/* Decorative Elements */}
          <Box className={styles.decoration}>
            <div className={styles.decorCircle1} />
            <div className={styles.decorCircle2} />
          </Box>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default LeadFormPopup;
