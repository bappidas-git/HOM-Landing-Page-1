/**
 * SEO Default Values for Nambiar District 25
 */

// Site information
export const SITE_INFO = {
  siteName: 'Nambiar District 25 Phase 2',
  siteUrl: 'https://nambiardistrict25.com',
  developer: 'Nambiar Builders',
  tagline: 'THE SOHO LIFE RETURNS',
};

// Default meta tags
export const DEFAULT_META = {
  title: 'Nambiar District 25 Phase 2 | Premium 2, 3 & 4 BHK Apartments in Bangalore',
  description: 'Discover luxury living at Nambiar District 25 Phase 2 - Premium 2, 3 & 4 BHK apartments in Dommasandra, Bangalore. Starting ₹1.24 Cr. 7-acre clubhouse, 74+ amenities, 600m from upcoming metro. RERA Registered.',
  keywords: [
    'Nambiar District 25',
    'apartments in Bangalore',
    'luxury apartments Dommasandra',
    '2 BHK apartments Bangalore',
    '3 BHK apartments Bangalore',
    '4 BHK apartments Bangalore',
    'Nambiar Builders',
    'SOHO Life',
    'integrated township Bangalore',
    'premium apartments Electronic City',
    'apartments near Sarjapur Road',
    'RERA approved apartments Bangalore',
  ].join(', '),
  author: 'Nambiar Builders',
  language: 'en-IN',
  robots: 'index, follow',
  canonical: 'https://nambiardistrict25.com/',
};

// Open Graph defaults
export const DEFAULT_OG = {
  title: 'Nambiar District 25 Phase 2 | The SOHO Life Returns',
  description: 'Live the SOHO Life at Bengaluru\'s finest integrated township. Premium 2, 3 & 4 BHK apartments with 7-acre clubhouse & 74+ amenities. Starting ₹1.24 Cr.',
  image: '/images/og-image.jpg',
  type: 'website',
  locale: 'en_IN',
  siteName: 'Nambiar District 25',
};

// Twitter Card defaults
export const DEFAULT_TWITTER = {
  card: 'summary_large_image',
  title: 'Nambiar District 25 Phase 2 | Premium Apartments in Bangalore',
  description: 'Live the SOHO Life at Bengaluru\'s finest integrated township. Premium 2, 3 & 4 BHK apartments starting ₹1.24 Cr.',
  image: '/images/twitter-card.jpg',
  site: '@nambiarbuilders',
  creator: '@nambiarbuilders',
};

// Geo tags
export const GEO_TAGS = {
  region: 'IN-KA',
  placename: 'Bengaluru, Karnataka, India',
  position: '12.8750;77.7340',
  ICBM: '12.8750, 77.7340',
};

// Structured data defaults
export const STRUCTURED_DATA = {
  organization: {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Nambiar Builders',
    url: 'https://nambiarbuilders.com',
    logo: 'https://nambiardistrict25.com/images/nambiar-logo.png',
    sameAs: [
      'https://facebook.com/nambiarbuilders',
      'https://instagram.com/nambiarbuilders',
      'https://linkedin.com/company/nambiarbuilders',
      'https://youtube.com/nambiarbuilders',
      'https://twitter.com/nambiarbuilders',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91-7026034444',
      contactType: 'sales',
      areaServed: 'IN',
      availableLanguage: ['English', 'Hindi', 'Kannada'],
    },
  },
};

// Page-specific SEO configurations
export const PAGE_SEO = {
  home: {
    title: 'Nambiar District 25 Phase 2 | Premium 2, 3 & 4 BHK Apartments in Bangalore',
    description: 'Discover luxury living at Nambiar District 25 Phase 2. Premium apartments with 7-acre clubhouse, 74+ amenities, starting ₹1.24 Cr. RERA Registered.',
  },
  thankYou: {
    title: 'Thank You | Nambiar District 25 Phase 2',
    description: 'Thank you for your interest in Nambiar District 25 Phase 2. Our team will contact you shortly.',
    robots: 'noindex, nofollow',
  },
  admin: {
    title: 'Admin Panel | Nambiar District 25',
    robots: 'noindex, nofollow',
  },
};

// SEO character limits
export const SEO_LIMITS = {
  title: {
    min: 30,
    max: 60,
    recommended: 55,
  },
  description: {
    min: 120,
    max: 160,
    recommended: 155,
  },
  keywords: {
    max: 10,
  },
};

export default {
  SITE_INFO,
  DEFAULT_META,
  DEFAULT_OG,
  DEFAULT_TWITTER,
  GEO_TAGS,
  STRUCTURED_DATA,
  PAGE_SEO,
  SEO_LIMITS,
};
