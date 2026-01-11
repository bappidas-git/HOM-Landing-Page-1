/**
 * FloorPlanCard Component
 * Individual floor plan card with details and CTA
 */

import { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Chip,
  IconButton,
  Dialog,
  DialogContent,
} from '@mui/material';
import { motion } from 'framer-motion';
import Icon from '@mui/material/Icon';
import { useUIContext } from '@/context/UIContext';
import styles from './FloorPlans.module.css';

const FloorPlanCard = ({ plan, index }) => {
  const [imageOpen, setImageOpen] = useState(false);
  const { openPopup } = useUIContext();

  const handleDownload = () => {
    openPopup('brochure');
  };

  const handlePriceQuote = () => {
    openPopup('pricing');
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1, duration: 0.5 }}
        className={styles.cardWrapper}
      >
        <Box className={styles.floorPlanCard}>
          {/* Featured Badge */}
          {plan.featured && (
            <Chip
              label="Popular"
              size="small"
              className={styles.popularBadge}
            />
          )}

          {/* Floor Plan Image */}
          <Box
            className={styles.imageContainer}
            onClick={() => setImageOpen(true)}
          >
            <img
              src={plan.floorPlanImage || plan.image}
              alt={`${plan.name} Floor Plan`}
              className={styles.floorPlanImage}
            />
            <Box className={styles.imageOverlay}>
              <Icon>zoom_in</Icon>
              <Typography variant="caption">Click to enlarge</Typography>
            </Box>
          </Box>

          {/* Content */}
          <Box className={styles.cardContent}>
            {/* Type Badge */}
            <Chip
              label={plan.type}
              size="small"
              color="secondary"
              className={styles.typeBadge}
            />

            {/* Title */}
            <Typography variant="h5" className={styles.planTitle}>
              {plan.name}
            </Typography>

            {/* Tower Info */}
            <Typography variant="body2" className={styles.towerInfo}>
              {plan.tower} | {plan.unitDistribution}
            </Typography>

            {/* Area Details */}
            <Box className={styles.areaGrid}>
              <Box className={styles.areaItem}>
                <Typography variant="caption" className={styles.areaLabel}>
                  Carpet Area
                </Typography>
                <Typography variant="body1" className={styles.areaValue}>
                  {plan.area.carpet.sqft.toLocaleString()} sq.ft
                </Typography>
              </Box>
              <Box className={styles.areaItem}>
                <Typography variant="caption" className={styles.areaLabel}>
                  Super Built-Up
                </Typography>
                <Typography variant="body1" className={styles.areaValue}>
                  {plan.area.sba.sqft.toLocaleString()} sq.ft
                </Typography>
              </Box>
            </Box>

            {/* Configuration */}
            <Box className={styles.configGrid}>
              <Box className={styles.configItem}>
                <Icon>bed</Icon>
                <Typography variant="body2">
                  {plan.bedrooms} Bedrooms
                </Typography>
              </Box>
              <Box className={styles.configItem}>
                <Icon>bathroom</Icon>
                <Typography variant="body2">
                  {plan.bathrooms} Bathrooms
                </Typography>
              </Box>
              {plan.balconies && (
                <Box className={styles.configItem}>
                  <Icon>balcony</Icon>
                  <Typography variant="body2">
                    {plan.balconies} Balcon{plan.balconies > 1 ? 'ies' : 'y'}
                  </Typography>
                </Box>
              )}
            </Box>

            {/* Key Features */}
            <Box className={styles.keyFeatures}>
              <Typography variant="subtitle2" className={styles.featuresLabel}>
                Key Dimensions
              </Typography>
              <ul className={styles.featuresList}>
                {plan.keyFeatures.slice(0, 3).map((feature, idx) => (
                  <li key={idx}>
                    <Typography variant="caption">{feature}</Typography>
                  </li>
                ))}
              </ul>
            </Box>

            {/* Highlights */}
            <Box className={styles.highlightsChips}>
              {plan.highlights.slice(0, 3).map((highlight, idx) => (
                <Chip
                  key={idx}
                  label={highlight}
                  size="small"
                  variant="outlined"
                  className={styles.highlightChip}
                />
              ))}
            </Box>

            {/* Price */}
            <Box className={styles.priceSection}>
              <Typography variant="caption" className={styles.priceLabel}>
                Starting From
              </Typography>
              <Typography variant="h4" className={styles.priceValue}>
                {plan.startingPrice}*
              </Typography>
            </Box>

            {/* Actions */}
            <Box className={styles.cardActions}>
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                startIcon={<Icon>download</Icon>}
                onClick={handleDownload}
                className={styles.downloadBtn}
              >
                Download Plan
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                fullWidth
                startIcon={<Icon>request_quote</Icon>}
                onClick={handlePriceQuote}
                className={styles.quoteBtn}
              >
                Get Quote
              </Button>
            </Box>
          </Box>
        </Box>
      </motion.div>

      {/* Image Dialog */}
      <Dialog
        open={imageOpen}
        onClose={() => setImageOpen(false)}
        maxWidth="lg"
        fullWidth
      >
        <DialogContent className={styles.dialogContent}>
          <IconButton
            onClick={() => setImageOpen(false)}
            className={styles.closeButton}
          >
            <Icon>close</Icon>
          </IconButton>
          <img
            src={plan.floorPlanImage || plan.image}
            alt={`${plan.name} Floor Plan`}
            className={styles.dialogImage}
          />
          <Box className={styles.dialogInfo}>
            <Typography variant="h6">{plan.name}</Typography>
            <Typography variant="body2">
              Carpet: {plan.area.carpet.sqft.toLocaleString()} sq.ft |
              SBA: {plan.area.sba.sqft.toLocaleString()} sq.ft
            </Typography>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FloorPlanCard;
