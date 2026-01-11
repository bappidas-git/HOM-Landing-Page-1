/**
 * useIntersectionObserver Hook
 * Custom hook for Intersection Observer API
 * Useful for lazy loading, infinite scroll, and scroll animations
 */

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';

/**
 * useIntersectionObserver Hook
 * Tracks element visibility using Intersection Observer
 * @param {Object} options - Hook options
 * @param {number|string} options.threshold - Visibility threshold (0-1 or array)
 * @param {string} options.root - Root element selector
 * @param {string} options.rootMargin - Root margin
 * @param {boolean} options.triggerOnce - Only trigger once when visible
 * @param {boolean} options.freezeOnceVisible - Stop observing after becoming visible
 * @param {Function} options.onChange - Callback when visibility changes
 * @returns {Object} Observer state and ref
 */
const useIntersectionObserver = (options = {}) => {
  const {
    threshold = 0,
    root = null,
    rootMargin = '0px',
    triggerOnce = false,
    freezeOnceVisible = false,
    onChange = null,
  } = options;

  // Ref for the target element
  const elementRef = useRef(null);

  // State
  const [entry, setEntry] = useState(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);

  // Track if observer should be frozen
  const frozen = freezeOnceVisible && hasIntersected;

  /**
   * Update state based on intersection entry
   */
  const updateEntry = useCallback((entries) => {
    const [latestEntry] = entries;

    setEntry(latestEntry);
    setIsIntersecting(latestEntry.isIntersecting);

    if (latestEntry.isIntersecting) {
      setHasIntersected(true);
    }

    // Call onChange callback
    if (onChange) {
      onChange(latestEntry);
    }
  }, [onChange]);

  /**
   * Set up Intersection Observer
   */
  useEffect(() => {
    const element = elementRef.current;

    // Don't observe if frozen or no element
    if (frozen || !element) return;

    // Check if IntersectionObserver is supported
    if (typeof IntersectionObserver === 'undefined') {
      console.warn('[useIntersectionObserver] IntersectionObserver not supported');
      return;
    }

    // Get root element if specified
    const rootElement = root ? document.querySelector(root) : null;

    // Create observer
    const observer = new IntersectionObserver(updateEntry, {
      threshold,
      root: rootElement,
      rootMargin,
    });

    // Start observing
    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, root, rootMargin, frozen, updateEntry]);

  /**
   * Handle trigger once
   */
  useEffect(() => {
    if (triggerOnce && isIntersecting && elementRef.current) {
      // Disconnect after first intersection
      setHasIntersected(true);
    }
  }, [triggerOnce, isIntersecting]);

  /**
   * Reset observer state
   */
  const reset = useCallback(() => {
    setEntry(null);
    setIsIntersecting(false);
    setHasIntersected(false);
  }, []);

  /**
   * Computed visibility ratio
   */
  const visibilityRatio = useMemo(() => {
    return entry?.intersectionRatio ?? 0;
  }, [entry]);

  /**
   * Get bounding client rect
   */
  const boundingClientRect = useMemo(() => {
    return entry?.boundingClientRect ?? null;
  }, [entry]);

  /**
   * Check if element is fully visible
   */
  const isFullyVisible = useMemo(() => {
    return visibilityRatio >= 1;
  }, [visibilityRatio]);

  /**
   * Check if element is partially visible
   */
  const isPartiallyVisible = useMemo(() => {
    return visibilityRatio > 0 && visibilityRatio < 1;
  }, [visibilityRatio]);

  return {
    // Ref to attach to element
    ref: elementRef,

    // State
    entry,
    isIntersecting,
    hasIntersected,
    visibilityRatio,
    isFullyVisible,
    isPartiallyVisible,
    boundingClientRect,

    // Actions
    reset,
  };
};

/**
 * useInViewport Hook
 * Simplified hook for checking if element is in viewport
 * @param {Object} options - Hook options
 * @returns {Array} [ref, isInViewport, hasBeenInViewport]
 */
export const useInViewport = (options = {}) => {
  const { ref, isIntersecting, hasIntersected } = useIntersectionObserver(options);
  return [ref, isIntersecting, hasIntersected];
};

/**
 * useScrollAnimation Hook
 * Hook for triggering animations when element enters viewport
 * @param {Object} options - Hook options
 * @returns {Object} Animation state and ref
 */
export const useScrollAnimation = (options = {}) => {
  const {
    threshold = 0.1,
    triggerOnce = true,
    delay = 0,
    ...restOptions
  } = options;

  const { ref, isIntersecting, hasIntersected } = useIntersectionObserver({
    threshold,
    triggerOnce,
    ...restOptions,
  });

  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    if (isIntersecting && !shouldAnimate) {
      if (delay > 0) {
        const timer = setTimeout(() => {
          setShouldAnimate(true);
        }, delay);
        return () => clearTimeout(timer);
      } else {
        setShouldAnimate(true);
      }
    }
  }, [isIntersecting, shouldAnimate, delay]);

  return {
    ref,
    shouldAnimate,
    isIntersecting,
    hasIntersected,
  };
};

/**
 * useLazyLoad Hook
 * Hook for lazy loading content when element enters viewport
 * @param {Object} options - Hook options
 * @returns {Object} Lazy load state and ref
 */
export const useLazyLoad = (options = {}) => {
  const {
    threshold = 0,
    rootMargin = '100px',
    ...restOptions
  } = options;

  const { ref, isIntersecting, hasIntersected } = useIntersectionObserver({
    threshold,
    rootMargin,
    freezeOnceVisible: true,
    ...restOptions,
  });

  return {
    ref,
    shouldLoad: hasIntersected,
    isVisible: isIntersecting,
  };
};

/**
 * useInfiniteScroll Hook
 * Hook for implementing infinite scroll
 * @param {Function} onLoadMore - Callback to load more items
 * @param {Object} options - Hook options
 * @returns {Object} Infinite scroll state and ref
 */
export const useInfiniteScroll = (onLoadMore, options = {}) => {
  const {
    threshold = 0.1,
    rootMargin = '100px',
    disabled = false,
    ...restOptions
  } = options;

  const [isLoading, setIsLoading] = useState(false);
  const loadMoreRef = useRef(onLoadMore);

  // Keep callback ref updated
  useEffect(() => {
    loadMoreRef.current = onLoadMore;
  }, [onLoadMore]);

  const handleIntersect = useCallback(async (entry) => {
    if (entry.isIntersecting && !disabled && !isLoading) {
      setIsLoading(true);
      try {
        await loadMoreRef.current();
      } finally {
        setIsLoading(false);
      }
    }
  }, [disabled, isLoading]);

  const { ref, isIntersecting } = useIntersectionObserver({
    threshold,
    rootMargin,
    onChange: handleIntersect,
    ...restOptions,
  });

  return {
    ref,
    isLoading,
    isIntersecting,
  };
};

export default useIntersectionObserver;
