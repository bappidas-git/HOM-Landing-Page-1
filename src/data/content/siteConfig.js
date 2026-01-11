// Site Configuration for Nambiar District 25 Phase 2
// Contains all project-wide configuration and contact details

export const siteConfig = {
  // Project Information
  siteName: 'Nambiar District 25 Phase 2',
  tagline: 'THE SOHO LIFE RETURNS',
  developer: 'Nambiar Builders',
  projectType: 'Integrated Township - Premium Apartments',

  // Unit Information
  unitTypes: ['2 BHK', '3 BHK', '4 BHK'],
  unitVariants: ['2BHK', '3B2T', '3B3T-S', '3B3T-M', '3B3T-L', '4BHK', '4BHK-L'],

  // Contact Information
  contact: {
    phone: '+91 702 603 4444',
    phoneDisplay: '702 603 4444',
    phoneRaw: '7026034444',
    whatsapp: '+917026034444',
    whatsappLink: 'https://wa.me/917026034444',
    email: 'sales@nambiardistrict25.com',
  },

  // Addresses
  address: {
    project: 'Chandapura Dommasandra Road, Dommasandra, Bengaluru - 562125',
    projectShort: 'Dommasandra, Bengaluru',
    pincode: '562125',
    office: '2nd Floor, PR Business Centre, Above Croma, Outer Ring Road, Kadubisanahalli, Marathahalli Post, Bengaluru - 560103',
    city: 'Bengaluru',
    state: 'Karnataka',
    country: 'India',
  },

  // RERA Information
  rera: {
    number: 'PRM/KA/RERA/1251/308/PR/200825/008011',
    state: 'Karnataka',
    website: 'https://rera.karnataka.gov.in',
  },

  // Social Media Links
  social: {
    facebook: 'https://facebook.com/nambiarbuilders',
    instagram: 'https://instagram.com/nambiarbuilders',
    linkedin: 'https://linkedin.com/company/nambiarbuilders',
    youtube: 'https://youtube.com/nambiarbuilders',
    twitter: 'https://twitter.com/nambiarbuilders',
  },

  // Pricing Information
  pricing: {
    starting: '₹1.24 Cr',
    startingValue: 12400000,
    range: '₹1.24 Cr - ₹3 Cr',
    pricePerSqft: '~₹9,960/sq.ft',
    disclaimer: '*Prices are indicative and subject to change. T&C apply.',
  },

  // Key Project Features
  features: {
    clubhouseSize: '7 Acres',
    clubhouseSqft: '2.5 Lakh+ sq.ft',
    openSpace: '80%',
    greenSpace: '40%',
    trees: '3500+',
    amenities: '74+',
    metroDistance: '600m',
    metroStation: 'Muthanallur Metro Station',
    unitsPerFloor: '4',
    elevatorsPerTower: '4',
    phase1Families: '750+',
    towers: 6,
    towerNumbers: [7, 8, 9, 10, 11, 12],
  },

  // Navigation Items
  navigation: [
    { id: 'home', label: 'Home', href: '#home' },
    { id: 'overview', label: 'Overview', href: '#overview' },
    { id: 'amenities', label: 'Amenities', href: '#amenities' },
    { id: 'floor-plans', label: 'Floor Plans', href: '#floor-plans' },
    { id: 'location', label: 'Location', href: '#location' },
    { id: 'pricing', label: 'Pricing', href: '#pricing' },
    { id: 'contact', label: 'Contact', href: '#contact' },
  ],

  // SEO Defaults
  seo: {
    title: 'Nambiar District 25 Phase 2 | Premium 2, 3 & 4 BHK Apartments in Bengaluru',
    description: 'Experience THE SOHO LIFE at Nambiar District 25 Phase 2. Premium 2, 3 & 4 BHK apartments starting ₹1.24 Cr in Dommasandra, Bengaluru. 7-acre clubhouse, 74+ amenities, 600m from metro.',
    keywords: 'Nambiar District 25, Phase 2, premium apartments Bengaluru, 2 BHK Dommasandra, 3 BHK Dommasandra, 4 BHK Bengaluru, SOHO life, integrated township, Nambiar Builders',
    ogImage: '/images/og-image.jpg',
    twitterHandle: '@nambiarbuilders',
  },

  // Site Visit Configuration
  siteVisit: {
    availableSlots: [
      '9:00 AM',
      '10:00 AM',
      '11:00 AM',
      '12:00 PM',
      '2:00 PM',
      '3:00 PM',
      '4:00 PM',
      '5:00 PM',
    ],
    mealOptions: [
      { value: 'breakfast', label: 'Breakfast' },
      { value: 'lunch', label: 'Lunch' },
      { value: 'coffee', label: 'Coffee/Snacks' },
    ],
    pickupDropAvailable: true,
    mealBookingAvailable: true,
    advanceBookingDays: 30,
  },

  // Bank Partners
  bankPartners: [
    { name: 'SBI', logo: '/images/banks/sbi.png' },
    { name: 'HDFC', logo: '/images/banks/hdfc.png' },
    { name: 'ICICI', logo: '/images/banks/icici.png' },
    { name: 'Axis Bank', logo: '/images/banks/axis.png' },
    { name: 'LIC Housing', logo: '/images/banks/lic.png' },
  ],

  // Trust Badges
  trustBadges: [
    {
      id: 'rera',
      title: 'RERA Registered',
      description: 'PRM/KA/RERA/1251/308/PR/200825/008011',
      icon: 'verified',
    },
    {
      id: 'credai',
      title: 'CREDAI Member',
      description: 'Confederation of Real Estate Developers',
      icon: 'business',
    },
    {
      id: 'award',
      title: 'Award Winner',
      description: 'Times Business Awards',
      icon: 'emoji_events',
    },
    {
      id: 'bank',
      title: 'Bank Approved',
      description: 'SBI, HDFC, ICICI, Axis, LIC Housing',
      icon: 'account_balance',
    },
  ],

  // Copyright
  copyright: {
    year: 2025,
    text: '© 2025 Nambiar Builders. All rights reserved.',
  },
};

export default siteConfig;
