/**
 * Admin Sidebar Navigation Component
 * Collapsible sidebar with navigation items for admin panel
 */

import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Divider,
  Typography,
  IconButton,
  Badge,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Search as SearchIcon,
  Analytics as AnalyticsIcon,
  Code as CodeIcon,
  VpnKey as KeyIcon,
  Settings as SettingsIcon,
  History as HistoryIcon,
  Logout as LogoutIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  OpenInNew as OpenInNewIcon,
} from '@mui/icons-material';
import { useAuthContext } from '@/context/AuthContext';
import { ADMIN_NAV_ITEMS, ADMIN_ROUTES } from '@/lib/constants';
import styles from './Sidebar.module.css';

// Icon mapping for navigation items
const iconMap = {
  Dashboard: DashboardIcon,
  People: PeopleIcon,
  Search: SearchIcon,
  Analytics: AnalyticsIcon,
  Code: CodeIcon,
  Key: KeyIcon,
  Settings: SettingsIcon,
  History: HistoryIcon,
};

// Sidebar width constants
const DRAWER_WIDTH_EXPANDED = 260;
const DRAWER_WIDTH_COLLAPSED = 72;

/**
 * Sidebar Component
 * @param {Object} props - Component props
 * @param {boolean} props.open - Whether sidebar is open (mobile)
 * @param {Function} props.onClose - Close handler for mobile drawer
 * @param {boolean} props.collapsed - Whether sidebar is collapsed
 * @param {Function} props.onToggleCollapse - Toggle collapse handler
 * @param {number} props.newLeadsCount - Count of new leads for badge
 */
const Sidebar = ({
  open = true,
  onClose,
  collapsed = false,
  onToggleCollapse,
  newLeadsCount = 0,
}) => {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { logout } = useAuthContext();

  // Handle navigation item click
  const handleNavClick = (href) => {
    if (isMobile && onClose) {
      onClose();
    }
    router.push(href);
  };

  // Handle logout
  const handleLogout = async () => {
    await logout(true);
  };

  // Check if route is active
  const isActiveRoute = (href) => {
    if (href === ADMIN_ROUTES.LEADS) {
      return router.pathname.startsWith('/admin/leads');
    }
    return router.pathname === href;
  };

  // Render icon for navigation item
  const renderIcon = (iconName) => {
    const IconComponent = iconMap[iconName];
    return IconComponent ? <IconComponent /> : null;
  };

  // Sidebar content
  const sidebarContent = (
    <Box className={styles.sidebarContainer}>
      {/* Logo Section */}
      <Box className={styles.logoSection}>
        {!collapsed && (
          <Box className={styles.logoWrapper}>
            <Typography variant="h6" className={styles.logoText}>
              District 25
            </Typography>
            <Typography variant="caption" className={styles.logoSubtext}>
              Admin Panel
            </Typography>
          </Box>
        )}
        {collapsed && (
          <Typography variant="h6" className={styles.logoTextCollapsed}>
            D25
          </Typography>
        )}

        {/* Collapse Toggle Button (Desktop only) */}
        {!isMobile && (
          <IconButton
            onClick={onToggleCollapse}
            className={styles.collapseButton}
            size="small"
          >
            {collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        )}
      </Box>

      <Divider className={styles.divider} />

      {/* Navigation Items */}
      <List className={styles.navList}>
        {ADMIN_NAV_ITEMS.map((item) => {
          const isActive = isActiveRoute(item.href);
          const showBadge = item.badge && newLeadsCount > 0;

          const navButton = (
            <ListItemButton
              onClick={() => handleNavClick(item.href)}
              className={`${styles.navButton} ${isActive ? styles.navButtonActive : ''}`}
              sx={{
                justifyContent: collapsed ? 'center' : 'flex-start',
                px: collapsed ? 2 : 3,
              }}
            >
              <ListItemIcon
                className={styles.navIcon}
                sx={{
                  minWidth: collapsed ? 0 : 40,
                  mr: collapsed ? 0 : 2,
                }}
              >
                {showBadge ? (
                  <Badge badgeContent={newLeadsCount} color="error" max={99}>
                    {renderIcon(item.icon)}
                  </Badge>
                ) : (
                  renderIcon(item.icon)
                )}
              </ListItemIcon>
              {!collapsed && (
                <ListItemText
                  primary={item.label}
                  className={styles.navText}
                  primaryTypographyProps={{
                    variant: 'body2',
                    fontWeight: isActive ? 600 : 400,
                  }}
                />
              )}
            </ListItemButton>
          );

          return (
            <ListItem key={item.id} disablePadding className={styles.navItem}>
              {collapsed ? (
                <Tooltip title={item.label} placement="right" arrow>
                  {navButton}
                </Tooltip>
              ) : (
                navButton
              )}
            </ListItem>
          );
        })}
      </List>

      {/* Bottom Section */}
      <Box className={styles.bottomSection}>
        <Divider className={styles.divider} />

        {/* View Site Link */}
        <ListItem disablePadding>
          {collapsed ? (
            <Tooltip title="View Site" placement="right" arrow>
              <ListItemButton
                component="a"
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.navButton}
                sx={{ justifyContent: 'center', px: 2 }}
              >
                <ListItemIcon className={styles.navIcon} sx={{ minWidth: 0 }}>
                  <OpenInNewIcon />
                </ListItemIcon>
              </ListItemButton>
            </Tooltip>
          ) : (
            <ListItemButton
              component="a"
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.navButton}
              sx={{ px: 3 }}
            >
              <ListItemIcon className={styles.navIcon} sx={{ minWidth: 40, mr: 2 }}>
                <OpenInNewIcon />
              </ListItemIcon>
              <ListItemText
                primary="View Site"
                primaryTypographyProps={{ variant: 'body2' }}
              />
            </ListItemButton>
          )}
        </ListItem>

        {/* Logout Button */}
        <ListItem disablePadding>
          {collapsed ? (
            <Tooltip title="Logout" placement="right" arrow>
              <ListItemButton
                onClick={handleLogout}
                className={`${styles.navButton} ${styles.logoutButton}`}
                sx={{ justifyContent: 'center', px: 2 }}
              >
                <ListItemIcon className={styles.navIcon} sx={{ minWidth: 0 }}>
                  <LogoutIcon />
                </ListItemIcon>
              </ListItemButton>
            </Tooltip>
          ) : (
            <ListItemButton
              onClick={handleLogout}
              className={`${styles.navButton} ${styles.logoutButton}`}
              sx={{ px: 3 }}
            >
              <ListItemIcon className={styles.navIcon} sx={{ minWidth: 40, mr: 2 }}>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText
                primary="Logout"
                primaryTypographyProps={{ variant: 'body2' }}
              />
            </ListItemButton>
          )}
        </ListItem>
      </Box>
    </Box>
  );

  // Mobile Drawer
  if (isMobile) {
    return (
      <Drawer
        variant="temporary"
        open={open}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH_EXPANDED,
            boxSizing: 'border-box',
            borderRight: 'none',
            borderRadius: 0,
          },
        }}
        className={styles.mobileDrawer}
      >
        {sidebarContent}
      </Drawer>
    );
  }

  // Desktop Drawer
  return (
    <Drawer
      variant="permanent"
      open
      sx={{
        width: collapsed ? DRAWER_WIDTH_COLLAPSED : DRAWER_WIDTH_EXPANDED,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: collapsed ? DRAWER_WIDTH_COLLAPSED : DRAWER_WIDTH_EXPANDED,
          boxSizing: 'border-box',
          borderRight: '1px solid',
          borderColor: 'divider',
          borderRadius: 0,
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
          overflowX: 'hidden',
        },
      }}
      className={styles.desktopDrawer}
    >
      {sidebarContent}
    </Drawer>
  );
};

export default Sidebar;
