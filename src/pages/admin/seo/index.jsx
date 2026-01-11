/**
 * Admin SEO Settings Page
 * Professional SEO Manager with Meta tags, Open Graph, Twitter Cards, Geo Tags
 * Features: Live preview, SEO scoring, character limits, API integration
 */

import { useState, useEffect, useCallback } from 'react';
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
  Card,
  CardContent,
  Chip,
  Divider,
  IconButton,
  Tooltip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Collapse,
  Skeleton,
  Snackbar,
  InputAdornment,
  CircularProgress,
} from '@mui/material';
import {
  Save as SaveIcon,
  Refresh as RefreshIcon,
  Visibility as VisibilityIcon,
  Search as SearchIcon,
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  Language as LanguageIcon,
  LocationOn as LocationIcon,
  TrendingUp as TrendingUpIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  Info as InfoIcon,
  ContentCopy as CopyIcon,
  OpenInNew as OpenInNewIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Speed as SpeedIcon,
  Image as ImageIcon,
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
 * Character Counter with Visual Indicator
 */
const CharacterCounter = ({ current, optimal, max, showOptimal = true }) => {
  const percentage = (current / max) * 100;
  const isOptimal = current >= optimal * 0.8 && current <= optimal;
  const isWarning = current > optimal && current <= max;
  const isError = current > max || current < optimal * 0.5;

  const getColor = () => {
    if (current === 0) return 'text.disabled';
    if (isOptimal) return 'success.main';
    if (isWarning) return 'warning.main';
    if (isError) return 'error.main';
    return 'info.main';
  };

  const getIcon = () => {
    if (current === 0) return null;
    if (isOptimal) return <CheckCircleIcon sx={{ fontSize: 14 }} />;
    if (isWarning) return <WarningIcon sx={{ fontSize: 14 }} />;
    if (isError) return <ErrorIcon sx={{ fontSize: 14 }} />;
    return <InfoIcon sx={{ fontSize: 14 }} />;
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
      <LinearProgress
        variant="determinate"
        value={Math.min(percentage, 100)}
        sx={{
          flex: 1,
          height: 4,
          borderRadius: 2,
          backgroundColor: '#e0e0e0',
          '& .MuiLinearProgress-bar': {
            backgroundColor: getColor(),
            borderRadius: 2,
          },
        }}
      />
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, minWidth: 100 }}>
        {getIcon()}
        <Typography variant="caption" sx={{ color: getColor(), fontWeight: 500 }}>
          {current}/{max}
          {showOptimal && (
            <Typography component="span" variant="caption" color="text.secondary">
              {' '}(optimal: {optimal})
            </Typography>
          )}
        </Typography>
      </Box>
    </Box>
  );
};

/**
 * SEO Score Card Component
 */
const SEOScoreCard = ({ score, issues, suggestions }) => {
  const getScoreColor = () => {
    if (score >= 80) return '#4caf50';
    if (score >= 60) return '#ff9800';
    return '#f44336';
  };

  const getScoreLabel = () => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Needs Work';
    return 'Poor';
  };

  return (
    <Card sx={{ borderRadius: 3, background: `linear-gradient(135deg, ${getScoreColor()}15 0%, #fff 100%)`, border: `1px solid ${getScoreColor()}30` }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <CircularProgress
              variant="determinate"
              value={score}
              size={80}
              thickness={4}
              sx={{ color: getScoreColor() }}
            />
            <Box
              sx={{
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                position: 'absolute',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: 700, color: getScoreColor() }}>
                {score}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <SpeedIcon sx={{ color: getScoreColor() }} />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                SEO Score: {getScoreLabel()}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {issues.length === 0 ? (
                <Chip label="All checks passed!" size="small" color="success" variant="outlined" />
              ) : (
                issues.slice(0, 3).map((issue, index) => (
                  <Chip
                    key={index}
                    label={issue}
                    size="small"
                    color={issue.includes('Missing') ? 'error' : 'warning'}
                    variant="outlined"
                  />
                ))
              )}
              {issues.length > 3 && (
                <Chip label={`+${issues.length - 3} more`} size="small" variant="outlined" />
              )}
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

/**
 * Google Preview Component
 */
const GooglePreview = ({ title, description, url }) => (
  <Card sx={{ borderRadius: 2, border: '1px solid #e0e0e0' }}>
    <CardContent sx={{ py: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
        <SearchIcon sx={{ color: '#4285f4', fontSize: 20 }} />
        <Typography variant="subtitle2" color="text.secondary">
          Google Search Preview
        </Typography>
      </Box>
      <Box sx={{ p: 2, backgroundColor: '#fff', borderRadius: 1 }}>
        <Typography
          variant="body1"
          sx={{
            color: '#1a0dab',
            fontFamily: 'Arial, sans-serif',
            fontSize: '18px',
            lineHeight: 1.3,
            mb: 0.5,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 1,
            WebkitBoxOrient: 'vertical',
            '&:hover': { textDecoration: 'underline', cursor: 'pointer' },
          }}
        >
          {title || 'Page Title'}
        </Typography>
        <Typography
          variant="caption"
          sx={{
            color: '#006621',
            fontFamily: 'Arial, sans-serif',
            fontSize: '14px',
            display: 'block',
            mb: 0.5,
          }}
        >
          {url || 'https://example.com'}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: '#545454',
            fontFamily: 'Arial, sans-serif',
            fontSize: '13px',
            lineHeight: 1.4,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {description || 'Meta description will appear here...'}
        </Typography>
      </Box>
    </CardContent>
  </Card>
);

/**
 * Social Preview Component
 */
const SocialPreview = ({ platform, title, description, image, siteName }) => {
  const isFacebook = platform === 'facebook';

  return (
    <Card sx={{ borderRadius: 2, border: '1px solid #e0e0e0' }}>
      <CardContent sx={{ py: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          {isFacebook ? (
            <FacebookIcon sx={{ color: '#1877f2', fontSize: 20 }} />
          ) : (
            <TwitterIcon sx={{ color: '#1da1f2', fontSize: 20 }} />
          )}
          <Typography variant="subtitle2" color="text.secondary">
            {isFacebook ? 'Facebook' : 'Twitter/X'} Preview
          </Typography>
        </Box>
        <Box sx={{ border: '1px solid #e0e0e0', borderRadius: 2, overflow: 'hidden' }}>
          <Box
            sx={{
              height: 150,
              backgroundColor: '#f0f2f5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundImage: image ? `url(${image})` : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {!image && <ImageIcon sx={{ fontSize: 48, color: '#9e9e9e' }} />}
          </Box>
          <Box sx={{ p: 1.5, backgroundColor: isFacebook ? '#f0f2f5' : '#fff' }}>
            <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase' }}>
              {siteName || 'example.com'}
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: 600,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 1,
                WebkitBoxOrient: 'vertical',
              }}
            >
              {title || 'Open Graph Title'}
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
              }}
            >
              {description || 'Description will appear here...'}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

/**
 * Admin SEO Page Component
 */
const AdminSEOPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(true);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // SEO Settings State
  const [seoSettings, setSeoSettings] = useState({
    // Meta Tags
    title: '',
    description: '',
    keywords: '',
    canonicalUrl: '',
    robots: 'index, follow',
    author: '',
    language: 'en',
    // Open Graph
    ogTitle: '',
    ogDescription: '',
    ogImage: '',
    ogType: 'website',
    ogLocale: 'en_IN',
    ogSiteName: '',
    ogUrl: '',
    // Twitter Cards
    twitterCard: 'summary_large_image',
    twitterTitle: '',
    twitterDescription: '',
    twitterImage: '',
    twitterSite: '',
    twitterCreator: '',
    // Geo Tags
    geoRegion: '',
    geoPlacename: '',
    geoPosition: '',
    icbm: '',
  });

  // Load SEO settings
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const response = await axios.get(`${API_URL}/seoSettings`);
        if (response.data) {
          setSeoSettings((prev) => ({ ...prev, ...response.data }));
        }
      } catch (error) {
        console.error('Error loading SEO settings:', error);
        setSnackbar({ open: true, message: 'Error loading settings', severity: 'error' });
      } finally {
        setLoading(false);
      }
    };
    loadSettings();
  }, []);

  // Calculate SEO Score
  const calculateSEOScore = useCallback(() => {
    let score = 0;
    const issues = [];
    const suggestions = [];

    // Title check (max 20 points)
    if (seoSettings.title) {
      if (seoSettings.title.length >= 50 && seoSettings.title.length <= 60) {
        score += 20;
      } else if (seoSettings.title.length >= 40 && seoSettings.title.length <= 70) {
        score += 15;
        issues.push('Title length not optimal');
      } else {
        score += 5;
        issues.push('Title too short/long');
      }
    } else {
      issues.push('Missing title');
    }

    // Description check (max 20 points)
    if (seoSettings.description) {
      if (seoSettings.description.length >= 140 && seoSettings.description.length <= 160) {
        score += 20;
      } else if (seoSettings.description.length >= 100 && seoSettings.description.length <= 180) {
        score += 15;
        issues.push('Description length not optimal');
      } else {
        score += 5;
        issues.push('Description too short/long');
      }
    } else {
      issues.push('Missing description');
    }

    // Keywords check (max 10 points)
    if (seoSettings.keywords && seoSettings.keywords.split(',').length >= 3) {
      score += 10;
    } else if (seoSettings.keywords) {
      score += 5;
      suggestions.push('Add more keywords');
    } else {
      issues.push('Missing keywords');
    }

    // Canonical URL check (max 10 points)
    if (seoSettings.canonicalUrl) {
      score += 10;
    } else {
      suggestions.push('Add canonical URL');
    }

    // Open Graph check (max 20 points)
    if (seoSettings.ogTitle && seoSettings.ogDescription) {
      score += 15;
      if (seoSettings.ogImage) {
        score += 5;
      } else {
        suggestions.push('Add OG image');
      }
    } else {
      issues.push('Incomplete Open Graph');
    }

    // Twitter Cards check (max 10 points)
    if (seoSettings.twitterTitle && seoSettings.twitterDescription) {
      score += 8;
      if (seoSettings.twitterImage) {
        score += 2;
      }
    } else {
      suggestions.push('Setup Twitter Cards');
    }

    // Geo Tags check (max 10 points)
    if (seoSettings.geoRegion && seoSettings.geoPlacename) {
      score += 10;
    } else {
      suggestions.push('Add Geo tags for local SEO');
    }

    return { score: Math.min(score, 100), issues, suggestions };
  }, [seoSettings]);

  const { score: seoScore, issues: seoIssues, suggestions: seoSuggestions } = calculateSEOScore();

  // Handle field change
  const handleChange = (field, value) => {
    setSeoSettings((prev) => ({ ...prev, [field]: value }));
  };

  // Handle save
  const handleSave = async () => {
    setSaving(true);
    try {
      await axios.patch(`${API_URL}/seoSettings`, {
        ...seoSettings,
        updatedAt: new Date().toISOString(),
      });
      setSnackbar({ open: true, message: 'SEO settings saved successfully!', severity: 'success' });
    } catch (error) {
      console.error('Error saving SEO settings:', error);
      setSnackbar({ open: true, message: 'Error saving settings', severity: 'error' });
    } finally {
      setSaving(false);
    }
  };

  // Handle reset
  const handleReset = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/seoSettings`);
      if (response.data) {
        setSeoSettings((prev) => ({ ...prev, ...response.data }));
      }
      setSnackbar({ open: true, message: 'Settings reset to last saved', severity: 'info' });
    } catch (error) {
      console.error('Error resetting settings:', error);
    } finally {
      setLoading(false);
    }
  };

  // Copy to clipboard
  const handleCopy = (text, field) => {
    navigator.clipboard.writeText(text);
    setSnackbar({ open: true, message: `${field} copied to clipboard`, severity: 'success' });
  };

  // Auto-fill OG/Twitter from Meta
  const handleAutoFill = (target) => {
    if (target === 'og') {
      setSeoSettings((prev) => ({
        ...prev,
        ogTitle: prev.title,
        ogDescription: prev.description,
      }));
      setSnackbar({ open: true, message: 'Open Graph auto-filled from Meta tags', severity: 'success' });
    } else if (target === 'twitter') {
      setSeoSettings((prev) => ({
        ...prev,
        twitterTitle: prev.ogTitle || prev.title,
        twitterDescription: prev.ogDescription || prev.description,
        twitterImage: prev.ogImage,
      }));
      setSnackbar({ open: true, message: 'Twitter Cards auto-filled from Open Graph', severity: 'success' });
    }
  };

  if (loading) {
    return (
      <AdminLayout title="SEO Settings">
        <Box sx={{ p: 3 }}>
          <Skeleton variant="rectangular" height={60} sx={{ mb: 2, borderRadius: 2 }} />
          <Skeleton variant="rectangular" height={400} sx={{ borderRadius: 2 }} />
        </Box>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="SEO Settings">
      <Head>
        <title>SEO Manager | Admin - District 25</title>
      </Head>

      <Box>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700, color: '#1a1a2e', mb: 0.5 }}>
              SEO Manager
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Optimize your site for search engines and social media sharing
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Tooltip title="Toggle Preview">
              <Button
                variant={showPreview ? 'contained' : 'outlined'}
                startIcon={<VisibilityIcon />}
                onClick={() => setShowPreview(!showPreview)}
                sx={showPreview ? { backgroundColor: '#1a1a2e' } : {}}
              >
                Preview
              </Button>
            </Tooltip>
            <Button variant="outlined" startIcon={<RefreshIcon />} onClick={handleReset}>
              Reset
            </Button>
            <Button
              variant="contained"
              startIcon={saving ? <CircularProgress size={16} color="inherit" /> : <SaveIcon />}
              onClick={handleSave}
              disabled={saving}
              sx={{ backgroundColor: '#667eea', '&:hover': { backgroundColor: '#764ba2' } }}
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>
          </Box>
        </Box>

        {/* SEO Score Card */}
        <Box sx={{ mb: 3 }}>
          <SEOScoreCard score={seoScore} issues={seoIssues} suggestions={seoSuggestions} />
        </Box>

        <Grid container spacing={3}>
          {/* Main Content */}
          <Grid item xs={12} lg={showPreview ? 7 : 12}>
            <Paper sx={{ borderRadius: 3, overflow: 'hidden' }}>
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
                  '& .Mui-selected': { color: '#667eea' },
                  '& .MuiTabs-indicator': { backgroundColor: '#667eea' },
                }}
              >
                <Tab icon={<SearchIcon />} iconPosition="start" label="Meta Tags" />
                <Tab icon={<FacebookIcon />} iconPosition="start" label="Open Graph" />
                <Tab icon={<TwitterIcon />} iconPosition="start" label="Twitter Cards" />
                <Tab icon={<LocationIcon />} iconPosition="start" label="Geo Tags" />
              </Tabs>

              <Box sx={{ p: 3 }}>
                {/* Meta Tags Tab */}
                <TabPanel value={activeTab} index={0}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Page Title"
                        value={seoSettings.title}
                        onChange={(e) => handleChange('title', e.target.value)}
                        placeholder="Nambiar District 25 Phase 2 | Premium Apartments in Bangalore"
                        helperText="Keep it between 50-60 characters for best results"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton size="small" onClick={() => handleCopy(seoSettings.title, 'Title')}>
                                <CopyIcon fontSize="small" />
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                      <CharacterCounter current={seoSettings.title.length} optimal={55} max={60} />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        multiline
                        rows={3}
                        label="Meta Description"
                        value={seoSettings.description}
                        onChange={(e) => handleChange('description', e.target.value)}
                        placeholder="Discover luxury living at Nambiar District 25 Phase 2. Premium 2, 3 & 4 BHK apartments with 74+ amenities..."
                        helperText="Optimal length is 140-160 characters"
                      />
                      <CharacterCounter current={seoSettings.description.length} optimal={150} max={160} />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        multiline
                        rows={2}
                        label="Keywords"
                        value={seoSettings.keywords}
                        onChange={(e) => handleChange('keywords', e.target.value)}
                        placeholder="nambiar district 25, apartments bangalore, 3bhk flats, luxury apartments electronic city"
                        helperText="Comma-separated keywords (5-10 recommended)"
                      />
                      {seoSettings.keywords && (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 1 }}>
                          {seoSettings.keywords.split(',').map((kw, index) => (
                            <Chip
                              key={index}
                              label={kw.trim()}
                              size="small"
                              sx={{ backgroundColor: '#667eea15', color: '#667eea' }}
                            />
                          ))}
                        </Box>
                      )}
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Canonical URL"
                        value={seoSettings.canonicalUrl}
                        onChange={(e) => handleChange('canonicalUrl', e.target.value)}
                        placeholder="https://www.nambiardistrict25.com"
                        helperText="The preferred URL for this page"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <LanguageIcon color="action" />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth>
                        <InputLabel>Robots Directive</InputLabel>
                        <Select
                          value={seoSettings.robots}
                          label="Robots Directive"
                          onChange={(e) => handleChange('robots', e.target.value)}
                        >
                          <MenuItem value="index, follow">Index, Follow (Recommended)</MenuItem>
                          <MenuItem value="index, nofollow">Index, No Follow</MenuItem>
                          <MenuItem value="noindex, follow">No Index, Follow</MenuItem>
                          <MenuItem value="noindex, nofollow">No Index, No Follow</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Author"
                        value={seoSettings.author}
                        onChange={(e) => handleChange('author', e.target.value)}
                        placeholder="Nambiar Builders"
                      />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth>
                        <InputLabel>Language</InputLabel>
                        <Select
                          value={seoSettings.language}
                          label="Language"
                          onChange={(e) => handleChange('language', e.target.value)}
                        >
                          <MenuItem value="en">English</MenuItem>
                          <MenuItem value="en-IN">English (India)</MenuItem>
                          <MenuItem value="hi">Hindi</MenuItem>
                          <MenuItem value="kn">Kannada</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </TabPanel>

                {/* Open Graph Tab */}
                <TabPanel value={activeTab} index={1}>
                  <Alert severity="info" sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                      <span>Open Graph tags control how your content appears when shared on Facebook, LinkedIn, and other platforms.</span>
                      <Button size="small" onClick={() => handleAutoFill('og')} sx={{ ml: 2 }}>
                        Auto-fill from Meta
                      </Button>
                    </Box>
                  </Alert>

                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="OG Title"
                        value={seoSettings.ogTitle}
                        onChange={(e) => handleChange('ogTitle', e.target.value)}
                        placeholder="Nambiar District 25 Phase 2 | THE SOHO LIFE RETURNS"
                      />
                      <CharacterCounter current={seoSettings.ogTitle?.length || 0} optimal={60} max={95} />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        multiline
                        rows={2}
                        label="OG Description"
                        value={seoSettings.ogDescription}
                        onChange={(e) => handleChange('ogDescription', e.target.value)}
                        placeholder="Premium 2, 3 & 4 BHK apartments with 74+ world-class amenities. Starting ₹1.24 Cr."
                      />
                      <CharacterCounter current={seoSettings.ogDescription?.length || 0} optimal={150} max={200} />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="OG Image URL"
                        value={seoSettings.ogImage}
                        onChange={(e) => handleChange('ogImage', e.target.value)}
                        placeholder="https://example.com/og-image.jpg"
                        helperText="Recommended size: 1200x630 pixels (1.91:1 ratio)"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <ImageIcon color="action" />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} md={4}>
                      <FormControl fullWidth>
                        <InputLabel>OG Type</InputLabel>
                        <Select
                          value={seoSettings.ogType}
                          label="OG Type"
                          onChange={(e) => handleChange('ogType', e.target.value)}
                        >
                          <MenuItem value="website">Website</MenuItem>
                          <MenuItem value="article">Article</MenuItem>
                          <MenuItem value="product">Product</MenuItem>
                          <MenuItem value="place">Place</MenuItem>
                          <MenuItem value="business.business">Business</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} md={4}>
                      <FormControl fullWidth>
                        <InputLabel>OG Locale</InputLabel>
                        <Select
                          value={seoSettings.ogLocale}
                          label="OG Locale"
                          onChange={(e) => handleChange('ogLocale', e.target.value)}
                        >
                          <MenuItem value="en_IN">English (India)</MenuItem>
                          <MenuItem value="en_US">English (US)</MenuItem>
                          <MenuItem value="en_GB">English (UK)</MenuItem>
                          <MenuItem value="hi_IN">Hindi (India)</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} md={4}>
                      <TextField
                        fullWidth
                        label="OG Site Name"
                        value={seoSettings.ogSiteName}
                        onChange={(e) => handleChange('ogSiteName', e.target.value)}
                        placeholder="Nambiar District 25"
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="OG URL"
                        value={seoSettings.ogUrl}
                        onChange={(e) => handleChange('ogUrl', e.target.value)}
                        placeholder="https://www.nambiardistrict25.com"
                      />
                    </Grid>
                  </Grid>
                </TabPanel>

                {/* Twitter Cards Tab */}
                <TabPanel value={activeTab} index={2}>
                  <Alert severity="info" sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                      <span>Twitter Card tags control how your content appears when shared on Twitter/X.</span>
                      <Button size="small" onClick={() => handleAutoFill('twitter')} sx={{ ml: 2 }}>
                        Auto-fill from OG
                      </Button>
                    </Box>
                  </Alert>

                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth>
                        <InputLabel>Card Type</InputLabel>
                        <Select
                          value={seoSettings.twitterCard}
                          label="Card Type"
                          onChange={(e) => handleChange('twitterCard', e.target.value)}
                        >
                          <MenuItem value="summary">Summary</MenuItem>
                          <MenuItem value="summary_large_image">Summary with Large Image (Recommended)</MenuItem>
                          <MenuItem value="app">App</MenuItem>
                          <MenuItem value="player">Player</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Twitter Site"
                        value={seoSettings.twitterSite}
                        onChange={(e) => handleChange('twitterSite', e.target.value)}
                        placeholder="@nambiarbuilders"
                        helperText="Your brand's Twitter handle"
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Twitter Title"
                        value={seoSettings.twitterTitle}
                        onChange={(e) => handleChange('twitterTitle', e.target.value)}
                        placeholder="Nambiar District 25 Phase 2"
                      />
                      <CharacterCounter current={seoSettings.twitterTitle?.length || 0} optimal={55} max={70} />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        multiline
                        rows={2}
                        label="Twitter Description"
                        value={seoSettings.twitterDescription}
                        onChange={(e) => handleChange('twitterDescription', e.target.value)}
                        placeholder="Premium apartments with 74+ amenities. Starting ₹1.24 Cr."
                      />
                      <CharacterCounter current={seoSettings.twitterDescription?.length || 0} optimal={125} max={200} />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Twitter Image URL"
                        value={seoSettings.twitterImage}
                        onChange={(e) => handleChange('twitterImage', e.target.value)}
                        placeholder="https://example.com/twitter-image.jpg"
                        helperText="Recommended size: 1200x600 pixels (2:1 ratio) for large image cards"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <ImageIcon color="action" />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Twitter Creator"
                        value={seoSettings.twitterCreator}
                        onChange={(e) => handleChange('twitterCreator', e.target.value)}
                        placeholder="@creator_handle"
                        helperText="Content creator's Twitter handle (optional)"
                      />
                    </Grid>
                  </Grid>
                </TabPanel>

                {/* Geo Tags Tab */}
                <TabPanel value={activeTab} index={3}>
                  <Alert severity="info" sx={{ mb: 3 }}>
                    Geo tags help search engines understand your business location, improving local SEO rankings.
                  </Alert>

                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Geo Region"
                        value={seoSettings.geoRegion}
                        onChange={(e) => handleChange('geoRegion', e.target.value)}
                        placeholder="IN-KA"
                        helperText="ISO 3166-1 country code + ISO 3166-2 region code (e.g., IN-KA for Karnataka, India)"
                      />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Geo Placename"
                        value={seoSettings.geoPlacename}
                        onChange={(e) => handleChange('geoPlacename', e.target.value)}
                        placeholder="Bangalore, Karnataka"
                        helperText="City and state/region name"
                      />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Geo Position (Latitude; Longitude)"
                        value={seoSettings.geoPosition}
                        onChange={(e) => handleChange('geoPosition', e.target.value)}
                        placeholder="12.9716;77.5946"
                        helperText="Format: latitude;longitude"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <LocationIcon color="action" />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="ICBM (Latitude, Longitude)"
                        value={seoSettings.icbm}
                        onChange={(e) => handleChange('icbm', e.target.value)}
                        placeholder="12.9716, 77.5946"
                        helperText="Format: latitude, longitude (alternative format)"
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Card sx={{ backgroundColor: '#f8f9fa', borderRadius: 2 }}>
                        <CardContent>
                          <Typography variant="subtitle2" gutterBottom>
                            Quick Setup for Bangalore Location
                          </Typography>
                          <Button
                            variant="outlined"
                            size="small"
                            onClick={() => {
                              setSeoSettings((prev) => ({
                                ...prev,
                                geoRegion: 'IN-KA',
                                geoPlacename: 'Dommasandra, Bangalore, Karnataka',
                                geoPosition: '12.9052;77.7091',
                                icbm: '12.9052, 77.7091',
                              }));
                              setSnackbar({ open: true, message: 'Geo tags set for project location', severity: 'success' });
                            }}
                          >
                            Use Project Location
                          </Button>
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>
                </TabPanel>
              </Box>
            </Paper>
          </Grid>

          {/* Preview Panel */}
          {showPreview && (
            <Grid item xs={12} lg={5}>
              <Box sx={{ position: 'sticky', top: 80 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#1a1a2e' }}>
                  Live Previews
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <GooglePreview
                    title={seoSettings.title}
                    description={seoSettings.description}
                    url={seoSettings.canonicalUrl}
                  />

                  <SocialPreview
                    platform="facebook"
                    title={seoSettings.ogTitle || seoSettings.title}
                    description={seoSettings.ogDescription || seoSettings.description}
                    image={seoSettings.ogImage}
                    siteName={seoSettings.ogSiteName}
                  />

                  <SocialPreview
                    platform="twitter"
                    title={seoSettings.twitterTitle || seoSettings.ogTitle || seoSettings.title}
                    description={seoSettings.twitterDescription || seoSettings.ogDescription || seoSettings.description}
                    image={seoSettings.twitterImage || seoSettings.ogImage}
                    siteName={seoSettings.twitterSite}
                  />
                </Box>

                {/* Quick Tips */}
                <Card sx={{ mt: 2, borderRadius: 2, backgroundColor: '#667eea10', border: '1px solid #667eea30' }}>
                  <CardContent>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: '#667eea' }}>
                      SEO Tips
                    </Typography>
                    <Box component="ul" sx={{ m: 0, pl: 2, '& li': { fontSize: 13, mb: 0.5 } }}>
                      <li>Include your main keyword in the title</li>
                      <li>Meta descriptions should be compelling and include a call-to-action</li>
                      <li>Use high-quality images for social sharing</li>
                      <li>Geo tags help with local search rankings</li>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            </Grid>
          )}
        </Grid>

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

export default withAuth(AdminSEOPage);
