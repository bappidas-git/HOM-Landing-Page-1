/**
 * 500 Error Page - Nambiar District 25 Phase 2
 * Displayed when a server error occurs
 *
 * Features:
 * - Friendly error message
 * - Retry and navigation options
 * - Quick contact links
 * - SEO friendly error handling
 */

import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Box, Container, Typography, Button, Grid, Icon, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import { siteConfig } from '@/data/content/siteConfig';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

// Shake animation for the error icon
const shakeVariants = {
  animate: {
    x: [0, -5, 5, -5, 5, 0],
    transition: {
      duration: 0.5,
      repeat: Infinity,
      repeatDelay: 3,
    },
  },
};

// Troubleshooting steps
const troubleshootingSteps = [
  {
    icon: 'refresh',
    title: 'Refresh the Page',
    description: 'Sometimes a simple refresh fixes the issue',
    action: 'refresh',
  },
  {
    icon: 'home',
    title: 'Go to Homepage',
    description: 'Return to the main page',
    action: 'home',
  },
  {
    icon: 'history',
    title: 'Go Back',
    description: 'Return to the previous page',
    action: 'back',
  },
  {
    icon: 'phone',
    title: 'Contact Support',
    description: 'Get help from our team',
    action: 'contact',
  },
];

export default function Custom500() {
  const router = useRouter();

  const handleAction = (action) => {
    switch (action) {
      case 'refresh':
        if (typeof window !== 'undefined') {
          window.location.reload();
        }
        break;
      case 'home':
        router.push('/');
        break;
      case 'back':
        router.back();
        break;
      case 'contact':
        if (typeof window !== 'undefined') {
          window.location.href = `tel:${siteConfig.contact.phone}`;
        }
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Head>
        <title>{`Server Error | ${siteConfig.siteName}`}</title>
        <meta
          name="description"
          content="Something went wrong on our end. Please try again or contact us for assistance."
        />
        <meta name="robots" content="noindex, nofollow" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </Head>

      <Box
        component="main"
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #1a1a2e 0%, #2d2d4a 100%)',
          position: 'relative',
          overflow: 'hidden',
          py: { xs: 6, md: 10 },
        }}
      >
        {/* Background Pattern */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.03,
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M50 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10zM10 10c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10S0 25.523 0 20s4.477-10 10-10zm10 8c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm40 40c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <Box sx={{ textAlign: 'center', color: '#ffffff', mb: 6 }}>
              {/* Error Icon */}
              <motion.div variants={shakeVariants} animate="animate">
                <Box
                  sx={{
                    width: { xs: 100, md: 140 },
                    height: { xs: 100, md: 140 },
                    borderRadius: '50%',
                    backgroundColor: 'rgba(244, 67, 54, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 4,
                    border: '3px solid rgba(244, 67, 54, 0.4)',
                  }}
                >
                  <Icon
                    sx={{
                      fontSize: { xs: 50, md: 70 },
                      color: '#f44336',
                    }}
                  >
                    error_outline
                  </Icon>
                </Box>
              </motion.div>

              {/* 500 Text */}
              <motion.div variants={itemVariants}>
                <Typography
                  variant="h1"
                  sx={{
                    fontFamily: '"Poppins", sans-serif',
                    fontWeight: 800,
                    fontSize: { xs: '4rem', sm: '6rem', md: '8rem' },
                    color: 'rgba(255, 255, 255, 0.1)',
                    lineHeight: 1,
                    mb: -2,
                  }}
                >
                  500
                </Typography>
              </motion.div>

              {/* Error Message */}
              <motion.div variants={itemVariants}>
                <Typography
                  variant="h4"
                  component="h1"
                  sx={{
                    fontFamily: '"Poppins", sans-serif',
                    fontWeight: 600,
                    fontSize: { xs: '1.5rem', md: '2rem' },
                    mb: 2,
                    position: 'relative',
                  }}
                >
                  Oops! Something Went Wrong
                </Typography>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Typography
                  variant="body1"
                  sx={{
                    fontFamily: '"Inter", sans-serif',
                    color: 'rgba(255, 255, 255, 0.7)',
                    maxWidth: '550px',
                    mx: 'auto',
                    mb: 4,
                    lineHeight: 1.7,
                  }}
                >
                  We apologize for the inconvenience. Our team has been notified and
                  is working to fix the issue. Please try again in a few moments.
                </Typography>
              </motion.div>

              {/* Primary CTA */}
              <motion.div variants={itemVariants}>
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<Icon>refresh</Icon>}
                    onClick={() => handleAction('refresh')}
                    sx={{
                      backgroundColor: '#8B9A46',
                      color: '#ffffff',
                      px: 4,
                      py: 1.5,
                      borderRadius: 2,
                      textTransform: 'none',
                      fontWeight: 600,
                      fontSize: '1rem',
                      boxShadow: '0 10px 30px rgba(139, 154, 70, 0.4)',
                      '&:hover': {
                        backgroundColor: '#6b7a36',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 15px 40px rgba(139, 154, 70, 0.5)',
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    Try Again
                  </Button>
                  <Link href="/" passHref legacyBehavior>
                    <Button
                      component="a"
                      variant="outlined"
                      size="large"
                      startIcon={<Icon>home</Icon>}
                      sx={{
                        color: '#ffffff',
                        borderColor: 'rgba(255, 255, 255, 0.3)',
                        px: 4,
                        py: 1.5,
                        borderRadius: 2,
                        textTransform: 'none',
                        fontWeight: 600,
                        fontSize: '1rem',
                        '&:hover': {
                          borderColor: '#8B9A46',
                          backgroundColor: 'rgba(139, 154, 70, 0.1)',
                        },
                        transition: 'all 0.3s ease',
                      }}
                    >
                      Go to Homepage
                    </Button>
                  </Link>
                </Box>
              </motion.div>
            </Box>

            {/* Troubleshooting Steps */}
            <motion.div variants={itemVariants}>
              <Typography
                variant="h6"
                sx={{
                  textAlign: 'center',
                  color: 'rgba(255, 255, 255, 0.7)',
                  mb: 3,
                  fontWeight: 500,
                }}
              >
                What you can do:
              </Typography>
              <Grid container spacing={2} justifyContent="center">
                {troubleshootingSteps.map((step, index) => (
                  <Grid item xs={6} sm={3} key={index}>
                    <Paper
                      elevation={0}
                      onClick={() => handleAction(step.action)}
                      sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        borderRadius: 2,
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        color: '#ffffff',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer',
                        '&:hover': {
                          backgroundColor: 'rgba(255, 255, 255, 0.1)',
                          transform: 'translateY(-5px)',
                          borderColor: '#8B9A46',
                          '& .stepIcon': {
                            backgroundColor: '#8B9A46',
                          },
                        },
                      }}
                    >
                      <Box
                        className="stepIcon"
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: '50%',
                          backgroundColor: 'rgba(139, 154, 70, 0.2)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mb: 1.5,
                          transition: 'all 0.3s ease',
                        }}
                      >
                        <Icon sx={{ color: '#8B9A46' }}>{step.icon}</Icon>
                      </Box>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          fontWeight: 600,
                          mb: 0.5,
                        }}
                      >
                        {step.title}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          color: 'rgba(255, 255, 255, 0.6)',
                          display: { xs: 'none', sm: 'block' },
                        }}
                      >
                        {step.description}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </motion.div>

            {/* Contact Info */}
            <motion.div variants={itemVariants}>
              <Box
                sx={{
                  mt: 6,
                  pt: 4,
                  borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                  textAlign: 'center',
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.6)',
                    mb: 1,
                  }}
                >
                  Still having issues? Contact us directly
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: 3,
                    flexWrap: 'wrap',
                  }}
                >
                  <Button
                    component="a"
                    href={`tel:${siteConfig.contact.phone}`}
                    startIcon={<Icon>phone</Icon>}
                    sx={{
                      color: '#ffffff',
                      textTransform: 'none',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      },
                    }}
                  >
                    {siteConfig.contact.phoneDisplay}
                  </Button>
                  <Button
                    component="a"
                    href={siteConfig.contact.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    startIcon={<Icon>chat</Icon>}
                    sx={{
                      color: '#25D366',
                      textTransform: 'none',
                      '&:hover': {
                        backgroundColor: 'rgba(37, 211, 102, 0.1)',
                      },
                    }}
                  >
                    WhatsApp
                  </Button>
                  <Button
                    component="a"
                    href={`mailto:${siteConfig.contact.email}`}
                    startIcon={<Icon>email</Icon>}
                    sx={{
                      color: '#ffffff',
                      textTransform: 'none',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      },
                    }}
                  >
                    Email Us
                  </Button>
                </Box>
              </Box>
            </motion.div>
          </motion.div>
        </Container>
      </Box>
    </>
  );
}
