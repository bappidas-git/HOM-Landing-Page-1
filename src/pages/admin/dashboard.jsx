/**
 * Admin Dashboard Page
 * Main dashboard with stats, charts, and recent leads - Matching reference code design
 */

import { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Avatar,
  Skeleton,
  Button,
  IconButton,
  Tooltip,
  useTheme,
} from '@mui/material';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import AdminLayout from '@/components/admin/AdminLayout';
import { LeadsChart, SourcePieChart, StatusBarChart } from '@/components/admin/Charts';
import { withAuth } from '@/context/AuthContext';
import { ADMIN_ROUTES, LEAD_STATUS_OPTIONS } from '@/lib/constants';

// StatCard Component - Matching reference code design
const StatCard = ({ title, value, icon, color, trend, trendValue, loading }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: 3,
          border: '1px solid',
          borderColor: 'divider',
          height: '100%',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background Decoration */}
        <Box
          sx={{
            position: 'absolute',
            top: -20,
            right: -20,
            width: 100,
            height: 100,
            borderRadius: '50%',
            background: `${color}15`,
          }}
        />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {title}
            </Typography>
            {loading ? (
              <Skeleton variant="text" width={80} height={40} />
            ) : (
              <Typography variant="h4" fontWeight="bold">
                {value}
              </Typography>
            )}
            {trend && !loading && (
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                <Icon
                  icon={trend === 'up' ? 'mdi:trending-up' : 'mdi:trending-down'}
                  style={{
                    fontSize: 18,
                    color: trend === 'up' ? '#4caf50' : '#f44336',
                    marginRight: 4,
                  }}
                />
                <Typography
                  variant="caption"
                  sx={{ color: trend === 'up' ? '#4caf50' : '#f44336' }}
                >
                  {trendValue}
                </Typography>
              </Box>
            )}
          </Box>
          <Avatar
            sx={{
              width: 50,
              height: 50,
              bgcolor: `${color}20`,
              color: color,
            }}
          >
            <Icon icon={icon} style={{ fontSize: 28 }} />
          </Avatar>
        </Box>
      </Paper>
    </motion.div>
  );
};

// Mock data for demonstration
const mockStats = {
  totalLeads: 156,
  newLeads: 23,
  contactedLeads: 89,
  siteVisits: 45,
  convertedLeads: 34,
  conversionRate: 21.0,
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
 * Admin Dashboard Page Component
 */
const AdminDashboardPage = () => {
  const router = useRouter();
  const theme = useTheme();
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

  // Handle view lead
  const handleViewLead = (id) => {
    router.push(`/admin/leads/${id}`);
  };

  // Handle export leads
  const handleExportLeads = () => {
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

  if (loading) {
    return (
      <AdminLayout title="Dashboard">
        <Box>
          <Grid container spacing={3}>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Grid item xs={4} md={6} lg={4} key={i}>
                <Skeleton variant="rounded" height={140} sx={{ borderRadius: 3 }} />
              </Grid>
            ))}
          </Grid>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12} lg={8}>
              <Skeleton variant="rounded" height={400} sx={{ borderRadius: 3 }} />
            </Grid>
            <Grid item xs={12} lg={4}>
              <Skeleton variant="rounded" height={400} sx={{ borderRadius: 3 }} />
            </Grid>
          </Grid>
        </Box>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Dashboard">
      <Head>
        <title>Dashboard | Admin - Nambiar District 25</title>
      </Head>

      <Box>
        {/* Page Header */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Dashboard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Welcome back! Here&apos;s what&apos;s happening with your leads today.
          </Typography>
        </Box>

        {/* Stats Cards */}
        <Grid container spacing={3}>
          <Grid item xs={4} md={6} lg={4}>
            <StatCard
              title="Total Leads"
              value={stats.totalLeads}
              icon="mdi:account-group"
              color="#667eea"
              trend="up"
              trendValue="12.5% vs last week"
              loading={loading}
            />
          </Grid>
          <Grid item xs={4} md={6} lg={4}>
            <StatCard
              title="New Today"
              value={stats.newLeads}
              icon="mdi:account-plus"
              color="#4caf50"
              trend="up"
              trendValue="23.1% vs last week"
              loading={loading}
            />
          </Grid>
          <Grid item xs={4} md={6} lg={4}>
            <StatCard
              title="Contacted"
              value={stats.contactedLeads}
              icon="mdi:phone-in-talk"
              color="#ff9800"
              trend="up"
              trendValue="8.4% vs last week"
              loading={loading}
            />
          </Grid>
          <Grid item xs={4} md={6} lg={4}>
            <StatCard
              title="Site Visits"
              value={stats.siteVisits}
              icon="mdi:calendar-check"
              color="#e91e63"
              trend="down"
              trendValue="5.2% vs last week"
              loading={loading}
            />
          </Grid>
          <Grid item xs={4} md={6} lg={4}>
            <StatCard
              title="Converted"
              value={stats.convertedLeads}
              icon="mdi:check-circle"
              color="#2196f3"
              trend="up"
              trendValue="15.7% vs last week"
              loading={loading}
            />
          </Grid>
          <Grid item xs={4} md={6} lg={4}>
            <StatCard
              title="Conversion Rate"
              value={`${stats.conversionRate}%`}
              icon="mdi:percent"
              color="#9c27b0"
              trend="up"
              trendValue="2.3% vs last week"
              loading={loading}
            />
          </Grid>
        </Grid>

        {/* Charts Row */}
        <Grid container spacing={3} sx={{ mt: 1 }}>
          {/* Leads Trend Chart */}
          <Grid item xs={12} lg={8}>
            <LeadsChart
              data={leadsByDay}
              loading={loading}
              title="Leads Trend"
              subtitle="Last 7 days performance"
              onRefresh={loadDashboardData}
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
        <Grid container spacing={3} sx={{ mt: 1 }}>
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
            <Paper
              elevation={0}
              sx={{
                height: '100%',
                borderRadius: 3,
                border: '1px solid',
                borderColor: 'divider',
                overflow: 'hidden',
              }}
            >
              <Box sx={{ p: 2.5, borderBottom: '1px solid', borderColor: 'divider' }}>
                <Typography variant="h6" fontWeight="bold">
                  Top Locations
                </Typography>
              </Box>
              <Box sx={{ p: 2 }}>
                {topLocations.map((location, index) => (
                  <Box
                    key={location.city}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      py: 1.5,
                      borderBottom: index < topLocations.length - 1 ? '1px solid' : 'none',
                      borderColor: 'divider',
                    }}
                  >
                    <Avatar
                      sx={{
                        width: 36,
                        height: 36,
                        bgcolor: 'rgba(102, 126, 234, 0.1)',
                        color: '#667eea',
                      }}
                    >
                      <Icon icon="mdi:map-marker" />
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body2" fontWeight={600}>
                        {location.city}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {location.count} leads
                      </Typography>
                    </Box>
                    <Chip
                      label={`#${index + 1}`}
                      size="small"
                      sx={{
                        bgcolor: index === 0 ? 'rgba(201, 162, 39, 0.15)' : 'rgba(26, 26, 46, 0.08)',
                        color: index === 0 ? '#c9a227' : 'text.secondary',
                        fontWeight: 600,
                        fontSize: '0.7rem',
                      }}
                    />
                  </Box>
                ))}
              </Box>
            </Paper>
          </Grid>

          {/* Performance Summary */}
          <Grid item xs={12} lg={4}>
            <Paper
              elevation={0}
              sx={{
                height: '100%',
                borderRadius: 3,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: '#fff',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
                p: 3,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <Box
                  sx={{
                    p: 1.5,
                    borderRadius: 2,
                    backgroundColor: 'rgba(255,255,255,0.15)',
                  }}
                >
                  <Icon icon="mdi:trending-up" style={{ fontSize: 24 }} />
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  Performance Summary
                </Typography>
              </Box>

              <Box>
                <Typography variant="body2" sx={{ opacity: 0.9, mb: 0.5 }}>
                  Conversion Rate
                </Typography>
                <Typography variant="h3" sx={{ fontWeight: 800, mb: 3 }}>
                  {stats.conversionRate}%
                </Typography>

                <Box sx={{ borderTop: '1px solid rgba(255,255,255,0.2)', pt: 2 }} />

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                  <Box>
                    <Typography variant="caption" sx={{ opacity: 0.9 }}>
                      Total Leads
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      {stats.totalLeads}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" sx={{ opacity: 0.9 }}>
                      Converted
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#69f0ae' }}>
                      {stats.convertedLeads}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" sx={{ opacity: 0.9 }}>
                      Site Visits
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#ffcc80' }}>
                      {stats.siteVisits}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        {/* Recent Leads Table */}
        <Paper
          elevation={0}
          sx={{
            mt: 3,
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
            <Typography variant="h6" fontWeight="bold">
              Recent Leads
            </Typography>
            <Button
              size="small"
              endIcon={<Icon icon="mdi:open-in-new" style={{ fontSize: 16 }} />}
              onClick={() => router.push(ADMIN_ROUTES.LEADS)}
              sx={{ color: '#667eea', textTransform: 'none' }}
            >
              View All
            </Button>
          </Box>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)' }}>
                  <TableCell sx={{ fontWeight: 600 }}>Lead</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Source</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 600 }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {recentLeads.map((lead) => {
                  const statusConfig = getStatusConfig(lead.status);
                  return (
                    <TableRow key={lead.id} hover>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                          <Avatar
                            sx={{
                              width: 36,
                              height: 36,
                              fontSize: '0.875rem',
                              bgcolor: 'rgba(102, 126, 234, 0.15)',
                              color: '#667eea',
                            }}
                          >
                            {lead.name?.charAt(0)?.toUpperCase()}
                          </Avatar>
                          <Box>
                            <Typography variant="body2" fontWeight={500}>
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
                            bgcolor: `${statusConfig.color}15`,
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
                            onClick={() => handleViewLead(lead.id)}
                            sx={{ color: '#667eea' }}
                          >
                            <Icon icon="mdi:eye" />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </AdminLayout>
  );
};

// Export with auth protection
export default withAuth(AdminDashboardPage);
