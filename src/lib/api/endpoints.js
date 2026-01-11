/**
 * API Endpoints Configuration
 * Centralized endpoint definitions for all API calls
 */

// Base API URL from environment
const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

/**
 * Authentication endpoints
 */
export const AUTH_ENDPOINTS = {
  LOGIN: '/login',
  LOGOUT: '/logout',
  CURRENT_USER: '/users/1',
  REFRESH_TOKEN: '/refresh-token',
};

/**
 * Lead management endpoints
 */
export const LEAD_ENDPOINTS = {
  BASE: '/leads',
  BY_ID: (id) => `/leads/${id}`,
  NOTES: (id) => `/leads/${id}/notes`,
  STATUS: (id) => `/leads/${id}/status`,
  ASSIGN: (id) => `/leads/${id}/assign`,
  EXPORT: '/leads/export',
  BULK_UPDATE: '/leads/bulk-update',
  BULK_DELETE: '/leads/bulk-delete',
};

/**
 * Duplicate check / Submitted contacts endpoints
 */
export const CONTACT_ENDPOINTS = {
  BASE: '/submittedContacts',
  CHECK_MOBILE: (mobile) => `/submittedContacts?mobile=${mobile}`,
  CHECK_EMAIL: (email) => `/submittedContacts?email=${encodeURIComponent(email)}`,
};

/**
 * SEO settings endpoints
 */
export const SEO_ENDPOINTS = {
  BASE: '/seoSettings',
  UPDATE: '/seoSettings',
  PREVIEW: '/seoSettings/preview',
};

/**
 * Pixel & tracking settings endpoints
 */
export const PIXEL_ENDPOINTS = {
  BASE: '/pixelSettings',
  UPDATE: '/pixelSettings',
  TEST: '/pixelSettings/test',
};

/**
 * Schema markup endpoints
 */
export const SCHEMA_ENDPOINTS = {
  BASE: '/schemaSettings',
  UPDATE: '/schemaSettings',
  VALIDATE: '/schemaSettings/validate',
};

/**
 * Keywords management endpoints
 */
export const KEYWORD_ENDPOINTS = {
  BASE: '/keywords',
  BY_ID: (id) => `/keywords/${id}`,
  BULK_IMPORT: '/keywords/import',
  EXPORT: '/keywords/export',
};

/**
 * Audit log endpoints
 */
export const AUDIT_ENDPOINTS = {
  BASE: '/auditLogs',
  BY_USER: (userId) => `/auditLogs?userId=${userId}`,
  BY_MODULE: (module) => `/auditLogs?module=${module}`,
  BY_ACTION: (action) => `/auditLogs?action=${action}`,
  EXPORT: '/auditLogs/export',
};

/**
 * Dashboard endpoints
 */
export const DASHBOARD_ENDPOINTS = {
  STATS: '/dashboardStats',
  LEADS_BY_DAY: '/dashboardStats/leadsByDay',
  LEADS_BY_SOURCE: '/dashboardStats/leadsBySource',
  CONVERSION_RATE: '/dashboardStats/conversionRate',
  RECENT_LEADS: '/leads?_sort=createdAt&_order=desc&_limit=10',
};

/**
 * Settings endpoints
 */
export const SETTINGS_ENDPOINTS = {
  BASE: '/settings',
  UPDATE: '/settings',
  BACKUP: '/settings/backup',
  RESTORE: '/settings/restore',
};

/**
 * Combined endpoints object for backward compatibility
 */
export const ENDPOINTS = {
  // Auth
  ...AUTH_ENDPOINTS,

  // Leads
  LEADS: LEAD_ENDPOINTS.BASE,
  LEAD_BY_ID: LEAD_ENDPOINTS.BY_ID,

  // Contacts
  SUBMITTED_CONTACTS: CONTACT_ENDPOINTS.BASE,

  // SEO
  SEO_SETTINGS: SEO_ENDPOINTS.BASE,

  // Pixels
  PIXEL_SETTINGS: PIXEL_ENDPOINTS.BASE,

  // Schema
  SCHEMA_SETTINGS: SCHEMA_ENDPOINTS.BASE,

  // Keywords
  KEYWORDS: KEYWORD_ENDPOINTS.BASE,
  KEYWORD_BY_ID: KEYWORD_ENDPOINTS.BY_ID,

  // Audit
  AUDIT_LOGS: AUDIT_ENDPOINTS.BASE,

  // Dashboard
  DASHBOARD_STATS: DASHBOARD_ENDPOINTS.STATS,

  // Settings
  SETTINGS: SETTINGS_ENDPOINTS.BASE,
};

/**
 * Build full URL from endpoint
 * @param {string} endpoint - API endpoint path
 * @returns {string} Full URL
 */
export const buildUrl = (endpoint) => {
  return `${API_BASE}${endpoint}`;
};

/**
 * Build URL with query parameters
 * @param {string} endpoint - API endpoint path
 * @param {Object} params - Query parameters
 * @returns {string} Full URL with query string
 */
export const buildUrlWithParams = (endpoint, params = {}) => {
  const url = new URL(`${API_BASE}${endpoint}`);

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.append(key, String(value));
    }
  });

  return url.toString();
};

/**
 * JSON Server specific query builders
 */
export const queryBuilders = {
  /**
   * Build pagination params for JSON Server
   * @param {number} page - Page number (1-indexed)
   * @param {number} limit - Items per page
   * @returns {Object} Query params
   */
  paginate: (page = 1, limit = 10) => ({
    _page: page,
    _limit: limit,
  }),

  /**
   * Build sort params for JSON Server
   * @param {string} field - Sort field
   * @param {string} order - Sort order (asc/desc)
   * @returns {Object} Query params
   */
  sort: (field, order = 'asc') => ({
    _sort: field,
    _order: order,
  }),

  /**
   * Build filter params for JSON Server
   * @param {Object} filters - Filter object
   * @returns {Object} Query params
   */
  filter: (filters) => {
    const params = {};
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params[key] = value;
      }
    });
    return params;
  },

  /**
   * Build search params for JSON Server (full-text search)
   * @param {string} query - Search query
   * @returns {Object} Query params
   */
  search: (query) => ({
    q: query,
  }),

  /**
   * Build date range params
   * @param {string} field - Date field name
   * @param {string} start - Start date
   * @param {string} end - End date
   * @returns {Object} Query params
   */
  dateRange: (field, start, end) => ({
    [`${field}_gte`]: start,
    [`${field}_lte`]: end,
  }),
};

export default ENDPOINTS;
