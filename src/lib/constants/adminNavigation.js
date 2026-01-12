/**
 * Admin Navigation Items for Nambiar District 25
 */

import { ADMIN_ROUTES } from './routes';

// Admin sidebar navigation items
export const ADMIN_NAV_ITEMS = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: 'Dashboard',
    href: ADMIN_ROUTES.DASHBOARD,
  },
  {
    id: 'leads',
    label: 'Leads',
    icon: 'People',
    href: ADMIN_ROUTES.LEADS,
    badge: true, // Show count badge
  },
  {
    id: 'users',
    label: 'Users',
    icon: 'AccountCog',
    href: ADMIN_ROUTES.USERS,
    adminOnly: true,
  },
  {
    id: 'seo',
    label: 'SEO Settings',
    icon: 'Search',
    href: ADMIN_ROUTES.SEO,
  },
  {
    id: 'pixels',
    label: 'Pixels & Tracking',
    icon: 'Analytics',
    href: ADMIN_ROUTES.PIXELS,
  },
  {
    id: 'schema',
    label: 'Schema Markup',
    icon: 'Code',
    href: ADMIN_ROUTES.SCHEMA,
  },
  {
    id: 'keywords',
    label: 'Keywords',
    icon: 'Key',
    href: ADMIN_ROUTES.KEYWORDS,
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: 'Settings',
    href: ADMIN_ROUTES.SETTINGS,
  },
  {
    id: 'audit-log',
    label: 'Audit Log',
    icon: 'History',
    href: ADMIN_ROUTES.AUDIT_LOG,
  },
];

// Admin quick actions
export const ADMIN_QUICK_ACTIONS = [
  {
    id: 'export-leads',
    label: 'Export Leads',
    icon: 'Download',
    action: 'exportLeads',
  },
  {
    id: 'refresh-data',
    label: 'Refresh Data',
    icon: 'Refresh',
    action: 'refreshData',
  },
  {
    id: 'view-site',
    label: 'View Site',
    icon: 'OpenInNew',
    href: '/',
    external: true,
  },
];

// Lead status options
export const LEAD_STATUS_OPTIONS = [
  { value: 'new', label: 'New', color: '#2196f3' },
  { value: 'contacted', label: 'Contacted', color: '#9c27b0' },
  { value: 'site_visit_scheduled', label: 'Site Visit Scheduled', color: '#ff9800' },
  { value: 'visited', label: 'Visited', color: '#00bcd4' },
  { value: 'negotiation', label: 'Negotiation', color: '#ffc107' },
  { value: 'converted', label: 'Converted', color: '#4caf50' },
  { value: 'lost', label: 'Lost', color: '#f44336' },
];

// Lead source options
export const LEAD_SOURCE_OPTIONS = [
  { value: 'hero_form', label: 'Hero Form' },
  { value: 'popup_form', label: 'Popup Form' },
  { value: 'cta_form', label: 'CTA Form' },
];

// Lead priority options
export const LEAD_PRIORITY_OPTIONS = [
  { value: 'low', label: 'Low', color: '#9e9e9e' },
  { value: 'medium', label: 'Medium', color: '#ff9800' },
  { value: 'high', label: 'High', color: '#f44336' },
];

// Audit log action types
export const AUDIT_ACTION_TYPES = [
  { value: 'LOGIN', label: 'Login' },
  { value: 'LOGOUT', label: 'Logout' },
  { value: 'CREATE', label: 'Create' },
  { value: 'UPDATE', label: 'Update' },
  { value: 'DELETE', label: 'Delete' },
];

// Audit log module types
export const AUDIT_MODULE_TYPES = [
  { value: 'LEAD', label: 'Lead' },
  { value: 'SEO', label: 'SEO' },
  { value: 'PIXEL', label: 'Pixel' },
  { value: 'SCHEMA', label: 'Schema' },
  { value: 'KEYWORD', label: 'Keyword' },
  { value: 'SETTINGS', label: 'Settings' },
];

// Dashboard stat card configurations
export const DASHBOARD_STATS_CONFIG = [
  {
    id: 'total-leads',
    label: 'Total Leads',
    key: 'totalLeads',
    icon: 'People',
    color: '#1a1a2e',
  },
  {
    id: 'new-leads',
    label: 'New Today',
    key: 'newLeads',
    icon: 'PersonAdd',
    color: '#2196f3',
  },
  {
    id: 'contacted',
    label: 'Contacted',
    key: 'contactedLeads',
    icon: 'Phone',
    color: '#9c27b0',
  },
  {
    id: 'site-visits',
    label: 'Site Visits',
    key: 'siteVisits',
    icon: 'CalendarMonth',
    color: '#ff9800',
  },
  {
    id: 'converted',
    label: 'Converted',
    key: 'convertedLeads',
    icon: 'CheckCircle',
    color: '#4caf50',
  },
  {
    id: 'conversion-rate',
    label: 'Conversion Rate',
    key: 'conversionRate',
    icon: 'TrendingUp',
    color: '#8B9A46',
    suffix: '%',
  },
];

// User role options
export const USER_ROLE_OPTIONS = [
  { value: 'admin', label: 'Admin', color: '#1976d2' },
  { value: 'manager', label: 'Manager', color: '#9c27b0' },
  { value: 'owner', label: 'Owner', color: '#4caf50' },
  { value: 'sales_executive', label: 'Sales Executive', color: '#ff9800' },
];

export default {
  ADMIN_NAV_ITEMS,
  ADMIN_QUICK_ACTIONS,
  LEAD_STATUS_OPTIONS,
  LEAD_SOURCE_OPTIONS,
  LEAD_PRIORITY_OPTIONS,
  AUDIT_ACTION_TYPES,
  AUDIT_MODULE_TYPES,
  DASHBOARD_STATS_CONFIG,
  USER_ROLE_OPTIONS,
};
