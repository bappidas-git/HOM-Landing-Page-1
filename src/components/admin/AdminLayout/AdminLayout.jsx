/**
 * Admin Layout Component
 * Main layout wrapper for all admin pages - Matching reference code design
 */

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Menu,
  MenuItem,
  useTheme,
  useMediaQuery,
  Tooltip,
  Badge,
  Popover,
  Chip,
  CircularProgress,
  Button,
} from '@mui/material';
import { Icon } from '@iconify/react';
import { useAuthContext, withAuth } from '@/context/AuthContext';
import { ADMIN_ROUTES } from '@/lib/constants';

const drawerWidth = 260;

const menuItems = [
  {
    title: 'Dashboard',
    icon: 'mdi:view-dashboard',
    path: '/admin/dashboard',
  },
  {
    title: 'Leads',
    icon: 'mdi:account-group',
    path: '/admin/leads',
  },
  {
    title: 'SEO Settings',
    icon: 'mdi:magnify',
    path: '/admin/seo',
  },
  {
    title: 'Pixels & Tracking',
    icon: 'mdi:chart-bar',
    path: '/admin/pixels',
  },
  {
    title: 'Schema Markup',
    icon: 'mdi:code-tags',
    path: '/admin/schema',
  },
  {
    title: 'Keywords',
    icon: 'mdi:key-variant',
    path: '/admin/keywords',
  },
  {
    title: 'Settings',
    icon: 'mdi:cog',
    path: '/admin/settings',
  },
];

/**
 * AdminLayout Component
 */
const AdminLayout = ({ children, title }) => {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { user, logout, isAuthenticated, isLoading, isInitialized } = useAuthContext();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationAnchor, setNotificationAnchor] = useState(null);
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'lead', title: 'New Lead', message: 'Rahul Kumar submitted a form', time: '2 min ago', status: 'new' },
    { id: 2, type: 'lead', title: 'Site Visit', message: 'Priya scheduled a visit', time: '1 hour ago', status: 'pending' },
    { id: 3, type: 'lead', title: 'Converted', message: 'Amit Singh converted', time: '3 hours ago', status: 'success' },
  ]);

  // Set document title
  useEffect(() => {
    if (title) {
      document.title = `${title} | Admin - District 25`;
    } else {
      document.title = 'Admin - District 25';
    }
  }, [title]);

  // Redirect to login if not authenticated
  if (!isInitialized || isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          bgcolor: '#f5f7fa',
        }}
      >
        <CircularProgress size={48} />
      </Box>
    );
  }

  if (!isAuthenticated) {
    router.replace('/admin/login');
    return null;
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationClick = (event) => {
    setNotificationAnchor(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setNotificationAnchor(null);
  };

  const handleLogout = async () => {
    handleMenuClose();
    await logout(true);
    router.push('/admin/login');
  };

  const handleClearAllNotifications = () => {
    setNotifications([]);
  };

  const formatTimeAgo = (time) => time;

  const drawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Logo Section */}
      <Box
        sx={{
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 800,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          District 25
        </Typography>
      </Box>
      <Typography
        variant="caption"
        sx={{ textAlign: 'center', color: 'text.secondary', mt: -1, mb: 1 }}
      >
        Admin Panel
      </Typography>

      <Divider />

      {/* Navigation Menu */}
      <List sx={{ flex: 1, px: 1, py: 2 }}>
        {menuItems.map((item) => {
          const isActive = router.pathname === item.path ||
            (item.path === '/admin/leads' && router.pathname.startsWith('/admin/leads'));
          return (
            <ListItem key={item.path} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                onClick={() => {
                  router.push(item.path);
                  if (isMobile) setMobileOpen(false);
                }}
                sx={{
                  borderRadius: 2,
                  mx: 0.5,
                  bgcolor: isActive
                    ? 'rgba(102, 126, 234, 0.1)'
                    : 'transparent',
                  color: isActive ? 'primary.main' : 'text.primary',
                  '&:hover': {
                    bgcolor: 'rgba(102, 126, 234, 0.08)',
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 40,
                    color: isActive ? '#667eea' : 'text.secondary',
                  }}
                >
                  <Icon icon={item.icon} style={{ fontSize: 22 }} />
                </ListItemIcon>
                <ListItemText
                  primary={item.title}
                  primaryTypographyProps={{
                    fontWeight: isActive ? 600 : 400,
                    fontSize: '0.95rem',
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      <Divider />

      {/* View Site Button */}
      <Box sx={{ p: 2 }}>
        <ListItemButton
          onClick={() => window.open('/', '_blank')}
          sx={{
            borderRadius: 2,
            border: '1px solid',
            borderColor: 'divider',
            '&:hover': {
              bgcolor: 'rgba(0, 0, 0, 0.04)',
            },
          }}
        >
          <ListItemIcon sx={{ minWidth: 40 }}>
            <Icon icon="mdi:open-in-new" style={{ fontSize: 22 }} />
          </ListItemIcon>
          <ListItemText
            primary="View Site"
            primaryTypographyProps={{ fontSize: '0.9rem' }}
          />
        </ListItemButton>
      </Box>

      {/* Logout Button */}
      <Box sx={{ px: 2, pb: 2 }}>
        <ListItemButton
          onClick={handleLogout}
          sx={{
            borderRadius: 2,
            color: 'error.main',
            '&:hover': {
              bgcolor: 'rgba(244, 67, 54, 0.08)',
            },
          }}
        >
          <ListItemIcon sx={{ minWidth: 40, color: 'error.main' }}>
            <Icon icon="mdi:logout" style={{ fontSize: 22 }} />
          </ListItemIcon>
          <ListItemText
            primary="Logout"
            primaryTypographyProps={{ fontSize: '0.9rem' }}
          />
        </ListItemButton>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* App Bar */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
          bgcolor: '#fff',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' }, color: 'text.primary' }}
          >
            <Icon icon="mdi:menu" />
          </IconButton>

          {/* Breadcrumb */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 700,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              D25
            </Typography>
            <Icon icon="mdi:chevron-right" style={{ color: '#9e9e9e', fontSize: 18 }} />
            <Typography variant="body2" color="text.primary" fontWeight={500}>
              {title || 'Dashboard'}
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          {/* Refresh Button */}
          <Tooltip title="Refresh">
            <IconButton sx={{ color: 'text.primary' }} onClick={() => router.replace(router.asPath)}>
              <Icon icon="mdi:refresh" />
            </IconButton>
          </Tooltip>

          {/* Dark Mode Toggle - Placeholder */}
          <Tooltip title="Theme">
            <IconButton sx={{ color: 'text.primary' }}>
              <Icon icon="mdi:weather-night" />
            </IconButton>
          </Tooltip>

          {/* Notifications */}
          <Tooltip title="Notifications">
            <IconButton
              sx={{ color: 'text.primary', ml: 1 }}
              onClick={handleNotificationClick}
            >
              <Badge badgeContent={notifications.length} color="error">
                <Icon icon="mdi:bell-outline" />
              </Badge>
            </IconButton>
          </Tooltip>

          {/* Notification Popover */}
          <Popover
            open={Boolean(notificationAnchor)}
            anchorEl={notificationAnchor}
            onClose={handleNotificationClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            PaperProps={{
              sx: {
                mt: 1,
                width: 360,
                maxHeight: 480,
                borderRadius: 2,
                overflow: 'hidden',
              },
            }}
          >
            {/* Header */}
            <Box
              sx={{
                p: 2,
                borderBottom: '1px solid',
                borderColor: 'divider',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Notifications
                </Typography>
                <Chip
                  label={notifications.length}
                  size="small"
                  color="primary"
                  sx={{ height: 22, fontSize: '0.75rem' }}
                />
              </Box>
              {notifications.length > 0 && (
                <Button
                  size="small"
                  onClick={handleClearAllNotifications}
                  sx={{
                    fontSize: '0.75rem',
                    textTransform: 'none',
                    color: 'error.main',
                    minWidth: 'auto',
                    p: 0.5,
                  }}
                  startIcon={<Icon icon="mdi:notification-clear-all" style={{ fontSize: 16 }} />}
                >
                  Clear All
                </Button>
              )}
            </Box>

            {/* Notification List */}
            <Box sx={{ maxHeight: 320, overflow: 'auto' }}>
              {notifications.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <Icon
                    icon="mdi:bell-check-outline"
                    style={{ fontSize: 48, color: '#9e9e9e' }}
                  />
                  <Typography color="text.secondary" sx={{ mt: 1 }}>
                    No new notifications
                  </Typography>
                </Box>
              ) : (
                notifications.map((notification) => (
                  <Box
                    key={notification.id}
                    onClick={() => {
                      router.push('/admin/leads');
                      handleNotificationClose();
                    }}
                    sx={{
                      p: 2,
                      borderBottom: '1px solid',
                      borderColor: 'divider',
                      cursor: 'pointer',
                      '&:hover': {
                        bgcolor: 'rgba(0, 0, 0, 0.02)',
                      },
                    }}
                  >
                    <Box sx={{ display: 'flex', gap: 1.5 }}>
                      <Avatar
                        sx={{
                          width: 40,
                          height: 40,
                          bgcolor: 'rgba(33, 150, 243, 0.15)',
                          color: '#2196f3',
                        }}
                      >
                        <Icon icon="mdi:account-plus" style={{ fontSize: 20 }} />
                      </Avatar>
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            mb: 0.25,
                          }}
                        >
                          <Typography variant="body2" fontWeight={600}>
                            {notification.title}
                          </Typography>
                          <Chip
                            label={notification.status}
                            size="small"
                            sx={{
                              height: 20,
                              fontSize: '0.65rem',
                              textTransform: 'capitalize',
                              bgcolor:
                                notification.status === 'new'
                                  ? 'rgba(33, 150, 243, 0.15)'
                                  : notification.status === 'pending'
                                  ? 'rgba(255, 152, 0, 0.15)'
                                  : 'rgba(76, 175, 80, 0.15)',
                              color:
                                notification.status === 'new'
                                  ? '#2196f3'
                                  : notification.status === 'pending'
                                  ? '#ff9800'
                                  : '#4caf50',
                            }}
                          />
                        </Box>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{
                            display: 'block',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {notification.message}
                        </Typography>
                        <Typography
                          variant="caption"
                          color="text.disabled"
                          sx={{ fontSize: '0.7rem' }}
                        >
                          {formatTimeAgo(notification.time)}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                ))
              )}
            </Box>

            {/* Footer */}
            {notifications.length > 0 && (
              <Box
                sx={{
                  p: 1.5,
                  borderTop: '1px solid',
                  borderColor: 'divider',
                  textAlign: 'center',
                }}
              >
                <Typography
                  variant="caption"
                  color="primary"
                  sx={{
                    cursor: 'pointer',
                    fontWeight: 500,
                    '&:hover': { textDecoration: 'underline' },
                  }}
                  onClick={() => {
                    router.push('/admin/leads');
                    handleNotificationClose();
                  }}
                >
                  View All Leads
                </Typography>
              </Box>
            )}
          </Popover>

          {/* User Menu */}
          <IconButton onClick={handleMenuClick} sx={{ ml: 2 }}>
            <Avatar
              sx={{
                width: 36,
                height: 36,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                fontSize: '0.9rem',
              }}
            >
              {user?.name?.[0] || 'A'}
            </Avatar>
          </IconButton>

          {/* User Info (Desktop) */}
          {!isMobile && (
            <Box sx={{ ml: 1, display: { xs: 'none', sm: 'block' } }}>
              <Typography variant="body2" fontWeight={600}>
                {user?.name || 'Admin User'}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Admin
              </Typography>
            </Box>
          )}

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            PaperProps={{
              sx: {
                mt: 1,
                minWidth: 180,
                borderRadius: 2,
              },
            }}
          >
            <Box sx={{ px: 2, py: 1.5 }}>
              <Typography variant="subtitle2" fontWeight="bold">
                {user?.name || 'Admin User'}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {user?.email || 'admin@realestate.com'}
              </Typography>
            </Box>
            <Divider />
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <Icon icon="mdi:logout" style={{ fontSize: 20, color: '#f44336' }} />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* Sidebar Drawer */}
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      >
        {/* Mobile Drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              bgcolor: '#fff',
            },
          }}
        >
          {drawer}
        </Drawer>

        {/* Desktop Drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              bgcolor: '#fff',
              borderRight: '1px solid',
              borderColor: 'divider',
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          minHeight: '100vh',
          bgcolor: '#f5f7fa',
        }}
      >
        <Toolbar />
        <Box sx={{ p: { xs: 2, md: 3 } }}>
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
