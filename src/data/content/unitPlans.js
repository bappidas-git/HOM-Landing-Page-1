// Unit Plans Section Content for Nambiar District 25 Phase 2
// Tower-wise unit distribution and key plan data

export const unitPlansContent = {
  // Section Configuration
  sectionId: 'unit-plans',

  // Section Titles
  title: 'Tower & Unit Distribution',
  subtitle: 'Find your perfect position',

  // Tower Data
  towers: [
    {
      id: 'tower-7',
      name: 'Tower 7',
      floors: 34,
      unitsPerFloor: 4,
      totalUnits: 134,
      unitType: '4BHK (L)',
      sba: '2,995 sq.ft',
      status: 'launching',
      highlights: ['Largest units', 'Sky Deck', 'Premium views'],
      units: [
        { position: 'U1', count: 32, facing: 'North-East', view: 'Garden View' },
        { position: 'U2', count: 34, facing: 'South-East', view: 'Pool View' },
        { position: 'U3', count: 34, facing: 'South-West', view: 'Clubhouse View' },
        { position: 'U4', count: 34, facing: 'North-West', view: 'City View' },
      ],
    },
    {
      id: 'tower-8',
      name: 'Tower 8',
      floors: 34,
      unitsPerFloor: 4,
      totalUnits: 136,
      unitType: '3B3T (M)',
      sba: '1,896 sq.ft',
      status: 'launching',
      highlights: ['Large balconies', 'Panoramic views', '3 bathrooms'],
      units: [
        { position: 'U1', count: 34, facing: 'North-East', view: 'Garden View' },
        { position: 'U2', count: 34, facing: 'South-East', view: 'Pool View' },
        { position: 'U3', count: 34, facing: 'South-West', view: 'Clubhouse View' },
        { position: 'U4', count: 34, facing: 'North-West', view: 'City View' },
      ],
    },
    {
      id: 'tower-9',
      name: 'Tower 9',
      floors: 34,
      unitsPerFloor: 4,
      totalUnits: 136,
      unitType: 'Mixed (3B3T-S & 3B3T-L)',
      sba: '1,695 - 2,046 sq.ft',
      status: 'launching',
      highlights: ['Multiple configurations', 'Premium location', 'Corner units'],
      units: [
        { position: 'U1', count: 34, type: '3B3T (L)', facing: 'North-East', view: 'Garden View' },
        { position: 'U2', count: 34, type: '3B3T (S)', facing: 'South-East', view: 'Pool View' },
        { position: 'U3', count: 34, type: '3B3T (L)', facing: 'South-West', view: 'Clubhouse View' },
        { position: 'U4', count: 34, type: '3B3T (S)', facing: 'North-West', view: 'City View' },
      ],
    },
    {
      id: 'tower-10',
      name: 'Tower 10',
      floors: 34,
      unitsPerFloor: 4,
      totalUnits: 134,
      unitType: 'Mixed (2BHK & 3B2T)',
      sba: '1,245 - 1,454 sq.ft',
      status: 'launching',
      highlights: ['Entry-level pricing', 'Efficient layouts', 'Great value'],
      units: [
        { position: 'U1', count: 32, type: '3B2T', facing: 'North-East', view: 'Garden View' },
        { position: 'U2', count: 34, type: '3B2T', facing: 'South-East', view: 'Pool View' },
        { position: 'U3', count: 34, type: '2BHK', facing: 'South-West', view: 'Clubhouse View' },
        { position: 'U4', count: 34, type: '2BHK', facing: 'North-West', view: 'City View' },
      ],
    },
    {
      id: 'tower-11',
      name: 'Tower 11',
      floors: 34,
      unitsPerFloor: 4,
      totalUnits: 136,
      unitType: 'Mixed (3B3T-S & 3B3T-L)',
      sba: '1,695 - 2,046 sq.ft',
      status: 'launching',
      highlights: ['Multiple configurations', 'Walk-in wardrobe', 'En-suite bathrooms'],
      units: [
        { position: 'U1', count: 34, type: '3B3T (S)', facing: 'North-East', view: 'Garden View' },
        { position: 'U2', count: 34, type: '3B3T (L)', facing: 'South-East', view: 'Pool View' },
        { position: 'U3', count: 34, type: '3B3T (S)', facing: 'South-West', view: 'Clubhouse View' },
        { position: 'U4', count: 34, type: '3B3T (L)', facing: 'North-West', view: 'City View' },
      ],
    },
    {
      id: 'tower-12',
      name: 'Tower 12',
      floors: 34,
      unitsPerFloor: 4,
      totalUnits: 134,
      unitType: '4BHK',
      sba: '2,561 sq.ft',
      status: 'launching',
      highlights: ['Spacious 4 bedrooms', 'Multiple balconies', 'Walk-in wardrobe'],
      units: [
        { position: 'U1', count: 32, facing: 'North-East', view: 'Garden View' },
        { position: 'U2', count: 34, facing: 'South-East', view: 'Pool View' },
        { position: 'U3', count: 34, facing: 'South-West', view: 'Clubhouse View' },
        { position: 'U4', count: 34, facing: 'North-West', view: 'City View' },
      ],
    },
  ],

  // Unit Position Key
  unitPositions: {
    U1: {
      label: 'Unit 1',
      description: 'North-East facing',
      advantages: ['Morning sunlight', 'Garden views', 'Cool breeze'],
    },
    U2: {
      label: 'Unit 2',
      description: 'South-East facing',
      advantages: ['Pool views', 'Optimal sunlight', 'Clubhouse access'],
    },
    U3: {
      label: 'Unit 3',
      description: 'South-West facing',
      advantages: ['Clubhouse views', 'Evening sunlight', 'Panoramic views'],
    },
    U4: {
      label: 'Unit 4',
      description: 'North-West facing',
      advantages: ['City views', 'Sunset views', 'Cross ventilation'],
    },
  },

  // Summary Statistics
  summary: {
    totalTowers: 6,
    totalUnits: 810,
    floorsPerTower: 34,
    unitsPerFloor: 4,
    elevatorsPerTower: 4,
    parkingRatio: '1:1',
  },

  // Key Plan Configuration
  keyPlan: {
    image: '/images/unit-plans/key-plan.jpg',
    interactiveEnabled: true,
    showOnHover: true,
  },

  // CTA
  cta: {
    text: 'Check Unit Availability',
    action: 'enquiry',
    icon: 'check_circle',
  },

  // Comparison Features
  comparison: {
    enabled: true,
    maxCompare: 3,
    compareButton: 'Compare Units',
  },
};

// Helper function to get tower by ID
export const getTowerById = (towerId) => {
  return unitPlansContent.towers.find((tower) => tower.id === towerId);
};

// Helper function to get all units by type
export const getUnitsByType = (unitType) => {
  const units = [];
  unitPlansContent.towers.forEach((tower) => {
    tower.units.forEach((unit) => {
      if (unit.type === unitType || tower.unitType.includes(unitType)) {
        units.push({
          ...unit,
          tower: tower.name,
          towerId: tower.id,
        });
      }
    });
  });
  return units;
};

export default unitPlansContent;
