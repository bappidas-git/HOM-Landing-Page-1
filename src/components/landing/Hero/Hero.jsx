/**
 * Hero Section Component
 * Full viewport hero with content and lead form
 */

import { Box, Container, Grid, Typography, Button, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import Icon from '@mui/material/Icon';
import { useUIContext } from '@/context/UIContext';
import LeadForm from '@/components/common/LeadForm';
import { heroContent } from '@/data/content/hero';
import styles from './Hero.module.css';

const Hero = () => {
  const { openPopup } = useUIContext();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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

  const formVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, delay: 0.3, ease: 'easeOut' },
    },
  };

  const handleCTAClick = (action) => {
    openPopup(action);
  };

  return (
    <Box
      component="section"
      id={heroContent.sectionId}
      className={styles.hero}
      sx={{
        backgroundImage: `${heroContent.background.overlay}, url(${heroContent.background.image})`,
      }}
    >
      <Container maxWidth="lg" className={styles.container}>
        <Grid container spacing={4} alignItems="center" className={styles.grid}>
          {/* Content Side */}
          <Grid item xs={12} lg={7}>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className={styles.content}
            >
              {/* Pre-title Badge */}
              {heroContent.preTitle.badge && (
                <motion.div variants={itemVariants}>
                  <Chip
                    label={heroContent.preTitle.text}
                    color="secondary"
                    className={styles.badge}
                  />
                </motion.div>
              )}

              {/* Main Title */}
              <motion.div variants={itemVariants}>
                <Typography
                  variant="h1"
                  component="h1"
                  className={styles.title}
                >
                  {heroContent.title.main}{' '}
                  <span className={styles.highlight}>
                    {heroContent.title.highlight}
                  </span>
                </Typography>
              </motion.div>

              {/* Subtitle */}
              <motion.div variants={itemVariants}>
                <Typography
                  variant="h5"
                  component="p"
                  className={styles.subtitle}
                >
                  {heroContent.subtitle}
                </Typography>
              </motion.div>

              {/* Key Highlights Grid */}
              <motion.div variants={itemVariants}>
                <Box className={styles.highlightsGrid}>
                  {heroContent.highlights.map((highlight) => (
                    <Box key={highlight.id} className={styles.highlightItem}>
                      <Icon className={styles.highlightIcon}>
                        {highlight.icon}
                      </Icon>
                      <Box>
                        <Typography
                          variant="h6"
                          component="span"
                          className={styles.highlightTitle}
                        >
                          {highlight.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          component="span"
                          className={styles.highlightDesc}
                        >
                          {highlight.description}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div variants={itemVariants}>
                <Box className={styles.ctaButtons}>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    startIcon={<Icon>{heroContent.cta.primary.icon}</Icon>}
                    onClick={() => handleCTAClick(heroContent.cta.primary.action)}
                    className={styles.ctaPrimary}
                  >
                    {heroContent.cta.primary.text}
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    startIcon={<Icon>{heroContent.cta.secondary.icon}</Icon>}
                    onClick={() => handleCTAClick(heroContent.cta.secondary.action)}
                    className={styles.ctaSecondary}
                  >
                    {heroContent.cta.secondary.text}
                  </Button>
                </Box>
              </motion.div>

              {/* Trust Elements */}
              <motion.div variants={itemVariants}>
                <Box className={styles.trustElements}>
                  {heroContent.trustElements.map((element, index) => (
                    <Box key={index} className={styles.trustItem}>
                      <Icon className={styles.trustIcon}>{element.icon}</Icon>
                      <Typography variant="caption" className={styles.trustText}>
                        {element.text}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </motion.div>
            </motion.div>
          </Grid>

          {/* Form Side */}
          <Grid item xs={12} lg={5}>
            <motion.div
              variants={formVariants}
              initial="hidden"
              animate="visible"
              className={styles.formWrapper}
            >
              <Box className={styles.formContainer}>
                <LeadForm
                  source={heroContent.form.source}
                  title={heroContent.form.title}
                  subtitle={heroContent.form.subtitle}
                  variant="light"
                />
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </Container>

      {/* Scroll Indicator */}
      <motion.div
        className={styles.scrollIndicator}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 1.5,
          duration: 0.5,
          repeat: Infinity,
          repeatType: 'reverse',
          repeatDelay: 0.5,
        }}
      >
        <Icon>keyboard_arrow_down</Icon>
      </motion.div>
    </Box>
  );
};

export default Hero;
