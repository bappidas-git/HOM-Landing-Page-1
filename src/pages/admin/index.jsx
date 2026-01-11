/**
 * Admin Index Page
 * Redirects to dashboard or login based on auth status
 */

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box, CircularProgress } from '@mui/material';
import { useAuthContext } from '@/context/AuthContext';
import { ADMIN_ROUTES } from '@/lib/constants';

const AdminIndexPage = () => {
  const router = useRouter();
  const { isAuthenticated, isInitialized } = useAuthContext();

  useEffect(() => {
    if (isInitialized) {
      if (isAuthenticated) {
        router.replace(ADMIN_ROUTES.DASHBOARD);
      } else {
        router.replace(ADMIN_ROUTES.LOGIN);
      }
    }
  }, [isAuthenticated, isInitialized, router]);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#f5f5f7',
      }}
    >
      <CircularProgress size={48} />
    </Box>
  );
};

export default AdminIndexPage;
