/**
 * Next.js Custom App Component
 * Wraps all pages with providers and global styles
 */

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Toaster } from 'react-hot-toast';

import { theme } from '@/theme/muiTheme';
import { UIProvider } from '@/context/UIContext';
import { LeadFormProvider } from '@/context/LeadFormContext';
import LeadFormPopup from '@/components/common/LeadFormPopup';

import '@/styles/globals.css';
import '@/styles/variables.css';
import '@/styles/animations.css';

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <UIProvider>
          <LeadFormProvider>
            <Component {...pageProps} />
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
                },
                success: {
                  iconTheme: {
                    primary: '#8B9A46',
                    secondary: '#ffffff',
                  },
                },
                error: {
                  iconTheme: {
                    primary: '#f44336',
                    secondary: '#ffffff',
                  },
                },
              }}
            />
          </LeadFormProvider>
        </UIProvider>
      </LocalizationProvider>
    </ThemeProvider>
  );
}
