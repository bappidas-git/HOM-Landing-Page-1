/**
 * useScrollPosition Hook
 * Custom hook for tracking scroll position and related functionality
 */

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';

/**
 * useScrollPosition Hook
 * Tracks scroll position, direction, and provides scroll utilities
 * @param {Object} options - Hook options
 * @param {number} options.threshold - Scroll threshold for isScrolled (default: 50)
 * @param {number} options.throttleMs - Throttle delay in ms (default: 100)
 * @param {boolean} options.passive - Use passive event listener (default: true)
 * @returns {Object} Scroll state and utilities
 */
const useScrollPosition = (options = {}) => {
  const {
    threshold = 50,
    throttleMs = 100,
    passive = true,
  } = options;

  // State
  const [scrollPosition, setScrollPosition] = useState({
    x: 0,
    y: 0,
    lastY: 0,
  });
  const [scrollDirection, setScrollDirection] = useState('none');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [scrollPercentage, setScrollPercentage] = useState(0);

  // Refs for throttling
  const lastScrollTime = useRef(0);
  const ticking = useRef(false);

  /**
   * Calculate scroll percentage
   */
  const calculateScrollPercentage = useCallback(() => {
    if (typeof window === 'undefined') return 0;

    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight;
    const winHeight = window.innerHeight;
    const scrollable = docHeight - winHeight;

    if (scrollable <= 0) return 0;

    return Math.min(100, Math.max(0, (scrollTop / scrollable) * 100));
  }, []);

  /**
   * Check if at bottom of page
   */
  const checkIsAtBottom = useCallback(() => {
    if (typeof window === 'undefined') return false;

    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight;
    const winHeight = window.innerHeight;

    return scrollTop + winHeight >= docHeight - 10;
  }, []);

  /**
   * Handle scroll event
   */
  const handleScroll = useCallback(() => {
    if (typeof window === 'undefined') return;

    const now = Date.now();

    // Throttle updates
    if (now - lastScrollTime.current < throttleMs && ticking.current) {
      return;
    }

    if (!ticking.current) {
      ticking.current = true;

      requestAnimationFrame(() => {
        const currentY = window.scrollY;
        const currentX = window.scrollX;

        // Update scroll position
        setScrollPosition((prev) => {
          const direction = currentY > prev.y ? 'down' : currentY < prev.y ? 'up' : 'none';
          setScrollDirection(direction);

          return {
            x: currentX,
            y: currentY,
            lastY: prev.y,
          };
        });

        // Update derived states
        setIsScrolled(currentY > threshold);
        setIsAtTop(currentY <= 0);
        setIsAtBottom(checkIsAtBottom());
        setScrollPercentage(calculateScrollPercentage());

        lastScrollTime.current = now;
        ticking.current = false;
      });
    }
  }, [threshold, throttleMs, checkIsAtBottom, calculateScrollPercentage]);

  /**
   * Set up scroll listener
   */
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Set initial values
    handleScroll();

    // Add event listener
    window.addEventListener('scroll', handleScroll, { passive });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll, passive]);

  /**
   * Scroll to top
   * @param {Object} scrollOptions - Scroll options
   */
  const scrollToTop = useCallback((scrollOptions = {}) => {
    if (typeof window === 'undefined') return;

    window.scrollTo({
      top: 0,
      behavior: scrollOptions.behavior || 'smooth',
      ...scrollOptions,
    });
  }, []);

  /**
   * Scroll to bottom
   * @param {Object} scrollOptions - Scroll options
   */
  const scrollToBottom = useCallback((scrollOptions = {}) => {
    if (typeof window === 'undefined') return;

    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: scrollOptions.behavior || 'smooth',
      ...scrollOptions,
    });
  }, []);

  /**
   * Scroll to specific position
   * @param {number} position - Y position to scroll to
   * @param {Object} scrollOptions - Scroll options
   */
  const scrollToPosition = useCallback((position, scrollOptions = {}) => {
    if (typeof window === 'undefined') return;

    window.scrollTo({
      top: position,
      behavior: scrollOptions.behavior || 'smooth',
      ...scrollOptions,
    });
  }, []);

  /**
   * Scroll to element
   * @param {string|Element} element - Element ID or element reference
   * @param {Object} scrollOptions - Scroll options
   */
  const scrollToElement = useCallback((element, scrollOptions = {}) => {
    if (typeof window === 'undefined') return;

    let targetElement;

    if (typeof element === 'string') {
      targetElement = document.getElementById(element) || document.querySelector(element);
    } else {
      targetElement = element;
    }

    if (!targetElement) return;

    const offset = scrollOptions.offset || 0;
    const elementPosition = targetElement.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.scrollY + offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: scrollOptions.behavior || 'smooth',
      ...scrollOptions,
    });
  }, []);

  /**
   * Scroll by amount
   * @param {number} amount - Amount to scroll by (positive = down, negative = up)
   * @param {Object} scrollOptions - Scroll options
   */
  const scrollBy = useCallback((amount, scrollOptions = {}) => {
    if (typeof window === 'undefined') return;

    window.scrollBy({
      top: amount,
      behavior: scrollOptions.behavior || 'smooth',
      ...scrollOptions,
    });
  }, []);

  /**
   * Lock scroll
   */
  const lockScroll = useCallback(() => {
    if (typeof document === 'undefined') return;

    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = '15px'; // Prevent layout shift
  }, []);

  /**
   * Unlock scroll
   */
  const unlockScroll = useCallback(() => {
    if (typeof document === 'undefined') return;

    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
  }, []);

  /**
   * Check if element is in viewport
   * @param {string|Element} element - Element ID or element reference
   * @param {number} offset - Offset from viewport edges (default: 0)
   * @returns {boolean} True if element is in viewport
   */
  const isElementInViewport = useCallback((element, offset = 0) => {
    if (typeof window === 'undefined') return false;

    let targetElement;

    if (typeof element === 'string') {
      targetElement = document.getElementById(element) || document.querySelector(element);
    } else {
      targetElement = element;
    }

    if (!targetElement) return false;

    const rect = targetElement.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;

    return (
      rect.top >= -offset &&
      rect.bottom <= windowHeight + offset
    );
  }, []);

  /**
   * Get scroll velocity (pixels per second)
   */
  const scrollVelocity = useMemo(() => {
    const deltaY = scrollPosition.y - scrollPosition.lastY;
    return Math.abs(deltaY) * (1000 / throttleMs);
  }, [scrollPosition, throttleMs]);

  /**
   * Check if scrolling fast
   */
  const isScrollingFast = useMemo(() => {
    return scrollVelocity > 500;
  }, [scrollVelocity]);

  return {
    // Position
    scrollPosition,
    scrollX: scrollPosition.x,
    scrollY: scrollPosition.y,

    // Direction
    scrollDirection,
    isScrollingUp: scrollDirection === 'up',
    isScrollingDown: scrollDirection === 'down',

    // State
    isScrolled,
    isAtTop,
    isAtBottom,
    scrollPercentage,
    scrollVelocity,
    isScrollingFast,

    // Actions
    scrollToTop,
    scrollToBottom,
    scrollToPosition,
    scrollToElement,
    scrollBy,
    lockScroll,
    unlockScroll,

    // Utility
    isElementInViewport,
    calculateScrollPercentage,
  };
};

export default useScrollPosition;
