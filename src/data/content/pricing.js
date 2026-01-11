// Pricing Section Content for Nambiar District 25 Phase 2

export const pricingContent = {
  // Section Configuration
  sectionId: 'pricing',

  // Section Titles
  title: 'Transparent Pricing',
  subtitle: 'Invest in your future',

  // Pricing Table Data
  pricingTable: [
    {
      id: '2bhk',
      unitType: '2 BHK',
      carpetArea: '809 sq.ft',
      carpetAreaSqm: 75.13,
      sba: '1,245 sq.ft',
      sbaSqm: 115.71,
      startingPrice: '₹1.24 Cr',
      priceValue: 12400000,
      pricePerSqft: '~₹9,960',
      tower: 'Tower 10',
      availability: 'available',
      featured: true,
    },
    {
      id: '3b2t',
      unitType: '3 BHK (3B2T)',
      carpetArea: '965 sq.ft',
      carpetAreaSqm: 89.61,
      sba: '1,454 sq.ft',
      sbaSqm: 135.12,
      startingPrice: '₹1.45 Cr',
      priceValue: 14500000,
      pricePerSqft: '~₹9,970',
      tower: 'Tower 10',
      availability: 'available',
      featured: false,
    },
    {
      id: '3b3t-s',
      unitType: '3 BHK (S)',
      carpetArea: '1,124 sq.ft',
      carpetAreaSqm: 104.46,
      sba: '1,695 sq.ft',
      sbaSqm: 157.46,
      startingPrice: '₹1.69 Cr',
      priceValue: 16900000,
      pricePerSqft: '~₹9,970',
      tower: 'Tower 9 & 11',
      availability: 'available',
      featured: true,
    },
    {
      id: '3b3t-m',
      unitType: '3 BHK (M)',
      carpetArea: '1,196 sq.ft',
      carpetAreaSqm: 111.13,
      sba: '1,896 sq.ft',
      sbaSqm: 176.16,
      startingPrice: '₹1.89 Cr',
      priceValue: 18900000,
      pricePerSqft: '~₹9,970',
      tower: 'Tower 8',
      availability: 'available',
      featured: false,
    },
    {
      id: '3b3t-l',
      unitType: '3 BHK (L)',
      carpetArea: '1,303 sq.ft',
      carpetAreaSqm: 121.04,
      sba: '2,046 sq.ft',
      sbaSqm: 190.11,
      startingPrice: '₹2.04 Cr',
      priceValue: 20400000,
      pricePerSqft: '~₹9,970',
      tower: 'Tower 9 & 11',
      availability: 'available',
      featured: true,
    },
    {
      id: '4bhk',
      unitType: '4 BHK',
      carpetArea: '1,649 sq.ft',
      carpetAreaSqm: 153.17,
      sba: '2,561 sq.ft',
      sbaSqm: 237.91,
      startingPrice: '₹2.56 Cr',
      priceValue: 25600000,
      pricePerSqft: '~₹9,996',
      tower: 'Tower 12',
      availability: 'available',
      featured: true,
    },
    {
      id: '4bhk-l',
      unitType: '4 BHK (L)',
      carpetArea: '1,958 sq.ft',
      carpetAreaSqm: 181.87,
      sba: '2,995 sq.ft',
      sbaSqm: 278.28,
      startingPrice: '₹2.99 Cr',
      priceValue: 29900000,
      pricePerSqft: '~₹9,983',
      tower: 'Tower 7',
      availability: 'available',
      featured: true,
    },
  ],

  // Price Inclusions
  inclusions: [
    'Basic price of the apartment',
    'Floor rise charges (if applicable)',
    'Clubhouse development charges',
    'Infrastructure development charges',
    'Car parking charges (as per allotment)',
  ],

  // Price Exclusions
  exclusions: [
    'GST (as applicable)',
    'Stamp duty and registration charges',
    'Legal charges',
    'Electricity and water connection charges',
    'Society formation charges',
  ],

  // Current Offers
  offers: [
    {
      id: 'early-bird',
      title: 'Early Bird Discount',
      description: 'Special pricing for early bookings',
      validTill: '2025-03-31',
      terms: 'Limited units only',
    },
    {
      id: 'festive',
      title: 'Festive Offer',
      description: 'Complimentary modular kitchen worth ₹5 lakhs',
      validTill: '2025-02-28',
      terms: 'On select units',
    },
  ],

  // EMI Calculator Configuration
  emiCalculator: {
    enabled: true,
    defaultLoanAmount: 10000000,
    defaultInterestRate: 8.5,
    defaultTenure: 20,
    minLoanAmount: 5000000,
    maxLoanAmount: 30000000,
    minInterestRate: 7,
    maxInterestRate: 12,
    minTenure: 5,
    maxTenure: 30,
  },

  // Bank Partners
  bankPartners: [
    { name: 'SBI', logo: '/images/banks/sbi.png', interestRate: '8.40%' },
    { name: 'HDFC', logo: '/images/banks/hdfc.png', interestRate: '8.50%' },
    { name: 'ICICI', logo: '/images/banks/icici.png', interestRate: '8.55%' },
    { name: 'Axis Bank', logo: '/images/banks/axis.png', interestRate: '8.60%' },
    { name: 'LIC Housing', logo: '/images/banks/lic.png', interestRate: '8.45%' },
  ],

  // Disclaimer
  disclaimer: '*Prices are indicative and subject to change. T&C apply. Please contact our sales team for exact pricing and available units.',

  // CTA
  cta: {
    primary: {
      text: 'Get Exact Price',
      action: 'pricing',
      icon: 'currency_rupee',
    },
    secondary: {
      text: 'Calculate EMI',
      action: 'emi',
      icon: 'calculate',
    },
  },

  // Price Comparison Note
  comparisonNote: 'Prices per sq.ft are among the most competitive in the Sarjapur-Dommasandra corridor for premium integrated townships.',
};

// Helper function to get price range
export const getPriceRange = () => {
  const prices = pricingContent.pricingTable.map((item) => item.priceValue);
  return {
    min: Math.min(...prices),
    max: Math.max(...prices),
    minFormatted: '₹1.24 Cr',
    maxFormatted: '₹2.99 Cr',
  };
};

// Helper function to calculate EMI
export const calculateEMI = (principal, rate, tenure) => {
  const monthlyRate = rate / 12 / 100;
  const months = tenure * 12;
  const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
              (Math.pow(1 + monthlyRate, months) - 1);
  return Math.round(emi);
};

// Helper function to get featured pricing
export const getFeaturedPricing = () => {
  return pricingContent.pricingTable.filter((item) => item.featured);
};

export default pricingContent;
