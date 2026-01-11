/**
 * Admin Audit Log Page
 * Professional audit log viewer with stats, filters, and detailed views
 */

import React, { useState, useEffect, useMemo } from 'react';
import Head from 'next/head';
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableSortLabel,
  Chip,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  IconButton,
  Skeleton,
  Grid,
  Card,
  CardContent,
  Avatar,
  Tooltip,
  Collapse,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  Divider,
  ToggleButton,
  ToggleButtonGroup,
  Badge,
  LinearProgress,
  Fade,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import {
  Search as SearchIcon,
  Download as DownloadIcon,
  Refresh as RefreshIcon,
  History as HistoryIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  FilterList as FilterListIcon,
  ViewList as ViewListIcon,
  Timeline as TimelineIcon,
  Person as PersonIcon,
  Login as LoginIcon,
  Logout as LogoutIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  GetApp as GetAppIcon,
  Upload as UploadIcon,
  Settings as SettingsIcon,
  Code as CodeIcon,
  VpnKey as VpnKeyIcon,
  Analytics as AnalyticsIcon,
  People as PeopleIcon,
  CalendarMonth as CalendarMonthIcon,
  Clear as ClearIcon,
  Close as CloseIcon,
  Info as InfoIcon,
  ContentCopy as ContentCopyIcon,
  OpenInNew as OpenInNewIcon,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import AdminLayout from '@/components/admin/AdminLayout';
import { withAuth } from '@/context/AuthContext';
import { AUDIT_ACTION_TYPES, AUDIT_MODULE_TYPES } from '@/lib/constants';

// Mock audit log data with detailed metadata
const generateMockAuditLogs = () => {
  const actions = ['LOGIN', 'LOGOUT', 'CREATE', 'UPDATE', 'DELETE', 'VIEW', 'EXPORT'];
  const modules = ['LEAD', 'SEO', 'PIXEL', 'SCHEMA', 'KEYWORD', 'SETTINGS', 'AUTH'];
  const users = ['Admin', 'Sales Manager', 'Marketing Lead', 'System'];
  const ips = ['103.45.67.89', '192.168.1.100', '10.0.0.50', '172.16.0.25'];

  const descriptions = {
    LOGIN: ['User logged in successfully', 'Admin session started'],
    LOGOUT: ['User logged out', 'Session ended'],
    CREATE: ['Created new lead: John Doe', 'Added new keyword: luxury apartments', 'Created new schema markup'],
    UPDATE: ['Updated meta title', 'Changed lead status to Contacted', 'Modified Facebook Pixel settings', 'Updated site settings'],
    DELETE: ['Deleted duplicate lead', 'Removed inactive keyword', 'Cleared cache'],
    VIEW: ['Viewed lead details', 'Accessed SEO settings', 'Opened audit logs'],
    EXPORT: ['Exported leads to CSV', 'Downloaded audit log report'],
  };

  const logs = [];
  const now = new Date();

  for (let i = 0; i < 50; i++) {
    const action = actions[Math.floor(Math.random() * actions.length)];
    const auditModule = action === 'LOGIN' || action === 'LOGOUT' ? 'AUTH' : modules[Math.floor(Math.random() * modules.length)];
    const descList = descriptions[action] || ['Action performed'];

    logs.push({
      id: 50 - i,
      timestamp: new Date(now.getTime() - i * 3600000 * Math.random() * 24).toISOString(),
      user: users[Math.floor(Math.random() * users.length)],
      action,
      module: auditModule,
      description: descList[Math.floor(Math.random() * descList.length)],
      ipAddress: ips[Math.floor(Math.random() * ips.length)],
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      metadata: action === 'UPDATE' ? {
        field: 'status',
        oldValue: 'new',
        newValue: 'contacted',
        entityId: Math.floor(Math.random() * 1000),
      } : action === 'CREATE' ? {
        entityId: Math.floor(Math.random() * 1000),
        entityType: auditModule.toLowerCase(),
      } : null,
    });
  }

  return logs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
};

// Stat card component
const StatCard = ({ title, value, icon: Icon, color, trend, loading }) => (
  <Card
    component={motion.div}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    sx={{
      height: '100%',
      borderRadius: 3,
      boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
      border: '1px solid',
      borderColor: 'divider',
      overflow: 'hidden',
      position: 'relative',
    }}
  >
    <CardContent sx={{ p: 2.5 }}>
      {loading ? (
        <>
          <Skeleton variant="circular" width={40} height={40} sx={{ mb: 1 }} />
          <Skeleton variant="text" width={60} height={32} />
          <Skeleton variant="text" width={80} />
        </>
      ) : (
        <>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
            <Avatar
              sx={{
                width: 40,
                height: 40,
                backgroundColor: `${color}15`,
                color: color,
              }}
            >
              <Icon sx={{ fontSize: 20 }} />
            </Avatar>
            {trend && (
              <Chip
                label={trend}
                size="small"
                sx={{
                  height: 20,
                  fontSize: '0.7rem',
                  backgroundColor: `${color}15`,
                  color: color,
                }}
              />
            )}
          </Box>
          <Typography variant="h4" sx={{ fontWeight: 700, color: '#1a1a2e', mb: 0.5 }}>
            {value}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {title}
          </Typography>
        </>
      )}
    </CardContent>
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        right: 0,
        width: '30%',
        height: '100%',
        background: `linear-gradient(135deg, transparent 50%, ${color}10 100%)`,
      }}
    />
  </Card>
);

// Timeline item component
const TimelineItem = ({ log, isLast, onViewDetails }) => {
  const getActionIcon = (action) => {
    const icons = {
      LOGIN: <LoginIcon fontSize="small" />,
      LOGOUT: <LogoutIcon fontSize="small" />,
      CREATE: <AddIcon fontSize="small" />,
      UPDATE: <EditIcon fontSize="small" />,
      DELETE: <DeleteIcon fontSize="small" />,
      VIEW: <VisibilityIcon fontSize="small" />,
      EXPORT: <GetAppIcon fontSize="small" />,
      IMPORT: <UploadIcon fontSize="small" />,
    };
    return icons[action] || <HistoryIcon fontSize="small" />;
  };

  const getActionColor = (action) => {
    const colors = {
      LOGIN: '#2196f3',
      LOGOUT: '#9e9e9e',
      CREATE: '#4caf50',
      UPDATE: '#ff9800',
      DELETE: '#f44336',
      VIEW: '#00bcd4',
      EXPORT: '#9c27b0',
    };
    return colors[action] || '#9e9e9e';
  };

  const color = getActionColor(log.action);

  return (
    <Box sx={{ display: 'flex', position: 'relative' }}>
      {/* Timeline connector */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mr: 2 }}>
        <Avatar
          sx={{
            width: 36,
            height: 36,
            backgroundColor: `${color}15`,
            color: color,
          }}
        >
          {getActionIcon(log.action)}
        </Avatar>
        {!isLast && (
          <Box
            sx={{
              width: 2,
              flexGrow: 1,
              backgroundColor: 'divider',
              mt: 1,
            }}
          />
        )}
      </Box>

      {/* Content */}
      <Box sx={{ flexGrow: 1, pb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.5 }}>
          <Typography variant="subtitle2" fontWeight={600}>
            {log.description}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {new Date(log.timestamp).toLocaleString('en-IN', {
              dateStyle: 'medium',
              timeStyle: 'short',
            })}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
          <Chip
            label={log.action}
            size="small"
            sx={{
              height: 20,
              fontSize: '0.65rem',
              backgroundColor: `${color}15`,
              color: color,
            }}
          />
          <Typography variant="caption" color="text.secondary">
            by {log.user}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            from {log.ipAddress}
          </Typography>
          {log.metadata && (
            <IconButton size="small" onClick={() => onViewDetails(log)}>
              <InfoIcon fontSize="small" sx={{ color: 'text.secondary' }} />
            </IconButton>
          )}
        </Box>
      </Box>
    </Box>
  );
};

/**
 * Admin Audit Log Page Component
 */
const AdminAuditLogPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [logs, setLogs] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [actionFilter, setActionFilter] = useState('all');
  const [moduleFilter, setModuleFilter] = useState('all');
  const [userFilter, setUserFilter] = useState('all');
  const [dateFrom, setDateFrom] = useState(null);
  const [dateTo, setDateTo] = useState(null);
  const [orderBy, setOrderBy] = useState('timestamp');
  const [order, setOrder] = useState('desc');
  const [viewMode, setViewMode] = useState('table');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedLog, setSelectedLog] = useState(null);
  const [detailsDialog, setDetailsDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [expandedRows, setExpandedRows] = useState({});

  // Load data
  useEffect(() => {
    const loadData = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 800));
        setLogs(generateMockAuditLogs());
        setLoading(false);
      } catch (error) {
        setSnackbar({ open: true, message: 'Failed to load audit logs', severity: 'error' });
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // Get unique users from logs
  const uniqueUsers = useMemo(() => {
    return [...new Set(logs.map(log => log.user))];
  }, [logs]);

  // Calculate stats
  const stats = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayLogs = logs.filter(log => new Date(log.timestamp) >= today);

    return {
      total: logs.length,
      today: todayLogs.length,
      logins: logs.filter(log => log.action === 'LOGIN').length,
      updates: logs.filter(log => log.action === 'UPDATE').length,
    };
  }, [logs]);

  // Filter logs
  const filteredLogs = useMemo(() => {
    return logs.filter((log) => {
      const matchesSearch = log.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.ipAddress.includes(searchQuery);
      const matchesAction = actionFilter === 'all' || log.action === actionFilter;
      const matchesModule = moduleFilter === 'all' || log.module === moduleFilter;
      const matchesUser = userFilter === 'all' || log.user === userFilter;

      let matchesDate = true;
      if (dateFrom) {
        matchesDate = matchesDate && new Date(log.timestamp) >= dateFrom;
      }
      if (dateTo) {
        const endDate = new Date(dateTo);
        endDate.setHours(23, 59, 59, 999);
        matchesDate = matchesDate && new Date(log.timestamp) <= endDate;
      }

      return matchesSearch && matchesAction && matchesModule && matchesUser && matchesDate;
    });
  }, [logs, searchQuery, actionFilter, moduleFilter, userFilter, dateFrom, dateTo]);

  // Sort logs
  const sortedLogs = useMemo(() => {
    return [...filteredLogs].sort((a, b) => {
      const aValue = a[orderBy];
      const bValue = b[orderBy];

      if (orderBy === 'timestamp') {
        return order === 'asc'
          ? new Date(aValue) - new Date(bValue)
          : new Date(bValue) - new Date(aValue);
      }

      return order === 'asc'
        ? String(aValue).localeCompare(String(bValue))
        : String(bValue).localeCompare(String(aValue));
    });
  }, [filteredLogs, orderBy, order]);

  // Handle sort
  const handleSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // Handle refresh
  const handleRefresh = async () => {
    setRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLogs(generateMockAuditLogs());
    setRefreshing(false);
    setSnackbar({ open: true, message: 'Audit logs refreshed', severity: 'success' });
  };

  // Handle export
  const handleExport = () => {
    const csvContent = [
      ['Timestamp', 'User', 'Action', 'Module', 'Description', 'IP Address'].join(','),
      ...filteredLogs.map(log => [
        new Date(log.timestamp).toISOString(),
        log.user,
        log.action,
        log.module,
        `"${log.description}"`,
        log.ipAddress,
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `audit-log-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);

    setSnackbar({ open: true, message: 'Audit logs exported successfully', severity: 'success' });
  };

  // Clear filters
  const handleClearFilters = () => {
    setSearchQuery('');
    setActionFilter('all');
    setModuleFilter('all');
    setUserFilter('all');
    setDateFrom(null);
    setDateTo(null);
  };

  // Get action color
  const getActionColor = (action) => {
    const colors = {
      LOGIN: 'info',
      LOGOUT: 'default',
      CREATE: 'success',
      UPDATE: 'warning',
      DELETE: 'error',
      VIEW: 'default',
      EXPORT: 'info',
      IMPORT: 'info',
    };
    return colors[action] || 'default';
  };

  // Get module color
  const getModuleColor = (module) => {
    const colors = {
      LEAD: '#2196f3',
      SEO: '#9c27b0',
      PIXEL: '#ff9800',
      SCHEMA: '#00bcd4',
      KEYWORD: '#4caf50',
      SETTINGS: '#667eea',
      AUTH: '#1a1a2e',
    };
    return colors[module] || '#9e9e9e';
  };

  // Get module icon
  const getModuleIcon = (module) => {
    const icons = {
      LEAD: <PeopleIcon fontSize="small" />,
      SEO: <SearchIcon fontSize="small" />,
      PIXEL: <AnalyticsIcon fontSize="small" />,
      SCHEMA: <CodeIcon fontSize="small" />,
      KEYWORD: <VpnKeyIcon fontSize="small" />,
      SETTINGS: <SettingsIcon fontSize="small" />,
      AUTH: <PersonIcon fontSize="small" />,
    };
    return icons[module] || <HistoryIcon fontSize="small" />;
  };

  // Toggle row expansion
  const toggleRowExpand = (id) => {
    setExpandedRows(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // View details
  const handleViewDetails = (log) => {
    setSelectedLog(log);
    setDetailsDialog(true);
  };

  // Copy to clipboard
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setSnackbar({ open: true, message: 'Copied to clipboard', severity: 'success' });
  };

  // Check if any filter is active
  const hasActiveFilters = searchQuery || actionFilter !== 'all' || moduleFilter !== 'all' || userFilter !== 'all' || dateFrom || dateTo;

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <AdminLayout title="Audit Log">
        <Head>
          <title>Audit Log | Admin - District 25</title>
        </Head>

        <Box>
          {/* Header */}
          <Paper
            component={motion.div}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            sx={{
              p: 3,
              mb: 3,
              borderRadius: 3,
              background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
              color: 'white',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Background pattern */}
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '40%',
                height: '100%',
                background: 'radial-gradient(circle at 70% 50%, rgba(139, 154, 70, 0.2) 0%, transparent 70%)',
              }}
            />

            <Box sx={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 2 }}>
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                  <Avatar
                    sx={{
                      width: 56,
                      height: 56,
                      backgroundColor: 'rgba(139, 154, 70, 0.2)',
                      border: '2px solid rgba(139, 154, 70, 0.5)',
                    }}
                  >
                    <HistoryIcon sx={{ fontSize: 28, color: '#a3b15e' }} />
                  </Avatar>
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 700 }}>
                      Audit Log
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.7 }}>
                      Track system activity and changes
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button
                  variant="outlined"
                  startIcon={<RefreshIcon />}
                  onClick={handleRefresh}
                  disabled={refreshing}
                  sx={{
                    borderColor: 'rgba(255,255,255,0.3)',
                    color: 'white',
                    '&:hover': {
                      borderColor: 'rgba(255,255,255,0.5)',
                      backgroundColor: 'rgba(255,255,255,0.1)',
                    },
                  }}
                >
                  {refreshing ? 'Refreshing...' : 'Refresh'}
                </Button>
                <Button
                  variant="contained"
                  startIcon={<DownloadIcon />}
                  onClick={handleExport}
                  sx={{
                    backgroundColor: '#667eea',
                    '&:hover': { backgroundColor: '#764ba2' },
                  }}
                >
                  Export CSV
                </Button>
              </Box>
            </Box>

            {refreshing && (
              <LinearProgress
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: '#667eea',
                  },
                }}
              />
            )}
          </Paper>

          {/* Stats */}
          <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid item xs={6} md={3}>
              <StatCard
                title="Total Entries"
                value={stats.total}
                icon={HistoryIcon}
                color="#1a1a2e"
                loading={loading}
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <StatCard
                title="Today's Activity"
                value={stats.today}
                icon={CalendarMonthIcon}
                color="#667eea"
                trend="Today"
                loading={loading}
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <StatCard
                title="Login Events"
                value={stats.logins}
                icon={LoginIcon}
                color="#2196f3"
                loading={loading}
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <StatCard
                title="Updates Made"
                value={stats.updates}
                icon={EditIcon}
                color="#ff9800"
                loading={loading}
              />
            </Grid>
          </Grid>

          {/* Filters */}
          <Paper sx={{ p: 3, mb: 3, borderRadius: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, flexWrap: 'wrap', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <TextField
                  placeholder="Search logs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  size="small"
                  sx={{ minWidth: 250 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon color="action" />
                      </InputAdornment>
                    ),
                    endAdornment: searchQuery && (
                      <InputAdornment position="end">
                        <IconButton size="small" onClick={() => setSearchQuery('')}>
                          <ClearIcon fontSize="small" />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <Button
                  variant={showFilters ? 'contained' : 'outlined'}
                  startIcon={<FilterListIcon />}
                  onClick={() => setShowFilters(!showFilters)}
                  sx={showFilters ? {
                    backgroundColor: '#667eea',
                    '&:hover': { backgroundColor: '#764ba2' }
                  } : {}}
                >
                  Filters
                  {hasActiveFilters && (
                    <Badge
                      badgeContent=" "
                      color="error"
                      variant="dot"
                      sx={{ ml: 1 }}
                    />
                  )}
                </Button>
              </Box>

              <ToggleButtonGroup
                value={viewMode}
                exclusive
                onChange={(e, value) => value && setViewMode(value)}
                size="small"
              >
                <ToggleButton value="table">
                  <Tooltip title="Table View">
                    <ViewListIcon />
                  </Tooltip>
                </ToggleButton>
                <ToggleButton value="timeline">
                  <Tooltip title="Timeline View">
                    <TimelineIcon />
                  </Tooltip>
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>

            <Collapse in={showFilters}>
              <Divider sx={{ my: 2 }} />
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={6} md={2}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Action</InputLabel>
                    <Select
                      value={actionFilter}
                      label="Action"
                      onChange={(e) => setActionFilter(e.target.value)}
                    >
                      <MenuItem value="all">All Actions</MenuItem>
                      {AUDIT_ACTION_TYPES.map((type) => (
                        <MenuItem key={type.value} value={type.value}>
                          {type.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={2}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Module</InputLabel>
                    <Select
                      value={moduleFilter}
                      label="Module"
                      onChange={(e) => setModuleFilter(e.target.value)}
                    >
                      <MenuItem value="all">All Modules</MenuItem>
                      {AUDIT_MODULE_TYPES.map((type) => (
                        <MenuItem key={type.value} value={type.value}>
                          {type.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={2}>
                  <FormControl fullWidth size="small">
                    <InputLabel>User</InputLabel>
                    <Select
                      value={userFilter}
                      label="User"
                      onChange={(e) => setUserFilter(e.target.value)}
                    >
                      <MenuItem value="all">All Users</MenuItem>
                      {uniqueUsers.map((user) => (
                        <MenuItem key={user} value={user}>
                          {user}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={2}>
                  <DatePicker
                    label="From Date"
                    value={dateFrom}
                    onChange={setDateFrom}
                    slotProps={{
                      textField: { size: 'small', fullWidth: true },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={2}>
                  <DatePicker
                    label="To Date"
                    value={dateTo}
                    onChange={setDateTo}
                    slotProps={{
                      textField: { size: 'small', fullWidth: true },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={2}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<ClearIcon />}
                    onClick={handleClearFilters}
                    disabled={!hasActiveFilters}
                  >
                    Clear Filters
                  </Button>
                </Grid>
              </Grid>
            </Collapse>

            {/* Filter summary */}
            {hasActiveFilters && (
              <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
                  Active filters:
                </Typography>
                {searchQuery && (
                  <Chip
                    label={`Search: ${searchQuery}`}
                    size="small"
                    onDelete={() => setSearchQuery('')}
                  />
                )}
                {actionFilter !== 'all' && (
                  <Chip
                    label={`Action: ${actionFilter}`}
                    size="small"
                    onDelete={() => setActionFilter('all')}
                  />
                )}
                {moduleFilter !== 'all' && (
                  <Chip
                    label={`Module: ${moduleFilter}`}
                    size="small"
                    onDelete={() => setModuleFilter('all')}
                  />
                )}
                {userFilter !== 'all' && (
                  <Chip
                    label={`User: ${userFilter}`}
                    size="small"
                    onDelete={() => setUserFilter('all')}
                  />
                )}
                {dateFrom && (
                  <Chip
                    label={`From: ${dateFrom.toLocaleDateString()}`}
                    size="small"
                    onDelete={() => setDateFrom(null)}
                  />
                )}
                {dateTo && (
                  <Chip
                    label={`To: ${dateTo.toLocaleDateString()}`}
                    size="small"
                    onDelete={() => setDateTo(null)}
                  />
                )}
              </Box>
            )}
          </Paper>

          {/* Results count */}
          <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Showing {sortedLogs.length > 0 ? page * rowsPerPage + 1 : 0} - {Math.min((page + 1) * rowsPerPage, sortedLogs.length)} of {sortedLogs.length} entries
            </Typography>
          </Box>

          {/* Content */}
          <AnimatePresence mode="wait">
            {viewMode === 'table' ? (
              <Paper
                component={motion.div}
                key="table"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                sx={{ borderRadius: 3, overflow: 'hidden' }}
              >
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow sx={{ backgroundColor: '#f5f5f7' }}>
                        <TableCell sx={{ width: 50 }} />
                        <TableCell sx={{ fontWeight: 600 }}>
                          <TableSortLabel
                            active={orderBy === 'timestamp'}
                            direction={orderBy === 'timestamp' ? order : 'asc'}
                            onClick={() => handleSort('timestamp')}
                          >
                            Timestamp
                          </TableSortLabel>
                        </TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>
                          <TableSortLabel
                            active={orderBy === 'user'}
                            direction={orderBy === 'user' ? order : 'asc'}
                            onClick={() => handleSort('user')}
                          >
                            User
                          </TableSortLabel>
                        </TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Action</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Module</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Description</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>IP Address</TableCell>
                        <TableCell sx={{ fontWeight: 600, width: 80 }}>Details</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {loading ? (
                        [...Array(5)].map((_, index) => (
                          <TableRow key={index}>
                            <TableCell><Skeleton variant="text" width={30} /></TableCell>
                            {[...Array(7)].map((_, cellIndex) => (
                              <TableCell key={cellIndex}>
                                <Skeleton variant="text" />
                              </TableCell>
                            ))}
                          </TableRow>
                        ))
                      ) : sortedLogs.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={8} align="center" sx={{ py: 8 }}>
                            <Box sx={{ textAlign: 'center' }}>
                              <HistoryIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
                              <Typography variant="h6" color="text.secondary" gutterBottom>
                                No audit logs found
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                Try adjusting your filters or search query
                              </Typography>
                            </Box>
                          </TableCell>
                        </TableRow>
                      ) : (
                        sortedLogs
                          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                          .map((log) => (
                            <React.Fragment key={log.id}>
                              <TableRow
                                hover
                                sx={{
                                  '&:hover': { backgroundColor: 'rgba(139, 154, 70, 0.04)' },
                                  cursor: log.metadata ? 'pointer' : 'default',
                                }}
                              >
                                <TableCell>
                                  {log.metadata && (
                                    <IconButton
                                      size="small"
                                      onClick={() => toggleRowExpand(log.id)}
                                    >
                                      {expandedRows[log.id] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                    </IconButton>
                                  )}
                                </TableCell>
                                <TableCell>
                                  <Typography variant="body2" color="text.secondary">
                                    {new Date(log.timestamp).toLocaleString('en-IN', {
                                      dateStyle: 'medium',
                                      timeStyle: 'short',
                                    })}
                                  </Typography>
                                </TableCell>
                                <TableCell>
                                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Avatar
                                      sx={{
                                        width: 28,
                                        height: 28,
                                        fontSize: '0.75rem',
                                        backgroundColor: '#667eea',
                                      }}
                                    >
                                      {log.user.charAt(0)}
                                    </Avatar>
                                    <Typography variant="body2" fontWeight={500}>
                                      {log.user}
                                    </Typography>
                                  </Box>
                                </TableCell>
                                <TableCell>
                                  <Chip
                                    label={log.action}
                                    size="small"
                                    color={getActionColor(log.action)}
                                    variant="outlined"
                                    sx={{ fontWeight: 500 }}
                                  />
                                </TableCell>
                                <TableCell>
                                  <Chip
                                    icon={getModuleIcon(log.module)}
                                    label={log.module}
                                    size="small"
                                    sx={{
                                      backgroundColor: `${getModuleColor(log.module)}15`,
                                      color: getModuleColor(log.module),
                                      '& .MuiChip-icon': {
                                        color: getModuleColor(log.module),
                                      },
                                    }}
                                  />
                                </TableCell>
                                <TableCell>
                                  <Typography variant="body2" sx={{ maxWidth: 300, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                    {log.description}
                                  </Typography>
                                </TableCell>
                                <TableCell>
                                  <Tooltip title="Copy IP">
                                    <Typography
                                      variant="body2"
                                      color="text.secondary"
                                      sx={{
                                        fontFamily: 'monospace',
                                        cursor: 'pointer',
                                        '&:hover': { color: '#667eea' },
                                      }}
                                      onClick={() => handleCopy(log.ipAddress)}
                                    >
                                      {log.ipAddress}
                                    </Typography>
                                  </Tooltip>
                                </TableCell>
                                <TableCell>
                                  <IconButton
                                    size="small"
                                    onClick={() => handleViewDetails(log)}
                                  >
                                    <OpenInNewIcon fontSize="small" />
                                  </IconButton>
                                </TableCell>
                              </TableRow>

                              {/* Expanded metadata row */}
                              {log.metadata && (
                                <TableRow>
                                  <TableCell colSpan={8} sx={{ py: 0, backgroundColor: 'rgba(139, 154, 70, 0.03)' }}>
                                    <Collapse in={expandedRows[log.id]} timeout="auto" unmountOnExit>
                                      <Box sx={{ py: 2, px: 4 }}>
                                        <Typography variant="subtitle2" gutterBottom sx={{ color: '#667eea' }}>
                                          Metadata
                                        </Typography>
                                        <Grid container spacing={2}>
                                          {Object.entries(log.metadata).map(([key, value]) => (
                                            <Grid item xs={12} sm={6} md={3} key={key}>
                                              <Typography variant="caption" color="text.secondary" display="block">
                                                {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                                              </Typography>
                                              <Typography variant="body2" fontWeight={500}>
                                                {String(value)}
                                              </Typography>
                                            </Grid>
                                          ))}
                                        </Grid>
                                      </Box>
                                    </Collapse>
                                  </TableCell>
                                </TableRow>
                              )}
                            </React.Fragment>
                          ))
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  component="div"
                  count={sortedLogs.length}
                  page={page}
                  onPageChange={(e, newPage) => setPage(newPage)}
                  rowsPerPage={rowsPerPage}
                  onRowsPerPageChange={(e) => {
                    setRowsPerPage(parseInt(e.target.value, 10));
                    setPage(0);
                  }}
                  rowsPerPageOptions={[10, 25, 50, 100]}
                />
              </Paper>
            ) : (
              <Paper
                component={motion.div}
                key="timeline"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                sx={{ borderRadius: 3, p: 3 }}
              >
                {loading ? (
                  [...Array(5)].map((_, index) => (
                    <Box key={index} sx={{ display: 'flex', mb: 3 }}>
                      <Skeleton variant="circular" width={36} height={36} sx={{ mr: 2 }} />
                      <Box sx={{ flexGrow: 1 }}>
                        <Skeleton variant="text" width="60%" />
                        <Skeleton variant="text" width="40%" />
                      </Box>
                    </Box>
                  ))
                ) : sortedLogs.length === 0 ? (
                  <Box sx={{ textAlign: 'center', py: 8 }}>
                    <HistoryIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                      No audit logs found
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Try adjusting your filters or search query
                    </Typography>
                  </Box>
                ) : (
                  <>
                    {sortedLogs
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((log, index, arr) => (
                        <TimelineItem
                          key={log.id}
                          log={log}
                          isLast={index === arr.length - 1}
                          onViewDetails={handleViewDetails}
                        />
                      ))}
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                      <TablePagination
                        component="div"
                        count={sortedLogs.length}
                        page={page}
                        onPageChange={(e, newPage) => setPage(newPage)}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={(e) => {
                          setRowsPerPage(parseInt(e.target.value, 10));
                          setPage(0);
                        }}
                        rowsPerPageOptions={[10, 25, 50]}
                      />
                    </Box>
                  </>
                )}
              </Paper>
            )}
          </AnimatePresence>
        </Box>

        {/* Details Dialog */}
        <Dialog
          open={detailsDialog}
          onClose={() => setDetailsDialog(false)}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: { borderRadius: 3 }
          }}
        >
          <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <HistoryIcon sx={{ color: '#667eea' }} />
              <Typography variant="h6">Audit Log Details</Typography>
            </Box>
            <IconButton onClick={() => setDetailsDialog(false)}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers>
            {selectedLog && (
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="caption" color="text.secondary">Timestamp</Typography>
                  <Typography variant="body2" fontWeight={500}>
                    {new Date(selectedLog.timestamp).toLocaleString('en-IN')}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="caption" color="text.secondary">User</Typography>
                  <Typography variant="body2" fontWeight={500}>{selectedLog.user}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="caption" color="text.secondary">Action</Typography>
                  <Box>
                    <Chip
                      label={selectedLog.action}
                      size="small"
                      color={getActionColor(selectedLog.action)}
                      variant="outlined"
                    />
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="caption" color="text.secondary">Module</Typography>
                  <Box>
                    <Chip
                      icon={getModuleIcon(selectedLog.module)}
                      label={selectedLog.module}
                      size="small"
                      sx={{
                        backgroundColor: `${getModuleColor(selectedLog.module)}15`,
                        color: getModuleColor(selectedLog.module),
                      }}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="caption" color="text.secondary">Description</Typography>
                  <Typography variant="body2">{selectedLog.description}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="caption" color="text.secondary">IP Address</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="body2" fontFamily="monospace">{selectedLog.ipAddress}</Typography>
                    <IconButton size="small" onClick={() => handleCopy(selectedLog.ipAddress)}>
                      <ContentCopyIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="caption" color="text.secondary">User Agent</Typography>
                  <Typography variant="body2" sx={{ wordBreak: 'break-all', fontSize: '0.75rem' }}>
                    {selectedLog.userAgent}
                  </Typography>
                </Grid>
                {selectedLog.metadata && (
                  <Grid item xs={12}>
                    <Divider sx={{ my: 1 }} />
                    <Typography variant="subtitle2" gutterBottom sx={{ color: '#667eea' }}>
                      Metadata
                    </Typography>
                    <Paper variant="outlined" sx={{ p: 2, backgroundColor: 'rgba(139, 154, 70, 0.03)', borderRadius: 2 }}>
                      <Grid container spacing={1}>
                        {Object.entries(selectedLog.metadata).map(([key, value]) => (
                          <Grid item xs={6} key={key}>
                            <Typography variant="caption" color="text.secondary" display="block">
                              {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                            </Typography>
                            <Typography variant="body2" fontWeight={500}>
                              {String(value)}
                            </Typography>
                          </Grid>
                        ))}
                      </Grid>
                    </Paper>
                  </Grid>
                )}
              </Grid>
            )}
          </DialogContent>
          <DialogActions sx={{ p: 2 }}>
            <Button onClick={() => setDetailsDialog(false)}>
              Close
            </Button>
          </DialogActions>
        </Dialog>

        {/* Snackbar */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={4000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert
            onClose={() => setSnackbar({ ...snackbar, open: false })}
            severity={snackbar.severity}
            variant="filled"
            sx={{ borderRadius: 2 }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </AdminLayout>
    </LocalizationProvider>
  );
};

export default withAuth(AdminAuditLogPage);
