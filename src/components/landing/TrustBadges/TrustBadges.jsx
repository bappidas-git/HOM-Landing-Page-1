/**
 * Trust Badges Section Component
 * Displays trust indicators like RERA, CREDAI, Awards, and Bank approvals
 */

import { Box, Container, Typography, Grid } from '@mui/material';
import VerifiedIcon from '@mui/icons-material/Verified';
import BusinessIcon from '@mui/icons-material/Business';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { motion } from 'framer-motion';

import { siteConfig } from '@/data/content/siteConfig';
import styles from './TrustBadges.module.css';

/**
 * TrustBadges Section
 */
const TrustBadges = () => {
  const { trustBadges, bankPartners } = siteConfig;

  // Icon mapping
  const iconMap = {
    verified: <VerifiedIcon />,
    business: <BusinessIcon />,
    emoji_events: <EmojiEventsIcon />,
    account_balance: <AccountBalanceIcon />,
  };

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
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  const bankVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4 },
    },
  };

  return (
    <Box component="section" className={styles.trustSection}>
      <Container maxWidth="lg">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className={styles.header}
        >
          <Typography variant="overline" className={styles.preTitle}>
            Trust & Credibility
          </Typography>
          <Typography variant="h4" className={styles.title}>
            Why Choose Nambiar District 25?
          </Typography>
        </motion.div>

        {/* Trust Badges Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <Grid container spacing={3} className={styles.badgesGrid}>
            {trustBadges.map((badge, index) => (
              <Grid item xs={6} sm={6} md={3} key={badge.id}>
                <motion.div variants={itemVariants}>
                  <Box className={styles.badgeCard}>
                    <Box className={styles.badgeIcon}>
                      {iconMap[badge.icon]}
                    </Box>
                    <Typography variant="h6" className={styles.badgeTitle}>
                      {badge.title}
                    </Typography>
                    <Typography variant="caption" className={styles.badgeDescription}>
                      {badge.description}
                    </Typography>
                    <Box className={styles.checkMark}>
                      <CheckCircleIcon />
                    </Box>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>

        {/* Bank Partners */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Box className={styles.bankPartners}>
            <Typography variant="subtitle2" className={styles.bankTitle}>
              Approved by Leading Banks
            </Typography>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className={styles.bankLogos}
            >
              {bankPartners.map((bank, index) => (
                <motion.div key={bank.name} variants={bankVariants}>
                  <Box className={styles.bankLogo}>
                    {/* Placeholder for bank logo - using text as fallback */}
                    <Box className={styles.bankLogoInner}>
                      <Typography variant="caption" className={styles.bankName}>
                        {bank.name}
                      </Typography>
                    </Box>
                  </Box>
                </motion.div>
              ))}
            </motion.div>
          </Box>
        </motion.div>

        {/* Additional Trust Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Box className={styles.trustIndicators}>
            <Box className={styles.trustIndicator}>
              <VerifiedIcon className={styles.indicatorIcon} />
              <Typography variant="body2">100% Legal & Clear Title</Typography>
            </Box>
            <Box className={styles.divider} />
            <Box className={styles.trustIndicator}>
              <CheckCircleIcon className={styles.indicatorIcon} />
              <Typography variant="body2">On-Time Delivery Record</Typography>
            </Box>
            <Box className={styles.divider} />
            <Box className={styles.trustIndicator}>
              <EmojiEventsIcon className={styles.indicatorIcon} />
              <Typography variant="body2">25+ Years of Excellence</Typography>
            </Box>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default TrustBadges;
