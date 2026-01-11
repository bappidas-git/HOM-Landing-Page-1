// Thank You Page Content for Nambiar District 25 Phase 2

export const thankYouContent = {
  // Page Configuration
  pageTitle: 'Thank You',
  pageSeo: {
    title: 'Thank You | Nambiar District 25 Phase 2',
    description: 'Thank you for your interest in Nambiar District 25 Phase 2. Our team will contact you shortly.',
    noIndex: true, // Don't index thank you page
  },

  // Hero Section
  hero: {
    icon: 'check_circle',
    iconColor: '#4caf50',
    title: 'Thank You for Your Interest!',
    subtitle: 'Your request has been submitted successfully',
    message: 'Our sales team will get in touch with you within 24 hours to assist you further.',
  },

  // Confirmation Details
  confirmation: {
    title: 'What happens next?',
    steps: [
      {
        id: 1,
        icon: 'phone_callback',
        title: 'We\'ll Call You',
        description: 'Our sales team will contact you within 24 hours to discuss your requirements.',
        timeline: 'Within 24 hours',
      },
      {
        id: 2,
        icon: 'email',
        title: 'Check Your Email',
        description: 'We\'ve sent you an email with project brochure and pricing details.',
        timeline: 'Sent immediately',
      },
      {
        id: 3,
        icon: 'calendar_today',
        title: 'Schedule Site Visit',
        description: 'Book a convenient time to visit the project and experience it firsthand.',
        timeline: 'At your convenience',
      },
      {
        id: 4,
        icon: 'handshake',
        title: 'Make It Yours',
        description: 'Complete the booking formalities and own your dream home.',
        timeline: 'When you\'re ready',
      },
    ],
  },

  // Contact Information
  contactInfo: {
    title: 'Need immediate assistance?',
    phone: {
      number: '+91 702 603 4444',
      display: '702 603 4444',
      icon: 'phone',
    },
    whatsapp: {
      number: '+917026034444',
      link: 'https://wa.me/917026034444?text=Hi,%20I%20just%20submitted%20an%20enquiry%20for%20District%2025%20Phase%202.',
      display: 'WhatsApp Us',
      icon: 'chat',
    },
    email: {
      address: 'sales@nambiardistrict25.com',
      display: 'sales@nambiardistrict25.com',
      icon: 'email',
    },
    workingHours: {
      weekdays: '9:00 AM - 8:00 PM',
      weekends: '10:00 AM - 6:00 PM',
    },
  },

  // Quick Actions
  quickActions: [
    {
      id: 'call',
      icon: 'phone',
      text: 'Call Now',
      action: 'tel:+917026034444',
      variant: 'primary',
    },
    {
      id: 'whatsapp',
      icon: 'chat',
      text: 'WhatsApp',
      action: 'https://wa.me/917026034444',
      variant: 'success',
    },
    {
      id: 'directions',
      icon: 'directions',
      text: 'Get Directions',
      action: 'https://maps.google.com/?q=Nambiar+District+25+Dommasandra+Bengaluru',
      variant: 'secondary',
    },
  ],

  // Social Sharing
  socialSharing: {
    enabled: true,
    title: 'Share with friends & family',
    message: 'Check out Nambiar District 25 - Premium apartments in Bengaluru starting ₹1.24 Cr!',
    platforms: ['whatsapp', 'facebook', 'twitter', 'linkedin'],
  },

  // Project Highlights (reminder)
  projectHighlights: [
    {
      icon: 'apartment',
      text: '2, 3 & 4 BHK Premium Apartments',
    },
    {
      icon: 'currency_rupee',
      text: 'Starting ₹1.24 Cr Onwards',
    },
    {
      icon: 'pool',
      text: '7 Acre Clubhouse | 74+ Amenities',
    },
    {
      icon: 'train',
      text: '600m from Upcoming Metro',
    },
  ],

  // Return to Site
  returnCta: {
    text: 'Back to Homepage',
    href: '/',
    icon: 'home',
  },

  // Confetti Configuration
  confetti: {
    enabled: true,
    duration: 3000,
    particleCount: 100,
    spread: 70,
    colors: ['#8B9A46', '#c9a227', '#1a1a2e', '#ffffff'],
  },

  // Animation Settings
  animations: {
    heroDelay: 0.2,
    stepsStagger: 0.15,
    fadeInDuration: 0.6,
  },
};

export default thankYouContent;
