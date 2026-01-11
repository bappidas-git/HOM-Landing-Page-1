// Specifications Section Content for Nambiar District 25 Phase 2

export const specificationsContent = {
  // Section Configuration
  sectionId: 'specifications',

  // Section Titles
  title: 'Premium Specifications',
  subtitle: 'Quality in every detail',

  // Specification Categories
  categories: [
    {
      id: 'structure',
      title: 'Structure',
      icon: 'foundation',
      specifications: [
        {
          item: 'Structure Type',
          description: 'RCC framed structure designed as per seismic zone requirements',
        },
        {
          item: 'Walls',
          description: 'AAC blocks / solid concrete blocks for external and internal walls',
        },
        {
          item: 'Plastering',
          description: 'Sand faced plastering for external walls, smooth plastering for internal walls',
        },
      ],
    },
    {
      id: 'lobby',
      title: 'Common Lobby',
      icon: 'meeting_room',
      specifications: [
        {
          item: 'Flooring',
          description: 'All common lobby flooring in vitrified tiles',
        },
        {
          item: 'Wall Dado',
          description: 'Granite/Marble/Ceramic tiles for wall dado',
        },
        {
          item: 'Ceiling',
          description: 'False ceiling with designer lighting',
        },
      ],
    },
    {
      id: 'lift',
      title: 'Lift',
      icon: 'elevator',
      specifications: [
        {
          item: 'Elevators',
          description: '3 passenger lifts & 1 service lift in each tower',
        },
        {
          item: 'Brand',
          description: 'Reputed make with automatic rescue device',
        },
        {
          item: 'Capacity',
          description: '13 passenger capacity lifts',
        },
      ],
    },
    {
      id: 'flooring',
      title: 'Flooring',
      icon: 'layers',
      specifications: [
        {
          item: 'Living & Dining',
          description: 'Vitrified tiles in foyer, living, dining, corridors and all bedrooms',
        },
        {
          item: 'Bedrooms',
          description: 'Vitrified tiles flooring',
        },
        {
          item: 'Balconies',
          description: 'Ceramic/Vitrified tiles in all balconies',
        },
      ],
    },
    {
      id: 'kitchen',
      title: 'Kitchen',
      icon: 'kitchen',
      specifications: [
        {
          item: 'Counter',
          description: 'No counter or dado to be provided (modular kitchen ready)',
        },
        {
          item: 'Exhaust',
          description: 'Provision for exhaust fan',
        },
        {
          item: 'Flooring',
          description: 'Vitrified tiles flooring',
        },
        {
          item: 'Utility',
          description: 'Ceramic tile flooring for utility area',
        },
      ],
    },
    {
      id: 'doors',
      title: 'Doors',
      icon: 'door_front',
      specifications: [
        {
          item: 'Main Door',
          description: 'Engineered wood flush doors with quality hardware',
        },
        {
          item: 'Internal Doors',
          description: 'Engineered wood flush doors',
        },
        {
          item: 'Hardware',
          description: 'Quality hardware from reputed manufacturers',
        },
      ],
    },
    {
      id: 'windows',
      title: 'External Doors & Windows',
      icon: 'window',
      specifications: [
        {
          item: 'External Doors',
          description: 'UPVC/Aluminum frames and sliding shutters with clear glass',
        },
        {
          item: 'Windows',
          description: 'UPVC/Aluminum-framed windows with clear glass',
        },
        {
          item: 'Hardware',
          description: 'Quality hardware with smooth operation',
        },
      ],
    },
    {
      id: 'toilets',
      title: 'Toilets',
      icon: 'bathroom',
      specifications: [
        {
          item: 'Flooring & Walls',
          description: 'Ceramic/Vitrified tiles for flooring and walls up to false ceiling',
        },
        {
          item: 'Wash Basin',
          description: 'All toilets with countertop wash basins',
        },
        {
          item: 'Sanitary Ware',
          description: 'EWCs and chrome-plated fittings from reputed brands',
        },
        {
          item: 'Pipeline',
          description: 'Suspended pipeline in all toilets concealed within false ceiling',
        },
      ],
    },
    {
      id: 'painting',
      title: 'Painting',
      icon: 'format_paint',
      specifications: [
        {
          item: 'External Walls',
          description: 'Premium external emulsion on exterior walls',
        },
        {
          item: 'Internal Walls',
          description: 'Internal walls and ceilings in emulsion',
        },
        {
          item: 'Railings',
          description: 'All railings in MS with enamel paint',
        },
      ],
    },
    {
      id: 'electrical',
      title: 'Electrical',
      icon: 'electrical_services',
      specifications: [
        {
          item: 'Wiring',
          description: 'PVC insulated copper wires with modular switches',
        },
        {
          item: 'Power Points',
          description: 'Sufficient power outlets and light points provided',
        },
        {
          item: 'TV & Internet',
          description: 'Internet and TV points in living room and all bedrooms',
        },
        {
          item: 'AC Provision',
          description: 'Split AC provision in all bedrooms and living room',
        },
      ],
    },
    {
      id: 'security',
      title: 'Security',
      icon: 'security',
      specifications: [
        {
          item: 'Security Cabins',
          description: 'Security cabins at township entry and exit points',
        },
        {
          item: 'CCTV',
          description: 'CCTV coverage on all main entry and exit points',
        },
        {
          item: 'Intercom',
          description: 'Video door phone intercom system',
        },
      ],
    },
    {
      id: 'power',
      title: 'DG Power',
      icon: 'power',
      specifications: [
        {
          item: 'Common Areas',
          description: 'DG backup for all common areas',
        },
        {
          item: 'Apartments',
          description: '100% backup for all apartments',
        },
        {
          item: 'Lifts',
          description: 'Full backup for all lifts',
        },
      ],
    },
  ],

  // Premium Features Highlight
  premiumFeatures: [
    {
      icon: 'apartment',
      title: '4 Units per Floor',
      description: 'Maximum privacy with only 4 apartments per floor',
    },
    {
      icon: 'elevator',
      title: '4 Lifts per Tower',
      description: 'Quick access with dedicated lifts including service lift',
    },
    {
      icon: 'power',
      title: '100% Power Backup',
      description: 'Uninterrupted power supply for your convenience',
    },
    {
      icon: 'water',
      title: '24x7 Water Supply',
      description: 'Reliable water supply from multiple sources',
    },
  ],

  // Download Specifications
  download: {
    enabled: true,
    text: 'Download Full Specifications',
    file: '/downloads/specifications.pdf',
  },

  // Disclaimer
  disclaimer: '*Specifications are subject to change as per actual site conditions and material availability. All specifications are indicative.',

  // CTA
  cta: {
    text: 'Request Detailed Brochure',
    action: 'brochure',
    icon: 'download',
  },
};

// Helper function to get specifications by category
export const getSpecificationsByCategory = (categoryId) => {
  return specificationsContent.categories.find((cat) => cat.id === categoryId);
};

export default specificationsContent;
