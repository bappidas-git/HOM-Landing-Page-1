/**
 * API Module Index
 * Centralized export for all API services
 */

// Axios instance and utilities
export {
  default as axiosInstance,
  setAuthToken,
  clearAuthToken,
  getAuthToken,
  isAuthenticated,
  createCancelToken,
  apiRequest,
} from './axiosInstance';

// Endpoints
export {
  default as ENDPOINTS,
  AUTH_ENDPOINTS,
  LEAD_ENDPOINTS,
  CONTACT_ENDPOINTS,
  SEO_ENDPOINTS,
  PIXEL_ENDPOINTS,
  SCHEMA_ENDPOINTS,
  KEYWORD_ENDPOINTS,
  AUDIT_ENDPOINTS,
  DASHBOARD_ENDPOINTS,
  SETTINGS_ENDPOINTS,
  buildUrl,
  buildUrlWithParams,
  queryBuilders,
} from './endpoints';

// Auth API
export {
  default as authApi,
  login,
  logout,
  getCurrentUser,
  checkAuth,
  getToken,
  validateSession,
  refreshToken,
  updateProfile,
  changePassword,
  parseToken,
  isTokenExpired,
} from './auth';

// Leads API
export {
  default as leadsApi,
  getLeads,
  getLeadById,
  createLead,
  updateLead,
  deleteLead,
  updateLeadStatus,
  addLeadNote,
  assignLead,
  setFollowUpDate,
  bulkUpdateLeads,
  bulkDeleteLeads,
  getLeadsByStatus,
  getLeadsBySource,
  getLeadsWithSiteVisit,
  getRecentLeads,
  searchLeads,
  exportLeads,
  checkDuplicateContact,
  addSubmittedContact,
  submitLeadWithDuplicateCheck,
} from './leads';

// SEO API
export {
  default as seoApi,
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
} from './seo';

// Pixels API
export {
  default as pixelsApi,
  getPixelSettings,
  updatePixelSettings,
  updateGoogleAnalytics,
  updateGoogleTagManager,
  updateFacebookPixel,
  updateGoogleAds,
  updateLinkedInInsight,
  updateHotjar,
  updateCustomScripts,
  toggleAllTracking,
  validatePixelId,
  generateTrackingScripts,
  getEnabledTracking,
} from './pixels';

// Schema API
export {
  default as schemaApi,
  getSchemaSettings,
  updateSchemaSettings,
  updateOrganizationSchema,
  updateRealEstateSchema,
  updateApartmentSchema,
  updateFaqSchema,
  updateBreadcrumbSchema,
  updateLocalBusinessSchema,
  addCustomSchema,
  updateCustomSchema,
  deleteCustomSchema,
  validateSchema,
  generateSchemaScript,
  generateAllSchemaScripts,
  generateFaqSchema,
  generateBreadcrumbSchema,
  schemaTemplates,
} from './schema';

// Keywords API
export {
  default as keywordsApi,
  getKeywords,
  getKeywordById,
  createKeyword,
  updateKeyword,
  deleteKeyword,
  toggleKeywordStatus,
  bulkCreateKeywords,
  bulkDeleteKeywords,
  bulkToggleStatus,
  getKeywordsByType,
  getActiveKeywords,
  searchKeywords,
  importKeywordsFromCsv,
  exportKeywordsToCsv,
  getKeywordStats,
  KEYWORD_TYPES,
  KEYWORD_DIFFICULTIES,
} from './keywords';

// Audit Log API
export {
  default as auditLogApi,
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
} from './auditLog';

// Dashboard API
export {
  default as dashboardApi,
  getDashboardStats,
  getLeadsByDay,
  getConversionRate,
  getSiteVisitStats,
  getLeadsByLocation,
  getTodayStats,
  getAllDashboardData,
  updateDashboardStats,
  refreshDashboardStats,
  getChartData,
} from './dashboard';

/**
 * Combined API object for convenience
 */
const api = {
  // Auth
  login,
  logout,
  getCurrentUser,
  checkAuth,
  validateSession,

  // Leads
  getLeads,
  getLeadById,
  createLead,
  updateLead,
  deleteLead,
  submitLeadWithDuplicateCheck,

  // SEO
  getSeoSettings,
  updateSeoSettings,

  // Pixels
  getPixelSettings,
  updatePixelSettings,

  // Schema
  getSchemaSettings,
  updateSchemaSettings,

  // Keywords
  getKeywords,
  createKeyword,
  updateKeyword,
  deleteKeyword,

  // Audit
  getAuditLogs,
  logAction,

  // Dashboard
  getDashboardStats,
  getAllDashboardData,
};

export default api;
