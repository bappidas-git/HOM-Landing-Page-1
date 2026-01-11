/**
 * Hooks barrel export for Nambiar District 25
 * Centralized exports for all custom hooks
 */

// Authentication Hook
export { default as useAuth } from './useAuth';

// Lead Form Hook
export { default as useLeadForm } from './useLeadForm';

// Responsive Design Hook
export { default as useResponsive } from './useResponsive';

// Scroll Position Hook
export { default as useScrollPosition } from './useScrollPosition';

// Local Storage Hook
export { default as useLocalStorage, useLocalStorageState, useSessionStorage } from './useLocalStorage';

// Intersection Observer Hook
export {
  default as useIntersectionObserver,
  useInViewport,
  useScrollAnimation,
  useLazyLoad,
  useInfiniteScroll,
} from './useIntersectionObserver';

// Geolocation Hook
export { default as useGeolocation } from './useGeolocation';

// IP Address Hook
export { default as useIPAddress } from './useIPAddress';

/**
 * Re-export context hooks for convenience
 * These are the primary hooks for accessing global state
 */
export { useAuthContext } from '@/context/AuthContext';
export { useUIContext } from '@/context/UIContext';
export { useLeadFormContext } from '@/context/LeadFormContext';
