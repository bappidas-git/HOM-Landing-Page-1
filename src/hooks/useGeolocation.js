/**
 * useGeolocation Hook
 * Custom hook for browser geolocation functionality
 */

import { useState, useEffect, useCallback, useMemo } from 'react';
import {
  isGeolocationSupported,
  getCurrentPosition,
  watchPosition,
  clearWatch,
  getDistanceFromProject,
  getDirectionsToProject,
  reverseGeocode,
  getLocationWithAddress,
  storeLocation,
  getStoredLocation,
  clearStoredLocation,
  PROJECT_LOCATION,
} from '@/lib/utils/geolocation';

/**
 * useGeolocation Hook
 * Provides geolocation functionality with state management
 * @param {Object} options - Hook options
 * @param {boolean} options.enableHighAccuracy - Use high accuracy mode
 * @param {number} options.timeout - Geolocation timeout in ms
 * @param {number} options.maximumAge - Maximum age of cached position in ms
 * @param {boolean} options.watchPosition - Continuously watch position changes
 * @param {boolean} options.autoFetch - Automatically fetch location on mount
 * @param {boolean} options.useCache - Use cached location if available
 * @param {number} options.cacheMaxAge - Maximum cache age in minutes
 * @returns {Object} Geolocation state and methods
 */
const useGeolocation = (options = {}) => {
  const {
    enableHighAccuracy = true,
    timeout = 10000,
    maximumAge = 300000, // 5 minutes
    watchPosition: shouldWatch = false,
    autoFetch = false,
    useCache = true,
    cacheMaxAge = 30, // minutes
  } = options;

  // State
  const [position, setPosition] = useState(null);
  const [address, setAddress] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isWatching, setIsWatching] = useState(false);
  const [watchId, setWatchId] = useState(null);

  // Check if geolocation is supported
  const isSupported = useMemo(() => isGeolocationSupported(), []);

  /**
   * Geolocation options
   */
  const geolocationOptions = useMemo(() => ({
    enableHighAccuracy,
    timeout,
    maximumAge,
  }), [enableHighAccuracy, timeout, maximumAge]);

  /**
   * Get current position
   * @param {boolean} forceRefresh - Force refresh ignoring cache
   * @returns {Promise<Object>} Position data
   */
  const getPosition = useCallback(async (forceRefresh = false) => {
    if (!isSupported) {
      const err = new Error('Geolocation is not supported');
      setError(err);
      return { success: false, error: err.message };
    }

    // Check cache first
    if (useCache && !forceRefresh) {
      const cached = getStoredLocation(cacheMaxAge);
      if (cached && cached.coordinates) {
        setPosition(cached.coordinates);
        setAddress(cached.address || null);
        return { success: true, data: cached, cached: true };
      }
    }

    try {
      setIsLoading(true);
      setError(null);

      const pos = await getCurrentPosition(geolocationOptions);
      setPosition(pos);

      // Store position
      storeLocation({ coordinates: pos });

      return { success: true, data: pos, cached: false };
    } catch (err) {
      setError(err);
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  }, [isSupported, useCache, cacheMaxAge, geolocationOptions]);

  /**
   * Get position with address details
   * @returns {Promise<Object>} Position and address data
   */
  const getPositionWithAddress = useCallback(async () => {
    if (!isSupported) {
      const err = new Error('Geolocation is not supported');
      setError(err);
      return { success: false, error: err.message };
    }

    try {
      setIsLoading(true);
      setError(null);

      const result = await getLocationWithAddress();

      if (result.success) {
        setPosition(result.data.coordinates);
        setAddress(result.data.address);

        // Store location with address
        storeLocation({
          coordinates: result.data.coordinates,
          address: result.data.address,
        });

        return result;
      } else {
        setError(new Error(result.error));
        return result;
      }
    } catch (err) {
      setError(err);
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  }, [isSupported]);

  /**
   * Start watching position
   */
  const startWatching = useCallback(() => {
    if (!isSupported || isWatching) return;

    const id = watchPosition(
      (pos) => {
        setPosition(pos);
        setError(null);
      },
      (err) => {
        setError(err);
      },
      geolocationOptions
    );

    if (id !== null) {
      setWatchId(id);
      setIsWatching(true);
    }
  }, [isSupported, isWatching, geolocationOptions]);

  /**
   * Stop watching position
   */
  const stopWatching = useCallback(() => {
    if (watchId !== null) {
      clearWatch(watchId);
      setWatchId(null);
      setIsWatching(false);
    }
  }, [watchId]);

  /**
   * Clear location data
   */
  const clearLocation = useCallback(() => {
    setPosition(null);
    setAddress(null);
    setError(null);
    clearStoredLocation();
  }, []);

  /**
   * Get reverse geocoded address for current position
   */
  const getAddress = useCallback(async () => {
    if (!position) {
      return { success: false, error: 'No position available' };
    }

    try {
      setIsLoading(true);
      const result = await reverseGeocode(position.latitude, position.longitude);

      if (result.success) {
        setAddress(result.data);
      }

      return result;
    } catch (err) {
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  }, [position]);

  /**
   * Calculate distance from project location
   */
  const distanceFromProject = useMemo(() => {
    if (!position) return null;
    return getDistanceFromProject(position);
  }, [position]);

  /**
   * Get directions URL to project
   */
  const directionsUrl = useMemo(() => {
    if (!position) return null;
    return getDirectionsToProject(position);
  }, [position]);

  /**
   * Format distance for display
   * @param {number} km - Distance in kilometers
   * @returns {string} Formatted distance
   */
  const formatDistance = useCallback((km) => {
    if (km === null || km === undefined) return 'Unknown';
    if (km < 1) return `${Math.round(km * 1000)}m`;
    return `${km.toFixed(1)} km`;
  }, []);

  /**
   * Check if user is near the project (within 50km)
   */
  const isNearProject = useMemo(() => {
    if (distanceFromProject === null) return null;
    return distanceFromProject <= 50;
  }, [distanceFromProject]);

  /**
   * Auto-fetch location on mount if enabled
   */
  useEffect(() => {
    if (autoFetch) {
      getPosition();
    }
  }, [autoFetch, getPosition]);

  /**
   * Start watching if enabled
   */
  useEffect(() => {
    if (shouldWatch) {
      startWatching();
    }

    return () => {
      stopWatching();
    };
  }, [shouldWatch, startWatching, stopWatching]);

  return {
    // State
    position,
    address,
    error,
    isLoading,
    isWatching,
    isSupported,

    // Computed
    distanceFromProject,
    directionsUrl,
    isNearProject,
    projectLocation: PROJECT_LOCATION,

    // Actions
    getPosition,
    getPositionWithAddress,
    getAddress,
    startWatching,
    stopWatching,
    clearLocation,

    // Utilities
    formatDistance,
  };
};

export default useGeolocation;
