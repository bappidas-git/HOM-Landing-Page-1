/**
 * Geolocation Utilities
 * Functions for handling browser geolocation and location data
 */

/**
 * Check if geolocation is supported
 * @returns {boolean} True if supported
 */
export const isGeolocationSupported = () => {
  return typeof navigator !== 'undefined' && 'geolocation' in navigator;
};

/**
 * Get current position from browser
 * @param {Object} options - Geolocation options
 * @returns {Promise} Position object
 */
export const getCurrentPosition = (options = {}) => {
  return new Promise((resolve, reject) => {
    if (!isGeolocationSupported()) {
      reject(new Error('Geolocation is not supported'));
      return;
    }

    const defaultOptions = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 300000, // 5 minutes
      ...options,
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: position.timestamp,
        });
      },
      (error) => {
        reject(handleGeolocationError(error));
      },
      defaultOptions
    );
  });
};

/**
 * Handle geolocation errors
 * @param {GeolocationPositionError} error - Error object
 * @returns {Error} Formatted error
 */
const handleGeolocationError = (error) => {
  const errorMessages = {
    1: 'Location permission denied. Please enable location access.',
    2: 'Location unavailable. Please try again.',
    3: 'Location request timed out. Please try again.',
  };

  return new Error(errorMessages[error.code] || 'Unable to get location');
};

/**
 * Watch position changes
 * @param {Function} onSuccess - Success callback
 * @param {Function} onError - Error callback
 * @param {Object} options - Watch options
 * @returns {number} Watch ID for clearing
 */
export const watchPosition = (onSuccess, onError, options = {}) => {
  if (!isGeolocationSupported()) {
    onError(new Error('Geolocation is not supported'));
    return null;
  }

  const defaultOptions = {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 0,
    ...options,
  };

  return navigator.geolocation.watchPosition(
    (position) => {
      onSuccess({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: position.coords.accuracy,
        timestamp: position.timestamp,
      });
    },
    (error) => {
      onError(handleGeolocationError(error));
    },
    defaultOptions
  );
};

/**
 * Clear position watch
 * @param {number} watchId - Watch ID to clear
 */
export const clearWatch = (watchId) => {
  if (watchId !== null && isGeolocationSupported()) {
    navigator.geolocation.clearWatch(watchId);
  }
};

/**
 * Calculate distance between two coordinates (Haversine formula)
 * @param {Object} coord1 - First coordinate { latitude, longitude }
 * @param {Object} coord2 - Second coordinate { latitude, longitude }
 * @returns {number} Distance in kilometers
 */
export const calculateDistance = (coord1, coord2) => {
  const R = 6371; // Earth's radius in km

  const lat1 = toRadians(coord1.latitude);
  const lat2 = toRadians(coord2.latitude);
  const deltaLat = toRadians(coord2.latitude - coord1.latitude);
  const deltaLon = toRadians(coord2.longitude - coord1.longitude);

  const a =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
};

/**
 * Convert degrees to radians
 * @param {number} degrees - Degrees to convert
 * @returns {number} Radians
 */
const toRadians = (degrees) => {
  return degrees * (Math.PI / 180);
};

/**
 * Format distance for display
 * @param {number} km - Distance in kilometers
 * @returns {string} Formatted distance
 */
export const formatDistance = (km) => {
  if (km < 1) {
    return `${Math.round(km * 1000)}m`;
  }
  return `${km.toFixed(1)} km`;
};

/**
 * Project location coordinates
 */
export const PROJECT_LOCATION = {
  latitude: 12.9052,
  longitude: 77.7091,
  name: 'Nambiar District 25',
  address: 'Chandapura Dommasandra Road, Dommasandra, Bengaluru - 562125',
};

/**
 * Calculate distance from project
 * @param {Object} userCoords - User coordinates
 * @returns {number} Distance in km
 */
export const getDistanceFromProject = (userCoords) => {
  return calculateDistance(userCoords, PROJECT_LOCATION);
};

/**
 * Generate Google Maps URL
 * @param {Object} destination - Destination coordinates
 * @param {Object} origin - Origin coordinates (optional)
 * @returns {string} Google Maps URL
 */
export const getGoogleMapsUrl = (destination, origin = null) => {
  const destStr = `${destination.latitude},${destination.longitude}`;

  if (origin) {
    const originStr = `${origin.latitude},${origin.longitude}`;
    return `https://www.google.com/maps/dir/?api=1&origin=${originStr}&destination=${destStr}`;
  }

  return `https://www.google.com/maps/search/?api=1&query=${destStr}`;
};

/**
 * Generate Google Maps directions URL to project
 * @param {Object} origin - Origin coordinates
 * @returns {string} Directions URL
 */
export const getDirectionsToProject = (origin) => {
  return getGoogleMapsUrl(PROJECT_LOCATION, origin);
};

/**
 * Reverse geocode coordinates to address
 * @param {number} latitude - Latitude
 * @param {number} longitude - Longitude
 * @returns {Promise} Address data
 */
export const reverseGeocode = async (latitude, longitude) => {
  try {
    // Using OpenStreetMap Nominatim (free, no API key required)
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`,
      {
        headers: {
          'Accept-Language': 'en',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Geocoding failed');
    }

    const data = await response.json();

    return {
      success: true,
      data: {
        displayName: data.display_name,
        city:
          data.address.city ||
          data.address.town ||
          data.address.village ||
          data.address.municipality,
        state: data.address.state,
        country: data.address.country,
        pincode: data.address.postcode,
        locality: data.address.suburb || data.address.neighbourhood,
      },
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
};

/**
 * Get location with address details
 * @returns {Promise} Location with address
 */
export const getLocationWithAddress = async () => {
  try {
    // Get coordinates
    const position = await getCurrentPosition();

    // Reverse geocode
    const addressResult = await reverseGeocode(position.latitude, position.longitude);

    return {
      success: true,
      data: {
        coordinates: position,
        address: addressResult.success ? addressResult.data : null,
        distanceFromProject: getDistanceFromProject(position),
      },
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
};

/**
 * Store location in localStorage
 * @param {Object} location - Location data to store
 */
export const storeLocation = (location) => {
  if (typeof localStorage === 'undefined') return;

  try {
    localStorage.setItem('user_location', JSON.stringify({
      ...location,
      storedAt: new Date().toISOString(),
    }));
  } catch {
    // Storage failed, ignore
  }
};

/**
 * Get stored location from localStorage
 * @param {number} maxAge - Maximum age in minutes (default 30)
 * @returns {Object|null} Stored location or null
 */
export const getStoredLocation = (maxAge = 30) => {
  if (typeof localStorage === 'undefined') return null;

  try {
    const stored = localStorage.getItem('user_location');
    if (!stored) return null;

    const location = JSON.parse(stored);
    const storedAt = new Date(location.storedAt);
    const now = new Date();

    // Check if still valid
    if ((now - storedAt) / 1000 / 60 > maxAge) {
      localStorage.removeItem('user_location');
      return null;
    }

    return location;
  } catch {
    return null;
  }
};

/**
 * Clear stored location
 */
export const clearStoredLocation = () => {
  if (typeof localStorage === 'undefined') return;
  localStorage.removeItem('user_location');
};

export default {
  isGeolocationSupported,
  getCurrentPosition,
  watchPosition,
  clearWatch,
  calculateDistance,
  formatDistance,
  PROJECT_LOCATION,
  getDistanceFromProject,
  getGoogleMapsUrl,
  getDirectionsToProject,
  reverseGeocode,
  getLocationWithAddress,
  storeLocation,
  getStoredLocation,
  clearStoredLocation,
};
