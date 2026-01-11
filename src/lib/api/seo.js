/**
 * SEO API Service
 * Handles SEO settings management API operations
 */

import axiosInstance, { apiRequest } from './axiosInstance';
import { SEO_ENDPOINTS } from './endpoints';

/**
 * Get current SEO settings
 * @returns {Promise} API response with SEO settings
 */
export const getSeoSettings = async () => {
  return apiRequest(() => axiosInstance.get(SEO_ENDPOINTS.BASE));
};

/**
 * Update SEO settings
 * @param {Object} settings - SEO settings to update
 * @returns {Promise} API response
 */
export const updateSeoSettings = async (settings) => {
  const payload = {
    ...settings,
    updatedAt: new Date().toISOString(),
  };

  return apiRequest(() => axiosInstance.patch(SEO_ENDPOINTS.UPDATE, payload));
};

/**
 * Update meta tags
 * @param {Object} metaTags - Meta tag settings
 * @param {string} metaTags.title - Page title
 * @param {string} metaTags.description - Meta description
 * @param {string} metaTags.keywords - Meta keywords
 * @param {string} metaTags.canonicalUrl - Canonical URL
 * @param {string} metaTags.robots - Robots directive
 * @param {string} metaTags.author - Author name
 * @param {string} metaTags.language - Content language
 * @returns {Promise} API response
 */
export const updateMetaTags = async (metaTags) => {
  return updateSeoSettings({
    title: metaTags.title,
    description: metaTags.description,
    keywords: metaTags.keywords,
    canonicalUrl: metaTags.canonicalUrl,
    robots: metaTags.robots,
    author: metaTags.author,
    language: metaTags.language,
  });
};

/**
 * Update Open Graph settings
 * @param {Object} ogSettings - Open Graph settings
 * @param {string} ogSettings.ogTitle - OG title
 * @param {string} ogSettings.ogDescription - OG description
 * @param {string} ogSettings.ogImage - OG image URL
 * @param {string} ogSettings.ogType - OG type
 * @param {string} ogSettings.ogLocale - OG locale
 * @returns {Promise} API response
 */
export const updateOpenGraphSettings = async (ogSettings) => {
  return updateSeoSettings({
    ogTitle: ogSettings.ogTitle,
    ogDescription: ogSettings.ogDescription,
    ogImage: ogSettings.ogImage,
    ogType: ogSettings.ogType,
    ogLocale: ogSettings.ogLocale,
  });
};

/**
 * Update Twitter Card settings
 * @param {Object} twitterSettings - Twitter Card settings
 * @param {string} twitterSettings.twitterCard - Card type
 * @param {string} twitterSettings.twitterTitle - Twitter title
 * @param {string} twitterSettings.twitterDescription - Twitter description
 * @param {string} twitterSettings.twitterImage - Twitter image URL
 * @param {string} twitterSettings.twitterSite - Twitter site handle
 * @returns {Promise} API response
 */
export const updateTwitterCardSettings = async (twitterSettings) => {
  return updateSeoSettings({
    twitterCard: twitterSettings.twitterCard,
    twitterTitle: twitterSettings.twitterTitle,
    twitterDescription: twitterSettings.twitterDescription,
    twitterImage: twitterSettings.twitterImage,
    twitterSite: twitterSettings.twitterSite,
  });
};

/**
 * Update Geo tags
 * @param {Object} geoSettings - Geo tag settings
 * @param {string} geoSettings.geoRegion - Region code
 * @param {string} geoSettings.geoPlacename - Place name
 * @param {string} geoSettings.geoPosition - Position coordinates
 * @returns {Promise} API response
 */
export const updateGeoSettings = async (geoSettings) => {
  return updateSeoSettings({
    geoRegion: geoSettings.geoRegion,
    geoPlacename: geoSettings.geoPlacename,
    geoPosition: geoSettings.geoPosition,
  });
};

/**
 * Reset SEO settings to defaults
 * @param {Object} defaultSettings - Default settings to apply
 * @returns {Promise} API response
 */
export const resetSeoSettings = async (defaultSettings) => {
  return updateSeoSettings(defaultSettings);
};

/**
 * Validate SEO settings
 * @param {Object} settings - Settings to validate
 * @returns {Object} Validation result with warnings/errors
 */
export const validateSeoSettings = (settings) => {
  const warnings = [];
  const errors = [];

  // Title validation
  if (!settings.title) {
    errors.push({ field: 'title', message: 'Title is required' });
  } else if (settings.title.length > 60) {
    warnings.push({
      field: 'title',
      message: `Title is ${settings.title.length} characters. Recommended: under 60 characters`,
    });
  }

  // Description validation
  if (!settings.description) {
    errors.push({ field: 'description', message: 'Meta description is required' });
  } else if (settings.description.length > 160) {
    warnings.push({
      field: 'description',
      message: `Description is ${settings.description.length} characters. Recommended: under 160 characters`,
    });
  }

  // Canonical URL validation
  if (settings.canonicalUrl && !isValidUrl(settings.canonicalUrl)) {
    errors.push({ field: 'canonicalUrl', message: 'Invalid canonical URL format' });
  }

  // OG Image validation
  if (settings.ogImage && !isValidUrl(settings.ogImage)) {
    errors.push({ field: 'ogImage', message: 'Invalid Open Graph image URL format' });
  }

  // Twitter Image validation
  if (settings.twitterImage && !isValidUrl(settings.twitterImage)) {
    errors.push({ field: 'twitterImage', message: 'Invalid Twitter image URL format' });
  }

  // Calculate SEO score
  const score = calculateSeoScore(settings, errors, warnings);

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    score,
  };
};

/**
 * Calculate SEO score based on settings completeness
 * @param {Object} settings - SEO settings
 * @param {Array} errors - Validation errors
 * @param {Array} warnings - Validation warnings
 * @returns {number} SEO score (0-100)
 */
const calculateSeoScore = (settings, errors, warnings) => {
  let score = 100;

  // Deduct for errors
  score -= errors.length * 15;

  // Deduct for warnings
  score -= warnings.length * 5;

  // Check for completeness
  const fields = [
    'title',
    'description',
    'keywords',
    'canonicalUrl',
    'ogTitle',
    'ogDescription',
    'ogImage',
    'twitterTitle',
    'twitterDescription',
    'twitterImage',
  ];

  const missingFields = fields.filter((field) => !settings[field]);
  score -= missingFields.length * 3;

  return Math.max(0, Math.min(100, score));
};

/**
 * Validate URL format
 * @param {string} url - URL to validate
 * @returns {boolean} True if valid
 */
const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Generate SEO preview data
 * @param {Object} settings - SEO settings
 * @returns {Object} Preview data for Google and social media
 */
export const generateSeoPreview = (settings) => {
  return {
    google: {
      title: truncateText(settings.title, 60),
      url: settings.canonicalUrl,
      description: truncateText(settings.description, 160),
    },
    facebook: {
      title: settings.ogTitle || settings.title,
      description: settings.ogDescription || settings.description,
      image: settings.ogImage,
      type: settings.ogType,
    },
    twitter: {
      card: settings.twitterCard,
      title: settings.twitterTitle || settings.title,
      description: settings.twitterDescription || settings.description,
      image: settings.twitterImage || settings.ogImage,
      site: settings.twitterSite,
    },
  };
};

/**
 * Truncate text to specified length
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text
 */
const truncateText = (text, maxLength) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + '...';
};

/**
 * Generate meta tags HTML
 * @param {Object} settings - SEO settings
 * @returns {string} HTML string of meta tags
 */
export const generateMetaTagsHtml = (settings) => {
  const tags = [];

  // Basic meta tags
  if (settings.title) {
    tags.push(`<title>${escapeHtml(settings.title)}</title>`);
  }
  if (settings.description) {
    tags.push(`<meta name="description" content="${escapeHtml(settings.description)}" />`);
  }
  if (settings.keywords) {
    tags.push(`<meta name="keywords" content="${escapeHtml(settings.keywords)}" />`);
  }
  if (settings.author) {
    tags.push(`<meta name="author" content="${escapeHtml(settings.author)}" />`);
  }
  if (settings.robots) {
    tags.push(`<meta name="robots" content="${escapeHtml(settings.robots)}" />`);
  }
  if (settings.canonicalUrl) {
    tags.push(`<link rel="canonical" href="${escapeHtml(settings.canonicalUrl)}" />`);
  }

  // Open Graph tags
  if (settings.ogTitle) {
    tags.push(`<meta property="og:title" content="${escapeHtml(settings.ogTitle)}" />`);
  }
  if (settings.ogDescription) {
    tags.push(`<meta property="og:description" content="${escapeHtml(settings.ogDescription)}" />`);
  }
  if (settings.ogImage) {
    tags.push(`<meta property="og:image" content="${escapeHtml(settings.ogImage)}" />`);
  }
  if (settings.ogType) {
    tags.push(`<meta property="og:type" content="${escapeHtml(settings.ogType)}" />`);
  }
  if (settings.ogLocale) {
    tags.push(`<meta property="og:locale" content="${escapeHtml(settings.ogLocale)}" />`);
  }

  // Twitter Card tags
  if (settings.twitterCard) {
    tags.push(`<meta name="twitter:card" content="${escapeHtml(settings.twitterCard)}" />`);
  }
  if (settings.twitterTitle) {
    tags.push(`<meta name="twitter:title" content="${escapeHtml(settings.twitterTitle)}" />`);
  }
  if (settings.twitterDescription) {
    tags.push(`<meta name="twitter:description" content="${escapeHtml(settings.twitterDescription)}" />`);
  }
  if (settings.twitterImage) {
    tags.push(`<meta name="twitter:image" content="${escapeHtml(settings.twitterImage)}" />`);
  }
  if (settings.twitterSite) {
    tags.push(`<meta name="twitter:site" content="${escapeHtml(settings.twitterSite)}" />`);
  }

  // Geo tags
  if (settings.geoRegion) {
    tags.push(`<meta name="geo.region" content="${escapeHtml(settings.geoRegion)}" />`);
  }
  if (settings.geoPlacename) {
    tags.push(`<meta name="geo.placename" content="${escapeHtml(settings.geoPlacename)}" />`);
  }
  if (settings.geoPosition) {
    tags.push(`<meta name="geo.position" content="${escapeHtml(settings.geoPosition)}" />`);
  }

  return tags.join('\n');
};

/**
 * Escape HTML special characters
 * @param {string} text - Text to escape
 * @returns {string} Escaped text
 */
const escapeHtml = (text) => {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

export default {
  getSeoSettings,
  updateSeoSettings,
  updateMetaTags,
  updateOpenGraphSettings,
  updateTwitterCardSettings,
  updateGeoSettings,
  resetSeoSettings,
  validateSeoSettings,
  generateSeoPreview,
  generateMetaTagsHtml,
};
