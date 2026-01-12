/**
 * Role-based Permissions Configuration
 * Defines access levels for different user roles
 */

// Available roles
export const USER_ROLES = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  OWNER: 'owner',
  SALES_EXECUTIVE: 'sales_executive',
};

// Role labels for display
export const ROLE_LABELS = {
  [USER_ROLES.ADMIN]: 'Admin',
  [USER_ROLES.MANAGER]: 'Manager',
  [USER_ROLES.OWNER]: 'Owner',
  [USER_ROLES.SALES_EXECUTIVE]: 'Sales Executive',
};

// Role colors for UI
export const ROLE_COLORS = {
  [USER_ROLES.ADMIN]: '#1976d2',
  [USER_ROLES.MANAGER]: '#9c27b0',
  [USER_ROLES.OWNER]: '#4caf50',
  [USER_ROLES.SALES_EXECUTIVE]: '#ff9800',
};

// Access levels
export const ACCESS_LEVELS = {
  FULL: 'full',      // Can view, create, edit, delete
  READ_ONLY: 'read', // Can only view
  NONE: 'none',      // No access
};

// Module definitions
export const MODULES = {
  DASHBOARD: 'dashboard',
  LEADS: 'leads',
  USERS: 'users',
  SEO: 'seo',
  PIXELS: 'pixels',
  SCHEMA: 'schema',
  KEYWORDS: 'keywords',
  SETTINGS: 'settings',
  AUDIT_LOG: 'audit-log',
};

// Permissions matrix
// Defines what access level each role has for each module
export const ROLE_PERMISSIONS = {
  [USER_ROLES.ADMIN]: {
    [MODULES.DASHBOARD]: ACCESS_LEVELS.FULL,
    [MODULES.LEADS]: ACCESS_LEVELS.FULL,
    [MODULES.USERS]: ACCESS_LEVELS.FULL,
    [MODULES.SEO]: ACCESS_LEVELS.FULL,
    [MODULES.PIXELS]: ACCESS_LEVELS.FULL,
    [MODULES.SCHEMA]: ACCESS_LEVELS.FULL,
    [MODULES.KEYWORDS]: ACCESS_LEVELS.FULL,
    [MODULES.SETTINGS]: ACCESS_LEVELS.FULL,
    [MODULES.AUDIT_LOG]: ACCESS_LEVELS.FULL,
  },
  [USER_ROLES.MANAGER]: {
    [MODULES.DASHBOARD]: ACCESS_LEVELS.FULL,
    [MODULES.LEADS]: ACCESS_LEVELS.FULL,
    [MODULES.USERS]: ACCESS_LEVELS.NONE,
    [MODULES.SEO]: ACCESS_LEVELS.READ_ONLY,
    [MODULES.PIXELS]: ACCESS_LEVELS.READ_ONLY,
    [MODULES.SCHEMA]: ACCESS_LEVELS.READ_ONLY,
    [MODULES.KEYWORDS]: ACCESS_LEVELS.READ_ONLY,
    [MODULES.SETTINGS]: ACCESS_LEVELS.READ_ONLY,
    [MODULES.AUDIT_LOG]: ACCESS_LEVELS.READ_ONLY,
  },
  [USER_ROLES.OWNER]: {
    [MODULES.DASHBOARD]: ACCESS_LEVELS.FULL,
    [MODULES.LEADS]: ACCESS_LEVELS.FULL,
    [MODULES.USERS]: ACCESS_LEVELS.NONE,
    [MODULES.SEO]: ACCESS_LEVELS.READ_ONLY,
    [MODULES.PIXELS]: ACCESS_LEVELS.READ_ONLY,
    [MODULES.SCHEMA]: ACCESS_LEVELS.READ_ONLY,
    [MODULES.KEYWORDS]: ACCESS_LEVELS.READ_ONLY,
    [MODULES.SETTINGS]: ACCESS_LEVELS.READ_ONLY,
    [MODULES.AUDIT_LOG]: ACCESS_LEVELS.READ_ONLY,
  },
  [USER_ROLES.SALES_EXECUTIVE]: {
    [MODULES.DASHBOARD]: ACCESS_LEVELS.FULL,
    [MODULES.LEADS]: ACCESS_LEVELS.FULL,
    [MODULES.USERS]: ACCESS_LEVELS.NONE,
    [MODULES.SEO]: ACCESS_LEVELS.READ_ONLY,
    [MODULES.PIXELS]: ACCESS_LEVELS.READ_ONLY,
    [MODULES.SCHEMA]: ACCESS_LEVELS.READ_ONLY,
    [MODULES.KEYWORDS]: ACCESS_LEVELS.READ_ONLY,
    [MODULES.SETTINGS]: ACCESS_LEVELS.READ_ONLY,
    [MODULES.AUDIT_LOG]: ACCESS_LEVELS.READ_ONLY,
  },
};

/**
 * Check if a role has access to a module
 * @param {string} role - User role
 * @param {string} module - Module name
 * @returns {string} Access level (full, read, none)
 */
export const getModuleAccess = (role, module) => {
  if (!role || !ROLE_PERMISSIONS[role]) {
    return ACCESS_LEVELS.NONE;
  }
  return ROLE_PERMISSIONS[role][module] || ACCESS_LEVELS.NONE;
};

/**
 * Check if a role can view a module
 * @param {string} role - User role
 * @param {string} module - Module name
 * @returns {boolean} True if can view
 */
export const canViewModule = (role, module) => {
  const access = getModuleAccess(role, module);
  return access === ACCESS_LEVELS.FULL || access === ACCESS_LEVELS.READ_ONLY;
};

/**
 * Check if a role can edit a module
 * @param {string} role - User role
 * @param {string} module - Module name
 * @returns {boolean} True if can edit
 */
export const canEditModule = (role, module) => {
  const access = getModuleAccess(role, module);
  return access === ACCESS_LEVELS.FULL;
};

/**
 * Check if a role is admin
 * @param {string} role - User role
 * @returns {boolean} True if admin
 */
export const isAdminRole = (role) => {
  return role === USER_ROLES.ADMIN;
};

/**
 * Get role options for dropdown
 * @returns {Array} Array of role options
 */
export const getRoleOptions = () => {
  return Object.entries(USER_ROLES).map(([key, value]) => ({
    value,
    label: ROLE_LABELS[value],
    color: ROLE_COLORS[value],
  }));
};

/**
 * Get accessible modules for a role
 * @param {string} role - User role
 * @returns {Array} Array of accessible modules
 */
export const getAccessibleModules = (role) => {
  if (!role || !ROLE_PERMISSIONS[role]) {
    return [];
  }

  return Object.entries(ROLE_PERMISSIONS[role])
    .filter(([, access]) => access !== ACCESS_LEVELS.NONE)
    .map(([module, access]) => ({ module, access }));
};

export default {
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
};
