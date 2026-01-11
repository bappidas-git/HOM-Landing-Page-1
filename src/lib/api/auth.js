/**
 * Auth API Service
 * Handles authentication-related API operations
 */

import axiosInstance, {
  apiRequest,
  setAuthToken,
  clearAuthToken,
  getAuthToken,
  isAuthenticated,
} from './axiosInstance';
import { AUTH_ENDPOINTS } from './endpoints';
import { setCookie, getCookie, deleteCookie } from 'cookies-next';

/**
 * Login with email and password
 * @param {string} email - User email
 * @param {string} password - User password
 * @param {boolean} remember - Remember me option
 * @returns {Promise} API response with user data
 */
export const login = async (email, password, remember = false) => {
  try {
    // For JSON Server mock, we need to validate against stored users
    const usersResponse = await axiosInstance.get('/users', {
      params: { email },
    });

    const users = usersResponse.data;

    if (users.length === 0) {
      return {
        success: false,
        error: 'Invalid email or password',
      };
    }

    const user = users[0];

    // Simple password check (in production, this would be hashed)
    if (user.password !== password) {
      return {
        success: false,
        error: 'Invalid email or password',
      };
    }

    // Generate a mock token (in production, this would come from the server)
    const token = generateMockToken(user);

    // Set the auth token
    setAuthToken(token, remember);

    // Store user data in cookie (without password)
    const userData = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      avatar: user.avatar,
    };

    setCookie('admin_user', JSON.stringify(userData), {
      path: '/',
      maxAge: remember ? 60 * 60 * 24 * 7 : undefined,
      secure: process.env.NEXT_PUBLIC_APP_ENV === 'production',
      sameSite: 'lax',
    });

    // Update last login
    await axiosInstance.patch(`/users/${user.id}`, {
      lastLogin: new Date().toISOString(),
    });

    return {
      success: true,
      data: userData,
      token,
    };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || error.message || 'Login failed',
    };
  }
};

/**
 * Logout current user
 * @returns {Promise} API response
 */
export const logout = async () => {
  try {
    // Clear auth tokens and user data
    clearAuthToken();

    return {
      success: true,
      message: 'Logged out successfully',
    };
  } catch (error) {
    // Still clear tokens even if there's an error
    clearAuthToken();

    return {
      success: true,
      message: 'Logged out',
    };
  }
};

/**
 * Get current authenticated user
 * @returns {Promise} API response with user data
 */
export const getCurrentUser = async () => {
  // First check if we have a stored user
  const storedUser = getCookie('admin_user');

  if (storedUser) {
    try {
      const userData = JSON.parse(storedUser);
      return {
        success: true,
        data: userData,
      };
    } catch {
      // Invalid stored data, clear it
      deleteCookie('admin_user');
    }
  }

  // If no stored user but we have a token, fetch from API
  if (isAuthenticated()) {
    return apiRequest(() => axiosInstance.get(AUTH_ENDPOINTS.CURRENT_USER));
  }

  return {
    success: false,
    error: 'Not authenticated',
  };
};

/**
 * Check if user is currently authenticated
 * @returns {boolean} Authentication status
 */
export const checkAuth = () => {
  return isAuthenticated();
};

/**
 * Get auth token
 * @returns {string|null} Current auth token
 */
export const getToken = () => {
  return getAuthToken();
};

/**
 * Validate current session
 * @returns {Promise} Validation result
 */
export const validateSession = async () => {
  if (!isAuthenticated()) {
    return {
      success: false,
      valid: false,
      error: 'No active session',
    };
  }

  try {
    const userResponse = await getCurrentUser();

    return {
      success: true,
      valid: userResponse.success,
      user: userResponse.data,
    };
  } catch (error) {
    return {
      success: false,
      valid: false,
      error: 'Session validation failed',
    };
  }
};

/**
 * Refresh authentication token
 * @returns {Promise} New token or error
 */
export const refreshToken = async () => {
  // For mock API, we just generate a new token
  const currentUser = await getCurrentUser();

  if (!currentUser.success) {
    return {
      success: false,
      error: 'Cannot refresh token - no active session',
    };
  }

  const newToken = generateMockToken(currentUser.data);
  setAuthToken(newToken, true);

  return {
    success: true,
    token: newToken,
  };
};

/**
 * Update user profile
 * @param {Object} profileData - Updated profile data
 * @returns {Promise} API response
 */
export const updateProfile = async (profileData) => {
  const currentUser = await getCurrentUser();

  if (!currentUser.success) {
    return {
      success: false,
      error: 'Not authenticated',
    };
  }

  const response = await apiRequest(() =>
    axiosInstance.patch(`/users/${currentUser.data.id}`, profileData)
  );

  if (response.success) {
    // Update stored user data
    const updatedUser = { ...currentUser.data, ...profileData };
    delete updatedUser.password;

    setCookie('admin_user', JSON.stringify(updatedUser), {
      path: '/',
      secure: process.env.NEXT_PUBLIC_APP_ENV === 'production',
      sameSite: 'lax',
    });
  }

  return response;
};

/**
 * Change user password
 * @param {string} currentPassword - Current password
 * @param {string} newPassword - New password
 * @returns {Promise} API response
 */
export const changePassword = async (currentPassword, newPassword) => {
  const currentUser = await getCurrentUser();

  if (!currentUser.success) {
    return {
      success: false,
      error: 'Not authenticated',
    };
  }

  // Verify current password
  const userResponse = await axiosInstance.get(`/users/${currentUser.data.id}`);
  const user = userResponse.data;

  if (user.password !== currentPassword) {
    return {
      success: false,
      error: 'Current password is incorrect',
    };
  }

  // Update password
  return apiRequest(() =>
    axiosInstance.patch(`/users/${currentUser.data.id}`, {
      password: newPassword,
    })
  );
};

/**
 * Generate a mock JWT token (for development)
 * @param {Object} user - User object
 * @returns {string} Mock token
 */
const generateMockToken = (user) => {
  const payload = {
    sub: user.id,
    email: user.email,
    role: user.role,
    iat: Date.now(),
    exp: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
  };

  // Create a simple base64 encoded token (NOT secure - for mock only)
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const body = btoa(JSON.stringify(payload));
  const signature = btoa('mock-signature');

  return `${header}.${body}.${signature}`;
};

/**
 * Parse token payload
 * @param {string} token - JWT token
 * @returns {Object|null} Decoded payload or null
 */
export const parseToken = (token) => {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const payload = JSON.parse(atob(parts[1]));
    return payload;
  } catch {
    return null;
  }
};

/**
 * Check if token is expired
 * @param {string} token - JWT token
 * @returns {boolean} True if expired
 */
export const isTokenExpired = (token) => {
  const payload = parseToken(token);
  if (!payload) return true;

  return Date.now() >= payload.exp;
};

export default {
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
};
