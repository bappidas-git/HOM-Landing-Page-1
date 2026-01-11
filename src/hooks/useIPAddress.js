/**
 * useIPAddress Hook
 * Custom hook for IP address and device tracking functionality
 */

import { useState, useEffect, useCallback, useMemo } from 'react';
import {
  getIpData,
  getIpAddress,
  getLocationFromIp,
  getFormattedLocationForLead,
  getTrackingData,
  getUserAgent,
  getBrowserInfo,
  getDeviceType,
  isFromIndia,
} from '@/lib/utils/ipAddress';

/**
 * useIPAddress Hook
 * Provides IP address and device tracking functionality
 * @param {Object} options - Hook options
 * @param {boolean} options.autoFetch - Automatically fetch IP data on mount
 * @param {boolean} options.forceRefresh - Force refresh ignoring cache
 * @returns {Object} IP/device state and methods
 */
const useIPAddress = (options = {}) => {
  const {
    autoFetch = false,
    forceRefresh = false,
  } = options;

  // State
  const [ipData, setIpData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isCached, setIsCached] = useState(false);

  /**
   * Fetch IP and location data
   * @param {boolean} refresh - Force refresh ignoring cache
   * @returns {Promise<Object>} IP data
   */
  const fetchIpData = useCallback(async (refresh = false) => {
    try {
      setIsLoading(true);
      setError(null);

      const result = await getIpData(refresh);

      if (result.success) {
        setIpData(result.data);
        setIsCached(result.cached || false);
        return { success: true, data: result.data };
      } else {
        setError(result.error);
        return { success: false, error: result.error };
      }
    } catch (err) {
      const errorMessage = err.message || 'Failed to fetch IP data';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Refresh IP data (force fetch)
   */
  const refreshIpData = useCallback(() => {
    return fetchIpData(true);
  }, [fetchIpData]);

  /**
   * Get IP address only
   * @returns {Promise<string|null>} IP address
   */
  const fetchIpAddress = useCallback(async () => {
    try {
      const ip = await getIpAddress();
      return ip;
    } catch (err) {
      console.error('[useIPAddress] Error fetching IP:', err);
      return null;
    }
  }, []);

  /**
   * Get location from IP
   * @returns {Promise<Object>} Location data
   */
  const fetchLocation = useCallback(async () => {
    try {
      const result = await getLocationFromIp();
      return result;
    } catch (err) {
      return { success: false, error: err.message };
    }
  }, []);

  /**
   * Get formatted location for lead submission
   * @returns {Promise<Object>} Formatted location
   */
  const getLeadLocation = useCallback(async () => {
    try {
      const location = await getFormattedLocationForLead();
      return location;
    } catch (err) {
      return {
        ipAddress: 'Unknown',
        city: 'Unknown',
        state: 'Unknown',
        country: 'Unknown',
        latitude: null,
        longitude: null,
      };
    }
  }, []);

  /**
   * Get complete tracking data for leads
   * @returns {Promise<Object>} Tracking data
   */
  const getLeadTrackingData = useCallback(async () => {
    try {
      const data = await getTrackingData();
      return data;
    } catch (err) {
      return {
        ipAddress: 'Unknown',
        location: { city: 'Unknown', state: 'Unknown', country: 'Unknown' },
        userAgent: getUserAgent(),
        browser: getBrowserInfo(),
        deviceType: getDeviceType(),
      };
    }
  }, []);

  /**
   * Check if user is from India
   * @returns {Promise<boolean>}
   */
  const checkIsFromIndia = useCallback(async () => {
    try {
      return await isFromIndia();
    } catch {
      return false;
    }
  }, []);

  // Device info (doesn't require async fetch)
  const userAgent = useMemo(() => getUserAgent(), []);
  const browserInfo = useMemo(() => getBrowserInfo(), []);
  const deviceType = useMemo(() => getDeviceType(), []);

  // Derived state from IP data
  const ipAddress = useMemo(() => ipData?.ip || null, [ipData]);

  const location = useMemo(() => {
    if (!ipData) return null;
    return {
      city: ipData.city || 'Unknown',
      state: ipData.region || 'Unknown',
      country: ipData.country || 'Unknown',
      countryCode: ipData.countryCode || null,
      latitude: ipData.latitude || null,
      longitude: ipData.longitude || null,
      timezone: ipData.timezone || null,
    };
  }, [ipData]);

  const isIndian = useMemo(() => {
    return ipData?.countryCode === 'IN';
  }, [ipData]);

  const isp = useMemo(() => ipData?.isp || null, [ipData]);

  /**
   * Get formatted location string
   */
  const locationString = useMemo(() => {
    if (!location) return 'Unknown';

    const parts = [];
    if (location.city && location.city !== 'Unknown') parts.push(location.city);
    if (location.state && location.state !== 'Unknown') parts.push(location.state);
    if (location.country && location.country !== 'Unknown') parts.push(location.country);

    return parts.length > 0 ? parts.join(', ') : 'Unknown';
  }, [location]);

  /**
   * Get device summary
   */
  const deviceSummary = useMemo(() => {
    return {
      type: deviceType,
      browser: browserInfo.name,
      browserVersion: browserInfo.version,
      userAgent: userAgent,
    };
  }, [deviceType, browserInfo, userAgent]);

  /**
   * Check if on mobile device
   */
  const isMobileDevice = useMemo(() => deviceType === 'mobile', [deviceType]);

  /**
   * Check if on tablet device
   */
  const isTabletDevice = useMemo(() => deviceType === 'tablet', [deviceType]);

  /**
   * Check if on desktop device
   */
  const isDesktopDevice = useMemo(() => deviceType === 'desktop', [deviceType]);

  /**
   * Auto-fetch IP data on mount if enabled
   */
  useEffect(() => {
    if (autoFetch) {
      fetchIpData(forceRefresh);
    }
  }, [autoFetch, forceRefresh, fetchIpData]);

  return {
    // IP & Location State
    ipData,
    ipAddress,
    location,
    locationString,
    isIndian,
    isp,

    // Loading State
    isLoading,
    error,
    isCached,

    // Device Info
    userAgent,
    browserInfo,
    deviceType,
    deviceSummary,
    isMobileDevice,
    isTabletDevice,
    isDesktopDevice,

    // Fetch Actions
    fetchIpData,
    refreshIpData,
    fetchIpAddress,
    fetchLocation,

    // Lead Helpers
    getLeadLocation,
    getLeadTrackingData,

    // Checks
    checkIsFromIndia,
  };
};

export default useIPAddress;
