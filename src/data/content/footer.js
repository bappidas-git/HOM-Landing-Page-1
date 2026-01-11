// Footer Content for Nambiar District 25 Phase 2

export const footerContent = {
  // About Section
  about: {
    logo: '/images/logo/nambiar-logo-white.png',
    logoAlt: 'Nambiar Builders',
    description: 'Nambiar Builders is one of Bengaluru\'s most trusted premium builders, crafting exceptional living spaces that redefine modern living. District 25 represents our vision of creating world-class integrated townships.',
    socialLinks: [
      {
        id: 'facebook',
        name: 'Facebook',
        url: 'https://facebook.com/nambiarbuilders',
        icon: 'facebook',
      },
      {
        id: 'instagram',
        name: 'Instagram',
        url: 'https://instagram.com/nambiarbuilders',
        icon: 'instagram',
      },
      {
        id: 'linkedin',
        name: 'LinkedIn',
        url: 'https://linkedin.com/company/nambiarbuilders',
        icon: 'linkedin',
      },
      {
        id: 'youtube',
        name: 'YouTube',
        url: 'https://youtube.com/nambiarbuilders',
        icon: 'youtube',
      },
      {
        id: 'twitter',
        name: 'Twitter',
        url: 'https://twitter.com/nambiarbuilders',
        icon: 'twitter',
      },
    ],
  },

  // Quick Links
  quickLinks: {
    title: 'Quick Links',
    links: [
      { id: 'home', label: 'Home', href: '#home' },
      { id: 'overview', label: 'About Project', href: '#overview' },
      { id: 'floor-plans', label: 'Floor Plans', href: '#floor-plans' },
      { id: 'amenities', label: 'Amenities', href: '#amenities' },
      { id: 'location', label: 'Location', href: '#location' },
      { id: 'pricing', label: 'Pricing', href: '#pricing' },
      { id: 'contact', label: 'Contact', href: '#contact' },
    ],
  },

  // Contact Information
  contactInfo: {
    title: 'Contact Us',
    address: {
      project: 'Chandapura Dommasandra Road, Dommasandra, Bengaluru - 562125',
      icon: 'location_on',
    },
    phone: {
      display: '702 603 4444',
      link: 'tel:+917026034444',
      icon: 'phone',
    },
    email: {
      display: 'sales@nambiardistrict25.com',
      link: 'mailto:sales@nambiardistrict25.com',
      icon: 'email',
    },
    whatsapp: {
      display: '+91 702 603 4444',
      link: 'https://wa.me/917026034444',
      icon: 'chat',
    },
  },

  // Legal Links
  legalLinks: {
    title: 'Legal',
    links: [
      { id: 'privacy', label: 'Privacy Policy', href: '/privacy-policy' },
      { id: 'terms', label: 'Terms & Conditions', href: '/terms-conditions' },
      { id: 'disclaimer', label: 'Disclaimer', href: '/disclaimer' },
      { id: 'rera', label: 'RERA Info', href: '/rera' },
    ],
  },

  // RERA Information
  rera: {
    title: 'RERA Information',
    number: 'PRM/KA/RERA/1251/308/PR/200825/008011',
    website: 'https://rera.karnataka.gov.in',
    icon: 'verified',
  },

  // Newsletter
  newsletter: {
    enabled: false, // Set to true to enable newsletter
    title: 'Stay Updated',
    description: 'Subscribe to receive project updates and exclusive offers',
    placeholder: 'Enter your email',
    buttonText: 'Subscribe',
  },

  // Bottom Bar
  bottomBar: {
    copyright: '© 2025 Nambiar Builders. All rights reserved.',
    developer: {
      text: 'Developed with ❤️',
      link: null,
    },
  },

  // Disclaimer
  disclaimer: {
    enabled: true,
    text: 'Disclaimer: This website is for information purposes only. While every care has been taken to ensure accuracy, the developer makes no warranty, representation or undertaking whether expressed or implied. All images, renderings, floor plans, specifications, dimensions and areas mentioned are indicative and may change without notice. This website does not constitute an offer and/or contract of any type between the developer and the recipient. Please refer to the Agreement for Sale for complete details.',
  },

  // Working Hours
  workingHours: {
    title: 'Working Hours',
    weekdays: 'Mon - Fri: 9:00 AM - 8:00 PM',
    weekends: 'Sat - Sun: 10:00 AM - 6:00 PM',
  },

  // Bank Partners (logos)
  bankPartners: {
    title: 'Bank Approvals',
    banks: [
      { name: 'SBI', logo: '/images/banks/sbi.png' },
      { name: 'HDFC', logo: '/images/banks/hdfc.png' },
      { name: 'ICICI', logo: '/images/banks/icici.png' },
      { name: 'Axis Bank', logo: '/images/banks/axis.png' },
      { name: 'LIC Housing', logo: '/images/banks/lic.png' },
    ],
  },

  // Awards (optional display)
  awards: {
    enabled: true,
    items: [
      {
        title: 'Integrated Township of the Year',
        organization: 'Times Business Awards 2024',
        icon: 'emoji_events',
      },
      {
        title: 'Trusted Premium Builder',
        organization: 'Times Business Awards 2024',
        icon: 'verified',
      },
    ],
  },
};

export default footerContent;
