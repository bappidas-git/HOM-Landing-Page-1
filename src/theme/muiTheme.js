/**
 * Material UI Theme Configuration
 * Nambiar District 25 - Real Estate Landing Page
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

  // Typography
  typography: {
    fontFamily: [
      '"Inter"',
      '"Poppins"',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontFamily: '"Poppins", sans-serif',
      fontWeight: 700,
      fontSize: '3.5rem',
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontFamily: '"Poppins", sans-serif',
      fontWeight: 600,
      fontSize: '2.75rem',
      lineHeight: 1.3,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontFamily: '"Poppins", sans-serif',
      fontWeight: 600,
      fontSize: '2rem',
      lineHeight: 1.4,
    },
    h4: {
      fontFamily: '"Poppins", sans-serif',
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.4,
    },
    h5: {
      fontFamily: '"Poppins", sans-serif',
      fontWeight: 500,
      fontSize: '1.25rem',
      lineHeight: 1.5,
    },
    h6: {
      fontFamily: '"Poppins", sans-serif',
      fontWeight: 500,
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
    },
    body2: {
      fontFamily: '"Inter", sans-serif',
      fontSize: '0.875rem',
      lineHeight: 1.7,
    },
    button: {
      fontFamily: '"Poppins", sans-serif',
      fontWeight: 600,
      fontSize: '0.875rem',
      textTransform: 'none',
      letterSpacing: '0.02em',
    },
    caption: {
      fontFamily: '"Inter", sans-serif',
      fontSize: '0.75rem',
      lineHeight: 1.5,
    },
    overline: {
      fontFamily: '"Poppins", sans-serif',
      fontSize: '0.75rem',
      fontWeight: 600,
      letterSpacing: '0.1em',
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

  // Shape
  shape: {
    borderRadius: 8,
  },

  // Shadows
  shadows: [
    'none',
    '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.08)',
    '0 3px 6px rgba(0,0,0,0.12), 0 2px 4px rgba(0,0,0,0.08)',
    '0 10px 20px rgba(0,0,0,0.12), 0 3px 6px rgba(0,0,0,0.08)',
    '0 15px 25px rgba(0,0,0,0.12), 0 5px 10px rgba(0,0,0,0.08)',
    '0 20px 40px rgba(0,0,0,0.12)',
    ...Array(19).fill('0 20px 40px rgba(0,0,0,0.12)'),
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

  // Transitions
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
    // Button
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '12px 24px',
          fontWeight: 600,
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
          },
        },
        containedPrimary: {
          background: colors.gradients.secondary,
          boxShadow: colors.shadows.button,
          '&:hover': {
            background: colors.secondary.dark,
            boxShadow: '0 6px 20px rgba(139, 154, 70, 0.5)',
          },
        },
        containedSecondary: {
          background: colors.gradients.gold,
          '&:hover': {
            background: colors.accent.copper,
          },
        },
        outlined: {
          borderWidth: 2,
          '&:hover': {
            borderWidth: 2,
          },
        },
        outlinedPrimary: {
          borderColor: colors.secondary.main,
          color: colors.secondary.main,
          '&:hover': {
            borderColor: colors.secondary.dark,
            backgroundColor: 'rgba(139, 154, 70, 0.08)',
          },
        },
      },
      defaultProps: {
        disableElevation: true,
      },
    },

    // TextField
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            transition: 'all 0.3s ease',
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: colors.secondary.main,
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: colors.secondary.main,
              borderWidth: 2,
            },
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: colors.secondary.main,
          },
        },
      },
    },

    // Card
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: colors.shadows.card,
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: colors.shadows.cardHover,
          },
        },
      },
    },

    // Paper
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
        elevation1: {
          boxShadow: colors.shadows.card,
        },
      },
    },

    // AppBar
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          backdropFilter: 'blur(10px)',
        },
      },
    },

    // Chip
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500,
        },
        colorPrimary: {
          backgroundColor: colors.secondary.main,
        },
      },
    },

    // Tab
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          fontSize: '1rem',
          minWidth: 100,
          '&.Mui-selected': {
            color: colors.secondary.main,
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

    // Accordion
    MuiAccordion: {
      styleOverrides: {
        root: {
          borderRadius: '12px !important',
          marginBottom: 12,
          boxShadow: colors.shadows.card,
          '&:before': {
            display: 'none',
          },
          '&.Mui-expanded': {
            margin: '0 0 12px 0',
          },
        },
      },
    },

    // Dialog
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 20,
          padding: 8,
        },
      },
    },

    // Drawer
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRadius: '20px 20px 0 0',
        },
      },
    },

    // Switch
    MuiSwitch: {
      styleOverrides: {
        switchBase: {
          '&.Mui-checked': {
            color: colors.secondary.main,
            '& + .MuiSwitch-track': {
              backgroundColor: colors.secondary.main,
            },
          },
        },
      },
    },

    // Checkbox
    MuiCheckbox: {
      styleOverrides: {
        root: {
          '&.Mui-checked': {
            color: colors.secondary.main,
          },
        },
      },
    },

    // Radio
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
          '&:hover': {
            textDecoration: 'underline',
          },
        },
      },
    },

    // Bottom Navigation
    MuiBottomNavigation: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
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

    // Tooltip
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: colors.primary.main,
          borderRadius: 8,
          fontSize: '0.8125rem',
          padding: '8px 16px',
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

    // Alert
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
        standardSuccess: {
          backgroundColor: 'rgba(76, 175, 80, 0.1)',
        },
        standardError: {
          backgroundColor: 'rgba(244, 67, 54, 0.1)',
        },
        standardWarning: {
          backgroundColor: 'rgba(255, 152, 0, 0.1)',
        },
        standardInfo: {
          backgroundColor: 'rgba(33, 150, 243, 0.1)',
        },
      },
    },

    // Skeleton
    MuiSkeleton: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(0, 0, 0, 0.08)',
        },
        rounded: {
          borderRadius: 8,
        },
      },
    },

    // Container
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

    // CssBaseline
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarWidth: 'thin',
          scrollbarColor: `${colors.secondary.main} ${colors.background.paper}`,
          '&::-webkit-scrollbar': {
            width: 8,
          },
          '&::-webkit-scrollbar-track': {
            background: colors.background.paper,
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: colors.secondary.main,
            borderRadius: 4,
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
