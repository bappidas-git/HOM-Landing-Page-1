/**
 * Overview Section Component
 * Project overview with stats and description
 */

import { useState, useEffect, useRef } from 'react';
import { Box, Container, Grid, Typography, Button } from '@mui/material';
import { motion, useInView } from 'framer-motion';
import Icon from '@mui/material/Icon';
import SectionWrapper from '@/components/common/SectionWrapper';
import SectionTitle from '@/components/common/SectionTitle';
import { overviewContent } from '@/data/content/overview';
import styles from './Overview.module.css';

// Animated Counter Component
const AnimatedCounter = ({ value, suffix, isInView }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value, isInView]);

  return (
    <span>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
};

const Overview = () => {
  const statsRef = useRef(null);
  const isInView = useInView(statsRef, { once: true, amount: 0.3 });

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <SectionWrapper
      id={overviewContent.sectionId}
      background="paper"
      paddingY="large"
    >
      <Grid container spacing={6} alignItems="center">
        {/* Image Side */}
        <Grid item xs={12} md={6}>
          <motion.div
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className={styles.imageWrapper}
          >
            <Box className={styles.imageContainer}>
              <img
                src={overviewContent.image.src}
                alt={overviewContent.image.alt}
                className={styles.image}
              />
              <Box className={styles.imageCaption}>
                <Typography variant="caption">
                  {overviewContent.image.caption}
                </Typography>
              </Box>
            </Box>
            {/* Decorative Elements */}
            <Box className={styles.decorativeBox} />
          </motion.div>
        </Grid>

        {/* Content Side */}
        <Grid item xs={12} md={6}>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className={styles.content}
          >
            <SectionTitle
              title={overviewContent.title}
              subtitle={overviewContent.subtitle}
              align="left"
              showDecoration={true}
              decorationType="line"
            />

            {/* Description */}
            <Box className={styles.description}>
              {overviewContent.description.map((paragraph, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Typography
                    variant="body1"
                    className={styles.paragraph}
                    sx={{
                      fontStyle: index === 1 ? 'italic' : 'normal',
                      fontWeight: index === 1 ? 500 : 400,
                    }}
                  >
                    {paragraph}
                  </Typography>
                </motion.div>
              ))}
            </Box>

            {/* CTA Button */}
            <motion.div variants={itemVariants}>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                endIcon={<Icon>{overviewContent.cta.icon}</Icon>}
                href={overviewContent.cta.href}
                className={styles.ctaButton}
              >
                {overviewContent.cta.text}
              </Button>
            </motion.div>
          </motion.div>
        </Grid>
      </Grid>

      {/* Stats Section */}
      <Box className={styles.statsSection} ref={statsRef}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <Grid container spacing={3} className={styles.statsGrid}>
            {overviewContent.stats.map((stat, index) => (
              <Grid item xs={6} sm={4} md={2} key={stat.id}>
                <motion.div variants={itemVariants}>
                  <Box className={styles.statCard}>
                    <Icon className={styles.statIcon}>{stat.icon}</Icon>
                    <Typography variant="h3" className={styles.statValue}>
                      <AnimatedCounter
                        value={stat.value}
                        suffix={stat.suffix}
                        isInView={isInView}
                      />
                    </Typography>
                    <Typography variant="subtitle1" className={styles.statLabel}>
                      {stat.label}
                    </Typography>
                    <Typography variant="caption" className={styles.statDesc}>
                      {stat.description}
                    </Typography>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Box>

      {/* Key Features */}
      <Box className={styles.keyFeatures}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <Grid container spacing={3}>
            {overviewContent.keyFeatures.map((feature, index) => (
              <Grid item xs={12} md={4} key={index}>
                <motion.div variants={itemVariants}>
                  <Box className={styles.featureCard}>
                    <Icon className={styles.featureIcon}>{feature.icon}</Icon>
                    <Typography variant="h6" className={styles.featureTitle}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" className={styles.featureDesc}>
                      {feature.description}
                    </Typography>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Box>
    </SectionWrapper>
  );
};

export default Overview;
