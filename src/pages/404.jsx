/**
 * 404 Error Page - Nambiar District 25 Phase 2
 * Displayed when a page is not found
 *
 * Features:
 * - Animated error illustration
 * - Helpful navigation options
 * - Quick contact links
 * - SEO friendly error handling
 */

import Head from 'next/head';
import Link from 'next/link';
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

// Floating animation for the 404 text
const floatVariants = {
  animate: {
    y: [0, -15, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

// Quick links for navigation
const quickLinks = [
  {
    icon: 'home',
    title: 'Homepage',
    description: 'Go back to the main page',
    href: '/',
  },
  {
    icon: 'apartment',
    title: 'Floor Plans',
    description: 'Explore our apartment layouts',
    href: '/#floor-plans',
  },
  {
    icon: 'location_on',
    title: 'Location',
    description: 'View project location',
    href: '/#location',
  },
  {
    icon: 'phone',
    title: 'Contact Us',
    description: 'Get in touch with us',
    href: `tel:${siteConfig.contact.phone}`,
  },
];

export default function Custom404() {
  return (
    <>
      <Head>
        <title>{`Page Not Found | ${siteConfig.siteName}`}</title>
        <meta
          name="description"
          content="The page you're looking for doesn't exist. Return to Nambiar District 25 Phase 2 to explore premium apartments in Bengaluru."
        />
        <meta name="robots" content="noindex, follow" />
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
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          }}
        />

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <Box sx={{ textAlign: 'center', color: '#ffffff', mb: 6 }}>
              {/* 404 Text */}
              <motion.div variants={floatVariants} animate="animate">
                <Typography
                  variant="h1"
                  sx={{
                    fontFamily: '"Poppins", sans-serif',
                    fontWeight: 800,
                    fontSize: { xs: '6rem', sm: '8rem', md: '12rem' },
                    background: 'linear-gradient(135deg, #8B9A46 0%, #c9a227 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    lineHeight: 1,
                    mb: 2,
                    textShadow: '0 10px 40px rgba(139, 154, 70, 0.3)',
                  }}
                >
                  404
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
                  }}
                >
                  Oops! Page Not Found
                </Typography>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Typography
                  variant="body1"
                  sx={{
                    fontFamily: '"Inter", sans-serif',
                    color: 'rgba(255, 255, 255, 0.7)',
                    maxWidth: '500px',
                    mx: 'auto',
                    mb: 4,
                    lineHeight: 1.7,
                  }}
                >
                  The page you&apos;re looking for seems to have moved or doesn&apos;t exist.
                  Don&apos;t worry, let us help you find your way back home.
                </Typography>
              </motion.div>

              {/* Primary CTA */}
              <motion.div variants={itemVariants}>
                <Link href="/" passHref legacyBehavior>
                  <Button
                    component="a"
                    variant="contained"
                    size="large"
                    startIcon={<Icon>home</Icon>}
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
                    Back to Homepage
                  </Button>
                </Link>
              </motion.div>
            </Box>

            {/* Quick Links */}
            <motion.div variants={itemVariants}>
              <Grid container spacing={2} justifyContent="center">
                {quickLinks.map((link, index) => (
                  <Grid item xs={6} sm={3} key={index}>
                    <Link href={link.href} passHref legacyBehavior>
                      <Paper
                        component="a"
                        elevation={0}
                        sx={{
                          p: 2,
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          textAlign: 'center',
                          backgroundColor: 'rgba(255, 255, 255, 0.05)',
                          borderRadius: 2,
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          textDecoration: 'none',
                          color: '#ffffff',
                          transition: 'all 0.3s ease',
                          cursor: 'pointer',
                          '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            transform: 'translateY(-5px)',
                            borderColor: '#8B9A46',
                            '& .linkIcon': {
                              backgroundColor: '#8B9A46',
                            },
                          },
                        }}
                      >
                        <Box
                          className="linkIcon"
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
                          <Icon sx={{ color: '#8B9A46' }}>{link.icon}</Icon>
                        </Box>
                        <Typography
                          variant="subtitle2"
                          sx={{
                            fontWeight: 600,
                            mb: 0.5,
                          }}
                        >
                          {link.title}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            color: 'rgba(255, 255, 255, 0.6)',
                            display: { xs: 'none', sm: 'block' },
                          }}
                        >
                          {link.description}
                        </Typography>
                      </Paper>
                    </Link>
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
                  Need help? Contact us directly
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
                </Box>
              </Box>
            </motion.div>
          </motion.div>
        </Container>
      </Box>
    </>
  );
}
