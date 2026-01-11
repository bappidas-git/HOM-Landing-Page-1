/**
 * Color palette for Nambiar District 25
 * Based on brand guidelines and design requirements
 */

export const colors = {
  // Primary colors - Dark navy theme
  primary: {
    main: '#1a1a2e',
    light: '#2d2d4a',
    dark: '#0f0f1a',
    contrastText: '#ffffff',
  },

  // Secondary colors - Olive green (Nambiar brand color)
  secondary: {
    main: '#8B9A46',
    light: '#a3b15e',
    dark: '#6b7a36',
    contrastText: '#ffffff',
  },

  // Accent colors for highlights and CTAs
  accent: {
    gold: '#c9a227',
    copper: '#b87333',
    teal: '#008080',
    coral: '#ff6b6b',
  },

  // Background colors
  background: {
    default: '#ffffff',
    paper: '#f8f9fa',
    dark: '#1a1a2e',
    gradient: 'linear-gradient(135deg, #1a1a2e 0%, #2d2d4a 100%)',
    overlay: 'rgba(26, 26, 46, 0.85)',
  },

  // Text colors
  text: {
    primary: '#1a1a2e',
    secondary: '#666666',
    light: '#999999',
    disabled: '#cccccc',
    white: '#ffffff',
  },

  // Status colors
  status: {
    success: '#4caf50',
    warning: '#ff9800',
    error: '#f44336',
    info: '#2196f3',
  },

  // Lead status colors (for admin panel)
  leadStatus: {
    new: '#2196f3',
    contacted: '#9c27b0',
    siteVisitScheduled: '#ff9800',
    visited: '#00bcd4',
    negotiation: '#ffc107',
    converted: '#4caf50',
    lost: '#f44336',
  },

  // Gradient presets
  gradients: {
    primary: 'linear-gradient(135deg, #1a1a2e 0%, #2d2d4a 100%)',
    secondary: 'linear-gradient(135deg, #8B9A46 0%, #6b7a36 100%)',
    gold: 'linear-gradient(135deg, #c9a227 0%, #b87333 100%)',
    hero: 'linear-gradient(180deg, rgba(26, 26, 46, 0.9) 0%, rgba(26, 26, 46, 0.7) 50%, rgba(26, 26, 46, 0.9) 100%)',
    cta: 'linear-gradient(135deg, #8B9A46 0%, #c9a227 100%)',
  },

  // Shadow presets
  shadows: {
    card: '0 4px 20px rgba(0, 0, 0, 0.1)',
    cardHover: '0 8px 30px rgba(0, 0, 0, 0.15)',
    button: '0 4px 15px rgba(139, 154, 70, 0.4)',
    elevated: '0 10px 40px rgba(0, 0, 0, 0.2)',
  },

  // Border colors
  border: {
    light: '#e0e0e0',
    main: '#cccccc',
    dark: '#999999',
    focus: '#8B9A46',
  },

  // Overlay colors
  overlay: {
    light: 'rgba(255, 255, 255, 0.1)',
    dark: 'rgba(0, 0, 0, 0.5)',
    blur: 'rgba(26, 26, 46, 0.85)',
  },
};

export default colors;
