/**
 * Admin Keywords Page
 * Professional Keyword Manager with analytics, tracking, and import/export
 * Features: CRUD operations, difficulty scoring, position tracking, bulk operations
 */

import { useState, useEffect, useMemo } from 'react';
import Head from 'next/head';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  IconButton,
  Tooltip,
  Chip,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TablePagination,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Checkbox,
  Snackbar,
  Skeleton,
  CircularProgress,
  InputAdornment,
  Divider,
  Menu,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Save as SaveIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  Download as DownloadIcon,
  Upload as UploadIcon,
  TrendingUp as TrendingUpIcon,
  TrendingFlat as TrendingFlatIcon,
  Star as StarIcon,
  MoreVert as MoreVertIcon,
  ContentCopy as CopyIcon,
  ArrowUpward as ArrowUpIcon,
  ArrowDownward as ArrowDownIcon,
  Visibility as VisibilityIcon,
  LocalOffer as TagIcon,
  Analytics as AnalyticsIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import AdminLayout from '@/components/admin/AdminLayout';
import { withAuth } from '@/context/AuthContext';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

// Keyword type configurations
const keywordTypes = [
  { value: 'primary', label: 'Primary', color: '#667eea' },
  { value: 'secondary', label: 'Secondary', color: '#2196f3' },
  { value: 'long-tail', label: 'Long-tail', color: '#9c27b0' },
  { value: 'branded', label: 'Branded', color: '#ff9800' },
  { value: 'local', label: 'Local', color: '#00bcd4' },
];

// Difficulty configurations
const difficultyLevels = [
  { value: 'low', label: 'Low', color: '#4caf50' },
  { value: 'medium', label: 'Medium', color: '#ff9800' },
  { value: 'high', label: 'High', color: '#f44336' },
];

/**
 * Difficulty Badge Component
 */
const DifficultyBadge = ({ difficulty }) => {
  const config = difficultyLevels.find((d) => d.value === difficulty);
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Box
        sx={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          backgroundColor: config?.color,
        }}
      />
      <Typography variant="body2" sx={{ color: config?.color, fontWeight: 500 }}>
        {config?.label}
      </Typography>
    </Box>
  );
};

/**
 * Position Trend Component
 */
const PositionTrend = ({ position, previousPosition }) => {
  if (!previousPosition || position === previousPosition) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        <Typography variant="body2" sx={{ fontWeight: 600 }}>
          #{position}
        </Typography>
        <TrendingFlatIcon sx={{ fontSize: 16, color: '#9e9e9e' }} />
      </Box>
    );
  }

  const improved = position < previousPosition;
  const change = Math.abs(position - previousPosition);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
      <Typography variant="body2" sx={{ fontWeight: 600 }}>
        #{position}
      </Typography>
      {improved ? (
        <Chip
          icon={<ArrowUpIcon sx={{ fontSize: 12 }} />}
          label={`+${change}`}
          size="small"
          color="success"
          sx={{ height: 20, fontSize: 11 }}
        />
      ) : (
        <Chip
          icon={<ArrowDownIcon sx={{ fontSize: 12 }} />}
          label={`-${change}`}
          size="small"
          color="error"
          sx={{ height: 20, fontSize: 11 }}
        />
      )}
    </Box>
  );
};

/**
 * Stats Card Component
 */
const StatsCard = ({ title, value, subtitle, icon: Icon, color }) => (
  <Card sx={{ borderRadius: 2, height: '100%' }}>
    <CardContent sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <Box>
          <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase' }}>
            {title}
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 700, color: color || '#1a1a2e' }}>
            {value}
          </Typography>
          {subtitle && (
            <Typography variant="caption" color="text.secondary">
              {subtitle}
            </Typography>
          )}
        </Box>
        <Box
          sx={{
            p: 1,
            backgroundColor: `${color || '#667eea'}15`,
            borderRadius: 2,
          }}
        >
          <Icon sx={{ color: color || '#667eea' }} />
        </Box>
      </Box>
    </CardContent>
  </Card>
);

/**
 * Keyword Dialog Component
 */
const KeywordDialog = ({ open, onClose, keyword, onSave }) => {
  const [formData, setFormData] = useState({
    keyword: '',
    type: 'secondary',
    searchVolume: '',
    difficulty: 'medium',
    position: '',
    targetUrl: '',
    isActive: true,
    notes: '',
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (open && keyword) {
      setFormData({
        keyword: keyword.keyword || '',
        type: keyword.type || 'secondary',
        searchVolume: keyword.searchVolume || '',
        difficulty: keyword.difficulty || 'medium',
        position: keyword.position || '',
        targetUrl: keyword.targetUrl || '',
        isActive: keyword.isActive !== false,
        notes: keyword.notes || '',
      });
    } else if (open) {
      setFormData({
        keyword: '',
        type: 'secondary',
        searchVolume: '',
        difficulty: 'medium',
        position: '',
        targetUrl: '',
        isActive: true,
        notes: '',
      });
    }
  }, [open, keyword]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setSaving(true);
    await onSave({
      ...keyword,
      ...formData,
      searchVolume: parseInt(formData.searchVolume) || 0,
      position: parseInt(formData.position) || 0,
    });
    setSaving(false);
    onClose();
  };

  const isEditing = !!keyword?.id;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {isEditing ? 'Edit Keyword' : 'Add New Keyword'}
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Keyword"
              value={formData.keyword}
              onChange={(e) => handleChange('keyword', e.target.value)}
              placeholder="e.g., apartments in bangalore"
              autoFocus
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Type</InputLabel>
              <Select
                value={formData.type}
                label="Type"
                onChange={(e) => handleChange('type', e.target.value)}
              >
                {keywordTypes.map((type) => (
                  <MenuItem key={type.value} value={type.value}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box sx={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: type.color }} />
                      {type.label}
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Difficulty</InputLabel>
              <Select
                value={formData.difficulty}
                label="Difficulty"
                onChange={(e) => handleChange('difficulty', e.target.value)}
              >
                {difficultyLevels.map((level) => (
                  <MenuItem key={level.value} value={level.value}>
                    <DifficultyBadge difficulty={level.value} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Search Volume"
              value={formData.searchVolume}
              onChange={(e) => handleChange('searchVolume', e.target.value)}
              placeholder="e.g., 1200"
              type="number"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <VisibilityIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Current Position"
              value={formData.position}
              onChange={(e) => handleChange('position', e.target.value)}
              placeholder="e.g., 5"
              type="number"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">#</InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Target URL"
              value={formData.targetUrl}
              onChange={(e) => handleChange('targetUrl', e.target.value)}
              placeholder="https://www.nambiardistrict25.com"
              helperText="The page you want to rank for this keyword"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={2}
              label="Notes"
              value={formData.notes}
              onChange={(e) => handleChange('notes', e.target.value)}
              placeholder="Additional notes about this keyword"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch
                  checked={formData.isActive}
                  onChange={(e) => handleChange('isActive', e.target.checked)}
                />
              }
              label="Active (tracking this keyword)"
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={!formData.keyword || saving}
          startIcon={saving ? <CircularProgress size={16} color="inherit" /> : <SaveIcon />}
          sx={{ backgroundColor: '#667eea', '&:hover': { backgroundColor: '#764ba2' } }}
        >
          {saving ? 'Saving...' : isEditing ? 'Update' : 'Add Keyword'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

/**
 * Import Dialog Component
 */
const ImportDialog = ({ open, onClose, onImport }) => {
  const [csvData, setCsvData] = useState('');
  const [importing, setImporting] = useState(false);

  const handleImport = async () => {
    setImporting(true);
    try {
      const lines = csvData.trim().split('\n');
      const keywords = [];

      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',').map((v) => v.trim().replace(/^"|"$/g, ''));
        if (values[0]) {
          keywords.push({
            keyword: values[0],
            type: values[1] || 'secondary',
            searchVolume: parseInt(values[2]) || 0,
            difficulty: values[3] || 'medium',
            position: parseInt(values[4]) || 0,
            isActive: true,
          });
        }
      }

      await onImport(keywords);
      setCsvData('');
      onClose();
    } catch (error) {
      console.error('Import error:', error);
    } finally {
      setImporting(false);
    }
  };

  const sampleCSV = `keyword,type,searchVolume,difficulty,position
"apartments bangalore",secondary,5400,high,12
"3bhk flats sarjapur",long-tail,880,low,3
"nambiar district 25",branded,1200,low,1`;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Import Keywords</DialogTitle>
      <DialogContent dividers>
        <Alert severity="info" sx={{ mb: 2 }}>
          Paste CSV data with columns: keyword, type, searchVolume, difficulty, position
        </Alert>
        <TextField
          fullWidth
          multiline
          rows={10}
          value={csvData}
          onChange={(e) => setCsvData(e.target.value)}
          placeholder={sampleCSV}
          sx={{
            '& .MuiInputBase-input': { fontFamily: 'monospace', fontSize: '0.875rem' },
          }}
        />
        <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
          First row should be headers. Supported types: primary, secondary, long-tail, branded, local.
          Supported difficulties: low, medium, high.
        </Typography>
      </DialogContent>
      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant="contained"
          onClick={handleImport}
          disabled={!csvData.trim() || importing}
          startIcon={importing ? <CircularProgress size={16} /> : <UploadIcon />}
          sx={{ backgroundColor: '#667eea', '&:hover': { backgroundColor: '#764ba2' } }}
        >
          {importing ? 'Importing...' : 'Import Keywords'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

/**
 * Admin Keywords Page Component
 */
const AdminKeywordsPage = () => {
  const [loading, setLoading] = useState(true);
  const [keywords, setKeywords] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterDifficulty, setFilterDifficulty] = useState('all');
  const [filterActive, setFilterActive] = useState('all');
  const [sortBy, setSortBy] = useState('keyword');
  const [sortOrder, setSortOrder] = useState('asc');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selected, setSelected] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // Dialog states
  const [keywordDialogOpen, setKeywordDialogOpen] = useState(false);
  const [importDialogOpen, setImportDialogOpen] = useState(false);
  const [editingKeyword, setEditingKeyword] = useState(null);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [menuKeyword, setMenuKeyword] = useState(null);

  // Load keywords
  useEffect(() => {
    const loadKeywords = async () => {
      try {
        const response = await axios.get(`${API_URL}/keywords`);
        setKeywords(response.data || []);
      } catch (error) {
        console.error('Error loading keywords:', error);
        setSnackbar({ open: true, message: 'Error loading keywords', severity: 'error' });
      } finally {
        setLoading(false);
      }
    };
    loadKeywords();
  }, []);

  // Filter and sort keywords
  const filteredKeywords = useMemo(() => {
    let result = [...keywords];

    // Search filter
    if (searchQuery) {
      result = result.filter((kw) =>
        kw.keyword.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Type filter
    if (filterType !== 'all') {
      result = result.filter((kw) => kw.type === filterType);
    }

    // Difficulty filter
    if (filterDifficulty !== 'all') {
      result = result.filter((kw) => kw.difficulty === filterDifficulty);
    }

    // Active filter
    if (filterActive !== 'all') {
      result = result.filter((kw) => (filterActive === 'active' ? kw.isActive : !kw.isActive));
    }

    // Sort
    result.sort((a, b) => {
      let aVal = a[sortBy];
      let bVal = b[sortBy];

      if (typeof aVal === 'string') {
        aVal = aVal.toLowerCase();
        bVal = bVal?.toLowerCase() || '';
      }

      if (sortOrder === 'asc') {
        return aVal > bVal ? 1 : -1;
      }
      return aVal < bVal ? 1 : -1;
    });

    return result;
  }, [keywords, searchQuery, filterType, filterDifficulty, filterActive, sortBy, sortOrder]);

  // Calculate stats
  const stats = useMemo(() => {
    const active = keywords.filter((kw) => kw.isActive);
    const totalVolume = active.reduce((sum, kw) => sum + (kw.searchVolume || 0), 0);
    const avgPosition =
      active.filter((kw) => kw.position).length > 0
        ? Math.round(
            active.filter((kw) => kw.position).reduce((sum, kw) => sum + kw.position, 0) /
              active.filter((kw) => kw.position).length
          )
        : 0;
    const top10 = active.filter((kw) => kw.position && kw.position <= 10).length;

    return { total: keywords.length, active: active.length, totalVolume, avgPosition, top10 };
  }, [keywords]);

  // Handle sort
  const handleSort = (property) => {
    const isAsc = sortBy === property && sortOrder === 'asc';
    setSortOrder(isAsc ? 'desc' : 'asc');
    setSortBy(property);
  };

  // Handle select all
  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelected(filteredKeywords.map((kw) => kw.id));
    } else {
      setSelected([]);
    }
  };

  // Handle select one
  const handleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  // Handle save keyword
  const handleSaveKeyword = async (keywordData) => {
    try {
      if (keywordData.id) {
        // Update
        const response = await axios.patch(`${API_URL}/keywords/${keywordData.id}`, {
          ...keywordData,
          updatedAt: new Date().toISOString(),
        });
        setKeywords((prev) =>
          prev.map((kw) => (kw.id === keywordData.id ? response.data : kw))
        );
        setSnackbar({ open: true, message: 'Keyword updated!', severity: 'success' });
      } else {
        // Create
        const response = await axios.post(`${API_URL}/keywords`, {
          ...keywordData,
          createdAt: new Date().toISOString(),
        });
        setKeywords((prev) => [...prev, response.data]);
        setSnackbar({ open: true, message: 'Keyword added!', severity: 'success' });
      }
    } catch (error) {
      console.error('Error saving keyword:', error);
      setSnackbar({ open: true, message: 'Error saving keyword', severity: 'error' });
    }
    setEditingKeyword(null);
  };

  // Handle delete keyword
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/keywords/${id}`);
      setKeywords((prev) => prev.filter((kw) => kw.id !== id));
      setSnackbar({ open: true, message: 'Keyword deleted!', severity: 'success' });
    } catch (error) {
      console.error('Error deleting keyword:', error);
      setSnackbar({ open: true, message: 'Error deleting keyword', severity: 'error' });
    }
    setMenuAnchor(null);
  };

  // Handle bulk delete
  const handleBulkDelete = async () => {
    try {
      await Promise.all(selected.map((id) => axios.delete(`${API_URL}/keywords/${id}`)));
      setKeywords((prev) => prev.filter((kw) => !selected.includes(kw.id)));
      setSelected([]);
      setSnackbar({ open: true, message: `${selected.length} keywords deleted!`, severity: 'success' });
    } catch (error) {
      console.error('Error deleting keywords:', error);
      setSnackbar({ open: true, message: 'Error deleting keywords', severity: 'error' });
    }
  };

  // Handle import
  const handleImport = async (newKeywords) => {
    try {
      const results = await Promise.all(
        newKeywords.map((kw) =>
          axios.post(`${API_URL}/keywords`, {
            ...kw,
            createdAt: new Date().toISOString(),
          })
        )
      );
      setKeywords((prev) => [...prev, ...results.map((r) => r.data)]);
      setSnackbar({ open: true, message: `${newKeywords.length} keywords imported!`, severity: 'success' });
    } catch (error) {
      console.error('Error importing keywords:', error);
      setSnackbar({ open: true, message: 'Error importing keywords', severity: 'error' });
    }
  };

  // Handle export
  const handleExport = () => {
    const headers = 'keyword,type,searchVolume,difficulty,position,isActive,createdAt\n';
    const data = keywords
      .map((kw) =>
        `"${kw.keyword}","${kw.type}",${kw.searchVolume},"${kw.difficulty}",${kw.position || ''},${kw.isActive},"${kw.createdAt}"`
      )
      .join('\n');

    const blob = new Blob([headers + data], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'keywords.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  // Handle toggle active
  const handleToggleActive = async (keyword) => {
    try {
      const response = await axios.patch(`${API_URL}/keywords/${keyword.id}`, {
        isActive: !keyword.isActive,
      });
      setKeywords((prev) =>
        prev.map((kw) => (kw.id === keyword.id ? response.data : kw))
      );
    } catch (error) {
      console.error('Error updating keyword:', error);
    }
    setMenuAnchor(null);
  };

  if (loading) {
    return (
      <AdminLayout title="Keywords">
        <Box sx={{ p: 3 }}>
          <Skeleton variant="rectangular" height={60} sx={{ mb: 2, borderRadius: 2 }} />
          <Grid container spacing={3} sx={{ mb: 3 }}>
            {[1, 2, 3, 4, 5].map((i) => (
              <Grid item xs={6} md={2.4} key={i}>
                <Skeleton variant="rectangular" height={100} sx={{ borderRadius: 2 }} />
              </Grid>
            ))}
          </Grid>
          <Skeleton variant="rectangular" height={400} sx={{ borderRadius: 2 }} />
        </Box>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Keywords">
      <Head>
        <title>Keyword Manager | Admin - District 25</title>
      </Head>

      <Box>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700, color: '#1a1a2e', mb: 0.5 }}>
              Keyword Manager
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Track and manage SEO keywords for better search rankings
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button variant="outlined" startIcon={<UploadIcon />} onClick={() => setImportDialogOpen(true)}>
              Import
            </Button>
            <Button variant="outlined" startIcon={<DownloadIcon />} onClick={handleExport}>
              Export
            </Button>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => {
                setEditingKeyword(null);
                setKeywordDialogOpen(true);
              }}
              sx={{ backgroundColor: '#667eea', '&:hover': { backgroundColor: '#764ba2' } }}
            >
              Add Keyword
            </Button>
          </Box>
        </Box>

        {/* Stats Cards */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={6} md={2.4}>
            <StatsCard
              title="Total Keywords"
              value={stats.total}
              icon={TagIcon}
              color="#667eea"
            />
          </Grid>
          <Grid item xs={6} md={2.4}>
            <StatsCard
              title="Active Tracking"
              value={stats.active}
              subtitle={`${stats.total - stats.active} paused`}
              icon={VisibilityIcon}
              color="#2196f3"
            />
          </Grid>
          <Grid item xs={6} md={2.4}>
            <StatsCard
              title="Total Search Volume"
              value={stats.totalVolume.toLocaleString()}
              subtitle="Monthly searches"
              icon={AnalyticsIcon}
              color="#9c27b0"
            />
          </Grid>
          <Grid item xs={6} md={2.4}>
            <StatsCard
              title="Avg. Position"
              value={`#${stats.avgPosition}`}
              icon={TrendingUpIcon}
              color="#ff9800"
            />
          </Grid>
          <Grid item xs={6} md={2.4}>
            <StatsCard
              title="Top 10 Rankings"
              value={stats.top10}
              subtitle={`${Math.round((stats.top10 / stats.active) * 100) || 0}% of active`}
              icon={StarIcon}
              color="#4caf50"
            />
          </Grid>
        </Grid>

        {/* Filters */}
        <Paper sx={{ p: 2, mb: 3, borderRadius: 2 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                size="small"
                placeholder="Search keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: searchQuery && (
                    <InputAdornment position="end">
                      <IconButton size="small" onClick={() => setSearchQuery('')}>
                        <CloseIcon fontSize="small" />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={6} md={2}>
              <FormControl fullWidth size="small">
                <InputLabel>Type</InputLabel>
                <Select value={filterType} label="Type" onChange={(e) => setFilterType(e.target.value)}>
                  <MenuItem value="all">All Types</MenuItem>
                  {keywordTypes.map((type) => (
                    <MenuItem key={type.value} value={type.value}>
                      {type.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} md={2}>
              <FormControl fullWidth size="small">
                <InputLabel>Difficulty</InputLabel>
                <Select
                  value={filterDifficulty}
                  label="Difficulty"
                  onChange={(e) => setFilterDifficulty(e.target.value)}
                >
                  <MenuItem value="all">All Levels</MenuItem>
                  {difficultyLevels.map((level) => (
                    <MenuItem key={level.value} value={level.value}>
                      {level.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} md={2}>
              <FormControl fullWidth size="small">
                <InputLabel>Status</InputLabel>
                <Select value={filterActive} label="Status" onChange={(e) => setFilterActive(e.target.value)}>
                  <MenuItem value="all">All Status</MenuItem>
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="inactive">Inactive</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} md={2}>
              {selected.length > 0 && (
                <Button
                  color="error"
                  variant="outlined"
                  size="small"
                  startIcon={<DeleteIcon />}
                  onClick={handleBulkDelete}
                >
                  Delete ({selected.length})
                </Button>
              )}
            </Grid>
          </Grid>
        </Paper>

        {/* Keywords Table */}
        <Paper sx={{ borderRadius: 2, overflow: 'hidden' }}>
          <TableContainer>
            <Table>
              <TableHead sx={{ backgroundColor: '#f8f9fa' }}>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      indeterminate={
                        selected.length > 0 && selected.length < filteredKeywords.length
                      }
                      checked={
                        filteredKeywords.length > 0 && selected.length === filteredKeywords.length
                      }
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={sortBy === 'keyword'}
                      direction={sortBy === 'keyword' ? sortOrder : 'asc'}
                      onClick={() => handleSort('keyword')}
                    >
                      Keyword
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell align="right">
                    <TableSortLabel
                      active={sortBy === 'searchVolume'}
                      direction={sortBy === 'searchVolume' ? sortOrder : 'asc'}
                      onClick={() => handleSort('searchVolume')}
                    >
                      Volume
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>Difficulty</TableCell>
                  <TableCell align="center">
                    <TableSortLabel
                      active={sortBy === 'position'}
                      direction={sortBy === 'position' ? sortOrder : 'asc'}
                      onClick={() => handleSort('position')}
                    >
                      Position
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredKeywords.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} align="center" sx={{ py: 6 }}>
                      <TagIcon sx={{ fontSize: 48, color: '#e0e0e0', mb: 1 }} />
                      <Typography color="text.secondary">No keywords found</Typography>
                      <Button
                        startIcon={<AddIcon />}
                        sx={{ mt: 2 }}
                        onClick={() => {
                          setEditingKeyword(null);
                          setKeywordDialogOpen(true);
                        }}
                      >
                        Add your first keyword
                      </Button>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredKeywords
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((keyword) => {
                      const typeConfig = keywordTypes.find((t) => t.value === keyword.type);
                      return (
                        <TableRow
                          key={keyword.id}
                          hover
                          sx={{ opacity: keyword.isActive ? 1 : 0.6 }}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={selected.includes(keyword.id)}
                              onChange={() => handleSelect(keyword.id)}
                            />
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                              {keyword.keyword}
                            </Typography>
                            {keyword.targetUrl && (
                              <Typography variant="caption" color="text.secondary">
                                {keyword.targetUrl}
                              </Typography>
                            )}
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={typeConfig?.label || keyword.type}
                              size="small"
                              sx={{
                                backgroundColor: `${typeConfig?.color}15`,
                                color: typeConfig?.color,
                                fontWeight: 500,
                              }}
                            />
                          </TableCell>
                          <TableCell align="right">
                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                              {keyword.searchVolume?.toLocaleString() || '-'}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <DifficultyBadge difficulty={keyword.difficulty} />
                          </TableCell>
                          <TableCell align="center">
                            {keyword.position ? (
                              <PositionTrend position={keyword.position} />
                            ) : (
                              <Typography variant="body2" color="text.secondary">
                                -
                              </Typography>
                            )}
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={keyword.isActive ? 'Active' : 'Paused'}
                              size="small"
                              color={keyword.isActive ? 'success' : 'default'}
                              variant="outlined"
                            />
                          </TableCell>
                          <TableCell align="right">
                            <IconButton
                              size="small"
                              onClick={(e) => {
                                setMenuAnchor(e.currentTarget);
                                setMenuKeyword(keyword);
                              }}
                            >
                              <MoreVertIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      );
                    })
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 50]}
            component="div"
            count={filteredKeywords.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(e, newPage) => setPage(newPage)}
            onRowsPerPageChange={(e) => {
              setRowsPerPage(parseInt(e.target.value, 10));
              setPage(0);
            }}
          />
        </Paper>

        {/* Context Menu */}
        <Menu
          anchorEl={menuAnchor}
          open={Boolean(menuAnchor)}
          onClose={() => setMenuAnchor(null)}
        >
          <MenuItem
            onClick={() => {
              setEditingKeyword(menuKeyword);
              setKeywordDialogOpen(true);
              setMenuAnchor(null);
            }}
          >
            <ListItemIcon>
              <EditIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Edit</ListItemText>
          </MenuItem>
          <MenuItem onClick={() => handleToggleActive(menuKeyword)}>
            <ListItemIcon>
              <VisibilityIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>{menuKeyword?.isActive ? 'Pause Tracking' : 'Resume Tracking'}</ListItemText>
          </MenuItem>
          <MenuItem
            onClick={() => {
              navigator.clipboard.writeText(menuKeyword?.keyword);
              setSnackbar({ open: true, message: 'Keyword copied!', severity: 'success' });
              setMenuAnchor(null);
            }}
          >
            <ListItemIcon>
              <CopyIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Copy</ListItemText>
          </MenuItem>
          <Divider />
          <MenuItem onClick={() => handleDelete(menuKeyword?.id)} sx={{ color: 'error.main' }}>
            <ListItemIcon>
              <DeleteIcon fontSize="small" color="error" />
            </ListItemIcon>
            <ListItemText>Delete</ListItemText>
          </MenuItem>
        </Menu>

        {/* Keyword Dialog */}
        <KeywordDialog
          open={keywordDialogOpen}
          onClose={() => {
            setKeywordDialogOpen(false);
            setEditingKeyword(null);
          }}
          keyword={editingKeyword}
          onSave={handleSaveKeyword}
        />

        {/* Import Dialog */}
        <ImportDialog
          open={importDialogOpen}
          onClose={() => setImportDialogOpen(false)}
          onImport={handleImport}
        />

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
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </AdminLayout>
  );
};

export default withAuth(AdminKeywordsPage);
