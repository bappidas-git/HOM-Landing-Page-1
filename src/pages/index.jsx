/**
 * Landing Page - Nambiar District 25 Phase 2
 * Main entry point for the real estate landing page
 *
 * Features:
 * - Full-page landing design with smooth scroll navigation
 * - Lead capture forms with duplicate prevention
 * - Mobile-first responsive design
 * - SEO optimized with structured data
 * - Performance optimized with lazy loading
 */

import Head from 'next/head';
import { Box } from '@mui/material';
import { motion } from 'framer-motion';

// Layout Components
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import BottomNavigation from '@/components/common/BottomNavigation';
import FloatingCTA from '@/components/common/FloatingCTA';
import ScrollToTop from '@/components/common/ScrollToTop';

// Landing Page Sections
import Hero from '@/components/landing/Hero';
import Overview from '@/components/landing/Overview';
import Highlights from '@/components/landing/Highlights';
import Amenities from '@/components/landing/Amenities';
import FloorPlans from '@/components/landing/FloorPlans';
import UnitPlans from '@/components/landing/UnitPlans';
import Gallery from '@/components/landing/Gallery';
import VirtualTour from '@/components/landing/VirtualTour';
import Location from '@/components/landing/Location';
import Pricing from '@/components/landing/Pricing';
import PaymentPlan from '@/components/landing/PaymentPlan';
import Specifications from '@/components/landing/Specifications';
import Developer from '@/components/landing/Developer';
import Testimonials from '@/components/landing/Testimonials';
import FAQ from '@/components/landing/FAQ';
import CTASection from '@/components/landing/CTASection';
import TrustBadges from '@/components/landing/TrustBadges';

// Data
import { siteConfig } from '@/data/content/siteConfig';
import { faqContent } from '@/data/content/faq';

// FAQ Schema for SEO
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqContent?.items?.slice(0, 10).map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })) || [],
};

// Breadcrumb Schema
const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://nambiardistrict25.com',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Nambiar District 25 Phase 2',
      item: 'https://nambiardistrict25.com',
    },
  ],
};

// Page transition animation
const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export default function Home() {
  const canonicalUrl = 'https://nambiardistrict25.com';

  return (
    <>
      <Head>
        <title>{`${siteConfig.siteName} | ${siteConfig.tagline}`}</title>
        <meta
          name="description"
          content={`${siteConfig.siteName} - Premium 2, 3 & 4 BHK apartments starting from ${siteConfig.pricing.starting}. ${siteConfig.features.amenities} amenities, ${siteConfig.features.clubhouseSize} clubhouse, ${siteConfig.features.metroDistance} from metro. RERA: ${siteConfig.rera.number}`}
        />
        <meta name="keywords" content={siteConfig.seo.keywords} />
        <meta name="author" content={siteConfig.developer} />

        {/* Canonical URL */}
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph */}
        <meta property="og:title" content={`${siteConfig.siteName} | ${siteConfig.tagline}`} />
        <meta property="og:description" content={`Premium apartments starting from ${siteConfig.pricing.starting}. ${siteConfig.features.amenities} amenities, 7-acre clubhouse. Book your site visit today!`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={`${canonicalUrl}${siteConfig.seo.ogImage}`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="en_IN" />
        <meta property="og:site_name" content={siteConfig.siteName} />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content={siteConfig.seo.twitterHandle} />
        <meta name="twitter:title" content={`${siteConfig.siteName} | ${siteConfig.tagline}`} />
        <meta name="twitter:description" content={`Premium apartments starting from ${siteConfig.pricing.starting}. Book your site visit today!`} />
        <meta name="twitter:image" content={`${canonicalUrl}${siteConfig.seo.ogImage}`} />

        {/* Viewport */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />

        {/* FAQ Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />

        {/* Breadcrumb Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      </Head>

      <Box component="main" sx={{ minHeight: '100vh' }}>
        {/* Header - Desktop only */}
        <Header />

        {/* Hero Section with Form */}
        <Hero />

        {/* Overview Section */}
        <Overview />

        {/* Highlights Section */}
        <Highlights />

        {/* Amenities Section */}
        <Amenities />

        {/* Floor Plans Section */}
        <FloorPlans />

        {/* Unit Plans Section */}
        <UnitPlans />

        {/* Gallery Section */}
        <Gallery />

        {/* Virtual Tour Section */}
        <VirtualTour />

        {/* Location Section */}
        <Location />

        {/* Pricing Section */}
        <Pricing />

        {/* Payment Plan Section */}
        <PaymentPlan />

        {/* Specifications Section */}
        <Specifications />

        {/* Developer Section */}
        <Developer />

        {/* Testimonials Section */}
        <Testimonials />

        {/* FAQ Section */}
        <FAQ />

        {/* Trust Badges */}
        <TrustBadges />

        {/* Final CTA Section */}
        <CTASection />

        {/* Footer */}
        <Footer />

        {/* Floating CTA Buttons */}
        <FloatingCTA />

        {/* Scroll to Top Button */}
        <ScrollToTop />

        {/* Bottom Navigation - Mobile/Tablet only */}
        <BottomNavigation />
      </Box>
    </>
  );
}
