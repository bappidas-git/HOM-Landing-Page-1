/**
 * ContactInfo Component
 * Displays contact information and quick action buttons
 */

import { Box, Container, Typography, Grid, Button, Paper, Icon, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { thankYouContent } from '@/data/content/thankYou';
import { siteConfig } from '@/data/content/siteConfig';
import styles from './ContactInfo.module.css';

const ContactInfo = () => {
  const { contactInfo, quickActions, projectHighlights, returnCta } = thankYouContent;

  const getButtonVariant = (variant) => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: '#8B9A46',
          '&:hover': { backgroundColor: '#6b7a36' },
        };
      case 'success':
        return {
          backgroundColor: '#25D366',
          '&:hover': { backgroundColor: '#128C7E' },
        };
      default:
        return {
          backgroundColor: '#1a1a2e',
          '&:hover': { backgroundColor: '#2d2d4a' },
        };
    }
  };

  return (
    <Box
      component="section"
      className={styles.section}
      sx={{
        py: { xs: 6, md: 8 },
        backgroundColor: '#ffffff',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Contact Information */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ x: -30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 3, md: 4 },
                  borderRadius: 3,
                  backgroundColor: '#f8f9fa',
                  height: '100%',
                }}
              >
                <Typography
                  variant="h5"
                  component="h3"
                  sx={{
                    fontFamily: '"Poppins", sans-serif',
                    fontWeight: 600,
                    mb: 3,
                    color: '#1a1a2e',
                  }}
                >
                  {contactInfo.title}
                </Typography>

                {/* Phone */}
                <Box
                  component="a"
                  href={`tel:${contactInfo.phone.number}`}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    mb: 2,
                    textDecoration: 'none',
                    color: 'inherit',
                    p: 2,
                    borderRadius: 2,
                    backgroundColor: '#ffffff',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateX(5px)',
                      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: '50%',
                      backgroundColor: 'rgba(139, 154, 70, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Icon sx={{ color: '#8B9A46' }}>{contactInfo.phone.icon}</Icon>
                  </Box>
                  <Box>
                    <Typography variant="caption" sx={{ color: '#666666' }}>
                      Call Us
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600, color: '#1a1a2e' }}>
                      {contactInfo.phone.display}
                    </Typography>
                  </Box>
                </Box>

                {/* WhatsApp */}
                <Box
                  component="a"
                  href={contactInfo.whatsapp.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    mb: 2,
                    textDecoration: 'none',
                    color: 'inherit',
                    p: 2,
                    borderRadius: 2,
                    backgroundColor: '#ffffff',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateX(5px)',
                      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: '50%',
                      backgroundColor: 'rgba(37, 211, 102, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Icon sx={{ color: '#25D366' }}>{contactInfo.whatsapp.icon}</Icon>
                  </Box>
                  <Box>
                    <Typography variant="caption" sx={{ color: '#666666' }}>
                      WhatsApp
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600, color: '#1a1a2e' }}>
                      {contactInfo.whatsapp.display}
                    </Typography>
                  </Box>
                </Box>

                {/* Email */}
                <Box
                  component="a"
                  href={`mailto:${contactInfo.email.address}`}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    textDecoration: 'none',
                    color: 'inherit',
                    p: 2,
                    borderRadius: 2,
                    backgroundColor: '#ffffff',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateX(5px)',
                      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: '50%',
                      backgroundColor: 'rgba(33, 150, 243, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Icon sx={{ color: '#2196f3' }}>{contactInfo.email.icon}</Icon>
                  </Box>
                  <Box>
                    <Typography variant="caption" sx={{ color: '#666666' }}>
                      Email Us
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600, color: '#1a1a2e' }}>
                      {contactInfo.email.display}
                    </Typography>
                  </Box>
                </Box>

                {/* Working Hours */}
                <Box sx={{ mt: 3, pt: 3, borderTop: '1px solid rgba(0, 0, 0, 0.1)' }}>
                  <Typography variant="subtitle2" sx={{ color: '#666666', mb: 1 }}>
                    Working Hours
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#1a1a2e' }}>
                    Mon - Fri: {contactInfo.workingHours.weekdays}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#1a1a2e' }}>
                    Sat - Sun: {contactInfo.workingHours.weekends}
                  </Typography>
                </Box>
              </Paper>
            </motion.div>
          </Grid>

          {/* Quick Actions & Project Highlights */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ x: 30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              {/* Quick Actions */}
              <Box sx={{ mb: 4 }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: '"Poppins", sans-serif',
                    fontWeight: 600,
                    mb: 2,
                    color: '#1a1a2e',
                  }}
                >
                  Quick Actions
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  {quickActions.map((action) => (
                    <Button
                      key={action.id}
                      component="a"
                      href={action.action}
                      target={action.action.startsWith('http') ? '_blank' : undefined}
                      rel={action.action.startsWith('http') ? 'noopener noreferrer' : undefined}
                      startIcon={<Icon>{action.icon}</Icon>}
                      sx={{
                        color: '#ffffff',
                        px: 3,
                        py: 1.5,
                        borderRadius: 2,
                        textTransform: 'none',
                        fontWeight: 500,
                        ...getButtonVariant(action.variant),
                      }}
                    >
                      {action.text}
                    </Button>
                  ))}
                </Box>
              </Box>

              {/* Project Highlights */}
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  backgroundColor: '#1a1a2e',
                  color: '#ffffff',
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: '"Poppins", sans-serif',
                    fontWeight: 600,
                    mb: 2,
                  }}
                >
                  Project Highlights
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {projectHighlights.map((highlight, index) => (
                    <Chip
                      key={index}
                      icon={<Icon sx={{ color: '#8B9A46 !important', fontSize: '18px !important' }}>{highlight.icon}</Icon>}
                      label={highlight.text}
                      sx={{
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        color: '#ffffff',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        py: 2.5,
                        '& .MuiChip-label': {
                          px: 1,
                        },
                      }}
                    />
                  ))}
                </Box>
              </Paper>

              {/* Return to Homepage */}
              <Box sx={{ mt: 4, textAlign: 'center' }}>
                <Link href={returnCta.href} passHref legacyBehavior>
                  <Button
                    component="a"
                    startIcon={<Icon>{returnCta.icon}</Icon>}
                    sx={{
                      color: '#8B9A46',
                      borderColor: '#8B9A46',
                      border: '2px solid',
                      px: 4,
                      py: 1.5,
                      borderRadius: 2,
                      textTransform: 'none',
                      fontWeight: 600,
                      '&:hover': {
                        backgroundColor: '#8B9A46',
                        color: '#ffffff',
                        borderColor: '#8B9A46',
                      },
                    }}
                  >
                    {returnCta.text}
                  </Button>
                </Link>
              </Box>
            </motion.div>
          </Grid>
        </Grid>

        {/* RERA Info */}
        <Box
          sx={{
            mt: 6,
            pt: 4,
            borderTop: '1px solid rgba(0, 0, 0, 0.1)',
            textAlign: 'center',
          }}
        >
          <Typography variant="body2" sx={{ color: '#666666' }}>
            RERA Registration: {siteConfig.rera.number}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default ContactInfo;
