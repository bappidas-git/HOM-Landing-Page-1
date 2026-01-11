/**
 * Utils Module Index
 * Centralized export for all utility functions
 */

// Validation utilities
export {
  default as validation,
  isValidMobile,
  isValidEmail,
  isValidName,
  isValidUrl,
  isFutureDate,
  isDateInRange,
  sanitizeInput,
  cleanMobileNumber,
  isValidMessage,
  leadFormSchema,
  loginFormSchema,
  seoSettingsSchema,
  keywordSchema,
  validateForm,
  getFieldError,
  hasFieldError,
} from './validation';

// Formatter utilities
export {
  default as formatters,
  formatPrice,
  formatPriceInCrores,
  formatArea,
  formatPhoneNumber,
  formatDate,
  formatRelativeTime,
  formatTime,
  formatName,
  formatEmail,
  truncateText,
  formatNumber,
  formatPercentage,
  formatLeadStatus,
  formatLeadSource,
  formatFileSize,
  formatAddress,
  formatLocation,
} from './formatters';

// Geolocation utilities
export {
  default as geolocation,
  isGeolocationSupported,
  getCurrentPosition,
  watchPosition,
  clearWatch,
  calculateDistance,
  formatDistance,
  PROJECT_LOCATION,
  getDistanceFromProject,
  getGoogleMapsUrl,
  getDirectionsToProject,
  reverseGeocode,
  getLocationWithAddress,
  storeLocation,
  getStoredLocation,
  clearStoredLocation,
} from './geolocation';

// IP Address utilities
export {
  default as ipAddress,
  fetchIpData,
  fetchIpDataAlternative,
  fetchIpDataWithFallback,
  getCachedIpData,
  cacheIpData,
  getIpData,
  getIpAddress,
  getLocationFromIp,
  getFormattedLocationForLead,
  isFromIndia,
  getUserAgent,
  getBrowserInfo,
  getDeviceType,
  getTrackingData,
} from './ipAddress';

// Storage utilities
export {
  default as storage,
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
} from './storage';

// Duplicate check utilities
export {
  default as duplicateCheck,
  checkDuplicateViaApi,
  checkDuplicateLocally,
  saveContactLocally,
  checkDuplicate,
  recordSubmission,
  validateBeforeSubmit,
  clearLocalSubmissions,
  getLocalSubmissions,
  checkSubmissionCooldown,
  performFullValidation,
} from './duplicateCheck';

/**
 * Combined utils object for convenience
 */
const utils = {
  // Validation
  isValidMobile,
  isValidEmail,
  isValidName,
  isValidUrl,
  validateForm,

  // Formatting
  formatPrice,
  formatPriceInCrores,
  formatPhoneNumber,
  formatDate,
  formatRelativeTime,
  formatName,
  formatLeadStatus,
  formatLeadSource,
  truncateText,

  // Geolocation
  getCurrentPosition,
  getDistanceFromProject,
  getDirectionsToProject,

  // IP/Tracking
  getIpData,
  getTrackingData,
  getUserAgent,

  // Storage
  setLocalStorage,
  getLocalStorage,
  setSessionStorage,
  getSessionStorage,
  captureUtmParams,
  getUtmParams,
  saveFormDraft,
  getFormDraft,

  // Duplicate check
  checkDuplicate,
  recordSubmission,
  performFullValidation,
};

export default utils;
