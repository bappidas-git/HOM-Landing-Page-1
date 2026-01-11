/**
 * Admin Layout Component
 * Main layout wrapper for all admin pages with sidebar and header
 */

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  CssBaseline,
  useTheme,
  useMediaQuery,
  CircularProgress,
} from '@mui/material';
import Sidebar from '../Sidebar';
import AdminHeader from '../AdminHeader';
import { useAuthContext, withAuth } from '@/context/AuthContext';
import styles from './AdminLayout.module.css';

// Sidebar width constants
const DRAWER_WIDTH_EXPANDED = 260;
const DRAWER_WIDTH_COLLAPSED = 72;
const HEADER_HEIGHT = 64;

/**
 * AdminLayout Component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Page content
 * @param {string} props.title - Page title (for document title)
 */
const AdminLayout = ({ children, title }) => {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { isAuthenticated, isLoading, isInitialized, user } = useAuthContext();

  // State
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [newLeadsCount, setNewLeadsCount] = useState(0);

  // Set document title
  useEffect(() => {
    if (title) {
      document.title = `${title} | Admin - District 25`;
    } else {
      document.title = 'Admin - District 25';
    }
  }, [title]);

  // Load sidebar collapsed state from localStorage
  useEffect(() => {
    const savedCollapsed = localStorage.getItem('admin_sidebar_collapsed');
    if (savedCollapsed) {
      setSidebarCollapsed(JSON.parse(savedCollapsed));
    }
  }, []);

  // Handle mobile drawer toggle
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Handle sidebar collapse toggle
  const handleSidebarCollapseToggle = () => {
    const newCollapsed = !sidebarCollapsed;
    setSidebarCollapsed(newCollapsed);
    localStorage.setItem('admin_sidebar_collapsed', JSON.stringify(newCollapsed));
  };

  // Handle dark mode toggle (placeholder - would need theme context)
  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
  };

  // Handle refresh data
  const handleRefresh = () => {
    // Trigger a page refresh or refetch data
    router.replace(router.asPath);
  };

  // Calculate sidebar width
  const sidebarWidth = isMobile
    ? 0
    : sidebarCollapsed
      ? DRAWER_WIDTH_COLLAPSED
      : DRAWER_WIDTH_EXPANDED;

  // Show loading state while checking auth
  if (!isInitialized || isLoading) {
    return (
      <Box className={styles.loadingContainer}>
        <CircularProgress size={48} color="primary" />
      </Box>
    );
  }

  // If not authenticated, return null (withAuth HOC will handle redirect)
  if (!isAuthenticated) {
    return null;
  }

  return (
    <Box className={styles.root}>
      <CssBaseline />

      {/* Header */}
      <Box
        sx={{
          marginLeft: { md: `${sidebarWidth}px` },
          transition: theme.transitions.create(['margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        }}
      >
        <AdminHeader
          onMenuClick={handleDrawerToggle}
          darkMode={darkMode}
          onToggleDarkMode={handleDarkModeToggle}
          onRefresh={handleRefresh}
        />
      </Box>

      {/* Sidebar */}
      <Sidebar
        open={mobileOpen}
        onClose={handleDrawerToggle}
        collapsed={sidebarCollapsed}
        onToggleCollapse={handleSidebarCollapseToggle}
        newLeadsCount={newLeadsCount}
      />

      {/* Main Content */}
      <Box
        component="main"
        className={styles.mainContent}
        sx={{
          marginLeft: { md: `${sidebarWidth}px` },
          width: { md: `calc(100% - ${sidebarWidth}px)` },
          marginTop: `${HEADER_HEIGHT}px`,
          transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        }}
      >
        <Box className={styles.contentWrapper}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};

// Export with auth protection
export default AdminLayout;

// Export a protected version of the layout
export const ProtectedAdminLayout = withAuth(AdminLayout);
