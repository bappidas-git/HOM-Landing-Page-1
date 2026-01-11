/**
 * Dashboard API Service
 * Handles dashboard statistics and analytics
 */

import axiosInstance, { apiRequest } from './axiosInstance';
import { DASHBOARD_ENDPOINTS, LEAD_ENDPOINTS, queryBuilders } from './endpoints';

/**
 * Get dashboard statistics
 * @returns {Promise} API response with stats
 */
export const getDashboardStats = async () => {
  return apiRequest(() => axiosInstance.get(DASHBOARD_ENDPOINTS.STATS));
};

/**
 * Get recent leads for dashboard
 * @param {number} limit - Number of leads to fetch
 * @returns {Promise} API response
 */
export const getRecentLeads = async (limit = 10) => {
  const params = {
    ...queryBuilders.sort('createdAt', 'desc'),
    _limit: limit,
  };

  return apiRequest(() => axiosInstance.get(LEAD_ENDPOINTS.BASE, { params }));
};

/**
 * Get leads count by status
 * @returns {Promise} API response with counts
 */
export const getLeadsByStatus = async () => {
  const response = await apiRequest(() => axiosInstance.get(LEAD_ENDPOINTS.BASE));

  if (!response.success) {
    return response;
  }

  const leads = response.data;
  const statusCounts = {
    new: 0,
    contacted: 0,
    site_visit_scheduled: 0,
    visited: 0,
    negotiation: 0,
    converted: 0,
    lost: 0,
  };

  leads.forEach((lead) => {
    if (statusCounts.hasOwnProperty(lead.status)) {
      statusCounts[lead.status]++;
    }
  });

  return {
    success: true,
    data: statusCounts,
  };
};

/**
 * Get leads count by source
 * @returns {Promise} API response with counts
 */
export const getLeadsBySource = async () => {
  const response = await apiRequest(() => axiosInstance.get(LEAD_ENDPOINTS.BASE));

  if (!response.success) {
    return response;
  }

  const leads = response.data;
  const sourceCounts = {
    hero_form: 0,
    popup_form: 0,
    cta_form: 0,
  };

  leads.forEach((lead) => {
    if (sourceCounts.hasOwnProperty(lead.source)) {
      sourceCounts[lead.source]++;
    }
  });

  return {
    success: true,
    data: sourceCounts,
  };
};

/**
 * Get leads by day for chart
 * @param {number} days - Number of days to fetch
 * @returns {Promise} API response with daily counts
 */
export const getLeadsByDay = async (days = 7) => {
  const response = await apiRequest(() => axiosInstance.get(LEAD_ENDPOINTS.BASE));

  if (!response.success) {
    return response;
  }

  const leads = response.data;
  const dailyCounts = {};

  // Initialize days
  for (let i = 0; i < days; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    dailyCounts[dateStr] = 0;
  }

  // Count leads per day
  leads.forEach((lead) => {
    const dateStr = lead.createdAt.split('T')[0];
    if (dailyCounts.hasOwnProperty(dateStr)) {
      dailyCounts[dateStr]++;
    }
  });

  // Convert to array format for charts
  const chartData = Object.entries(dailyCounts)
    .map(([date, count]) => ({ date, count }))
    .reverse();

  return {
    success: true,
    data: chartData,
  };
};

/**
 * Get conversion rate
 * @returns {Promise} API response with rate
 */
export const getConversionRate = async () => {
  const response = await apiRequest(() => axiosInstance.get(LEAD_ENDPOINTS.BASE));

  if (!response.success) {
    return response;
  }

  const leads = response.data;
  const totalLeads = leads.length;
  const convertedLeads = leads.filter((l) => l.status === 'converted').length;

  const rate = totalLeads > 0 ? ((convertedLeads / totalLeads) * 100).toFixed(2) : 0;

  return {
    success: true,
    data: {
      total: totalLeads,
      converted: convertedLeads,
      rate: parseFloat(rate),
    },
  };
};

/**
 * Get site visits statistics
 * @returns {Promise} API response with site visit stats
 */
export const getSiteVisitStats = async () => {
  const response = await apiRequest(() => axiosInstance.get(LEAD_ENDPOINTS.BASE));

  if (!response.success) {
    return response;
  }

  const leads = response.data;
  const scheduled = leads.filter((l) => l.wantsSiteVisit && l.siteVisitDate).length;
  const completed = leads.filter((l) => l.status === 'visited').length;
  const pending = scheduled - completed;

  return {
    success: true,
    data: {
      scheduled,
      completed,
      pending: Math.max(0, pending),
    },
  };
};

/**
 * Get leads by location (top cities)
 * @param {number} limit - Number of cities to return
 * @returns {Promise} API response with location data
 */
export const getLeadsByLocation = async (limit = 5) => {
  const response = await apiRequest(() => axiosInstance.get(LEAD_ENDPOINTS.BASE));

  if (!response.success) {
    return response;
  }

  const leads = response.data;
  const locationCounts = {};

  leads.forEach((lead) => {
    const city = lead.location?.city || lead.city || 'Unknown';
    locationCounts[city] = (locationCounts[city] || 0) + 1;
  });

  // Sort by count and take top N
  const topLocations = Object.entries(locationCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([city, count]) => ({ city, count }));

  return {
    success: true,
    data: topLocations,
  };
};

/**
 * Get today's statistics
 * @returns {Promise} API response with today's stats
 */
export const getTodayStats = async () => {
  const response = await apiRequest(() => axiosInstance.get(LEAD_ENDPOINTS.BASE));

  if (!response.success) {
    return response;
  }

  const leads = response.data;
  const today = new Date().toISOString().split('T')[0];

  const todayLeads = leads.filter((lead) => lead.createdAt.startsWith(today));

  return {
    success: true,
    data: {
      newLeads: todayLeads.length,
      siteVisitsScheduled: todayLeads.filter((l) => l.wantsSiteVisit).length,
      sources: {
        hero_form: todayLeads.filter((l) => l.source === 'hero_form').length,
        popup_form: todayLeads.filter((l) => l.source === 'popup_form').length,
        cta_form: todayLeads.filter((l) => l.source === 'cta_form').length,
      },
    },
  };
};

/**
 * Get all dashboard data in one call
 * @returns {Promise} API response with all dashboard data
 */
export const getAllDashboardData = async () => {
  try {
    // Fetch all data in parallel
    const [
      statsResponse,
      recentLeadsResponse,
      statusResponse,
      sourceResponse,
      dailyResponse,
      conversionResponse,
      siteVisitResponse,
      locationResponse,
      todayResponse,
    ] = await Promise.all([
      getDashboardStats(),
      getRecentLeads(10),
      getLeadsByStatus(),
      getLeadsBySource(),
      getLeadsByDay(7),
      getConversionRate(),
      getSiteVisitStats(),
      getLeadsByLocation(5),
      getTodayStats(),
    ]);

    return {
      success: true,
      data: {
        stats: statsResponse.data,
        recentLeads: recentLeadsResponse.data,
        leadsByStatus: statusResponse.data,
        leadsBySource: sourceResponse.data,
        leadsByDay: dailyResponse.data,
        conversion: conversionResponse.data,
        siteVisits: siteVisitResponse.data,
        topLocations: locationResponse.data,
        today: todayResponse.data,
      },
    };
  } catch (error) {
    return {
      success: false,
      error: error.message || 'Failed to fetch dashboard data',
    };
  }
};

/**
 * Update dashboard statistics (for caching/updating)
 * @param {Object} stats - Updated statistics
 * @returns {Promise} API response
 */
export const updateDashboardStats = async (stats) => {
  const payload = {
    ...stats,
    updatedAt: new Date().toISOString(),
  };

  return apiRequest(() => axiosInstance.patch(DASHBOARD_ENDPOINTS.STATS, payload));
};

/**
 * Calculate and update dashboard statistics from leads data
 * @returns {Promise} API response
 */
export const refreshDashboardStats = async () => {
  // Get all leads
  const leadsResponse = await apiRequest(() => axiosInstance.get(LEAD_ENDPOINTS.BASE));

  if (!leadsResponse.success) {
    return leadsResponse;
  }

  const leads = leadsResponse.data;

  // Calculate statistics
  const stats = {
    totalLeads: leads.length,
    newLeads: leads.filter((l) => l.status === 'new').length,
    contactedLeads: leads.filter((l) => l.status === 'contacted').length,
    convertedLeads: leads.filter((l) => l.status === 'converted').length,
    lostLeads: leads.filter((l) => l.status === 'lost').length,
    siteVisitsScheduled: leads.filter((l) => l.wantsSiteVisit).length,
    siteVisitsCompleted: leads.filter((l) => l.status === 'visited').length,
    leadsBySource: {
      hero_form: leads.filter((l) => l.source === 'hero_form').length,
      popup_form: leads.filter((l) => l.source === 'popup_form').length,
      cta_form: leads.filter((l) => l.source === 'cta_form').length,
    },
    conversionRate:
      leads.length > 0
        ? parseFloat(
            ((leads.filter((l) => l.status === 'converted').length / leads.length) * 100).toFixed(2)
          )
        : 0,
  };

  // Calculate leads by day (last 7 days)
  const leadsByDay = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    const count = leads.filter((l) => l.createdAt.startsWith(dateStr)).length;
    leadsByDay.push({ date: dateStr, count });
  }
  stats.leadsByDay = leadsByDay;

  // Calculate top locations
  const locationCounts = {};
  leads.forEach((lead) => {
    const city = lead.location?.city || lead.city || 'Unknown';
    locationCounts[city] = (locationCounts[city] || 0) + 1;
  });
  stats.topLocations = Object.entries(locationCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([city, count]) => ({ city, count }));

  // Update dashboard stats
  return updateDashboardStats(stats);
};

/**
 * Get chart data formatted for Chart.js
 * @param {string} chartType - Type of chart (leads_by_day, leads_by_source, leads_by_status)
 * @returns {Promise} API response with chart data
 */
export const getChartData = async (chartType) => {
  switch (chartType) {
    case 'leads_by_day': {
      const response = await getLeadsByDay(7);
      if (!response.success) return response;

      return {
        success: true,
        data: {
          labels: response.data.map((d) => formatDateLabel(d.date)),
          datasets: [
            {
              label: 'Leads',
              data: response.data.map((d) => d.count),
              borderColor: '#8B9A46',
              backgroundColor: 'rgba(139, 154, 70, 0.1)',
              fill: true,
            },
          ],
        },
      };
    }

    case 'leads_by_source': {
      const response = await getLeadsBySource();
      if (!response.success) return response;

      const sourceLabels = {
        hero_form: 'Hero Form',
        popup_form: 'Popup Form',
        cta_form: 'CTA Form',
      };

      return {
        success: true,
        data: {
          labels: Object.keys(response.data).map((k) => sourceLabels[k] || k),
          datasets: [
            {
              data: Object.values(response.data),
              backgroundColor: ['#8B9A46', '#1a1a2e', '#c9a227'],
            },
          ],
        },
      };
    }

    case 'leads_by_status': {
      const response = await getLeadsByStatus();
      if (!response.success) return response;

      const statusLabels = {
        new: 'New',
        contacted: 'Contacted',
        site_visit_scheduled: 'Site Visit Scheduled',
        visited: 'Visited',
        negotiation: 'Negotiation',
        converted: 'Converted',
        lost: 'Lost',
      };

      return {
        success: true,
        data: {
          labels: Object.keys(response.data).map((k) => statusLabels[k] || k),
          datasets: [
            {
              label: 'Leads',
              data: Object.values(response.data),
              backgroundColor: [
                '#2196f3',
                '#ff9800',
                '#9c27b0',
                '#00bcd4',
                '#ff5722',
                '#4caf50',
                '#f44336',
              ],
            },
          ],
        },
      };
    }

    default:
      return {
        success: false,
        error: 'Unknown chart type',
      };
  }
};

/**
 * Format date for chart labels
 * @param {string} dateStr - ISO date string
 * @returns {string} Formatted date
 */
const formatDateLabel = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
};

export default {
  getDashboardStats,
  getRecentLeads,
  getLeadsByStatus,
  getLeadsBySource,
  getLeadsByDay,
  getConversionRate,
  getSiteVisitStats,
  getLeadsByLocation,
  getTodayStats,
  getAllDashboardData,
  updateDashboardStats,
  refreshDashboardStats,
  getChartData,
};
