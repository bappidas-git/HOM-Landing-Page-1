/**
 * Gallery Section Component
 * Project gallery with category filter and lightbox
 */

import { useState, useMemo } from 'react';
import {
  Box,
  Grid,
  Typography,
  Button,
  Tabs,
  Tab,
  Dialog,
  DialogContent,
  IconButton,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '@mui/material/Icon';
import SectionWrapper from '@/components/common/SectionWrapper';
import SectionTitle from '@/components/common/SectionTitle';
import { useUIContext } from '@/context/UIContext';
import {
  galleryContent,
  getImagesByCategory,
  getFeaturedImages,
} from '@/data/content/gallery';
import styles from './Gallery.module.css';

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [showAll, setShowAll] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { openPopup } = useUIContext();

  // Filter images based on category
  const filteredImages = useMemo(() => {
    return getImagesByCategory(activeCategory);
  }, [activeCategory]);

  // Displayed images based on showAll state
  const displayedImages = showAll
    ? filteredImages
    : filteredImages.slice(0, galleryContent.displayConfig.initialDisplayCount);

  const handleCategoryChange = (event, newValue) => {
    setActiveCategory(newValue);
    setShowAll(false);
  };

  const handleImageClick = (index) => {
    if (galleryContent.displayConfig.enableLightbox) {
      setCurrentImageIndex(index);
      setLightboxOpen(true);
    }
  };

  const handleCloseLightbox = () => {
    setLightboxOpen(false);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? filteredImages.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === filteredImages.length - 1 ? 0 : prev + 1
    );
  };

  const handleCTAClick = () => {
    openPopup(galleryContent.cta.action);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      transition: { duration: 0.2 },
    },
  };

  return (
    <SectionWrapper
      id={galleryContent.sectionId}
      background="default"
      paddingY="large"
    >
      <SectionTitle
        title={galleryContent.title}
        subtitle={galleryContent.subtitle}
        align="center"
        showDecoration={true}
        decorationType="line"
      />

      {/* Category Tabs */}
      <Box className={styles.filterControls}>
        <Tabs
          value={activeCategory}
          onChange={handleCategoryChange}
          variant="scrollable"
          scrollButtons="auto"
          className={styles.tabs}
        >
          {galleryContent.categories.map((category) => (
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
      </Box>

      {/* Gallery Grid */}
      <motion.div
        key={activeCategory}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Grid container spacing={2} className={styles.galleryGrid}>
          <AnimatePresence mode="popLayout">
            {displayedImages.map((image, index) => (
              <Grid
                item
                xs={6}
                sm={4}
                md={index === 0 || index === 5 ? 6 : 3}
                key={image.id}
              >
                <motion.div
                  variants={itemVariants}
                  layout
                  exit="exit"
                  className={styles.imageWrapper}
                >
                  <Box
                    className={`${styles.galleryCard} ${
                      image.featured ? styles.featured : ''
                    }`}
                    onClick={() => handleImageClick(index)}
                  >
                    <Box
                      className={styles.imageContainer}
                      sx={{
                        backgroundImage: `url(${image.src})`,
                      }}
                    >
                      <Box className={styles.overlay}>
                        <Icon className={styles.zoomIcon}>zoom_in</Icon>
                        <Typography className={styles.imageTitle}>
                          {image.title}
                        </Typography>
                      </Box>
                    </Box>
                    {image.featured && (
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
      {filteredImages.length > galleryContent.displayConfig.initialDisplayCount && (
        <Box className={styles.showMoreWrapper}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => setShowAll(!showAll)}
            endIcon={<Icon>{showAll ? 'expand_less' : 'expand_more'}</Icon>}
            className={styles.showMoreButton}
          >
            {showAll
              ? 'Show Less'
              : `${galleryContent.displayConfig.showAllText} (${filteredImages.length})`}
          </Button>
        </Box>
      )}

      {/* CTA Button */}
      <Box className={styles.ctaWrapper}>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          startIcon={<Icon>{galleryContent.cta.icon}</Icon>}
          onClick={handleCTAClick}
          className={styles.ctaButton}
        >
          {galleryContent.cta.text}
        </Button>
      </Box>

      {/* Lightbox Dialog */}
      <Dialog
        open={lightboxOpen}
        onClose={handleCloseLightbox}
        maxWidth="lg"
        fullWidth
        className={styles.lightboxDialog}
        PaperProps={{
          className: styles.lightboxPaper,
        }}
      >
        <DialogContent className={styles.lightboxContent}>
          <IconButton
            onClick={handleCloseLightbox}
            className={styles.closeButton}
          >
            <Icon>close</Icon>
          </IconButton>

          <IconButton
            onClick={handlePrevImage}
            className={`${styles.navButton} ${styles.prevButton}`}
          >
            <Icon>chevron_left</Icon>
          </IconButton>

          <IconButton
            onClick={handleNextImage}
            className={`${styles.navButton} ${styles.nextButton}`}
          >
            <Icon>chevron_right</Icon>
          </IconButton>

          {filteredImages[currentImageIndex] && (
            <Box className={styles.lightboxImageWrapper}>
              <Box
                component="img"
                src={filteredImages[currentImageIndex].src}
                alt={filteredImages[currentImageIndex].title}
                className={styles.lightboxImage}
                onError={(e) => {
                  e.target.src = '/images/placeholder/gallery-placeholder.jpg';
                }}
              />
              <Box className={styles.lightboxCaption}>
                <Typography variant="h6" className={styles.lightboxTitle}>
                  {filteredImages[currentImageIndex].title}
                </Typography>
                <Typography variant="body2" className={styles.lightboxDescription}>
                  {filteredImages[currentImageIndex].description}
                </Typography>
                <Typography variant="caption" className={styles.imageCounter}>
                  {currentImageIndex + 1} / {filteredImages.length}
                </Typography>
              </Box>
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </SectionWrapper>
  );
};

export default Gallery;
