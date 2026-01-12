/**
 * Constants barrel export for Nambiar District 25
 */

// Routes
export {
  PUBLIC_ROUTES,
  ADMIN_ROUTES,
  API_ENDPOINTS,
  SECTION_IDS,
  EXTERNAL_URLS,
} from './routes';

// Navigation Items
export {
  DESKTOP_NAV_ITEMS,
  BOTTOM_NAV_ITEMS,
  MOBILE_DRAWER_NAV_ITEMS,
  FOOTER_QUICK_LINKS,
  FOOTER_LEGAL_LINKS,
} from './navigationItems';

// Admin Navigation
export {
  ADMIN_NAV_ITEMS,
  ADMIN_QUICK_ACTIONS,
  LEAD_STATUS_OPTIONS,
  LEAD_SOURCE_OPTIONS,
  LEAD_PRIORITY_OPTIONS,
  AUDIT_ACTION_TYPES,
  AUDIT_MODULE_TYPES,
  DASHBOARD_STATS_CONFIG,
  USER_ROLE_OPTIONS,
} from './adminNavigation';

// Permissions
export {
  USER_ROLES,
  ROLE_LABELS,
  ROLE_COLORS,
  ACCESS_LEVELS,
  MODULES,
  ROLE_PERMISSIONS,
  getModuleAccess,
  canViewModule,
  canEditModule,
  isAdminRole,
  getRoleOptions,
  getAccessibleModules,
} from './permissions';

// SEO Defaults
export {
  SITE_INFO,
  DEFAULT_META,
  DEFAULT_OG,
  DEFAULT_TWITTER,
  GEO_TAGS,
  STRUCTURED_DATA,
  PAGE_SEO,
  SEO_LIMITS,
} from './seoDefaults';

// Schema Templates
export {
  ORGANIZATION_SCHEMA,
  REAL_ESTATE_AGENT_SCHEMA,
  APARTMENT_SCHEMA,
  LOCAL_BUSINESS_SCHEMA,
  WEBSITE_SCHEMA,
  generateFAQSchema,
  generateBreadcrumbSchema,
  generateProductSchema,
} from './schemaTemplates';

// Project Information Constants
export const PROJECT_INFO = {
  name: 'Nambiar District 25 Phase 2',
  developer: 'Nambiar Builders',
  tagline: 'THE SOHO LIFE RETURNS',
  rera: 'PRM/KA/RERA/1251/308/PR/200825/008011',
  
  contact: {
    phone: '+91 702 603 4444',
    phoneFormatted: '702 603 4444',
    whatsapp: '+917026034444',
    email: 'sales@nambiardistrict25.com',
  },
  
  address: {
    project: 'Chandapura Dommasandra Road, Dommasandra, Bengaluru - 562125',
    office: '2nd Floor, PR Business Centre, Above Croma, Outer Ring Road, Kadubisanahalli, Marathahalli Post, Bengaluru - 560103',
  },
  
  pricing: {
    starting: '₹1.24 Cr',
    range: '₹1.24 Cr - ₹3 Cr',
  },
  
  features: {
    clubhouseSize: '7 Acres',
    clubhouseSqft: '2.5 Lakh+ sq.ft',
    openSpace: '80%',
    greenSpace: '40%',
    trees: '3500+',
    amenities: '74+',
    metroDistance: '600m',
    unitsPerFloor: '4',
    elevatorsPerTower: '4',
    happyFamilies: '750+',
  },
};

// Site Visit Time Slots
export const SITE_VISIT_TIME_SLOTS = [
  { value: '9:00 AM', label: '9:00 AM' },
  { value: '10:00 AM', label: '10:00 AM' },
  { value: '11:00 AM', label: '11:00 AM' },
  { value: '12:00 PM', label: '12:00 PM' },
  { value: '2:00 PM', label: '2:00 PM' },
  { value: '3:00 PM', label: '3:00 PM' },
  { value: '4:00 PM', label: '4:00 PM' },
  { value: '5:00 PM', label: '5:00 PM' },
];

// Meal Preference Options
export const MEAL_OPTIONS = [
  { value: 'breakfast', label: 'Breakfast' },
  { value: 'lunch', label: 'Lunch' },
  { value: 'coffee', label: 'Coffee/Snacks' },
];

// Alias for backwards compatibility
export const MEAL_PREFERENCE_OPTIONS = MEAL_OPTIONS;

// Form Sources
export const FORM_SOURCES = {
  HERO_FORM: 'hero_form',
  POPUP_FORM: 'popup_form',
  CTA_FORM: 'cta_form',
};

// Popup Trigger Types
export const POPUP_TRIGGER_TYPES = {
  BROCHURE: 'brochure',
  PRICE: 'price',
  SITE_VISIT: 'site_visit',
  EXIT_INTENT: 'exit_intent',
  TIMER: 'timer',
  DEFAULT: 'default',
};

// Popup Titles
export const POPUP_TITLES = {
  [POPUP_TRIGGER_TYPES.BROCHURE]: 'Get Brochure & Price List',
  [POPUP_TRIGGER_TYPES.PRICE]: 'Get Exclusive Pricing Details',
  [POPUP_TRIGGER_TYPES.SITE_VISIT]: 'Schedule Your Site Visit',
  [POPUP_TRIGGER_TYPES.EXIT_INTENT]: 'Wait! Get Special Offers',
  [POPUP_TRIGGER_TYPES.TIMER]: 'Register Your Interest',
  [POPUP_TRIGGER_TYPES.DEFAULT]: 'Register Your Interest',
};

// Animation Duration Constants
export const ANIMATION_DURATION = {
  fast: 0.15,
  normal: 0.3,
  slow: 0.5,
  slower: 0.8,
};

// Scroll Offset for Smooth Scrolling
export const SCROLL_OFFSET = {
  desktop: -80, // Account for fixed header
  mobile: -64,  // Account for smaller header
};

// Breakpoint Values (matching MUI)
export const BREAKPOINTS = {
  xs: 0,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536,
  mobile: 1024, // Custom breakpoint for mobile/tablet
};
