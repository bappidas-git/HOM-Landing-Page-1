/**
 * FAQ Section Component
 * Displays frequently asked questions with accordion layout and FAQ schema for SEO
 */

import { useState, useMemo } from 'react';
import Head from 'next/head';
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  InputAdornment,
  Chip,
  Button,
  Grid,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';
import ChatIcon from '@mui/icons-material/Chat';
import PhoneIcon from '@mui/icons-material/Phone';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { motion } from 'framer-motion';

import SectionWrapper from '@/components/common/SectionWrapper';
import SectionTitle from '@/components/common/SectionTitle';
import { useUIContext } from '@/context/UIContext';
import { faqContent, getFaqsByCategory, searchFaqs, generateFaqSchema } from '@/data/content/faq';
import styles from './FAQ.module.css';

/**
 * FAQ Section
 */
const FAQ = () => {
  const { openPopup } = useUIContext();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedPanel, setExpandedPanel] = useState(
    faqContent.displayConfig.expandFirstItem ? 'faq-1' : false
  );

  const { categories, displayConfig, contactCta, schemaEnabled } = faqContent;

  // Filter FAQs based on category and search
  const filteredFaqs = useMemo(() => {
    let faqs = activeCategory === 'all'
      ? faqContent.faqs
      : getFaqsByCategory(activeCategory);

    if (searchQuery.trim()) {
      faqs = searchFaqs(searchQuery);
    }

    return faqs;
  }, [activeCategory, searchQuery]);

  // Handle accordion expansion
  const handleAccordionChange = (panel) => (event, isExpanded) => {
    if (displayConfig.allowMultipleExpanded) {
      setExpandedPanel((prev) => ({
        ...prev,
        [panel]: isExpanded,
      }));
    } else {
      setExpandedPanel(isExpanded ? panel : false);
    }
  };

  // Check if panel is expanded
  const isPanelExpanded = (panel) => {
    if (displayConfig.allowMultipleExpanded) {
      return expandedPanel[panel] || false;
    }
    return expandedPanel === panel;
  };

  // Handle CTA click
  const handleEnquiry = () => {
    openPopup('enquiry', 'Got Questions? We Have Answers', true);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  // Generate FAQ Schema for SEO
  const faqSchema = schemaEnabled ? generateFaqSchema() : null;

  return (
    <>
      {/* FAQ Schema for SEO */}
      {schemaEnabled && faqSchema && (
        <Head>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(faqSchema),
            }}
          />
        </Head>
      )}

      <SectionWrapper
        id={faqContent.sectionId}
        background="default"
        paddingY="large"
      >
        <SectionTitle
          title={faqContent.title}
          subtitle={faqContent.subtitle}
          align="center"
          showDecoration={true}
          decorationType="line"
        />

        {/* Search and Filter */}
        <Box className={styles.filterSection}>
          {/* Search */}
          {displayConfig.enableSearch && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <TextField
                fullWidth
                variant="outlined"
                placeholder={displayConfig.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon className={styles.searchIcon} />
                    </InputAdornment>
                  ),
                }}
                className={styles.searchField}
              />
            </motion.div>
          )}

          {/* Category Chips */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className={styles.categoryChips}
          >
            {categories.map((category) => (
              <Chip
                key={category.id}
                label={category.label}
                variant={activeCategory === category.id ? 'filled' : 'outlined'}
                onClick={() => {
                  setActiveCategory(category.id);
                  setSearchQuery('');
                }}
                className={`${styles.categoryChip} ${
                  activeCategory === category.id ? styles.categoryChipActive : ''
                }`}
              />
            ))}
          </motion.div>
        </Box>

        {/* FAQ Accordions */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className={styles.accordionContainer}
        >
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => (
              <motion.div key={faq.id} variants={itemVariants}>
                <Accordion
                  expanded={isPanelExpanded(faq.id)}
                  onChange={handleAccordionChange(faq.id)}
                  className={styles.accordion}
                  disableGutters
                  elevation={0}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon className={styles.expandIcon} />}
                    className={styles.accordionSummary}
                    aria-controls={`${faq.id}-content`}
                    id={`${faq.id}-header`}
                  >
                    <Box className={styles.questionWrapper}>
                      <HelpOutlineIcon className={styles.questionIcon} />
                      <Typography variant="subtitle1" className={styles.question}>
                        {faq.question}
                      </Typography>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails className={styles.accordionDetails}>
                    <Typography variant="body1" className={styles.answer}>
                      {faq.answer}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </motion.div>
            ))
          ) : (
            <Box className={styles.noResults}>
              <Typography variant="body1">
                No FAQs found for your search. Try a different query or category.
              </Typography>
            </Box>
          )}
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Box className={styles.contactCta}>
            <Box className={styles.ctaContent}>
              <Typography variant="h5" className={styles.ctaTitle}>
                {contactCta.title}
              </Typography>
              <Typography variant="body2" className={styles.ctaDescription}>
                {contactCta.description}
              </Typography>
            </Box>
            <Box className={styles.ctaButtons}>
              <Button
                variant="contained"
                color="secondary"
                startIcon={<ChatIcon />}
                onClick={handleEnquiry}
                className={styles.ctaButton}
              >
                {contactCta.primaryCta.text}
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                startIcon={<PhoneIcon />}
                href={`tel:${contactCta.secondaryCta.phone}`}
                className={styles.ctaButtonOutlined}
              >
                {contactCta.secondaryCta.text}
              </Button>
            </Box>
          </Box>
        </motion.div>
      </SectionWrapper>
    </>
  );
};

export default FAQ;
