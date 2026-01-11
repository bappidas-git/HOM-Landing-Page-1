/**
 * useResponsive Hook
 * Custom hook for responsive design utilities
 * Tracks viewport size and provides breakpoint helpers
 */

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

/**
 * Default breakpoints (matching MUI)
 */
const DEFAULT_BREAKPOINTS = {
  xs: 0,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536,
};

/**
 * useResponsive Hook
 * Provides responsive design utilities and viewport tracking
 * @param {Object} options - Hook options
 * @param {Object} options.customBreakpoints - Custom breakpoint values
 * @returns {Object} Responsive state and utilities
 */
const useResponsive = (options = {}) => {
  const theme = useTheme();
  const { customBreakpoints = {} } = options;

  // Merge custom breakpoints with defaults
  const breakpoints = useMemo(() => ({
    ...DEFAULT_BREAKPOINTS,
    ...customBreakpoints,
  }), [customBreakpoints]);

  // MUI media queries
  const isXs = useMediaQuery(theme.breakpoints.only('xs'));
  const isSm = useMediaQuery(theme.breakpoints.only('sm'));
  const isMd = useMediaQuery(theme.breakpoints.only('md'));
  const isLg = useMediaQuery(theme.breakpoints.only('lg'));
  const isXl = useMediaQuery(theme.breakpoints.only('xl'));

  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));
  const isLgUp = useMediaQuery(theme.breakpoints.up('lg'));
  const isXlUp = useMediaQuery(theme.breakpoints.up('xl'));

  const isSmDown = useMediaQuery(theme.breakpoints.down('sm'));
  const isMdDown = useMediaQuery(theme.breakpoints.down('md'));
  const isLgDown = useMediaQuery(theme.breakpoints.down('lg'));
  const isXlDown = useMediaQuery(theme.breakpoints.down('xl'));

  // Window size state
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  // Track window resize
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Set initial size
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  /**
   * Check if viewport is mobile (< 600px)
   */
  const isMobile = useMemo(() => isXs, [isXs]);

  /**
   * Check if viewport is tablet (600px - 1199px)
   */
  const isTablet = useMemo(() => isSm || isMd, [isSm, isMd]);

  /**
   * Check if viewport is desktop (>= 1200px)
   */
  const isDesktop = useMemo(() => isLgUp, [isLgUp]);

  /**
   * Check if viewport is mobile or tablet (< 1200px)
   */
  const isMobileOrTablet = useMemo(() => isLgDown, [isLgDown]);

  /**
   * Check if viewport is touch device
   */
  const isTouchDevice = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  }, []);

  /**
   * Get current breakpoint name
   */
  const currentBreakpoint = useMemo(() => {
    if (isXl) return 'xl';
    if (isLg) return 'lg';
    if (isMd) return 'md';
    if (isSm) return 'sm';
    return 'xs';
  }, [isXs, isSm, isMd, isLg, isXl]);

  /**
   * Check if viewport is at or above a specific breakpoint
   * @param {string} breakpoint - Breakpoint name (xs, sm, md, lg, xl)
   * @returns {boolean} True if at or above breakpoint
   */
  const isUp = useCallback((breakpoint) => {
    const breakpointValue = breakpoints[breakpoint] || 0;
    return windowSize.width >= breakpointValue;
  }, [breakpoints, windowSize.width]);

  /**
   * Check if viewport is below a specific breakpoint
   * @param {string} breakpoint - Breakpoint name (xs, sm, md, lg, xl)
   * @returns {boolean} True if below breakpoint
   */
  const isDown = useCallback((breakpoint) => {
    const breakpointValue = breakpoints[breakpoint] || 0;
    return windowSize.width < breakpointValue;
  }, [breakpoints, windowSize.width]);

  /**
   * Check if viewport is exactly at a specific breakpoint
   * @param {string} breakpoint - Breakpoint name (xs, sm, md, lg, xl)
   * @returns {boolean} True if at breakpoint
   */
  const isOnly = useCallback((breakpoint) => {
    switch (breakpoint) {
      case 'xs': return isXs;
      case 'sm': return isSm;
      case 'md': return isMd;
      case 'lg': return isLg;
      case 'xl': return isXl;
      default: return false;
    }
  }, [isXs, isSm, isMd, isLg, isXl]);

  /**
   * Check if viewport is between two breakpoints
   * @param {string} start - Start breakpoint (inclusive)
   * @param {string} end - End breakpoint (exclusive)
   * @returns {boolean} True if between breakpoints
   */
  const isBetween = useCallback((start, end) => {
    const startValue = breakpoints[start] || 0;
    const endValue = breakpoints[end] || Infinity;
    return windowSize.width >= startValue && windowSize.width < endValue;
  }, [breakpoints, windowSize.width]);

  /**
   * Get responsive value based on current breakpoint
   * @param {Object} values - Object with breakpoint keys and values
   * @param {*} defaultValue - Default value if no match
   * @returns {*} Value for current breakpoint
   */
  const getResponsiveValue = useCallback((values, defaultValue = null) => {
    if (isXl && values.xl !== undefined) return values.xl;
    if (isLg && values.lg !== undefined) return values.lg;
    if (isMd && values.md !== undefined) return values.md;
    if (isSm && values.sm !== undefined) return values.sm;
    if (values.xs !== undefined) return values.xs;
    return defaultValue;
  }, [isXs, isSm, isMd, isLg, isXl]);

  /**
   * Get columns for grid layout
   * @param {Object} cols - Object with breakpoint keys and column counts
   * @returns {number} Column count for current breakpoint
   */
  const getGridColumns = useCallback((cols = {}) => {
    const defaultCols = { xs: 1, sm: 2, md: 3, lg: 4, xl: 4 };
    const merged = { ...defaultCols, ...cols };
    return getResponsiveValue(merged, 1);
  }, [getResponsiveValue]);

  /**
   * Get spacing multiplier for current breakpoint
   * @returns {number} Spacing multiplier
   */
  const spacingMultiplier = useMemo(() => {
    if (isXl) return 1.5;
    if (isLg) return 1.25;
    if (isMd) return 1;
    if (isSm) return 0.875;
    return 0.75;
  }, [isSm, isMd, isLg, isXl]);

  /**
   * Get orientation
   * @returns {string} 'portrait' or 'landscape'
   */
  const orientation = useMemo(() => {
    return windowSize.height > windowSize.width ? 'portrait' : 'landscape';
  }, [windowSize]);

  /**
   * Check if in portrait mode
   */
  const isPortrait = useMemo(() => orientation === 'portrait', [orientation]);

  /**
   * Check if in landscape mode
   */
  const isLandscape = useMemo(() => orientation === 'landscape', [orientation]);

  return {
    // Window size
    windowSize,
    width: windowSize.width,
    height: windowSize.height,

    // Exact breakpoints
    isXs,
    isSm,
    isMd,
    isLg,
    isXl,

    // Up breakpoints
    isSmUp,
    isMdUp,
    isLgUp,
    isXlUp,

    // Down breakpoints
    isSmDown,
    isMdDown,
    isLgDown,
    isXlDown,

    // Common aliases
    isMobile,
    isTablet,
    isDesktop,
    isMobileOrTablet,
    isTouchDevice,

    // Current breakpoint
    currentBreakpoint,

    // Utility functions
    isUp,
    isDown,
    isOnly,
    isBetween,
    getResponsiveValue,
    getGridColumns,

    // Spacing
    spacingMultiplier,

    // Orientation
    orientation,
    isPortrait,
    isLandscape,

    // Breakpoint values
    breakpoints,
  };
};

export default useResponsive;
