/**
 * Authentication Context Provider
 * Manages user authentication state across the application
 */

import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter } from 'next/router';
import {
  login as apiLogin,
  logout as apiLogout,
  getCurrentUser,
  validateSession,
  checkAuth,
  refreshToken,
} from '@/lib/api/auth';
import { ADMIN_ROUTES } from '@/lib/constants';

/**
 * Authentication Context
 */
const AuthContext = createContext(null);

/**
 * Authentication Provider Component
 */
export const AuthProvider = ({ children }) => {
  const router = useRouter();

  // State
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);

  /**
   * Initialize authentication state on mount
   */
  useEffect(() => {
    const initAuth = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Check if user is authenticated
        if (checkAuth()) {
          const sessionResult = await validateSession();

          if (sessionResult.valid && sessionResult.user) {
            setUser(sessionResult.user);
            setIsAuthenticated(true);
          } else {
            // Session invalid, clear state
            setUser(null);
            setIsAuthenticated(false);
          }
        } else {
          setUser(null);
          setIsAuthenticated(false);
        }
      } catch (err) {
        console.error('[AuthContext] Init error:', err.message);
        setError(err.message);
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
        setIsInitialized(true);
      }
    };

    initAuth();
  }, []);

  /**
   * Login user
   * @param {string} email - User email
   * @param {string} password - User password
   * @param {boolean} remember - Remember me option
   * @returns {Promise<Object>} Login result
   */
  const login = useCallback(async (email, password, remember = false) => {
    try {
      setIsLoading(true);
      setError(null);

      const result = await apiLogin(email, password, remember);

      if (result.success) {
        setUser(result.data);
        setIsAuthenticated(true);
        return { success: true, user: result.data };
      } else {
        setError(result.error);
        return { success: false, error: result.error };
      }
    } catch (err) {
      const errorMessage = err.message || 'Login failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Logout user
   * @param {boolean} redirect - Whether to redirect to login page
   */
  const logout = useCallback(async (redirect = true) => {
    try {
      setIsLoading(true);
      await apiLogout();
    } catch (err) {
      console.error('[AuthContext] Logout error:', err.message);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
      setError(null);
      setIsLoading(false);

      if (redirect) {
        router.push(ADMIN_ROUTES.LOGIN);
      }
    }
  }, [router]);

  /**
   * Refresh user data from server
   */
  const refreshUser = useCallback(async () => {
    try {
      setIsLoading(true);
      const result = await getCurrentUser();

      if (result.success) {
        setUser(result.data);
        return { success: true, user: result.data };
      } else {
        return { success: false, error: result.error };
      }
    } catch (err) {
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Refresh authentication token
   */
  const refreshAuthToken = useCallback(async () => {
    try {
      const result = await refreshToken();
      return result;
    } catch (err) {
      return { success: false, error: err.message };
    }
  }, []);

  /**
   * Clear authentication error
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  /**
   * Check if user has a specific role
   * @param {string} role - Role to check
   * @returns {boolean} True if user has role
   */
  const hasRole = useCallback((role) => {
    if (!user) return false;
    return user.role === role;
  }, [user]);

  /**
   * Check if user is admin
   * @returns {boolean} True if user is admin
   */
  const isAdmin = useMemo(() => {
    return hasRole('admin');
  }, [hasRole]);

  /**
   * Context value
   */
  const value = useMemo(() => ({
    // State
    user,
    isAuthenticated,
    isLoading,
    error,
    isInitialized,
    isAdmin,

    // Actions
    login,
    logout,
    refreshUser,
    refreshAuthToken,
    clearError,
    hasRole,
  }), [
    user,
    isAuthenticated,
    isLoading,
    error,
    isInitialized,
    isAdmin,
    login,
    logout,
    refreshUser,
    refreshAuthToken,
    clearError,
    hasRole,
  ]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Hook to use authentication context
 * @returns {Object} Auth context value
 * @throws {Error} If used outside of AuthProvider
 */
export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }

  return context;
};

/**
 * Higher Order Component for protected routes
 * @param {React.Component} Component - Component to wrap
 * @param {Object} options - Options
 * @param {string} options.redirectTo - Redirect path if not authenticated
 * @returns {React.Component} Wrapped component
 */
export const withAuth = (Component, options = {}) => {
  const { redirectTo = ADMIN_ROUTES.LOGIN } = options;

  const WrappedComponent = (props) => {
    const { isAuthenticated, isLoading, isInitialized } = useAuthContext();
    const router = useRouter();

    useEffect(() => {
      if (isInitialized && !isLoading && !isAuthenticated) {
        router.replace(redirectTo);
      }
    }, [isAuthenticated, isLoading, isInitialized, router]);

    // Show nothing while checking auth
    if (!isInitialized || isLoading) {
      return null;
    }

    // Show nothing if not authenticated (will redirect)
    if (!isAuthenticated) {
      return null;
    }

    return <Component {...props} />;
  };

  WrappedComponent.displayName = `withAuth(${Component.displayName || Component.name || 'Component'})`;

  return WrappedComponent;
};

// Note: AuthContext is not exported as default to prevent Fast Refresh issues
// Use useAuthContext hook or AuthProvider instead
