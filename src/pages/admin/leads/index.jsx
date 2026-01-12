/**
 * Admin Leads Page
 * Leads management with data table, filters, and actions - Matching reference code design
 */

import { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
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
  Avatar,
  TextField,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  Divider,
  IconButton,
  Tooltip,
  Skeleton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  useTheme,
  Checkbox,
  Menu,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
} from '@mui/material';
import { Icon } from '@iconify/react';
import { motion, AnimatePresence } from 'framer-motion';
import AdminLayout from '@/components/admin/AdminLayout';
import { withAuth } from '@/context/AuthContext';
import { LEAD_STATUS_OPTIONS } from '@/lib/constants';

// Enhanced mock data with more realistic entries including tracking data
const mockLeads = [
  { id: 1, name: 'Rahul Kumar', email: 'rahul.kumar@email.com', mobile: '9876543210', source: 'hero_form', status: 'new', priority: 'high', wantsSiteVisit: true, siteVisitDate: '2026-01-15', createdAt: '2026-01-11T10:30:00', ipAddress: '103.21.125.45', location: 'Mumbai, Maharashtra', userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0', utmSource: 'google', utmMedium: 'cpc', utmCampaign: 'brand_search' },
  { id: 2, name: 'Priya Sharma', email: 'priya.sharma@email.com', mobile: '9876543211', source: 'popup_form', status: 'contacted', priority: 'medium', wantsSiteVisit: false, createdAt: '2026-01-11T09:15:00', ipAddress: '182.74.58.102', location: 'Bangalore, Karnataka', userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_2 like Mac OS X) AppleWebKit/605.1.15', utmSource: 'facebook', utmMedium: 'social', utmCampaign: 'lead_gen' },
  { id: 3, name: 'Amit Singh', email: 'amit.singh@email.com', mobile: '9876543212', source: 'cta_form', status: 'site_visit_scheduled', priority: 'high', wantsSiteVisit: true, siteVisitDate: '2026-01-14', createdAt: '2026-01-10T16:45:00', ipAddress: '49.36.192.78', location: 'Delhi, NCR', userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0', utmSource: 'direct', utmMedium: '', utmCampaign: '' },
  { id: 4, name: 'Deepika Patel', email: 'deepika.patel@email.com', mobile: '9876543213', source: 'hero_form', status: 'visited', priority: 'high', wantsSiteVisit: true, createdAt: '2026-01-10T14:20:00', ipAddress: '157.48.73.21', location: 'Pune, Maharashtra', userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Firefox/121.0', utmSource: 'google', utmMedium: 'organic', utmCampaign: '' },
  { id: 5, name: 'Vikram Reddy', email: 'vikram.reddy@email.com', mobile: '9876543214', source: 'popup_form', status: 'negotiation', priority: 'high', wantsSiteVisit: false, createdAt: '2026-01-10T11:00:00', ipAddress: '122.161.48.95', location: 'Hyderabad, Telangana', userAgent: 'Mozilla/5.0 (Linux; Android 14) AppleWebKit/537.36 Chrome/120.0.0.0', utmSource: 'instagram', utmMedium: 'social', utmCampaign: 'reels_ads' },
  { id: 6, name: 'Sneha Nair', email: 'sneha.nair@email.com', mobile: '9876543215', source: 'hero_form', status: 'converted', priority: 'medium', wantsSiteVisit: true, createdAt: '2026-01-09T15:30:00', ipAddress: '117.195.62.144', location: 'Chennai, Tamil Nadu', userAgent: 'Mozilla/5.0 (iPad; CPU OS 17_2 like Mac OS X) AppleWebKit/605.1.15', utmSource: 'google', utmMedium: 'cpc', utmCampaign: 'competitor' },
  { id: 7, name: 'Rajesh Gupta', email: 'rajesh.gupta@email.com', mobile: '9876543216', source: 'cta_form', status: 'lost', priority: 'low', wantsSiteVisit: false, createdAt: '2026-01-09T12:00:00', ipAddress: '59.145.78.203', location: 'Kolkata, West Bengal', userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Edge/120.0.0.0', utmSource: 'referral', utmMedium: 'partner', utmCampaign: 'broker_network' },
  { id: 8, name: 'Ananya Krishnan', email: 'ananya.k@email.com', mobile: '9876543217', source: 'hero_form', status: 'new', priority: 'medium', wantsSiteVisit: true, siteVisitDate: '2026-01-16', createdAt: '2026-01-09T10:00:00', ipAddress: '103.87.141.56', location: 'Kochi, Kerala', userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Safari/605.1.15', utmSource: 'google', utmMedium: 'cpc', utmCampaign: 'brand_search' },
  { id: 9, name: 'Suresh Menon', email: 'suresh.menon@email.com', mobile: '9876543218', source: 'popup_form', status: 'contacted', priority: 'low', wantsSiteVisit: false, createdAt: '2026-01-08T15:45:00', ipAddress: '223.176.45.89', location: 'Ahmedabad, Gujarat', userAgent: 'Mozilla/5.0 (Linux; Android 13) AppleWebKit/537.36 Chrome/119.0.0.0', utmSource: 'facebook', utmMedium: 'social', utmCampaign: 'awareness' },
  { id: 10, name: 'Kavitha Rao', email: 'kavitha.rao@email.com', mobile: '9876543219', source: 'cta_form', status: 'site_visit_scheduled', priority: 'high', wantsSiteVisit: true, siteVisitDate: '2026-01-13', createdAt: '2026-01-08T11:30:00', ipAddress: '14.139.82.167', location: 'Bangalore, Karnataka', userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0', utmSource: 'google', utmMedium: 'organic', utmCampaign: '' },
  { id: 11, name: 'Arun Prakash', email: 'arun.prakash@email.com', mobile: '9876543220', source: 'hero_form', status: 'visited', priority: 'medium', wantsSiteVisit: true, createdAt: '2026-01-07T16:20:00', ipAddress: '106.51.73.198', location: 'Mumbai, Maharashtra', userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_7 like Mac OS X) AppleWebKit/605.1.15', utmSource: 'linkedin', utmMedium: 'social', utmCampaign: 'professional' },
  { id: 12, name: 'Meera Iyer', email: 'meera.iyer@email.com', mobile: '9876543221', source: 'popup_form', status: 'negotiation', priority: 'high', wantsSiteVisit: true, createdAt: '2026-01-07T14:00:00', ipAddress: '175.101.24.156', location: 'Hyderabad, Telangana', userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0', utmSource: 'google', utmMedium: 'cpc', utmCampaign: 'location_based' },
  { id: 13, name: 'Karthik Sundaram', email: 'karthik.s@email.com', mobile: '9876543222', source: 'cta_form', status: 'new', priority: 'medium', wantsSiteVisit: false, createdAt: '2026-01-06T09:30:00', ipAddress: '49.207.58.134', location: 'Chennai, Tamil Nadu', userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Firefox/121.0', utmSource: 'direct', utmMedium: '', utmCampaign: '' },
  { id: 14, name: 'Lakshmi Venkat', email: 'lakshmi.v@email.com', mobile: '9876543223', source: 'hero_form', status: 'converted', priority: 'high', wantsSiteVisit: true, createdAt: '2026-01-05T12:15:00', ipAddress: '203.122.45.78', location: 'Pune, Maharashtra', userAgent: 'Mozilla/5.0 (Linux; Android 14) AppleWebKit/537.36 Chrome/120.0.0.0', utmSource: 'google', utmMedium: 'cpc', utmCampaign: 'remarketing' },
  { id: 15, name: 'Naveen Kumar', email: 'naveen.kumar@email.com', mobile: '9876543224', source: 'popup_form', status: 'contacted', priority: 'medium', wantsSiteVisit: false, createdAt: '2026-01-05T10:45:00', ipAddress: '117.247.91.203', location: 'Delhi, NCR', userAgent: 'Mozilla/5.0 (iPad; CPU OS 17_1 like Mac OS X) AppleWebKit/605.1.15', utmSource: 'email', utmMedium: 'newsletter', utmCampaign: 'jan_promo' },
];

// Utility functions
const formatDate = (dateString) => {
  if (!dateString) return '-';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const formatSource = (source) => {
  const sources = {
    hero_form: 'Hero Form',
    popup_form: 'Popup Form',
    cta_form: 'CTA Form',
  };
  return sources[source] || source;
};

const getStatusConfig = (status) => {
  return LEAD_STATUS_OPTIONS.find((opt) => opt.value === status) || { label: status, color: '#9e9e9e' };
};

const getPriorityColor = (priority) => {
  const colors = {
    high: '#f44336',
    medium: '#ff9800',
    low: '#9e9e9e',
  };
  return colors[priority] || '#9e9e9e';
};

const getSourceColor = (source) => {
  const colors = {
    hero_form: '#667eea',
    popup_form: '#1a1a2e',
    cta_form: '#c9a227',
  };
  return colors[source] || '#667eea';
};

// Column configuration - defines all available columns
const ALL_COLUMNS = [
  { id: 'lead', label: 'Lead', alwaysVisible: true },
  { id: 'email', label: 'Email', alwaysVisible: true },
  { id: 'source', label: 'Source', defaultHidden: true },
  { id: 'status', label: 'Status', alwaysVisible: true },
  { id: 'priority', label: 'Priority', defaultHidden: true },
  { id: 'siteVisit', label: 'Site Visit', defaultHidden: true },
  { id: 'date', label: 'Date', alwaysVisible: true },
];

// Default visible columns (excludes hidden by default)
const DEFAULT_VISIBLE_COLUMNS = ALL_COLUMNS.filter(col => !col.defaultHidden).map(col => col.id);

/**
 * Admin Leads Page Component
 */
const AdminLeadsPage = () => {
  const router = useRouter();
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [leads, setLeads] = useState([]);
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sourceFilter, setSourceFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedLeads, setSelectedLeads] = useState([]);

  // Dialog state
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [editNotes, setEditNotes] = useState('');
  const [editStatus, setEditStatus] = useState('');

  // Column visibility state
  const [visibleColumns, setVisibleColumns] = useState(DEFAULT_VISIBLE_COLUMNS);
  const [columnMenuAnchor, setColumnMenuAnchor] = useState(null);

  // Responsive breakpoint
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Toggle column visibility
  const handleToggleColumn = (columnId) => {
    setVisibleColumns((prev) => {
      if (prev.includes(columnId)) {
        return prev.filter((id) => id !== columnId);
      }
      return [...prev, columnId];
    });
  };

  // Check if column is visible
  const isColumnVisible = (columnId) => visibleColumns.includes(columnId);

  // Load leads data
  const loadLeads = useCallback(async () => {
    setLoading(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 600));
      const sorted = [...mockLeads].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setLeads(sorted);
      setFilteredLeads(sorted);
    } catch (error) {
      console.error('Failed to load leads:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadLeads();
  }, [loadLeads]);

  // Filter leads
  useEffect(() => {
    let filtered = [...leads];

    // Filter by source
    if (sourceFilter !== 'all') {
      filtered = filtered.filter((lead) => lead.source === sourceFilter);
    }

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter((lead) => lead.status === statusFilter);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (lead) =>
          lead.email?.toLowerCase().includes(query) ||
          lead.name?.toLowerCase().includes(query) ||
          lead.mobile?.toLowerCase().includes(query)
      );
    }

    setFilteredLeads(filtered);
    setPage(0);
  }, [searchQuery, sourceFilter, statusFilter, leads]);

  // Handle view details
  const handleViewDetails = (lead) => {
    setSelectedLead(lead);
    setEditNotes(lead.notes || '');
    setEditStatus(lead.status);
    setDetailsDialogOpen(true);
  };

  // Handle update lead
  const handleUpdateLead = async () => {
    try {
      // Update local state
      setLeads((prev) =>
        prev.map((lead) =>
          lead.id === selectedLead.id
            ? { ...lead, status: editStatus, notes: editNotes, updatedAt: new Date().toISOString() }
            : lead
        )
      );
      setDetailsDialogOpen(false);
    } catch (error) {
      console.error('Error updating lead:', error);
    }
  };

  // Handle delete lead
  const handleDeleteLead = async (id) => {
    if (!window.confirm('Are you sure you want to delete this lead?')) return;

    try {
      setLeads((prev) => prev.filter((lead) => lead.id !== id));
      setDetailsDialogOpen(false);
    } catch (error) {
      console.error('Error deleting lead:', error);
    }
  };

  // Handle export - includes all data fields
  const handleExport = () => {
    const headers = [
      'ID',
      'Name',
      'Email',
      'Mobile',
      'Source',
      'Status',
      'Priority',
      'Site Visit Requested',
      'Site Visit Date',
      'Created At',
      'IP Address',
      'Location',
      'User Agent',
      'UTM Source',
      'UTM Medium',
      'UTM Campaign',
    ];
    const rows = filteredLeads.map(lead => [
      lead.id,
      lead.name,
      lead.email,
      lead.mobile,
      formatSource(lead.source),
      getStatusConfig(lead.status).label,
      lead.priority,
      lead.wantsSiteVisit ? 'Yes' : 'No',
      lead.siteVisitDate || '',
      lead.createdAt,
      lead.ipAddress || '',
      lead.location || '',
      lead.userAgent || '',
      lead.utmSource || '',
      lead.utmMedium || '',
      lead.utmCampaign || '',
    ]);

    const csvContent = [headers, ...rows]
      .map(row => row.map(cell => `"${String(cell || '').replace(/"/g, '""')}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `leads-export-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Calculate stats
  const totalCount = leads.length;
  const newCount = leads.filter((l) => l.status === 'new').length;
  const contactedCount = leads.filter((l) => l.status === 'contacted').length;
  const convertedCount = leads.filter((l) => l.status === 'converted').length;

  if (loading) {
    return (
      <AdminLayout title="Leads">
        <Box>
          <Skeleton variant="rounded" height={60} sx={{ mb: 3, borderRadius: 2 }} />
          <Skeleton variant="rounded" height={400} sx={{ borderRadius: 3 }} />
        </Box>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Leads">
      <Head>
        <title>Leads Management | Admin - Nambiar District 25</title>
      </Head>

      <Box>
        {/* Page Header */}
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Leads Management
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Manage, track, and convert all your leads in one place
        </Typography>

        {/* Stats Summary */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={6} md={3}>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                borderRadius: 2,
                border: '1px solid',
                borderColor: 'divider',
                cursor: 'pointer',
                bgcolor: statusFilter === 'all' ? 'rgba(102, 126, 234, 0.1)' : 'transparent',
                '&:hover': { bgcolor: 'rgba(102, 126, 234, 0.08)' },
                transition: 'all 0.2s ease',
              }}
              onClick={() => setStatusFilter('all')}
            >
              <Typography variant="h4" fontWeight="bold" sx={{ color: '#667eea' }}>
                {totalCount}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Leads
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={6} md={3}>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                borderRadius: 2,
                border: '1px solid',
                borderColor: 'divider',
                cursor: 'pointer',
                bgcolor: statusFilter === 'new' ? 'rgba(33, 150, 243, 0.1)' : 'transparent',
                '&:hover': { bgcolor: 'rgba(33, 150, 243, 0.08)' },
                transition: 'all 0.2s ease',
              }}
              onClick={() => setStatusFilter('new')}
            >
              <Typography variant="h4" fontWeight="bold" sx={{ color: '#2196f3' }}>
                {newCount}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                New / Unread
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={6} md={3}>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                borderRadius: 2,
                border: '1px solid',
                borderColor: 'divider',
                cursor: 'pointer',
                bgcolor: statusFilter === 'contacted' ? 'rgba(255, 152, 0, 0.1)' : 'transparent',
                '&:hover': { bgcolor: 'rgba(255, 152, 0, 0.08)' },
                transition: 'all 0.2s ease',
              }}
              onClick={() => setStatusFilter('contacted')}
            >
              <Typography variant="h4" fontWeight="bold" sx={{ color: '#ff9800' }}>
                {contactedCount}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Contacted
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={6} md={3}>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                borderRadius: 2,
                border: '1px solid',
                borderColor: 'divider',
                cursor: 'pointer',
                bgcolor: statusFilter === 'converted' ? 'rgba(76, 175, 80, 0.1)' : 'transparent',
                '&:hover': { bgcolor: 'rgba(76, 175, 80, 0.08)' },
                transition: 'all 0.2s ease',
              }}
              onClick={() => setStatusFilter('converted')}
            >
              <Typography variant="h4" fontWeight="bold" sx={{ color: '#4caf50' }}>
                {convertedCount}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Converted
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* Filters */}
        <Paper
          elevation={0}
          sx={{
            p: 2,
            mb: 3,
            borderRadius: 3,
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                placeholder="Search by name, email, or mobile..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Icon icon="mdi:magnify" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  },
                }}
              />
            </Grid>
            <Grid item xs={6} md={2}>
              <FormControl fullWidth>
                <InputLabel>Source</InputLabel>
                <Select
                  value={sourceFilter}
                  label="Source"
                  onChange={(e) => setSourceFilter(e.target.value)}
                  sx={{ borderRadius: 2 }}
                >
                  <MenuItem value="all">All Sources</MenuItem>
                  <MenuItem value="hero_form">Hero Form</MenuItem>
                  <MenuItem value="popup_form">Popup Form</MenuItem>
                  <MenuItem value="cta_form">CTA Form</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} md={2}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={statusFilter}
                  label="Status"
                  onChange={(e) => setStatusFilter(e.target.value)}
                  sx={{ borderRadius: 2 }}
                >
                  <MenuItem value="all">All Status</MenuItem>
                  {LEAD_STATUS_OPTIONS.map((status) => (
                    <MenuItem key={status.value} value={status.value}>
                      {status.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ display: 'flex', gap: 1, justifyContent: { xs: 'flex-start', md: 'flex-end' }, flexWrap: 'wrap' }}>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<Icon icon="mdi:refresh" width={16} />}
                  onClick={loadLeads}
                  sx={{
                    borderRadius: 1.5,
                    textTransform: 'none',
                    fontSize: '0.8125rem',
                    px: 1.5,
                    py: 0.5,
                    borderColor: 'grey.300',
                    color: 'text.secondary',
                    '&:hover': {
                      borderColor: 'grey.400',
                      backgroundColor: 'grey.50',
                    },
                  }}
                >
                  Refresh
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<Icon icon="mdi:filter-remove" width={16} />}
                  onClick={() => {
                    setSourceFilter('all');
                    setStatusFilter('all');
                    setSearchQuery('');
                  }}
                  sx={{
                    borderRadius: 1.5,
                    textTransform: 'none',
                    fontSize: '0.8125rem',
                    px: 1.5,
                    py: 0.5,
                    borderColor: 'grey.300',
                    color: 'text.secondary',
                    '&:hover': {
                      borderColor: 'grey.400',
                      backgroundColor: 'grey.50',
                    },
                  }}
                >
                  Clear
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<Icon icon="mdi:view-column" width={16} />}
                  onClick={(e) => setColumnMenuAnchor(e.currentTarget)}
                  sx={{
                    borderRadius: 1.5,
                    textTransform: 'none',
                    fontSize: '0.8125rem',
                    px: 1.5,
                    py: 0.5,
                    borderColor: 'grey.300',
                    color: 'text.secondary',
                    '&:hover': {
                      borderColor: 'grey.400',
                      backgroundColor: 'grey.50',
                    },
                  }}
                >
                  Columns
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<Icon icon="mdi:download" width={16} />}
                  onClick={handleExport}
                  sx={{
                    borderRadius: 1.5,
                    textTransform: 'none',
                    fontSize: '0.8125rem',
                    px: 1.5,
                    py: 0.5,
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    boxShadow: '0 2px 4px rgba(102, 126, 234, 0.25)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #5a72d4 0%, #6a4190 100%)',
                      boxShadow: '0 3px 6px rgba(102, 126, 234, 0.35)',
                    },
                  }}
                >
                  Export
                </Button>
              </Box>
              {/* Column Selector Menu */}
              <Menu
                anchorEl={columnMenuAnchor}
                open={Boolean(columnMenuAnchor)}
                onClose={() => setColumnMenuAnchor(null)}
                PaperProps={{
                  sx: { minWidth: 200, mt: 1 },
                }}
              >
                <Box sx={{ px: 2, py: 1 }}>
                  <Typography variant="subtitle2" fontWeight="bold">
                    Toggle Columns
                  </Typography>
                </Box>
                <Divider />
                {ALL_COLUMNS.filter(col => !col.alwaysVisible).map((column) => (
                  <MenuItem
                    key={column.id}
                    onClick={() => handleToggleColumn(column.id)}
                    sx={{ py: 0.5 }}
                  >
                    <ListItemIcon>
                      <Checkbox
                        checked={isColumnVisible(column.id)}
                        size="small"
                        sx={{
                          '&.Mui-checked': {
                            color: '#667eea',
                          },
                        }}
                      />
                    </ListItemIcon>
                    <ListItemText primary={column.label} />
                  </MenuItem>
                ))}
              </Menu>
            </Grid>
          </Grid>
        </Paper>

        {/* Leads Table */}
        <Paper
          elevation={0}
          sx={{
            borderRadius: 3,
            border: '1px solid',
            borderColor: 'divider',
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              p: 2.5,
              borderBottom: '1px solid',
              borderColor: 'divider',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography variant="h6" fontWeight="bold">
                All Leads
              </Typography>
              <Chip
                label={`${filteredLeads.length} leads found`}
                size="small"
                sx={{ bgcolor: 'rgba(102, 126, 234, 0.1)', color: '#667eea' }}
              />
            </Box>
            <IconButton onClick={loadLeads} size="small">
              <Icon icon="mdi:refresh" />
            </IconButton>
          </Box>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)' }}>
                  <TableCell padding="checkbox" sx={{ display: { xs: 'none', sm: 'table-cell' } }}>
                    <Checkbox
                      indeterminate={selectedLeads.length > 0 && selectedLeads.length < filteredLeads.length}
                      checked={filteredLeads.length > 0 && selectedLeads.length === filteredLeads.length}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedLeads(filteredLeads.map(l => l.id));
                        } else {
                          setSelectedLeads([]);
                        }
                      }}
                    />
                  </TableCell>
                  {isColumnVisible('lead') && (
                    <TableCell sx={{ fontWeight: 600 }}>Lead</TableCell>
                  )}
                  {isColumnVisible('email') && (
                    <TableCell sx={{ fontWeight: 600, display: { xs: 'none', md: 'table-cell' } }}>Email</TableCell>
                  )}
                  {isColumnVisible('source') && (
                    <TableCell sx={{ fontWeight: 600 }}>Source</TableCell>
                  )}
                  {isColumnVisible('status') && (
                    <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                  )}
                  {isColumnVisible('priority') && (
                    <TableCell sx={{ fontWeight: 600 }}>Priority</TableCell>
                  )}
                  {isColumnVisible('siteVisit') && (
                    <TableCell sx={{ fontWeight: 600 }}>Site Visit</TableCell>
                  )}
                  {isColumnVisible('date') && (
                    <TableCell sx={{ fontWeight: 600, display: { xs: 'none', sm: 'table-cell' } }}>Date</TableCell>
                  )}
                  <TableCell align="right" sx={{ fontWeight: 600 }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <AnimatePresence>
                  {filteredLeads
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((lead) => {
                      const statusConfig = getStatusConfig(lead.status);
                      const isNew = lead.status === 'new';
                      return (
                        <motion.tr
                          key={lead.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          component={TableRow}
                          hover
                          sx={{
                            bgcolor: isNew
                              ? theme.palette.mode === 'dark'
                                ? 'rgba(33, 150, 243, 0.05)'
                                : 'rgba(33, 150, 243, 0.03)'
                              : 'transparent',
                          }}
                        >
                          <TableCell padding="checkbox" sx={{ display: { xs: 'none', sm: 'table-cell' } }}>
                            <Checkbox
                              checked={selectedLeads.includes(lead.id)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedLeads([...selectedLeads, lead.id]);
                                } else {
                                  setSelectedLeads(selectedLeads.filter(id => id !== lead.id));
                                }
                              }}
                            />
                          </TableCell>
                          {isColumnVisible('lead') && (
                            <TableCell>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                <Avatar
                                  sx={{
                                    width: 36,
                                    height: 36,
                                    fontSize: '0.875rem',
                                    bgcolor: getSourceColor(lead.source),
                                    color: '#fff',
                                  }}
                                >
                                  {lead.name?.[0]?.toUpperCase() || '?'}
                                </Avatar>
                                <Box>
                                  <Typography variant="body2" fontWeight={500}>
                                    {lead.name}
                                  </Typography>
                                  <Typography variant="caption" color="text.secondary">
                                    {lead.mobile}
                                  </Typography>
                                  {/* Show email on mobile when email column is hidden */}
                                  <Typography
                                    variant="caption"
                                    color="text.secondary"
                                    sx={{
                                      display: { xs: 'block', md: 'none' },
                                      fontSize: '0.7rem',
                                      maxWidth: 150,
                                      overflow: 'hidden',
                                      textOverflow: 'ellipsis',
                                    }}
                                  >
                                    {lead.email}
                                  </Typography>
                                </Box>
                              </Box>
                            </TableCell>
                          )}
                          {isColumnVisible('email') && (
                            <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                              <Typography variant="body2" color="text.secondary">
                                {lead.email}
                              </Typography>
                            </TableCell>
                          )}
                          {isColumnVisible('source') && (
                            <TableCell>
                              <Chip
                                label={formatSource(lead.source)}
                                size="small"
                                variant="outlined"
                                sx={{
                                  borderRadius: 1.5,
                                  fontSize: '0.75rem',
                                  borderColor: getSourceColor(lead.source),
                                  color: getSourceColor(lead.source),
                                }}
                              />
                            </TableCell>
                          )}
                          {isColumnVisible('status') && (
                            <TableCell>
                              <Chip
                                label={statusConfig.label}
                                size="small"
                                sx={{
                                  bgcolor: `${statusConfig.color}15`,
                                  color: statusConfig.color,
                                  fontWeight: 500,
                                  textTransform: 'capitalize',
                                  borderRadius: 1.5,
                                  fontSize: '0.75rem',
                                }}
                              />
                            </TableCell>
                          )}
                          {isColumnVisible('priority') && (
                            <TableCell>
                              <Chip
                                label={lead.priority}
                                size="small"
                                sx={{
                                  bgcolor: `${getPriorityColor(lead.priority)}15`,
                                  color: getPriorityColor(lead.priority),
                                  fontWeight: 500,
                                  textTransform: 'capitalize',
                                  borderRadius: 1.5,
                                  fontSize: '0.75rem',
                                }}
                              />
                            </TableCell>
                          )}
                          {isColumnVisible('siteVisit') && (
                            <TableCell>
                              {lead.wantsSiteVisit ? (
                                <Icon icon="mdi:check-circle" style={{ color: '#4caf50', fontSize: 20 }} />
                              ) : (
                                <Typography color="text.disabled">-</Typography>
                              )}
                            </TableCell>
                          )}
                          {isColumnVisible('date') && (
                            <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>
                              <Typography variant="caption" color="text.secondary">
                                {formatDate(lead.createdAt)}
                              </Typography>
                            </TableCell>
                          )}
                          <TableCell align="right">
                            <Tooltip title="View Details">
                              <IconButton
                                size="small"
                                onClick={() => handleViewDetails(lead)}
                                sx={{ color: 'primary.main' }}
                              >
                                <Icon icon="mdi:eye" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete">
                              <IconButton
                                size="small"
                                onClick={() => handleDeleteLead(lead.id)}
                                sx={{ color: 'error.main' }}
                              >
                                <Icon icon="mdi:delete-outline" />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                        </motion.tr>
                      );
                    })}
                </AnimatePresence>
                {filteredLeads.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={visibleColumns.length + 2} align="center" sx={{ py: 6 }}>
                      <Icon icon="mdi:email-search-outline" style={{ fontSize: 48, opacity: 0.3 }} />
                      <Typography color="text.secondary" sx={{ mt: 1 }}>
                        No leads found
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            component="div"
            count={filteredLeads.length}
            page={page}
            onPageChange={(e, newPage) => setPage(newPage)}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={(e) => {
              setRowsPerPage(parseInt(e.target.value, 10));
              setPage(0);
            }}
            rowsPerPageOptions={[5, 10, 25, 50]}
          />
        </Paper>

        {/* Lead Details Dialog */}
        <Dialog
          open={detailsDialogOpen}
          onClose={() => setDetailsDialogOpen(false)}
          maxWidth="md"
          fullWidth
          PaperProps={{
            sx: { borderRadius: 3 },
          }}
        >
          {selectedLead && (
            <>
              <DialogTitle>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Icon icon="mdi:account-details" style={{ fontSize: 24 }} />
                    Lead Details
                  </Box>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Chip
                      label={formatSource(selectedLead.source)}
                      size="small"
                      sx={{
                        bgcolor: `${getSourceColor(selectedLead.source)}15`,
                        color: getSourceColor(selectedLead.source),
                        textTransform: 'capitalize',
                      }}
                    />
                    <Chip
                      label={getStatusConfig(selectedLead.status).label}
                      color="primary"
                      size="small"
                      sx={{
                        bgcolor: `${getStatusConfig(selectedLead.status).color}15`,
                        color: getStatusConfig(selectedLead.status).color,
                        textTransform: 'capitalize',
                      }}
                    />
                  </Box>
                </Box>
              </DialogTitle>
              <DialogContent dividers>
                <Grid container spacing={3}>
                  {/* Contact Info */}
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2" fontWeight="bold" color="primary" gutterBottom>
                      Contact Information
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" color="text.secondary">Name:</Typography>
                        <Typography variant="body2" fontWeight={500}>{selectedLead.name}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" color="text.secondary">Email:</Typography>
                        <Typography variant="body2">{selectedLead.email}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" color="text.secondary">Mobile:</Typography>
                        <Typography variant="body2">{selectedLead.mobile}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" color="text.secondary">Date:</Typography>
                        <Typography variant="body2">{formatDate(selectedLead.createdAt)}</Typography>
                      </Box>
                    </Box>
                  </Grid>

                  {/* Lead Info */}
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2" fontWeight="bold" color="primary" gutterBottom>
                      Lead Details
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" color="text.secondary">Source:</Typography>
                        <Typography variant="body2">{formatSource(selectedLead.source)}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" color="text.secondary">Priority:</Typography>
                        <Chip
                          label={selectedLead.priority}
                          size="small"
                          sx={{
                            bgcolor: `${getPriorityColor(selectedLead.priority)}15`,
                            color: getPriorityColor(selectedLead.priority),
                            textTransform: 'capitalize',
                            height: 22,
                          }}
                        />
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" color="text.secondary">Site Visit:</Typography>
                        <Typography variant="body2">{selectedLead.wantsSiteVisit ? 'Yes' : 'No'}</Typography>
                      </Box>
                      {selectedLead.siteVisitDate && (
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Typography variant="body2" color="text.secondary">Visit Date:</Typography>
                          <Typography variant="body2">{selectedLead.siteVisitDate}</Typography>
                        </Box>
                      )}
                    </Box>
                  </Grid>

                  {/* Tracking Information */}
                  <Grid item xs={12}>
                    <Divider sx={{ my: 1 }} />
                    <Typography variant="subtitle2" fontWeight="bold" color="primary" gutterBottom sx={{ mt: 2 }}>
                      Tracking Information
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="body2" color="text.secondary">IP Address:</Typography>
                            <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>{selectedLead.ipAddress || '-'}</Typography>
                          </Box>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="body2" color="text.secondary">Location:</Typography>
                            <Typography variant="body2">{selectedLead.location || '-'}</Typography>
                          </Box>
                        </Box>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="body2" color="text.secondary">UTM Source:</Typography>
                            <Typography variant="body2">{selectedLead.utmSource || '-'}</Typography>
                          </Box>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="body2" color="text.secondary">UTM Medium:</Typography>
                            <Typography variant="body2">{selectedLead.utmMedium || '-'}</Typography>
                          </Box>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="body2" color="text.secondary">UTM Campaign:</Typography>
                            <Typography variant="body2">{selectedLead.utmCampaign || '-'}</Typography>
                          </Box>
                        </Box>
                      </Grid>
                      <Grid item xs={12}>
                        <Box>
                          <Typography variant="body2" color="text.secondary" gutterBottom>User Agent:</Typography>
                          <Typography
                            variant="caption"
                            sx={{
                              display: 'block',
                              fontFamily: 'monospace',
                              bgcolor: 'grey.100',
                              p: 1,
                              borderRadius: 1,
                              wordBreak: 'break-all',
                            }}
                          >
                            {selectedLead.userAgent || '-'}
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>

                  {/* Update Status */}
                  <Grid item xs={12}>
                    <Divider sx={{ my: 1 }} />
                    <Typography variant="subtitle2" fontWeight="bold" color="primary" gutterBottom sx={{ mt: 2 }}>
                      Update Lead
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={4}>
                        <FormControl fullWidth>
                          <InputLabel>Status</InputLabel>
                          <Select
                            value={editStatus}
                            label="Status"
                            onChange={(e) => setEditStatus(e.target.value)}
                          >
                            {LEAD_STATUS_OPTIONS.map((status) => (
                              <MenuItem key={status.value} value={status.value} sx={{ textTransform: 'capitalize' }}>
                                {status.label}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={8}>
                        <TextField
                          fullWidth
                          label="Notes"
                          multiline
                          rows={2}
                          value={editNotes}
                          onChange={(e) => setEditNotes(e.target.value)}
                          placeholder="Add internal notes about this lead..."
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions sx={{ p: 2, justifyContent: 'space-between' }}>
                <Button
                  color="error"
                  startIcon={<Icon icon="mdi:delete-outline" />}
                  onClick={() => handleDeleteLead(selectedLead.id)}
                >
                  Delete
                </Button>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button onClick={() => setDetailsDialogOpen(false)}>Cancel</Button>
                  <Button
                    variant="contained"
                    onClick={handleUpdateLead}
                    sx={{
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #5a72d4 0%, #6a4190 100%)',
                      },
                    }}
                  >
                    Save Changes
                  </Button>
                </Box>
              </DialogActions>
            </>
          )}
        </Dialog>
      </Box>
    </AdminLayout>
  );
};

export default withAuth(AdminLeadsPage);
