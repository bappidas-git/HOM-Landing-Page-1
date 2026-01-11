// CTA Section Content for Nambiar District 25 Phase 2

export const ctaSectionContent = {
  // Section Configuration
  sectionId: 'contact',

  // Section Titles
  title: 'Ready to Experience the SOHO Life?',
  subtitle: 'Book your exclusive site visit today',

  // Main CTA Content
  content: {
    headline: 'Your Dream Home Awaits',
    description: 'Take the first step towards owning a premium apartment at Bengaluru\'s finest integrated township. Schedule a site visit and experience District 25 firsthand.',
    highlights: [
      'Complimentary pickup & drop from anywhere in Bengaluru',
      'Guided tour of sample apartments',
      'Personalized pricing consultation',
      'Refreshments on us',
    ],
  },

  // CTA Buttons
  cta: {
    primary: {
      text: 'Schedule Site Visit',
      action: 'sitevisit',
      icon: 'calendar_today',
      variant: 'contained',
    },
    secondary: {
      text: 'Call Us: 702 603 4444',
      action: 'call',
      phone: '+917026034444',
      icon: 'phone',
      variant: 'outlined',
    },
    tertiary: {
      text: 'WhatsApp Us',
      action: 'whatsapp',
      link: 'https://wa.me/917026034444?text=Hi,%20I%20am%20interested%20in%20Nambiar%20District%2025%20Phase%202.%20Please%20share%20more%20details.',
      icon: 'chat',
      variant: 'text',
    },
  },

  // Trust Elements
  trustElements: [
    {
      icon: 'groups',
      text: '750+ Happy Families',
      description: 'in Phase 1',
    },
    {
      icon: 'verified',
      text: 'RERA Registered',
      description: 'PRM/KA/RERA/1251/308/PR/200825/008011',
    },
    {
      icon: 'account_balance',
      text: 'Bank Approved',
      description: 'All major banks',
    },
    {
      icon: 'emoji_events',
      text: 'Award Winner',
      description: 'Times Business Awards',
    },
  ],

  // Form Configuration (if embedded form is shown)
  form: {
    title: 'Get in Touch',
    subtitle: 'Fill in your details and we\'ll call you back',
    source: 'cta_form',
    showSiteVisit: true,
    submitText: 'Request Callback',
  },

  // Quick Contact
  quickContact: {
    phone: {
      display: '702 603 4444',
      link: 'tel:+917026034444',
    },
    whatsapp: {
      display: 'WhatsApp',
      link: 'https://wa.me/917026034444',
    },
    email: {
      display: 'sales@nambiardistrict25.com',
      link: 'mailto:sales@nambiardistrict25.com',
    },
  },

  // Background Configuration
  background: {
    type: 'gradient', // 'gradient', 'image', 'solid'
    gradient: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    image: '/images/cta/cta-bg.jpg',
    overlay: true,
    overlayOpacity: 0.8,
  },

  // Animation Elements
  floatingElements: [
    {
      type: 'icon',
      icon: 'apartment',
      position: { top: '10%', left: '5%' },
      animation: 'float',
    },
    {
      type: 'icon',
      icon: 'pool',
      position: { top: '30%', right: '10%' },
      animation: 'float',
    },
    {
      type: 'icon',
      icon: 'park',
      position: { bottom: '20%', left: '8%' },
      animation: 'float',
    },
  ],

  // Limited Time Offer (optional)
  offer: {
    enabled: true,
    title: 'Limited Time Offer',
    description: 'Book now and get complimentary modular kitchen worth ₹5 lakhs',
    validTill: '2025-03-31',
    badge: 'Special Offer',
  },

  // Working Hours
  workingHours: {
    weekdays: '9:00 AM - 8:00 PM',
    weekends: '10:00 AM - 6:00 PM',
    note: 'Site visits available all 7 days',
  },
};

export default ctaSectionContent;
