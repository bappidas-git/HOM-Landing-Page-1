/**
 * ImageGallery Component
 * Image gallery with lightbox, masonry layout, and category filtering
 */

import { useState, useCallback, useMemo } from 'react';
import {
  Box,
  ImageList,
  ImageListItem,
  Dialog,
  IconButton,
  Typography,
  Tabs,
  Tab,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DownloadIcon from '@mui/icons-material/Download';
import ShareIcon from '@mui/icons-material/Share';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import clsx from 'clsx';
import styles from './ImageGallery.module.css';

/**
 * ImageGallery component
 * @param {Object} props - Component props
 * @param {Array} props.images - Array of image objects with src, alt, category, title
 * @param {Array} props.categories - Array of category strings
 * @param {number} props.columns - Number of columns (default: 3)
 * @param {number} props.gap - Gap between images in pixels (default: 16)
 * @param {boolean} props.showFilter - Whether to show category filter
 * @param {boolean} props.masonry - Whether to use masonry layout
 * @param {string} props.className - Additional CSS class
 */
const ImageGallery = ({
  images = [],
  categories = [],
  columns = 3,
  gap = 16,
  showFilter = true,
  masonry = true,
  className,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const [activeCategory, setActiveCategory] = useState('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  // Calculate responsive columns
  const responsiveCols = isMobile ? 1 : isTablet ? 2 : columns;

  // Filter images by category
  const filteredImages = useMemo(() => {
    if (activeCategory === 'all') return images;
    return images.filter((img) => img.category === activeCategory);
  }, [images, activeCategory]);

  // All categories including 'all'
  const allCategories = useMemo(() => {
    return ['all', ...categories];
  }, [categories]);

  // Handle category change
  const handleCategoryChange = useCallback((event, newValue) => {
    setActiveCategory(newValue);
  }, []);

  // Open lightbox
  const openLightbox = useCallback((index) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
    setIsZoomed(false);
  }, []);

  // Close lightbox
  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    setIsZoomed(false);
  }, []);

  // Navigate lightbox
  const navigateLightbox = useCallback((direction) => {
    setCurrentIndex((prev) => {
      const newIndex = prev + direction;
      if (newIndex < 0) return filteredImages.length - 1;
      if (newIndex >= filteredImages.length) return 0;
      return newIndex;
    });
    setIsZoomed(false);
  }, [filteredImages.length]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback((event) => {
    if (!lightboxOpen) return;

    switch (event.key) {
      case 'ArrowLeft':
        navigateLightbox(-1);
        break;
      case 'ArrowRight':
        navigateLightbox(1);
        break;
      case 'Escape':
        closeLightbox();
        break;
      default:
        break;
    }
  }, [lightboxOpen, navigateLightbox, closeLightbox]);

  // Toggle zoom
  const toggleZoom = useCallback(() => {
    setIsZoomed((prev) => !prev);
  }, []);

  // Handle download
  const handleDownload = useCallback(() => {
    const image = filteredImages[currentIndex];
    if (image?.src) {
      const link = document.createElement('a');
      link.href = image.src;
      link.download = image.title || `image-${currentIndex + 1}`;
      link.click();
    }
  }, [filteredImages, currentIndex]);

  // Handle share
  const handleShare = useCallback(async () => {
    const image = filteredImages[currentIndex];
    if (navigator.share && image) {
      try {
        await navigator.share({
          title: image.title || 'Gallery Image',
          text: image.alt || '',
          url: window.location.href,
        });
      } catch (error) {
        // Copy to clipboard as fallback
        await navigator.clipboard.writeText(window.location.href);
      }
    }
  }, [filteredImages, currentIndex]);

  // Animation variants
  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      transition: { delay: i * 0.05, duration: 0.3 },
    }),
  };

  return (
    <Box className={clsx(styles.gallery, className)} onKeyDown={handleKeyDown} tabIndex={0}>
      {/* Category Filter */}
      {showFilter && categories.length > 0 && (
        <Box className={styles.filterContainer}>
          <Tabs
            value={activeCategory}
            onChange={handleCategoryChange}
            variant="scrollable"
            scrollButtons="auto"
            className={styles.tabs}
          >
            {allCategories.map((category) => (
              <Tab
                key={category}
                value={category}
                label={category === 'all' ? 'All' : category}
                className={styles.tab}
              />
            ))}
          </Tabs>
        </Box>
      )}

      {/* Image Grid */}
      <ImageList
        variant={masonry ? 'masonry' : 'standard'}
        cols={responsiveCols}
        gap={gap}
        className={styles.imageList}
      >
        <AnimatePresence mode="wait">
          {filteredImages.map((image, index) => (
            <ImageListItem
              key={`${image.src}-${index}`}
              className={styles.imageItem}
              component={motion.div}
              custom={index}
              variants={imageVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              whileHover={{ scale: 1.02 }}
              onClick={() => openLightbox(index)}
            >
              <Box className={styles.imageWrapper}>
                <Image
                  src={image.src}
                  alt={image.alt || image.title || ''}
                  fill
                  sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
                  className={styles.image}
                />
                <Box className={styles.imageOverlay}>
                  <ZoomInIcon className={styles.zoomIcon} />
                  {image.title && (
                    <Typography variant="body2" className={styles.imageTitle}>
                      {image.title}
                    </Typography>
                  )}
                </Box>
              </Box>
            </ImageListItem>
          ))}
        </AnimatePresence>
      </ImageList>

      {/* Lightbox Dialog */}
      <Dialog
        open={lightboxOpen}
        onClose={closeLightbox}
        maxWidth={false}
        fullScreen
        className={styles.lightbox}
        PaperProps={{ className: styles.lightboxPaper }}
      >
        {/* Close Button */}
        <IconButton
          onClick={closeLightbox}
          className={styles.lightboxClose}
          aria-label="Close"
        >
          <CloseIcon />
        </IconButton>

        {/* Navigation Buttons */}
        <IconButton
          onClick={() => navigateLightbox(-1)}
          className={clsx(styles.navButton, styles.prevButton)}
          aria-label="Previous"
        >
          <ChevronLeftIcon />
        </IconButton>

        <IconButton
          onClick={() => navigateLightbox(1)}
          className={clsx(styles.navButton, styles.nextButton)}
          aria-label="Next"
        >
          <ChevronRightIcon />
        </IconButton>

        {/* Lightbox Content */}
        <Box
          className={clsx(styles.lightboxContent, { [styles.zoomed]: isZoomed })}
          onClick={toggleZoom}
        >
          <AnimatePresence mode="wait">
            {filteredImages[currentIndex] && (
              <motion.div
                key={currentIndex}
                className={styles.lightboxImageWrapper}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <Image
                  src={filteredImages[currentIndex].src}
                  alt={filteredImages[currentIndex].alt || ''}
                  fill
                  sizes="100vw"
                  className={styles.lightboxImage}
                  priority
                />
              </motion.div>
            )}
          </AnimatePresence>
        </Box>

        {/* Lightbox Footer */}
        <Box className={styles.lightboxFooter}>
          <Box className={styles.lightboxInfo}>
            <Typography variant="body1" className={styles.lightboxTitle}>
              {filteredImages[currentIndex]?.title || `Image ${currentIndex + 1}`}
            </Typography>
            <Typography variant="caption" className={styles.lightboxCounter}>
              {currentIndex + 1} / {filteredImages.length}
            </Typography>
          </Box>

          <Box className={styles.lightboxActions}>
            <IconButton
              onClick={handleDownload}
              className={styles.actionButton}
              aria-label="Download"
            >
              <DownloadIcon />
            </IconButton>
            <IconButton
              onClick={handleShare}
              className={styles.actionButton}
              aria-label="Share"
            >
              <ShareIcon />
            </IconButton>
          </Box>
        </Box>
      </Dialog>
    </Box>
  );
};

export default ImageGallery;
