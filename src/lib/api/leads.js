/**
 * Leads API Service
 * Handles all lead-related API operations
 */

import axiosInstance, { apiRequest } from './axiosInstance';
import { LEAD_ENDPOINTS, CONTACT_ENDPOINTS, queryBuilders } from './endpoints';

/**
 * Get all leads with optional filtering, sorting, and pagination
 * @param {Object} options - Query options
 * @param {number} options.page - Page number (1-indexed)
 * @param {number} options.limit - Items per page
 * @param {string} options.sortBy - Sort field
 * @param {string} options.sortOrder - Sort order (asc/desc)
 * @param {Object} options.filters - Filter criteria
 * @param {string} options.search - Search query
 * @returns {Promise} API response
 */
export const getLeads = async ({
  page = 1,
  limit = 10,
  sortBy = 'createdAt',
  sortOrder = 'desc',
  filters = {},
  search = '',
} = {}) => {
  const params = {
    ...queryBuilders.paginate(page, limit),
    ...queryBuilders.sort(sortBy, sortOrder),
    ...queryBuilders.filter(filters),
    ...(search ? queryBuilders.search(search) : {}),
  };

  return apiRequest(() => axiosInstance.get(LEAD_ENDPOINTS.BASE, { params }));
};

/**
 * Get a single lead by ID
 * @param {number|string} id - Lead ID
 * @returns {Promise} API response
 */
export const getLeadById = async (id) => {
  return apiRequest(() => axiosInstance.get(LEAD_ENDPOINTS.BY_ID(id)));
};

/**
 * Create a new lead
 * @param {Object} leadData - Lead information
 * @returns {Promise} API response
 */
export const createLead = async (leadData) => {
  const payload = {
    ...leadData,
    status: leadData.status || 'new',
    priority: leadData.priority || 'medium',
    notes: leadData.notes || [],
    assignedTo: leadData.assignedTo || null,
    followUpDate: leadData.followUpDate || null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  return apiRequest(() => axiosInstance.post(LEAD_ENDPOINTS.BASE, payload));
};

/**
 * Update an existing lead
 * @param {number|string} id - Lead ID
 * @param {Object} updateData - Fields to update
 * @returns {Promise} API response
 */
export const updateLead = async (id, updateData) => {
  const payload = {
    ...updateData,
    updatedAt: new Date().toISOString(),
  };

  return apiRequest(() => axiosInstance.patch(LEAD_ENDPOINTS.BY_ID(id), payload));
};

/**
 * Delete a lead
 * @param {number|string} id - Lead ID
 * @returns {Promise} API response
 */
export const deleteLead = async (id) => {
  return apiRequest(() => axiosInstance.delete(LEAD_ENDPOINTS.BY_ID(id)));
};

/**
 * Update lead status
 * @param {number|string} id - Lead ID
 * @param {string} status - New status
 * @returns {Promise} API response
 */
export const updateLeadStatus = async (id, status) => {
  return updateLead(id, { status });
};

/**
 * Add note to lead
 * @param {number|string} id - Lead ID
 * @param {Object} note - Note object
 * @param {string} note.text - Note content
 * @param {string} note.createdBy - Admin user name
 * @returns {Promise} API response
 */
export const addLeadNote = async (id, note) => {
  // First get the lead to access existing notes
  const leadResponse = await getLeadById(id);

  if (!leadResponse.success) {
    return leadResponse;
  }

  const existingNotes = leadResponse.data.notes || [];
  const newNote = {
    id: Date.now(),
    text: note.text,
    createdBy: note.createdBy || 'admin',
    createdAt: new Date().toISOString(),
  };

  return updateLead(id, {
    notes: [...existingNotes, newNote],
  });
};

/**
 * Assign lead to team member
 * @param {number|string} id - Lead ID
 * @param {number|string} userId - User ID to assign
 * @returns {Promise} API response
 */
export const assignLead = async (id, userId) => {
  return updateLead(id, { assignedTo: userId });
};

/**
 * Set follow-up date for lead
 * @param {number|string} id - Lead ID
 * @param {string} date - Follow-up date (ISO string)
 * @returns {Promise} API response
 */
export const setFollowUpDate = async (id, date) => {
  return updateLead(id, { followUpDate: date });
};

/**
 * Bulk update leads
 * @param {Array} ids - Array of lead IDs
 * @param {Object} updateData - Fields to update
 * @returns {Promise} Array of API responses
 */
export const bulkUpdateLeads = async (ids, updateData) => {
  const promises = ids.map((id) => updateLead(id, updateData));
  return Promise.all(promises);
};

/**
 * Bulk delete leads
 * @param {Array} ids - Array of lead IDs
 * @returns {Promise} Array of API responses
 */
export const bulkDeleteLeads = async (ids) => {
  const promises = ids.map((id) => deleteLead(id));
  return Promise.all(promises);
};

/**
 * Get leads by status
 * @param {string} status - Lead status
 * @param {Object} options - Additional query options
 * @returns {Promise} API response
 */
export const getLeadsByStatus = async (status, options = {}) => {
  return getLeads({
    ...options,
    filters: { ...options.filters, status },
  });
};

/**
 * Get leads by source
 * @param {string} source - Lead source
 * @param {Object} options - Additional query options
 * @returns {Promise} API response
 */
export const getLeadsBySource = async (source, options = {}) => {
  return getLeads({
    ...options,
    filters: { ...options.filters, source },
  });
};

/**
 * Get leads with site visit scheduled
 * @param {Object} options - Additional query options
 * @returns {Promise} API response
 */
export const getLeadsWithSiteVisit = async (options = {}) => {
  return getLeads({
    ...options,
    filters: { ...options.filters, wantsSiteVisit: true },
  });
};

/**
 * Get recent leads
 * @param {number} limit - Number of leads to fetch
 * @returns {Promise} API response
 */
export const getRecentLeads = async (limit = 10) => {
  return getLeads({
    limit,
    sortBy: 'createdAt',
    sortOrder: 'desc',
  });
};

/**
 * Search leads by name, email, or mobile
 * @param {string} query - Search query
 * @param {Object} options - Additional query options
 * @returns {Promise} API response
 */
export const searchLeads = async (query, options = {}) => {
  return getLeads({
    ...options,
    search: query,
  });
};

/**
 * Export leads data
 * @param {Object} filters - Filter criteria
 * @returns {Promise} API response with leads data for export
 */
export const exportLeads = async (filters = {}) => {
  return getLeads({
    limit: 1000, // Get all leads for export
    filters,
  });
};

/**
 * Check if contact already exists (duplicate check)
 * @param {string} mobile - Mobile number
 * @param {string} email - Email address
 * @returns {Promise} Object with exists flags
 */
export const checkDuplicateContact = async (mobile, email) => {
  try {
    // Check mobile
    const mobileResponse = await axiosInstance.get(CONTACT_ENDPOINTS.BASE, {
      params: { mobile },
    });

    // Check email
    const emailResponse = await axiosInstance.get(CONTACT_ENDPOINTS.BASE, {
      params: { email },
    });

    return {
      success: true,
      mobileExists: mobileResponse.data.length > 0,
      emailExists: emailResponse.data.length > 0,
      exists: mobileResponse.data.length > 0 || emailResponse.data.length > 0,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      mobileExists: false,
      emailExists: false,
      exists: false,
    };
  }
};

/**
 * Add contact to submitted contacts list
 * @param {string} mobile - Mobile number
 * @param {string} email - Email address
 * @returns {Promise} API response
 */
export const addSubmittedContact = async (mobile, email) => {
  const payload = {
    mobile,
    email,
    submittedAt: new Date().toISOString(),
  };

  return apiRequest(() => axiosInstance.post(CONTACT_ENDPOINTS.BASE, payload));
};

/**
 * Submit lead with duplicate check
 * @param {Object} leadData - Lead information
 * @returns {Promise} API response
 */
export const submitLeadWithDuplicateCheck = async (leadData) => {
  // Check for duplicates first
  const duplicateCheck = await checkDuplicateContact(leadData.mobile, leadData.email);

  if (!duplicateCheck.success) {
    return {
      success: false,
      error: 'Failed to check for duplicates',
    };
  }

  if (duplicateCheck.exists) {
    return {
      success: false,
      error: 'You have already submitted an inquiry. Our team will contact you soon.',
      isDuplicate: true,
      mobileExists: duplicateCheck.mobileExists,
      emailExists: duplicateCheck.emailExists,
    };
  }

  // Create the lead
  const leadResponse = await createLead(leadData);

  if (!leadResponse.success) {
    return leadResponse;
  }

  // Add to submitted contacts
  await addSubmittedContact(leadData.mobile, leadData.email);

  return leadResponse;
};

export default {
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
};
