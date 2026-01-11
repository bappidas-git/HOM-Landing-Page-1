/**
 * ThankYouHero Component
 * Hero section for the thank you page with success message
 */

import { Box, Container, Typography, Icon } from '@mui/material';
import { motion } from 'framer-motion';
import { thankYouContent } from '@/data/content/thankYou';
import styles from './ThankYouHero.module.css';

const ThankYouHero = () => {
  const { hero } = thankYouContent;

  return (
    <Box
      component="section"
      className={styles.heroSection}
      sx={{
        minHeight: { xs: '50vh', md: '60vh' },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #1a1a2e 0%, #2d2d4a 100%)',
        position: 'relative',
        overflow: 'hidden',
        pt: { xs: 8, md: 10 },
        pb: { xs: 6, md: 8 },
      }}
    >
      {/* Background Pattern */}
      <Box
        className={styles.backgroundPattern}
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.05,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
        <Box
          sx={{
            textAlign: 'center',
            color: '#ffffff',
          }}
        >
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: 'spring',
              stiffness: 260,
              damping: 20,
              delay: 0.2,
            }}
          >
            <Box
              sx={{
                width: { xs: 80, md: 100 },
                height: { xs: 80, md: 100 },
                borderRadius: '50%',
                backgroundColor: hero.iconColor,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 3,
                boxShadow: `0 10px 40px ${hero.iconColor}40`,
              }}
            >
              <Icon
                sx={{
                  fontSize: { xs: 40, md: 50 },
                  color: '#ffffff',
                }}
              >
                {hero.icon}
              </Icon>
            </Box>
          </motion.div>

          {/* Title */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <Typography
              variant="h2"
              component="h1"
              sx={{
                fontFamily: '"Poppins", sans-serif',
                fontWeight: 700,
                fontSize: { xs: '1.75rem', sm: '2.25rem', md: '3rem' },
                mb: 2,
                textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
              }}
            >
              {hero.title}
            </Typography>
          </motion.div>

          {/* Subtitle */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <Typography
              variant="h5"
              component="p"
              sx={{
                fontFamily: '"Inter", sans-serif',
                fontWeight: 400,
                fontSize: { xs: '1rem', md: '1.25rem' },
                mb: 3,
                color: 'rgba(255, 255, 255, 0.85)',
              }}
            >
              {hero.subtitle}
            </Typography>
          </motion.div>

          {/* Message */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <Typography
              variant="body1"
              sx={{
                fontFamily: '"Inter", sans-serif',
                fontSize: { xs: '0.9rem', md: '1rem' },
                color: 'rgba(255, 255, 255, 0.7)',
                maxWidth: '500px',
                mx: 'auto',
                lineHeight: 1.7,
              }}
            >
              {hero.message}
            </Typography>
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
};

export default ThankYouHero;
