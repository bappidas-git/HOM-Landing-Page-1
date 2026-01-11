/**
 * Testimonials Section Component
 * Displays customer testimonials with carousel and star ratings
 */

import { useState, useRef } from 'react';
import { Box, Typography, IconButton, Avatar, Rating, Chip } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import VerifiedIcon from '@mui/icons-material/Verified';
import GroupsIcon from '@mui/icons-material/Groups';
import StarIcon from '@mui/icons-material/Star';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import SectionWrapper from '@/components/common/SectionWrapper';
import SectionTitle from '@/components/common/SectionTitle';
import { testimonialsContent } from '@/data/content/testimonials';
import styles from './Testimonials.module.css';

/**
 * TestimonialCard - Individual testimonial card
 */
const TestimonialCard = ({ testimonial, isExpanded, onToggle }) => {
  const { displayConfig } = testimonialsContent;
  const shouldTruncate = testimonial.quote.length > displayConfig.maxQuoteLength;
  const displayQuote = isExpanded ? testimonial.quote : testimonial.shortQuote;

  return (
    <motion.div
      className={styles.testimonialCard}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
    >
      {/* Quote Icon */}
      <Box className={styles.quoteIconWrapper}>
        <FormatQuoteIcon className={styles.quoteIcon} />
      </Box>

      {/* Rating */}
      <Box className={styles.ratingWrapper}>
        <Rating
          value={testimonial.rating}
          readOnly
          size="small"
          icon={<StarIcon fontSize="inherit" className={styles.starFilled} />}
          emptyIcon={<StarIcon fontSize="inherit" className={styles.starEmpty} />}
        />
      </Box>

      {/* Quote */}
      <Typography variant="body1" className={styles.quote}>
        &ldquo;{displayQuote}&rdquo;
        {shouldTruncate && displayConfig.enableReadMore && (
          <span
            className={styles.readMore}
            onClick={(e) => {
              e.stopPropagation();
              onToggle();
            }}
          >
            {isExpanded ? ' Read less' : ' Read more'}
          </span>
        )}
      </Typography>

      {/* Author */}
      <Box className={styles.author}>
        <Avatar
          src={testimonial.avatar}
          alt={testimonial.name}
          className={styles.avatar}
        >
          {testimonial.name.charAt(0)}
        </Avatar>
        <Box className={styles.authorInfo}>
          <Box className={styles.nameWrapper}>
            <Typography variant="subtitle1" className={styles.name}>
              {testimonial.name}
            </Typography>
            {testimonial.verified && displayConfig.showVerifiedBadge && (
              <VerifiedIcon className={styles.verifiedIcon} />
            )}
          </Box>
          <Typography variant="body2" className={styles.designation}>
            {testimonial.designation}
          </Typography>
          <Typography variant="caption" className={styles.location}>
            {testimonial.location}
          </Typography>
        </Box>
      </Box>
    </motion.div>
  );
};

/**
 * Testimonials Section
 */
const Testimonials = () => {
  const swiperRef = useRef(null);
  const [expandedCards, setExpandedCards] = useState({});
  const { displayConfig, stats, testimonials } = testimonialsContent;

  const toggleExpand = (id) => {
    setExpandedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

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
      transition: { duration: 0.5 },
    },
  };

  return (
    <SectionWrapper
      id={testimonialsContent.sectionId}
      background="paper"
      paddingY="large"
    >
      <SectionTitle
        title={testimonialsContent.title}
        subtitle={testimonialsContent.subtitle}
        align="center"
        showDecoration={true}
        decorationType="gradient"
      />

      {/* Stats Bar */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <Box className={styles.statsBar}>
          <motion.div variants={itemVariants} className={styles.statItem}>
            <GroupsIcon className={styles.statIcon} />
            <Box className={styles.statContent}>
              <Typography variant="h4" className={styles.statValue}>
                {stats.totalResidents}
              </Typography>
              <Typography variant="body2" className={styles.statLabel}>
                Happy Residents
              </Typography>
            </Box>
          </motion.div>

          <Box className={styles.statDivider} />

          <motion.div variants={itemVariants} className={styles.statItem}>
            <StarIcon className={styles.statIcon} />
            <Box className={styles.statContent}>
              <Typography variant="h4" className={styles.statValue}>
                {stats.averageRating}
              </Typography>
              <Typography variant="body2" className={styles.statLabel}>
                Average Rating
              </Typography>
            </Box>
          </motion.div>

          <Box className={styles.statDivider} />

          <motion.div variants={itemVariants} className={styles.statItem}>
            <VerifiedIcon className={styles.statIcon} />
            <Box className={styles.statContent}>
              <Typography variant="h4" className={styles.statValue}>
                {stats.recommendationRate}
              </Typography>
              <Typography variant="body2" className={styles.statLabel}>
                Recommend Us
              </Typography>
            </Box>
          </motion.div>
        </Box>
      </motion.div>

      {/* Testimonials Carousel */}
      <Box className={styles.carouselWrapper}>
        {/* Navigation Buttons */}
        <IconButton
          className={`${styles.navButton} ${styles.navPrev}`}
          onClick={() => swiperRef.current?.slidePrev()}
          aria-label="Previous testimonial"
        >
          <ArrowBackIosNewIcon />
        </IconButton>

        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          spaceBetween={24}
          slidesPerView={1}
          loop={testimonials.length > 3}
          autoplay={
            displayConfig.autoplay
              ? {
                  delay: displayConfig.autoplayDelay,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }
              : false
          }
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          breakpoints={{
            600: {
              slidesPerView: displayConfig.slidesPerView.tablet,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: displayConfig.slidesPerView.desktop,
              spaceBetween: 24,
            },
          }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          className={styles.swiper}
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <TestimonialCard
                testimonial={testimonial}
                isExpanded={expandedCards[testimonial.id]}
                onToggle={() => toggleExpand(testimonial.id)}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <IconButton
          className={`${styles.navButton} ${styles.navNext}`}
          onClick={() => swiperRef.current?.slideNext()}
          aria-label="Next testimonial"
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>

      {/* Verified Badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className={styles.verifiedBadgeWrapper}
      >
        <Chip
          icon={<VerifiedIcon />}
          label="All reviews from verified Phase 1 residents"
          variant="outlined"
          className={styles.verifiedBadge}
        />
      </motion.div>
    </SectionWrapper>
  );
};

export default Testimonials;
