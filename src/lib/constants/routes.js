/**
 * Application Routes for Nambiar District 25
 */

// Public routes
export const PUBLIC_ROUTES = {
  HOME: '/',
  THANK_YOU: '/thank-you',
  NOT_FOUND: '/404',
  SERVER_ERROR: '/500',
};

// Admin routes
export const ADMIN_ROUTES = {
  LOGIN: '/admin/login',
  DASHBOARD: '/admin/dashboard',
  LEADS: '/admin/leads',
  LEAD_DETAIL: '/admin/leads/[id]',
  USERS: '/admin/users',
  SEO: '/admin/seo',
  PIXELS: '/admin/pixels',
  SCHEMA: '/admin/schema',
  KEYWORDS: '/admin/keywords',
  SETTINGS: '/admin/settings',
  AUDIT_LOG: '/admin/audit-log',
};

// API endpoints
export const API_ENDPOINTS = {
  // Auth
  LOGIN: '/login',
  LOGOUT: '/logout',
  CURRENT_USER: '/users/1',

  // Users
  USERS: '/users',
  USER_BY_ID: (id) => `/users/${id}`,
  ROLES: '/roles',

  // Leads
  LEADS: '/leads',
  LEAD_BY_ID: (id) => `/leads/${id}`,

  // Duplicate check
  SUBMITTED_CONTACTS: '/submittedContacts',

  // SEO
  SEO_SETTINGS: '/seoSettings',

  // Pixels
  PIXEL_SETTINGS: '/pixelSettings',

  // Schema
  SCHEMA_SETTINGS: '/schemaSettings',

  // Keywords
  KEYWORDS: '/keywords',
  KEYWORD_BY_ID: (id) => `/keywords/${id}`,

  // Audit Log
  AUDIT_LOGS: '/auditLogs',

  // Dashboard
  DASHBOARD_STATS: '/dashboardStats',

  // Settings
  SETTINGS: '/settings',
};

// Section IDs for smooth scrolling
export const SECTION_IDS = {
  HOME: 'home',
  OVERVIEW: 'overview',
  HIGHLIGHTS: 'highlights',
  AMENITIES: 'amenities',
  FLOOR_PLANS: 'floor-plans',
  UNIT_PLANS: 'unit-plans',
  GALLERY: 'gallery',
  VIRTUAL_TOUR: 'virtual-tour',
  LOCATION: 'location',
  PRICING: 'pricing',
  PAYMENT_PLAN: 'payment-plan',
  DEVELOPER: 'developer',
  SPECIFICATIONS: 'specifications',
  TESTIMONIALS: 'testimonials',
  FAQ: 'faq',
  CONTACT: 'contact',
};

// External URLs
export const EXTERNAL_URLS = {
  WHATSAPP: 'https://wa.me/917026034444',
  PHONE: 'tel:+917026034444',
  EMAIL: 'mailto:sales@nambiardistrict25.com',
  GOOGLE_MAPS: 'https://maps.google.com/?q=Nambiar+District+25+Dommasandra+Bangalore',
  FACEBOOK: 'https://facebook.com/nambiarbuilders',
  INSTAGRAM: 'https://instagram.com/nambiarbuilders',
  LINKEDIN: 'https://linkedin.com/company/nambiarbuilders',
  YOUTUBE: 'https://youtube.com/nambiarbuilders',
  TWITTER: 'https://twitter.com/nambiarbuilders',
};

export default {
  PUBLIC_ROUTES,
  ADMIN_ROUTES,
  API_ENDPOINTS,
  SECTION_IDS,
  EXTERNAL_URLS,
};
