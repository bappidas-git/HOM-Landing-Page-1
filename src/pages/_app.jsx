/**
 * Next.js Custom App Component
 * Wraps all pages with providers and global styles
 *
 * Provider Hierarchy:
 * 1. ThemeProvider - Material UI theming
 * 2. CssBaseline - Normalize CSS
 * 3. LocalizationProvider - Date/time localization
 * 4. AuthProvider - Authentication state (for admin pages)
 * 5. UIProvider - Global UI state (modals, drawers, etc.)
 * 6. LeadFormProvider - Lead form state management
 */

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { Toaster } from 'react-hot-toast';
import { AnimatePresence } from 'framer-motion';

import { theme } from '@/theme/muiTheme';
import { AuthProvider } from '@/context/AuthContext';
import { UIProvider } from '@/context/UIContext';
import { LeadFormProvider } from '@/context/LeadFormContext';
import LeadFormPopup from '@/components/common/LeadFormPopup';

import '@/styles/globals.css';
import '@/styles/variables.css';
import '@/styles/animations.css';

/**
 * Page transition wrapper component
 */
const PageTransition = ({ children }) => {
  return (
    <AnimatePresence mode="wait">
      {children}
    </AnimatePresence>
  );
};

export default function App({ Component, pageProps }) {
  const router = useRouter();

  // Handle route change for analytics tracking
  useEffect(() => {
    const handleRouteChange = (url) => {
      // Google Analytics page view tracking
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID, {
          page_path: url,
        });
      }

      // Facebook Pixel page view tracking
      if (typeof window !== 'undefined' && window.fbq) {
        window.fbq('track', 'PageView');
      }
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  // Get the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <AuthProvider>
          <UIProvider>
            <LeadFormProvider>
              <PageTransition>
                {getLayout(<Component {...pageProps} key={router.asPath} />)}
              </PageTransition>
              <LeadFormPopup />
              <Toaster
                position="top-center"
                toastOptions={{
                  duration: 4000,
                  style: {
                    background: '#1a1a2e',
                    color: '#ffffff',
                    borderRadius: '12px',
                    padding: '16px 24px',
                    fontSize: '14px',
                    fontFamily: 'Inter, sans-serif',
                    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
                  },
                  success: {
                    iconTheme: {
                      primary: '#8B9A46',
                      secondary: '#ffffff',
                    },
                    style: {
                      border: '1px solid rgba(139, 154, 70, 0.3)',
                    },
                  },
                  error: {
                    iconTheme: {
                      primary: '#f44336',
                      secondary: '#ffffff',
                    },
                    style: {
                      border: '1px solid rgba(244, 67, 54, 0.3)',
                    },
                  },
                  loading: {
                    iconTheme: {
                      primary: '#c9a227',
                      secondary: '#ffffff',
                    },
                  },
                }}
              />
            </LeadFormProvider>
          </UIProvider>
        </AuthProvider>
      </LocalizationProvider>
    </ThemeProvider>
  );
}
