/**
 * Admin Schema Markup Page
 * Manage structured data for SEO
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
  Button,
  Tabs,
  Tab,
  Alert,
  Chip,
} from '@mui/material';
import {
  Save as SaveIcon,
  Code as CodeIcon,
  Visibility as VisibilityIcon,
  CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';
import AdminLayout from '@/components/admin/AdminLayout';
import { withAuth } from '@/context/AuthContext';

// Default schemas
const defaultSchemas = {
  organization: JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Nambiar Builders",
    "url": "https://nambiardistrict25.com",
    "logo": "https://nambiardistrict25.com/logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-7026034444",
      "contactType": "sales"
    }
  }, null, 2),
  realEstateAgent: JSON.stringify({
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": "Nambiar District 25",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Chandapura Dommasandra Road",
      "addressLocality": "Dommasandra",
      "addressRegion": "Karnataka",
      "postalCode": "562125",
      "addressCountry": "IN"
    },
    "priceRange": "₹1.24 Cr - ₹3 Cr"
  }, null, 2),
  apartment: JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Apartment",
    "name": "Nambiar District 25 Phase 2",
    "description": "Premium 2, 3 & 4 BHK apartments with 74+ amenities",
    "numberOfRooms": "2-4",
    "floorSize": {
      "@type": "QuantitativeValue",
      "value": "1245-2995",
      "unitCode": "SQF"
    }
  }, null, 2),
};

/**
 * Tab Panel Component
 */
const TabPanel = ({ children, value, index, ...other }) => (
  <div role="tabpanel" hidden={value !== index} {...other}>
    {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
  </div>
);

/**
 * Admin Schema Page Component
 */
const AdminSchemaPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [saving, setSaving] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  // Schema states
  const [schemas, setSchemas] = useState(defaultSchemas);

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  // Validate JSON
  const validateJSON = (json, key) => {
    try {
      JSON.parse(json);
      setValidationErrors({ ...validationErrors, [key]: null });
      return true;
    } catch (e) {
      setValidationErrors({ ...validationErrors, [key]: e.message });
      return false;
    }
  };

  // Handle schema change
  const handleSchemaChange = (key, value) => {
    setSchemas({ ...schemas, [key]: value });
    validateJSON(value, key);
  };

  // Handle save
  const handleSave = () => {
    let hasErrors = false;
    Object.keys(schemas).forEach((key) => {
      if (!validateJSON(schemas[key], key)) {
        hasErrors = true;
      }
    });

    if (!hasErrors) {
      setSaving(true);
      setTimeout(() => {
        setSaving(false);
      }, 1000);
    }
  };

  // Schema tabs
  const schemaTabs = [
    { key: 'organization', label: 'Organization' },
    { key: 'realEstateAgent', label: 'Real Estate Agent' },
    { key: 'apartment', label: 'Apartment' },
  ];

  return (
    <AdminLayout title="Schema Markup">
      <Head>
        <title>Schema Markup | Admin - District 25</title>
      </Head>

      <Box>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700, color: '#1a1a2e', mb: 0.5 }}>
              Schema Markup
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Manage structured data for better search engine visibility
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="outlined"
              startIcon={<VisibilityIcon />}
              href="https://search.google.com/test/rich-results"
              target="_blank"
            >
              Test Rich Results
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

        <Alert severity="info" sx={{ mb: 3 }}>
          Schema markup helps search engines understand your content better and can result in rich snippets in search results.
        </Alert>

        {/* Schema Editor */}
        <Paper sx={{ borderRadius: 3 }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            sx={{ borderBottom: 1, borderColor: 'divider', px: 2 }}
          >
            {schemaTabs.map((tab, index) => (
              <Tab
                key={tab.key}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {tab.label}
                    {!validationErrors[tab.key] && schemas[tab.key] && (
                      <CheckCircleIcon fontSize="small" color="success" />
                    )}
                  </Box>
                }
              />
            ))}
          </Tabs>

          <Box sx={{ p: 3 }}>
            {schemaTabs.map((tab, index) => (
              <TabPanel key={tab.key} value={activeTab} index={index}>
                {validationErrors[tab.key] && (
                  <Alert severity="error" sx={{ mb: 2 }}>
                    JSON Error: {validationErrors[tab.key]}
                  </Alert>
                )}
                <TextField
                  fullWidth
                  multiline
                  rows={20}
                  value={schemas[tab.key]}
                  onChange={(e) => handleSchemaChange(tab.key, e.target.value)}
                  error={!!validationErrors[tab.key]}
                  sx={{
                    '& .MuiInputBase-input': {
                      fontFamily: 'monospace',
                      fontSize: '0.875rem',
                    },
                  }}
                />
              </TabPanel>
            ))}
          </Box>
        </Paper>

        {/* Quick Actions */}
        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid item xs={12} md={4}>
            <Card sx={{ borderRadius: 3 }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <CodeIcon color="primary" />
                  <Typography variant="h6">FAQ Schema</Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Automatically generated from FAQ content
                </Typography>
                <Chip label="Auto-generated" size="small" color="success" variant="outlined" />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ borderRadius: 3 }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <CodeIcon color="primary" />
                  <Typography variant="h6">Breadcrumb Schema</Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Automatically generated from page structure
                </Typography>
                <Chip label="Auto-generated" size="small" color="success" variant="outlined" />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ borderRadius: 3 }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <CodeIcon color="primary" />
                  <Typography variant="h6">Local Business Schema</Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Derived from organization and contact info
                </Typography>
                <Chip label="Auto-generated" size="small" color="success" variant="outlined" />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </AdminLayout>
  );
};

export default withAuth(AdminSchemaPage);
