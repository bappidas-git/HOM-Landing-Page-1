/**
 * Admin Pixels & Tracking Page
 * Manage Google Analytics, Facebook Pixel, and other tracking codes
 */

import { useState } from 'react';
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
} from '@mui/material';
import {
  Save as SaveIcon,
  Analytics as AnalyticsIcon,
  Facebook as FacebookIcon,
  Code as CodeIcon,
  CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';
import AdminLayout from '@/components/admin/AdminLayout';
import { withAuth } from '@/context/AuthContext';

/**
 * Pixel Card Component
 */
const PixelCard = ({ title, icon: Icon, enabled, onToggle, children }) => (
  <Card sx={{ borderRadius: 3, height: '100%' }}>
    <CardContent>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box sx={{ p: 1, backgroundColor: '#f5f5f7', borderRadius: 2 }}>
            <Icon sx={{ color: '#8B9A46' }} />
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {title}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {enabled && (
            <Chip
              icon={<CheckCircleIcon />}
              label="Active"
              size="small"
              color="success"
              variant="outlined"
            />
          )}
          <Switch checked={enabled} onChange={onToggle} color="primary" />
        </Box>
      </Box>
      {children}
    </CardContent>
  </Card>
);

/**
 * Admin Pixels Page Component
 */
const AdminPixelsPage = () => {
  const [saving, setSaving] = useState(false);

  // Tracking states
  const [googleAnalytics, setGoogleAnalytics] = useState({
    enabled: true,
    measurementId: 'G-XXXXXXXXXX',
    enhancedMeasurement: true,
  });

  const [googleTagManager, setGoogleTagManager] = useState({
    enabled: true,
    containerId: 'GTM-XXXXXXX',
  });

  const [facebookPixel, setFacebookPixel] = useState({
    enabled: true,
    pixelId: '1234567890',
    events: {
      pageView: true,
      lead: true,
      viewContent: true,
      contact: true,
    },
  });

  const [googleAds, setGoogleAds] = useState({
    enabled: false,
    conversionId: '',
    conversionLabel: '',
  });

  const [customScripts, setCustomScripts] = useState({
    headScripts: '',
    bodyStartScripts: '',
    bodyEndScripts: '',
  });

  // Handle save
  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
    }, 1000);
  };

  return (
    <AdminLayout title="Pixels & Tracking">
      <Head>
        <title>Pixels & Tracking | Admin - District 25</title>
      </Head>

      <Box>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700, color: '#1a1a2e', mb: 0.5 }}>
              Pixels & Tracking
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Configure analytics and conversion tracking
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<SaveIcon />}
            onClick={handleSave}
            disabled={saving}
            sx={{ backgroundColor: '#8B9A46', '&:hover': { backgroundColor: '#6b7a36' } }}
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </Box>

        <Grid container spacing={3}>
          {/* Google Analytics */}
          <Grid item xs={12} md={6}>
            <PixelCard
              title="Google Analytics 4"
              icon={AnalyticsIcon}
              enabled={googleAnalytics.enabled}
              onToggle={() => setGoogleAnalytics({ ...googleAnalytics, enabled: !googleAnalytics.enabled })}
            >
              <TextField
                fullWidth
                label="Measurement ID"
                value={googleAnalytics.measurementId}
                onChange={(e) => setGoogleAnalytics({ ...googleAnalytics, measurementId: e.target.value })}
                placeholder="G-XXXXXXXXXX"
                disabled={!googleAnalytics.enabled}
                sx={{ mb: 2 }}
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={googleAnalytics.enhancedMeasurement}
                    onChange={() => setGoogleAnalytics({ ...googleAnalytics, enhancedMeasurement: !googleAnalytics.enhancedMeasurement })}
                    disabled={!googleAnalytics.enabled}
                  />
                }
                label="Enhanced Measurement"
              />
            </PixelCard>
          </Grid>

          {/* Google Tag Manager */}
          <Grid item xs={12} md={6}>
            <PixelCard
              title="Google Tag Manager"
              icon={CodeIcon}
              enabled={googleTagManager.enabled}
              onToggle={() => setGoogleTagManager({ ...googleTagManager, enabled: !googleTagManager.enabled })}
            >
              <TextField
                fullWidth
                label="Container ID"
                value={googleTagManager.containerId}
                onChange={(e) => setGoogleTagManager({ ...googleTagManager, containerId: e.target.value })}
                placeholder="GTM-XXXXXXX"
                disabled={!googleTagManager.enabled}
              />
            </PixelCard>
          </Grid>

          {/* Facebook Pixel */}
          <Grid item xs={12} md={6}>
            <PixelCard
              title="Facebook Pixel"
              icon={FacebookIcon}
              enabled={facebookPixel.enabled}
              onToggle={() => setFacebookPixel({ ...facebookPixel, enabled: !facebookPixel.enabled })}
            >
              <TextField
                fullWidth
                label="Pixel ID"
                value={facebookPixel.pixelId}
                onChange={(e) => setFacebookPixel({ ...facebookPixel, pixelId: e.target.value })}
                disabled={!facebookPixel.enabled}
                sx={{ mb: 2 }}
              />
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                Track Events:
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {Object.entries(facebookPixel.events).map(([event, enabled]) => (
                  <Chip
                    key={event}
                    label={event}
                    variant={enabled ? 'filled' : 'outlined'}
                    color={enabled ? 'primary' : 'default'}
                    onClick={() => setFacebookPixel({
                      ...facebookPixel,
                      events: { ...facebookPixel.events, [event]: !enabled }
                    })}
                    disabled={!facebookPixel.enabled}
                    sx={{ textTransform: 'capitalize' }}
                  />
                ))}
              </Box>
            </PixelCard>
          </Grid>

          {/* Google Ads */}
          <Grid item xs={12} md={6}>
            <PixelCard
              title="Google Ads"
              icon={AnalyticsIcon}
              enabled={googleAds.enabled}
              onToggle={() => setGoogleAds({ ...googleAds, enabled: !googleAds.enabled })}
            >
              <TextField
                fullWidth
                label="Conversion ID"
                value={googleAds.conversionId}
                onChange={(e) => setGoogleAds({ ...googleAds, conversionId: e.target.value })}
                disabled={!googleAds.enabled}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Conversion Label"
                value={googleAds.conversionLabel}
                onChange={(e) => setGoogleAds({ ...googleAds, conversionLabel: e.target.value })}
                disabled={!googleAds.enabled}
              />
            </PixelCard>
          </Grid>

          {/* Custom Scripts */}
          <Grid item xs={12}>
            <Paper sx={{ p: 3, borderRadius: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                Custom Scripts
              </Typography>
              <Alert severity="warning" sx={{ mb: 3 }}>
                Be careful when adding custom scripts. Invalid code may break your website.
              </Alert>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="Head Scripts"
                    value={customScripts.headScripts}
                    onChange={(e) => setCustomScripts({ ...customScripts, headScripts: e.target.value })}
                    placeholder="<!-- Scripts to inject in <head> -->"
                    sx={{ fontFamily: 'monospace' }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="Body Start Scripts"
                    value={customScripts.bodyStartScripts}
                    onChange={(e) => setCustomScripts({ ...customScripts, bodyStartScripts: e.target.value })}
                    placeholder="<!-- Scripts to inject after <body> -->"
                    sx={{ fontFamily: 'monospace' }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="Body End Scripts"
                    value={customScripts.bodyEndScripts}
                    onChange={(e) => setCustomScripts({ ...customScripts, bodyEndScripts: e.target.value })}
                    placeholder="<!-- Scripts to inject before </body> -->"
                    sx={{ fontFamily: 'monospace' }}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </AdminLayout>
  );
};

export default withAuth(AdminPixelsPage);
