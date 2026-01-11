/**
 * IP Address Utilities
 * Functions for fetching and handling IP address and location data
 */

// IP API URL from environment
const IP_API_URL = process.env.NEXT_PUBLIC_IP_API_URL || 'https://ipapi.co/json/';

/**
 * Default IP data structure
 */
const defaultIpData = {
  ip: null,
  city: null,
  region: null,
  country: null,
  countryCode: null,
  latitude: null,
  longitude: null,
  timezone: null,
  isp: null,
};

/**
 * Fetch IP address and location data
 * @returns {Promise} IP and location data
 */
export const fetchIpData = async () => {
  try {
    const response = await fetch(IP_API_URL, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch IP data');
    }

    const data = await response.json();

    // Handle rate limiting or errors from the API
    if (data.error) {
      console.warn('[IP API] Error:', data.reason || data.error);
      return {
        success: false,
        error: data.reason || 'API error',
        data: defaultIpData,
      };
    }

    return {
      success: true,
      data: {
        ip: data.ip,
        city: data.city,
        region: data.region,
        country: data.country_name,
        countryCode: data.country_code,
        latitude: data.latitude,
        longitude: data.longitude,
        timezone: data.timezone,
        isp: data.org,
        postalCode: data.postal,
        asn: data.asn,
      },
    };
  } catch (error) {
    console.error('[IP API] Error:', error.message);
    return {
      success: false,
      error: error.message,
      data: defaultIpData,
    };
  }
};

/**
 * Fetch IP address and location using alternative API (ip-api.com)
 * Use as fallback when primary API fails
 * @returns {Promise} IP and location data
 */
export const fetchIpDataAlternative = async () => {
  try {
    const response = await fetch('http://ip-api.com/json/', {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch IP data');
    }

    const data = await response.json();

    if (data.status === 'fail') {
      return {
        success: false,
        error: data.message,
        data: defaultIpData,
      };
    }

    return {
      success: true,
      data: {
        ip: data.query,
        city: data.city,
        region: data.regionName,
        country: data.country,
        countryCode: data.countryCode,
        latitude: data.lat,
        longitude: data.lon,
        timezone: data.timezone,
        isp: data.isp,
        postalCode: data.zip,
      },
    };
  } catch (error) {
    console.error('[IP API Alternative] Error:', error.message);
    return {
      success: false,
      error: error.message,
      data: defaultIpData,
    };
  }
};

/**
 * Fetch IP data with fallback
 * @returns {Promise} IP and location data
 */
export const fetchIpDataWithFallback = async () => {
  // Try primary API first
  const primaryResult = await fetchIpData();

  if (primaryResult.success && primaryResult.data.ip) {
    return primaryResult;
  }

  // Try alternative API
  const alternativeResult = await fetchIpDataAlternative();

  if (alternativeResult.success && alternativeResult.data.ip) {
    return alternativeResult;
  }

  // Return primary result (even if failed) for consistent error handling
  return primaryResult;
};

/**
 * Get cached IP data from sessionStorage
 * @returns {Object|null} Cached data or null
 */
export const getCachedIpData = () => {
  if (typeof sessionStorage === 'undefined') return null;

  try {
    const cached = sessionStorage.getItem('ip_data');
    if (!cached) return null;

    const data = JSON.parse(cached);
    const cachedAt = new Date(data.cachedAt);
    const now = new Date();

    // Cache for 1 hour
    if ((now - cachedAt) / 1000 / 60 > 60) {
      sessionStorage.removeItem('ip_data');
      return null;
    }

    return data;
  } catch {
    return null;
  }
};

/**
 * Cache IP data to sessionStorage
 * @param {Object} data - Data to cache
 */
export const cacheIpData = (data) => {
  if (typeof sessionStorage === 'undefined') return;

  try {
    sessionStorage.setItem('ip_data', JSON.stringify({
      ...data,
      cachedAt: new Date().toISOString(),
    }));
  } catch {
    // Storage failed, ignore
  }
};

/**
 * Get IP data (with caching)
 * @param {boolean} forceRefresh - Force refresh ignoring cache
 * @returns {Promise} IP and location data
 */
export const getIpData = async (forceRefresh = false) => {
  // Check cache first
  if (!forceRefresh) {
    const cached = getCachedIpData();
    if (cached) {
      return {
        success: true,
        data: cached,
        cached: true,
      };
    }
  }

  // Fetch fresh data
  const result = await fetchIpDataWithFallback();

  // Cache successful results
  if (result.success && result.data.ip) {
    cacheIpData(result.data);
  }

  return {
    ...result,
    cached: false,
  };
};

/**
 * Get just the IP address
 * @returns {Promise} IP address string
 */
export const getIpAddress = async () => {
  const result = await getIpData();
  return result.data?.ip || null;
};

/**
 * Get location from IP
 * @returns {Promise} Location data
 */
export const getLocationFromIp = async () => {
  const result = await getIpData();

  if (!result.success) {
    return {
      success: false,
      error: result.error,
    };
  }

  return {
    success: true,
    data: {
      city: result.data.city,
      state: result.data.region,
      country: result.data.country,
      latitude: result.data.latitude,
      longitude: result.data.longitude,
    },
  };
};

/**
 * Format location for lead data
 * @returns {Promise} Formatted location object
 */
export const getFormattedLocationForLead = async () => {
  const result = await getIpData();

  return {
    ipAddress: result.data?.ip || 'Unknown',
    city: result.data?.city || 'Unknown',
    state: result.data?.region || 'Unknown',
    country: result.data?.country || 'Unknown',
    latitude: result.data?.latitude || null,
    longitude: result.data?.longitude || null,
  };
};

/**
 * Check if IP is from India
 * @returns {Promise} Boolean
 */
export const isFromIndia = async () => {
  const result = await getIpData();
  return result.data?.countryCode === 'IN';
};

/**
 * Get user agent string
 * @returns {string} User agent or 'Unknown'
 */
export const getUserAgent = () => {
  if (typeof navigator === 'undefined') return 'Unknown';
  return navigator.userAgent || 'Unknown';
};

/**
 * Get browser info from user agent
 * @returns {Object} Browser info
 */
export const getBrowserInfo = () => {
  const ua = getUserAgent();

  const browsers = [
    { name: 'Chrome', pattern: /Chrome\/(\d+)/ },
    { name: 'Firefox', pattern: /Firefox\/(\d+)/ },
    { name: 'Safari', pattern: /Safari\/(\d+)/ },
    { name: 'Edge', pattern: /Edg\/(\d+)/ },
    { name: 'Opera', pattern: /OPR\/(\d+)/ },
    { name: 'IE', pattern: /MSIE (\d+)/ },
  ];

  for (const browser of browsers) {
    const match = ua.match(browser.pattern);
    if (match) {
      return {
        name: browser.name,
        version: match[1],
        userAgent: ua,
      };
    }
  }

  return {
    name: 'Unknown',
    version: 'Unknown',
    userAgent: ua,
  };
};

/**
 * Get device type from user agent
 * @returns {string} Device type (mobile, tablet, desktop)
 */
export const getDeviceType = () => {
  const ua = getUserAgent().toLowerCase();

  if (/mobile|android|iphone|ipod|blackberry|opera mini|iemobile/i.test(ua)) {
    return 'mobile';
  }

  if (/ipad|tablet|playbook|silk/i.test(ua)) {
    return 'tablet';
  }

  return 'desktop';
};

/**
 * Get complete tracking data for leads
 * @returns {Promise} Tracking data object
 */
export const getTrackingData = async () => {
  const ipData = await getIpData();

  return {
    ipAddress: ipData.data?.ip || 'Unknown',
    location: {
      city: ipData.data?.city || 'Unknown',
      state: ipData.data?.region || 'Unknown',
      country: ipData.data?.country || 'Unknown',
      latitude: ipData.data?.latitude,
      longitude: ipData.data?.longitude,
    },
    userAgent: getUserAgent(),
    browser: getBrowserInfo(),
    deviceType: getDeviceType(),
    timezone: ipData.data?.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone,
  };
};

export default {
  fetchIpData,
  fetchIpDataAlternative,
  fetchIpDataWithFallback,
  getCachedIpData,
  cacheIpData,
  getIpData,
  getIpAddress,
  getLocationFromIp,
  getFormattedLocationForLead,
  isFromIndia,
  getUserAgent,
  getBrowserInfo,
  getDeviceType,
  getTrackingData,
};
