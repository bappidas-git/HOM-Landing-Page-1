/**
 * Admin SEO Settings Page
 * Manage meta tags, Open Graph, and Twitter Cards
 */

import { useState } from 'react';
import Head from 'next/head';
import {
  Box,
  Paper,
  Typography,
  Tabs,
  Tab,
  TextField,
  Button,
  Grid,
  Alert,
  LinearProgress,
} from '@mui/material';
import { Save as SaveIcon, Refresh as RefreshIcon } from '@mui/icons-material';
import AdminLayout from '@/components/admin/AdminLayout';
import { withAuth } from '@/context/AuthContext';

/**
 * Tab Panel Component
 */
const TabPanel = ({ children, value, index, ...other }) => (
  <div role="tabpanel" hidden={value !== index} {...other}>
    {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
  </div>
);

/**
 * Admin SEO Page Component
 */
const AdminSEOPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [saving, setSaving] = useState(false);

  // Meta tags state
  const [metaTags, setMetaTags] = useState({
    title: 'Nambiar District 25 Phase 2 | Premium 2, 3 & 4 BHK Apartments in Bangalore',
    description: 'Discover luxury living at Nambiar District 25 Phase 2. Premium 2, 3 & 4 BHK apartments with 74+ amenities, starting at ₹1.24 Cr. Book your site visit today!',
    keywords: 'nambiar district 25, apartments in bangalore, 2bhk apartments, 3bhk apartments, dommasandra apartments',
    author: 'Nambiar Builders',
    robots: 'index, follow',
  });

  // Open Graph state
  const [openGraph, setOpenGraph] = useState({
    title: 'Nambiar District 25 Phase 2 | THE SOHO LIFE RETURNS',
    description: 'Premium apartments with 74+ world-class amenities. Starting ₹1.24 Cr.',
    type: 'website',
    locale: 'en_IN',
    image: '',
  });

  // Twitter state
  const [twitter, setTwitter] = useState({
    card: 'summary_large_image',
    title: 'Nambiar District 25 Phase 2',
    description: 'Premium apartments with 74+ amenities. Starting ₹1.24 Cr.',
    site: '@nambiarbuilders',
    image: '',
  });

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  // Handle save
  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
    }, 1000);
  };

  // Character counter
  const CharCounter = ({ current, max }) => (
    <Typography
      variant="caption"
      color={current > max ? 'error' : 'text.secondary'}
      sx={{ mt: 0.5, display: 'block' }}
    >
      {current}/{max} characters
    </Typography>
  );

  return (
    <AdminLayout title="SEO Settings">
      <Head>
        <title>SEO Settings | Admin - District 25</title>
      </Head>

      <Box>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700, color: '#1a1a2e', mb: 0.5 }}>
              SEO Settings
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Manage meta tags, Open Graph, and social media settings
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button variant="outlined" startIcon={<RefreshIcon />}>
              Reset
            </Button>
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
        </Box>

        {saving && <LinearProgress sx={{ mb: 2 }} />}

        {/* Tabs */}
        <Paper sx={{ borderRadius: 3 }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            sx={{ borderBottom: 1, borderColor: 'divider', px: 2 }}
          >
            <Tab label="Meta Tags" />
            <Tab label="Open Graph" />
            <Tab label="Twitter Cards" />
          </Tabs>

          <Box sx={{ p: 3 }}>
            {/* Meta Tags Tab */}
            <TabPanel value={activeTab} index={0}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Page Title"
                    value={metaTags.title}
                    onChange={(e) => setMetaTags({ ...metaTags, title: e.target.value })}
                    helperText={<CharCounter current={metaTags.title.length} max={60} />}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    label="Meta Description"
                    value={metaTags.description}
                    onChange={(e) => setMetaTags({ ...metaTags, description: e.target.value })}
                    helperText={<CharCounter current={metaTags.description.length} max={160} />}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Keywords"
                    value={metaTags.keywords}
                    onChange={(e) => setMetaTags({ ...metaTags, keywords: e.target.value })}
                    helperText="Comma-separated keywords"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Author"
                    value={metaTags.author}
                    onChange={(e) => setMetaTags({ ...metaTags, author: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Robots"
                    value={metaTags.robots}
                    onChange={(e) => setMetaTags({ ...metaTags, robots: e.target.value })}
                    helperText="e.g., index, follow"
                  />
                </Grid>
              </Grid>
            </TabPanel>

            {/* Open Graph Tab */}
            <TabPanel value={activeTab} index={1}>
              <Alert severity="info" sx={{ mb: 3 }}>
                Open Graph tags control how your content appears when shared on Facebook and other platforms.
              </Alert>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="OG Title"
                    value={openGraph.title}
                    onChange={(e) => setOpenGraph({ ...openGraph, title: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={2}
                    label="OG Description"
                    value={openGraph.description}
                    onChange={(e) => setOpenGraph({ ...openGraph, description: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="OG Type"
                    value={openGraph.type}
                    onChange={(e) => setOpenGraph({ ...openGraph, type: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="OG Locale"
                    value={openGraph.locale}
                    onChange={(e) => setOpenGraph({ ...openGraph, locale: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="OG Image URL"
                    value={openGraph.image}
                    onChange={(e) => setOpenGraph({ ...openGraph, image: e.target.value })}
                    placeholder="https://example.com/og-image.jpg"
                  />
                </Grid>
              </Grid>
            </TabPanel>

            {/* Twitter Cards Tab */}
            <TabPanel value={activeTab} index={2}>
              <Alert severity="info" sx={{ mb: 3 }}>
                Twitter Card tags control how your content appears when shared on Twitter/X.
              </Alert>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Card Type"
                    value={twitter.card}
                    onChange={(e) => setTwitter({ ...twitter, card: e.target.value })}
                    helperText="summary, summary_large_image, etc."
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Twitter Site"
                    value={twitter.site}
                    onChange={(e) => setTwitter({ ...twitter, site: e.target.value })}
                    placeholder="@username"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Twitter Title"
                    value={twitter.title}
                    onChange={(e) => setTwitter({ ...twitter, title: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={2}
                    label="Twitter Description"
                    value={twitter.description}
                    onChange={(e) => setTwitter({ ...twitter, description: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Twitter Image URL"
                    value={twitter.image}
                    onChange={(e) => setTwitter({ ...twitter, image: e.target.value })}
                    placeholder="https://example.com/twitter-image.jpg"
                  />
                </Grid>
              </Grid>
            </TabPanel>
          </Box>
        </Paper>
      </Box>
    </AdminLayout>
  );
};

export default withAuth(AdminSEOPage);
