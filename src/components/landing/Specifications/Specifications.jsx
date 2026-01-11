/**
 * Specifications Section Component
 * Premium specifications with accordion layout
 */

import { useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import { motion } from 'framer-motion';
import Icon from '@mui/material/Icon';
import SectionWrapper from '@/components/common/SectionWrapper';
import SectionTitle from '@/components/common/SectionTitle';
import { useUIContext } from '@/context/UIContext';
import { specificationsContent } from '@/data/content/specifications';
import styles from './Specifications.module.css';

const Specifications = () => {
  const [expanded, setExpanded] = useState('structure');
  const { openPopup } = useUIContext();

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <SectionWrapper
      id={specificationsContent.sectionId}
      background="default"
      paddingY="large"
    >
      <SectionTitle
        title={specificationsContent.title}
        subtitle={specificationsContent.subtitle}
        align="center"
        showDecoration={true}
        decorationType="line"
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Premium Features Highlight */}
        <motion.div variants={itemVariants}>
          <Box className={styles.featuresSection}>
            <Grid container spacing={3}>
              {specificationsContent.premiumFeatures.map((feature, index) => (
                <Grid item xs={6} sm={3} key={index}>
                  <Box className={styles.featureCard}>
                    <Box className={styles.featureIcon}>
                      <Icon>{feature.icon}</Icon>
                    </Box>
                    <Typography variant="subtitle1" className={styles.featureTitle}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" className={styles.featureDescription}>
                      {feature.description}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </motion.div>

        {/* Specifications Accordion */}
        <motion.div variants={itemVariants}>
          <Box className={styles.accordionSection}>
            {specificationsContent.categories.map((category) => (
              <Accordion
                key={category.id}
                expanded={expanded === category.id}
                onChange={handleChange(category.id)}
                className={styles.accordion}
              >
                <AccordionSummary
                  expandIcon={<Icon>expand_more</Icon>}
                  className={styles.accordionSummary}
                >
                  <Box className={styles.accordionHeader}>
                    <Box className={styles.categoryIcon}>
                      <Icon>{category.icon}</Icon>
                    </Box>
                    <Typography variant="subtitle1" className={styles.categoryTitle}>
                      {category.title}
                    </Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails className={styles.accordionDetails}>
                  <Box className={styles.specificationsList}>
                    {category.specifications.map((spec, index) => (
                      <Box key={index} className={styles.specificationItem}>
                        <Typography variant="subtitle2" className={styles.specItem}>
                          {spec.item}
                        </Typography>
                        <Typography variant="body2" className={styles.specDescription}>
                          {spec.description}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        </motion.div>

        {/* Disclaimer */}
        <Typography variant="body2" className={styles.disclaimer}>
          {specificationsContent.disclaimer}
        </Typography>

        {/* CTA */}
        <Box className={styles.ctaWrapper}>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            startIcon={<Icon>download</Icon>}
            onClick={() => openPopup('brochure')}
            className={styles.ctaButton}
          >
            {specificationsContent.cta.text}
          </Button>
        </Box>
      </motion.div>
    </SectionWrapper>
  );
};

export default Specifications;
