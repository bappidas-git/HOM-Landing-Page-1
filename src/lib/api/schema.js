/**
 * Schema API Service
 * Handles structured data / schema markup management
 */

import axiosInstance, { apiRequest } from './axiosInstance';
import { SCHEMA_ENDPOINTS } from './endpoints';

/**
 * Get current schema settings
 * @returns {Promise} API response with schema settings
 */
export const getSchemaSettings = async () => {
  return apiRequest(() => axiosInstance.get(SCHEMA_ENDPOINTS.BASE));
};

/**
 * Update schema settings
 * @param {Object} settings - Schema settings to update
 * @returns {Promise} API response
 */
export const updateSchemaSettings = async (settings) => {
  const payload = {
    ...settings,
    updatedAt: new Date().toISOString(),
  };

  return apiRequest(() => axiosInstance.patch(SCHEMA_ENDPOINTS.UPDATE, payload));
};

/**
 * Update organization schema
 * @param {Object} schema - Organization schema data
 * @returns {Promise} API response
 */
export const updateOrganizationSchema = async (schema) => {
  return updateSchemaSettings({ organizationSchema: schema });
};

/**
 * Update real estate agent schema
 * @param {Object} schema - Real estate agent schema data
 * @returns {Promise} API response
 */
export const updateRealEstateSchema = async (schema) => {
  return updateSchemaSettings({ realEstateSchema: schema });
};

/**
 * Update apartment schema
 * @param {Object} schema - Apartment schema data
 * @returns {Promise} API response
 */
export const updateApartmentSchema = async (schema) => {
  return updateSchemaSettings({ apartmentSchema: schema });
};

/**
 * Update FAQ schema
 * @param {Object} schema - FAQ schema data
 * @returns {Promise} API response
 */
export const updateFaqSchema = async (schema) => {
  return updateSchemaSettings({ faqSchema: schema });
};

/**
 * Update breadcrumb schema
 * @param {Object} schema - Breadcrumb schema data
 * @returns {Promise} API response
 */
export const updateBreadcrumbSchema = async (schema) => {
  return updateSchemaSettings({ breadcrumbSchema: schema });
};

/**
 * Update local business schema
 * @param {Object} schema - Local business schema data
 * @returns {Promise} API response
 */
export const updateLocalBusinessSchema = async (schema) => {
  return updateSchemaSettings({ localBusinessSchema: schema });
};

/**
 * Add custom schema
 * @param {Object} schema - Custom schema to add
 * @param {string} schema.name - Schema name/identifier
 * @param {Object} schema.data - Schema JSON-LD data
 * @returns {Promise} API response
 */
export const addCustomSchema = async (schema) => {
  const currentSettings = await getSchemaSettings();

  if (!currentSettings.success) {
    return currentSettings;
  }

  const customSchemas = currentSettings.data.customSchemas || [];
  customSchemas.push({
    id: Date.now(),
    name: schema.name,
    data: schema.data,
    createdAt: new Date().toISOString(),
  });

  return updateSchemaSettings({ customSchemas });
};

/**
 * Update custom schema
 * @param {number} id - Schema ID
 * @param {Object} schema - Updated schema data
 * @returns {Promise} API response
 */
export const updateCustomSchema = async (id, schema) => {
  const currentSettings = await getSchemaSettings();

  if (!currentSettings.success) {
    return currentSettings;
  }

  const customSchemas = currentSettings.data.customSchemas || [];
  const index = customSchemas.findIndex((s) => s.id === id);

  if (index === -1) {
    return {
      success: false,
      error: 'Schema not found',
    };
  }

  customSchemas[index] = {
    ...customSchemas[index],
    ...schema,
    updatedAt: new Date().toISOString(),
  };

  return updateSchemaSettings({ customSchemas });
};

/**
 * Delete custom schema
 * @param {number} id - Schema ID to delete
 * @returns {Promise} API response
 */
export const deleteCustomSchema = async (id) => {
  const currentSettings = await getSchemaSettings();

  if (!currentSettings.success) {
    return currentSettings;
  }

  const customSchemas = (currentSettings.data.customSchemas || []).filter(
    (s) => s.id !== id
  );

  return updateSchemaSettings({ customSchemas });
};

/**
 * Validate JSON-LD schema
 * @param {Object|string} schema - Schema to validate
 * @returns {Object} Validation result
 */
export const validateSchema = (schema) => {
  const errors = [];
  const warnings = [];

  // Parse if string
  let schemaObj = schema;
  if (typeof schema === 'string') {
    try {
      schemaObj = JSON.parse(schema);
    } catch (e) {
      return {
        isValid: false,
        errors: [{ message: 'Invalid JSON format' }],
        warnings: [],
      };
    }
  }

  // Check for required @context
  if (!schemaObj['@context']) {
    errors.push({ message: 'Missing @context property' });
  } else if (schemaObj['@context'] !== 'https://schema.org') {
    warnings.push({ message: '@context should be "https://schema.org"' });
  }

  // Check for required @type
  if (!schemaObj['@type']) {
    errors.push({ message: 'Missing @type property' });
  }

  // Validate based on type
  const type = schemaObj['@type'];
  if (type) {
    const typeValidation = validateSchemaType(type, schemaObj);
    errors.push(...typeValidation.errors);
    warnings.push(...typeValidation.warnings);
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
};

/**
 * Validate schema based on type
 * @param {string} type - Schema type
 * @param {Object} schema - Schema object
 * @returns {Object} Validation result
 */
const validateSchemaType = (type, schema) => {
  const errors = [];
  const warnings = [];

  const requiredFields = {
    Organization: ['name'],
    RealEstateAgent: ['name', 'address'],
    Apartment: ['name'],
    FAQPage: ['mainEntity'],
    BreadcrumbList: ['itemListElement'],
    LocalBusiness: ['name', 'address'],
    Product: ['name'],
    WebSite: ['name', 'url'],
  };

  const required = requiredFields[type] || [];
  required.forEach((field) => {
    if (!schema[field]) {
      errors.push({ message: `Missing required field: ${field}` });
    }
  });

  // Type-specific validations
  if (type === 'FAQPage' && schema.mainEntity) {
    if (!Array.isArray(schema.mainEntity)) {
      errors.push({ message: 'mainEntity should be an array' });
    }
  }

  if (type === 'BreadcrumbList' && schema.itemListElement) {
    if (!Array.isArray(schema.itemListElement)) {
      errors.push({ message: 'itemListElement should be an array' });
    }
  }

  return { errors, warnings };
};

/**
 * Generate schema JSON-LD script tag
 * @param {Object} schema - Schema object
 * @returns {string} Script tag HTML
 */
export const generateSchemaScript = (schema) => {
  if (!schema) return '';

  const json = JSON.stringify(schema, null, 2);
  return `<script type="application/ld+json">\n${json}\n</script>`;
};

/**
 * Generate all schema scripts from settings
 * @param {Object} settings - Schema settings
 * @returns {string} Combined script tags
 */
export const generateAllSchemaScripts = (settings) => {
  const scripts = [];

  if (settings.organizationSchema) {
    scripts.push(generateSchemaScript(settings.organizationSchema));
  }
  if (settings.realEstateSchema) {
    scripts.push(generateSchemaScript(settings.realEstateSchema));
  }
  if (settings.apartmentSchema) {
    scripts.push(generateSchemaScript(settings.apartmentSchema));
  }
  if (settings.faqSchema && settings.faqSchema.mainEntity?.length > 0) {
    scripts.push(generateSchemaScript(settings.faqSchema));
  }
  if (settings.breadcrumbSchema) {
    scripts.push(generateSchemaScript(settings.breadcrumbSchema));
  }
  if (settings.localBusinessSchema) {
    scripts.push(generateSchemaScript(settings.localBusinessSchema));
  }

  // Custom schemas
  if (settings.customSchemas && settings.customSchemas.length > 0) {
    settings.customSchemas.forEach((custom) => {
      if (custom.data) {
        scripts.push(generateSchemaScript(custom.data));
      }
    });
  }

  return scripts.join('\n');
};

/**
 * Generate FAQ schema from FAQ items
 * @param {Array} faqItems - Array of FAQ items
 * @returns {Object} FAQ schema object
 */
export const generateFaqSchema = (faqItems) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
};

/**
 * Generate breadcrumb schema from path
 * @param {Array} items - Breadcrumb items
 * @param {string} baseUrl - Base URL
 * @returns {Object} Breadcrumb schema object
 */
export const generateBreadcrumbSchema = (items, baseUrl) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url ? `${baseUrl}${item.url}` : undefined,
    })),
  };
};

/**
 * Schema type templates for common use cases
 */
export const schemaTemplates = {
  organization: {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: '',
    url: '',
    logo: '',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '',
      contactType: 'sales',
    },
    sameAs: [],
  },

  realEstateAgent: {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: '',
    image: '',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '',
      addressLocality: '',
      addressRegion: '',
      postalCode: '',
      addressCountry: '',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '',
      longitude: '',
    },
    telephone: '',
    priceRange: '',
  },

  apartment: {
    '@context': 'https://schema.org',
    '@type': 'Apartment',
    name: '',
    description: '',
    numberOfRooms: '',
    floorSize: {
      '@type': 'QuantitativeValue',
      value: '',
      unitCode: 'SQF',
    },
    amenityFeature: [],
  },

  localBusiness: {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: '',
    image: '',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '',
      addressLocality: '',
      addressRegion: '',
      postalCode: '',
      addressCountry: '',
    },
    openingHours: '',
    telephone: '',
  },
};

export default {
  getSchemaSettings,
  updateSchemaSettings,
  updateOrganizationSchema,
  updateRealEstateSchema,
  updateApartmentSchema,
  updateFaqSchema,
  updateBreadcrumbSchema,
  updateLocalBusinessSchema,
  addCustomSchema,
  updateCustomSchema,
  deleteCustomSchema,
  validateSchema,
  generateSchemaScript,
  generateAllSchemaScripts,
  generateFaqSchema,
  generateBreadcrumbSchema,
  schemaTemplates,
};
