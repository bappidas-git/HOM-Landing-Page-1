/**
 * Duplicate Check Utilities
 * Functions for preventing duplicate lead submissions
 */

import { checkDuplicateContact, addSubmittedContact } from '../api/leads';
import { getLocalStorage, setLocalStorage, STORAGE_KEYS } from './storage';

/**
 * Local storage key for submitted contacts
 */
const LOCAL_SUBMITTED_CONTACTS_KEY = 'submitted_contacts';

/**
 * Check for duplicate submission via API
 * @param {string} mobile - Mobile number
 * @param {string} email - Email address
 * @returns {Promise} Check result
 */
export const checkDuplicateViaApi = async (mobile, email) => {
  try {
    const result = await checkDuplicateContact(mobile, email);
    return result;
  } catch (error) {
    console.error('[Duplicate Check] API error:', error.message);
    return {
      success: false,
      error: error.message,
      exists: false,
      mobileExists: false,
      emailExists: false,
    };
  }
};

/**
 * Check for duplicate submission locally (client-side)
 * @param {string} mobile - Mobile number
 * @param {string} email - Email address
 * @returns {Object} Check result
 */
export const checkDuplicateLocally = (mobile, email) => {
  const contacts = getLocalStorage(LOCAL_SUBMITTED_CONTACTS_KEY, []);

  const cleanMobile = cleanMobileNumber(mobile);
  const cleanEmail = email.toLowerCase().trim();

  const mobileExists = contacts.some((c) => c.mobile === cleanMobile);
  const emailExists = contacts.some((c) => c.email === cleanEmail);

  return {
    exists: mobileExists || emailExists,
    mobileExists,
    emailExists,
    source: 'local',
  };
};

/**
 * Save contact to local storage
 * @param {string} mobile - Mobile number
 * @param {string} email - Email address
 */
export const saveContactLocally = (mobile, email) => {
  const contacts = getLocalStorage(LOCAL_SUBMITTED_CONTACTS_KEY, []);

  const cleanMobile = cleanMobileNumber(mobile);
  const cleanEmail = email.toLowerCase().trim();

  // Check if already exists
  const exists = contacts.some(
    (c) => c.mobile === cleanMobile || c.email === cleanEmail
  );

  if (!exists) {
    contacts.push({
      mobile: cleanMobile,
      email: cleanEmail,
      submittedAt: new Date().toISOString(),
    });

    setLocalStorage(LOCAL_SUBMITTED_CONTACTS_KEY, contacts);
  }
};

/**
 * Clean mobile number
 * @param {string} mobile - Mobile number
 * @returns {string} Cleaned mobile
 */
const cleanMobileNumber = (mobile) => {
  if (!mobile) return '';
  let cleaned = mobile.replace(/\D/g, '');
  // Remove country code if present
  if (cleaned.length === 12 && cleaned.startsWith('91')) {
    cleaned = cleaned.substring(2);
  }
  return cleaned;
};

/**
 * Check for duplicate (combined local + API)
 * @param {string} mobile - Mobile number
 * @param {string} email - Email address
 * @param {Object} options - Options
 * @param {boolean} options.checkApi - Whether to check API (default: true)
 * @param {boolean} options.checkLocal - Whether to check local (default: true)
 * @returns {Promise} Check result
 */
export const checkDuplicate = async (mobile, email, options = {}) => {
  const { checkApi = true, checkLocal = true } = options;

  // Check local first (faster)
  if (checkLocal) {
    const localResult = checkDuplicateLocally(mobile, email);
    if (localResult.exists) {
      return {
        ...localResult,
        message: getDuplicateMessage(localResult),
      };
    }
  }

  // Check API
  if (checkApi) {
    const apiResult = await checkDuplicateViaApi(mobile, email);
    if (apiResult.success && apiResult.exists) {
      return {
        ...apiResult,
        source: 'api',
        message: getDuplicateMessage(apiResult),
      };
    }

    // Return API result (even if no duplicate found)
    if (apiResult.success) {
      return {
        ...apiResult,
        source: 'api',
        message: null,
      };
    }
  }

  // No duplicate found
  return {
    exists: false,
    mobileExists: false,
    emailExists: false,
    source: checkApi ? 'api' : 'local',
    message: null,
  };
};

/**
 * Get duplicate error message
 * @param {Object} result - Check result
 * @returns {string} Error message
 */
const getDuplicateMessage = (result) => {
  if (result.mobileExists && result.emailExists) {
    return 'This mobile number and email have already been registered. Our team will contact you soon.';
  }
  if (result.mobileExists) {
    return 'This mobile number has already been registered. Our team will contact you soon.';
  }
  if (result.emailExists) {
    return 'This email address has already been registered. Our team will contact you soon.';
  }
  return 'You have already submitted an inquiry. Our team will contact you soon.';
};

/**
 * Record submission (both local and API)
 * @param {string} mobile - Mobile number
 * @param {string} email - Email address
 * @returns {Promise} Result
 */
export const recordSubmission = async (mobile, email) => {
  // Save locally first (immediate)
  saveContactLocally(mobile, email);

  // Save to API
  try {
    await addSubmittedContact(mobile, email);
    return { success: true };
  } catch (error) {
    console.error('[Duplicate Check] Error recording submission:', error.message);
    // Local save was successful, so we still return success
    return { success: true, warning: 'API save failed but local save succeeded' };
  }
};

/**
 * Validate and check for duplicate before submission
 * @param {Object} formData - Form data with mobile and email
 * @returns {Promise} Validation result
 */
export const validateBeforeSubmit = async (formData) => {
  const { mobile, email } = formData;

  // Validate required fields
  if (!mobile || !email) {
    return {
      valid: false,
      error: 'Mobile number and email are required',
    };
  }

  // Check for duplicates
  const duplicateResult = await checkDuplicate(mobile, email);

  if (duplicateResult.exists) {
    return {
      valid: false,
      isDuplicate: true,
      error: duplicateResult.message,
      mobileExists: duplicateResult.mobileExists,
      emailExists: duplicateResult.emailExists,
    };
  }

  return {
    valid: true,
    isDuplicate: false,
    error: null,
  };
};

/**
 * Clear local submission history (for testing/admin)
 */
export const clearLocalSubmissions = () => {
  setLocalStorage(LOCAL_SUBMITTED_CONTACTS_KEY, []);
};

/**
 * Get all local submissions (for debugging)
 * @returns {Array} List of submitted contacts
 */
export const getLocalSubmissions = () => {
  return getLocalStorage(LOCAL_SUBMITTED_CONTACTS_KEY, []);
};

/**
 * Check submission cooldown
 * @param {number} cooldownMinutes - Cooldown period in minutes (default: 5)
 * @returns {Object} Cooldown status
 */
export const checkSubmissionCooldown = (cooldownMinutes = 5) => {
  const lastSubmission = getLocalStorage(STORAGE_KEYS.LAST_SUBMISSION, null);

  if (!lastSubmission) {
    return {
      inCooldown: false,
      remainingSeconds: 0,
    };
  }

  const lastDate = new Date(lastSubmission);
  const now = new Date();
  const diffMs = now - lastDate;
  const cooldownMs = cooldownMinutes * 60 * 1000;

  if (diffMs < cooldownMs) {
    const remainingMs = cooldownMs - diffMs;
    return {
      inCooldown: true,
      remainingSeconds: Math.ceil(remainingMs / 1000),
      message: `Please wait ${Math.ceil(remainingMs / 1000)} seconds before submitting again.`,
    };
  }

  return {
    inCooldown: false,
    remainingSeconds: 0,
  };
};

/**
 * Full duplicate and validation check
 * @param {Object} formData - Form data
 * @returns {Promise} Complete validation result
 */
export const performFullValidation = async (formData) => {
  // Check cooldown first
  const cooldown = checkSubmissionCooldown();
  if (cooldown.inCooldown) {
    return {
      valid: false,
      error: cooldown.message,
      errorType: 'cooldown',
    };
  }

  // Validate before submit (includes duplicate check)
  const validation = await validateBeforeSubmit(formData);

  return {
    ...validation,
    errorType: validation.isDuplicate ? 'duplicate' : validation.valid ? null : 'validation',
  };
};

export default {
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
};
