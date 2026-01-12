/**
 * UI Context Provider
 * Manages global UI state including modals, drawers, popups, and scroll position
 */

import { createContext, useContext, useState, useCallback, useMemo, useEffect } from 'react';
import {
  dismissPopup,
  wasPopupDismissed,
  incrementPopupCount,
  getPopupCount,
  markExitIntentShown,
  wasExitIntentShown,
} from '@/lib/utils/storage';
import { POPUP_TRIGGER_TYPES, POPUP_TITLES, BREAKPOINTS } from '@/lib/constants';

/**
 * UI Context
 */
const UIContext = createContext(null);

/**
 * Default popup state
 */
const defaultPopupState = {
  isOpen: false,
  triggerType: POPUP_TRIGGER_TYPES.DEFAULT,
  title: POPUP_TITLES[POPUP_TRIGGER_TYPES.DEFAULT],
  showSiteVisit: false,
};

/**
 * UI Provider Component
 */
export const UIProvider = ({ children }) => {
  // Mobile drawer state
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  // Lead form popup state
  const [popupState, setPopupState] = useState(defaultPopupState);

  // Scroll state
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollDirection, setScrollDirection] = useState('up');
  const [isScrolled, setIsScrolled] = useState(false);

  // Active section for navigation highlighting
  const [activeSection, setActiveSection] = useState('');

  // Responsive state
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  // Loading states
  const [isPageLoading, setIsPageLoading] = useState(false);

  // Snackbar/Toast state
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'info',
    autoHideDuration: 5000,
  });

  /**
   * Initialize responsive state on mount
   */
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      setWindowSize({ width, height });
      setIsMobile(width < BREAKPOINTS.sm);
      setIsTablet(width >= BREAKPOINTS.sm && width < BREAKPOINTS.lg);
      setIsDesktop(width >= BREAKPOINTS.lg);
    };

    // Set initial values
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  /**
   * Track scroll position
   */
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setScrollPosition(currentScrollY);
      setScrollDirection(currentScrollY > lastScrollY ? 'down' : 'up');
      setIsScrolled(currentScrollY > 50);

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ==================== Mobile Drawer Actions ====================

  /**
   * Open mobile drawer
   */
  const openMobileDrawer = useCallback(() => {
    setIsMobileDrawerOpen(true);
  }, []);

  /**
   * Close mobile drawer
   */
  const closeMobileDrawer = useCallback(() => {
    setIsMobileDrawerOpen(false);
  }, []);

  /**
   * Toggle mobile drawer
   */
  const toggleMobileDrawer = useCallback(() => {
    setIsMobileDrawerOpen((prev) => !prev);
  }, []);

  // ==================== Popup Actions ====================

  /**
   * Open lead form popup
   * @param {string} triggerType - Trigger type from POPUP_TRIGGER_TYPES
   * @param {Object} options - Additional options
   */
  const openPopup = useCallback((triggerType = POPUP_TRIGGER_TYPES.DEFAULT, options = {}) => {
    // Check if popup was dismissed in this session
    if (wasPopupDismissed() && !options.force) {
      return false;
    }

    // Check popup count limit (max 3 per session unless forced)
    const count = getPopupCount();
    if (count >= 3 && !options.force) {
      return false;
    }

    // Increment popup count
    incrementPopupCount();

    const title = options.title || POPUP_TITLES[triggerType] || POPUP_TITLES[POPUP_TRIGGER_TYPES.DEFAULT];
    const showSiteVisit = triggerType === POPUP_TRIGGER_TYPES.SITE_VISIT;

    setPopupState({
      isOpen: true,
      triggerType,
      title,
      showSiteVisit,
      ...options,
    });

    return true;
  }, []);

  /**
   * Close popup
   * @param {boolean} markDismissed - Whether to mark as dismissed for session
   */
  const closePopup = useCallback((markDismissed = false) => {
    setPopupState(defaultPopupState);

    if (markDismissed) {
      dismissPopup();
    }
  }, []);

  /**
   * Open brochure popup
   */
  const openBrochurePopup = useCallback(() => {
    return openPopup(POPUP_TRIGGER_TYPES.BROCHURE);
  }, [openPopup]);

  /**
   * Open price popup
   */
  const openPricePopup = useCallback(() => {
    return openPopup(POPUP_TRIGGER_TYPES.PRICE);
  }, [openPopup]);

  /**
   * Open site visit popup
   */
  const openSiteVisitPopup = useCallback(() => {
    return openPopup(POPUP_TRIGGER_TYPES.SITE_VISIT);
  }, [openPopup]);

  /**
   * Show exit intent popup
   */
  const showExitIntentPopup = useCallback(() => {
    if (wasExitIntentShown()) {
      return false;
    }

    markExitIntentShown();
    return openPopup(POPUP_TRIGGER_TYPES.EXIT_INTENT, { force: true });
  }, [openPopup]);

  /**
   * Show timer popup (after delay on page)
   */
  const showTimerPopup = useCallback(() => {
    return openPopup(POPUP_TRIGGER_TYPES.TIMER);
  }, [openPopup]);

  // ==================== Scroll Actions ====================

  /**
   * Scroll to section
   * @param {string} sectionId - Section ID to scroll to
   * @param {Object} options - Scroll options
   */
  const scrollToSection = useCallback((sectionId, options = {}) => {
    const element = document.getElementById(sectionId);
    if (!element) return;

    const offset = options.offset || (isMobile ? -64 : -80);
    const behavior = options.behavior || 'smooth';

    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.scrollY + offset;

    window.scrollTo({
      top: offsetPosition,
      behavior,
    });

    // Close mobile drawer if open
    if (isMobileDrawerOpen) {
      closeMobileDrawer();
    }
  }, [isMobile, isMobileDrawerOpen, closeMobileDrawer]);

  /**
   * Scroll to top
   * @param {Object} options - Scroll options
   */
  const scrollToTop = useCallback((options = {}) => {
    const behavior = options.behavior || 'smooth';

    window.scrollTo({
      top: 0,
      behavior,
    });
  }, []);

  // ==================== Snackbar Actions ====================

  /**
   * Show snackbar
   * @param {string} message - Message to display
   * @param {string} severity - Severity type (success, error, warning, info)
   * @param {number} duration - Auto hide duration in ms
   */
  const showSnackbar = useCallback((message, severity = 'info', duration = 5000) => {
    setSnackbar({
      open: true,
      message,
      severity,
      autoHideDuration: duration,
    });
  }, []);

  /**
   * Show success snackbar
   * @param {string} message - Message to display
   */
  const showSuccess = useCallback((message) => {
    showSnackbar(message, 'success');
  }, [showSnackbar]);

  /**
   * Show error snackbar
   * @param {string} message - Message to display
   */
  const showError = useCallback((message) => {
    showSnackbar(message, 'error', 7000);
  }, [showSnackbar]);

  /**
   * Show warning snackbar
   * @param {string} message - Message to display
   */
  const showWarning = useCallback((message) => {
    showSnackbar(message, 'warning');
  }, [showSnackbar]);

  /**
   * Show info snackbar
   * @param {string} message - Message to display
   */
  const showInfo = useCallback((message) => {
    showSnackbar(message, 'info');
  }, [showSnackbar]);

  /**
   * Hide snackbar
   */
  const hideSnackbar = useCallback(() => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  }, []);

  // ==================== Loading Actions ====================

  /**
   * Set page loading state
   * @param {boolean} loading - Loading state
   */
  const setPageLoading = useCallback((loading) => {
    setIsPageLoading(loading);
  }, []);

  /**
   * Context value
   */
  const value = useMemo(() => ({
    // Mobile drawer
    isMobileDrawerOpen,
    openMobileDrawer,
    closeMobileDrawer,
    toggleMobileDrawer,

    // Popup
    popupState,
    openPopup,
    closePopup,
    openBrochurePopup,
    openPricePopup,
    openSiteVisitPopup,
    showExitIntentPopup,
    showTimerPopup,

    // Scroll
    scrollPosition,
    scrollDirection,
    isScrolled,
    scrollToSection,
    scrollToTop,

    // Active section
    activeSection,
    setActiveSection,

    // Responsive
    isMobile,
    isTablet,
    isDesktop,
    windowSize,

    // Loading
    isPageLoading,
    setPageLoading,

    // Snackbar
    snackbar,
    showSnackbar,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    hideSnackbar,
  }), [
    isMobileDrawerOpen,
    openMobileDrawer,
    closeMobileDrawer,
    toggleMobileDrawer,
    popupState,
    openPopup,
    closePopup,
    openBrochurePopup,
    openPricePopup,
    openSiteVisitPopup,
    showExitIntentPopup,
    showTimerPopup,
    scrollPosition,
    scrollDirection,
    isScrolled,
    scrollToSection,
    scrollToTop,
    activeSection,
    isMobile,
    isTablet,
    isDesktop,
    windowSize,
    isPageLoading,
    setPageLoading,
    snackbar,
    showSnackbar,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    hideSnackbar,
  ]);

  return (
    <UIContext.Provider value={value}>
      {children}
    </UIContext.Provider>
  );
};

/**
 * Hook to use UI context
 * @returns {Object} UI context value
 * @throws {Error} If used outside of UIProvider
 */
export const useUIContext = () => {
  const context = useContext(UIContext);

  if (!context) {
    throw new Error('useUIContext must be used within a UIProvider');
  }

  return context;
};

// Note: UIContext is not exported as default to prevent Fast Refresh issues
// Use useUIContext hook or UIProvider instead
