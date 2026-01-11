/**
 * Admin Schema Markup Page
 * Professional Schema Manager with visual editor, validation, and preview
 * Features: Multiple schema types, JSON validation, Rich Results preview, templates
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
  CardActions,
  TextField,
  Button,
  Tabs,
  Tab,
  Alert,
  Chip,
  Divider,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Switch,
  FormControlLabel,
  Snackbar,
  Skeleton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  CircularProgress,
  Menu,
  MenuItem,
  Collapse,
} from '@mui/material';
import {
  Save as SaveIcon,
  Code as CodeIcon,
  Visibility as VisibilityIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Warning as WarningIcon,
  ContentCopy as CopyIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  ExpandMore as ExpandMoreIcon,
  Business as BusinessIcon,
  Home as HomeIcon,
  HelpOutline as FAQIcon,
  Place as PlaceIcon,
  List as ListIcon,
  OpenInNew as OpenInNewIcon,
  Refresh as RefreshIcon,
  Download as DownloadIcon,
  Upload as UploadIcon,
  FormatAlignLeft as FormatIcon,
  PlayArrow as TestIcon,
  Apartment as ApartmentIcon,
  QuestionAnswer as QuestionIcon,
  Navigation as BreadcrumbIcon,
  Store as StoreIcon,
} from '@mui/icons-material';
import AdminLayout from '@/components/admin/AdminLayout';
import { withAuth } from '@/context/AuthContext';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

// Schema type configurations
const schemaTypes = [
  {
    key: 'organization',
    label: 'Organization',
    icon: BusinessIcon,
    color: '#4285F4',
    description: 'Define your business identity',
    required: true,
  },
  {
    key: 'realEstate',
    label: 'Real Estate Agent',
    icon: HomeIcon,
    color: '#667eea',
    description: 'Real estate business listing',
    required: true,
  },
  {
    key: 'apartment',
    label: 'Apartment/Property',
    icon: ApartmentIcon,
    color: '#E37400',
    description: 'Property details and features',
    required: true,
  },
  {
    key: 'localBusiness',
    label: 'Local Business',
    icon: StoreIcon,
    color: '#9C27B0',
    description: 'Sales office information',
    required: false,
  },
  {
    key: 'faq',
    label: 'FAQ Page',
    icon: QuestionIcon,
    color: '#00BCD4',
    description: 'Frequently asked questions',
    required: false,
  },
  {
    key: 'breadcrumb',
    label: 'Breadcrumb',
    icon: BreadcrumbIcon,
    color: '#607D8B',
    description: 'Navigation breadcrumbs',
    required: false,
  },
];

// Default schema templates
const schemaTemplates = {
  organization: {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Nambiar Builders',
    url: 'https://www.nambiarbuilders.com',
    logo: 'https://www.nambiarbuilders.com/logo.png',
    description: 'Premium real estate developer in Bangalore',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91-7026034444',
      contactType: 'sales',
      areaServed: 'IN',
      availableLanguage: ['English', 'Hindi', 'Kannada'],
    },
    sameAs: [
      'https://www.facebook.com/nambiarbuilders',
      'https://www.instagram.com/nambiarbuilders',
      'https://www.linkedin.com/company/nambiarbuilders',
    ],
  },
  realEstate: {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: 'Nambiar District 25',
    image: 'https://www.nambiardistrict25.com/og-image.jpg',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Chandapura Dommasandra Road',
      addressLocality: 'Dommasandra',
      addressRegion: 'Karnataka',
      postalCode: '562125',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 12.9052,
      longitude: 77.7091,
    },
    telephone: '+91-7026034444',
    priceRange: '₹1.24 Cr - ₹3.5 Cr',
    openingHours: 'Mo-Su 09:00-21:00',
  },
  apartment: {
    '@context': 'https://schema.org',
    '@type': 'Apartment',
    name: 'Nambiar District 25 Phase 2',
    description: 'Premium 2, 3 & 4 BHK luxury apartments with 74+ world-class amenities in Bangalore',
    numberOfRooms: '2-4',
    floorSize: {
      '@type': 'QuantitativeValue',
      value: '1245-2995',
      unitCode: 'SQF',
    },
    amenityFeature: [
      { '@type': 'LocationFeatureSpecification', name: 'Swimming Pool' },
      { '@type': 'LocationFeatureSpecification', name: 'Gymnasium' },
      { '@type': 'LocationFeatureSpecification', name: '7 Acre Clubhouse' },
      { '@type': 'LocationFeatureSpecification', name: 'Jogging Track' },
      { '@type': 'LocationFeatureSpecification', name: 'Tennis Court' },
      { '@type': 'LocationFeatureSpecification', name: 'Basketball Court' },
    ],
    petsAllowed: true,
  },
  localBusiness: {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Nambiar District 25 Sales Office',
    image: 'https://www.nambiardistrict25.com/sales-office.jpg',
    '@id': 'https://www.nambiardistrict25.com/#sales-office',
    url: 'https://www.nambiardistrict25.com',
    telephone: '+91-7026034444',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Chandapura Dommasandra Road',
      addressLocality: 'Dommasandra',
      addressRegion: 'Karnataka',
      postalCode: '562125',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 12.9052,
      longitude: 77.7091,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '09:00',
        closes: '21:00',
      },
    ],
  },
  faq: {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the RERA number for District 25 Phase 2?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The RERA number is PRM/KA/RERA/1251/308/PR/200825/008011',
        },
      },
      {
        '@type': 'Question',
        name: 'What are the available unit configurations?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We offer 2 BHK, 3 BHK (multiple variants), and 4 BHK apartments ranging from 1,245 to 2,995 sq.ft.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the starting price?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Starting from ₹1.24 Cr onwards for 2 BHK apartments.',
        },
      },
    ],
  },
  breadcrumb: {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.nambiardistrict25.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Apartments',
        item: 'https://www.nambiardistrict25.com/#floor-plans',
      },
    ],
  },
};

/**
 * Schema Editor Card Component
 */
const SchemaCard = ({
  schemaType,
  schema,
  enabled,
  onToggle,
  onEdit,
  isValid,
  onValidate,
}) => {
  const config = schemaTypes.find((t) => t.key === schemaType);
  const Icon = config?.icon || CodeIcon;

  return (
    <Card
      sx={{
        borderRadius: 3,
        border: enabled ? `1px solid ${config?.color}30` : '1px solid #e0e0e0',
        opacity: enabled ? 1 : 0.7,
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: enabled ? `0 4px 20px ${config?.color}15` : 'none',
        },
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2 }}>
          <Box
            sx={{
              p: 1.5,
              backgroundColor: enabled ? `${config?.color}15` : '#f5f5f5',
              borderRadius: 2,
            }}
          >
            <Icon sx={{ color: enabled ? config?.color : '#9e9e9e', fontSize: 28 }} />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {config?.label}
              </Typography>
              {config?.required && (
                <Chip label="Required" size="small" color="primary" variant="outlined" sx={{ height: 20 }} />
              )}
            </Box>
            <Typography variant="body2" color="text.secondary">
              {config?.description}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {enabled && (
              <Chip
                icon={isValid ? <CheckCircleIcon /> : <WarningIcon />}
                label={isValid ? 'Valid' : 'Has Errors'}
                size="small"
                color={isValid ? 'success' : 'warning'}
                variant="outlined"
              />
            )}
            <Switch
              checked={enabled}
              onChange={onToggle}
              sx={{
                '& .MuiSwitch-switchBase.Mui-checked': { color: config?.color },
                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: config?.color },
              }}
            />
          </Box>
        </Box>

        {enabled && (
          <>
            <Divider sx={{ my: 2 }} />
            <Box
              sx={{
                backgroundColor: '#1a1a2e',
                borderRadius: 2,
                p: 2,
                maxHeight: 200,
                overflow: 'auto',
                fontFamily: 'monospace',
                fontSize: 12,
                color: '#a0a0a0',
              }}
            >
              <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
                {JSON.stringify(schema, null, 2).substring(0, 500)}
                {JSON.stringify(schema, null, 2).length > 500 && '...'}
              </pre>
            </Box>
          </>
        )}
      </CardContent>

      {enabled && (
        <CardActions sx={{ px: 2, pb: 2, pt: 0 }}>
          <Button size="small" startIcon={<EditIcon />} onClick={onEdit}>
            Edit Schema
          </Button>
          <Button size="small" startIcon={<TestIcon />} onClick={onValidate}>
            Validate
          </Button>
        </CardActions>
      )}
    </Card>
  );
};

/**
 * Schema Editor Dialog
 */
const SchemaEditorDialog = ({ open, onClose, schemaType, schema, onSave }) => {
  const [editedSchema, setEditedSchema] = useState('');
  const [error, setError] = useState(null);
  const [isValid, setIsValid] = useState(true);

  const config = schemaTypes.find((t) => t.key === schemaType);

  useEffect(() => {
    if (open && schema) {
      setEditedSchema(JSON.stringify(schema, null, 2));
      setError(null);
      setIsValid(true);
    }
  }, [open, schema]);

  const validateJSON = (json) => {
    try {
      JSON.parse(json);
      setError(null);
      setIsValid(true);
      return true;
    } catch (e) {
      setError(e.message);
      setIsValid(false);
      return false;
    }
  };

  const handleChange = (value) => {
    setEditedSchema(value);
    validateJSON(value);
  };

  const handleFormat = () => {
    try {
      const parsed = JSON.parse(editedSchema);
      setEditedSchema(JSON.stringify(parsed, null, 2));
      setError(null);
      setIsValid(true);
    } catch (e) {
      setError(e.message);
    }
  };

  const handleReset = () => {
    const template = schemaTemplates[schemaType];
    if (template) {
      setEditedSchema(JSON.stringify(template, null, 2));
      setError(null);
      setIsValid(true);
    }
  };

  const handleSave = () => {
    if (validateJSON(editedSchema)) {
      onSave(JSON.parse(editedSchema));
      onClose();
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(editedSchema);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box
          sx={{
            p: 1,
            backgroundColor: `${config?.color}15`,
            borderRadius: 1,
          }}
        >
          {config?.icon && <config.icon sx={{ color: config?.color }} />}
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h6">Edit {config?.label} Schema</Typography>
          <Typography variant="caption" color="text.secondary">
            JSON-LD structured data
          </Typography>
        </Box>
        <Chip
          icon={isValid ? <CheckCircleIcon /> : <ErrorIcon />}
          label={isValid ? 'Valid JSON' : 'Invalid JSON'}
          size="small"
          color={isValid ? 'success' : 'error'}
          variant="outlined"
        />
      </DialogTitle>

      <DialogContent dividers>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            JSON Error: {error}
          </Alert>
        )}

        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
          <Button size="small" startIcon={<FormatIcon />} onClick={handleFormat} variant="outlined">
            Format
          </Button>
          <Button size="small" startIcon={<RefreshIcon />} onClick={handleReset} variant="outlined">
            Reset to Template
          </Button>
          <Button size="small" startIcon={<CopyIcon />} onClick={handleCopy} variant="outlined">
            Copy
          </Button>
          <Box sx={{ flex: 1 }} />
          <Button
            size="small"
            startIcon={<OpenInNewIcon />}
            href="https://search.google.com/test/rich-results"
            target="_blank"
            variant="outlined"
          >
            Test Rich Results
          </Button>
        </Box>

        <TextField
          fullWidth
          multiline
          rows={20}
          value={editedSchema}
          onChange={(e) => handleChange(e.target.value)}
          error={!isValid}
          sx={{
            '& .MuiInputBase-input': {
              fontFamily: 'monospace',
              fontSize: '0.875rem',
              lineHeight: 1.6,
            },
            '& .MuiOutlinedInput-root': {
              backgroundColor: '#fafafa',
            },
          }}
        />
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant="contained"
          onClick={handleSave}
          disabled={!isValid}
          sx={{ backgroundColor: '#667eea', '&:hover': { backgroundColor: '#764ba2' } }}
        >
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

/**
 * Admin Schema Page Component
 */
const AdminSchemaPage = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // Schema states
  const [schemas, setSchemas] = useState({
    organization: { enabled: true, data: schemaTemplates.organization, isValid: true },
    realEstate: { enabled: true, data: schemaTemplates.realEstate, isValid: true },
    apartment: { enabled: true, data: schemaTemplates.apartment, isValid: true },
    localBusiness: { enabled: false, data: schemaTemplates.localBusiness, isValid: true },
    faq: { enabled: true, data: schemaTemplates.faq, isValid: true },
    breadcrumb: { enabled: true, data: schemaTemplates.breadcrumb, isValid: true },
  });

  // Editor dialog state
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingSchemaType, setEditingSchemaType] = useState(null);

  // Load schemas from API
  useEffect(() => {
    const loadSchemas = async () => {
      try {
        const response = await axios.get(`${API_URL}/schemaSettings`);
        if (response.data) {
          const data = response.data;
          setSchemas({
            organization: {
              enabled: true,
              data: data.organizationSchema || schemaTemplates.organization,
              isValid: true,
            },
            realEstate: {
              enabled: true,
              data: data.realEstateSchema || schemaTemplates.realEstate,
              isValid: true,
            },
            apartment: {
              enabled: true,
              data: data.apartmentSchema || schemaTemplates.apartment,
              isValid: true,
            },
            localBusiness: {
              enabled: !!data.localBusinessSchema,
              data: data.localBusinessSchema || schemaTemplates.localBusiness,
              isValid: true,
            },
            faq: {
              enabled: !!data.faqSchema?.mainEntity?.length,
              data: data.faqSchema || schemaTemplates.faq,
              isValid: true,
            },
            breadcrumb: {
              enabled: !!data.breadcrumbSchema?.itemListElement?.length,
              data: data.breadcrumbSchema || schemaTemplates.breadcrumb,
              isValid: true,
            },
          });
        }
      } catch (error) {
        console.error('Error loading schemas:', error);
        setSnackbar({ open: true, message: 'Error loading schemas', severity: 'error' });
      } finally {
        setLoading(false);
      }
    };
    loadSchemas();
  }, []);

  // Toggle schema
  const handleToggle = (schemaType) => {
    setSchemas((prev) => ({
      ...prev,
      [schemaType]: { ...prev[schemaType], enabled: !prev[schemaType].enabled },
    }));
  };

  // Open editor
  const handleEdit = (schemaType) => {
    setEditingSchemaType(schemaType);
    setEditorOpen(true);
  };

  // Save edited schema
  const handleSaveSchema = (data) => {
    setSchemas((prev) => ({
      ...prev,
      [editingSchemaType]: { ...prev[editingSchemaType], data, isValid: true },
    }));
    setSnackbar({ open: true, message: 'Schema updated', severity: 'success' });
  };

  // Validate schema
  const handleValidate = (schemaType) => {
    try {
      JSON.stringify(schemas[schemaType].data);
      setSchemas((prev) => ({
        ...prev,
        [schemaType]: { ...prev[schemaType], isValid: true },
      }));
      setSnackbar({ open: true, message: 'Schema is valid!', severity: 'success' });
    } catch (e) {
      setSchemas((prev) => ({
        ...prev,
        [schemaType]: { ...prev[schemaType], isValid: false },
      }));
      setSnackbar({ open: true, message: 'Schema validation failed', severity: 'error' });
    }
  };

  // Save all schemas
  const handleSaveAll = async () => {
    setSaving(true);
    try {
      await axios.patch(`${API_URL}/schemaSettings`, {
        organizationSchema: schemas.organization.enabled ? schemas.organization.data : null,
        realEstateSchema: schemas.realEstate.enabled ? schemas.realEstate.data : null,
        apartmentSchema: schemas.apartment.enabled ? schemas.apartment.data : null,
        localBusinessSchema: schemas.localBusiness.enabled ? schemas.localBusiness.data : null,
        faqSchema: schemas.faq.enabled ? schemas.faq.data : null,
        breadcrumbSchema: schemas.breadcrumb.enabled ? schemas.breadcrumb.data : null,
        updatedAt: new Date().toISOString(),
      });
      setSnackbar({ open: true, message: 'All schemas saved successfully!', severity: 'success' });
    } catch (error) {
      console.error('Error saving schemas:', error);
      setSnackbar({ open: true, message: 'Error saving schemas', severity: 'error' });
    } finally {
      setSaving(false);
    }
  };

  // Export all schemas
  const handleExport = () => {
    const exportData = {};
    Object.keys(schemas).forEach((key) => {
      if (schemas[key].enabled) {
        exportData[key] = schemas[key].data;
      }
    });

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'schema-markup.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  // Get combined schema for preview
  const combinedSchema = useMemo(() => {
    const enabled = Object.keys(schemas)
      .filter((key) => schemas[key].enabled)
      .map((key) => schemas[key].data);
    return enabled;
  }, [schemas]);

  // Count enabled schemas
  const enabledCount = Object.values(schemas).filter((s) => s.enabled).length;

  if (loading) {
    return (
      <AdminLayout title="Schema Markup">
        <Box sx={{ p: 3 }}>
          <Skeleton variant="rectangular" height={60} sx={{ mb: 2, borderRadius: 2 }} />
          <Grid container spacing={3}>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Grid item xs={12} md={6} key={i}>
                <Skeleton variant="rectangular" height={200} sx={{ borderRadius: 2 }} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Schema Markup">
      <Head>
        <title>Schema Manager | Admin - District 25</title>
      </Head>

      <Box>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700, color: '#1a1a2e', mb: 0.5 }}>
              Schema Manager
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Manage structured data markup for rich search results
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Chip
              icon={<CodeIcon />}
              label={`${enabledCount} Schemas Active`}
              color="primary"
              variant="outlined"
            />
            <Button variant="outlined" startIcon={<DownloadIcon />} onClick={handleExport}>
              Export
            </Button>
            <Button
              variant="outlined"
              startIcon={<OpenInNewIcon />}
              href="https://search.google.com/test/rich-results"
              target="_blank"
            >
              Test Tool
            </Button>
            <Button
              variant="contained"
              startIcon={saving ? <CircularProgress size={16} color="inherit" /> : <SaveIcon />}
              onClick={handleSaveAll}
              disabled={saving}
              sx={{ backgroundColor: '#667eea', '&:hover': { backgroundColor: '#764ba2' } }}
            >
              {saving ? 'Saving...' : 'Save All'}
            </Button>
          </Box>
        </Box>

        {/* Info Alert */}
        <Alert severity="info" sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="body2">
              Schema markup helps search engines understand your content and can result in rich snippets in search results.
              <strong> Test your schemas using Google&apos;s Rich Results Test tool.</strong>
            </Typography>
          </Box>
        </Alert>

        {/* Schema Cards Grid */}
        <Grid container spacing={3}>
          {schemaTypes.map((type) => (
            <Grid item xs={12} md={6} key={type.key}>
              <SchemaCard
                schemaType={type.key}
                schema={schemas[type.key]?.data}
                enabled={schemas[type.key]?.enabled}
                isValid={schemas[type.key]?.isValid}
                onToggle={() => handleToggle(type.key)}
                onEdit={() => handleEdit(type.key)}
                onValidate={() => handleValidate(type.key)}
              />
            </Grid>
          ))}
        </Grid>

        {/* Combined Preview */}
        <Paper sx={{ mt: 4, borderRadius: 3, overflow: 'hidden' }}>
          <Box
            sx={{
              px: 3,
              py: 2,
              backgroundColor: '#f8f9fa',
              borderBottom: '1px solid #e0e0e0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <CodeIcon sx={{ color: '#667eea' }} />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Combined Schema Output
              </Typography>
            </Box>
            <Button
              size="small"
              startIcon={<CopyIcon />}
              onClick={() => {
                navigator.clipboard.writeText(JSON.stringify(combinedSchema, null, 2));
                setSnackbar({ open: true, message: 'Schema copied to clipboard!', severity: 'success' });
              }}
            >
              Copy All
            </Button>
          </Box>
          <Box
            sx={{
              p: 3,
              backgroundColor: '#1a1a2e',
              maxHeight: 400,
              overflow: 'auto',
            }}
          >
            <pre
              style={{
                margin: 0,
                fontFamily: 'monospace',
                fontSize: 13,
                color: '#a0e0a0',
                whiteSpace: 'pre-wrap',
              }}
            >
              {JSON.stringify(combinedSchema, null, 2)}
            </pre>
          </Box>
        </Paper>

        {/* Quick Reference */}
        <Paper sx={{ mt: 3, p: 3, borderRadius: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
            Quick Reference
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Card sx={{ backgroundColor: '#e8f5e9', borderRadius: 2 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <CheckCircleIcon sx={{ color: '#4caf50' }} />
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                      Required Schemas
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    Organization, Real Estate Agent, and Apartment schemas are essential for local business SEO.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ backgroundColor: '#e3f2fd', borderRadius: 2 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <QuestionIcon sx={{ color: '#1976d2' }} />
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                      FAQ Schema
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    FAQ schema can help your FAQs appear directly in search results with expandable answers.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ backgroundColor: '#fff3e0', borderRadius: 2 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <BreadcrumbIcon sx={{ color: '#ef6c00' }} />
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                      Breadcrumb Schema
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    Helps search engines understand your site structure and improves navigation in search results.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Paper>

        {/* Editor Dialog */}
        <SchemaEditorDialog
          open={editorOpen}
          onClose={() => setEditorOpen(false)}
          schemaType={editingSchemaType}
          schema={editingSchemaType ? schemas[editingSchemaType]?.data : null}
          onSave={handleSaveSchema}
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

export default withAuth(AdminSchemaPage);
