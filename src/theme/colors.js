/**
 * Color palette - Modern Minimalistic Black & White Theme
 * Clean, professional design inspired by Zillow
 */

export const colors = {
  // Primary colors - Clean Black & White
  primary: {
    main: '#000000',
    light: '#333333',
    dark: '#000000',
    contrastText: '#ffffff',
  },

  // Secondary colors - Blue accent (like Zillow)
  secondary: {
    main: '#006AFF',
    light: '#3D8BFF',
    dark: '#0052CC',
    contrastText: '#ffffff',
  },

  // Accent colors for highlights
  accent: {
    blue: '#006AFF',
    green: '#00C853',
    orange: '#FF6D00',
    red: '#FF1744',
  },

  // Background colors - Clean whites
  background: {
    default: '#ffffff',
    paper: '#f7f7f7',
    dark: '#000000',
    gradient: 'linear-gradient(180deg, #ffffff 0%, #f7f7f7 100%)',
    overlay: 'rgba(0, 0, 0, 0.6)',
  },

  // Text colors
  text: {
    primary: '#2A2A33',
    secondary: '#6B6B76',
    light: '#9999A4',
    disabled: '#CCCCCC',
    white: '#ffffff',
  },

  // Status colors
  status: {
    success: '#00C853',
    warning: '#FFB300',
    error: '#FF1744',
    info: '#006AFF',
  },

  // Lead status colors (for admin panel)
  leadStatus: {
    new: '#006AFF',
    contacted: '#9C27B0',
    siteVisitScheduled: '#FF9800',
    visited: '#00BCD4',
    negotiation: '#FFC107',
    converted: '#00C853',
    lost: '#FF1744',
  },

  // Gradient presets - Minimal and clean
  gradients: {
    primary: 'linear-gradient(180deg, #000000 0%, #333333 100%)',
    secondary: 'linear-gradient(135deg, #006AFF 0%, #0052CC 100%)',
    hero: 'linear-gradient(180deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.6) 100%)',
    cta: 'linear-gradient(135deg, #006AFF 0%, #0052CC 100%)',
    subtle: 'linear-gradient(180deg, #ffffff 0%, #f7f7f7 100%)',
  },

  // Shadow presets - Subtle and modern
  shadows: {
    card: '0 1px 3px rgba(0, 0, 0, 0.08), 0 4px 6px rgba(0, 0, 0, 0.04)',
    cardHover: '0 4px 12px rgba(0, 0, 0, 0.12), 0 8px 24px rgba(0, 0, 0, 0.08)',
    button: '0 2px 4px rgba(0, 106, 255, 0.2)',
    elevated: '0 8px 30px rgba(0, 0, 0, 0.12)',
  },

  // Border colors
  border: {
    light: '#E8E8E8',
    main: '#D4D4D4',
    dark: '#A3A3A3',
    focus: '#006AFF',
  },

  // Overlay colors
  overlay: {
    light: 'rgba(255, 255, 255, 0.9)',
    dark: 'rgba(0, 0, 0, 0.5)',
    blur: 'rgba(255, 255, 255, 0.95)',
  },
};

export default colors;
