/**
 * Admin Audit Log Page
 * View system activity and changes
 */

import { useState, useEffect } from 'react';
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
  Chip,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Skeleton,
} from '@mui/material';
import {
  Search as SearchIcon,
  Download as DownloadIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';
import AdminLayout from '@/components/admin/AdminLayout';
import { withAuth } from '@/context/AuthContext';
import { AUDIT_ACTION_TYPES, AUDIT_MODULE_TYPES } from '@/lib/constants';

// Mock audit log data
const mockAuditLogs = [
  { id: 1, timestamp: '2025-01-11T10:30:00', user: 'Admin', action: 'LOGIN', module: 'SETTINGS', description: 'User logged in', ipAddress: '103.45.67.89' },
  { id: 2, timestamp: '2025-01-11T10:35:00', user: 'Admin', action: 'UPDATE', module: 'SEO', description: 'Updated meta title', ipAddress: '103.45.67.89' },
  { id: 3, timestamp: '2025-01-11T10:45:00', user: 'Admin', action: 'UPDATE', module: 'LEAD', description: 'Changed lead status to Contacted', ipAddress: '103.45.67.89' },
  { id: 4, timestamp: '2025-01-11T11:00:00', user: 'Admin', action: 'CREATE', module: 'KEYWORD', description: 'Added new keyword', ipAddress: '103.45.67.89' },
  { id: 5, timestamp: '2025-01-11T11:15:00', user: 'Admin', action: 'DELETE', module: 'LEAD', description: 'Deleted duplicate lead', ipAddress: '103.45.67.89' },
  { id: 6, timestamp: '2025-01-11T11:30:00', user: 'Admin', action: 'UPDATE', module: 'PIXEL', description: 'Enabled Facebook Pixel', ipAddress: '103.45.67.89' },
  { id: 7, timestamp: '2025-01-11T11:45:00', user: 'Admin', action: 'UPDATE', module: 'SCHEMA', description: 'Updated Organization schema', ipAddress: '103.45.67.89' },
  { id: 8, timestamp: '2025-01-11T12:00:00', user: 'Admin', action: 'LOGOUT', module: 'SETTINGS', description: 'User logged out', ipAddress: '103.45.67.89' },
];

/**
 * Admin Audit Log Page Component
 */
const AdminAuditLogPage = () => {
  const [loading, setLoading] = useState(true);
  const [logs, setLogs] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [actionFilter, setActionFilter] = useState('all');
  const [moduleFilter, setModuleFilter] = useState('all');

  // Load data
  useEffect(() => {
    const timer = setTimeout(() => {
      setLogs(mockAuditLogs);
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Filter logs
  const filteredLogs = logs.filter((log) => {
    const matchesSearch = log.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.user.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesAction = actionFilter === 'all' || log.action === actionFilter;
    const matchesModule = moduleFilter === 'all' || log.module === moduleFilter;
    return matchesSearch && matchesAction && matchesModule;
  });

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Get action color
  const getActionColor = (action) => {
    switch (action) {
      case 'LOGIN': return 'info';
      case 'LOGOUT': return 'default';
      case 'CREATE': return 'success';
      case 'UPDATE': return 'warning';
      case 'DELETE': return 'error';
      default: return 'default';
    }
  };

  // Get module color
  const getModuleColor = (module) => {
    switch (module) {
      case 'LEAD': return '#2196f3';
      case 'SEO': return '#9c27b0';
      case 'PIXEL': return '#ff9800';
      case 'SCHEMA': return '#00bcd4';
      case 'KEYWORD': return '#4caf50';
      case 'SETTINGS': return '#8B9A46';
      default: return '#9e9e9e';
    }
  };

  // Format timestamp
  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString('en-IN', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
  };

  return (
    <AdminLayout title="Audit Log">
      <Head>
        <title>Audit Log | Admin - District 25</title>
      </Head>

      <Box>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700, color: '#1a1a2e', mb: 0.5 }}>
              Audit Log
            </Typography>
            <Typography variant="body2" color="text.secondary">
              View system activity and changes
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button variant="outlined" startIcon={<RefreshIcon />}>
              Refresh
            </Button>
            <Button
              variant="contained"
              startIcon={<DownloadIcon />}
              sx={{ backgroundColor: '#8B9A46', '&:hover': { backgroundColor: '#6b7a36' } }}
            >
              Export CSV
            </Button>
          </Box>
        </Box>

        {/* Filters */}
        <Paper sx={{ p: 3, mb: 3, borderRadius: 3 }}>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
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
              }}
            />
            <FormControl size="small" sx={{ minWidth: 150 }}>
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
            <FormControl size="small" sx={{ minWidth: 150 }}>
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
          </Box>
        </Paper>

        {/* Audit Log Table */}
        <Paper sx={{ borderRadius: 3, overflow: 'hidden' }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#f5f5f7' }}>
                  <TableCell sx={{ fontWeight: 600 }}>Timestamp</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>User</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Action</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Module</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Description</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>IP Address</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  [...Array(5)].map((_, index) => (
                    <TableRow key={index}>
                      {[...Array(6)].map((_, cellIndex) => (
                        <TableCell key={cellIndex}>
                          <Skeleton variant="text" />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  filteredLogs
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((log) => (
                      <TableRow key={log.id} hover>
                        <TableCell>
                          <Typography variant="body2" color="text.secondary">
                            {formatTimestamp(log.timestamp)}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" fontWeight={500}>
                            {log.user}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={log.action}
                            size="small"
                            color={getActionColor(log.action)}
                            variant="outlined"
                          />
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={log.module}
                            size="small"
                            sx={{
                              backgroundColor: `${getModuleColor(log.module)}20`,
                              color: getModuleColor(log.module),
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {log.description}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'monospace' }}>
                            {log.ipAddress}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            count={filteredLogs.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[10, 25, 50]}
          />
        </Paper>
      </Box>
    </AdminLayout>
  );
};

export default withAuth(AdminAuditLogPage);
