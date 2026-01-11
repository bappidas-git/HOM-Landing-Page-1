/**
 * useLocalStorage Hook
 * Custom hook for localStorage operations with React state sync
 */

import { useState, useEffect, useCallback, useMemo } from 'react';
import {
  isLocalStorageAvailable,
  setLocalStorage,
  getLocalStorage,
  removeLocalStorage,
} from '@/lib/utils/storage';

/**
 * useLocalStorage Hook
 * Provides localStorage functionality with React state synchronization
 * @param {string} key - Storage key
 * @param {*} initialValue - Initial value if key doesn't exist
 * @param {Object} options - Hook options
 * @param {number} options.expiryMinutes - Expiry time in minutes
 * @param {boolean} options.syncAcrossTabs - Sync state across browser tabs
 * @returns {Array} [storedValue, setValue, removeValue, isAvailable]
 */
const useLocalStorage = (key, initialValue = null, options = {}) => {
  const {
    expiryMinutes = null,
    syncAcrossTabs = true,
  } = options;

  // Check if localStorage is available
  const isAvailable = useMemo(() => isLocalStorageAvailable(), []);

  /**
   * Get initial value from localStorage or use default
   */
  const getInitialValue = useCallback(() => {
    if (!isAvailable) return initialValue;

    try {
      const storedValue = getLocalStorage(key, null);
      return storedValue !== null ? storedValue : initialValue;
    } catch (error) {
      console.error(`[useLocalStorage] Error reading key "${key}":`, error);
      return initialValue;
    }
  }, [key, initialValue, isAvailable]);

  // State for the stored value
  const [storedValue, setStoredValue] = useState(getInitialValue);

  // State for error handling
  const [error, setError] = useState(null);

  /**
   * Set value in localStorage and state
   * @param {*} value - Value to store (can be function)
   */
  const setValue = useCallback((value) => {
    try {
      setError(null);

      // Allow value to be a function (like useState)
      const valueToStore = value instanceof Function ? value(storedValue) : value;

      // Update state
      setStoredValue(valueToStore);

      // Update localStorage
      if (isAvailable) {
        setLocalStorage(key, valueToStore, expiryMinutes);
      }
    } catch (err) {
      console.error(`[useLocalStorage] Error setting key "${key}":`, err);
      setError(err);
    }
  }, [key, storedValue, isAvailable, expiryMinutes]);

  /**
   * Remove value from localStorage and reset state
   */
  const removeValue = useCallback(() => {
    try {
      setError(null);
      setStoredValue(initialValue);

      if (isAvailable) {
        removeLocalStorage(key);
      }
    } catch (err) {
      console.error(`[useLocalStorage] Error removing key "${key}":`, err);
      setError(err);
    }
  }, [key, initialValue, isAvailable]);

  /**
   * Refresh value from localStorage
   */
  const refreshValue = useCallback(() => {
    const value = getInitialValue();
    setStoredValue(value);
    return value;
  }, [getInitialValue]);

  /**
   * Check if value exists in localStorage
   */
  const hasValue = useMemo(() => {
    if (!isAvailable) return false;
    return getLocalStorage(key, null) !== null;
  }, [key, isAvailable]);

  /**
   * Sync across tabs
   */
  useEffect(() => {
    if (!syncAcrossTabs || !isAvailable) return;

    const handleStorageChange = (event) => {
      if (event.key === `nambiar_d25_${key}`) {
        try {
          const newValue = event.newValue ? JSON.parse(event.newValue) : initialValue;
          setStoredValue(newValue?.value ?? initialValue);
        } catch {
          setStoredValue(initialValue);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [key, initialValue, syncAcrossTabs, isAvailable]);

  return {
    value: storedValue,
    setValue,
    removeValue,
    refreshValue,
    hasValue,
    isAvailable,
    error,
  };
};

/**
 * useLocalStorageState Hook
 * Simpler API matching useState
 * @param {string} key - Storage key
 * @param {*} initialValue - Initial value
 * @returns {Array} [value, setValue]
 */
export const useLocalStorageState = (key, initialValue = null) => {
  const { value, setValue } = useLocalStorage(key, initialValue);
  return [value, setValue];
};

/**
 * useSessionStorage Hook
 * Same as useLocalStorage but uses sessionStorage
 * @param {string} key - Storage key
 * @param {*} initialValue - Initial value
 * @returns {Object} Storage state and methods
 */
export const useSessionStorage = (key, initialValue = null) => {
  const isAvailable = useMemo(() => {
    if (typeof window === 'undefined') return false;
    try {
      const testKey = '__storage_test__';
      window.sessionStorage.setItem(testKey, testKey);
      window.sessionStorage.removeItem(testKey);
      return true;
    } catch {
      return false;
    }
  }, []);

  const getInitialValue = useCallback(() => {
    if (!isAvailable) return initialValue;

    try {
      const item = window.sessionStorage.getItem(`nambiar_d25_${key}`);
      if (!item) return initialValue;
      const parsed = JSON.parse(item);
      return parsed?.value ?? initialValue;
    } catch {
      return initialValue;
    }
  }, [key, initialValue, isAvailable]);

  const [storedValue, setStoredValue] = useState(getInitialValue);
  const [error, setError] = useState(null);

  const setValue = useCallback((value) => {
    try {
      setError(null);
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);

      if (isAvailable) {
        window.sessionStorage.setItem(
          `nambiar_d25_${key}`,
          JSON.stringify({ value: valueToStore, timestamp: new Date().toISOString() })
        );
      }
    } catch (err) {
      setError(err);
    }
  }, [key, storedValue, isAvailable]);

  const removeValue = useCallback(() => {
    try {
      setError(null);
      setStoredValue(initialValue);

      if (isAvailable) {
        window.sessionStorage.removeItem(`nambiar_d25_${key}`);
      }
    } catch (err) {
      setError(err);
    }
  }, [key, initialValue, isAvailable]);

  return {
    value: storedValue,
    setValue,
    removeValue,
    isAvailable,
    error,
  };
};

export default useLocalStorage;
