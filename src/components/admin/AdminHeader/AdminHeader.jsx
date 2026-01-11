/**
 * Admin Header Component
 * Top header bar for admin panel with user info, notifications, and actions
 */

import { useState } from 'react';
import { useRouter } from 'next/router';
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Tooltip,
  Badge,
  Breadcrumbs,
  Link as MuiLink,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  AccountCircle as AccountCircleIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon,
  Refresh as RefreshIcon,
  NavigateNext as NavigateNextIcon,
} from '@mui/icons-material';
import Link from 'next/link';
import { useAuthContext } from '@/context/AuthContext';
import { ADMIN_ROUTES } from '@/lib/constants';
import styles from './AdminHeader.module.css';

// Breadcrumb label mapping
const routeLabels = {
  '/admin/dashboard': 'Dashboard',
  '/admin/leads': 'Leads',
  '/admin/seo': 'SEO Settings',
  '/admin/pixels': 'Pixels & Tracking',
  '/admin/schema': 'Schema Markup',
  '/admin/keywords': 'Keywords',
  '/admin/settings': 'Settings',
  '/admin/audit-log': 'Audit Log',
};

/**
 * AdminHeader Component
 * @param {Object} props - Component props
 * @param {Function} props.onMenuClick - Menu button click handler (mobile)
 * @param {boolean} props.darkMode - Current dark mode state
 * @param {Function} props.onToggleDarkMode - Dark mode toggle handler
 * @param {Function} props.onRefresh - Refresh data handler
 */
const AdminHeader = ({
  onMenuClick,
  darkMode = false,
  onToggleDarkMode,
  onRefresh,
}) => {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { user, logout } = useAuthContext();

  // Menu states
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationAnchor, setNotificationAnchor] = useState(null);

  // Handle user menu
  const handleOpenUserMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorEl(null);
  };

  // Handle notification menu
  const handleOpenNotifications = (event) => {
    setNotificationAnchor(event.currentTarget);
  };

  const handleCloseNotifications = () => {
    setNotificationAnchor(null);
  };

  // Handle logout
  const handleLogout = async () => {
    handleCloseUserMenu();
    await logout(true);
  };

  // Handle settings navigation
  const handleSettings = () => {
    handleCloseUserMenu();
    router.push(ADMIN_ROUTES.SETTINGS);
  };

  // Generate breadcrumbs from current path
  const generateBreadcrumbs = () => {
    const pathSegments = router.pathname.split('/').filter(Boolean);
    const breadcrumbs = [];

    let currentPath = '';
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;

      // Skip dynamic segments like [id]
      if (segment.startsWith('[')) {
        return;
      }

      const label = routeLabels[currentPath] || segment.charAt(0).toUpperCase() + segment.slice(1);

      if (index === pathSegments.length - 1 || segment.startsWith('[')) {
        // Last item - current page
        breadcrumbs.push(
          <Typography key={currentPath} color="text.primary" variant="body2">
            {label}
          </Typography>
        );
      } else {
        // Link to parent pages
        breadcrumbs.push(
          <Link key={currentPath} href={currentPath} passHref legacyBehavior>
            <MuiLink underline="hover" color="inherit" variant="body2">
              {label}
            </MuiLink>
          </Link>
        );
      }
    });

    return breadcrumbs;
  };

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user?.name) return 'A';
    const names = user.name.split(' ');
    if (names.length >= 2) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase();
    }
    return names[0][0].toUpperCase();
  };

  // Get page title from current route
  const getPageTitle = () => {
    const path = router.pathname;

    // Handle dynamic routes
    if (path.includes('/leads/[id]')) {
      return 'Lead Details';
    }

    return routeLabels[path] || 'Admin Panel';
  };

  return (
    <AppBar
      position="fixed"
      className={styles.appBar}
      elevation={0}
      sx={{
        backgroundColor: 'background.paper',
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Toolbar className={styles.toolbar}>
        {/* Left Section - Menu Button & Breadcrumbs */}
        <Box className={styles.leftSection}>
          {/* Mobile Menu Button */}
          {isMobile && (
            <IconButton
              edge="start"
              color="default"
              aria-label="open menu"
              onClick={onMenuClick}
              className={styles.menuButton}
            >
              <MenuIcon />
            </IconButton>
          )}

          {/* Page Title & Breadcrumbs */}
          <Box className={styles.titleSection}>
            <Typography variant="h6" className={styles.pageTitle}>
              {getPageTitle()}
            </Typography>

            {!isMobile && (
              <Breadcrumbs
                separator={<NavigateNextIcon fontSize="small" />}
                aria-label="breadcrumb"
                className={styles.breadcrumbs}
              >
                {generateBreadcrumbs()}
              </Breadcrumbs>
            )}
          </Box>
        </Box>

        {/* Right Section - Actions & User */}
        <Box className={styles.rightSection}>
          {/* Refresh Button */}
          {onRefresh && (
            <Tooltip title="Refresh Data">
              <IconButton
                color="default"
                onClick={onRefresh}
                className={styles.actionButton}
              >
                <RefreshIcon />
              </IconButton>
            </Tooltip>
          )}

          {/* Dark Mode Toggle */}
          {onToggleDarkMode && (
            <Tooltip title={darkMode ? 'Light Mode' : 'Dark Mode'}>
              <IconButton
                color="default"
                onClick={onToggleDarkMode}
                className={styles.actionButton}
              >
                {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
              </IconButton>
            </Tooltip>
          )}

          {/* Notifications */}
          <Tooltip title="Notifications">
            <IconButton
              color="default"
              onClick={handleOpenNotifications}
              className={styles.actionButton}
            >
              <Badge badgeContent={3} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Tooltip>

          {/* Notification Menu */}
          <Menu
            anchorEl={notificationAnchor}
            open={Boolean(notificationAnchor)}
            onClose={handleCloseNotifications}
            PaperProps={{
              className: styles.notificationMenu,
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <Box className={styles.notificationHeader}>
              <Typography variant="subtitle1" fontWeight={600}>
                Notifications
              </Typography>
            </Box>
            <Divider />
            <MenuItem onClick={handleCloseNotifications}>
              <ListItemText
                primary="New lead received"
                secondary="2 minutes ago"
                primaryTypographyProps={{ variant: 'body2' }}
                secondaryTypographyProps={{ variant: 'caption' }}
              />
            </MenuItem>
            <MenuItem onClick={handleCloseNotifications}>
              <ListItemText
                primary="Site visit scheduled"
                secondary="1 hour ago"
                primaryTypographyProps={{ variant: 'body2' }}
                secondaryTypographyProps={{ variant: 'caption' }}
              />
            </MenuItem>
            <MenuItem onClick={handleCloseNotifications}>
              <ListItemText
                primary="Lead converted"
                secondary="3 hours ago"
                primaryTypographyProps={{ variant: 'body2' }}
                secondaryTypographyProps={{ variant: 'caption' }}
              />
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleCloseNotifications} className={styles.viewAllLink}>
              <Typography variant="body2" color="primary" align="center" width="100%">
                View All Notifications
              </Typography>
            </MenuItem>
          </Menu>

          {/* User Menu */}
          <Box className={styles.userSection}>
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleOpenUserMenu}
                className={styles.userButton}
              >
                <Avatar
                  className={styles.avatar}
                  src={user?.avatar}
                  alt={user?.name}
                >
                  {getUserInitials()}
                </Avatar>
                {!isMobile && (
                  <Box className={styles.userInfo}>
                    <Typography variant="body2" className={styles.userName}>
                      {user?.name || 'Admin'}
                    </Typography>
                    <Typography variant="caption" className={styles.userRole}>
                      {user?.role || 'Administrator'}
                    </Typography>
                  </Box>
                )}
              </IconButton>
            </Tooltip>

            {/* User Dropdown Menu */}
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleCloseUserMenu}
              PaperProps={{
                className: styles.userMenu,
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <Box className={styles.userMenuHeader}>
                <Avatar
                  className={styles.menuAvatar}
                  src={user?.avatar}
                  alt={user?.name}
                >
                  {getUserInitials()}
                </Avatar>
                <Box>
                  <Typography variant="subtitle2">
                    {user?.name || 'Admin'}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {user?.email || 'admin@realestate.com'}
                  </Typography>
                </Box>
              </Box>

              <Divider />

              <MenuItem onClick={handleSettings}>
                <ListItemIcon>
                  <SettingsIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Settings" />
              </MenuItem>

              <Divider />

              <MenuItem onClick={handleLogout} className={styles.logoutMenuItem}>
                <ListItemIcon>
                  <LogoutIcon fontSize="small" color="error" />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </MenuItem>
            </Menu>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AdminHeader;
