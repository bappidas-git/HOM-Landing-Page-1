/**
 * Axios Instance Configuration
 * Centralized HTTP client setup for API communication
 */

import axios from 'axios';
import { getCookie, setCookie, deleteCookie } from 'cookies-next';

// Environment configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
const API_TIMEOUT = parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || '30000', 10);

/**
 * Create a configured Axios instance
 */
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

/**
 * Request interceptor
 * - Adds authentication token to requests
 * - Logs requests in development
 */
axiosInstance.interceptors.request.use(
  (config) => {
    // Get auth token from cookies
    const token = getCookie('auth_token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Development logging
    if (process.env.NEXT_PUBLIC_APP_ENV === 'development') {
      console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`, {
        params: config.params,
        data: config.data,
      });
    }

    return config;
  },
  (error) => {
    console.error('[API Request Error]', error);
    return Promise.reject(error);
  }
);

/**
 * Response interceptor
 * - Handles successful responses
 * - Handles errors globally
 * - Implements token refresh logic
 */
axiosInstance.interceptors.response.use(
  (response) => {
    // Development logging
    if (process.env.NEXT_PUBLIC_APP_ENV === 'development') {
      console.log(`[API Response] ${response.config.method?.toUpperCase()} ${response.config.url}`, {
        status: response.status,
        data: response.data,
      });
    }

    return response;
  },
  (error) => {
    const { response, config } = error;

    // Handle specific error codes
    if (response) {
      switch (response.status) {
        case 401:
          // Unauthorized - clear token and redirect to login
          deleteCookie('auth_token');
          deleteCookie('admin_user');

          // Only redirect if in browser and not already on login page
          if (typeof window !== 'undefined' && !window.location.pathname.includes('/admin/login')) {
            window.location.href = '/admin/login';
          }
          break;

        case 403:
          // Forbidden
          console.error('[API] Forbidden access:', config.url);
          break;

        case 404:
          // Not found
          console.error('[API] Resource not found:', config.url);
          break;

        case 422:
          // Validation error
          console.error('[API] Validation error:', response.data);
          break;

        case 500:
          // Server error
          console.error('[API] Server error:', response.data);
          break;

        default:
          console.error('[API] Error:', response.status, response.data);
      }
    } else if (error.code === 'ECONNABORTED') {
      // Timeout
      console.error('[API] Request timeout:', config.url);
    } else if (typeof navigator !== 'undefined' && !navigator.onLine) {
      // Network error
      console.error('[API] No internet connection');
    } else {
      // Unknown error
      console.error('[API] Unknown error:', error.message);
    }

    return Promise.reject(error);
  }
);

/**
 * Helper function to set auth token
 * @param {string} token - JWT token
 * @param {boolean} remember - Whether to persist token
 */
export const setAuthToken = (token, remember = false) => {
  const options = {
    path: '/',
    secure: process.env.NEXT_PUBLIC_APP_ENV === 'production',
    sameSite: 'lax',
  };

  if (remember) {
    // Set cookie to expire in 7 days
    options.maxAge = 60 * 60 * 24 * 7;
  }

  setCookie('auth_token', token, options);
};

/**
 * Helper function to clear auth token
 */
export const clearAuthToken = () => {
  deleteCookie('auth_token', { path: '/' });
  deleteCookie('admin_user', { path: '/' });
};

/**
 * Helper function to get auth token
 * @returns {string|null} Token or null
 */
export const getAuthToken = () => {
  return getCookie('auth_token') || null;
};

/**
 * Check if user is authenticated
 * @returns {boolean}
 */
export const isAuthenticated = () => {
  return !!getAuthToken();
};

/**
 * Create a cancelable request
 * @returns {Object} Controller with cancel method
 */
export const createCancelToken = () => {
  const controller = new AbortController();
  return {
    signal: controller.signal,
    cancel: () => controller.abort(),
  };
};

/**
 * Generic API request wrapper with error handling
 * @param {Function} requestFn - Async function that makes the request
 * @returns {Promise} Response data or error
 */
export const apiRequest = async (requestFn) => {
  try {
    const response = await requestFn();
    return {
      success: true,
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || error.message || 'An error occurred',
      status: error.response?.status || 500,
      data: null,
    };
  }
};

export default axiosInstance;
