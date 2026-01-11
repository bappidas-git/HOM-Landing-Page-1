/**
 * Admin Dashboard Page
 * Main dashboard with stats, charts, and recent leads
 */

import { useState, useEffect } from 'react';
import Head from 'next/head';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
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
} from '@mui/material';
import {
  People as PeopleIcon,
  PersonAdd as PersonAddIcon,
  Phone as PhoneIcon,
  CalendarMonth as CalendarIcon,
  CheckCircle as CheckCircleIcon,
  TrendingUp as TrendingUpIcon,
  Visibility as VisibilityIcon,
  Download as DownloadIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';
import { useRouter } from 'next/router';
import AdminLayout from '@/components/admin/AdminLayout';
import { withAuth } from '@/context/AuthContext';
import { ADMIN_ROUTES, LEAD_STATUS_OPTIONS, DASHBOARD_STATS_CONFIG } from '@/lib/constants';

// Mock data for demonstration
const mockStats = {
  totalLeads: 156,
  newLeads: 12,
  contactedLeads: 45,
  siteVisits: 28,
  convertedLeads: 18,
  conversionRate: 11.5,
};

const mockRecentLeads = [
  { id: 1, name: 'Rahul Kumar', mobile: '9876543210', source: 'hero_form', status: 'new', createdAt: '2025-01-11T10:30:00' },
  { id: 2, name: 'Priya Sharma', mobile: '9876543211', source: 'popup_form', status: 'contacted', createdAt: '2025-01-11T09:15:00' },
  { id: 3, name: 'Amit Singh', mobile: '9876543212', source: 'cta_form', status: 'site_visit_scheduled', createdAt: '2025-01-10T16:45:00' },
  { id: 4, name: 'Deepika Patel', mobile: '9876543213', source: 'hero_form', status: 'visited', createdAt: '2025-01-10T14:20:00' },
  { id: 5, name: 'Vikram Reddy', mobile: '9876543214', source: 'popup_form', status: 'negotiation', createdAt: '2025-01-10T11:00:00' },
];

// Icon mapping
const iconMap = {
  People: PeopleIcon,
  PersonAdd: PersonAddIcon,
  Phone: PhoneIcon,
  CalendarMonth: CalendarIcon,
  CheckCircle: CheckCircleIcon,
  TrendingUp: TrendingUpIcon,
};

/**
 * Stats Card Component
 */
const StatsCard = ({ config, value, loading }) => {
  const IconComponent = iconMap[config.icon] || PeopleIcon;

  return (
    <Card
      sx={{
        height: '100%',
        borderRadius: 3,
        boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {config.label}
            </Typography>
            {loading ? (
              <Skeleton variant="text" width={80} height={40} />
            ) : (
              <Typography variant="h4" sx={{ fontWeight: 700, color: config.color }}>
                {value}
                {config.suffix}
              </Typography>
            )}
          </Box>
          <Box
            sx={{
              p: 1.5,
              borderRadius: 2,
              backgroundColor: `${config.color}15`,
            }}
          >
            <IconComponent sx={{ fontSize: 28, color: config.color }} />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

/**
 * Admin Dashboard Page Component
 */
const AdminDashboardPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(mockStats);
  const [recentLeads, setRecentLeads] = useState(mockRecentLeads);

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Handle refresh
  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  };

  // Handle view lead
  const handleViewLead = (id) => {
    router.push(`/admin/leads/${id}`);
  };

  // Handle export leads
  const handleExportLeads = () => {
    // TODO: Implement CSV export
    console.log('Exporting leads...');
  };

  // Get status chip color
  const getStatusConfig = (status) => {
    return LEAD_STATUS_OPTIONS.find((opt) => opt.value === status) || { label: status, color: '#9e9e9e' };
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Format source
  const formatSource = (source) => {
    const sources = {
      hero_form: 'Hero Form',
      popup_form: 'Popup Form',
      cta_form: 'CTA Form',
    };
    return sources[source] || source;
  };

  return (
    <AdminLayout title="Dashboard">
      <Head>
        <title>Dashboard | Admin - District 25</title>
      </Head>

      <Box>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700, color: '#1a1a2e', mb: 0.5 }}>
              Dashboard
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Welcome back! Here&apos;s what&apos;s happening with your leads.
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="outlined"
              startIcon={<RefreshIcon />}
              onClick={handleRefresh}
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
          </Box>
        </Box>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {DASHBOARD_STATS_CONFIG.map((config) => (
            <Grid item xs={12} sm={6} md={4} lg={2} key={config.id}>
              <StatsCard
                config={config}
                value={stats[config.key]}
                loading={loading}
              />
            </Grid>
          ))}
        </Grid>

        {/* Recent Leads Table */}
        <Paper
          sx={{
            borderRadius: 3,
            boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
            overflow: 'hidden',
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
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Recent Leads
            </Typography>
            <Button
              size="small"
              onClick={() => router.push(ADMIN_ROUTES.LEADS)}
              sx={{ color: '#8B9A46' }}
            >
              View All
            </Button>
          </Box>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#f5f5f7' }}>
                  <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Mobile</TableCell>
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
                      {[...Array(6)].map((_, cellIndex) => (
                        <TableCell key={cellIndex}>
                          <Skeleton variant="text" />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  recentLeads.map((lead) => {
                    const statusConfig = getStatusConfig(lead.status);
                    return (
                      <TableRow
                        key={lead.id}
                        hover
                        sx={{ '&:last-child td': { border: 0 } }}
                      >
                        <TableCell>
                          <Typography variant="body2" fontWeight={500}>
                            {lead.name}
                          </Typography>
                        </TableCell>
                        <TableCell>{lead.mobile}</TableCell>
                        <TableCell>
                          <Chip
                            label={formatSource(lead.source)}
                            size="small"
                            variant="outlined"
                            sx={{ borderRadius: 1 }}
                          />
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={statusConfig.label}
                            size="small"
                            sx={{
                              backgroundColor: `${statusConfig.color}20`,
                              color: statusConfig.color,
                              fontWeight: 500,
                              borderRadius: 1,
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
      </Box>
    </AdminLayout>
  );
};

// Export with auth protection
export default withAuth(AdminDashboardPage);
