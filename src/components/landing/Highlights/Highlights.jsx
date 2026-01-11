/**
 * Highlights Section Component
 * Key project highlights with animated cards
 */

import { Box, Grid, Typography, Button, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import Icon from '@mui/material/Icon';
import SectionWrapper from '@/components/common/SectionWrapper';
import SectionTitle from '@/components/common/SectionTitle';
import AnimatedCard from '@/components/common/AnimatedCard';
import { highlightsContent } from '@/data/content/highlights';
import styles from './Highlights.module.css';

const Highlights = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: highlightsContent.animation.staggerDelay,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: highlightsContent.animation.fadeInDuration,
        ease: 'easeOut',
      },
    },
  };

  const iconMap = {
    home: 'home',
    security: 'security',
    map: 'map',
    favorite: 'favorite',
    star: 'star',
    eco: 'eco',
  };

  return (
    <SectionWrapper
      id={highlightsContent.sectionId}
      background="default"
      paddingY="large"
    >
      <SectionTitle
        title={highlightsContent.title}
        subtitle={highlightsContent.subtitle}
        align="center"
        showDecoration={true}
        decorationType="line"
      />

      {/* Highlight Cards Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <Grid container spacing={3} className={styles.highlightsGrid}>
          {highlightsContent.highlights.map((highlight, index) => (
            <Grid item xs={12} sm={6} md={4} key={highlight.id}>
              <motion.div variants={cardVariants}>
                <Box className={styles.highlightCard}>
                  <Box className={styles.iconWrapper}>
                    <Icon className={styles.icon}>
                      {iconMap[highlight.icon] || highlight.icon}
                    </Icon>
                  </Box>
                  <Typography variant="h5" className={styles.cardTitle}>
                    {highlight.title}
                  </Typography>
                  <Typography variant="body2" className={styles.cardDescription}>
                    {highlight.description}
                  </Typography>
                </Box>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </motion.div>

      {/* Additional Features Strip */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <Box className={styles.featuresStrip}>
          {highlightsContent.additionalFeatures.map((feature, index) => (
            <Chip
              key={index}
              icon={<Icon>{feature.icon}</Icon>}
              label={feature.text}
              variant="outlined"
              className={styles.featureChip}
            />
          ))}
        </Box>
      </motion.div>

      {/* CTA Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className={styles.ctaWrapper}
      >
        <Button
          variant="contained"
          color="secondary"
          size="large"
          endIcon={<Icon>{highlightsContent.cta.icon}</Icon>}
          href={highlightsContent.cta.href}
          className={styles.ctaButton}
        >
          {highlightsContent.cta.text}
        </Button>
      </motion.div>
    </SectionWrapper>
  );
};

export default Highlights;
