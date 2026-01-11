/**
 * Audit Log API Service
 * Handles audit log tracking and retrieval
 */

import axiosInstance, { apiRequest } from './axiosInstance';
import { AUDIT_ENDPOINTS, queryBuilders } from './endpoints';

/**
 * Audit action types
 */
export const AUDIT_ACTIONS = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  CREATE: 'CREATE',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE',
  VIEW: 'VIEW',
  EXPORT: 'EXPORT',
  IMPORT: 'IMPORT',
};

/**
 * Audit module types
 */
export const AUDIT_MODULES = {
  AUTH: 'auth',
  LEADS: 'leads',
  SEO: 'seo',
  PIXELS: 'pixels',
  SCHEMA: 'schema',
  KEYWORDS: 'keywords',
  SETTINGS: 'settings',
};

/**
 * Get audit logs with optional filtering and pagination
 * @param {Object} options - Query options
 * @param {number} options.page - Page number
 * @param {number} options.limit - Items per page
 * @param {string} options.sortBy - Sort field
 * @param {string} options.sortOrder - Sort order
 * @param {Object} options.filters - Filter criteria
 * @returns {Promise} API response
 */
export const getAuditLogs = async ({
  page = 1,
  limit = 25,
  sortBy = 'createdAt',
  sortOrder = 'desc',
  filters = {},
} = {}) => {
  const params = {
    ...queryBuilders.paginate(page, limit),
    ...queryBuilders.sort(sortBy, sortOrder),
    ...queryBuilders.filter(filters),
  };

  return apiRequest(() => axiosInstance.get(AUDIT_ENDPOINTS.BASE, { params }));
};

/**
 * Create an audit log entry
 * @param {Object} logData - Log entry data
 * @param {number} logData.userId - User ID
 * @param {string} logData.userName - User name
 * @param {string} logData.action - Action type (LOGIN, CREATE, UPDATE, DELETE)
 * @param {string} logData.module - Module name (leads, seo, pixels, etc.)
 * @param {string} logData.description - Action description
 * @param {Object} logData.metadata - Additional metadata
 * @returns {Promise} API response
 */
export const createAuditLog = async (logData) => {
  const payload = {
    userId: logData.userId,
    userName: logData.userName,
    action: logData.action,
    module: logData.module,
    description: logData.description,
    ipAddress: logData.ipAddress || 'Unknown',
    userAgent: logData.userAgent || (typeof navigator !== 'undefined' ? navigator.userAgent : 'Unknown'),
    metadata: logData.metadata || {},
    createdAt: new Date().toISOString(),
  };

  return apiRequest(() => axiosInstance.post(AUDIT_ENDPOINTS.BASE, payload));
};

/**
 * Log a user action (convenience method)
 * @param {string} action - Action type
 * @param {string} module - Module name
 * @param {string} description - Action description
 * @param {Object} metadata - Additional data
 * @param {Object} user - User object (optional)
 * @returns {Promise} API response
 */
export const logAction = async (action, module, description, metadata = {}, user = null) => {
  // Try to get user from storage if not provided
  let userData = user;
  if (!userData && typeof window !== 'undefined') {
    try {
      const storedUser = document.cookie
        .split('; ')
        .find((row) => row.startsWith('admin_user='))
        ?.split('=')[1];
      if (storedUser) {
        userData = JSON.parse(decodeURIComponent(storedUser));
      }
    } catch {
      userData = { id: 0, name: 'Unknown' };
    }
  }

  return createAuditLog({
    userId: userData?.id || 0,
    userName: userData?.name || 'Unknown',
    action,
    module,
    description,
    metadata,
  });
};

/**
 * Log login action
 * @param {Object} user - User object
 * @returns {Promise} API response
 */
export const logLogin = async (user) => {
  return logAction(
    AUDIT_ACTIONS.LOGIN,
    AUDIT_MODULES.AUTH,
    'User logged in successfully',
    { email: user.email },
    user
  );
};

/**
 * Log logout action
 * @param {Object} user - User object
 * @returns {Promise} API response
 */
export const logLogout = async (user) => {
  return logAction(
    AUDIT_ACTIONS.LOGOUT,
    AUDIT_MODULES.AUTH,
    'User logged out',
    { email: user?.email },
    user
  );
};

/**
 * Log lead action
 * @param {string} action - Action type
 * @param {Object} leadData - Lead data
 * @param {Object} changes - Changes made (for updates)
 * @returns {Promise} API response
 */
export const logLeadAction = async (action, leadData, changes = {}) => {
  const descriptions = {
    [AUDIT_ACTIONS.CREATE]: `Created new lead: ${leadData.name}`,
    [AUDIT_ACTIONS.UPDATE]: `Updated lead: ${leadData.name}`,
    [AUDIT_ACTIONS.DELETE]: `Deleted lead: ${leadData.name}`,
    [AUDIT_ACTIONS.VIEW]: `Viewed lead: ${leadData.name}`,
  };

  return logAction(action, AUDIT_MODULES.LEADS, descriptions[action], {
    leadId: leadData.id,
    leadName: leadData.name,
    changes,
  });
};

/**
 * Log SEO settings action
 * @param {string} field - Field updated
 * @param {string} oldValue - Previous value
 * @param {string} newValue - New value
 * @returns {Promise} API response
 */
export const logSeoAction = async (field, oldValue, newValue) => {
  return logAction(AUDIT_ACTIONS.UPDATE, AUDIT_MODULES.SEO, `Updated SEO ${field}`, {
    field,
    oldValue: truncateValue(oldValue),
    newValue: truncateValue(newValue),
  });
};

/**
 * Log pixel settings action
 * @param {string} platform - Platform name
 * @param {string} changeType - Type of change
 * @returns {Promise} API response
 */
export const logPixelAction = async (platform, changeType) => {
  return logAction(
    AUDIT_ACTIONS.UPDATE,
    AUDIT_MODULES.PIXELS,
    `${changeType} ${platform} tracking`,
    { platform, changeType }
  );
};

/**
 * Log schema action
 * @param {string} schemaType - Schema type
 * @param {string} action - Action performed
 * @returns {Promise} API response
 */
export const logSchemaAction = async (schemaType, action) => {
  return logAction(action, AUDIT_MODULES.SCHEMA, `${action} ${schemaType} schema`, {
    schemaType,
  });
};

/**
 * Log keyword action
 * @param {string} action - Action type
 * @param {Object} keywordData - Keyword data
 * @returns {Promise} API response
 */
export const logKeywordAction = async (action, keywordData) => {
  const descriptions = {
    [AUDIT_ACTIONS.CREATE]: `Added keyword: ${keywordData.keyword}`,
    [AUDIT_ACTIONS.UPDATE]: `Updated keyword: ${keywordData.keyword}`,
    [AUDIT_ACTIONS.DELETE]: `Deleted keyword: ${keywordData.keyword}`,
    [AUDIT_ACTIONS.IMPORT]: `Imported ${keywordData.count || 0} keywords`,
  };

  return logAction(action, AUDIT_MODULES.KEYWORDS, descriptions[action], {
    keywordId: keywordData.id,
    keyword: keywordData.keyword,
  });
};

/**
 * Log settings action
 * @param {string} section - Settings section
 * @param {Object} changes - Changes made
 * @returns {Promise} API response
 */
export const logSettingsAction = async (section, changes) => {
  return logAction(
    AUDIT_ACTIONS.UPDATE,
    AUDIT_MODULES.SETTINGS,
    `Updated ${section} settings`,
    { section, changes }
  );
};

/**
 * Get audit logs by user
 * @param {number} userId - User ID
 * @param {Object} options - Query options
 * @returns {Promise} API response
 */
export const getAuditLogsByUser = async (userId, options = {}) => {
  return getAuditLogs({
    ...options,
    filters: { ...options.filters, userId },
  });
};

/**
 * Get audit logs by module
 * @param {string} module - Module name
 * @param {Object} options - Query options
 * @returns {Promise} API response
 */
export const getAuditLogsByModule = async (module, options = {}) => {
  return getAuditLogs({
    ...options,
    filters: { ...options.filters, module },
  });
};

/**
 * Get audit logs by action
 * @param {string} action - Action type
 * @param {Object} options - Query options
 * @returns {Promise} API response
 */
export const getAuditLogsByAction = async (action, options = {}) => {
  return getAuditLogs({
    ...options,
    filters: { ...options.filters, action },
  });
};

/**
 * Get audit logs within date range
 * @param {string} startDate - Start date (ISO string)
 * @param {string} endDate - End date (ISO string)
 * @param {Object} options - Query options
 * @returns {Promise} API response
 */
export const getAuditLogsByDateRange = async (startDate, endDate, options = {}) => {
  const params = {
    ...queryBuilders.paginate(options.page || 1, options.limit || 25),
    ...queryBuilders.sort(options.sortBy || 'createdAt', options.sortOrder || 'desc'),
    createdAt_gte: startDate,
    createdAt_lte: endDate,
  };

  return apiRequest(() => axiosInstance.get(AUDIT_ENDPOINTS.BASE, { params }));
};

/**
 * Export audit logs
 * @param {Object} filters - Filter criteria
 * @returns {Promise} API response with log data
 */
export const exportAuditLogs = async (filters = {}) => {
  return getAuditLogs({
    limit: 10000,
    filters,
  });
};

/**
 * Get audit log statistics
 * @returns {Promise} Statistics object
 */
export const getAuditLogStats = async () => {
  const response = await getAuditLogs({ limit: 1000 });

  if (!response.success) {
    return response;
  }

  const logs = response.data;

  const stats = {
    total: logs.length,
    byAction: {},
    byModule: {},
    byUser: {},
    recentActivity: logs.slice(0, 10),
  };

  // Count by action
  Object.values(AUDIT_ACTIONS).forEach((action) => {
    stats.byAction[action] = logs.filter((l) => l.action === action).length;
  });

  // Count by module
  Object.values(AUDIT_MODULES).forEach((module) => {
    stats.byModule[module] = logs.filter((l) => l.module === module).length;
  });

  // Count by user
  logs.forEach((log) => {
    const userName = log.userName || 'Unknown';
    stats.byUser[userName] = (stats.byUser[userName] || 0) + 1;
  });

  return {
    success: true,
    data: stats,
  };
};

/**
 * Truncate value for storage
 * @param {*} value - Value to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated value
 */
const truncateValue = (value, maxLength = 200) => {
  if (value === null || value === undefined) return '';
  const str = String(value);
  if (str.length <= maxLength) return str;
  return str.substring(0, maxLength) + '...';
};

/**
 * Format audit log for display
 * @param {Object} log - Audit log entry
 * @returns {Object} Formatted log
 */
export const formatAuditLog = (log) => {
  return {
    ...log,
    formattedDate: new Date(log.createdAt).toLocaleString(),
    actionColor: getActionColor(log.action),
    moduleLabel: getModuleLabel(log.module),
  };
};

/**
 * Get color for action type
 * @param {string} action - Action type
 * @returns {string} Color name
 */
const getActionColor = (action) => {
  const colors = {
    [AUDIT_ACTIONS.LOGIN]: 'info',
    [AUDIT_ACTIONS.LOGOUT]: 'default',
    [AUDIT_ACTIONS.CREATE]: 'success',
    [AUDIT_ACTIONS.UPDATE]: 'warning',
    [AUDIT_ACTIONS.DELETE]: 'error',
    [AUDIT_ACTIONS.VIEW]: 'default',
    [AUDIT_ACTIONS.EXPORT]: 'info',
    [AUDIT_ACTIONS.IMPORT]: 'info',
  };
  return colors[action] || 'default';
};

/**
 * Get label for module
 * @param {string} module - Module name
 * @returns {string} Module label
 */
const getModuleLabel = (module) => {
  const labels = {
    [AUDIT_MODULES.AUTH]: 'Authentication',
    [AUDIT_MODULES.LEADS]: 'Leads',
    [AUDIT_MODULES.SEO]: 'SEO Settings',
    [AUDIT_MODULES.PIXELS]: 'Tracking Pixels',
    [AUDIT_MODULES.SCHEMA]: 'Schema Markup',
    [AUDIT_MODULES.KEYWORDS]: 'Keywords',
    [AUDIT_MODULES.SETTINGS]: 'Settings',
  };
  return labels[module] || module;
};

export default {
  getAuditLogs,
  createAuditLog,
  logAction,
  logLogin,
  logLogout,
  logLeadAction,
  logSeoAction,
  logPixelAction,
  logSchemaAction,
  logKeywordAction,
  logSettingsAction,
  getAuditLogsByUser,
  getAuditLogsByModule,
  getAuditLogsByAction,
  getAuditLogsByDateRange,
  exportAuditLogs,
  getAuditLogStats,
  formatAuditLog,
  AUDIT_ACTIONS,
  AUDIT_MODULES,
};
