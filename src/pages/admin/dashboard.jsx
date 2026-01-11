/**
 * Admin Dashboard Page
 * Main dashboard with stats, charts, and recent leads
 */

import { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Skeleton,
  Tooltip,
  Avatar,
  alpha,
  Card,
  CardContent,
  CardHeader,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
} from '@mui/material';
import {
  Visibility as VisibilityIcon,
  Download as DownloadIcon,
  Refresh as RefreshIcon,
  TrendingUp as TrendingUpIcon,
  OpenInNew as OpenInNewIcon,
  Schedule as ScheduleIcon,
  LocationOn as LocationIcon,
} from '@mui/icons-material';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import AdminLayout from '@/components/admin/AdminLayout';
import DashboardStats from '@/components/admin/DashboardStats';
import { LeadsChart, SourcePieChart, StatusBarChart } from '@/components/admin/Charts';
import { withAuth } from '@/context/AuthContext';
import { ADMIN_ROUTES, LEAD_STATUS_OPTIONS } from '@/lib/constants';
import { getDashboardStats, getRecentLeads } from '@/lib/api/dashboard';
import { getLeads } from '@/lib/api/leads';

// Mock data for demonstration
const mockStats = {
  totalLeads: 156,
  newLeads: 23,
  contactedLeads: 89,
  siteVisits: 45,
  convertedLeads: 34,
  conversionRate: 21.8,
};

const mockLeadsByDay = [
  { date: '2026-01-05', count: 12 },
  { date: '2026-01-06', count: 18 },
  { date: '2026-01-07', count: 15 },
  { date: '2026-01-08', count: 22 },
  { date: '2026-01-09', count: 8 },
  { date: '2026-01-10', count: 19 },
  { date: '2026-01-11', count: 14 },
];

const mockLeadsBySource = {
  hero_form: 67,
  popup_form: 52,
  cta_form: 37,
};

const mockLeadsByStatus = {
  new: 23,
  contacted: 45,
  site_visit_scheduled: 28,
  visited: 20,
  negotiation: 15,
  converted: 34,
  lost: 10,
};

const mockTopLocations = [
  { city: 'Bangalore', count: 89 },
  { city: 'Mumbai', count: 34 },
  { city: 'Chennai', count: 18 },
  { city: 'Hyderabad', count: 15 },
];

const mockRecentLeads = [
  { id: 1, name: 'Rahul Kumar', email: 'rahul@email.com', mobile: '9876543210', source: 'hero_form', status: 'new', wantsSiteVisit: true, createdAt: '2026-01-11T10:30:00' },
  { id: 2, name: 'Priya Sharma', email: 'priya@email.com', mobile: '9876543211', source: 'popup_form', status: 'contacted', wantsSiteVisit: false, createdAt: '2026-01-11T09:15:00' },
  { id: 3, name: 'Amit Singh', email: 'amit@email.com', mobile: '9876543212', source: 'cta_form', status: 'site_visit_scheduled', wantsSiteVisit: true, createdAt: '2026-01-10T16:45:00' },
  { id: 4, name: 'Deepika Patel', email: 'deepika@email.com', mobile: '9876543213', source: 'hero_form', status: 'visited', wantsSiteVisit: true, createdAt: '2026-01-10T14:20:00' },
  { id: 5, name: 'Vikram Reddy', email: 'vikram@email.com', mobile: '9876543214', source: 'popup_form', status: 'negotiation', wantsSiteVisit: false, createdAt: '2026-01-10T11:00:00' },
  { id: 6, name: 'Sneha Nair', email: 'sneha@email.com', mobile: '9876543215', source: 'hero_form', status: 'converted', wantsSiteVisit: true, createdAt: '2026-01-09T15:30:00' },
];

// Utility functions
const formatDate = (dateString) => {
  if (!dateString) return '-';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
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

/**
 * Recent Leads Table Component
 */
const RecentLeadsTable = ({ leads, loading, onViewLead, onViewAll }) => (
  <Paper
    sx={{
      borderRadius: 3,
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
      overflow: 'hidden',
      border: '1px solid',
      borderColor: 'divider',
    }}
  >
    <Box
      sx={{
        p: 3,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 700 }}>
        Recent Leads
      </Typography>
      <Button
        size="small"
        endIcon={<OpenInNewIcon fontSize="small" />}
        onClick={onViewAll}
        sx={{ color: '#8B9A46' }}
      >
        View All
      </Button>
    </Box>

    <TableContainer>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: '#f8f9fa' }}>
            <TableCell sx={{ fontWeight: 600 }}>Lead</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Source</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
            <TableCell align="center" sx={{ fontWeight: 600 }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? (
            [...Array(5)].map((_, index) => (
              <TableRow key={index}>
                {[...Array(5)].map((_, cellIndex) => (
                  <TableCell key={cellIndex}>
                    <Skeleton variant="text" animation="wave" />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            leads.map((lead) => {
              const statusConfig = getStatusConfig(lead.status);
              return (
                <TableRow
                  key={lead.id}
                  hover
                  sx={{
                    cursor: 'pointer',
                    '&:last-child td': { border: 0 },
                  }}
                  onClick={() => onViewLead(lead.id)}
                >
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar
                        sx={{
                          width: 36,
                          height: 36,
                          fontSize: '0.875rem',
                          backgroundColor: alpha('#8B9A46', 0.15),
                          color: '#8B9A46',
                        }}
                      >
                        {lead.name?.charAt(0)?.toUpperCase()}
                      </Avatar>
                      <Box>
                        <Typography variant="body2" fontWeight={600}>
                          {lead.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {lead.mobile}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={formatSource(lead.source)}
                      size="small"
                      variant="outlined"
                      sx={{ borderRadius: 1.5, fontSize: '0.75rem' }}
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={statusConfig.label}
                      size="small"
                      sx={{
                        backgroundColor: alpha(statusConfig.color, 0.15),
                        color: statusConfig.color,
                        fontWeight: 600,
                        borderRadius: 1.5,
                        fontSize: '0.75rem',
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {formatDate(lead.createdAt)}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title="View Details">
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          onViewLead(lead.id);
                        }}
                        sx={{ color: '#8B9A46' }}
                      >
                        <VisibilityIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </TableContainer>
  </Paper>
);

/**
 * Top Locations Card Component
 */
const TopLocationsCard = ({ locations, loading }) => (
  <Card
    sx={{
      height: '100%',
      borderRadius: 3,
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
      border: '1px solid',
      borderColor: 'divider',
    }}
  >
    <CardHeader
      title={<Typography variant="h6" sx={{ fontWeight: 700 }}>Top Locations</Typography>}
      sx={{ pb: 0 }}
    />
    <CardContent>
      {loading ? (
        [...Array(4)].map((_, i) => (
          <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 2, py: 1.5 }}>
            <Skeleton variant="circular" width={36} height={36} />
            <Box sx={{ flex: 1 }}>
              <Skeleton variant="text" width="60%" />
              <Skeleton variant="text" width="30%" />
            </Box>
          </Box>
        ))
      ) : (
        <List sx={{ py: 0 }}>
          {locations.map((location, index) => (
            <ListItem
              key={location.city}
              sx={{
                px: 0,
                py: 1.5,
                borderBottom: index < locations.length - 1 ? '1px solid' : 'none',
                borderColor: 'divider',
              }}
            >
              <ListItemAvatar>
                <Avatar
                  sx={{
                    width: 36,
                    height: 36,
                    backgroundColor: alpha('#8B9A46', 0.1),
                    color: '#8B9A46',
                  }}
                >
                  <LocationIcon fontSize="small" />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {location.city}
                  </Typography>
                }
                secondary={
                  <Typography variant="caption" color="text.secondary">
                    {location.count} leads
                  </Typography>
                }
              />
              <Chip
                label={`#${index + 1}`}
                size="small"
                sx={{
                  backgroundColor: index === 0 ? alpha('#c9a227', 0.15) : alpha('#1a1a2e', 0.08),
                  color: index === 0 ? '#c9a227' : 'text.secondary',
                  fontWeight: 600,
                  fontSize: '0.7rem',
                }}
              />
            </ListItem>
          ))}
        </List>
      )}
    </CardContent>
  </Card>
);

/**
 * Admin Dashboard Page Component
 */
const AdminDashboardPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(mockStats);
  const [leadsByDay, setLeadsByDay] = useState(mockLeadsByDay);
  const [leadsBySource, setLeadsBySource] = useState(mockLeadsBySource);
  const [leadsByStatus, setLeadsByStatus] = useState(mockLeadsByStatus);
  const [topLocations, setTopLocations] = useState(mockTopLocations);
  const [recentLeads, setRecentLeads] = useState(mockRecentLeads);

  // Load dashboard data
  const loadDashboardData = useCallback(async () => {
    setLoading(true);
    try {
      // In a real app, fetch from API
      // const statsResponse = await getDashboardStats();
      // const leadsResponse = await getRecentLeads(6);

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));

      // Set mock data
      setStats(mockStats);
      setLeadsByDay(mockLeadsByDay);
      setLeadsBySource(mockLeadsBySource);
      setLeadsByStatus(mockLeadsByStatus);
      setTopLocations(mockTopLocations);
      setRecentLeads(mockRecentLeads);
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDashboardData();
  }, [loadDashboardData]);

  // Handle refresh
  const handleRefresh = () => {
    loadDashboardData();
  };

  // Handle view lead
  const handleViewLead = (id) => {
    router.push(`/admin/leads/${id}`);
  };

  // Handle export leads
  const handleExportLeads = () => {
    // Create CSV content
    const headers = ['Name', 'Email', 'Mobile', 'Source', 'Status', 'Created At'];
    const rows = recentLeads.map(lead => [
      lead.name,
      lead.email,
      lead.mobile,
      lead.source,
      lead.status,
      lead.createdAt,
    ]);

    const csvContent = [headers, ...rows]
      .map(row => row.join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `leads-export-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <AdminLayout title="Dashboard">
      <Head>
        <title>Dashboard | Admin - Nambiar District 25</title>
      </Head>

      <Box>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 800, color: '#1a1a2e', mb: 0.5 }}>
              Dashboard
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Welcome back! Here&apos;s what&apos;s happening with your leads today.
            </Typography>
          </Box>
          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              startIcon={<RefreshIcon />}
              onClick={handleRefresh}
              disabled={loading}
            >
              Refresh
            </Button>
            <Button
              variant="contained"
              startIcon={<DownloadIcon />}
              onClick={handleExportLeads}
              sx={{
                backgroundColor: '#8B9A46',
                '&:hover': { backgroundColor: '#6b7a36' },
              }}
            >
              Export Leads
            </Button>
          </Stack>
        </Box>

        {/* Stats Cards */}
        <Box sx={{ mb: 4 }}>
          <DashboardStats stats={stats} loading={loading} onRefresh={handleRefresh} />
        </Box>

        {/* Charts Row */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {/* Leads Trend Chart */}
          <Grid item xs={12} lg={8}>
            <LeadsChart
              data={leadsByDay}
              loading={loading}
              title="Leads Trend"
              subtitle="Last 7 days performance"
              onRefresh={handleRefresh}
            />
          </Grid>

          {/* Source Distribution */}
          <Grid item xs={12} lg={4}>
            <SourcePieChart
              data={leadsBySource}
              loading={loading}
              title="Leads by Source"
            />
          </Grid>
        </Grid>

        {/* Second Row */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {/* Status Distribution */}
          <Grid item xs={12} md={6} lg={4}>
            <StatusBarChart
              data={leadsByStatus}
              loading={loading}
              title="Leads by Status"
            />
          </Grid>

          {/* Top Locations */}
          <Grid item xs={12} md={6} lg={4}>
            <TopLocationsCard
              locations={topLocations}
              loading={loading}
            />
          </Grid>

          {/* Quick Stats Card */}
          <Grid item xs={12} lg={4}>
            <Card
              sx={{
                height: '100%',
                borderRadius: 3,
                background: 'linear-gradient(135deg, #1a1a2e 0%, #2d2d4a 100%)',
                color: '#fff',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                  <Box
                    sx={{
                      p: 1.5,
                      borderRadius: 2,
                      backgroundColor: 'rgba(255,255,255,0.15)',
                    }}
                  >
                    <TrendingUpIcon />
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    Performance Summary
                  </Typography>
                </Box>

                <Stack spacing={3}>
                  <Box>
                    <Typography variant="body2" sx={{ opacity: 0.7, mb: 0.5 }}>
                      Conversion Rate
                    </Typography>
                    <Typography variant="h3" sx={{ fontWeight: 800 }}>
                      {loading ? <Skeleton width={80} sx={{ bgcolor: 'rgba(255,255,255,0.1)' }} /> : `${stats.conversionRate}%`}
                    </Typography>
                  </Box>

                  <Divider sx={{ borderColor: 'rgba(255,255,255,0.2)' }} />

                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box>
                      <Typography variant="caption" sx={{ opacity: 0.7 }}>
                        Total Leads
                      </Typography>
                      <Typography variant="h6" sx={{ fontWeight: 700 }}>
                        {loading ? <Skeleton width={40} sx={{ bgcolor: 'rgba(255,255,255,0.1)' }} /> : stats.totalLeads}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="caption" sx={{ opacity: 0.7 }}>
                        Converted
                      </Typography>
                      <Typography variant="h6" sx={{ fontWeight: 700, color: '#4caf50' }}>
                        {loading ? <Skeleton width={40} sx={{ bgcolor: 'rgba(255,255,255,0.1)' }} /> : stats.convertedLeads}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="caption" sx={{ opacity: 0.7 }}>
                        Site Visits
                      </Typography>
                      <Typography variant="h6" sx={{ fontWeight: 700, color: '#ff9800' }}>
                        {loading ? <Skeleton width={40} sx={{ bgcolor: 'rgba(255,255,255,0.1)' }} /> : stats.siteVisits}
                      </Typography>
                    </Box>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Recent Leads Table */}
        <RecentLeadsTable
          leads={recentLeads}
          loading={loading}
          onViewLead={handleViewLead}
          onViewAll={() => router.push(ADMIN_ROUTES.LEADS)}
        />
      </Box>
    </AdminLayout>
  );
};

// Export with auth protection
export default withAuth(AdminDashboardPage);
