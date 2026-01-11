/**
 * Admin Settings Page
 * General settings, social links, and system configuration
 */

import { useState } from 'react';
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
} from '@mui/material';
import {
  Save as SaveIcon,
  Refresh as RefreshIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import AdminLayout from '@/components/admin/AdminLayout';
import { withAuth } from '@/context/AuthContext';

/**
 * Settings Section Component
 */
const SettingsSection = ({ title, description, children }) => (
  <Paper sx={{ p: 3, mb: 3, borderRadius: 3 }}>
    <Box sx={{ mb: 3 }}>
      <Typography variant="h6" sx={{ fontWeight: 600 }}>
        {title}
      </Typography>
      {description && (
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      )}
    </Box>
    {children}
  </Paper>
);

/**
 * Admin Settings Page Component
 */
const AdminSettingsPage = () => {
  const [saving, setSaving] = useState(false);

  // General settings
  const [general, setGeneral] = useState({
    siteName: 'Nambiar District 25 Phase 2',
    siteUrl: 'https://nambiardistrict25.com',
    contactEmail: 'sales@nambiardistrict25.com',
    contactPhone: '+91 702 603 4444',
    whatsappNumber: '+917026034444',
    projectAddress: 'Chandapura Dommasandra Road, Dommasandra, Bengaluru - 562125',
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
  });

  // System settings
  const [system, setSystem] = useState({
    maintenanceMode: false,
  });

  // Handle save
  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
    }, 1000);
  };

  return (
    <AdminLayout title="Settings">
      <Head>
        <title>Settings | Admin - District 25</title>
      </Head>

      <Box>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700, color: '#1a1a2e', mb: 0.5 }}>
              Settings
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Configure your site settings and preferences
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<SaveIcon />}
            onClick={handleSave}
            disabled={saving}
            sx={{ backgroundColor: '#8B9A46', '&:hover': { backgroundColor: '#6b7a36' } }}
          >
            {saving ? 'Saving...' : 'Save All Changes'}
          </Button>
        </Box>

        {/* General Settings */}
        <SettingsSection title="General Settings" description="Basic site configuration">
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Site Name"
                value={general.siteName}
                onChange={(e) => setGeneral({ ...general, siteName: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Site URL"
                value={general.siteUrl}
                onChange={(e) => setGeneral({ ...general, siteUrl: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Contact Email"
                value={general.contactEmail}
                onChange={(e) => setGeneral({ ...general, contactEmail: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Contact Phone"
                value={general.contactPhone}
                onChange={(e) => setGeneral({ ...general, contactPhone: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="WhatsApp Number"
                value={general.whatsappNumber}
                onChange={(e) => setGeneral({ ...general, whatsappNumber: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={2}
                label="Project Address"
                value={general.projectAddress}
                onChange={(e) => setGeneral({ ...general, projectAddress: e.target.value })}
              />
            </Grid>
          </Grid>
        </SettingsSection>

        {/* Social Links */}
        <SettingsSection title="Social Links" description="Social media profile URLs">
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Facebook"
                value={social.facebook}
                onChange={(e) => setSocial({ ...social, facebook: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Instagram"
                value={social.instagram}
                onChange={(e) => setSocial({ ...social, instagram: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="LinkedIn"
                value={social.linkedin}
                onChange={(e) => setSocial({ ...social, linkedin: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="YouTube"
                value={social.youtube}
                onChange={(e) => setSocial({ ...social, youtube: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Twitter/X"
                value={social.twitter}
                onChange={(e) => setSocial({ ...social, twitter: e.target.value })}
              />
            </Grid>
          </Grid>
        </SettingsSection>

        {/* Lead Settings */}
        <SettingsSection title="Lead Settings" description="Configure lead form behavior">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Notification Emails"
                value={leadSettings.notificationEmails}
                onChange={(e) => setLeadSettings({ ...leadSettings, notificationEmails: e.target.value })}
                helperText="Comma-separated email addresses for lead notifications"
              />
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ my: 1 }} />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControlLabel
                control={
                  <Switch
                    checked={leadSettings.enableSiteVisit}
                    onChange={() => setLeadSettings({ ...leadSettings, enableSiteVisit: !leadSettings.enableSiteVisit })}
                  />
                }
                label="Enable Site Visit Booking"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControlLabel
                control={
                  <Switch
                    checked={leadSettings.enablePickupDrop}
                    onChange={() => setLeadSettings({ ...leadSettings, enablePickupDrop: !leadSettings.enablePickupDrop })}
                  />
                }
                label="Enable Pickup/Drop Service"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControlLabel
                control={
                  <Switch
                    checked={leadSettings.enableMealBooking}
                    onChange={() => setLeadSettings({ ...leadSettings, enableMealBooking: !leadSettings.enableMealBooking })}
                  />
                }
                label="Enable Meal Booking"
              />
            </Grid>
          </Grid>
        </SettingsSection>

        {/* System Settings */}
        <SettingsSection title="System" description="System maintenance and cache">
          {system.maintenanceMode && (
            <Alert severity="warning" sx={{ mb: 3 }}>
              Maintenance mode is enabled. The site will show a maintenance page to visitors.
            </Alert>
          )}
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={system.maintenanceMode}
                    onChange={() => setSystem({ ...system, maintenanceMode: !system.maintenanceMode })}
                    color="warning"
                  />
                }
                label="Maintenance Mode"
              />
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button variant="outlined" startIcon={<RefreshIcon />}>
                  Clear Cache
                </Button>
                <Button variant="outlined" startIcon={<SaveIcon />}>
                  Backup Database
                </Button>
                <Button variant="outlined" color="error" startIcon={<DeleteIcon />}>
                  Clear All Leads
                </Button>
              </Box>
            </Grid>
          </Grid>
        </SettingsSection>
      </Box>
    </AdminLayout>
  );
};

export default withAuth(AdminSettingsPage);
