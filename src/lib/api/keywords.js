/**
 * Keywords API Service
 * Handles SEO keywords management
 */

import axiosInstance, { apiRequest } from './axiosInstance';
import { KEYWORD_ENDPOINTS, queryBuilders } from './endpoints';

/**
 * Get all keywords with optional filtering and pagination
 * @param {Object} options - Query options
 * @param {number} options.page - Page number
 * @param {number} options.limit - Items per page
 * @param {string} options.sortBy - Sort field
 * @param {string} options.sortOrder - Sort order
 * @param {Object} options.filters - Filter criteria
 * @returns {Promise} API response
 */
export const getKeywords = async ({
  page = 1,
  limit = 50,
  sortBy = 'createdAt',
  sortOrder = 'desc',
  filters = {},
} = {}) => {
  const params = {
    ...queryBuilders.paginate(page, limit),
    ...queryBuilders.sort(sortBy, sortOrder),
    ...queryBuilders.filter(filters),
  };

  return apiRequest(() => axiosInstance.get(KEYWORD_ENDPOINTS.BASE, { params }));
};

/**
 * Get a single keyword by ID
 * @param {number|string} id - Keyword ID
 * @returns {Promise} API response
 */
export const getKeywordById = async (id) => {
  return apiRequest(() => axiosInstance.get(KEYWORD_ENDPOINTS.BY_ID(id)));
};

/**
 * Create a new keyword
 * @param {Object} keywordData - Keyword information
 * @param {string} keywordData.keyword - Keyword text
 * @param {string} keywordData.type - Keyword type (primary, secondary, long-tail, branded)
 * @param {number} keywordData.searchVolume - Monthly search volume
 * @param {string} keywordData.difficulty - SEO difficulty (low, medium, high)
 * @param {number} keywordData.position - Current ranking position
 * @param {boolean} keywordData.isActive - Active status
 * @returns {Promise} API response
 */
export const createKeyword = async (keywordData) => {
  const payload = {
    keyword: keywordData.keyword,
    type: keywordData.type || 'secondary',
    searchVolume: keywordData.searchVolume || 0,
    difficulty: keywordData.difficulty || 'medium',
    position: keywordData.position || null,
    isActive: keywordData.isActive !== false,
    createdAt: new Date().toISOString(),
  };

  return apiRequest(() => axiosInstance.post(KEYWORD_ENDPOINTS.BASE, payload));
};

/**
 * Update an existing keyword
 * @param {number|string} id - Keyword ID
 * @param {Object} updateData - Fields to update
 * @returns {Promise} API response
 */
export const updateKeyword = async (id, updateData) => {
  const payload = {
    ...updateData,
    updatedAt: new Date().toISOString(),
  };

  return apiRequest(() => axiosInstance.patch(KEYWORD_ENDPOINTS.BY_ID(id), payload));
};

/**
 * Delete a keyword
 * @param {number|string} id - Keyword ID
 * @returns {Promise} API response
 */
export const deleteKeyword = async (id) => {
  return apiRequest(() => axiosInstance.delete(KEYWORD_ENDPOINTS.BY_ID(id)));
};

/**
 * Toggle keyword active status
 * @param {number|string} id - Keyword ID
 * @param {boolean} isActive - New active status
 * @returns {Promise} API response
 */
export const toggleKeywordStatus = async (id, isActive) => {
  return updateKeyword(id, { isActive });
};

/**
 * Bulk create keywords
 * @param {Array} keywords - Array of keyword objects
 * @returns {Promise} Array of API responses
 */
export const bulkCreateKeywords = async (keywords) => {
  const promises = keywords.map((keyword) => createKeyword(keyword));
  return Promise.all(promises);
};

/**
 * Bulk delete keywords
 * @param {Array} ids - Array of keyword IDs
 * @returns {Promise} Array of API responses
 */
export const bulkDeleteKeywords = async (ids) => {
  const promises = ids.map((id) => deleteKeyword(id));
  return Promise.all(promises);
};

/**
 * Bulk toggle keyword status
 * @param {Array} ids - Array of keyword IDs
 * @param {boolean} isActive - New active status
 * @returns {Promise} Array of API responses
 */
export const bulkToggleStatus = async (ids, isActive) => {
  const promises = ids.map((id) => toggleKeywordStatus(id, isActive));
  return Promise.all(promises);
};

/**
 * Get keywords by type
 * @param {string} type - Keyword type
 * @param {Object} options - Additional query options
 * @returns {Promise} API response
 */
export const getKeywordsByType = async (type, options = {}) => {
  return getKeywords({
    ...options,
    filters: { ...options.filters, type },
  });
};

/**
 * Get active keywords only
 * @param {Object} options - Additional query options
 * @returns {Promise} API response
 */
export const getActiveKeywords = async (options = {}) => {
  return getKeywords({
    ...options,
    filters: { ...options.filters, isActive: true },
  });
};

/**
 * Search keywords
 * @param {string} query - Search query
 * @param {Object} options - Additional query options
 * @returns {Promise} API response
 */
export const searchKeywords = async (query, options = {}) => {
  const params = {
    ...queryBuilders.paginate(options.page || 1, options.limit || 50),
    q: query,
  };

  return apiRequest(() => axiosInstance.get(KEYWORD_ENDPOINTS.BASE, { params }));
};

/**
 * Import keywords from CSV data
 * @param {Array} csvData - Array of keyword objects from CSV
 * @returns {Promise} Import result
 */
export const importKeywordsFromCsv = async (csvData) => {
  const results = {
    success: [],
    failed: [],
  };

  for (const row of csvData) {
    // Validate required fields
    if (!row.keyword || row.keyword.trim() === '') {
      results.failed.push({ ...row, error: 'Missing keyword' });
      continue;
    }

    // Map CSV fields to keyword object
    const keywordData = {
      keyword: row.keyword.trim(),
      type: mapKeywordType(row.type),
      searchVolume: parseInt(row.searchVolume, 10) || 0,
      difficulty: mapDifficulty(row.difficulty),
      position: row.position ? parseInt(row.position, 10) : null,
      isActive: row.isActive !== 'false' && row.isActive !== '0',
    };

    const response = await createKeyword(keywordData);

    if (response.success) {
      results.success.push(response.data);
    } else {
      results.failed.push({ ...row, error: response.error });
    }
  }

  return {
    success: true,
    imported: results.success.length,
    failed: results.failed.length,
    results,
  };
};

/**
 * Export keywords to CSV format
 * @param {Object} filters - Filter criteria
 * @returns {Promise} CSV data
 */
export const exportKeywordsToCsv = async (filters = {}) => {
  const response = await getKeywords({ limit: 1000, filters });

  if (!response.success) {
    return response;
  }

  const keywords = response.data;
  const csvHeaders = [
    'keyword',
    'type',
    'searchVolume',
    'difficulty',
    'position',
    'isActive',
  ];

  const csvRows = keywords.map((kw) => [
    kw.keyword,
    kw.type,
    kw.searchVolume,
    kw.difficulty,
    kw.position || '',
    kw.isActive,
  ]);

  return {
    success: true,
    data: {
      headers: csvHeaders,
      rows: csvRows,
    },
  };
};

/**
 * Map keyword type from import
 * @param {string} type - Input type
 * @returns {string} Normalized type
 */
const mapKeywordType = (type) => {
  const typeMap = {
    primary: 'primary',
    secondary: 'secondary',
    'long-tail': 'long-tail',
    longtail: 'long-tail',
    branded: 'branded',
    brand: 'branded',
  };

  return typeMap[type?.toLowerCase()] || 'secondary';
};

/**
 * Map difficulty from import
 * @param {string} difficulty - Input difficulty
 * @returns {string} Normalized difficulty
 */
const mapDifficulty = (difficulty) => {
  const difficultyMap = {
    low: 'low',
    easy: 'low',
    medium: 'medium',
    moderate: 'medium',
    high: 'high',
    hard: 'high',
  };

  return difficultyMap[difficulty?.toLowerCase()] || 'medium';
};

/**
 * Get keyword statistics
 * @returns {Promise} Statistics object
 */
export const getKeywordStats = async () => {
  const response = await getKeywords({ limit: 1000 });

  if (!response.success) {
    return response;
  }

  const keywords = response.data;

  const stats = {
    total: keywords.length,
    active: keywords.filter((k) => k.isActive).length,
    inactive: keywords.filter((k) => !k.isActive).length,
    byType: {
      primary: keywords.filter((k) => k.type === 'primary').length,
      secondary: keywords.filter((k) => k.type === 'secondary').length,
      'long-tail': keywords.filter((k) => k.type === 'long-tail').length,
      branded: keywords.filter((k) => k.type === 'branded').length,
    },
    byDifficulty: {
      low: keywords.filter((k) => k.difficulty === 'low').length,
      medium: keywords.filter((k) => k.difficulty === 'medium').length,
      high: keywords.filter((k) => k.difficulty === 'high').length,
    },
    totalSearchVolume: keywords.reduce((sum, k) => sum + (k.searchVolume || 0), 0),
    averageSearchVolume:
      keywords.length > 0
        ? Math.round(
            keywords.reduce((sum, k) => sum + (k.searchVolume || 0), 0) / keywords.length
          )
        : 0,
  };

  return {
    success: true,
    data: stats,
  };
};

/**
 * Keyword type options
 */
export const KEYWORD_TYPES = [
  { value: 'primary', label: 'Primary' },
  { value: 'secondary', label: 'Secondary' },
  { value: 'long-tail', label: 'Long-tail' },
  { value: 'branded', label: 'Branded' },
];

/**
 * Keyword difficulty options
 */
export const KEYWORD_DIFFICULTIES = [
  { value: 'low', label: 'Low', color: 'success' },
  { value: 'medium', label: 'Medium', color: 'warning' },
  { value: 'high', label: 'High', color: 'error' },
];

export default {
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
};
