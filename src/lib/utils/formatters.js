/**
 * Formatter Utilities
 * Functions for formatting data for display
 */

/**
 * Format price in Indian currency (INR)
 * @param {number} amount - Amount to format
 * @param {Object} options - Formatting options
 * @returns {string} Formatted price
 */
export const formatPrice = (amount, options = {}) => {
  const {
    showCurrency = true,
    showDecimals = false,
    compact = false,
  } = options;

  if (amount === null || amount === undefined) return '-';

  const formatter = new Intl.NumberFormat('en-IN', {
    style: showCurrency ? 'currency' : 'decimal',
    currency: 'INR',
    minimumFractionDigits: showDecimals ? 2 : 0,
    maximumFractionDigits: showDecimals ? 2 : 0,
    notation: compact ? 'compact' : 'standard',
  });

  return formatter.format(amount);
};

/**
 * Format price in Crores/Lakhs
 * @param {number} amount - Amount in rupees
 * @returns {string} Formatted price (e.g., "1.24 Cr")
 */
export const formatPriceInCrores = (amount) => {
  if (amount === null || amount === undefined) return '-';

  if (amount >= 10000000) {
    // Crores
    const crores = amount / 10000000;
    return `₹${crores.toFixed(2)} Cr`;
  } else if (amount >= 100000) {
    // Lakhs
    const lakhs = amount / 100000;
    return `₹${lakhs.toFixed(2)} L`;
  } else {
    return formatPrice(amount);
  }
};

/**
 * Format area in square feet
 * @param {number} area - Area in sq.ft
 * @param {string} unit - Unit label
 * @returns {string} Formatted area
 */
export const formatArea = (area, unit = 'sq.ft') => {
  if (area === null || area === undefined) return '-';

  const formatted = new Intl.NumberFormat('en-IN').format(area);
  return `${formatted} ${unit}`;
};

/**
 * Format phone number for display
 * @param {string} phone - Phone number
 * @param {boolean} includeCountryCode - Include +91
 * @returns {string} Formatted phone number
 */
export const formatPhoneNumber = (phone, includeCountryCode = false) => {
  if (!phone) return '-';

  // Remove all non-digits
  const cleaned = phone.replace(/\D/g, '');

  // Handle 12-digit with country code
  let number = cleaned;
  if (cleaned.length === 12 && cleaned.startsWith('91')) {
    number = cleaned.substring(2);
  }

  // Format as XXX-XXX-XXXX
  if (number.length === 10) {
    const formatted = `${number.substring(0, 3)}-${number.substring(3, 6)}-${number.substring(6)}`;
    return includeCountryCode ? `+91 ${formatted}` : formatted;
  }

  return phone;
};

/**
 * Format date for display
 * @param {string|Date} date - Date to format
 * @param {Object} options - Formatting options
 * @returns {string} Formatted date
 */
export const formatDate = (date, options = {}) => {
  if (!date) return '-';

  const {
    format = 'medium', // short, medium, long, full
    includeTime = false,
  } = options;

  const dateObj = new Date(date);

  if (isNaN(dateObj.getTime())) return '-';

  const dateOptions = {
    short: { day: 'numeric', month: 'short' },
    medium: { day: 'numeric', month: 'short', year: 'numeric' },
    long: { day: 'numeric', month: 'long', year: 'numeric' },
    full: { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' },
  };

  const timeOptions = includeTime
    ? { hour: '2-digit', minute: '2-digit' }
    : {};

  return dateObj.toLocaleDateString('en-IN', {
    ...dateOptions[format],
    ...timeOptions,
  });
};

/**
 * Format date as relative time (e.g., "2 hours ago")
 * @param {string|Date} date - Date to format
 * @returns {string} Relative time string
 */
export const formatRelativeTime = (date) => {
  if (!date) return '-';

  const dateObj = new Date(date);
  if (isNaN(dateObj.getTime())) return '-';

  const now = new Date();
  const diffMs = now - dateObj;
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = Math.floor(diffDays / 30);

  if (diffSecs < 60) return 'Just now';
  if (diffMins < 60) return `${diffMins} minute${diffMins === 1 ? '' : 's'} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours === 1 ? '' : 's'} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays === 1 ? '' : 's'} ago`;
  if (diffWeeks < 4) return `${diffWeeks} week${diffWeeks === 1 ? '' : 's'} ago`;
  if (diffMonths < 12) return `${diffMonths} month${diffMonths === 1 ? '' : 's'} ago`;

  return formatDate(date);
};

/**
 * Format time in 12-hour format
 * @param {string} time - Time string (HH:MM or full date)
 * @returns {string} Formatted time (e.g., "10:30 AM")
 */
export const formatTime = (time) => {
  if (!time) return '-';

  // If already in "HH:MM AM/PM" format, return as is
  if (/^\d{1,2}:\d{2}\s*(AM|PM)$/i.test(time)) {
    return time;
  }

  // Parse time
  const date = new Date(`2000-01-01 ${time}`);
  if (isNaN(date.getTime())) {
    // Try parsing as ISO date
    const isoDate = new Date(time);
    if (!isNaN(isoDate.getTime())) {
      return isoDate.toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });
    }
    return time;
  }

  return date.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
};

/**
 * Format name (capitalize first letter of each word)
 * @param {string} name - Name to format
 * @returns {string} Formatted name
 */
export const formatName = (name) => {
  if (!name) return '-';

  return name
    .trim()
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

/**
 * Format email (lowercase)
 * @param {string} email - Email to format
 * @returns {string} Formatted email
 */
export const formatEmail = (email) => {
  if (!email) return '-';
  return email.trim().toLowerCase();
};

/**
 * Truncate text with ellipsis
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text
 */
export const truncateText = (text, maxLength = 50) => {
  if (!text) return '-';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + '...';
};

/**
 * Format number with Indian number system
 * @param {number} number - Number to format
 * @returns {string} Formatted number
 */
export const formatNumber = (number) => {
  if (number === null || number === undefined) return '-';
  return new Intl.NumberFormat('en-IN').format(number);
};

/**
 * Format percentage
 * @param {number} value - Value (0-100 or 0-1)
 * @param {number} decimals - Decimal places
 * @returns {string} Formatted percentage
 */
export const formatPercentage = (value, decimals = 1) => {
  if (value === null || value === undefined) return '-';

  // Convert to percentage if value is between 0 and 1
  const percentage = value <= 1 ? value * 100 : value;

  return `${percentage.toFixed(decimals)}%`;
};

/**
 * Format lead status for display
 * @param {string} status - Lead status
 * @returns {Object} Formatted status with label and color
 */
export const formatLeadStatus = (status) => {
  const statusMap = {
    new: { label: 'New', color: 'info' },
    contacted: { label: 'Contacted', color: 'warning' },
    site_visit_scheduled: { label: 'Site Visit Scheduled', color: 'secondary' },
    visited: { label: 'Visited', color: 'primary' },
    negotiation: { label: 'Negotiation', color: 'warning' },
    converted: { label: 'Converted', color: 'success' },
    lost: { label: 'Lost', color: 'error' },
  };

  return statusMap[status] || { label: status, color: 'default' };
};

/**
 * Format lead source for display
 * @param {string} source - Lead source
 * @returns {string} Formatted source label
 */
export const formatLeadSource = (source) => {
  const sourceMap = {
    hero_form: 'Hero Form',
    popup_form: 'Popup Form',
    cta_form: 'CTA Form',
  };

  return sourceMap[source] || source;
};

/**
 * Format file size
 * @param {number} bytes - File size in bytes
 * @returns {string} Formatted file size
 */
export const formatFileSize = (bytes) => {
  if (!bytes) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * Format address
 * @param {Object} address - Address object
 * @returns {string} Formatted address
 */
export const formatAddress = (address) => {
  if (!address) return '-';

  if (typeof address === 'string') return address;

  const parts = [
    address.street,
    address.locality,
    address.city,
    address.state,
    address.pincode,
    address.country,
  ].filter(Boolean);

  return parts.join(', ') || '-';
};

/**
 * Format location from lead data
 * @param {Object} location - Location object
 * @returns {string} Formatted location
 */
export const formatLocation = (location) => {
  if (!location) return '-';

  const parts = [location.city, location.state, location.country].filter(Boolean);

  return parts.join(', ') || '-';
};

export default {
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
};
