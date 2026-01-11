/**
 * Validation Utilities
 * Form validation functions and Yup schema builders
 */

import * as yup from 'yup';

/**
 * Indian mobile number regex (10 digits starting with 6-9)
 */
const INDIAN_MOBILE_REGEX = /^[6-9]\d{9}$/;

/**
 * Email regex pattern
 */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Name regex (letters, spaces, and common name characters)
 */
const NAME_REGEX = /^[a-zA-Z\s'.,-]+$/;

/**
 * Validate Indian mobile number
 * @param {string} mobile - Mobile number to validate
 * @returns {boolean} True if valid
 */
export const isValidMobile = (mobile) => {
  if (!mobile) return false;
  const cleaned = mobile.replace(/\D/g, '');
  return INDIAN_MOBILE_REGEX.test(cleaned);
};

/**
 * Validate email address
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid
 */
export const isValidEmail = (email) => {
  if (!email) return false;
  return EMAIL_REGEX.test(email.trim().toLowerCase());
};

/**
 * Validate name
 * @param {string} name - Name to validate
 * @param {number} minLength - Minimum length
 * @returns {boolean} True if valid
 */
export const isValidName = (name, minLength = 2) => {
  if (!name) return false;
  const trimmed = name.trim();
  return trimmed.length >= minLength && NAME_REGEX.test(trimmed);
};

/**
 * Validate URL format
 * @param {string} url - URL to validate
 * @returns {boolean} True if valid
 */
export const isValidUrl = (url) => {
  if (!url) return false;
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Validate date is in future
 * @param {string|Date} date - Date to validate
 * @returns {boolean} True if in future
 */
export const isFutureDate = (date) => {
  if (!date) return false;
  const inputDate = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return inputDate > today;
};

/**
 * Validate date is within range
 * @param {string|Date} date - Date to validate
 * @param {number} minDays - Minimum days from now
 * @param {number} maxDays - Maximum days from now
 * @returns {boolean} True if within range
 */
export const isDateInRange = (date, minDays = 1, maxDays = 30) => {
  if (!date) return false;
  const inputDate = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const minDate = new Date(today);
  minDate.setDate(minDate.getDate() + minDays);

  const maxDate = new Date(today);
  maxDate.setDate(maxDate.getDate() + maxDays);

  return inputDate >= minDate && inputDate <= maxDate;
};

/**
 * Sanitize input (remove potential XSS)
 * @param {string} input - Input to sanitize
 * @returns {string} Sanitized input
 */
export const sanitizeInput = (input) => {
  if (!input) return '';
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

/**
 * Clean mobile number (remove non-digits and country code)
 * @param {string} mobile - Mobile number to clean
 * @returns {string} Cleaned mobile number
 */
export const cleanMobileNumber = (mobile) => {
  if (!mobile) return '';
  let cleaned = mobile.replace(/\D/g, '');
  // Remove leading 91 (India country code) if present
  if (cleaned.length === 12 && cleaned.startsWith('91')) {
    cleaned = cleaned.substring(2);
  }
  return cleaned;
};

/**
 * Validate message length
 * @param {string} message - Message to validate
 * @param {number} maxLength - Maximum length
 * @returns {boolean} True if valid
 */
export const isValidMessage = (message, maxLength = 500) => {
  if (!message) return true; // Optional field
  return message.trim().length <= maxLength;
};

/**
 * Lead form validation schema (Yup)
 */
export const leadFormSchema = yup.object().shape({
  name: yup
    .string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters')
    .matches(NAME_REGEX, 'Please enter a valid name'),

  mobile: yup
    .string()
    .required('Mobile number is required')
    .test('valid-mobile', 'Please enter a valid 10-digit mobile number', (value) => {
      if (!value) return false;
      const cleaned = value.replace(/\D/g, '');
      return INDIAN_MOBILE_REGEX.test(cleaned);
    }),

  email: yup
    .string()
    .required('Email is required')
    .email('Please enter a valid email address'),

  message: yup
    .string()
    .max(500, 'Message must be less than 500 characters')
    .nullable(),

  wantsSiteVisit: yup.boolean().default(false),

  siteVisitDate: yup
    .string()
    .nullable()
    .when('wantsSiteVisit', {
      is: true,
      then: (schema) =>
        schema
          .required('Please select a site visit date')
          .test('future-date', 'Date must be in the future', (value) => {
            if (!value) return false;
            return isFutureDate(value);
          })
          .test('within-range', 'Date must be within 30 days', (value) => {
            if (!value) return false;
            return isDateInRange(value, 1, 30);
          }),
    }),

  siteVisitTime: yup
    .string()
    .nullable()
    .when('wantsSiteVisit', {
      is: true,
      then: (schema) => schema.required('Please select a time slot'),
    }),

  wantsPickupDrop: yup.boolean().default(false),

  pickupLocation: yup
    .string()
    .nullable()
    .when('wantsPickupDrop', {
      is: true,
      then: (schema) =>
        schema
          .required('Please enter pickup location')
          .min(5, 'Please enter a valid address'),
    }),

  dropLocation: yup.string().nullable(),

  wantsMeal: yup.boolean().default(false),

  mealPreference: yup
    .string()
    .nullable()
    .when('wantsMeal', {
      is: true,
      then: (schema) =>
        schema
          .required('Please select meal preference')
          .oneOf(['breakfast', 'lunch', 'coffee'], 'Invalid meal preference'),
    }),
});

/**
 * Admin login validation schema
 */
export const loginFormSchema = yup.object().shape({
  email: yup
    .string()
    .required('Email is required')
    .email('Please enter a valid email address'),

  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),

  rememberMe: yup.boolean().default(false),
});

/**
 * SEO settings validation schema
 */
export const seoSettingsSchema = yup.object().shape({
  title: yup
    .string()
    .required('Title is required')
    .max(60, 'Title should be under 60 characters'),

  description: yup
    .string()
    .required('Description is required')
    .max(160, 'Description should be under 160 characters'),

  keywords: yup.string().nullable(),

  canonicalUrl: yup
    .string()
    .nullable()
    .url('Please enter a valid URL'),

  ogTitle: yup.string().max(60, 'OG Title should be under 60 characters'),
  ogDescription: yup.string().max(200, 'OG Description should be under 200 characters'),
  ogImage: yup.string().url('Please enter a valid image URL').nullable(),

  twitterTitle: yup.string().max(60, 'Twitter Title should be under 60 characters'),
  twitterDescription: yup.string().max(200, 'Twitter Description should be under 200 characters'),
  twitterImage: yup.string().url('Please enter a valid image URL').nullable(),
});

/**
 * Keyword validation schema
 */
export const keywordSchema = yup.object().shape({
  keyword: yup
    .string()
    .required('Keyword is required')
    .min(2, 'Keyword must be at least 2 characters')
    .max(100, 'Keyword must be less than 100 characters'),

  type: yup
    .string()
    .required('Type is required')
    .oneOf(['primary', 'secondary', 'long-tail', 'branded'], 'Invalid type'),

  searchVolume: yup
    .number()
    .nullable()
    .min(0, 'Search volume cannot be negative'),

  difficulty: yup
    .string()
    .required('Difficulty is required')
    .oneOf(['low', 'medium', 'high'], 'Invalid difficulty'),

  position: yup
    .number()
    .nullable()
    .min(1, 'Position must be at least 1'),

  isActive: yup.boolean().default(true),
});

/**
 * Validate form data against schema
 * @param {Object} schema - Yup schema
 * @param {Object} data - Data to validate
 * @returns {Promise} Validation result
 */
export const validateForm = async (schema, data) => {
  try {
    const validData = await schema.validate(data, { abortEarly: false });
    return {
      isValid: true,
      data: validData,
      errors: {},
    };
  } catch (error) {
    const errors = {};
    if (error.inner) {
      error.inner.forEach((err) => {
        if (!errors[err.path]) {
          errors[err.path] = err.message;
        }
      });
    }
    return {
      isValid: false,
      data: null,
      errors,
    };
  }
};

/**
 * Get validation error for specific field
 * @param {Object} errors - Error object
 * @param {string} field - Field name
 * @returns {string|null} Error message or null
 */
export const getFieldError = (errors, field) => {
  return errors?.[field] || null;
};

/**
 * Check if field has error
 * @param {Object} errors - Error object
 * @param {string} field - Field name
 * @returns {boolean} True if has error
 */
export const hasFieldError = (errors, field) => {
  return !!errors?.[field];
};

export default {
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
};
