/**
 * Material UI Theme Configuration
 * Modern Minimalistic Black & White Theme
 */

import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { colors } from './colors';

// Base theme configuration
const baseTheme = createTheme({
  // Color palette
  palette: {
    mode: 'light',
    primary: {
      main: colors.primary.main,
      light: colors.primary.light,
      dark: colors.primary.dark,
      contrastText: colors.primary.contrastText,
    },
    secondary: {
      main: colors.secondary.main,
      light: colors.secondary.light,
      dark: colors.secondary.dark,
      contrastText: colors.secondary.contrastText,
    },
    error: {
      main: colors.status.error,
    },
    warning: {
      main: colors.status.warning,
    },
    info: {
      main: colors.status.info,
    },
    success: {
      main: colors.status.success,
    },
    background: {
      default: colors.background.default,
      paper: colors.background.paper,
    },
    text: {
      primary: colors.text.primary,
      secondary: colors.text.secondary,
      disabled: colors.text.disabled,
    },
    divider: colors.border.light,
  },

  // Typography - Clean Inter font
  typography: {
    fontFamily: [
      '"Inter"',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 800,
      fontSize: '3.5rem',
      lineHeight: 1.1,
      letterSpacing: '-0.03em',
    },
    h2: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 700,
      fontSize: '2.5rem',
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
    },
    h3: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 600,
      fontSize: '2rem',
      lineHeight: 1.3,
      letterSpacing: '-0.01em',
    },
    h4: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.35,
    },
    h5: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 600,
      fontSize: '1.25rem',
      lineHeight: 1.4,
    },
    h6: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 600,
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    subtitle1: {
      fontFamily: '"Inter", sans-serif',
      fontSize: '1.125rem',
      lineHeight: 1.6,
      fontWeight: 400,
    },
    subtitle2: {
      fontFamily: '"Inter", sans-serif',
      fontSize: '0.875rem',
      lineHeight: 1.6,
      fontWeight: 500,
    },
    body1: {
      fontFamily: '"Inter", sans-serif',
      fontSize: '1rem',
      lineHeight: 1.7,
      color: colors.text.secondary,
    },
    body2: {
      fontFamily: '"Inter", sans-serif',
      fontSize: '0.875rem',
      lineHeight: 1.7,
      color: colors.text.secondary,
    },
    button: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 600,
      fontSize: '0.9375rem',
      textTransform: 'none',
      letterSpacing: '0.01em',
    },
    caption: {
      fontFamily: '"Inter", sans-serif',
      fontSize: '0.75rem',
      lineHeight: 1.5,
      color: colors.text.light,
    },
    overline: {
      fontFamily: '"Inter", sans-serif',
      fontSize: '0.75rem',
      fontWeight: 600,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
    },
  },

  // Breakpoints (MUI defaults)
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },

  // Spacing (base unit: 8px)
  spacing: 8,

  // Shape - Modern rounded corners
  shape: {
    borderRadius: 10,
  },

  // Shadows - Subtle and modern
  shadows: [
    'none',
    '0 1px 2px rgba(0,0,0,0.05)',
    '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)',
    '0 4px 6px rgba(0,0,0,0.07)',
    '0 4px 12px rgba(0,0,0,0.1)',
    '0 8px 16px rgba(0,0,0,0.1)',
    ...Array(19).fill('0 8px 30px rgba(0,0,0,0.12)'),
  ],

  // Z-index
  zIndex: {
    mobileStepper: 1000,
    fab: 1050,
    speedDial: 1050,
    appBar: 1100,
    drawer: 1200,
    modal: 1300,
    snackbar: 1400,
    tooltip: 1500,
    bottomNav: 1100,
    floatingCTA: 1090,
  },

  // Transitions - Smooth
  transitions: {
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      standard: 300,
      complex: 375,
      enteringScreen: 225,
      leavingScreen: 195,
    },
    easing: {
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
    },
  },
});

// Component overrides
const theme = createTheme(baseTheme, {
  components: {
    // Button - Modern clean design
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          padding: '12px 28px',
          fontWeight: 600,
          transition: 'all 0.25s ease',
          '&:hover': {
            transform: 'translateY(-1px)',
          },
        },
        containedPrimary: {
          background: colors.primary.main,
          color: colors.primary.contrastText,
          boxShadow: 'none',
          '&:hover': {
            background: colors.primary.light,
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          },
        },
        containedSecondary: {
          background: colors.secondary.main,
          color: colors.secondary.contrastText,
          boxShadow: 'none',
          '&:hover': {
            background: colors.secondary.dark,
            boxShadow: '0 4px 12px rgba(0, 106, 255, 0.3)',
          },
        },
        outlined: {
          borderWidth: 2,
          '&:hover': {
            borderWidth: 2,
          },
        },
        outlinedPrimary: {
          borderColor: colors.primary.main,
          color: colors.primary.main,
          '&:hover': {
            borderColor: colors.primary.dark,
            backgroundColor: 'rgba(0, 0, 0, 0.04)',
          },
        },
        outlinedSecondary: {
          borderColor: colors.secondary.main,
          color: colors.secondary.main,
          '&:hover': {
            borderColor: colors.secondary.dark,
            backgroundColor: 'rgba(0, 106, 255, 0.04)',
          },
        },
        text: {
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.04)',
          },
        },
      },
      defaultProps: {
        disableElevation: true,
      },
    },

    // TextField - Clean minimal design
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 10,
            transition: 'all 0.25s ease',
            backgroundColor: colors.background.default,
            '& fieldset': {
              borderColor: colors.border.main,
              borderWidth: 1,
            },
            '&:hover fieldset': {
              borderColor: colors.text.secondary,
            },
            '&.Mui-focused fieldset': {
              borderColor: colors.secondary.main,
              borderWidth: 2,
            },
          },
          '& .MuiInputLabel-root': {
            color: colors.text.light,
            '&.Mui-focused': {
              color: colors.secondary.main,
            },
          },
        },
      },
    },

    // Card - Clean modern design
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: colors.shadows.card,
          transition: 'all 0.3s ease',
          border: `1px solid ${colors.border.light}`,
          '&:hover': {
            boxShadow: colors.shadows.cardHover,
            transform: 'translateY(-2px)',
          },
        },
      },
    },

    // Paper - Clean design
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 14,
          backgroundImage: 'none',
        },
        elevation1: {
          boxShadow: colors.shadows.card,
        },
      },
    },

    // AppBar - Clean white header
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          backdropFilter: 'blur(20px)',
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
        },
      },
    },

    // Chip - Modern rounded
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          fontWeight: 500,
          fontSize: '0.8125rem',
        },
        colorPrimary: {
          backgroundColor: colors.primary.main,
          color: colors.primary.contrastText,
        },
        colorSecondary: {
          backgroundColor: colors.secondary.main,
          color: colors.secondary.contrastText,
        },
        outlined: {
          borderWidth: 1.5,
        },
      },
    },

    // Tab - Clean minimal
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          fontSize: '0.9375rem',
          minWidth: 100,
          padding: '12px 20px',
          color: colors.text.secondary,
          '&.Mui-selected': {
            color: colors.text.primary,
            fontWeight: 600,
          },
        },
      },
    },

    MuiTabs: {
      styleOverrides: {
        indicator: {
          backgroundColor: colors.secondary.main,
          height: 3,
          borderRadius: 3,
        },
      },
    },

    // Accordion - Clean design
    MuiAccordion: {
      styleOverrides: {
        root: {
          borderRadius: '14px !important',
          marginBottom: 12,
          boxShadow: 'none',
          border: `1px solid ${colors.border.light}`,
          '&:before': {
            display: 'none',
          },
          '&.Mui-expanded': {
            margin: '0 0 12px 0',
            boxShadow: colors.shadows.card,
          },
        },
      },
    },

    // Dialog - Modern rounded
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 20,
          padding: 8,
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
        },
      },
    },

    // Drawer - Clean design
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRadius: '24px 24px 0 0',
        },
      },
    },

    // Switch - Modern design
    MuiSwitch: {
      styleOverrides: {
        root: {
          padding: 8,
        },
        switchBase: {
          '&.Mui-checked': {
            color: colors.secondary.main,
            '& + .MuiSwitch-track': {
              backgroundColor: colors.secondary.main,
            },
          },
        },
        track: {
          borderRadius: 22,
          backgroundColor: colors.border.main,
        },
        thumb: {
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        },
      },
    },

    // Checkbox - Modern design
    MuiCheckbox: {
      styleOverrides: {
        root: {
          '&.Mui-checked': {
            color: colors.secondary.main,
          },
        },
      },
    },

    // Radio - Modern design
    MuiRadio: {
      styleOverrides: {
        root: {
          '&.Mui-checked': {
            color: colors.secondary.main,
          },
        },
      },
    },

    // Link
    MuiLink: {
      styleOverrides: {
        root: {
          color: colors.secondary.main,
          textDecoration: 'none',
          fontWeight: 500,
          '&:hover': {
            textDecoration: 'underline',
          },
        },
      },
    },

    // Bottom Navigation - Clean white
    MuiBottomNavigation: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(255, 255, 255, 0.98)',
          backdropFilter: 'blur(20px)',
          borderTop: `1px solid ${colors.border.light}`,
        },
      },
    },

    MuiBottomNavigationAction: {
      styleOverrides: {
        root: {
          color: colors.text.secondary,
          '&.Mui-selected': {
            color: colors.secondary.main,
          },
        },
      },
    },

    // Tooltip - Modern dark
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: colors.primary.main,
          borderRadius: 8,
          fontSize: '0.8125rem',
          padding: '8px 14px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        },
        arrow: {
          color: colors.primary.main,
        },
      },
    },

    // Badge
    MuiBadge: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: colors.secondary.main,
        },
      },
    },

    // Alert - Modern rounded
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
        standardSuccess: {
          backgroundColor: 'rgba(0, 200, 83, 0.1)',
          color: '#00864D',
        },
        standardError: {
          backgroundColor: 'rgba(255, 23, 68, 0.1)',
          color: '#C40030',
        },
        standardWarning: {
          backgroundColor: 'rgba(255, 179, 0, 0.1)',
          color: '#B37B00',
        },
        standardInfo: {
          backgroundColor: 'rgba(0, 106, 255, 0.1)',
          color: '#0052CC',
        },
      },
    },

    // Skeleton - Subtle animation
    MuiSkeleton: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(0, 0, 0, 0.06)',
        },
        rounded: {
          borderRadius: 10,
        },
      },
    },

    // Container - Proper padding
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingLeft: 16,
          paddingRight: 16,
          '@media (min-width: 600px)': {
            paddingLeft: 24,
            paddingRight: 24,
          },
        },
      },
    },

    // CssBaseline - Smooth scrollbar
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarWidth: 'thin',
          scrollbarColor: `${colors.border.main} transparent`,
          '&::-webkit-scrollbar': {
            width: 6,
          },
          '&::-webkit-scrollbar-track': {
            background: 'transparent',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: colors.border.main,
            borderRadius: 3,
          },
        },
      },
    },

    // IconButton - Modern hover
    MuiIconButton: {
      styleOverrides: {
        root: {
          transition: 'all 0.2s ease',
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.04)',
          },
        },
      },
    },

    // Divider - Subtle
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: colors.border.light,
        },
      },
    },

    // List - Clean design
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          margin: '2px 8px',
          '&.Mui-selected': {
            backgroundColor: 'rgba(0, 106, 255, 0.08)',
            '&:hover': {
              backgroundColor: 'rgba(0, 106, 255, 0.12)',
            },
          },
        },
      },
    },
  },
});

// Apply responsive font sizes
const responsiveTheme = responsiveFontSizes(theme, {
  breakpoints: ['sm', 'md', 'lg'],
  factor: 2,
});

export { responsiveTheme as theme };
export default responsiveTheme;
