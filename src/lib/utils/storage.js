/**
 * Storage Utilities
 * Functions for handling localStorage and sessionStorage
 */

/**
 * Check if localStorage is available
 * @returns {boolean} True if available
 */
export const isLocalStorageAvailable = () => {
  if (typeof window === 'undefined') return false;

  try {
    const testKey = '__storage_test__';
    window.localStorage.setItem(testKey, testKey);
    window.localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
};

/**
 * Check if sessionStorage is available
 * @returns {boolean} True if available
 */
export const isSessionStorageAvailable = () => {
  if (typeof window === 'undefined') return false;

  try {
    const testKey = '__storage_test__';
    window.sessionStorage.setItem(testKey, testKey);
    window.sessionStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
};

/**
 * Storage prefix for the application
 */
const STORAGE_PREFIX = 'nambiar_d25_';

/**
 * Get prefixed key
 * @param {string} key - Key name
 * @returns {string} Prefixed key
 */
const getPrefixedKey = (key) => {
  return `${STORAGE_PREFIX}${key}`;
};

/**
 * Set item in localStorage
 * @param {string} key - Key name
 * @param {*} value - Value to store (will be JSON stringified)
 * @param {number} expiryMinutes - Optional expiry time in minutes
 * @returns {boolean} Success status
 */
export const setLocalStorage = (key, value, expiryMinutes = null) => {
  if (!isLocalStorageAvailable()) return false;

  try {
    const prefixedKey = getPrefixedKey(key);
    const item = {
      value,
      timestamp: new Date().toISOString(),
    };

    if (expiryMinutes) {
      item.expiresAt = new Date(Date.now() + expiryMinutes * 60 * 1000).toISOString();
    }

    window.localStorage.setItem(prefixedKey, JSON.stringify(item));
    return true;
  } catch (error) {
    console.error('[Storage] Error setting localStorage:', error.message);
    return false;
  }
};

/**
 * Get item from localStorage
 * @param {string} key - Key name
 * @param {*} defaultValue - Default value if not found or expired
 * @returns {*} Stored value or default
 */
export const getLocalStorage = (key, defaultValue = null) => {
  if (!isLocalStorageAvailable()) return defaultValue;

  try {
    const prefixedKey = getPrefixedKey(key);
    const itemStr = window.localStorage.getItem(prefixedKey);

    if (!itemStr) return defaultValue;

    const item = JSON.parse(itemStr);

    // Check expiry
    if (item.expiresAt) {
      const expiryDate = new Date(item.expiresAt);
      if (new Date() > expiryDate) {
        window.localStorage.removeItem(prefixedKey);
        return defaultValue;
      }
    }

    return item.value;
  } catch (error) {
    console.error('[Storage] Error getting localStorage:', error.message);
    return defaultValue;
  }
};

/**
 * Remove item from localStorage
 * @param {string} key - Key name
 * @returns {boolean} Success status
 */
export const removeLocalStorage = (key) => {
  if (!isLocalStorageAvailable()) return false;

  try {
    const prefixedKey = getPrefixedKey(key);
    window.localStorage.removeItem(prefixedKey);
    return true;
  } catch (error) {
    console.error('[Storage] Error removing localStorage:', error.message);
    return false;
  }
};

/**
 * Set item in sessionStorage
 * @param {string} key - Key name
 * @param {*} value - Value to store
 * @returns {boolean} Success status
 */
export const setSessionStorage = (key, value) => {
  if (!isSessionStorageAvailable()) return false;

  try {
    const prefixedKey = getPrefixedKey(key);
    const item = {
      value,
      timestamp: new Date().toISOString(),
    };

    window.sessionStorage.setItem(prefixedKey, JSON.stringify(item));
    return true;
  } catch (error) {
    console.error('[Storage] Error setting sessionStorage:', error.message);
    return false;
  }
};

/**
 * Get item from sessionStorage
 * @param {string} key - Key name
 * @param {*} defaultValue - Default value if not found
 * @returns {*} Stored value or default
 */
export const getSessionStorage = (key, defaultValue = null) => {
  if (!isSessionStorageAvailable()) return defaultValue;

  try {
    const prefixedKey = getPrefixedKey(key);
    const itemStr = window.sessionStorage.getItem(prefixedKey);

    if (!itemStr) return defaultValue;

    const item = JSON.parse(itemStr);
    return item.value;
  } catch (error) {
    console.error('[Storage] Error getting sessionStorage:', error.message);
    return defaultValue;
  }
};

/**
 * Remove item from sessionStorage
 * @param {string} key - Key name
 * @returns {boolean} Success status
 */
export const removeSessionStorage = (key) => {
  if (!isSessionStorageAvailable()) return false;

  try {
    const prefixedKey = getPrefixedKey(key);
    window.sessionStorage.removeItem(prefixedKey);
    return true;
  } catch (error) {
    console.error('[Storage] Error removing sessionStorage:', error.message);
    return false;
  }
};

/**
 * Clear all application data from localStorage
 * @returns {boolean} Success status
 */
export const clearLocalStorage = () => {
  if (!isLocalStorageAvailable()) return false;

  try {
    const keysToRemove = [];

    for (let i = 0; i < window.localStorage.length; i++) {
      const key = window.localStorage.key(i);
      if (key && key.startsWith(STORAGE_PREFIX)) {
        keysToRemove.push(key);
      }
    }

    keysToRemove.forEach((key) => window.localStorage.removeItem(key));
    return true;
  } catch (error) {
    console.error('[Storage] Error clearing localStorage:', error.message);
    return false;
  }
};

/**
 * Clear all application data from sessionStorage
 * @returns {boolean} Success status
 */
export const clearSessionStorage = () => {
  if (!isSessionStorageAvailable()) return false;

  try {
    const keysToRemove = [];

    for (let i = 0; i < window.sessionStorage.length; i++) {
      const key = window.sessionStorage.key(i);
      if (key && key.startsWith(STORAGE_PREFIX)) {
        keysToRemove.push(key);
      }
    }

    keysToRemove.forEach((key) => window.sessionStorage.removeItem(key));
    return true;
  } catch (error) {
    console.error('[Storage] Error clearing sessionStorage:', error.message);
    return false;
  }
};

/**
 * Clear all application data from both storages
 * @returns {boolean} Success status
 */
export const clearAllStorage = () => {
  const localResult = clearLocalStorage();
  const sessionResult = clearSessionStorage();
  return localResult && sessionResult;
};

// ============================================
// Specific storage functions for the application
// ============================================

/**
 * Storage keys
 */
export const STORAGE_KEYS = {
  // Lead form
  LEAD_FORM_DRAFT: 'lead_form_draft',
  FORM_SUBMITTED: 'form_submitted',
  LAST_SUBMISSION: 'last_submission',

  // User preferences
  POPUP_DISMISSED: 'popup_dismissed',
  POPUP_SHOWN_COUNT: 'popup_shown_count',
  EXIT_INTENT_SHOWN: 'exit_intent_shown',
  THEME_MODE: 'theme_mode',

  // Tracking
  UTM_PARAMS: 'utm_params',
  IP_DATA: 'ip_data',
  USER_LOCATION: 'user_location',

  // Session
  SESSION_ID: 'session_id',
  SESSION_START: 'session_start',
  PAGE_VIEWS: 'page_views',

  // Admin
  ADMIN_TOKEN: 'admin_token',
  ADMIN_USER: 'admin_user',
  ADMIN_PREFERENCES: 'admin_preferences',
};

/**
 * Save form draft
 * @param {Object} formData - Form data to save
 */
export const saveFormDraft = (formData) => {
  setLocalStorage(STORAGE_KEYS.LEAD_FORM_DRAFT, formData, 60); // 1 hour expiry
};

/**
 * Get form draft
 * @returns {Object|null} Saved form data or null
 */
export const getFormDraft = () => {
  return getLocalStorage(STORAGE_KEYS.LEAD_FORM_DRAFT, null);
};

/**
 * Clear form draft
 */
export const clearFormDraft = () => {
  removeLocalStorage(STORAGE_KEYS.LEAD_FORM_DRAFT);
};

/**
 * Mark form as submitted (for duplicate prevention on client side)
 */
export const markFormSubmitted = () => {
  setLocalStorage(STORAGE_KEYS.FORM_SUBMITTED, true);
  setLocalStorage(STORAGE_KEYS.LAST_SUBMISSION, new Date().toISOString());
};

/**
 * Check if form was already submitted
 * @returns {boolean} True if submitted
 */
export const wasFormSubmitted = () => {
  return getLocalStorage(STORAGE_KEYS.FORM_SUBMITTED, false);
};

/**
 * Save UTM parameters
 * @param {Object} params - UTM parameters
 */
export const saveUtmParams = (params) => {
  setSessionStorage(STORAGE_KEYS.UTM_PARAMS, params);
};

/**
 * Get UTM parameters
 * @returns {Object} UTM parameters
 */
export const getUtmParams = () => {
  return getSessionStorage(STORAGE_KEYS.UTM_PARAMS, {});
};

/**
 * Parse and save UTM parameters from URL
 */
export const captureUtmParams = () => {
  if (typeof window === 'undefined') return;

  const urlParams = new URLSearchParams(window.location.search);
  const utmParams = {};

  const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];

  utmKeys.forEach((key) => {
    const value = urlParams.get(key);
    if (value) {
      utmParams[key] = value;
    }
  });

  if (Object.keys(utmParams).length > 0) {
    saveUtmParams(utmParams);
  }

  return utmParams;
};

/**
 * Mark popup as dismissed
 */
export const dismissPopup = () => {
  setSessionStorage(STORAGE_KEYS.POPUP_DISMISSED, true);
};

/**
 * Check if popup was dismissed
 * @returns {boolean} True if dismissed
 */
export const wasPopupDismissed = () => {
  return getSessionStorage(STORAGE_KEYS.POPUP_DISMISSED, false);
};

/**
 * Increment popup shown count
 * @returns {number} New count
 */
export const incrementPopupCount = () => {
  const count = getSessionStorage(STORAGE_KEYS.POPUP_SHOWN_COUNT, 0) + 1;
  setSessionStorage(STORAGE_KEYS.POPUP_SHOWN_COUNT, count);
  return count;
};

/**
 * Get popup shown count
 * @returns {number} Count
 */
export const getPopupCount = () => {
  return getSessionStorage(STORAGE_KEYS.POPUP_SHOWN_COUNT, 0);
};

/**
 * Mark exit intent as shown
 */
export const markExitIntentShown = () => {
  setSessionStorage(STORAGE_KEYS.EXIT_INTENT_SHOWN, true);
};

/**
 * Check if exit intent was shown
 * @returns {boolean} True if shown
 */
export const wasExitIntentShown = () => {
  return getSessionStorage(STORAGE_KEYS.EXIT_INTENT_SHOWN, false);
};

/**
 * Track page view
 */
export const trackPageView = () => {
  const views = getSessionStorage(STORAGE_KEYS.PAGE_VIEWS, 0) + 1;
  setSessionStorage(STORAGE_KEYS.PAGE_VIEWS, views);
  return views;
};

/**
 * Get page view count
 * @returns {number} Page view count
 */
export const getPageViews = () => {
  return getSessionStorage(STORAGE_KEYS.PAGE_VIEWS, 0);
};

/**
 * Generate and store session ID
 * @returns {string} Session ID
 */
export const getOrCreateSessionId = () => {
  let sessionId = getSessionStorage(STORAGE_KEYS.SESSION_ID, null);

  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    setSessionStorage(STORAGE_KEYS.SESSION_ID, sessionId);
    setSessionStorage(STORAGE_KEYS.SESSION_START, new Date().toISOString());
  }

  return sessionId;
};

/**
 * Get session duration in seconds
 * @returns {number} Duration in seconds
 */
export const getSessionDuration = () => {
  const startStr = getSessionStorage(STORAGE_KEYS.SESSION_START, null);
  if (!startStr) return 0;

  const start = new Date(startStr);
  const now = new Date();
  return Math.floor((now - start) / 1000);
};

export default {
  isLocalStorageAvailable,
  isSessionStorageAvailable,
  setLocalStorage,
  getLocalStorage,
  removeLocalStorage,
  setSessionStorage,
  getSessionStorage,
  removeSessionStorage,
  clearLocalStorage,
  clearSessionStorage,
  clearAllStorage,
  STORAGE_KEYS,
  saveFormDraft,
  getFormDraft,
  clearFormDraft,
  markFormSubmitted,
  wasFormSubmitted,
  saveUtmParams,
  getUtmParams,
  captureUtmParams,
  dismissPopup,
  wasPopupDismissed,
  incrementPopupCount,
  getPopupCount,
  markExitIntentShown,
  wasExitIntentShown,
  trackPageView,
  getPageViews,
  getOrCreateSessionId,
  getSessionDuration,
};
