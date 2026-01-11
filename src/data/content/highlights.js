// Highlights Section Content for Nambiar District 25 Phase 2

export const highlightsContent = {
  // Section Configuration
  sectionId: 'highlights',

  // Section Titles
  title: 'A District in Itself',
  subtitle: 'What makes District 25 special',

  // Highlight Cards
  highlights: [
    {
      id: 'villa-living',
      icon: 'home',
      iconType: 'material',
      title: 'Villa Living in an Apartment',
      description: 'Skyrise apartments designed with all the perks of villa living. No common walls, sunlit windows with large picturesque balconies.',
      image: '/images/highlights/villa-living.jpg',
      order: 1,
    },
    {
      id: 'premium-private',
      icon: 'security',
      iconType: 'material',
      title: "It's Premium. It's Private.",
      description: 'Spacious balconies, no shared walls - the ultimate in privacy and comfort. Just 4 units per floor and 4 elevators in each tower.',
      image: '/images/highlights/premium-private.jpg',
      order: 2,
    },
    {
      id: 'possibilities',
      icon: 'map',
      iconType: 'material',
      title: 'A District Full of Possibilities',
      description: 'Homes, shopping, sports facilities, and a 1km Spine Road connecting it all. Everything you need within walking distance.',
      image: '/images/highlights/possibilities.jpg',
      order: 3,
    },
    {
      id: 'swift-city',
      icon: 'favorite',
      iconType: 'material',
      title: 'The New Beating Heart of SWIFT City',
      description: 'Rub shoulders with the who\'s who of Bengaluru at an ultra-luxury integrated township in the heart of the tech corridor.',
      image: '/images/highlights/swift-city.jpg',
      order: 4,
    },
    {
      id: 'lifestyle',
      icon: 'star',
      iconType: 'material',
      title: 'Put the Style in Lifestyle',
      description: 'Activities galore at the state-of-the-art 7 acre clubhouse. From Olympic-length pool to bowling alley.',
      image: '/images/highlights/lifestyle.jpg',
      order: 5,
    },
    {
      id: 'nature',
      icon: 'eco',
      iconType: 'material',
      title: 'Be Connected to Mother Nature',
      description: 'Live in a sprawling expanse with 80% open space, 40% green space, and 3500+ trees native to Bengaluru.',
      image: '/images/highlights/nature.jpg',
      order: 6,
    },
  ],

  // Additional Feature Points
  additionalFeatures: [
    {
      icon: 'train',
      text: '600m from Upcoming Metro Station',
    },
    {
      icon: 'business',
      text: 'Close to Major IT Hubs',
    },
    {
      icon: 'school',
      text: 'Near Premium Schools',
    },
    {
      icon: 'local_hospital',
      text: 'Quick Access to Hospitals',
    },
  ],

  // CTA
  cta: {
    text: 'View Floor Plans',
    href: '#floor-plans',
    icon: 'grid_view',
  },

  // Animation Settings
  animation: {
    staggerDelay: 0.1,
    cardHoverLift: -10,
    fadeInDuration: 0.6,
  },
};

export default highlightsContent;
