/**
 * Floor Plans Section Component
 * Floor plans with category filter and detailed cards
 */

import { useState, useMemo } from 'react';
import { Box, Grid, Typography, Tabs, Tab, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import Icon from '@mui/material/Icon';
import SectionWrapper from '@/components/common/SectionWrapper';
import SectionTitle from '@/components/common/SectionTitle';
import FloorPlanCard from './FloorPlanCard';
import {
  floorPlansContent,
  getFloorPlansByCategory,
} from '@/data/content/floorPlans';
import styles from './FloorPlans.module.css';

const FloorPlans = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  // Filter floor plans based on category
  const filteredFloorPlans = useMemo(() => {
    return getFloorPlansByCategory(activeCategory);
  }, [activeCategory]);

  const handleCategoryChange = (event, newValue) => {
    setActiveCategory(newValue);
  };

  return (
    <SectionWrapper
      id={floorPlansContent.sectionId}
      background="default"
      paddingY="large"
    >
      <SectionTitle
        title={floorPlansContent.title}
        subtitle={floorPlansContent.subtitle}
        align="center"
        showDecoration={true}
        decorationType="line"
      />

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <Box className={styles.quickStats}>
          <Box className={styles.statItem}>
            <Icon className={styles.statIcon}>apartment</Icon>
            <Typography variant="h6">7 Unit Types</Typography>
            <Typography variant="caption">To Choose From</Typography>
          </Box>
          <Box className={styles.statItem}>
            <Icon className={styles.statIcon}>square_foot</Icon>
            <Typography variant="h6">1,245 - 2,995 sq.ft</Typography>
            <Typography variant="caption">Super Built-Up Area</Typography>
          </Box>
          <Box className={styles.statItem}>
            <Icon className={styles.statIcon}>currency_rupee</Icon>
            <Typography variant="h6">₹1.24 Cr - ₹2.99 Cr</Typography>
            <Typography variant="caption">Price Range</Typography>
          </Box>
        </Box>
      </motion.div>

      {/* Category Tabs */}
      <Box className={styles.filterSection}>
        <Tabs
          value={activeCategory}
          onChange={handleCategoryChange}
          centered
          className={styles.tabs}
        >
          {floorPlansContent.categories.map((category) => (
            <Tab
              key={category.id}
              value={category.id}
              label={
                <Box className={styles.tabContent}>
                  <span>{category.label}</span>
                  <Chip
                    label={category.count}
                    size="small"
                    className={styles.countChip}
                  />
                </Box>
              }
              className={styles.tab}
            />
          ))}
        </Tabs>
      </Box>

      {/* Floor Plans Grid */}
      <Grid container spacing={3} className={styles.floorPlansGrid}>
        {filteredFloorPlans.map((plan, index) => (
          <Grid item xs={12} sm={6} lg={4} key={plan.id}>
            <FloorPlanCard plan={plan} index={index} />
          </Grid>
        ))}
      </Grid>

      {/* Disclaimer */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <Typography variant="caption" className={styles.disclaimer}>
          {floorPlansContent.disclaimer}
        </Typography>
      </motion.div>
    </SectionWrapper>
  );
};

export default FloorPlans;
