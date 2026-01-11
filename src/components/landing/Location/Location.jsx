/**
 * Location Section Component
 * Project location with map and nearby landmarks
 */

import { useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  Button,
  Tabs,
  Tab,
  Chip,
} from '@mui/material';
import { motion } from 'framer-motion';
import Icon from '@mui/material/Icon';
import SectionWrapper from '@/components/common/SectionWrapper';
import SectionTitle from '@/components/common/SectionTitle';
import { useUIContext } from '@/context/UIContext';
import { locationContent, getAllLandmarks } from '@/data/content/location';
import styles from './Location.module.css';

const Location = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const { openPopup } = useUIContext();

  const landmarkCategories = [
    { id: 'all', label: 'All', icon: 'apps' },
    { id: 'itParks', label: 'IT Parks', icon: 'business' },
    { id: 'schools', label: 'Schools', icon: 'school' },
    { id: 'hospitals', label: 'Hospitals', icon: 'local_hospital' },
    { id: 'shopping', label: 'Shopping', icon: 'shopping_cart' },
  ];

  const getLandmarks = () => {
    if (activeCategory === 'all') {
      return getAllLandmarks();
    }
    return locationContent.landmarks[activeCategory]?.items.map((item) => ({
      ...item,
      category: locationContent.landmarks[activeCategory].title,
      icon: locationContent.landmarks[activeCategory].icon,
    })) || [];
  };

  const handleCategoryChange = (event, newValue) => {
    setActiveCategory(newValue);
  };

  const handleDirections = () => {
    const { latitude, longitude } = locationContent.map;
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`,
      '_blank'
    );
  };

  const handleSiteVisit = () => {
    openPopup('sitevisit');
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
      id={locationContent.sectionId}
      background="default"
      paddingY="large"
    >
      <SectionTitle
        title={locationContent.title}
        subtitle={locationContent.subtitle}
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
        <Grid container spacing={4}>
          <Grid item xs={12} md={7}>
            <motion.div variants={itemVariants}>
              <Box className={styles.mapContainer}>
                <iframe
                  src={locationContent.map.embedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Nambiar District 25 Location"
                  className={styles.mapFrame}
                />
                <Box className={styles.mapOverlay}>
                  <Box className={styles.addressCard}>
                    <Icon className={styles.addressIcon}>location_on</Icon>
                    <Box>
                      <Typography variant="subtitle2" className={styles.addressLabel}>
                        Project Location
                      </Typography>
                      <Typography variant="body2" className={styles.addressText}>
                        {locationContent.address.full}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>

              <Box className={styles.mapActions}>
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<Icon>directions</Icon>}
                  onClick={handleDirections}
                  className={styles.directionButton}
                >
                  Get Directions
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  startIcon={<Icon>calendar_today</Icon>}
                  onClick={handleSiteVisit}
                  className={styles.visitButton}
                >
                  Schedule Site Visit
                </Button>
              </Box>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={5}>
            <motion.div variants={itemVariants}>
              <Box className={styles.keyDistances}>
                <Typography variant="h6" className={styles.sectionSubtitle}>
                  Key Distances
                </Typography>
                <Box className={styles.distanceList}>
                  {locationContent.keyDistances.map((item) => (
                    <Box
                      key={item.id}
                      className={`${styles.distanceItem} ${
                        item.highlight ? styles.highlighted : ''
                      }`}
                    >
                      <Box className={styles.distanceIcon}>
                        <Icon>{item.icon}</Icon>
                      </Box>
                      <Box className={styles.distanceInfo}>
                        <Typography variant="body2" className={styles.distanceName}>
                          {item.name}
                        </Typography>
                        <Typography variant="body2" className={styles.distanceValue}>
                          {item.distance}
                        </Typography>
                      </Box>
                      {item.highlight && (
                        <Chip
                          label="Upcoming"
                          size="small"
                          className={styles.highlightChip}
                        />
                      )}
                    </Box>
                  ))}
                </Box>
              </Box>

              <Box className={styles.investmentHighlight}>
                <Box className={styles.investmentIcon}>
                  <Icon>trending_up</Icon>
                </Box>
                <Box>
                  <Typography variant="h4" className={styles.investmentValue}>
                    {locationContent.investmentHighlight.priceAppreciation}
                  </Typography>
                  <Typography variant="subtitle2" className={styles.investmentLabel}>
                    Price Appreciation {locationContent.investmentHighlight.period}
                  </Typography>
                  <Typography variant="body2" className={styles.investmentDescription}>
                    {locationContent.investmentHighlight.description}
                  </Typography>
                </Box>
              </Box>
            </motion.div>
          </Grid>
        </Grid>

        <Box className={styles.connectivitySection}>
          <Typography variant="h6" className={styles.sectionSubtitle}>
            Excellent Connectivity
          </Typography>
          <Grid container spacing={3}>
            {locationContent.connectivity.map((item, index) => (
              <Grid item xs={6} sm={3} key={index}>
                <motion.div variants={itemVariants}>
                  <Box className={styles.connectivityCard}>
                    <Box className={styles.connectivityIcon}>
                      <Icon>{item.icon}</Icon>
                    </Box>
                    <Typography variant="subtitle2" className={styles.connectivityTitle}>
                      {item.title}
                    </Typography>
                    <Typography variant="body2" className={styles.connectivityDescription}>
                      {item.description}
                    </Typography>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box className={styles.landmarksSection}>
          <Typography variant="h6" className={styles.sectionSubtitle}>
            Nearby Landmarks
          </Typography>

          <Tabs
            value={activeCategory}
            onChange={handleCategoryChange}
            variant="scrollable"
            scrollButtons="auto"
            className={styles.tabs}
          >
            {landmarkCategories.map((category) => (
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

          <Grid container spacing={2} className={styles.landmarksGrid}>
            {getLandmarks().map((landmark, index) => (
              <Grid item xs={6} sm={4} md={3} key={index}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.03 }}
                >
                  <Box className={styles.landmarkCard}>
                    <Icon className={styles.landmarkIcon}>{landmark.icon}</Icon>
                    <Typography variant="body2" className={styles.landmarkName}>
                      {landmark.name}
                    </Typography>
                    <Typography variant="caption" className={styles.landmarkDistance}>
                      {landmark.distance}
                    </Typography>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box className={styles.ctaWrapper}>
          <Typography variant="body1" className={styles.ctaText}>
            Experience the strategic location advantage of District 25.
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            startIcon={<Icon>directions_car</Icon>}
            onClick={handleSiteVisit}
            className={styles.ctaButton}
          >
            Book Free Site Visit with Pickup
          </Button>
        </Box>
      </motion.div>
    </SectionWrapper>
  );
};

export default Location;
