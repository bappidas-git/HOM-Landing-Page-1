/**
 * Landing Page - Nambiar District 25 Phase 2
 * Main entry point for the real estate landing page
 */

import Head from 'next/head';
import { Box } from '@mui/material';

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

export default function Home() {
  return (
    <>
      <Head>
        <title>{siteConfig.siteName} | {siteConfig.tagline}</title>
        <meta
          name="description"
          content={`${siteConfig.siteName} - Premium 2, 3 & 4 BHK apartments starting from ${siteConfig.pricing.starting}. ${siteConfig.features.amenities} amenities, ${siteConfig.features.clubhouseSize} clubhouse, ${siteConfig.features.metroDistance} from metro.`}
        />
        <meta name="keywords" content="Nambiar District 25, apartments in Bangalore, 2 BHK, 3 BHK, 4 BHK, Dommasandra, premium apartments, integrated township" />
        <meta name="author" content={siteConfig.developer} />

        {/* Open Graph */}
        <meta property="og:title" content={`${siteConfig.siteName} | ${siteConfig.tagline}`} />
        <meta property="og:description" content={`Premium apartments starting from ${siteConfig.pricing.starting}. Book your site visit today!`} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_IN" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${siteConfig.siteName} | ${siteConfig.tagline}`} />
        <meta name="twitter:description" content={`Premium apartments starting from ${siteConfig.pricing.starting}`} />

        {/* Viewport */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
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
