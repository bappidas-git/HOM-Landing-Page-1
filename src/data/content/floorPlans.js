// Floor Plans Section Content for Nambiar District 25 Phase 2
// Complete floor plan data for all unit types

export const floorPlansContent = {
  // Section Configuration
  sectionId: 'floor-plans',

  // Section Titles
  title: 'Choose Your Dream Home',
  subtitle: 'Thoughtfully designed floor plans',

  // Filter Categories
  categories: [
    { id: 'all', label: 'All', count: 7 },
    { id: '2bhk', label: '2 BHK', count: 1 },
    { id: '3bhk', label: '3 BHK', count: 4 },
    { id: '4bhk', label: '4 BHK', count: 2 },
  ],

  // Floor Plan Data
  floorPlans: [
    {
      id: '2bhk',
      type: '2 BHK',
      category: '2bhk',
      name: '2 BHK Apartment',
      tower: 'Tower 10',
      units: ['U3', 'U4'],
      totalUnits: 68,
      unitDistribution: '34 each in U3 & U4',
      area: {
        carpet: { sqm: 75.13, sqft: 809 },
        balcony: { sqm: 7.56, sqft: 81 },
        sba: { sqm: 115.71, sqft: 1245 },
      },
      bedrooms: 2,
      bathrooms: 2,
      balconies: 1,
      keyFeatures: [
        'Master Bedroom: 11\'4" x 13\'1"',
        'Living & Dining: 20\'2" x 12\'0"',
        'Kitchen: 8\'0" x 9\'10"',
        'Spacious balcony with garden view',
      ],
      highlights: [
        'Corner unit advantage',
        'Cross ventilation',
        'Vastu compliant',
      ],
      image: '/images/floor-plans/2bhk.jpg',
      floorPlanImage: '/images/floor-plans/2bhk-plan.jpg',
      startingPrice: '₹1.24 Cr',
      priceValue: 12400000,
      featured: true,
      order: 1,
    },
    {
      id: '3b2t',
      type: '3 BHK',
      variant: '3B2T',
      category: '3bhk',
      name: '3 BHK - 3B2T',
      tower: 'Tower 10',
      units: ['U1', 'U2'],
      totalUnits: 66,
      unitDistribution: '32 in U1, 34 in U2',
      area: {
        carpet: { sqm: 89.61, sqft: 965 },
        balcony: { sqm: 8.03, sqft: 86 },
        sba: { sqm: 135.12, sqft: 1454 },
      },
      bedrooms: 3,
      bathrooms: 2,
      balconies: 1,
      keyFeatures: [
        'Master Bedroom: 11\'4" x 13\'1"',
        'Living & Dining: 21\'8" x 12\'0"',
        'Kitchen: 8\'0" x 9\'10"',
        'Compact yet spacious layout',
      ],
      highlights: [
        'Efficient space utilization',
        'Natural lighting',
        'Modern design',
      ],
      image: '/images/floor-plans/3b2t.jpg',
      floorPlanImage: '/images/floor-plans/3b2t-plan.jpg',
      startingPrice: '₹1.45 Cr',
      priceValue: 14500000,
      featured: false,
      order: 2,
    },
    {
      id: '3b3t-s',
      type: '3 BHK',
      variant: '3B3T (S)',
      category: '3bhk',
      name: '3 BHK Small - 3B3T(S)',
      tower: 'Tower 9 & Tower 11',
      units: ['Tower 9: U2/U4', 'Tower 11: U1/U3'],
      totalUnits: 134,
      unitDistribution: '66 each tower',
      area: {
        carpet: { sqm: 104.46, sqft: 1124 },
        balcony: { sqm: 10.18, sqft: 110 },
        sba: { sqm: 157.46, sqft: 1695 },
      },
      bedrooms: 3,
      bathrooms: 3,
      balconies: 2,
      keyFeatures: [
        'Master Bedroom: 11\'4" x 14\'1"',
        'Living & Dining: 21\'4" x 12\'0"',
        'Kitchen: 9\'10" x 9\'7"',
        'All bedrooms with attached bathrooms',
      ],
      highlights: [
        'En-suite bathrooms',
        'Dual balconies',
        'Premium finishes',
      ],
      image: '/images/floor-plans/3b3t-s.jpg',
      floorPlanImage: '/images/floor-plans/3b3t-s-plan.jpg',
      startingPrice: '₹1.69 Cr',
      priceValue: 16900000,
      featured: true,
      order: 3,
    },
    {
      id: '3b3t-m',
      type: '3 BHK',
      variant: '3B3T (M)',
      category: '3bhk',
      name: '3 BHK Medium - 3B3T(M)',
      tower: 'Tower 8',
      units: ['U1', 'U2', 'U3', 'U4'],
      totalUnits: 136,
      unitDistribution: '34 each in U1-U4',
      area: {
        carpet: { sqm: 111.13, sqft: 1196 },
        balcony: { sqm: 18.19, sqft: 196 },
        sba: { sqm: 176.16, sqft: 1896 },
      },
      bedrooms: 3,
      bathrooms: 3,
      balconies: 2,
      keyFeatures: [
        'Master Bedroom: 15\'0" x 11\'4"',
        'Living & Dining: 13\'0" x 23\'5"',
        'Kitchen: 9\'0" x 11\'5"',
        'Large balconies with panoramic views',
      ],
      highlights: [
        'Expansive living area',
        'Extra-large balconies',
        'Premium location in tower',
      ],
      image: '/images/floor-plans/3b3t-m.jpg',
      floorPlanImage: '/images/floor-plans/3b3t-m-plan.jpg',
      startingPrice: '₹1.89 Cr',
      priceValue: 18900000,
      featured: false,
      order: 4,
    },
    {
      id: '3b3t-l',
      type: '3 BHK',
      variant: '3B3T (L)',
      category: '3bhk',
      name: '3 BHK Large - 3B3T(L)',
      tower: 'Tower 9 & Tower 11',
      units: ['Tower 9: U1/U3', 'Tower 11: U2/U4'],
      totalUnits: 136,
      unitDistribution: '68 each tower',
      area: {
        carpet: { sqm: 121.04, sqft: 1303 },
        balcony: { sqm: 19.64, sqft: 211 },
        sba: { sqm: 190.11, sqft: 2046 },
      },
      bedrooms: 3,
      bathrooms: 3,
      balconies: 2,
      keyFeatures: [
        'Master Bedroom: 12\'0" x 15\'0"',
        'Living & Dining: 24\'2" x 13\'0"',
        'Kitchen: 11\'6" x 9\'7"',
        'Walk-in Wardrobe in Master',
      ],
      highlights: [
        'Walk-in wardrobe',
        'Largest 3 BHK configuration',
        'Corner unit benefits',
      ],
      image: '/images/floor-plans/3b3t-l.jpg',
      floorPlanImage: '/images/floor-plans/3b3t-l-plan.jpg',
      startingPrice: '₹2.04 Cr',
      priceValue: 20400000,
      featured: true,
      order: 5,
    },
    {
      id: '4bhk',
      type: '4 BHK',
      category: '4bhk',
      name: '4 BHK Apartment',
      tower: 'Tower 12',
      units: ['U1', 'U2', 'U3', 'U4'],
      totalUnits: 134,
      unitDistribution: '32 in U1, 34 each in U2-U4',
      area: {
        carpet: { sqm: 153.17, sqft: 1649 },
        balcony: { sqm: 23.59, sqft: 254 },
        sba: { sqm: 237.91, sqft: 2561 },
      },
      bedrooms: 4,
      bathrooms: 4,
      balconies: 3,
      keyFeatures: [
        'Master Bedroom: 12\'0" x 16\'0"',
        'Living & Dining: 27\'1" x 13\'7"',
        'Kitchen: 13\'5" x 10\'4"',
        'Walk-in Wardrobe in Master',
      ],
      highlights: [
        'Spacious 4 bedroom layout',
        'Multiple balconies',
        'Premium tower location',
      ],
      image: '/images/floor-plans/4bhk.jpg',
      floorPlanImage: '/images/floor-plans/4bhk-plan.jpg',
      startingPrice: '₹2.56 Cr',
      priceValue: 25600000,
      featured: true,
      order: 6,
    },
    {
      id: '4bhk-l',
      type: '4 BHK',
      variant: '4BHK (L)',
      category: '4bhk',
      name: '4 BHK Large - 4BHK(L)',
      tower: 'Tower 7',
      units: ['U1', 'U2', 'U3', 'U4'],
      totalUnits: 134,
      unitDistribution: '32 in U1, 34 each in U2-U4',
      area: {
        carpet: { sqm: 181.87, sqft: 1958 },
        balcony: { sqm: 23.70, sqft: 255 },
        sba: { sqm: 278.28, sqft: 2995 },
      },
      bedrooms: 4,
      bathrooms: 5,
      balconies: 3,
      keyFeatures: [
        'Master Bedroom: 16\'5" x 12\'2"',
        'Living + Dining + Family: 14\'9" x 30\'0"',
        'Kitchen: 13\'0" x 13\'1"',
        'Sky Deck',
        'WFH/Servant Room',
      ],
      highlights: [
        'Largest unit type',
        'Sky deck feature',
        'Dedicated WFH/Servant room',
        '5 bathrooms',
      ],
      image: '/images/floor-plans/4bhk-l.jpg',
      floorPlanImage: '/images/floor-plans/4bhk-l-plan.jpg',
      startingPrice: '₹2.99 Cr',
      priceValue: 29900000,
      featured: true,
      order: 7,
    },
  ],

  // CTA
  cta: {
    primary: {
      text: 'Download Floor Plan',
      action: 'brochure',
      icon: 'download',
    },
    secondary: {
      text: 'Get Price Quote',
      action: 'pricing',
      icon: 'request_quote',
    },
  },

  // Display Configuration
  displayConfig: {
    showComparison: true,
    enableZoom: true,
    showSpecifications: true,
  },

  // Area Disclaimer
  disclaimer: '*All areas mentioned are approximate. Actual areas may vary slightly. Please refer to the agreement for exact measurements.',
};

// Helper function to get floor plans by category
export const getFloorPlansByCategory = (categoryId) => {
  if (categoryId === 'all') {
    return floorPlansContent.floorPlans;
  }
  return floorPlansContent.floorPlans.filter((plan) => plan.category === categoryId);
};

// Helper function to get featured floor plans
export const getFeaturedFloorPlans = () => {
  return floorPlansContent.floorPlans.filter((plan) => plan.featured);
};

export default floorPlansContent;
