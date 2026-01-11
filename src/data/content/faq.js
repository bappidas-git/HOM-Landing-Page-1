// FAQ Section Content for Nambiar District 25 Phase 2

export const faqContent = {
  // Section Configuration
  sectionId: 'faq',

  // Section Titles
  title: 'Frequently Asked Questions',
  subtitle: 'Everything you need to know about District 25 Phase 2',

  // FAQ Items
  faqs: [
    {
      id: 'faq-1',
      question: 'What is the RERA number for District 25 Phase 2?',
      answer: 'The RERA registration number for Nambiar District 25 Phase 2 is PRM/KA/RERA/1251/308/PR/200825/008011. You can verify this on the Karnataka RERA website.',
      category: 'legal',
      order: 1,
    },
    {
      id: 'faq-2',
      question: 'What are the available unit configurations?',
      answer: 'We offer 2 BHK, 3 BHK (multiple variants including 3B2T, 3B3T Small, Medium, and Large), and 4 BHK apartments ranging from 1,245 to 2,995 sq.ft Super Built-up Area.',
      category: 'units',
      order: 2,
    },
    {
      id: 'faq-3',
      question: 'What is the starting price?',
      answer: 'Starting from ₹1.24 Cr* onwards for 2 BHK apartments. Prices vary based on unit type, floor, and facing. Contact us for exact pricing and available units.',
      category: 'pricing',
      order: 3,
    },
    {
      id: 'faq-4',
      question: 'Is there a metro station nearby?',
      answer: 'Yes, the upcoming Muthanallur Metro Station (Red Line) is just 600 meters away from District 25. This will significantly enhance connectivity to the rest of Bengaluru.',
      category: 'location',
      order: 4,
    },
    {
      id: 'faq-5',
      question: 'What are the clubhouse facilities?',
      answer: 'The 7-acre clubhouse includes Olympic-length pool, indoor pool, gym, sports courts (tennis, basketball, badminton, pickleball), spa & salon, restaurant, co-working space, and 74+ amenities for all age groups.',
      category: 'amenities',
      order: 5,
    },
    {
      id: 'faq-6',
      question: 'Is home loan available?',
      answer: 'Yes, the project is approved by all major banks including SBI, HDFC, ICICI, Axis Bank, LIC Housing, and others. We also provide in-house loan processing assistance with competitive interest rates starting 8.40%.',
      category: 'pricing',
      order: 6,
    },
    {
      id: 'faq-7',
      question: 'What is the possession timeline?',
      answer: 'Please contact our sales team for the latest possession timeline and construction updates. We are committed to timely delivery as per RERA guidelines.',
      category: 'project',
      order: 7,
    },
    {
      id: 'faq-8',
      question: 'What is the booking amount?',
      answer: 'The booking amount is typically 10% of the property value. We offer flexible payment plans including construction-linked and down payment options. Contact us for current offers and schemes.',
      category: 'pricing',
      order: 8,
    },
    {
      id: 'faq-9',
      question: 'Do you provide site visit transportation?',
      answer: 'Yes, we offer complimentary pickup and drop service for site visits from anywhere in Bengaluru. You can also opt for complimentary refreshments during your visit.',
      category: 'general',
      order: 9,
    },
    {
      id: 'faq-10',
      question: 'How many units per floor?',
      answer: 'Just 4 units per floor with 4 elevators (3 passenger + 1 service lift), ensuring maximum privacy, exclusivity, and convenience for residents.',
      category: 'units',
      order: 10,
    },
    {
      id: 'faq-11',
      question: 'What is the total project size?',
      answer: 'Nambiar District 25 is spread across a large integrated township with Phase 2 comprising 6 towers (Tower 7-12) with approximately 810+ premium apartments.',
      category: 'project',
      order: 11,
    },
    {
      id: 'faq-12',
      question: 'What about parking facilities?',
      answer: 'Each apartment comes with allocated car parking as per the unit type. Additional parking can be purchased subject to availability. The project also has ample visitor parking.',
      category: 'amenities',
      order: 12,
    },
    {
      id: 'faq-13',
      question: 'Is there power backup?',
      answer: 'Yes, we provide 100% DG power backup for all apartments and common areas, ensuring uninterrupted power supply 24x7.',
      category: 'amenities',
      order: 13,
    },
    {
      id: 'faq-14',
      question: 'What security measures are in place?',
      answer: 'The project features 24x7 security with CCTV surveillance, manned security at all entry/exit points, video door phone intercom in all apartments, and access-controlled entry systems.',
      category: 'amenities',
      order: 14,
    },
    {
      id: 'faq-15',
      question: 'Who is the developer?',
      answer: 'Nambiar Builders is one of Bengaluru\'s most trusted premium builders with 25+ years of experience, having delivered 10+ million sq.ft of quality construction and homes to 5000+ happy families.',
      category: 'general',
      order: 15,
    },
  ],

  // FAQ Categories
  categories: [
    { id: 'all', label: 'All Questions' },
    { id: 'pricing', label: 'Pricing & Payment' },
    { id: 'units', label: 'Units & Floor Plans' },
    { id: 'amenities', label: 'Amenities & Features' },
    { id: 'location', label: 'Location' },
    { id: 'legal', label: 'Legal & RERA' },
    { id: 'project', label: 'Project Details' },
    { id: 'general', label: 'General' },
  ],

  // Display Configuration
  displayConfig: {
    initialDisplayCount: 10,
    showAllText: 'View All FAQs',
    enableSearch: true,
    searchPlaceholder: 'Search FAQs...',
    expandFirstItem: true,
    allowMultipleExpanded: false,
  },

  // Schema.org FAQ Schema (for SEO)
  schemaEnabled: true,

  // Contact CTA
  contactCta: {
    title: 'Have more questions?',
    description: 'Our team is here to help you with any queries',
    primaryCta: {
      text: 'Contact Us',
      action: 'enquiry',
      icon: 'chat',
    },
    secondaryCta: {
      text: 'Call Us',
      action: 'call',
      phone: '+917026034444',
      icon: 'phone',
    },
  },
};

// Helper function to get FAQs by category
export const getFaqsByCategory = (categoryId) => {
  if (categoryId === 'all') {
    return faqContent.faqs;
  }
  return faqContent.faqs.filter((faq) => faq.category === categoryId);
};

// Helper function to search FAQs
export const searchFaqs = (query) => {
  const lowercaseQuery = query.toLowerCase();
  return faqContent.faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(lowercaseQuery) ||
      faq.answer.toLowerCase().includes(lowercaseQuery)
  );
};

// Generate FAQ Schema for SEO
export const generateFaqSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqContent.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
};

export default faqContent;
