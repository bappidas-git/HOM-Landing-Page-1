/**
 * Thank You Page - Nambiar District 25 Phase 2
 * Displayed after successful lead form submission
 *
 * Features:
 * - Confetti celebration animation
 * - Success message with next steps
 * - Contact information and quick actions
 * - Project highlights reminder
 * - SEO optimized (noindex)
 */

import { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Box } from '@mui/material';
import { motion } from 'framer-motion';

// Thank You Components
import Confetti from '@/components/thank-you/Confetti';
import ThankYouHero from '@/components/thank-you/ThankYouHero';
import NextSteps from '@/components/thank-you/NextSteps';
import ContactInfo from '@/components/thank-you/ContactInfo';

// Common Components
import Footer from '@/components/common/Footer';
import ScrollToTop from '@/components/common/ScrollToTop';

// Data
import { siteConfig } from '@/data/content/siteConfig';
import { thankYouContent } from '@/data/content/thankYou';

// Page transition animation
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
    },
  },
};

export default function ThankYou() {
  const router = useRouter();
  const { pageSeo, confetti: confettiConfig } = thankYouContent;

  // Track conversion on page load
  useEffect(() => {
    // Google Analytics conversion tracking
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'conversion', {
        event_category: 'Lead',
        event_label: 'Form Submission',
        value: 1,
      });
    }

    // Facebook Pixel lead tracking
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'Lead', {
        content_name: 'Nambiar District 25 Lead',
        content_category: 'Real Estate',
      });
    }

    // Google Ads conversion tracking
    if (typeof window !== 'undefined' && window.gtag && process.env.NEXT_PUBLIC_GOOGLE_ADS_ID) {
      window.gtag('event', 'conversion', {
        send_to: `${process.env.NEXT_PUBLIC_GOOGLE_ADS_ID}/${process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL}`,
      });
    }
  }, []);

  // Handle case where user directly navigates to thank you page
  // (without submitting a form)
  useEffect(() => {
    // Check if user came from form submission
    const referrer = document.referrer;
    const isFromOwnSite = referrer.includes(window.location.hostname) || referrer === '';

    // If not from own site and no form submission flag, consider redirecting
    // For now, we'll allow direct access for testing purposes
  }, [router]);

  return (
    <>
      <Head>
        <title>{pageSeo.title}</title>
        <meta name="description" content={pageSeo.description} />

        {/* No index for thank you page */}
        <meta name="robots" content="noindex, nofollow" />
        <meta name="googlebot" content="noindex, nofollow" />

        {/* Viewport */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />

        {/* Open Graph - minimal for thank you page */}
        <meta property="og:title" content={pageSeo.title} />
        <meta property="og:description" content={pageSeo.description} />
        <meta property="og:type" content="website" />
      </Head>

      {/* Confetti Animation */}
      <Confetti
        enabled={confettiConfig.enabled}
        duration={confettiConfig.duration}
        particleCount={confettiConfig.particleCount}
        spread={confettiConfig.spread}
        colors={confettiConfig.colors}
      />

      <motion.div
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <Box
          component="main"
          sx={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Hero Section with Success Message */}
          <ThankYouHero />

          {/* Next Steps Section */}
          <NextSteps />

          {/* Contact Information & Quick Actions */}
          <ContactInfo />

          {/* Footer */}
          <Footer />

          {/* Scroll to Top */}
          <ScrollToTop />
        </Box>
      </motion.div>
    </>
  );
}
