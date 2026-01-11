// Content Data Index - Export all content modules
// Nambiar District 25 Phase 2

// Site Configuration
export { default as siteConfig } from './siteConfig';
export { siteConfig as siteConfigData } from './siteConfig';

// Hero Section
export { default as heroContent } from './hero';
export { heroContent as heroData } from './hero';

// Overview Section
export { default as overviewContent } from './overview';
export { overviewContent as overviewData } from './overview';

// Highlights Section
export { default as highlightsContent } from './highlights';
export { highlightsContent as highlightsData } from './highlights';

// Amenities Section
export { default as amenitiesContent } from './amenities';
export {
  amenitiesContent as amenitiesData,
  getAllAmenities,
  getAmenitiesByCategory,
  getFeaturedAmenities,
} from './amenities';

// Floor Plans Section
export { default as floorPlansContent } from './floorPlans';
export {
  floorPlansContent as floorPlansData,
  getFloorPlansByCategory,
  getFeaturedFloorPlans,
} from './floorPlans';

// Unit Plans Section
export { default as unitPlansContent } from './unitPlans';
export {
  unitPlansContent as unitPlansData,
  getTowerById,
  getUnitsByType,
} from './unitPlans';

// Gallery Section
export { default as galleryContent } from './gallery';
export {
  galleryContent as galleryData,
  getImagesByCategory,
  getFeaturedImages,
} from './gallery';

// Location Section
export { default as locationContent } from './location';
export {
  locationContent as locationData,
  getAllLandmarks,
  getLandmarksByCategory,
} from './location';

// Pricing Section
export { default as pricingContent } from './pricing';
export {
  pricingContent as pricingData,
  getPriceRange,
  calculateEMI,
  getFeaturedPricing,
} from './pricing';

// Payment Plan Section
export { default as paymentPlanContent } from './paymentPlan';
export {
  paymentPlanContent as paymentPlanData,
  getPaymentProgress,
} from './paymentPlan';

// Developer Section
export { default as developerContent } from './developer';
export { developerContent as developerData } from './developer';

// Specifications Section
export { default as specificationsContent } from './specifications';
export {
  specificationsContent as specificationsData,
  getSpecificationsByCategory,
} from './specifications';

// Testimonials Section
export { default as testimonialsContent } from './testimonials';
export {
  testimonialsContent as testimonialsData,
  getFeaturedTestimonials,
  getTestimonialsByRating,
} from './testimonials';

// FAQ Section
export { default as faqContent } from './faq';
export {
  faqContent as faqData,
  getFaqsByCategory,
  searchFaqs,
  generateFaqSchema,
} from './faq';

// CTA Section
export { default as ctaSectionContent } from './ctaSection';
export { ctaSectionContent as ctaSectionData } from './ctaSection';

// Thank You Page
export { default as thankYouContent } from './thankYou';
export { thankYouContent as thankYouData } from './thankYou';

// Footer
export { default as footerContent } from './footer';
export { footerContent as footerData } from './footer';

// Convenience export of all content as single object
const allContent = {
  siteConfig: require('./siteConfig').default,
  hero: require('./hero').default,
  overview: require('./overview').default,
  highlights: require('./highlights').default,
  amenities: require('./amenities').default,
  floorPlans: require('./floorPlans').default,
  unitPlans: require('./unitPlans').default,
  gallery: require('./gallery').default,
  location: require('./location').default,
  pricing: require('./pricing').default,
  paymentPlan: require('./paymentPlan').default,
  developer: require('./developer').default,
  specifications: require('./specifications').default,
  testimonials: require('./testimonials').default,
  faq: require('./faq').default,
  ctaSection: require('./ctaSection').default,
  thankYou: require('./thankYou').default,
  footer: require('./footer').default,
};

export default allContent;
