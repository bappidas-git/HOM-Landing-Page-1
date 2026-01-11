/**
 * LeadsTable Component
 * Professional data table with filtering, sorting, bulk actions, and export
 */

import { useState, useMemo, useCallback } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableSortLabel,
  Checkbox,
  IconButton,
  Tooltip,
  Chip,
  Typography,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Menu,
  ListItemIcon,
  ListItemText,
  Skeleton,
  Alert,
  Collapse,
  Divider,
  alpha,
  Avatar,
  Badge,
  Stack,
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  Download as DownloadIcon,
  Visibility as ViewIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  MoreVert as MoreIcon,
  KeyboardArrowDown as ArrowDownIcon,
  Close as CloseIcon,
  CheckCircle as CheckIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  CalendarMonth as CalendarIcon,
  LocationOn as LocationIcon,
  Clear as ClearIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { LEAD_STATUS_OPTIONS, LEAD_SOURCE_OPTIONS, LEAD_PRIORITY_OPTIONS } from '@/lib/constants';

// Utility to safely format dates
const formatDate = (dateString, formatStr = 'short') => {
  if (!dateString) return '-';
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '-';
    
    if (formatStr === 'short') {
      return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
    } else if (formatStr === 'time') {
      return date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
    }
    return date.toLocaleString('en-IN');
  } catch {
    return '-';
  }
};

// Get status configuration
const getStatusConfig = (status) => {
  return LEAD_STATUS_OPTIONS.find(s => s.value === status) || {
    value: status,
    label: status,
    color: '#9e9e9e',
  };
};

// Get source label
const getSourceLabel = (source) => {
  return LEAD_SOURCE_OPTIONS.find(s => s.value === source)?.label || source;
};

// Get priority configuration
const getPriorityConfig = (priority) => {
  return LEAD_PRIORITY_OPTIONS.find(p => p.value === priority) || {
    value: priority,
    label: priority,
    color: '#9e9e9e',
  };
};

/**
 * LeadRow Component - Single table row
 */
const LeadRow = ({
  lead,
  selected,
  onSelect,
  onView,
  onEdit,
  onDelete,
  onStatusChange,
  showActions = true,
}) => {
  const [menuAnchor, setMenuAnchor] = useState(null);
  const statusConfig = getStatusConfig(lead.status);
  const priorityConfig = getPriorityConfig(lead.priority);

  return (
    <TableRow
      hover
      selected={selected}
      sx={{
        '&.Mui-selected': {
          backgroundColor: alpha('#8B9A46', 0.08),
        },
        '&.Mui-selected:hover': {
          backgroundColor: alpha('#8B9A46', 0.12),
        },
      }}
    >
      <TableCell padding="checkbox">
        <Checkbox
          checked={selected}
          onChange={(e) => onSelect(lead.id, e.target.checked)}
          sx={{
            '&.Mui-checked': {
              color: '#8B9A46',
            },
          }}
        />
      </TableCell>

      {/* Name & Contact */}
      <TableCell>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar
            sx={{
              width: 40,
              height: 40,
              backgroundColor: alpha('#8B9A46', 0.15),
              color: '#8B9A46',
              fontSize: '0.875rem',
              fontWeight: 600,
            }}
          >
            {lead.name?.charAt(0)?.toUpperCase() || '?'}
          </Avatar>
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
              {lead.name || 'Unknown'}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {lead.mobile}
            </Typography>
          </Box>
        </Box>
      </TableCell>

      {/* Email */}
      <TableCell>
        <Typography variant="body2" color="text.secondary" sx={{ 
          maxWidth: 200, 
          overflow: 'hidden', 
          textOverflow: 'ellipsis' 
        }}>
          {lead.email || '-'}
        </Typography>
      </TableCell>

      {/* Source */}
      <TableCell>
        <Chip
          label={getSourceLabel(lead.source)}
          size="small"
          variant="outlined"
          sx={{
            borderRadius: 1.5,
            fontWeight: 500,
            fontSize: '0.75rem',
          }}
        />
      </TableCell>

      {/* Status */}
      <TableCell>
        <Chip
          label={statusConfig.label}
          size="small"
          sx={{
            backgroundColor: alpha(statusConfig.color, 0.15),
            color: statusConfig.color,
            fontWeight: 600,
            fontSize: '0.75rem',
            borderRadius: 1.5,
          }}
        />
      </TableCell>

      {/* Priority */}
      <TableCell>
        <Chip
          label={priorityConfig.label}
          size="small"
          sx={{
            backgroundColor: alpha(priorityConfig.color, 0.1),
            color: priorityConfig.color,
            fontWeight: 500,
            fontSize: '0.7rem',
            borderRadius: 1,
            height: 22,
          }}
        />
      </TableCell>

      {/* Site Visit */}
      <TableCell align="center">
        {lead.wantsSiteVisit ? (
          <Tooltip title={lead.siteVisitDate ? 'Scheduled: ' + formatDate(lead.siteVisitDate, 'short') : 'Requested'}>
            <CheckIcon sx={{ color: '#4caf50', fontSize: 20 }} />
          </Tooltip>
        ) : (
          <Typography variant="body2" color="text.disabled">-</Typography>
        )}
      </TableCell>

      {/* Date */}
      <TableCell>
        <Typography variant="caption" color="text.secondary">
          {formatDate(lead.createdAt, 'short')}
        </Typography>
        <Typography variant="caption" display="block" color="text.disabled">
          {formatDate(lead.createdAt, 'time')}
        </Typography>
      </TableCell>

      {/* Actions */}
      {showActions && (
        <TableCell align="right">
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 0.5 }}>
            <Tooltip title="View Details">
              <IconButton size="small" onClick={() => onView(lead.id)}>
                <ViewIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Edit">
              <IconButton size="small" onClick={() => onEdit(lead.id)}>
                <EditIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <IconButton size="small" onClick={(e) => setMenuAnchor(e.currentTarget)}>
              <MoreIcon fontSize="small" />
            </IconButton>
          </Box>

          <Menu
            anchorEl={menuAnchor}
            open={Boolean(menuAnchor)}
            onClose={() => setMenuAnchor(null)}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem onClick={() => { window.location.href = 'tel:' + lead.mobile; setMenuAnchor(null); }}>
              <ListItemIcon><PhoneIcon fontSize="small" /></ListItemIcon>
              <ListItemText>Call</ListItemText>
            </MenuItem>
            <MenuItem onClick={() => { window.location.href = 'mailto:' + lead.email; setMenuAnchor(null); }}>
              <ListItemIcon><EmailIcon fontSize="small" /></ListItemIcon>
              <ListItemText>Email</ListItemText>
            </MenuItem>
            <Divider />
            <MenuItem onClick={() => { onDelete(lead.id); setMenuAnchor(null); }} sx={{ color: 'error.main' }}>
              <ListItemIcon><DeleteIcon fontSize="small" sx={{ color: 'error.main' }} /></ListItemIcon>
              <ListItemText>Delete</ListItemText>
            </MenuItem>
          </Menu>
        </TableCell>
      )}
    </TableRow>
  );
};

/**
 * Main LeadsTable Component
 */
const LeadsTable = ({
  leads = [],
  loading = false,
  onView,
  onEdit,
  onDelete,
  onBulkDelete,
  onBulkStatusChange,
  onExport,
  onRefresh,
  showFilters = true,
  showBulkActions = true,
  title = 'Leads',
}) => {
  // State
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderBy, setOrderBy] = useState('createdAt');
  const [order, setOrder] = useState('desc');
  const [showFiltersPanel, setShowFiltersPanel] = useState(false);
  const [bulkMenuAnchor, setBulkMenuAnchor] = useState(null);
  
  // Filters
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    source: 'all',
    priority: 'all',
    siteVisit: 'all',
  });

  // Handle filter change
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPage(0);
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      search: '',
      status: 'all',
      source: 'all',
      priority: 'all',
      siteVisit: 'all',
    });
    setPage(0);
  };

  // Check if any filters are active
  const hasActiveFilters = filters.search || 
    filters.status !== 'all' || 
    filters.source !== 'all' || 
    filters.priority !== 'all' || 
    filters.siteVisit !== 'all';

  // Filter and sort leads
  const processedLeads = useMemo(() => {
    let result = [...leads];

    // Apply search filter
    if (filters.search) {
      const search = filters.search.toLowerCase();
      result = result.filter(lead => 
        lead.name?.toLowerCase().includes(search) ||
        lead.email?.toLowerCase().includes(search) ||
        lead.mobile?.includes(search)
      );
    }

    // Apply status filter
    if (filters.status !== 'all') {
      result = result.filter(lead => lead.status === filters.status);
    }

    // Apply source filter
    if (filters.source !== 'all') {
      result = result.filter(lead => lead.source === filters.source);
    }

    // Apply priority filter
    if (filters.priority !== 'all') {
      result = result.filter(lead => lead.priority === filters.priority);
    }

    // Apply site visit filter
    if (filters.siteVisit !== 'all') {
      const wantsSiteVisit = filters.siteVisit === 'yes';
      result = result.filter(lead => lead.wantsSiteVisit === wantsSiteVisit);
    }

    // Apply sorting
    result.sort((a, b) => {
      const aValue = a[orderBy] || '';
      const bValue = b[orderBy] || '';
      const comparison = aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      return order === 'desc' ? -comparison : comparison;
    });

    return result;
  }, [leads, filters, orderBy, order]);

  // Paginated leads
  const paginatedLeads = useMemo(() => {
    const start = page * rowsPerPage;
    return processedLeads.slice(start, start + rowsPerPage);
  }, [processedLeads, page, rowsPerPage]);

  // Handle sort
  const handleSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // Handle select all
  const handleSelectAll = (checked) => {
    if (checked) {
      setSelected(paginatedLeads.map(lead => lead.id));
    } else {
      setSelected([]);
    }
  };

  // Handle select one
  const handleSelectOne = (id, checked) => {
    if (checked) {
      setSelected(prev => [...prev, id]);
    } else {
      setSelected(prev => prev.filter(selectedId => selectedId !== id));
    }
  };

  // Handle bulk status change
  const handleBulkStatusChange = (status) => {
    onBulkStatusChange?.(selected, status);
    setSelected([]);
    setBulkMenuAnchor(null);
  };

  // Handle bulk delete
  const handleBulkDelete = () => {
    onBulkDelete?.(selected);
    setSelected([]);
  };

  // Export to CSV
  const handleExport = () => {
    const dataToExport = selected.length > 0 
      ? leads.filter(lead => selected.includes(lead.id))
      : processedLeads;
    onExport?.(dataToExport);
  };

  const isAllSelected = paginatedLeads.length > 0 && selected.length === paginatedLeads.length;
  const isIndeterminate = selected.length > 0 && selected.length < paginatedLeads.length;

  return (
    <Paper
      sx={{
        borderRadius: 3,
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
        overflow: 'hidden',
        border: '1px solid',
        borderColor: 'divider',
      }}
    >
      {/* Header */}
      <Box sx={{ p: 3, pb: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              {title}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {processedLeads.length} leads found
              {hasActiveFilters && ' (filtered)'}
            </Typography>
          </Box>
          <Stack direction="row" spacing={1}>
            {onRefresh && (
              <Tooltip title="Refresh">
                <IconButton onClick={onRefresh}>
                  <RefreshIcon />
                </IconButton>
              </Tooltip>
            )}
            <Button
              variant={showFiltersPanel ? 'contained' : 'outlined'}
              startIcon={<FilterIcon />}
              onClick={() => setShowFiltersPanel(!showFiltersPanel)}
              sx={showFiltersPanel ? {
                backgroundColor: '#8B9A46',
                '&:hover': { backgroundColor: '#6b7a36' },
              } : {}}
            >
              Filters
            </Button>
            <Button
              variant="outlined"
              startIcon={<DownloadIcon />}
              onClick={handleExport}
            >
              Export
            </Button>
          </Stack>
        </Box>

        {/* Search */}
        <TextField
          placeholder="Search by name, email, or mobile..."
          value={filters.search}
          onChange={(e) => handleFilterChange('search', e.target.value)}
          size="small"
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
            endAdornment: filters.search && (
              <InputAdornment position="end">
                <IconButton size="small" onClick={() => handleFilterChange('search', '')}>
                  <ClearIcon fontSize="small" />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{ maxWidth: 400 }}
        />
      </Box>

      {/* Filters Panel */}
      <Collapse in={showFiltersPanel}>
        <Box sx={{ px: 3, pb: 2, pt: 0 }}>
          <Divider sx={{ mb: 2 }} />
          <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Status</InputLabel>
              <Select
                value={filters.status}
                label="Status"
                onChange={(e) => handleFilterChange('status', e.target.value)}
              >
                <MenuItem value="all">All Status</MenuItem>
                {LEAD_STATUS_OPTIONS.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box sx={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: option.color }} />
                      {option.label}
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Source</InputLabel>
              <Select
                value={filters.source}
                label="Source"
                onChange={(e) => handleFilterChange('source', e.target.value)}
              >
                <MenuItem value="all">All Sources</MenuItem>
                {LEAD_SOURCE_OPTIONS.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Priority</InputLabel>
              <Select
                value={filters.priority}
                label="Priority"
                onChange={(e) => handleFilterChange('priority', e.target.value)}
              >
                <MenuItem value="all">All</MenuItem>
                {LEAD_PRIORITY_OPTIONS.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 130 }}>
              <InputLabel>Site Visit</InputLabel>
              <Select
                value={filters.siteVisit}
                label="Site Visit"
                onChange={(e) => handleFilterChange('siteVisit', e.target.value)}
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="yes">Requested</MenuItem>
                <MenuItem value="no">Not Requested</MenuItem>
              </Select>
            </FormControl>

            {hasActiveFilters && (
              <Button
                size="small"
                startIcon={<ClearIcon />}
                onClick={clearFilters}
                sx={{ color: 'text.secondary' }}
              >
                Clear Filters
              </Button>
            )}
          </Stack>
        </Box>
      </Collapse>

      {/* Bulk Actions */}
      <AnimatePresence>
        {showBulkActions && selected.length > 0 && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
          >
            <Box
              sx={{
                px: 3,
                py: 1.5,
                backgroundColor: alpha('#8B9A46', 0.08),
                borderTop: '1px solid',
                borderBottom: '1px solid',
                borderColor: alpha('#8B9A46', 0.2),
                display: 'flex',
                alignItems: 'center',
                gap: 2,
              }}
            >
              <Typography variant="body2" sx={{ fontWeight: 600, color: '#8B9A46' }}>
                {selected.length} selected
              </Typography>
              <Button
                size="small"
                variant="outlined"
                onClick={(e) => setBulkMenuAnchor(e.currentTarget)}
                endIcon={<ArrowDownIcon />}
                sx={{ borderColor: '#8B9A46', color: '#8B9A46' }}
              >
                Update Status
              </Button>
              <Button
                size="small"
                variant="outlined"
                color="error"
                onClick={handleBulkDelete}
              >
                Delete
              </Button>
              <Button
                size="small"
                onClick={() => setSelected([])}
                sx={{ ml: 'auto', color: 'text.secondary' }}
              >
                Clear Selection
              </Button>

              <Menu
                anchorEl={bulkMenuAnchor}
                open={Boolean(bulkMenuAnchor)}
                onClose={() => setBulkMenuAnchor(null)}
              >
                {LEAD_STATUS_OPTIONS.map(option => (
                  <MenuItem key={option.value} onClick={() => handleBulkStatusChange(option.value)}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box sx={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: option.color }} />
                      {option.label}
                    </Box>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Table */}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f8f9fa' }}>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={isIndeterminate}
                  checked={isAllSelected}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  sx={{ '&.Mui-checked, &.MuiCheckbox-indeterminate': { color: '#8B9A46' } }}
                />
              </TableCell>
              <TableCell sx={{ fontWeight: 600, minWidth: 200 }}>
                <TableSortLabel
                  active={orderBy === 'name'}
                  direction={orderBy === 'name' ? order : 'asc'}
                  onClick={() => handleSort('name')}
                >
                  Lead
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Source</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>
                <TableSortLabel
                  active={orderBy === 'status'}
                  direction={orderBy === 'status' ? order : 'asc'}
                  onClick={() => handleSort('status')}
                >
                  Status
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Priority</TableCell>
              <TableCell align="center" sx={{ fontWeight: 600 }}>Site Visit</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>
                <TableSortLabel
                  active={orderBy === 'createdAt'}
                  direction={orderBy === 'createdAt' ? order : 'asc'}
                  onClick={() => handleSort('createdAt')}
                >
                  Date
                </TableSortLabel>
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: 600 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              [...Array(5)].map((_, i) => (
                <TableRow key={i}>
                  {[...Array(9)].map((_, j) => (
                    <TableCell key={j}>
                      <Skeleton variant="text" animation="wave" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : paginatedLeads.length > 0 ? (
              paginatedLeads.map((lead) => (
                <LeadRow
                  key={lead.id}
                  lead={lead}
                  selected={selected.includes(lead.id)}
                  onSelect={handleSelectOne}
                  onView={onView}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={9}>
                  <Box sx={{ py: 6, textAlign: 'center' }}>
                    <Typography variant="body1" color="text.secondary">
                      {hasActiveFilters ? 'No leads match your filters' : 'No leads found'}
                    </Typography>
                    {hasActiveFilters && (
                      <Button size="small" onClick={clearFilters} sx={{ mt: 1 }}>
                        Clear Filters
                      </Button>
                    )}
                  </Box>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        component="div"
        count={processedLeads.length}
        page={page}
        onPageChange={(e, newPage) => setPage(newPage)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(parseInt(e.target.value, 10));
          setPage(0);
        }}
        rowsPerPageOptions={[10, 25, 50, 100]}
        sx={{
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      />
    </Paper>
  );
};

export default LeadsTable;
