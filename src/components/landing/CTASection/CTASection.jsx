/**
 * CTA Section Component
 * Final call-to-action section with gradient background and lead form
 */

import { Box, Container, Typography, Button, Grid, Chip } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PhoneIcon from '@mui/icons-material/Phone';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import GroupsIcon from '@mui/icons-material/Groups';
import VerifiedIcon from '@mui/icons-material/Verified';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import ApartmentIcon from '@mui/icons-material/Apartment';
import PoolIcon from '@mui/icons-material/Pool';
import ParkIcon from '@mui/icons-material/Park';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { motion } from 'framer-motion';

import LeadForm from '@/components/common/LeadForm';
import { useUIContext } from '@/context/UIContext';
import { ctaSectionContent } from '@/data/content/ctaSection';
import styles from './CTASection.module.css';

/**
 * CTA Section
 */
const CTASection = () => {
  const { openPopup, isMobile, isTablet } = useUIContext();
  const { content, cta, trustElements, form, offer, floatingElements } = ctaSectionContent;

  // Icon mapping for trust elements
  const iconMap = {
    groups: <GroupsIcon />,
    verified: <VerifiedIcon />,
    account_balance: <AccountBalanceIcon />,
    emoji_events: <EmojiEventsIcon />,
  };

  // Floating element icon mapping
  const floatingIconMap = {
    apartment: <ApartmentIcon />,
    pool: <PoolIcon />,
    park: <ParkIcon />,
  };

  // Handle CTA clicks
  const handleScheduleVisit = () => {
    openPopup('sitevisit', 'Schedule Your Site Visit', true);
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  const floatAnimation = {
    y: [0, -15, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  };

  return (
    <Box component="section" id={ctaSectionContent.sectionId} className={styles.ctaSection}>
      {/* Floating Elements */}
      <Box className={styles.floatingElements}>
        {floatingElements.map((element, index) => (
          <motion.div
            key={index}
            className={styles.floatingElement}
            style={{
              top: element.position.top,
              left: element.position.left,
              right: element.position.right,
              bottom: element.position.bottom,
            }}
            animate={floatAnimation}
            transition={{
              ...floatAnimation.transition,
              delay: index * 0.5,
            }}
          >
            {floatingIconMap[element.icon]}
          </motion.div>
        ))}
      </Box>

      {/* Background Overlay */}
      <Box className={styles.overlay} />

      <Container maxWidth="lg" className={styles.container}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <Grid container spacing={6} alignItems="center">
            {/* Left Content */}
            <Grid item xs={12} lg={6}>
              <Box className={styles.contentWrapper}>
                {/* Limited Time Offer Badge */}
                {offer.enabled && (
                  <motion.div variants={itemVariants}>
                    <Chip
                      icon={<LocalOfferIcon />}
                      label={offer.badge}
                      className={styles.offerBadge}
                    />
                  </motion.div>
                )}

                {/* Title */}
                <motion.div variants={itemVariants}>
                  <Typography variant="h2" className={styles.title}>
                    {ctaSectionContent.title}
                  </Typography>
                </motion.div>

                {/* Subtitle */}
                <motion.div variants={itemVariants}>
                  <Typography variant="h5" className={styles.subtitle}>
                    {ctaSectionContent.subtitle}
                  </Typography>
                </motion.div>

                {/* Description */}
                <motion.div variants={itemVariants}>
                  <Typography variant="body1" className={styles.description}>
                    {content.description}
                  </Typography>
                </motion.div>

                {/* Highlights */}
                <motion.div variants={itemVariants}>
                  <Box className={styles.highlights}>
                    {content.highlights.map((highlight, index) => (
                      <Box key={index} className={styles.highlightItem}>
                        <span className={styles.checkIcon}>✓</span>
                        <Typography variant="body2">{highlight}</Typography>
                      </Box>
                    ))}
                  </Box>
                </motion.div>

                {/* Offer Details */}
                {offer.enabled && (
                  <motion.div variants={itemVariants}>
                    <Box className={styles.offerDetails}>
                      <Typography variant="body1" className={styles.offerText}>
                        {offer.description}
                      </Typography>
                    </Box>
                  </motion.div>
                )}

                {/* CTA Buttons */}
                <motion.div variants={itemVariants}>
                  <Box className={styles.ctaButtons}>
                    <Button
                      variant="contained"
                      size="large"
                      startIcon={<CalendarTodayIcon />}
                      onClick={handleScheduleVisit}
                      className={styles.primaryButton}
                    >
                      {cta.primary.text}
                    </Button>
                    <Button
                      variant="outlined"
                      size="large"
                      startIcon={<PhoneIcon />}
                      href={`tel:${cta.secondary.phone}`}
                      className={styles.secondaryButton}
                    >
                      {cta.secondary.text}
                    </Button>
                    <Button
                      variant="text"
                      size="large"
                      startIcon={<WhatsAppIcon />}
                      href={cta.tertiary.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.whatsappButton}
                    >
                      {cta.tertiary.text}
                    </Button>
                  </Box>
                </motion.div>

                {/* Trust Elements */}
                <motion.div variants={itemVariants}>
                  <Box className={styles.trustElements}>
                    {trustElements.map((element, index) => (
                      <Box key={index} className={styles.trustItem}>
                        <Box className={styles.trustIcon}>
                          {iconMap[element.icon]}
                        </Box>
                        <Box className={styles.trustContent}>
                          <Typography variant="subtitle2" className={styles.trustText}>
                            {element.text}
                          </Typography>
                          <Typography variant="caption" className={styles.trustDescription}>
                            {element.description}
                          </Typography>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </motion.div>
              </Box>
            </Grid>

            {/* Right Form - Desktop Only */}
            {!isMobile && !isTablet && (
              <Grid item xs={12} lg={6}>
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <Box className={styles.formWrapper}>
                    <Box className={styles.formHeader}>
                      <Typography variant="h5" className={styles.formTitle}>
                        {form.title}
                      </Typography>
                      <Typography variant="body2" className={styles.formSubtitle}>
                        {form.subtitle}
                      </Typography>
                    </Box>
                    <LeadForm
                      source={form.source}
                      showSiteVisit={form.showSiteVisit}
                      submitText={form.submitText}
                      compact={false}
                    />
                  </Box>
                </motion.div>
              </Grid>
            )}
          </Grid>
        </motion.div>
      </Container>

      {/* Decorative Elements */}
      <Box className={styles.decorativeCircle1} />
      <Box className={styles.decorativeCircle2} />
    </Box>
  );
};

export default CTASection;
