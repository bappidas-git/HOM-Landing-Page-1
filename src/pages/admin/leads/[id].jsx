/**
 * Admin Lead Detail Page
 * View and manage individual lead details
 */

import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import {
  Box,
  Paper,
  Grid,
  Typography,
  Button,
  Chip,
  Divider,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  IconButton,
  Skeleton,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  CalendarMonth as CalendarIcon,
  DirectionsCar as CarIcon,
  Restaurant as RestaurantIcon,
  Computer as ComputerIcon,
  Notes as NotesIcon,
  Save as SaveIcon,
} from '@mui/icons-material';
import AdminLayout from '@/components/admin/AdminLayout';
import { withAuth } from '@/context/AuthContext';
import { LEAD_STATUS_OPTIONS, LEAD_PRIORITY_OPTIONS } from '@/lib/constants';

// Mock lead data
const mockLead = {
  id: 1,
  name: 'Rahul Kumar',
  email: 'rahul.kumar@email.com',
  mobile: '9876543210',
  message: 'Interested in 3BHK apartments. Looking for something within 2 Cr budget.',
  source: 'hero_form',
  status: 'contacted',
  priority: 'high',
  wantsSiteVisit: true,
  siteVisitDate: '2025-01-15',
  siteVisitTime: '10:00 AM',
  wantsPickupDrop: true,
  pickupLocation: 'Koramangala, Bangalore',
  dropLocation: 'Same as pickup',
  wantsMeal: true,
  mealPreference: 'lunch',
  ipAddress: '103.45.67.89',
  city: 'Bangalore',
  state: 'Karnataka',
  country: 'India',
  userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0',
  utmSource: 'google',
  utmMedium: 'cpc',
  utmCampaign: 'district25_jan',
  notes: [
    { id: 1, text: 'Called and discussed requirements. Interested in 3BHK.', createdAt: '2025-01-11T10:00:00', createdBy: 'Admin' },
    { id: 2, text: 'Scheduled site visit for 15th Jan.', createdAt: '2025-01-11T11:30:00', createdBy: 'Admin' },
  ],
  createdAt: '2025-01-10T14:30:00',
  updatedAt: '2025-01-11T11:30:00',
};

/**
 * Admin Lead Detail Page Component
 */
const AdminLeadDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [loading, setLoading] = useState(true);
  const [lead, setLead] = useState(null);
  const [status, setStatus] = useState('');
  const [priority, setPriority] = useState('');
  const [newNote, setNewNote] = useState('');

  // Load lead data
  useEffect(() => {
    if (id) {
      const timer = setTimeout(() => {
        setLead(mockLead);
        setStatus(mockLead.status);
        setPriority(mockLead.priority);
        setLoading(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [id]);

  // Handle status update
  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  // Handle priority update
  const handlePriorityChange = (event) => {
    setPriority(event.target.value);
  };

  // Handle save
  const handleSave = () => {
    console.log('Saving lead...', { status, priority });
  };

  // Handle add note
  const handleAddNote = () => {
    if (newNote.trim()) {
      console.log('Adding note:', newNote);
      setNewNote('');
    }
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-IN', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
  };

  // Get status config
  const getStatusConfig = (statusValue) => {
    return LEAD_STATUS_OPTIONS.find((opt) => opt.value === statusValue) || { label: statusValue, color: '#9e9e9e' };
  };

  if (loading) {
    return (
      <AdminLayout title="Lead Details">
        <Box sx={{ p: 3 }}>
          <Skeleton variant="text" width={200} height={40} />
          <Skeleton variant="rectangular" height={400} sx={{ mt: 3 }} />
        </Box>
      </AdminLayout>
    );
  }

  if (!lead) {
    return (
      <AdminLayout title="Lead Not Found">
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h5">Lead not found</Typography>
          <Button onClick={() => router.back()} sx={{ mt: 2 }}>
            Go Back
          </Button>
        </Box>
      </AdminLayout>
    );
  }

  const statusConfig = getStatusConfig(lead.status);

  return (
    <AdminLayout title="Lead Details">
      <Head>
        <title>Lead: {lead.name} | Admin - District 25</title>
      </Head>

      <Box>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton onClick={() => router.back()}>
              <ArrowBackIcon />
            </IconButton>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#1a1a2e' }}>
                {lead.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lead ID: #{lead.id} | Created: {formatDate(lead.createdAt)}
              </Typography>
            </Box>
          </Box>
          <Chip
            label={statusConfig.label}
            sx={{
              backgroundColor: `${statusConfig.color}20`,
              color: statusConfig.color,
              fontWeight: 600,
              fontSize: '0.875rem',
              py: 2,
            }}
          />
        </Box>

        <Grid container spacing={3}>
          {/* Left Column - Lead Info */}
          <Grid item xs={12} md={8}>
            {/* Contact Information */}
            <Paper sx={{ p: 3, mb: 3, borderRadius: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                Contact Information
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <PersonIcon color="action" />
                    <Box>
                      <Typography variant="caption" color="text.secondary">Name</Typography>
                      <Typography variant="body1">{lead.name}</Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <PhoneIcon color="action" />
                    <Box>
                      <Typography variant="caption" color="text.secondary">Mobile</Typography>
                      <Typography variant="body1">{lead.mobile}</Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <EmailIcon color="action" />
                    <Box>
                      <Typography variant="caption" color="text.secondary">Email</Typography>
                      <Typography variant="body1">{lead.email}</Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <LocationIcon color="action" />
                    <Box>
                      <Typography variant="caption" color="text.secondary">Location</Typography>
                      <Typography variant="body1">{lead.city}, {lead.state}</Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
              {lead.message && (
                <Box sx={{ mt: 3, p: 2, backgroundColor: '#f5f5f7', borderRadius: 2 }}>
                  <Typography variant="caption" color="text.secondary">Message</Typography>
                  <Typography variant="body2">{lead.message}</Typography>
                </Box>
              )}
            </Paper>

            {/* Site Visit Details */}
            {lead.wantsSiteVisit && (
              <Paper sx={{ p: 3, mb: 3, borderRadius: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                  Site Visit Details
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <CalendarIcon color="action" />
                      <Box>
                        <Typography variant="caption" color="text.secondary">Date & Time</Typography>
                        <Typography variant="body1">{lead.siteVisitDate} at {lead.siteVisitTime}</Typography>
                      </Box>
                    </Box>
                  </Grid>
                  {lead.wantsPickupDrop && (
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <CarIcon color="action" />
                        <Box>
                          <Typography variant="caption" color="text.secondary">Pickup Location</Typography>
                          <Typography variant="body1">{lead.pickupLocation}</Typography>
                        </Box>
                      </Box>
                    </Grid>
                  )}
                  {lead.wantsMeal && (
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <RestaurantIcon color="action" />
                        <Box>
                          <Typography variant="caption" color="text.secondary">Meal Preference</Typography>
                          <Typography variant="body1" sx={{ textTransform: 'capitalize' }}>{lead.mealPreference}</Typography>
                        </Box>
                      </Box>
                    </Grid>
                  )}
                </Grid>
              </Paper>
            )}

            {/* Notes */}
            <Paper sx={{ p: 3, borderRadius: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                Notes
              </Typography>
              <Box sx={{ mb: 3 }}>
                <TextField
                  fullWidth
                  multiline
                  rows={2}
                  placeholder="Add a note..."
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                />
                <Button
                  variant="contained"
                  size="small"
                  onClick={handleAddNote}
                  sx={{ mt: 1, backgroundColor: '#8B9A46', '&:hover': { backgroundColor: '#6b7a36' } }}
                >
                  Add Note
                </Button>
              </Box>
              <List>
                {lead.notes.map((note) => (
                  <ListItem key={note.id} sx={{ px: 0 }}>
                    <ListItemIcon>
                      <NotesIcon color="action" />
                    </ListItemIcon>
                    <ListItemText
                      primary={note.text}
                      secondary={`${note.createdBy} - ${formatDate(note.createdAt)}`}
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>

          {/* Right Column - Status & Actions */}
          <Grid item xs={12} md={4}>
            {/* Status Card */}
            <Card sx={{ mb: 3, borderRadius: 3 }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                  Status & Priority
                </Typography>
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel>Status</InputLabel>
                  <Select value={status} label="Status" onChange={handleStatusChange}>
                    {LEAD_STATUS_OPTIONS.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl fullWidth sx={{ mb: 3 }}>
                  <InputLabel>Priority</InputLabel>
                  <Select value={priority} label="Priority" onChange={handlePriorityChange}>
                    {LEAD_PRIORITY_OPTIONS.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<SaveIcon />}
                  onClick={handleSave}
                  sx={{ backgroundColor: '#8B9A46', '&:hover': { backgroundColor: '#6b7a36' } }}
                >
                  Save Changes
                </Button>
              </CardContent>
            </Card>

            {/* Tracking Info */}
            <Card sx={{ borderRadius: 3 }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                  Tracking Information
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box>
                    <Typography variant="caption" color="text.secondary">Source</Typography>
                    <Typography variant="body2">{lead.source.replace('_', ' ')}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary">IP Address</Typography>
                    <Typography variant="body2">{lead.ipAddress}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary">UTM Source</Typography>
                    <Typography variant="body2">{lead.utmSource || 'N/A'}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary">UTM Campaign</Typography>
                    <Typography variant="body2">{lead.utmCampaign || 'N/A'}</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </AdminLayout>
  );
};

export default withAuth(AdminLeadDetailPage);
