/**
 * Virtual Tour Section Component
 * 360° virtual tour and video gallery
 */

import { useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogContent,
  IconButton,
} from '@mui/material';
import { motion } from 'framer-motion';
import Icon from '@mui/material/Icon';
import SectionWrapper from '@/components/common/SectionWrapper';
import SectionTitle from '@/components/common/SectionTitle';
import { useUIContext } from '@/context/UIContext';
import { galleryContent } from '@/data/content/gallery';
import styles from './VirtualTour.module.css';

const VirtualTour = () => {
  const [videoDialogOpen, setVideoDialogOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const { openPopup } = useUIContext();

  const { virtualTour, videos } = galleryContent;

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
    setVideoDialogOpen(true);
  };

  const handleCloseVideoDialog = () => {
    setVideoDialogOpen(false);
    setSelectedVideo(null);
  };

  const handleVirtualTourClick = () => {
    if (virtualTour.embedUrl) {
      window.open(virtualTour.embedUrl, '_blank');
    } else {
      openPopup('brochure');
    }
  };

  // Animation variants
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
      id="virtual-tour"
      background="paper"
      paddingY="large"
    >
      <SectionTitle
        title="Experience District 25"
        subtitle="Take a virtual walkthrough of your future home"
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
        {/* Virtual Tour Section */}
        {virtualTour.enabled && (
          <motion.div variants={itemVariants}>
            <Box className={styles.virtualTourSection}>
              <Box
                className={styles.tourCard}
                onClick={handleVirtualTourClick}
              >
                <Box
                  className={styles.tourImage}
                  sx={{
                    backgroundImage: `url(${virtualTour.thumbnail})`,
                  }}
                >
                  <Box className={styles.tourOverlay}>
                    <Box className={styles.playButton}>
                      <Icon className={styles.playIcon}>360</Icon>
                    </Box>
                    <Typography variant="h5" className={styles.tourTitle}>
                      {virtualTour.title}
                    </Typography>
                    <Typography variant="body1" className={styles.tourDescription}>
                      {virtualTour.description}
                    </Typography>
                    <Button
                      variant="contained"
                      color="secondary"
                      size="large"
                      startIcon={<Icon>view_in_ar</Icon>}
                      className={styles.tourButton}
                    >
                      Launch Virtual Tour
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Box>
          </motion.div>
        )}

        {/* Video Gallery */}
        <Box className={styles.videoSection}>
          <Typography variant="h5" className={styles.videoSectionTitle}>
            Video Gallery
          </Typography>

          <Grid container spacing={3}>
            {videos.map((video, index) => (
              <Grid item xs={12} sm={6} md={4} key={video.id}>
                <motion.div variants={itemVariants}>
                  <Card
                    className={styles.videoCard}
                    onClick={() => handleVideoClick(video)}
                  >
                    <Box
                      className={styles.videoThumbnail}
                      sx={{
                        backgroundImage: `url(${video.thumbnail})`,
                      }}
                    >
                      <Box className={styles.videoOverlay}>
                        <Box className={styles.videoPlayButton}>
                          <Icon className={styles.videoPlayIcon}>play_arrow</Icon>
                        </Box>
                        <Box className={styles.videoDuration}>
                          <Icon className={styles.durationIcon}>schedule</Icon>
                          <Typography variant="caption">
                            {video.duration}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                    <CardContent className={styles.videoContent}>
                      <Typography variant="subtitle1" className={styles.videoTitle}>
                        {video.title}
                      </Typography>
                      <Typography variant="body2" className={styles.videoDescription}>
                        {video.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* CTA */}
        <Box className={styles.ctaWrapper}>
          <Typography variant="body1" className={styles.ctaText}>
            Want to see more? Schedule a site visit and experience District 25 in person.
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            startIcon={<Icon>calendar_today</Icon>}
            onClick={() => openPopup('sitevisit')}
            className={styles.ctaButton}
          >
            Schedule Site Visit
          </Button>
        </Box>
      </motion.div>

      {/* Video Dialog */}
      <Dialog
        open={videoDialogOpen}
        onClose={handleCloseVideoDialog}
        maxWidth="md"
        fullWidth
        className={styles.videoDialog}
      >
        <DialogContent className={styles.videoDialogContent}>
          <IconButton
            onClick={handleCloseVideoDialog}
            className={styles.closeButton}
          >
            <Icon>close</Icon>
          </IconButton>

          {selectedVideo && (
            <Box className={styles.videoPlayerWrapper}>
              {selectedVideo.videoUrl ? (
                <Box
                  component="iframe"
                  src={selectedVideo.videoUrl}
                  title={selectedVideo.title}
                  className={styles.videoPlayer}
                  allowFullScreen
                  frameBorder="0"
                />
              ) : (
                <Box className={styles.videoPlaceholder}>
                  <Icon className={styles.placeholderIcon}>videocam_off</Icon>
                  <Typography variant="h6" className={styles.placeholderTitle}>
                    Video Coming Soon
                  </Typography>
                  <Typography variant="body2" className={styles.placeholderText}>
                    {selectedVideo.title} will be available shortly.
                  </Typography>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => {
                      handleCloseVideoDialog();
                      openPopup('brochure');
                    }}
                  >
                    Get Brochure Instead
                  </Button>
                </Box>
              )}
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </SectionWrapper>
  );
};

export default VirtualTour;
