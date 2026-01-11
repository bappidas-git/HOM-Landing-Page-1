/**
 * Admin Keywords Management Page
 * Track and manage SEO keywords
 */

import { useState, useEffect } from 'react';
import Head from 'next/head';
import {
  Box,
  Paper,
  Typography,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Tooltip,
  Skeleton,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Download as DownloadIcon,
  Upload as UploadIcon,
} from '@mui/icons-material';
import AdminLayout from '@/components/admin/AdminLayout';
import { withAuth } from '@/context/AuthContext';

// Mock keywords data
const mockKeywords = [
  { id: 1, keyword: 'nambiar district 25', type: 'branded', volume: 1200, difficulty: 'low', position: 1, active: true },
  { id: 2, keyword: 'apartments in dommasandra', type: 'primary', volume: 800, difficulty: 'medium', position: 5, active: true },
  { id: 3, keyword: '3bhk apartments bangalore', type: 'primary', volume: 2500, difficulty: 'high', position: 12, active: true },
  { id: 4, keyword: 'luxury apartments electronic city', type: 'secondary', volume: 600, difficulty: 'medium', position: 8, active: true },
  { id: 5, keyword: 'apartments near wipro bangalore', type: 'long-tail', volume: 150, difficulty: 'low', position: 3, active: true },
  { id: 6, keyword: 'nambiar builders projects', type: 'branded', volume: 400, difficulty: 'low', position: 2, active: true },
];

/**
 * Admin Keywords Page Component
 */
const AdminKeywordsPage = () => {
  const [loading, setLoading] = useState(true);
  const [keywords, setKeywords] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingKeyword, setEditingKeyword] = useState(null);
  const [formData, setFormData] = useState({
    keyword: '',
    type: 'primary',
    volume: '',
    difficulty: 'medium',
    position: '',
    active: true,
  });

  // Load data
  useEffect(() => {
    const timer = setTimeout(() => {
      setKeywords(mockKeywords);
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Handle dialog open
  const handleOpenDialog = (keyword = null) => {
    if (keyword) {
      setEditingKeyword(keyword);
      setFormData(keyword);
    } else {
      setEditingKeyword(null);
      setFormData({
        keyword: '',
        type: 'primary',
        volume: '',
        difficulty: 'medium',
        position: '',
        active: true,
      });
    }
    setDialogOpen(true);
  };

  // Handle dialog close
  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingKeyword(null);
  };

  // Handle save
  const handleSave = () => {
    if (editingKeyword) {
      setKeywords(keywords.map((k) => (k.id === editingKeyword.id ? { ...formData, id: k.id } : k)));
    } else {
      setKeywords([...keywords, { ...formData, id: Date.now() }]);
    }
    handleCloseDialog();
  };

  // Handle delete
  const handleDelete = (id) => {
    setKeywords(keywords.filter((k) => k.id !== id));
  };

  // Get difficulty color
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'low': return 'success';
      case 'medium': return 'warning';
      case 'high': return 'error';
      default: return 'default';
    }
  };

  // Get type color
  const getTypeColor = (type) => {
    switch (type) {
      case 'primary': return '#2196f3';
      case 'secondary': return '#9c27b0';
      case 'long-tail': return '#ff9800';
      case 'branded': return '#8B9A46';
      default: return '#9e9e9e';
    }
  };

  return (
    <AdminLayout title="Keywords">
      <Head>
        <title>Keywords | Admin - District 25</title>
      </Head>

      <Box>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700, color: '#1a1a2e', mb: 0.5 }}>
              Keyword Management
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Track and manage your SEO keywords
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button variant="outlined" startIcon={<UploadIcon />}>
              Import CSV
            </Button>
            <Button variant="outlined" startIcon={<DownloadIcon />}>
              Export CSV
            </Button>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => handleOpenDialog()}
              sx={{ backgroundColor: '#8B9A46', '&:hover': { backgroundColor: '#6b7a36' } }}
            >
              Add Keyword
            </Button>
          </Box>
        </Box>

        {/* Keywords Table */}
        <Paper sx={{ borderRadius: 3, overflow: 'hidden' }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#f5f5f7' }}>
                  <TableCell sx={{ fontWeight: 600 }}>Keyword</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Type</TableCell>
                  <TableCell sx={{ fontWeight: 600 }} align="right">Search Volume</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Difficulty</TableCell>
                  <TableCell sx={{ fontWeight: 600 }} align="right">Position</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 600 }} align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  [...Array(5)].map((_, index) => (
                    <TableRow key={index}>
                      {[...Array(7)].map((_, cellIndex) => (
                        <TableCell key={cellIndex}>
                          <Skeleton variant="text" />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  keywords.map((keyword) => (
                    <TableRow key={keyword.id} hover>
                      <TableCell>
                        <Typography variant="body2" fontWeight={500}>
                          {keyword.keyword}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={keyword.type}
                          size="small"
                          sx={{
                            backgroundColor: `${getTypeColor(keyword.type)}20`,
                            color: getTypeColor(keyword.type),
                            textTransform: 'capitalize',
                          }}
                        />
                      </TableCell>
                      <TableCell align="right">{keyword.volume?.toLocaleString() || '-'}</TableCell>
                      <TableCell>
                        <Chip
                          label={keyword.difficulty}
                          size="small"
                          color={getDifficultyColor(keyword.difficulty)}
                          variant="outlined"
                          sx={{ textTransform: 'capitalize' }}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <Typography
                          variant="body2"
                          sx={{
                            color: keyword.position <= 3 ? '#4caf50' : keyword.position <= 10 ? '#ff9800' : '#f44336',
                            fontWeight: 600,
                          }}
                        >
                          #{keyword.position || '-'}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={keyword.active ? 'Active' : 'Inactive'}
                          size="small"
                          color={keyword.active ? 'success' : 'default'}
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell align="center">
                        <Tooltip title="Edit">
                          <IconButton size="small" onClick={() => handleOpenDialog(keyword)}>
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton size="small" color="error" onClick={() => handleDelete(keyword.id)}>
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        {/* Add/Edit Dialog */}
        <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
          <DialogTitle>
            {editingKeyword ? 'Edit Keyword' : 'Add New Keyword'}
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Keyword"
                  value={formData.keyword}
                  onChange={(e) => setFormData({ ...formData, keyword: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Type</InputLabel>
                  <Select
                    value={formData.type}
                    label="Type"
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  >
                    <MenuItem value="primary">Primary</MenuItem>
                    <MenuItem value="secondary">Secondary</MenuItem>
                    <MenuItem value="long-tail">Long-tail</MenuItem>
                    <MenuItem value="branded">Branded</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Difficulty</InputLabel>
                  <Select
                    value={formData.difficulty}
                    label="Difficulty"
                    onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                  >
                    <MenuItem value="low">Low</MenuItem>
                    <MenuItem value="medium">Medium</MenuItem>
                    <MenuItem value="high">High</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Search Volume"
                  type="number"
                  value={formData.volume}
                  onChange={(e) => setFormData({ ...formData, volume: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Current Position"
                  type="number"
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button
              variant="contained"
              onClick={handleSave}
              sx={{ backgroundColor: '#8B9A46', '&:hover': { backgroundColor: '#6b7a36' } }}
            >
              {editingKeyword ? 'Update' : 'Add'}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </AdminLayout>
  );
};

export default withAuth(AdminKeywordsPage);
