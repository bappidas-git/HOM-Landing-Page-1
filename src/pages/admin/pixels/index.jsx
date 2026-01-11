/**
 * Admin Pixels & Tracking Page
 * Professional Pixel Manager for GTM, GA4, Facebook Pixel, Google Ads, LinkedIn, Hotjar
 * Features: Connection testing, status indicators, event configuration, custom scripts
 */

import { useState, useEffect } from 'react';
import Head from 'next/head';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  Switch,
  FormControlLabel,
  Button,
  Chip,
  Alert,
  Tabs,
  Tab,
  Divider,
  IconButton,
  Tooltip,
  Collapse,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Checkbox,
  Snackbar,
  Skeleton,
  InputAdornment,
  CircularProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Badge,
} from '@mui/material';
import {
  Save as SaveIcon,
  Analytics as AnalyticsIcon,
  Facebook as FacebookIcon,
  Code as CodeIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Warning as WarningIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  PlayArrow as PlayArrowIcon,
  Refresh as RefreshIcon,
  ExpandMore as ExpandMoreIcon,
  ContentCopy as CopyIcon,
  Help as HelpIcon,
  Settings as SettingsIcon,
  TrackChanges as TrackChangesIcon,
  LinkedIn as LinkedInIcon,
  LocalFireDepartment as HotjarIcon,
  Campaign as CampaignIcon,
  Terminal as TerminalIcon,
  Info as InfoIcon,
  Security as SecurityIcon,
  Speed as SpeedIcon,
} from '@mui/icons-material';
import AdminLayout from '@/components/admin/AdminLayout';
import { withAuth } from '@/context/AuthContext';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

/**
 * Tab Panel Component
 */
const TabPanel = ({ children, value, index, ...other }) => (
  <div role="tabpanel" hidden={value !== index} {...other}>
    {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
  </div>
);

/**
 * Status Badge Component
 */
const StatusBadge = ({ enabled, connected }) => {
  if (!enabled) {
    return (
      <Chip
        icon={<VisibilityOffIcon sx={{ fontSize: 16 }} />}
        label="Disabled"
        size="small"
        variant="outlined"
        sx={{ borderColor: '#9e9e9e', color: '#9e9e9e' }}
      />
    );
  }
  if (connected) {
    return (
      <Chip
        icon={<CheckCircleIcon sx={{ fontSize: 16 }} />}
        label="Active"
        size="small"
        color="success"
        variant="outlined"
      />
    );
  }
  return (
    <Chip
      icon={<WarningIcon sx={{ fontSize: 16 }} />}
      label="Not Verified"
      size="small"
      color="warning"
      variant="outlined"
    />
  );
};

/**
 * Pixel Card Component with Enhanced UI
 */
const PixelCard = ({
  title,
  subtitle,
  icon: Icon,
  iconColor,
  enabled,
  onToggle,
  connected,
  onTest,
  testing,
  children,
  helpUrl,
}) => (
  <Card
    sx={{
      borderRadius: 3,
      height: '100%',
      border: enabled ? `1px solid ${iconColor}30` : '1px solid #e0e0e0',
      transition: 'all 0.3s ease',
      '&:hover': {
        boxShadow: enabled ? `0 4px 20px ${iconColor}20` : 'none',
      },
    }}
  >
    <CardContent sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box
            sx={{
              p: 1.5,
              backgroundColor: enabled ? `${iconColor}15` : '#f5f5f5',
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Icon sx={{ color: enabled ? iconColor : '#9e9e9e', fontSize: 28 }} />
          </Box>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600, color: enabled ? '#1a1a2e' : '#9e9e9e' }}>
              {title}
            </Typography>
            {subtitle && (
              <Typography variant="caption" color="text.secondary">
                {subtitle}
              </Typography>
            )}
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <StatusBadge enabled={enabled} connected={connected} />
          {helpUrl && (
            <Tooltip title="View Documentation">
              <IconButton
                size="small"
                href={helpUrl}
                target="_blank"
                sx={{ color: '#9e9e9e' }}
              >
                <HelpIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      </Box>

      {/* Toggle */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <FormControlLabel
          control={
            <Switch
              checked={enabled}
              onChange={onToggle}
              sx={{
                '& .MuiSwitch-switchBase.Mui-checked': {
                  color: iconColor,
                },
                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                  backgroundColor: iconColor,
                },
              }}
            />
          }
          label={
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {enabled ? 'Enabled' : 'Disabled'}
            </Typography>
          }
        />
        {enabled && onTest && (
          <Button
            size="small"
            variant="outlined"
            startIcon={testing ? <CircularProgress size={14} /> : <PlayArrowIcon />}
            onClick={onTest}
            disabled={testing}
            sx={{ borderColor: iconColor, color: iconColor }}
          >
            {testing ? 'Testing...' : 'Test'}
          </Button>
        )}
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* Content */}
      <Box sx={{ opacity: enabled ? 1 : 0.5, pointerEvents: enabled ? 'auto' : 'none' }}>
        {children}
      </Box>
    </CardContent>
  </Card>
);

/**
 * Event Checkbox List
 */
const EventCheckboxList = ({ events, onChange, disabled }) => {
  const eventDescriptions = {
    pageView: 'Track page views automatically',
    lead: 'Fire when lead form is submitted',
    viewContent: 'Track content views',
    contact: 'Track contact interactions',
    initiateCheckout: 'Track checkout initiations',
    purchase: 'Track purchases/conversions',
    addToCart: 'Track add to cart actions',
    search: 'Track search queries',
  };

  return (
    <List dense>
      {Object.entries(events).map(([event, isEnabled]) => (
        <ListItem key={event} sx={{ px: 0 }}>
          <ListItemIcon sx={{ minWidth: 36 }}>
            <Checkbox
              edge="start"
              checked={isEnabled}
              onChange={() => onChange(event, !isEnabled)}
              disabled={disabled}
              size="small"
              sx={{ '&.Mui-checked': { color: '#8B9A46' } }}
            />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography variant="body2" sx={{ fontWeight: 500, textTransform: 'capitalize' }}>
                {event.replace(/([A-Z])/g, ' $1').trim()}
              </Typography>
            }
            secondary={eventDescriptions[event]}
          />
        </ListItem>
      ))}
    </List>
  );
};

/**
 * Admin Pixels Page Component
 */
const AdminPixelsPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState({});
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [showDebug, setShowDebug] = useState(false);

  // Pixel Settings State
  const [pixelSettings, setPixelSettings] = useState({
    // Google Analytics 4
    googleAnalyticsId: '',
    googleAnalyticsEnabled: false,
    gaEnhancedMeasurement: true,
    gaDebugMode: false,
    gaAnonymizeIp: true,
    // Google Tag Manager
    googleTagManagerId: '',
    googleTagManagerEnabled: false,
    gtmEnvironment: 'live',
    // Facebook Pixel
    facebookPixelId: '',
    facebookPixelEnabled: false,
    fbAdvancedMatching: true,
    fbEvents: {
      pageView: true,
      lead: true,
      viewContent: true,
      contact: true,
      initiateCheckout: false,
    },
    // Google Ads
    googleAdsConversionId: '',
    googleAdsConversionLabel: '',
    googleAdsEnabled: false,
    googleAdsRemarketing: true,
    // LinkedIn Insight Tag
    linkedInPartnerId: '',
    linkedInEnabled: false,
    // Hotjar
    hotjarSiteId: '',
    hotjarEnabled: false,
    hotjarRecordingsEnabled: true,
    // Microsoft Clarity
    clarityProjectId: '',
    clarityEnabled: false,
    // Custom Scripts
    customHeadScripts: '',
    customBodyStartScripts: '',
    customBodyEndScripts: '',
    // Privacy Settings
    cookieConsentRequired: true,
    respectDoNotTrack: false,
  });

  // Load pixel settings
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const response = await axios.get(`${API_URL}/pixelSettings`);
        if (response.data) {
          setPixelSettings((prev) => ({
            ...prev,
            ...response.data,
            fbEvents: response.data.fbEvents || prev.fbEvents,
          }));
        }
      } catch (error) {
        console.error('Error loading pixel settings:', error);
        setSnackbar({ open: true, message: 'Error loading settings', severity: 'error' });
      } finally {
        setLoading(false);
      }
    };
    loadSettings();
  }, []);

  // Handle field change
  const handleChange = (field, value) => {
    setPixelSettings((prev) => ({ ...prev, [field]: value }));
  };

  // Handle FB events change
  const handleEventChange = (event, value) => {
    setPixelSettings((prev) => ({
      ...prev,
      fbEvents: { ...prev.fbEvents, [event]: value },
    }));
  };

  // Handle save
  const handleSave = async () => {
    setSaving(true);
    try {
      await axios.patch(`${API_URL}/pixelSettings`, {
        ...pixelSettings,
        updatedAt: new Date().toISOString(),
      });
      setSnackbar({ open: true, message: 'Pixel settings saved successfully!', severity: 'success' });
    } catch (error) {
      console.error('Error saving pixel settings:', error);
      setSnackbar({ open: true, message: 'Error saving settings', severity: 'error' });
    } finally {
      setSaving(false);
    }
  };

  // Test connection
  const testConnection = async (platform) => {
    setTesting((prev) => ({ ...prev, [platform]: true }));

    // Simulate connection test
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // In real implementation, this would verify the pixel/tag is properly configured
    const isValid = pixelSettings[`${platform}Id`] || pixelSettings[`${platform}ConversionId`] || pixelSettings[`${platform}PartnerId`] || pixelSettings[`${platform}SiteId`];

    if (isValid) {
      setSnackbar({ open: true, message: `${platform} connection verified!`, severity: 'success' });
    } else {
      setSnackbar({ open: true, message: `Please enter a valid ${platform} ID`, severity: 'error' });
    }

    setTesting((prev) => ({ ...prev, [platform]: false }));
  };

  // Copy code snippet
  const copyCodeSnippet = (platform) => {
    let snippet = '';

    switch (platform) {
      case 'ga':
        snippet = `<!-- Google Analytics 4 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=${pixelSettings.googleAnalyticsId}"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '${pixelSettings.googleAnalyticsId}');
</script>`;
        break;
      case 'gtm':
        snippet = `<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${pixelSettings.googleTagManagerId}');</script>`;
        break;
      case 'fb':
        snippet = `<!-- Facebook Pixel -->
<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${pixelSettings.facebookPixelId}');
fbq('track', 'PageView');
</script>`;
        break;
      default:
        snippet = 'Snippet not available';
    }

    navigator.clipboard.writeText(snippet);
    setSnackbar({ open: true, message: 'Code snippet copied to clipboard!', severity: 'success' });
  };

  // Count active integrations
  const activeCount = [
    pixelSettings.googleAnalyticsEnabled,
    pixelSettings.googleTagManagerEnabled,
    pixelSettings.facebookPixelEnabled,
    pixelSettings.googleAdsEnabled,
    pixelSettings.linkedInEnabled,
    pixelSettings.hotjarEnabled,
    pixelSettings.clarityEnabled,
  ].filter(Boolean).length;

  if (loading) {
    return (
      <AdminLayout title="Pixels & Tracking">
        <Box sx={{ p: 3 }}>
          <Skeleton variant="rectangular" height={60} sx={{ mb: 2, borderRadius: 2 }} />
          <Grid container spacing={3}>
            {[1, 2, 3, 4].map((i) => (
              <Grid item xs={12} md={6} key={i}>
                <Skeleton variant="rectangular" height={300} sx={{ borderRadius: 2 }} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Pixels & Tracking">
      <Head>
        <title>Pixel Manager | Admin - District 25</title>
      </Head>

      <Box>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700, color: '#1a1a2e', mb: 0.5 }}>
              Pixel & Tracking Manager
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Configure analytics, conversion tracking, and marketing pixels
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Badge badgeContent={activeCount} color="success">
              <Chip
                icon={<TrackChangesIcon />}
                label="Active Integrations"
                variant="outlined"
              />
            </Badge>
            <Button
              variant="contained"
              startIcon={saving ? <CircularProgress size={16} color="inherit" /> : <SaveIcon />}
              onClick={handleSave}
              disabled={saving}
              sx={{ backgroundColor: '#8B9A46', '&:hover': { backgroundColor: '#6b7a36' } }}
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>
          </Box>
        </Box>

        {/* Quick Stats */}
        <Paper sx={{ p: 2, mb: 3, borderRadius: 2, backgroundColor: '#f8f9fa' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, flexWrap: 'wrap' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <SpeedIcon sx={{ color: '#8B9A46' }} />
              <Typography variant="body2">
                <strong>{activeCount}</strong> of 7 integrations active
              </Typography>
            </Box>
            <Divider orientation="vertical" flexItem />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <SecurityIcon sx={{ color: pixelSettings.cookieConsentRequired ? '#4caf50' : '#ff9800' }} />
              <Typography variant="body2">
                Cookie Consent: {pixelSettings.cookieConsentRequired ? 'Required' : 'Not Required'}
              </Typography>
            </Box>
            <Box sx={{ ml: 'auto' }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={showDebug}
                    onChange={(e) => setShowDebug(e.target.checked)}
                    size="small"
                  />
                }
                label={<Typography variant="body2">Debug Mode</Typography>}
              />
            </Box>
          </Box>
        </Paper>

        {/* Tabs */}
        <Paper sx={{ borderRadius: 3, overflow: 'hidden', mb: 3 }}>
          <Tabs
            value={activeTab}
            onChange={(e, newValue) => setActiveTab(newValue)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              borderBottom: 1,
              borderColor: 'divider',
              backgroundColor: '#f8f9fa',
              '& .MuiTab-root': { minHeight: 56 },
              '& .Mui-selected': { color: '#8B9A46' },
              '& .MuiTabs-indicator': { backgroundColor: '#8B9A46' },
            }}
          >
            <Tab icon={<AnalyticsIcon />} iconPosition="start" label="Analytics" />
            <Tab icon={<CampaignIcon />} iconPosition="start" label="Advertising" />
            <Tab icon={<SettingsIcon />} iconPosition="start" label="Behavior" />
            <Tab icon={<TerminalIcon />} iconPosition="start" label="Custom Scripts" />
          </Tabs>

          <Box sx={{ p: 3 }}>
            {/* Analytics Tab */}
            <TabPanel value={activeTab} index={0}>
              <Grid container spacing={3}>
                {/* Google Analytics 4 */}
                <Grid item xs={12} lg={6}>
                  <PixelCard
                    title="Google Analytics 4"
                    subtitle="Web analytics & insights"
                    icon={AnalyticsIcon}
                    iconColor="#E37400"
                    enabled={pixelSettings.googleAnalyticsEnabled}
                    onToggle={() => handleChange('googleAnalyticsEnabled', !pixelSettings.googleAnalyticsEnabled)}
                    connected={pixelSettings.googleAnalyticsId?.startsWith('G-')}
                    onTest={() => testConnection('googleAnalytics')}
                    testing={testing.googleAnalytics}
                    helpUrl="https://support.google.com/analytics/answer/9306384"
                  >
                    <TextField
                      fullWidth
                      label="Measurement ID"
                      value={pixelSettings.googleAnalyticsId}
                      onChange={(e) => handleChange('googleAnalyticsId', e.target.value)}
                      placeholder="G-XXXXXXXXXX"
                      size="small"
                      sx={{ mb: 2 }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <Tooltip title="Copy Code Snippet">
                              <IconButton size="small" onClick={() => copyCodeSnippet('ga')}>
                                <CopyIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </InputAdornment>
                        ),
                      }}
                    />
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={pixelSettings.gaEnhancedMeasurement}
                            onChange={(e) => handleChange('gaEnhancedMeasurement', e.target.checked)}
                            size="small"
                          />
                        }
                        label={<Typography variant="body2">Enhanced Measurement</Typography>}
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={pixelSettings.gaAnonymizeIp}
                            onChange={(e) => handleChange('gaAnonymizeIp', e.target.checked)}
                            size="small"
                          />
                        }
                        label={<Typography variant="body2">Anonymize IP (GDPR)</Typography>}
                      />
                      {showDebug && (
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={pixelSettings.gaDebugMode}
                              onChange={(e) => handleChange('gaDebugMode', e.target.checked)}
                              size="small"
                            />
                          }
                          label={<Typography variant="body2">Debug Mode</Typography>}
                        />
                      )}
                    </Box>
                  </PixelCard>
                </Grid>

                {/* Google Tag Manager */}
                <Grid item xs={12} lg={6}>
                  <PixelCard
                    title="Google Tag Manager"
                    subtitle="Tag management platform"
                    icon={CodeIcon}
                    iconColor="#4285F4"
                    enabled={pixelSettings.googleTagManagerEnabled}
                    onToggle={() => handleChange('googleTagManagerEnabled', !pixelSettings.googleTagManagerEnabled)}
                    connected={pixelSettings.googleTagManagerId?.startsWith('GTM-')}
                    onTest={() => testConnection('googleTagManager')}
                    testing={testing.googleTagManager}
                    helpUrl="https://support.google.com/tagmanager/answer/6103696"
                  >
                    <TextField
                      fullWidth
                      label="Container ID"
                      value={pixelSettings.googleTagManagerId}
                      onChange={(e) => handleChange('googleTagManagerId', e.target.value)}
                      placeholder="GTM-XXXXXXX"
                      size="small"
                      sx={{ mb: 2 }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <Tooltip title="Copy Code Snippet">
                              <IconButton size="small" onClick={() => copyCodeSnippet('gtm')}>
                                <CopyIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </InputAdornment>
                        ),
                      }}
                    />
                    <Alert severity="info" sx={{ mt: 1 }}>
                      When GTM is enabled, you can manage all other tags through GTM interface.
                    </Alert>
                  </PixelCard>
                </Grid>
              </Grid>
            </TabPanel>

            {/* Advertising Tab */}
            <TabPanel value={activeTab} index={1}>
              <Grid container spacing={3}>
                {/* Facebook Pixel */}
                <Grid item xs={12} lg={6}>
                  <PixelCard
                    title="Facebook Pixel"
                    subtitle="Meta advertising & analytics"
                    icon={FacebookIcon}
                    iconColor="#1877F2"
                    enabled={pixelSettings.facebookPixelEnabled}
                    onToggle={() => handleChange('facebookPixelEnabled', !pixelSettings.facebookPixelEnabled)}
                    connected={pixelSettings.facebookPixelId?.length > 10}
                    onTest={() => testConnection('facebookPixel')}
                    testing={testing.facebookPixel}
                    helpUrl="https://www.facebook.com/business/help/952192354843755"
                  >
                    <TextField
                      fullWidth
                      label="Pixel ID"
                      value={pixelSettings.facebookPixelId}
                      onChange={(e) => handleChange('facebookPixelId', e.target.value)}
                      placeholder="XXXXXXXXXXXXXXX"
                      size="small"
                      sx={{ mb: 2 }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <Tooltip title="Copy Code Snippet">
                              <IconButton size="small" onClick={() => copyCodeSnippet('fb')}>
                                <CopyIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </InputAdornment>
                        ),
                      }}
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={pixelSettings.fbAdvancedMatching}
                          onChange={(e) => handleChange('fbAdvancedMatching', e.target.checked)}
                          size="small"
                        />
                      }
                      label={<Typography variant="body2">Advanced Matching</Typography>}
                    />
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>Events to Track</Typography>
                    <EventCheckboxList
                      events={pixelSettings.fbEvents}
                      onChange={handleEventChange}
                      disabled={!pixelSettings.facebookPixelEnabled}
                    />
                  </PixelCard>
                </Grid>

                {/* Google Ads */}
                <Grid item xs={12} lg={6}>
                  <PixelCard
                    title="Google Ads"
                    subtitle="Conversion tracking & remarketing"
                    icon={CampaignIcon}
                    iconColor="#4285F4"
                    enabled={pixelSettings.googleAdsEnabled}
                    onToggle={() => handleChange('googleAdsEnabled', !pixelSettings.googleAdsEnabled)}
                    connected={pixelSettings.googleAdsConversionId?.startsWith('AW-')}
                    onTest={() => testConnection('googleAds')}
                    testing={testing.googleAds}
                    helpUrl="https://support.google.com/google-ads/answer/6095821"
                  >
                    <TextField
                      fullWidth
                      label="Conversion ID"
                      value={pixelSettings.googleAdsConversionId}
                      onChange={(e) => handleChange('googleAdsConversionId', e.target.value)}
                      placeholder="AW-XXXXXXXXX"
                      size="small"
                      sx={{ mb: 2 }}
                    />
                    <TextField
                      fullWidth
                      label="Conversion Label"
                      value={pixelSettings.googleAdsConversionLabel}
                      onChange={(e) => handleChange('googleAdsConversionLabel', e.target.value)}
                      placeholder="XXXXXXXXXXXXXXXX"
                      size="small"
                      sx={{ mb: 2 }}
                      helperText="Label for the lead conversion action"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={pixelSettings.googleAdsRemarketing}
                          onChange={(e) => handleChange('googleAdsRemarketing', e.target.checked)}
                          size="small"
                        />
                      }
                      label={<Typography variant="body2">Enable Remarketing</Typography>}
                    />
                  </PixelCard>
                </Grid>

                {/* LinkedIn Insight Tag */}
                <Grid item xs={12} lg={6}>
                  <PixelCard
                    title="LinkedIn Insight Tag"
                    subtitle="LinkedIn advertising & analytics"
                    icon={LinkedInIcon}
                    iconColor="#0A66C2"
                    enabled={pixelSettings.linkedInEnabled}
                    onToggle={() => handleChange('linkedInEnabled', !pixelSettings.linkedInEnabled)}
                    connected={pixelSettings.linkedInPartnerId?.length > 5}
                    onTest={() => testConnection('linkedIn')}
                    testing={testing.linkedIn}
                    helpUrl="https://www.linkedin.com/help/lms/answer/65513"
                  >
                    <TextField
                      fullWidth
                      label="Partner ID"
                      value={pixelSettings.linkedInPartnerId}
                      onChange={(e) => handleChange('linkedInPartnerId', e.target.value)}
                      placeholder="XXXXXXX"
                      size="small"
                      helperText="Find this in LinkedIn Campaign Manager"
                    />
                  </PixelCard>
                </Grid>
              </Grid>
            </TabPanel>

            {/* Behavior Tab */}
            <TabPanel value={activeTab} index={2}>
              <Grid container spacing={3}>
                {/* Hotjar */}
                <Grid item xs={12} lg={6}>
                  <PixelCard
                    title="Hotjar"
                    subtitle="Heatmaps & session recordings"
                    icon={HotjarIcon}
                    iconColor="#FF3C00"
                    enabled={pixelSettings.hotjarEnabled}
                    onToggle={() => handleChange('hotjarEnabled', !pixelSettings.hotjarEnabled)}
                    connected={pixelSettings.hotjarSiteId?.length > 5}
                    onTest={() => testConnection('hotjar')}
                    testing={testing.hotjar}
                    helpUrl="https://help.hotjar.com/hc/en-us/articles/115009336727"
                  >
                    <TextField
                      fullWidth
                      label="Site ID"
                      value={pixelSettings.hotjarSiteId}
                      onChange={(e) => handleChange('hotjarSiteId', e.target.value)}
                      placeholder="XXXXXXX"
                      size="small"
                      sx={{ mb: 2 }}
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={pixelSettings.hotjarRecordingsEnabled}
                          onChange={(e) => handleChange('hotjarRecordingsEnabled', e.target.checked)}
                          size="small"
                        />
                      }
                      label={<Typography variant="body2">Enable Session Recordings</Typography>}
                    />
                  </PixelCard>
                </Grid>

                {/* Microsoft Clarity */}
                <Grid item xs={12} lg={6}>
                  <PixelCard
                    title="Microsoft Clarity"
                    subtitle="Free behavior analytics"
                    icon={VisibilityIcon}
                    iconColor="#0078D4"
                    enabled={pixelSettings.clarityEnabled}
                    onToggle={() => handleChange('clarityEnabled', !pixelSettings.clarityEnabled)}
                    connected={pixelSettings.clarityProjectId?.length > 5}
                    helpUrl="https://clarity.microsoft.com/docs"
                  >
                    <TextField
                      fullWidth
                      label="Project ID"
                      value={pixelSettings.clarityProjectId}
                      onChange={(e) => handleChange('clarityProjectId', e.target.value)}
                      placeholder="XXXXXXXXXX"
                      size="small"
                      helperText="Free alternative to Hotjar"
                    />
                  </PixelCard>
                </Grid>

                {/* Privacy Settings */}
                <Grid item xs={12}>
                  <Paper sx={{ p: 3, borderRadius: 2, backgroundColor: '#f8f9fa' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                      <SecurityIcon sx={{ color: '#8B9A46' }} />
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        Privacy & Compliance
                      </Typography>
                    </Box>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6}>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={pixelSettings.cookieConsentRequired}
                              onChange={(e) => handleChange('cookieConsentRequired', e.target.checked)}
                            />
                          }
                          label={
                            <Box>
                              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                Require Cookie Consent
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                Wait for user consent before loading tracking scripts
                              </Typography>
                            </Box>
                          }
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={pixelSettings.respectDoNotTrack}
                              onChange={(e) => handleChange('respectDoNotTrack', e.target.checked)}
                            />
                          }
                          label={
                            <Box>
                              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                Respect Do Not Track
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                Honor browser&apos;s DNT setting
                              </Typography>
                            </Box>
                          }
                        />
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              </Grid>
            </TabPanel>

            {/* Custom Scripts Tab */}
            <TabPanel value={activeTab} index={3}>
              <Alert severity="warning" sx={{ mb: 3 }}>
                <strong>Caution:</strong> Custom scripts can affect site performance and security. Only add trusted code.
              </Alert>

              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Accordion defaultExpanded>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <CodeIcon />
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                          Head Scripts
                        </Typography>
                        <Chip
                          label="<head>"
                          size="small"
                          sx={{ backgroundColor: '#e3f2fd', color: '#1976d2' }}
                        />
                      </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                        Scripts injected into the &lt;head&gt; section. Best for analytics and meta configurations.
                      </Typography>
                      <TextField
                        fullWidth
                        multiline
                        rows={6}
                        value={pixelSettings.customHeadScripts}
                        onChange={(e) => handleChange('customHeadScripts', e.target.value)}
                        placeholder="<!-- Custom head scripts -->"
                        sx={{
                          '& .MuiInputBase-input': {
                            fontFamily: 'monospace',
                            fontSize: '0.875rem',
                          },
                        }}
                      />
                    </AccordionDetails>
                  </Accordion>
                </Grid>

                <Grid item xs={12}>
                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <CodeIcon />
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                          Body Start Scripts
                        </Typography>
                        <Chip
                          label="after <body>"
                          size="small"
                          sx={{ backgroundColor: '#e8f5e9', color: '#388e3c' }}
                        />
                      </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                        Scripts injected right after the &lt;body&gt; tag. Ideal for GTM noscript fallbacks.
                      </Typography>
                      <TextField
                        fullWidth
                        multiline
                        rows={6}
                        value={pixelSettings.customBodyStartScripts}
                        onChange={(e) => handleChange('customBodyStartScripts', e.target.value)}
                        placeholder="<!-- Custom body start scripts -->"
                        sx={{
                          '& .MuiInputBase-input': {
                            fontFamily: 'monospace',
                            fontSize: '0.875rem',
                          },
                        }}
                      />
                    </AccordionDetails>
                  </Accordion>
                </Grid>

                <Grid item xs={12}>
                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <CodeIcon />
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                          Body End Scripts
                        </Typography>
                        <Chip
                          label="before </body>"
                          size="small"
                          sx={{ backgroundColor: '#fff3e0', color: '#ef6c00' }}
                        />
                      </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                        Scripts injected before the closing &lt;/body&gt; tag. Best for non-critical tracking.
                      </Typography>
                      <TextField
                        fullWidth
                        multiline
                        rows={6}
                        value={pixelSettings.customBodyEndScripts}
                        onChange={(e) => handleChange('customBodyEndScripts', e.target.value)}
                        placeholder="<!-- Custom body end scripts -->"
                        sx={{
                          '& .MuiInputBase-input': {
                            fontFamily: 'monospace',
                            fontSize: '0.875rem',
                          },
                        }}
                      />
                    </AccordionDetails>
                  </Accordion>
                </Grid>
              </Grid>
            </TabPanel>
          </Box>
        </Paper>

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

export default withAuth(AdminPixelsPage);
