/**
 * Amenities Section Component
 * 74+ amenities with category filter and search
 */

import { useState, useMemo } from 'react';
import {
  Box,
  Grid,
  Typography,
  Button,
  Tabs,
  Tab,
  TextField,
  InputAdornment,
  Collapse,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '@mui/material/Icon';
import SectionWrapper from '@/components/common/SectionWrapper';
import SectionTitle from '@/components/common/SectionTitle';
import { useUIContext } from '@/context/UIContext';
import {
  amenitiesContent,
  getAllAmenities,
  getAmenitiesByCategory,
} from '@/data/content/amenities';
import styles from './Amenities.module.css';

const Amenities = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAll, setShowAll] = useState(false);
  const { openPopup } = useUIContext();

  const allAmenities = getAllAmenities();

  // Filter amenities based on category and search
  const filteredAmenities = useMemo(() => {
    let amenities = getAmenitiesByCategory(activeCategory);

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      amenities = amenities.filter((amenity) =>
        amenity.name.toLowerCase().includes(query)
      );
    }

    return amenities;
  }, [activeCategory, searchQuery]);

  // Determine displayed amenities based on showAll state
  const displayedAmenities = showAll
    ? filteredAmenities
    : filteredAmenities.slice(0, amenitiesContent.displayConfig.initialDisplayCount);

  const handleCategoryChange = (event, newValue) => {
    setActiveCategory(newValue);
    setShowAll(false);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setShowAll(false);
  };

  const handleCTAClick = () => {
    openPopup(amenitiesContent.cta.action);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3, ease: 'easeOut' },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      transition: { duration: 0.2 },
    },
  };

  return (
    <SectionWrapper
      id={amenitiesContent.sectionId}
      background="paper"
      paddingY="large"
    >
      <SectionTitle
        title={amenitiesContent.title}
        subtitle={amenitiesContent.subtitle}
        align="center"
        showDecoration={true}
        decorationType="line"
      />

      {/* Featured Amenities */}
      <Box className={styles.featuredSection}>
        <Grid container spacing={3}>
          {amenitiesContent.featuredAmenities.slice(0, 6).map((amenity, index) => (
            <Grid item xs={6} sm={4} md={2} key={amenity.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Box className={styles.featuredCard}>
                  <Box className={styles.featuredIconWrapper}>
                    <Icon className={styles.featuredIcon}>{amenity.icon}</Icon>
                  </Box>
                  <Typography variant="subtitle2" className={styles.featuredName}>
                    {amenity.name}
                  </Typography>
                </Box>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Filter Controls */}
      <Box className={styles.filterControls}>
        {/* Category Tabs */}
        <Tabs
          value={activeCategory}
          onChange={handleCategoryChange}
          variant="scrollable"
          scrollButtons="auto"
          className={styles.tabs}
        >
          {amenitiesContent.categories.map((category) => (
            <Tab
              key={category.id}
              value={category.id}
              icon={<Icon>{category.icon}</Icon>}
              label={category.label}
              iconPosition="start"
              className={styles.tab}
            />
          ))}
        </Tabs>

        {/* Search */}
        {amenitiesContent.displayConfig.enableSearch && (
          <TextField
            size="small"
            placeholder={amenitiesContent.displayConfig.searchPlaceholder}
            value={searchQuery}
            onChange={handleSearchChange}
            className={styles.searchField}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Icon>search</Icon>
                </InputAdornment>
              ),
            }}
          />
        )}
      </Box>

      {/* Amenities Grid */}
      <motion.div
        key={`${activeCategory}-${searchQuery}`}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Grid container spacing={2} className={styles.amenitiesGrid}>
          <AnimatePresence mode="popLayout">
            {displayedAmenities.map((amenity) => (
              <Grid item xs={6} sm={4} md={3} lg={2} key={amenity.id}>
                <motion.div
                  variants={itemVariants}
                  layout
                  exit="exit"
                >
                  <Box
                    className={`${styles.amenityCard} ${
                      amenity.featured ? styles.featured : ''
                    }`}
                  >
                    <Icon className={styles.amenityIcon}>{amenity.icon}</Icon>
                    <Typography variant="body2" className={styles.amenityName}>
                      {amenity.name}
                    </Typography>
                    {amenity.featured && (
                      <Box className={styles.featuredBadge}>
                        <Icon>star</Icon>
                      </Box>
                    )}
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </AnimatePresence>
        </Grid>
      </motion.div>

      {/* Show More/Less Button */}
      {filteredAmenities.length > amenitiesContent.displayConfig.initialDisplayCount && (
        <Box className={styles.showMoreWrapper}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => setShowAll(!showAll)}
            endIcon={<Icon>{showAll ? 'expand_less' : 'expand_more'}</Icon>}
            className={styles.showMoreButton}
          >
            {showAll
              ? amenitiesContent.displayConfig.showLessText
              : `${amenitiesContent.displayConfig.showAllText} (${filteredAmenities.length})`}
          </Button>
        </Box>
      )}

      {/* Results Count */}
      {searchQuery && (
        <Typography variant="body2" className={styles.resultsCount}>
          Found {filteredAmenities.length} amenities matching "{searchQuery}"
        </Typography>
      )}

      {/* CTA Button */}
      <Box className={styles.ctaWrapper}>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          startIcon={<Icon>{amenitiesContent.cta.icon}</Icon>}
          onClick={handleCTAClick}
          className={styles.ctaButton}
        >
          {amenitiesContent.cta.text}
        </Button>
      </Box>
    </SectionWrapper>
  );
};

export default Amenities;
