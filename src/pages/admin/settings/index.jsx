/**
 * Admin Settings Page
 * Professional settings management with tabbed interface
 */

import { useState, useEffect } from 'react';
import Head from 'next/head';
import {
  Box,
  Paper,
  Typography,
  Grid,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Divider,
  Alert,
  Tabs,
  Tab,
  IconButton,
  Chip,
  Tooltip,
  Snackbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  InputAdornment,
  Card,
  CardContent,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Collapse,
  LinearProgress,
  Skeleton,
  Badge,
} from '@mui/material';
import {
  Settings as SettingsIcon,
  Business as BusinessIcon,
  Share as ShareIcon,
  Notifications as NotificationsIcon,
  Build as BuildIcon,
  Save as SaveIcon,
  Refresh as RefreshIcon,
  Delete as DeleteIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  WhatsApp as WhatsAppIcon,
  Language as LanguageIcon,
  LocationOn as LocationOnIcon,
  Facebook as FacebookIcon,
  Instagram as InstagramIcon,
  LinkedIn as LinkedInIcon,
  YouTube as YouTubeIcon,
  Twitter as TwitterIcon,
  EventAvailable as EventAvailableIcon,
  LocalShipping as LocalShippingIcon,
  Restaurant as RestaurantIcon,
  Storage as StorageIcon,
  CloudUpload as CloudUploadIcon,
  Security as SecurityIcon,
  Info as InfoIcon,
  Verified as VerifiedIcon,
  Schedule as ScheduleIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  ContentCopy as ContentCopyIcon,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import AdminLayout from '@/components/admin/AdminLayout';
import { withAuth } from '@/context/AuthContext';

// Tab panel component
const TabPanel = ({ children, value, index, ...other }) => (
  <div
    role="tabpanel"
    hidden={value !== index}
    id={`settings-tabpanel-${index}`}
    aria-labelledby={`settings-tab-${index}`}
    {...other}
  >
    {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
  </div>
);

// Settings card component
const SettingsCard = ({ title, description, icon: Icon, children, badge, expanded, onToggle }) => (
  <Card
    component={motion.div}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    sx={{
      mb: 3,
      borderRadius: 3,
      boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
      border: '1px solid',
      borderColor: 'divider',
      overflow: 'hidden',
      '&:hover': {
        boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
      },
      transition: 'box-shadow 0.3s ease',
    }}
  >
    <Box
      sx={{
        p: 3,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: expanded !== undefined ? '1px solid' : 'none',
        borderColor: 'divider',
        cursor: onToggle ? 'pointer' : 'default',
        backgroundColor: 'rgba(102, 126, 234, 0.03)',
      }}
      onClick={onToggle}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Avatar
          sx={{
            width: 48,
            height: 48,
            backgroundColor: 'rgba(102, 126, 234, 0.1)',
            color: '#667eea',
          }}
        >
          <Icon />
        </Avatar>
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {title}
            </Typography>
            {badge && (
              <Chip
                label={badge}
                size="small"
                color="primary"
                sx={{ height: 20, fontSize: '0.7rem' }}
              />
            )}
          </Box>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </Box>
      </Box>
      {expanded !== undefined && (
        <IconButton size="small">
          {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      )}
    </Box>
    {expanded === undefined ? (
      <CardContent sx={{ p: 3 }}>{children}</CardContent>
    ) : (
      <Collapse in={expanded}>
        <CardContent sx={{ p: 3 }}>{children}</CardContent>
      </Collapse>
    )}
  </Card>
);

// Form field component with icon
const FormField = ({ icon: Icon, label, value, onChange, multiline, rows, helperText, type = 'text', disabled, copyable }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(value);
  };

  return (
    <TextField
      fullWidth
      label={label}
      value={value}
      onChange={onChange}
      type={type}
      multiline={multiline}
      rows={rows}
      disabled={disabled}
      helperText={helperText}
      InputProps={{
        startAdornment: Icon && (
          <InputAdornment position="start">
            <Icon sx={{ color: 'text.secondary' }} />
          </InputAdornment>
        ),
        endAdornment: copyable && (
          <InputAdornment position="end">
            <Tooltip title="Copy to clipboard">
              <IconButton size="small" onClick={handleCopy}>
                <ContentCopyIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </InputAdornment>
        ),
      }}
      sx={{
        '& .MuiOutlinedInput-root': {
          borderRadius: 2,
          '&:hover': {
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#667eea',
            },
          },
          '&.Mui-focused': {
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#667eea',
            },
          },
        },
      }}
    />
  );
};

// Time slot chip component
const TimeSlotChip = ({ time, onDelete, disabled }) => (
  <Chip
    label={time}
    onDelete={disabled ? undefined : onDelete}
    size="small"
    sx={{
      m: 0.5,
      backgroundColor: 'rgba(102, 126, 234, 0.1)',
      color: '#667eea',
      fontWeight: 500,
      '&:hover': {
        backgroundColor: 'rgba(102, 126, 234, 0.2)',
      },
    }}
  />
);

/**
 * Admin Settings Page Component
 */
const AdminSettingsPage = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [confirmDialog, setConfirmDialog] = useState({ open: false, type: '', title: '', message: '' });
  const [expandedSections, setExpandedSections] = useState({
    timeSlots: false,
    mealOptions: false,
  });

  // General settings
  const [general, setGeneral] = useState({
    siteName: 'Nambiar District 25 Phase 2',
    siteTagline: 'THE SOHO LIFE RETURNS',
    siteUrl: 'https://nambiardistrict25.com',
    contactEmail: 'sales@nambiardistrict25.com',
    contactPhone: '+91 702 603 4444',
    whatsappNumber: '+917026034444',
    projectAddress: 'Chandapura Dommasandra Road, Dommasandra, Bengaluru - 562125',
    officeAddress: '2nd Floor, PR Business Centre, Above Croma, Outer Ring Road, Kadubisanahalli, Marathahalli Post, Bengaluru - 560103',
    reraNumber: 'PRM/KA/RERA/1251/308/PR/200825/008011',
    developerName: 'Nambiar Builders',
  });

  // Social links
  const [social, setSocial] = useState({
    facebook: 'https://facebook.com/nambiarbuilders',
    instagram: 'https://instagram.com/nambiarbuilders',
    linkedin: 'https://linkedin.com/company/nambiarbuilders',
    youtube: 'https://youtube.com/nambiarbuilders',
    twitter: 'https://twitter.com/nambiarbuilders',
  });

  // Lead settings
  const [leadSettings, setLeadSettings] = useState({
    notificationEmails: 'sales@nambiardistrict25.com',
    enableSiteVisit: true,
    enablePickupDrop: true,
    enableMealBooking: true,
    enableDuplicateCheck: true,
    autoAssignLeads: false,
    leadNotificationInterval: 'immediate',
  });

  // Time slots
  const [timeSlots, setTimeSlots] = useState([
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
  ]);
  const [newTimeSlot, setNewTimeSlot] = useState('');

  // Meal options
  const [mealOptions, setMealOptions] = useState([
    { value: 'breakfast', label: 'Breakfast', enabled: true },
    { value: 'lunch', label: 'Lunch', enabled: true },
    { value: 'coffee', label: 'Coffee/Snacks', enabled: true },
  ]);

  // System settings
  const [system, setSystem] = useState({
    maintenanceMode: false,
    debugMode: false,
    enableAnalytics: true,
    cacheEnabled: true,
    autoBackup: true,
    backupFrequency: 'daily',
  });

  // Load settings
  useEffect(() => {
    const loadSettings = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        setLoading(false);
      } catch (error) {
        setSnackbar({
          open: true,
          message: 'Failed to load settings',
          severity: 'error'
        });
        setLoading(false);
      }
    };
    loadSettings();
  }, []);

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  // Handle save
  const handleSave = async () => {
    setSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1200));
      setSnackbar({
        open: true,
        message: 'Settings saved successfully',
        severity: 'success'
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Failed to save settings',
        severity: 'error'
      });
    } finally {
      setSaving(false);
    }
  };

  // Handle confirm action
  const handleConfirmAction = () => {
    const { type } = confirmDialog;

    switch (type) {
      case 'clearCache':
        setSnackbar({ open: true, message: 'Cache cleared successfully', severity: 'success' });
        break;
      case 'backupDatabase':
        setSnackbar({ open: true, message: 'Database backup initiated', severity: 'info' });
        break;
      case 'clearLeads':
        setSnackbar({ open: true, message: 'All leads have been deleted', severity: 'warning' });
        break;
      case 'resetSettings':
        setSnackbar({ open: true, message: 'Settings reset to defaults', severity: 'info' });
        break;
      default:
        break;
    }
    setConfirmDialog({ ...confirmDialog, open: false });
  };

  // Add time slot
  const handleAddTimeSlot = () => {
    if (newTimeSlot && !timeSlots.includes(newTimeSlot)) {
      setTimeSlots([...timeSlots, newTimeSlot].sort());
      setNewTimeSlot('');
    }
  };

  // Remove time slot
  const handleRemoveTimeSlot = (slot) => {
    setTimeSlots(timeSlots.filter(s => s !== slot));
  };

  // Toggle meal option
  const handleToggleMealOption = (value) => {
    setMealOptions(mealOptions.map(option =>
      option.value === value ? { ...option, enabled: !option.enabled } : option
    ));
  };

  // Tab definitions
  const tabs = [
    { label: 'General', icon: <BusinessIcon /> },
    { label: 'Social Links', icon: <ShareIcon /> },
    { label: 'Lead Settings', icon: <NotificationsIcon /> },
    { label: 'System', icon: <BuildIcon /> },
  ];

  if (loading) {
    return (
      <AdminLayout title="Settings">
        <Head>
          <title>Settings | Admin - District 25</title>
        </Head>
        <Box sx={{ p: 3 }}>
          <Skeleton variant="rectangular" height={60} sx={{ mb: 3, borderRadius: 2 }} />
          <Skeleton variant="rectangular" height={400} sx={{ borderRadius: 3 }} />
        </Box>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Settings">
      <Head>
        <title>Settings | Admin - District 25</title>
      </Head>

      <Box>
        {/* Header */}
        <Paper
          component={motion.div}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          sx={{
            p: 3,
            mb: 3,
            borderRadius: 3,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Background pattern */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '40%',
              height: '100%',
              background: 'radial-gradient(circle at 70% 50%, rgba(102, 126, 234, 0.2) 0%, transparent 70%)',
            }}
          />

          <Box sx={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                <Avatar
                  sx={{
                    width: 56,
                    height: 56,
                    backgroundColor: 'rgba(102, 126, 234, 0.2)',
                    border: '2px solid rgba(102, 126, 234, 0.5)',
                  }}
                >
                  <SettingsIcon sx={{ fontSize: 28, color: '#a3b15e' }} />
                </Avatar>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    Settings
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.7 }}>
                    Configure your site settings and preferences
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant="outlined"
                startIcon={<RefreshIcon />}
                onClick={() => window.location.reload()}
                sx={{
                  borderColor: 'rgba(255,255,255,0.3)',
                  color: 'white',
                  '&:hover': {
                    borderColor: 'rgba(255,255,255,0.5)',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                  },
                }}
              >
                Reset
              </Button>
              <Button
                variant="contained"
                startIcon={saving ? null : <SaveIcon />}
                onClick={handleSave}
                disabled={saving}
                sx={{
                  backgroundColor: '#667eea',
                  '&:hover': { backgroundColor: '#764ba2' },
                  minWidth: 140,
                }}
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </Button>
            </Box>
          </Box>

          {saving && (
            <LinearProgress
              sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                '& .MuiLinearProgress-bar': {
                  backgroundColor: '#667eea',
                },
              }}
            />
          )}
        </Paper>

        {/* Tabs */}
        <Paper sx={{ borderRadius: 3, mb: 3 }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              borderBottom: 1,
              borderColor: 'divider',
              '& .MuiTab-root': {
                minHeight: 64,
                textTransform: 'none',
                fontSize: '0.95rem',
                fontWeight: 500,
              },
              '& .Mui-selected': {
                color: '#667eea',
              },
              '& .MuiTabs-indicator': {
                backgroundColor: '#667eea',
                height: 3,
              },
            }}
          >
            {tabs.map((tab, index) => (
              <Tab
                key={index}
                icon={tab.icon}
                label={tab.label}
                iconPosition="start"
                sx={{ gap: 1 }}
              />
            ))}
          </Tabs>

          <Box sx={{ p: 3 }}>
            {/* General Settings Tab */}
            <TabPanel value={activeTab} index={0}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <SettingsCard
                    title="Site Information"
                    description="Basic information about your website"
                    icon={LanguageIcon}
                  >
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6}>
                        <FormField
                          icon={BusinessIcon}
                          label="Site Name"
                          value={general.siteName}
                          onChange={(e) => setGeneral({ ...general, siteName: e.target.value })}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <FormField
                          label="Site Tagline"
                          value={general.siteTagline}
                          onChange={(e) => setGeneral({ ...general, siteTagline: e.target.value })}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <FormField
                          icon={LanguageIcon}
                          label="Site URL"
                          value={general.siteUrl}
                          onChange={(e) => setGeneral({ ...general, siteUrl: e.target.value })}
                          copyable
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <FormField
                          label="Developer Name"
                          value={general.developerName}
                          onChange={(e) => setGeneral({ ...general, developerName: e.target.value })}
                        />
                      </Grid>
                    </Grid>
                  </SettingsCard>
                </Grid>

                <Grid item xs={12}>
                  <SettingsCard
                    title="Contact Information"
                    description="How customers can reach you"
                    icon={PhoneIcon}
                  >
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6}>
                        <FormField
                          icon={EmailIcon}
                          label="Contact Email"
                          value={general.contactEmail}
                          onChange={(e) => setGeneral({ ...general, contactEmail: e.target.value })}
                          type="email"
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <FormField
                          icon={PhoneIcon}
                          label="Contact Phone"
                          value={general.contactPhone}
                          onChange={(e) => setGeneral({ ...general, contactPhone: e.target.value })}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <FormField
                          icon={WhatsAppIcon}
                          label="WhatsApp Number"
                          value={general.whatsappNumber}
                          onChange={(e) => setGeneral({ ...general, whatsappNumber: e.target.value })}
                          helperText="Include country code (e.g., +917026034444)"
                        />
                      </Grid>
                    </Grid>
                  </SettingsCard>
                </Grid>

                <Grid item xs={12}>
                  <SettingsCard
                    title="Address & RERA"
                    description="Project and office locations"
                    icon={LocationOnIcon}
                  >
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <FormField
                          icon={LocationOnIcon}
                          label="Project Address"
                          value={general.projectAddress}
                          onChange={(e) => setGeneral({ ...general, projectAddress: e.target.value })}
                          multiline
                          rows={2}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <FormField
                          label="Office Address"
                          value={general.officeAddress}
                          onChange={(e) => setGeneral({ ...general, officeAddress: e.target.value })}
                          multiline
                          rows={2}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <FormField
                          icon={VerifiedIcon}
                          label="RERA Number"
                          value={general.reraNumber}
                          onChange={(e) => setGeneral({ ...general, reraNumber: e.target.value })}
                          copyable
                        />
                      </Grid>
                    </Grid>
                  </SettingsCard>
                </Grid>
              </Grid>
            </TabPanel>

            {/* Social Links Tab */}
            <TabPanel value={activeTab} index={1}>
              <SettingsCard
                title="Social Media Profiles"
                description="Connect your social media accounts"
                icon={ShareIcon}
              >
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <FormField
                      icon={FacebookIcon}
                      label="Facebook"
                      value={social.facebook}
                      onChange={(e) => setSocial({ ...social, facebook: e.target.value })}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormField
                      icon={InstagramIcon}
                      label="Instagram"
                      value={social.instagram}
                      onChange={(e) => setSocial({ ...social, instagram: e.target.value })}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormField
                      icon={LinkedInIcon}
                      label="LinkedIn"
                      value={social.linkedin}
                      onChange={(e) => setSocial({ ...social, linkedin: e.target.value })}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormField
                      icon={YouTubeIcon}
                      label="YouTube"
                      value={social.youtube}
                      onChange={(e) => setSocial({ ...social, youtube: e.target.value })}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormField
                      icon={TwitterIcon}
                      label="Twitter/X"
                      value={social.twitter}
                      onChange={(e) => setSocial({ ...social, twitter: e.target.value })}
                    />
                  </Grid>
                </Grid>

                <Box sx={{ mt: 3, p: 2, backgroundColor: 'rgba(102, 126, 234, 0.05)', borderRadius: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <InfoIcon sx={{ color: '#667eea', fontSize: 20 }} />
                    <Typography variant="body2" fontWeight={500}>
                      Pro Tip
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    Social media links will appear in the footer and can be used for sharing functionality.
                    Make sure all URLs are complete and valid.
                  </Typography>
                </Box>
              </SettingsCard>
            </TabPanel>

            {/* Lead Settings Tab */}
            <TabPanel value={activeTab} index={2}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <SettingsCard
                    title="Notification Settings"
                    description="Configure lead notification preferences"
                    icon={NotificationsIcon}
                  >
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <FormField
                          icon={EmailIcon}
                          label="Notification Emails"
                          value={leadSettings.notificationEmails}
                          onChange={(e) => setLeadSettings({ ...leadSettings, notificationEmails: e.target.value })}
                          helperText="Comma-separated email addresses for lead notifications"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                          <Chip
                            label="Immediate"
                            variant={leadSettings.leadNotificationInterval === 'immediate' ? 'filled' : 'outlined'}
                            onClick={() => setLeadSettings({ ...leadSettings, leadNotificationInterval: 'immediate' })}
                            sx={{
                              backgroundColor: leadSettings.leadNotificationInterval === 'immediate' ? '#667eea' : 'transparent',
                              color: leadSettings.leadNotificationInterval === 'immediate' ? 'white' : '#667eea',
                              borderColor: '#667eea',
                            }}
                          />
                          <Chip
                            label="Hourly Digest"
                            variant={leadSettings.leadNotificationInterval === 'hourly' ? 'filled' : 'outlined'}
                            onClick={() => setLeadSettings({ ...leadSettings, leadNotificationInterval: 'hourly' })}
                            sx={{
                              backgroundColor: leadSettings.leadNotificationInterval === 'hourly' ? '#667eea' : 'transparent',
                              color: leadSettings.leadNotificationInterval === 'hourly' ? 'white' : '#667eea',
                              borderColor: '#667eea',
                            }}
                          />
                          <Chip
                            label="Daily Digest"
                            variant={leadSettings.leadNotificationInterval === 'daily' ? 'filled' : 'outlined'}
                            onClick={() => setLeadSettings({ ...leadSettings, leadNotificationInterval: 'daily' })}
                            sx={{
                              backgroundColor: leadSettings.leadNotificationInterval === 'daily' ? '#667eea' : 'transparent',
                              color: leadSettings.leadNotificationInterval === 'daily' ? 'white' : '#667eea',
                              borderColor: '#667eea',
                            }}
                          />
                        </Box>
                      </Grid>
                    </Grid>
                  </SettingsCard>
                </Grid>

                <Grid item xs={12}>
                  <SettingsCard
                    title="Lead Form Features"
                    description="Enable or disable lead form options"
                    icon={EventAvailableIcon}
                  >
                    <List>
                      <ListItem sx={{ px: 0 }}>
                        <ListItemIcon>
                          <EventAvailableIcon sx={{ color: leadSettings.enableSiteVisit ? '#667eea' : 'text.disabled' }} />
                        </ListItemIcon>
                        <ListItemText
                          primary="Site Visit Booking"
                          secondary="Allow users to schedule site visits through the lead form"
                        />
                        <ListItemSecondaryAction>
                          <Switch
                            checked={leadSettings.enableSiteVisit}
                            onChange={() => setLeadSettings({ ...leadSettings, enableSiteVisit: !leadSettings.enableSiteVisit })}
                            sx={{
                              '& .MuiSwitch-switchBase.Mui-checked': {
                                color: '#667eea',
                              },
                              '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                backgroundColor: '#667eea',
                              },
                            }}
                          />
                        </ListItemSecondaryAction>
                      </ListItem>
                      <Divider />
                      <ListItem sx={{ px: 0 }}>
                        <ListItemIcon>
                          <LocalShippingIcon sx={{ color: leadSettings.enablePickupDrop ? '#667eea' : 'text.disabled' }} />
                        </ListItemIcon>
                        <ListItemText
                          primary="Pickup & Drop Service"
                          secondary="Offer free pickup and drop for site visits"
                        />
                        <ListItemSecondaryAction>
                          <Switch
                            checked={leadSettings.enablePickupDrop}
                            onChange={() => setLeadSettings({ ...leadSettings, enablePickupDrop: !leadSettings.enablePickupDrop })}
                            sx={{
                              '& .MuiSwitch-switchBase.Mui-checked': {
                                color: '#667eea',
                              },
                              '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                backgroundColor: '#667eea',
                              },
                            }}
                          />
                        </ListItemSecondaryAction>
                      </ListItem>
                      <Divider />
                      <ListItem sx={{ px: 0 }}>
                        <ListItemIcon>
                          <RestaurantIcon sx={{ color: leadSettings.enableMealBooking ? '#667eea' : 'text.disabled' }} />
                        </ListItemIcon>
                        <ListItemText
                          primary="Meal Booking"
                          secondary="Allow meal preferences for site visits"
                        />
                        <ListItemSecondaryAction>
                          <Switch
                            checked={leadSettings.enableMealBooking}
                            onChange={() => setLeadSettings({ ...leadSettings, enableMealBooking: !leadSettings.enableMealBooking })}
                            sx={{
                              '& .MuiSwitch-switchBase.Mui-checked': {
                                color: '#667eea',
                              },
                              '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                backgroundColor: '#667eea',
                              },
                            }}
                          />
                        </ListItemSecondaryAction>
                      </ListItem>
                      <Divider />
                      <ListItem sx={{ px: 0 }}>
                        <ListItemIcon>
                          <SecurityIcon sx={{ color: leadSettings.enableDuplicateCheck ? '#667eea' : 'text.disabled' }} />
                        </ListItemIcon>
                        <ListItemText
                          primary="Duplicate Prevention"
                          secondary="Block duplicate submissions based on phone/email"
                        />
                        <ListItemSecondaryAction>
                          <Switch
                            checked={leadSettings.enableDuplicateCheck}
                            onChange={() => setLeadSettings({ ...leadSettings, enableDuplicateCheck: !leadSettings.enableDuplicateCheck })}
                            sx={{
                              '& .MuiSwitch-switchBase.Mui-checked': {
                                color: '#667eea',
                              },
                              '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                backgroundColor: '#667eea',
                              },
                            }}
                          />
                        </ListItemSecondaryAction>
                      </ListItem>
                    </List>
                  </SettingsCard>
                </Grid>

                <Grid item xs={12}>
                  <SettingsCard
                    title="Available Time Slots"
                    description="Configure available times for site visits"
                    icon={ScheduleIcon}
                    expanded={expandedSections.timeSlots}
                    onToggle={() => setExpandedSections({ ...expandedSections, timeSlots: !expandedSections.timeSlots })}
                  >
                    <Box sx={{ mb: 2 }}>
                      {timeSlots.map((slot) => (
                        <TimeSlotChip
                          key={slot}
                          time={slot}
                          onDelete={() => handleRemoveTimeSlot(slot)}
                        />
                      ))}
                    </Box>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <TextField
                        size="small"
                        placeholder="Add time slot (e.g., 6:00 PM)"
                        value={newTimeSlot}
                        onChange={(e) => setNewTimeSlot(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleAddTimeSlot()}
                        sx={{ flexGrow: 1 }}
                      />
                      <Button
                        variant="outlined"
                        startIcon={<AddIcon />}
                        onClick={handleAddTimeSlot}
                        sx={{ borderColor: '#667eea', color: '#667eea' }}
                      >
                        Add
                      </Button>
                    </Box>
                  </SettingsCard>
                </Grid>

                <Grid item xs={12}>
                  <SettingsCard
                    title="Meal Options"
                    description="Configure available meal preferences"
                    icon={RestaurantIcon}
                    expanded={expandedSections.mealOptions}
                    onToggle={() => setExpandedSections({ ...expandedSections, mealOptions: !expandedSections.mealOptions })}
                  >
                    <List>
                      {mealOptions.map((option) => (
                        <ListItem key={option.value} sx={{ px: 0 }}>
                          <ListItemText primary={option.label} />
                          <ListItemSecondaryAction>
                            <Switch
                              checked={option.enabled}
                              onChange={() => handleToggleMealOption(option.value)}
                              sx={{
                                '& .MuiSwitch-switchBase.Mui-checked': {
                                  color: '#667eea',
                                },
                                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                  backgroundColor: '#667eea',
                                },
                              }}
                            />
                          </ListItemSecondaryAction>
                        </ListItem>
                      ))}
                    </List>
                  </SettingsCard>
                </Grid>
              </Grid>
            </TabPanel>

            {/* System Settings Tab */}
            <TabPanel value={activeTab} index={3}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  {system.maintenanceMode && (
                    <Alert
                      severity="warning"
                      icon={<WarningIcon />}
                      sx={{ mb: 3, borderRadius: 2 }}
                    >
                      <Typography variant="subtitle2" fontWeight={600}>
                        Maintenance Mode Active
                      </Typography>
                      <Typography variant="body2">
                        The site will display a maintenance page to all visitors. Disable this when ready to go live.
                      </Typography>
                    </Alert>
                  )}
                </Grid>

                <Grid item xs={12}>
                  <SettingsCard
                    title="Site Status"
                    description="Control site availability and modes"
                    icon={SettingsIcon}
                  >
                    <List>
                      <ListItem sx={{ px: 0 }}>
                        <ListItemIcon>
                          <WarningIcon sx={{ color: system.maintenanceMode ? '#ff9800' : 'text.disabled' }} />
                        </ListItemIcon>
                        <ListItemText
                          primary="Maintenance Mode"
                          secondary="Show maintenance page to visitors"
                        />
                        <ListItemSecondaryAction>
                          <Switch
                            checked={system.maintenanceMode}
                            onChange={() => setSystem({ ...system, maintenanceMode: !system.maintenanceMode })}
                            color="warning"
                          />
                        </ListItemSecondaryAction>
                      </ListItem>
                      <Divider />
                      <ListItem sx={{ px: 0 }}>
                        <ListItemIcon>
                          <BuildIcon sx={{ color: system.debugMode ? '#2196f3' : 'text.disabled' }} />
                        </ListItemIcon>
                        <ListItemText
                          primary="Debug Mode"
                          secondary="Enable detailed error messages and logging"
                        />
                        <ListItemSecondaryAction>
                          <Switch
                            checked={system.debugMode}
                            onChange={() => setSystem({ ...system, debugMode: !system.debugMode })}
                            color="info"
                          />
                        </ListItemSecondaryAction>
                      </ListItem>
                    </List>
                  </SettingsCard>
                </Grid>

                <Grid item xs={12}>
                  <SettingsCard
                    title="Performance"
                    description="Cache and optimization settings"
                    icon={StorageIcon}
                  >
                    <List>
                      <ListItem sx={{ px: 0 }}>
                        <ListItemIcon>
                          <StorageIcon sx={{ color: system.cacheEnabled ? '#667eea' : 'text.disabled' }} />
                        </ListItemIcon>
                        <ListItemText
                          primary="Enable Cache"
                          secondary="Cache API responses for faster loading"
                        />
                        <ListItemSecondaryAction>
                          <Switch
                            checked={system.cacheEnabled}
                            onChange={() => setSystem({ ...system, cacheEnabled: !system.cacheEnabled })}
                            sx={{
                              '& .MuiSwitch-switchBase.Mui-checked': {
                                color: '#667eea',
                              },
                              '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                backgroundColor: '#667eea',
                              },
                            }}
                          />
                        </ListItemSecondaryAction>
                      </ListItem>
                      <Divider />
                      <ListItem sx={{ px: 0 }}>
                        <ListItemIcon>
                          <CloudUploadIcon sx={{ color: system.autoBackup ? '#667eea' : 'text.disabled' }} />
                        </ListItemIcon>
                        <ListItemText
                          primary="Auto Backup"
                          secondary="Automatically backup database daily"
                        />
                        <ListItemSecondaryAction>
                          <Switch
                            checked={system.autoBackup}
                            onChange={() => setSystem({ ...system, autoBackup: !system.autoBackup })}
                            sx={{
                              '& .MuiSwitch-switchBase.Mui-checked': {
                                color: '#667eea',
                              },
                              '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                backgroundColor: '#667eea',
                              },
                            }}
                          />
                        </ListItemSecondaryAction>
                      </ListItem>
                    </List>
                  </SettingsCard>
                </Grid>

                <Grid item xs={12}>
                  <SettingsCard
                    title="System Actions"
                    description="Maintenance and data management"
                    icon={BuildIcon}
                    badge="Advanced"
                  >
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6} md={3}>
                        <Button
                          fullWidth
                          variant="outlined"
                          startIcon={<RefreshIcon />}
                          onClick={() => setConfirmDialog({
                            open: true,
                            type: 'clearCache',
                            title: 'Clear Cache',
                            message: 'This will clear all cached data. The site may be slower temporarily while cache rebuilds.',
                          })}
                          sx={{
                            borderColor: '#2196f3',
                            color: '#2196f3',
                            py: 1.5,
                            '&:hover': {
                              backgroundColor: 'rgba(33, 150, 243, 0.08)',
                              borderColor: '#2196f3',
                            },
                          }}
                        >
                          Clear Cache
                        </Button>
                      </Grid>
                      <Grid item xs={12} sm={6} md={3}>
                        <Button
                          fullWidth
                          variant="outlined"
                          startIcon={<CloudUploadIcon />}
                          onClick={() => setConfirmDialog({
                            open: true,
                            type: 'backupDatabase',
                            title: 'Backup Database',
                            message: 'Create a backup of all data. This may take a few minutes.',
                          })}
                          sx={{
                            borderColor: '#667eea',
                            color: '#667eea',
                            py: 1.5,
                            '&:hover': {
                              backgroundColor: 'rgba(102, 126, 234, 0.08)',
                              borderColor: '#667eea',
                            },
                          }}
                        >
                          Backup Data
                        </Button>
                      </Grid>
                      <Grid item xs={12} sm={6} md={3}>
                        <Button
                          fullWidth
                          variant="outlined"
                          startIcon={<SettingsIcon />}
                          onClick={() => setConfirmDialog({
                            open: true,
                            type: 'resetSettings',
                            title: 'Reset Settings',
                            message: 'This will reset all settings to their default values. This cannot be undone.',
                          })}
                          sx={{
                            borderColor: '#ff9800',
                            color: '#ff9800',
                            py: 1.5,
                            '&:hover': {
                              backgroundColor: 'rgba(255, 152, 0, 0.08)',
                              borderColor: '#ff9800',
                            },
                          }}
                        >
                          Reset Settings
                        </Button>
                      </Grid>
                      <Grid item xs={12} sm={6} md={3}>
                        <Button
                          fullWidth
                          variant="outlined"
                          color="error"
                          startIcon={<DeleteIcon />}
                          onClick={() => setConfirmDialog({
                            open: true,
                            type: 'clearLeads',
                            title: 'Clear All Leads',
                            message: 'This will permanently delete all leads from the database. This action cannot be undone!',
                          })}
                          sx={{ py: 1.5 }}
                        >
                          Clear Leads
                        </Button>
                      </Grid>
                    </Grid>

                    <Alert severity="info" sx={{ mt: 3, borderRadius: 2 }}>
                      <Typography variant="body2">
                        System actions may take a few moments to complete. Please do not close the browser during these operations.
                      </Typography>
                    </Alert>
                  </SettingsCard>
                </Grid>
              </Grid>
            </TabPanel>
          </Box>
        </Paper>
      </Box>

      {/* Confirmation Dialog */}
      <Dialog
        open={confirmDialog.open}
        onClose={() => setConfirmDialog({ ...confirmDialog, open: false })}
        PaperProps={{
          sx: { borderRadius: 3 }
        }}
      >
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <WarningIcon color="warning" />
          {confirmDialog.title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>{confirmDialog.message}</DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setConfirmDialog({ ...confirmDialog, open: false })}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color={confirmDialog.type === 'clearLeads' ? 'error' : 'primary'}
            onClick={handleConfirmAction}
            sx={confirmDialog.type !== 'clearLeads' ? {
              backgroundColor: '#667eea',
              '&:hover': { backgroundColor: '#764ba2' }
            } : {}}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          variant="filled"
          sx={{ borderRadius: 2 }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </AdminLayout>
  );
};

export default withAuth(AdminSettingsPage);
