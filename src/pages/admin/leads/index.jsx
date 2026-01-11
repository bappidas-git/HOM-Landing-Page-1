/**
 * Admin Leads Page
 * Leads management with data table, filters, and actions
 */

import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import {
  Box,
  Paper,
  Typography,
  Button,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Chip,
  IconButton,
  Tooltip,
  Skeleton,
  Checkbox,
} from '@mui/material';
import {
  Search as SearchIcon,
  Download as DownloadIcon,
  Visibility as VisibilityIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  FilterList as FilterListIcon,
} from '@mui/icons-material';
import AdminLayout from '@/components/admin/AdminLayout';
import { withAuth } from '@/context/AuthContext';
import { LEAD_STATUS_OPTIONS, LEAD_SOURCE_OPTIONS } from '@/lib/constants';

// Mock data
const mockLeads = [
  { id: 1, name: 'Rahul Kumar', email: 'rahul@email.com', mobile: '9876543210', source: 'hero_form', status: 'new', wantsSiteVisit: true, createdAt: '2025-01-11T10:30:00' },
  { id: 2, name: 'Priya Sharma', email: 'priya@email.com', mobile: '9876543211', source: 'popup_form', status: 'contacted', wantsSiteVisit: false, createdAt: '2025-01-11T09:15:00' },
  { id: 3, name: 'Amit Singh', email: 'amit@email.com', mobile: '9876543212', source: 'cta_form', status: 'site_visit_scheduled', wantsSiteVisit: true, createdAt: '2025-01-10T16:45:00' },
  { id: 4, name: 'Deepika Patel', email: 'deepika@email.com', mobile: '9876543213', source: 'hero_form', status: 'visited', wantsSiteVisit: true, createdAt: '2025-01-10T14:20:00' },
  { id: 5, name: 'Vikram Reddy', email: 'vikram@email.com', mobile: '9876543214', source: 'popup_form', status: 'negotiation', wantsSiteVisit: false, createdAt: '2025-01-10T11:00:00' },
  { id: 6, name: 'Sneha Nair', email: 'sneha@email.com', mobile: '9876543215', source: 'hero_form', status: 'converted', wantsSiteVisit: true, createdAt: '2025-01-09T15:30:00' },
  { id: 7, name: 'Rajesh Gupta', email: 'rajesh@email.com', mobile: '9876543216', source: 'cta_form', status: 'lost', wantsSiteVisit: false, createdAt: '2025-01-09T12:00:00' },
];

/**
 * Admin Leads Page Component
 */
const AdminLeadsPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [leads, setLeads] = useState([]);
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sourceFilter, setSourceFilter] = useState('all');

  // Load data
  useEffect(() => {
    const timer = setTimeout(() => {
      setLeads(mockLeads);
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Filter leads
  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.mobile.includes(searchQuery);
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    const matchesSource = sourceFilter === 'all' || lead.source === sourceFilter;
    return matchesSearch && matchesStatus && matchesSource;
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

  // Handle select all
  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelected(filteredLeads.map((lead) => lead.id));
    } else {
      setSelected([]);
    }
  };

  // Handle select one
  const handleSelectOne = (id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = [...selected, id];
    } else {
      newSelected = selected.filter((selectedId) => selectedId !== id);
    }

    setSelected(newSelected);
  };

  // Handle view lead
  const handleViewLead = (id) => {
    router.push(`/admin/leads/${id}`);
  };

  // Get status config
  const getStatusConfig = (status) => {
    return LEAD_STATUS_OPTIONS.find((opt) => opt.value === status) || { label: status, color: '#9e9e9e' };
  };

  // Format source
  const formatSource = (source) => {
    return LEAD_SOURCE_OPTIONS.find((opt) => opt.value === source)?.label || source;
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <AdminLayout title="Leads">
      <Head>
        <title>Leads | Admin - District 25</title>
      </Head>

      <Box>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700, color: '#1a1a2e', mb: 0.5 }}>
              Leads Management
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Manage and track all your leads in one place
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<DownloadIcon />}
            sx={{
              backgroundColor: '#8B9A46',
              '&:hover': { backgroundColor: '#6b7a36' },
            }}
          >
            Export CSV
          </Button>
        </Box>

        {/* Filters */}
        <Paper sx={{ p: 3, mb: 3, borderRadius: 3 }}>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <TextField
              placeholder="Search by name, email, or mobile..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              size="small"
              sx={{ minWidth: 300 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />
            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Status</InputLabel>
              <Select
                value={statusFilter}
                label="Status"
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <MenuItem value="all">All Status</MenuItem>
                {LEAD_STATUS_OPTIONS.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Source</InputLabel>
              <Select
                value={sourceFilter}
                label="Source"
                onChange={(e) => setSourceFilter(e.target.value)}
              >
                <MenuItem value="all">All Sources</MenuItem>
                {LEAD_SOURCE_OPTIONS.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Paper>

        {/* Leads Table */}
        <Paper sx={{ borderRadius: 3, overflow: 'hidden' }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#f5f5f7' }}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      indeterminate={selected.length > 0 && selected.length < filteredLeads.length}
                      checked={filteredLeads.length > 0 && selected.length === filteredLeads.length}
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Mobile</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Source</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Site Visit</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 600 }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  [...Array(5)].map((_, index) => (
                    <TableRow key={index}>
                      {[...Array(9)].map((_, cellIndex) => (
                        <TableCell key={cellIndex}>
                          <Skeleton variant="text" />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  filteredLeads
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((lead) => {
                      const statusConfig = getStatusConfig(lead.status);
                      const isSelected = selected.includes(lead.id);
                      return (
                        <TableRow key={lead.id} hover selected={isSelected}>
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={isSelected}
                              onChange={() => handleSelectOne(lead.id)}
                            />
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" fontWeight={500}>
                              {lead.name}
                            </Typography>
                          </TableCell>
                          <TableCell>{lead.mobile}</TableCell>
                          <TableCell>{lead.email}</TableCell>
                          <TableCell>
                            <Chip label={formatSource(lead.source)} size="small" variant="outlined" />
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={statusConfig.label}
                              size="small"
                              sx={{
                                backgroundColor: `${statusConfig.color}20`,
                                color: statusConfig.color,
                                fontWeight: 500,
                              }}
                            />
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={lead.wantsSiteVisit ? 'Yes' : 'No'}
                              size="small"
                              color={lead.wantsSiteVisit ? 'success' : 'default'}
                              variant="outlined"
                            />
                          </TableCell>
                          <TableCell>{formatDate(lead.createdAt)}</TableCell>
                          <TableCell align="center">
                            <Tooltip title="View">
                              <IconButton size="small" onClick={() => handleViewLead(lead.id)}>
                                <VisibilityIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Edit">
                              <IconButton size="small">
                                <EditIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete">
                              <IconButton size="small" color="error">
                                <DeleteIcon fontSize="small" />
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
          <TablePagination
            component="div"
            count={filteredLeads.length}
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

export default withAuth(AdminLeadsPage);
