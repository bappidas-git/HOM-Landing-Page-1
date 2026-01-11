// Hero Section Content for Nambiar District 25 Phase 2

export const heroContent = {
  // Section Configuration
  sectionId: 'home',

  // Pre-title Badge
  preTitle: {
    text: 'LAUNCHING PHASE 2',
    badge: true,
    animated: true,
  },

  // Main Title
  title: {
    main: 'THE SOHO LIFE',
    highlight: 'RETURNS',
    full: 'THE SOHO LIFE RETURNS',
  },

  // Subtitle
  subtitle: "Live The Soho Life at Bengaluru's Finest Integrated Township",

  // Key Highlights (displayed in hero section)
  highlights: [
    {
      id: 'bhk',
      icon: 'apartment',
      title: '2, 3 & 4 BHK',
      description: 'Premium Apartments',
    },
    {
      id: 'price',
      icon: 'currency_rupee',
      title: 'Starting ₹1.24 Cr*',
      description: 'Onwards',
    },
    {
      id: 'clubhouse',
      icon: 'pool',
      title: '7 Acre Clubhouse',
      description: 'with 74+ Amenities',
    },
    {
      id: 'metro',
      icon: 'train',
      title: '600m',
      description: 'from Upcoming Metro Station',
    },
  ],

  // CTA Buttons
  cta: {
    primary: {
      text: 'Download Brochure',
      action: 'brochure',
      icon: 'download',
      variant: 'contained',
    },
    secondary: {
      text: 'View Price Sheet',
      action: 'pricing',
      icon: 'description',
      variant: 'outlined',
    },
  },

  // Form Configuration
  form: {
    title: 'Get Exclusive Offers',
    subtitle: 'Register your interest now',
    source: 'hero_form',
  },

  // Background Configuration
  background: {
    image: '/images/hero/hero-bg.jpg',
    overlay: 'linear-gradient(135deg, rgba(26, 26, 46, 0.9) 0%, rgba(26, 26, 46, 0.7) 50%, rgba(26, 26, 46, 0.5) 100%)',
    video: null, // Optional video background
  },

  // Trust Badges (shown at bottom of hero)
  trustElements: [
    {
      icon: 'verified',
      text: 'RERA Registered',
    },
    {
      icon: 'groups',
      text: '750+ Happy Families',
    },
    {
      icon: 'emoji_events',
      text: 'Award Winning Project',
    },
  ],

  // Animation Configuration
  animations: {
    titleDelay: 0.2,
    subtitleDelay: 0.4,
    highlightsDelay: 0.6,
    ctaDelay: 0.8,
    formDelay: 0.3,
  },

  // Quick Contact (floating buttons context)
  quickContact: {
    phone: '+917026034444',
    whatsapp: 'https://wa.me/917026034444',
    message: 'Hi, I am interested in Nambiar District 25 Phase 2. Please share more details.',
  },
};

export default heroContent;
