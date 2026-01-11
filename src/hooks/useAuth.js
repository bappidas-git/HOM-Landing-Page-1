/**
 * useAuth Hook
 * Custom hook for authentication functionality
 * Wraps AuthContext with additional utility functions
 */

import { useCallback, useMemo } from 'react';
import { useRouter } from 'next/router';
import { useAuthContext } from '@/context/AuthContext';
import { ADMIN_ROUTES, PUBLIC_ROUTES } from '@/lib/constants';

/**
 * useAuth Hook
 * Provides authentication state and actions
 * @returns {Object} Auth state and methods
 */
const useAuth = () => {
  const router = useRouter();
  const authContext = useAuthContext();

  const {
    user,
    isAuthenticated,
    isLoading,
    error,
    isInitialized,
    isAdmin,
    login: contextLogin,
    logout: contextLogout,
    refreshUser,
    refreshAuthToken,
    clearError,
    hasRole,
  } = authContext;

  /**
   * Login and redirect to dashboard
   * @param {string} email - User email
   * @param {string} password - User password
   * @param {boolean} remember - Remember me option
   * @param {string} redirectTo - Path to redirect after login
   * @returns {Promise<Object>} Login result
   */
  const login = useCallback(async (email, password, remember = false, redirectTo = ADMIN_ROUTES.DASHBOARD) => {
    const result = await contextLogin(email, password, remember);

    if (result.success && redirectTo) {
      router.push(redirectTo);
    }

    return result;
  }, [contextLogin, router]);

  /**
   * Logout and redirect
   * @param {string} redirectTo - Path to redirect after logout
   */
  const logout = useCallback(async (redirectTo = ADMIN_ROUTES.LOGIN) => {
    await contextLogout(false);

    if (redirectTo) {
      router.push(redirectTo);
    }
  }, [contextLogout, router]);

  /**
   * Redirect if authenticated
   * @param {string} redirectTo - Path to redirect if authenticated
   */
  const redirectIfAuthenticated = useCallback((redirectTo = ADMIN_ROUTES.DASHBOARD) => {
    if (isInitialized && !isLoading && isAuthenticated) {
      router.replace(redirectTo);
    }
  }, [isInitialized, isLoading, isAuthenticated, router]);

  /**
   * Redirect if not authenticated
   * @param {string} redirectTo - Path to redirect if not authenticated
   */
  const redirectIfNotAuthenticated = useCallback((redirectTo = ADMIN_ROUTES.LOGIN) => {
    if (isInitialized && !isLoading && !isAuthenticated) {
      router.replace(redirectTo);
    }
  }, [isInitialized, isLoading, isAuthenticated, router]);

  /**
   * Get user display name
   * @returns {string} User name or 'Guest'
   */
  const displayName = useMemo(() => {
    if (!user) return 'Guest';
    return user.name || user.email || 'User';
  }, [user]);

  /**
   * Get user initials
   * @returns {string} User initials
   */
  const initials = useMemo(() => {
    if (!user || !user.name) return 'U';

    const names = user.name.split(' ');
    if (names.length >= 2) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase();
    }
    return names[0][0].toUpperCase();
  }, [user]);

  /**
   * Get user avatar URL or fallback
   * @returns {string|null} Avatar URL or null
   */
  const avatarUrl = useMemo(() => {
    if (!user) return null;
    return user.avatar || null;
  }, [user]);

  /**
   * Check if user can access admin panel
   * @returns {boolean} True if user can access admin
   */
  const canAccessAdmin = useMemo(() => {
    return isAuthenticated && isAdmin;
  }, [isAuthenticated, isAdmin]);

  /**
   * Check multiple roles
   * @param {string[]} roles - Array of roles to check
   * @returns {boolean} True if user has any of the roles
   */
  const hasAnyRole = useCallback((roles) => {
    if (!user || !roles || roles.length === 0) return false;
    return roles.some((role) => hasRole(role));
  }, [user, hasRole]);

  /**
   * Check if session needs refresh
   * @param {number} thresholdMinutes - Minutes before expiry to trigger refresh
   * @returns {boolean} True if session should be refreshed
   */
  const shouldRefreshSession = useCallback((thresholdMinutes = 30) => {
    // Implementation would check token expiry
    // For now, return false as we're using mock auth
    return false;
  }, []);

  return {
    // State
    user,
    isAuthenticated,
    isLoading,
    error,
    isInitialized,
    isAdmin,
    displayName,
    initials,
    avatarUrl,
    canAccessAdmin,

    // Actions
    login,
    logout,
    refreshUser,
    refreshAuthToken,
    clearError,
    hasRole,
    hasAnyRole,
    redirectIfAuthenticated,
    redirectIfNotAuthenticated,
    shouldRefreshSession,
  };
};

export default useAuth;
