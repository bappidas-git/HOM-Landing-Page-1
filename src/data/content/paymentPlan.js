// Payment Plan Section Content for Nambiar District 25 Phase 2

export const paymentPlanContent = {
  // Section Configuration
  sectionId: 'payment-plan',

  // Section Titles
  title: 'Flexible Payment Plans',
  subtitle: 'Choose a plan that suits you',

  // Standard Payment Plan
  standardPlan: {
    name: 'Construction Linked Plan',
    description: 'Pay as the construction progresses',
    milestones: [
      {
        id: 'booking',
        stage: 'Booking Amount',
        percentage: 10,
        description: 'On booking confirmation',
        icon: 'bookmark',
      },
      {
        id: 'agreement',
        stage: 'On Agreement',
        percentage: 10,
        description: 'Within 30 days of booking',
        icon: 'description',
      },
      {
        id: 'construction',
        stage: 'Construction Linked',
        percentage: 70,
        description: 'As per construction milestones',
        icon: 'construction',
        breakdown: [
          { stage: 'Foundation Complete', percentage: 10 },
          { stage: 'Ground Floor Slab', percentage: 10 },
          { stage: '5th Floor Slab', percentage: 10 },
          { stage: '10th Floor Slab', percentage: 10 },
          { stage: '15th Floor Slab', percentage: 10 },
          { stage: '20th Floor Slab', percentage: 10 },
          { stage: 'Structure Complete', percentage: 10 },
        ],
      },
      {
        id: 'possession',
        stage: 'On Possession',
        percentage: 10,
        description: 'At the time of handover',
        icon: 'key',
      },
    ],
    recommended: true,
  },

  // Down Payment Plan (Optional)
  downPaymentPlan: {
    name: 'Down Payment Plan',
    description: 'Higher upfront payment with benefits',
    milestones: [
      {
        id: 'dp-booking',
        stage: 'Booking Amount',
        percentage: 20,
        description: 'On booking confirmation',
        icon: 'bookmark',
      },
      {
        id: 'dp-30days',
        stage: 'Within 30 Days',
        percentage: 30,
        description: 'Additional payment',
        icon: 'schedule',
      },
      {
        id: 'dp-construction',
        stage: 'Construction Linked',
        percentage: 40,
        description: 'As per milestones',
        icon: 'construction',
      },
      {
        id: 'dp-possession',
        stage: 'On Possession',
        percentage: 10,
        description: 'At handover',
        icon: 'key',
      },
    ],
    benefits: [
      'Additional discount on basic price',
      'Priority in unit selection',
      'Complimentary parking upgrade',
    ],
    recommended: false,
  },

  // Flexi Plan (Optional)
  flexiPlan: {
    name: 'Flexi Payment Plan',
    description: 'Customized payment schedule',
    description: 'Tailored payment structure based on your requirements',
    available: true,
    contactRequired: true,
  },

  // Loan Information
  loanInfo: {
    title: 'Home Loan Assistance',
    description: 'We help you get the best home loan rates from leading banks',
    features: [
      'Pre-approved project with all major banks',
      'In-house loan processing assistance',
      'Competitive interest rates starting 8.40%',
      'Quick loan approval process',
      'Dedicated relationship manager',
    ],
    bankPartners: [
      { name: 'SBI', logo: '/images/banks/sbi.png', rate: '8.40%' },
      { name: 'HDFC', logo: '/images/banks/hdfc.png', rate: '8.50%' },
      { name: 'ICICI', logo: '/images/banks/icici.png', rate: '8.55%' },
      { name: 'Axis Bank', logo: '/images/banks/axis.png', rate: '8.60%' },
      { name: 'LIC Housing', logo: '/images/banks/lic.png', rate: '8.45%' },
      { name: 'Kotak', logo: '/images/banks/kotak.png', rate: '8.65%' },
      { name: 'PNB Housing', logo: '/images/banks/pnb.png', rate: '8.50%' },
    ],
  },

  // Tax Benefits
  taxBenefits: {
    title: 'Tax Benefits',
    description: 'Maximize your savings with home loan tax benefits',
    benefits: [
      {
        section: 'Section 24(b)',
        benefit: 'Up to ₹2 Lakh',
        description: 'Interest on home loan for self-occupied property',
      },
      {
        section: 'Section 80C',
        benefit: 'Up to ₹1.5 Lakh',
        description: 'Principal repayment of home loan',
      },
      {
        section: 'Section 80EEA',
        benefit: 'Up to ₹1.5 Lakh',
        description: 'Additional interest benefit for first-time buyers',
      },
    ],
    disclaimer: '*Tax benefits are subject to prevailing tax laws. Please consult your tax advisor.',
  },

  // Important Notes
  notes: [
    'All payments to be made via cheque/DD/RTGS/NEFT favoring "Nambiar Builders Pvt Ltd"',
    'GST will be applicable as per government norms',
    'Delayed payment will attract interest at 15% per annum',
    'Stamp duty and registration charges are payable at the time of registration',
  ],

  // CTA
  cta: {
    primary: {
      text: 'Get Payment Plan',
      action: 'enquiry',
      icon: 'request_quote',
    },
    secondary: {
      text: 'Calculate EMI',
      action: 'emi',
      icon: 'calculate',
    },
  },
};

// Helper function to get total percentage at each stage
export const getPaymentProgress = (planType = 'standard') => {
  const plan = planType === 'standard'
    ? paymentPlanContent.standardPlan
    : paymentPlanContent.downPaymentPlan;

  let cumulative = 0;
  return plan.milestones.map((milestone) => {
    cumulative += milestone.percentage;
    return {
      ...milestone,
      cumulative,
    };
  });
};

export default paymentPlanContent;
