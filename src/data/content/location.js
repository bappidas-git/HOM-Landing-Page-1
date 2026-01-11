// Location Section Content for Nambiar District 25 Phase 2

export const locationContent = {
  // Section Configuration
  sectionId: 'location',

  // Section Titles
  title: "An Address in Bengaluru's Fastest Growing Neighbourhood",
  subtitle: 'Strategic location with excellent connectivity',

  // Project Address
  address: {
    full: 'Chandapura Dommasandra Road, Dommasandra, Bengaluru - 562125',
    street: 'Chandapura Dommasandra Road',
    locality: 'Dommasandra',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '562125',
    country: 'India',
  },

  // Map Configuration
  map: {
    latitude: 12.8847,
    longitude: 77.7059,
    zoom: 14,
    embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3889.0!2d77.7059!3d12.8847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDUzJzA1LjAiTiA3N8KwNDInMjEuMiJF!5e0!3m2!1sen!2sin!4v1234567890',
    markerTitle: 'Nambiar District 25 Phase 2',
  },

  // Key Distances
  keyDistances: [
    {
      id: 'metro',
      name: 'Upcoming Muthanallur Metro Station',
      distance: '600m',
      icon: 'train',
      highlight: true,
    },
    {
      id: 'wipro',
      name: 'Wipro SEZ',
      distance: '3 km',
      icon: 'business',
      highlight: false,
    },
    {
      id: 'ec-phase2',
      name: 'Electronic City Phase 2',
      distance: '5 km',
      icon: 'location_city',
      highlight: false,
    },
    {
      id: 'ec-phase1',
      name: 'Electronic City Phase 1',
      distance: '8 km',
      icon: 'location_city',
      highlight: false,
    },
    {
      id: 'sarjapur',
      name: 'Sarjapur Road',
      distance: '2 km',
      icon: 'route',
      highlight: false,
    },
    {
      id: 'whitefield',
      name: 'Whitefield',
      distance: '12 km',
      icon: 'apartment',
      highlight: false,
    },
    {
      id: 'airport',
      name: 'Bengaluru International Airport',
      distance: '45 km',
      icon: 'flight',
      highlight: false,
    },
  ],

  // Nearby Landmarks by Category
  landmarks: {
    itParks: {
      title: 'IT Parks & Offices',
      icon: 'business',
      items: [
        { name: 'Wipro SEZ', distance: '3 km' },
        { name: 'Cisco', distance: '5 km' },
        { name: 'Intel', distance: '6 km' },
        { name: 'Microsoft', distance: '7 km' },
        { name: 'Wells Fargo', distance: '8 km' },
        { name: 'Infosys (Electronic City)', distance: '8 km' },
        { name: 'HCL', distance: '9 km' },
      ],
    },
    schools: {
      title: 'Schools',
      icon: 'school',
      items: [
        { name: 'Bethany High School', distance: '2 km' },
        { name: 'TISB', distance: '4 km' },
        { name: 'Greenwood High', distance: '5 km' },
        { name: 'Oakridge International School', distance: '3 km' },
        { name: 'Inventure Academy', distance: '2 km' },
      ],
    },
    hospitals: {
      title: 'Hospitals',
      icon: 'local_hospital',
      items: [
        { name: 'Manipal Hospitals', distance: '6 km' },
        { name: 'Narayana Health', distance: '7 km' },
      ],
    },
    shopping: {
      title: 'Malls & Shopping',
      icon: 'shopping_cart',
      items: [
        { name: 'Forum Value Mall', distance: '8 km' },
        { name: 'Central Mall', distance: '7 km' },
      ],
    },
  },

  // Investment Highlight
  investmentHighlight: {
    title: 'Investment Potential',
    description: 'Post 2021, the Sarjapura Road area has seen a boom in demand for luxury housing with property prices approaching a 63% rise. Nambiar District 25 is strategically located close to Wipro, Cisco, ITPL, and Electronic City.',
    priceAppreciation: '63%',
    period: 'Since 2021',
  },

  // Connectivity Features
  connectivity: [
    {
      icon: 'train',
      title: 'Metro Connectivity',
      description: 'Just 600m from upcoming Muthanallur Metro Station (Red Line)',
    },
    {
      icon: 'directions_car',
      title: 'Road Network',
      description: 'Excellent connectivity to ORR, Nice Road, and Hosur Road',
    },
    {
      icon: 'business',
      title: 'IT Hub Proximity',
      description: 'Close to Electronic City, Whitefield, and Sarjapur tech parks',
    },
    {
      icon: 'flight',
      title: 'Airport Access',
      description: '45 km to Kempegowda International Airport via ORR',
    },
  ],

  // Location Advantages
  advantages: [
    {
      icon: 'trending_up',
      title: 'Rapid Appreciation',
      description: '63% price rise in Sarjapur-Dommasandra corridor since 2021',
    },
    {
      icon: 'work',
      title: 'Employment Hub',
      description: 'Surrounded by major IT parks and tech companies',
    },
    {
      icon: 'school',
      title: 'Educational Hub',
      description: 'Premium schools within 5 km radius',
    },
    {
      icon: 'nature',
      title: 'Green Living',
      description: 'Peaceful suburb away from city congestion',
    },
  ],

  // CTA
  cta: {
    primary: {
      text: 'Get Directions',
      action: 'directions',
      icon: 'directions',
    },
    secondary: {
      text: 'Schedule Site Visit',
      action: 'sitevisit',
      icon: 'calendar_today',
    },
  },
};

// Helper function to get all landmarks as flat array
export const getAllLandmarks = () => {
  const allLandmarks = [];
  Object.values(locationContent.landmarks).forEach((category) => {
    category.items.forEach((item) => {
      allLandmarks.push({
        ...item,
        category: category.title,
        icon: category.icon,
      });
    });
  });
  return allLandmarks;
};

// Helper function to get landmarks by category
export const getLandmarksByCategory = (categoryKey) => {
  return locationContent.landmarks[categoryKey]?.items || [];
};

export default locationContent;
