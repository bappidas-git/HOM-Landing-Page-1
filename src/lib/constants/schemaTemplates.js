/**
 * Schema.org Templates for Nambiar District 25
 * Used for structured data and SEO
 */

// Organization Schema
export const ORGANIZATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Nambiar Builders',
  alternateName: 'Nambiar Group',
  url: 'https://nambiarbuilders.com',
  logo: 'https://nambiardistrict25.com/images/nambiar-logo.png',
  description: 'One of Bengaluru\'s most trusted premium builders with a legacy of delivering quality homes.',
  foundingDate: '1995',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '2nd Floor, PR Business Centre, Above Croma, Outer Ring Road, Kadubisanahalli',
    addressLocality: 'Marathahalli',
    addressRegion: 'Karnataka',
    postalCode: '560103',
    addressCountry: 'IN',
  },
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: '+91-7026034444',
      contactType: 'sales',
      areaServed: 'IN',
      availableLanguage: ['English', 'Hindi', 'Kannada'],
    },
  ],
  sameAs: [
    'https://facebook.com/nambiarbuilders',
    'https://instagram.com/nambiarbuilders',
    'https://linkedin.com/company/nambiarbuilders',
    'https://youtube.com/nambiarbuilders',
    'https://twitter.com/nambiarbuilders',
  ],
};

// Real Estate Agent Schema
export const REAL_ESTATE_AGENT_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'RealEstateAgent',
  name: 'Nambiar District 25',
  image: 'https://nambiardistrict25.com/images/project-hero.jpg',
  description: 'Premium 2, 3 & 4 BHK apartments at Nambiar District 25 Phase 2 - Bengaluru\'s finest integrated township.',
  url: 'https://nambiardistrict25.com',
  telephone: '+91-7026034444',
  priceRange: '₹1.24 Cr - ₹3 Cr',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Chandapura Dommasandra Road',
    addressLocality: 'Dommasandra',
    addressRegion: 'Karnataka',
    postalCode: '562125',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '12.8750',
    longitude: '77.7340',
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '09:00',
      closes: '21:00',
    },
  ],
};

// Apartment Schema
export const APARTMENT_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Apartment',
  name: 'Nambiar District 25 Phase 2',
  description: 'Premium 2, 3 & 4 BHK apartments with world-class amenities in Bengaluru\'s finest integrated township.',
  numberOfRooms: '2-4',
  numberOfBedrooms: '2-4',
  numberOfBathroomsTotal: '2-5',
  petsAllowed: true,
  amenityFeature: [
    { '@type': 'LocationFeatureSpecification', name: 'Swimming Pool' },
    { '@type': 'LocationFeatureSpecification', name: 'Gym' },
    { '@type': 'LocationFeatureSpecification', name: 'Clubhouse' },
    { '@type': 'LocationFeatureSpecification', name: 'Tennis Court' },
    { '@type': 'LocationFeatureSpecification', name: 'Basketball Court' },
    { '@type': 'LocationFeatureSpecification', name: 'Children\'s Play Area' },
    { '@type': 'LocationFeatureSpecification', name: '24x7 Security' },
    { '@type': 'LocationFeatureSpecification', name: 'Power Backup' },
  ],
  floorSize: {
    '@type': 'QuantitativeValue',
    value: '1245-2995',
    unitCode: 'SQF',
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Chandapura Dommasandra Road',
    addressLocality: 'Dommasandra',
    addressRegion: 'Karnataka',
    postalCode: '562125',
    addressCountry: 'IN',
  },
};

// FAQ Schema Generator
export const generateFAQSchema = (faqs) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
});

// Breadcrumb Schema Generator
export const generateBreadcrumbSchema = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});

// Local Business Schema
export const LOCAL_BUSINESS_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://nambiardistrict25.com',
  name: 'Nambiar District 25 Sales Gallery',
  image: 'https://nambiardistrict25.com/images/sales-gallery.jpg',
  telephone: '+91-7026034444',
  email: 'sales@nambiardistrict25.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Chandapura Dommasandra Road',
    addressLocality: 'Dommasandra',
    addressRegion: 'Karnataka',
    postalCode: '562125',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '12.8750',
    longitude: '77.7340',
  },
  url: 'https://nambiardistrict25.com',
  priceRange: '₹₹₹',
};

// Product Schema for individual unit types
export const generateProductSchema = (unit) => ({
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: `${unit.type} Apartment at Nambiar District 25`,
  description: `${unit.type} apartment with ${unit.bedrooms} bedrooms, ${unit.bathrooms} bathrooms, ${unit.sba} sq.ft SBA`,
  brand: {
    '@type': 'Brand',
    name: 'Nambiar Builders',
  },
  offers: {
    '@type': 'Offer',
    price: unit.startingPrice,
    priceCurrency: 'INR',
    availability: 'https://schema.org/InStock',
    seller: {
      '@type': 'Organization',
      name: 'Nambiar Builders',
    },
  },
});

// Website Schema
export const WEBSITE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Nambiar District 25 Phase 2',
  alternateName: 'District 25',
  url: 'https://nambiardistrict25.com',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://nambiardistrict25.com/search?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
};

export default {
  ORGANIZATION_SCHEMA,
  REAL_ESTATE_AGENT_SCHEMA,
  APARTMENT_SCHEMA,
  LOCAL_BUSINESS_SCHEMA,
  WEBSITE_SCHEMA,
  generateFAQSchema,
  generateBreadcrumbSchema,
  generateProductSchema,
};
