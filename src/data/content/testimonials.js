// Testimonials Section Content for Nambiar District 25 Phase 2

export const testimonialsContent = {
  // Section Configuration
  sectionId: 'testimonials',

  // Section Titles
  title: 'What Our Residents Say',
  subtitle: 'Stories from the District 25 community',

  // Testimonials
  testimonials: [
    {
      id: 'testimonial-1',
      name: 'Rajesh K.',
      designation: 'Phase 1 Resident',
      location: 'Tower 3, District 25',
      avatar: '/images/testimonials/avatar-1.jpg',
      rating: 5,
      quote: 'The quality of construction and attention to detail at District 25 is exceptional. We\'re proud to be part of this community. The amenities are world-class!',
      shortQuote: 'The quality of construction and attention to detail at District 25 is exceptional.',
      date: '2024-10-15',
      verified: true,
    },
    {
      id: 'testimonial-2',
      name: 'Priya M.',
      designation: 'Phase 1 Resident',
      location: 'Tower 5, District 25',
      avatar: '/images/testimonials/avatar-2.jpg',
      rating: 5,
      quote: 'From booking to possession, the experience with Nambiar was seamless. The clubhouse is amazing and our kids love the play areas. Best decision we made!',
      shortQuote: 'From booking to possession, the experience with Nambiar was seamless.',
      date: '2024-09-20',
      verified: true,
    },
    {
      id: 'testimonial-3',
      name: 'Arun S.',
      designation: 'Phase 1 Resident',
      location: 'Tower 2, District 25',
      avatar: '/images/testimonials/avatar-3.jpg',
      rating: 5,
      quote: 'Location, amenities, and the SOHO lifestyle - District 25 has it all. Best investment decision we made. Property value has already appreciated 30%!',
      shortQuote: 'Location, amenities, and the SOHO lifestyle - District 25 has it all.',
      date: '2024-08-10',
      verified: true,
    },
    {
      id: 'testimonial-4',
      name: 'Deepa R.',
      designation: 'Phase 1 Resident',
      location: 'Tower 4, District 25',
      avatar: '/images/testimonials/avatar-4.jpg',
      rating: 5,
      quote: 'The community here is wonderful. Weekend markets, events at the clubhouse, and friendly neighbors make it feel like a true neighborhood. Living the SOHO life!',
      shortQuote: 'The community here is wonderful. Weekend markets, events at the clubhouse.',
      date: '2024-07-25',
      verified: true,
    },
    {
      id: 'testimonial-5',
      name: 'Vikram T.',
      designation: 'Phase 1 Resident',
      location: 'Tower 1, District 25',
      avatar: '/images/testimonials/avatar-5.jpg',
      rating: 5,
      quote: 'The 7-acre clubhouse is a game-changer. From the Olympic pool to the sports courts, there\'s always something to do. My fitness has never been better!',
      shortQuote: 'The 7-acre clubhouse is a game-changer.',
      date: '2024-06-15',
      verified: true,
    },
    {
      id: 'testimonial-6',
      name: 'Sneha & Karthik',
      designation: 'Phase 1 Residents',
      location: 'Tower 6, District 25',
      avatar: '/images/testimonials/avatar-6.jpg',
      rating: 5,
      quote: 'As a young couple, we wanted a home that offered both privacy and community. District 25 delivers on both fronts. The design, the space, the views - everything is perfect.',
      shortQuote: 'As a young couple, we wanted a home that offered both privacy and community.',
      date: '2024-05-20',
      verified: true,
    },
    {
      id: 'testimonial-7',
      name: 'Dr. Ramesh N.',
      designation: 'Phase 1 Resident',
      location: 'Tower 3, District 25',
      avatar: '/images/testimonials/avatar-7.jpg',
      rating: 5,
      quote: 'After a long day at the hospital, coming home to District 25 is like entering a resort. The green spaces, the calm atmosphere - it\'s therapeutic.',
      shortQuote: 'Coming home to District 25 is like entering a resort.',
      date: '2024-04-10',
      verified: true,
    },
    {
      id: 'testimonial-8',
      name: 'Meera P.',
      designation: 'Phase 1 Resident',
      location: 'Tower 5, District 25',
      avatar: '/images/testimonials/avatar-8.jpg',
      rating: 5,
      quote: 'The butterfly garden and walking trails are my favorite spots. My morning walks here are so peaceful. Nambiar has truly created something special.',
      shortQuote: 'The butterfly garden and walking trails are my favorite spots.',
      date: '2024-03-15',
      verified: true,
    },
  ],

  // Display Configuration
  displayConfig: {
    autoplay: true,
    autoplayDelay: 5000,
    slidesPerView: {
      mobile: 1,
      tablet: 2,
      desktop: 3,
    },
    showRating: true,
    showVerifiedBadge: true,
    enableReadMore: true,
    maxQuoteLength: 120,
  },

  // Video Testimonials
  videoTestimonials: [
    {
      id: 'video-1',
      name: 'The Sharma Family',
      title: 'Our Journey to District 25',
      thumbnail: '/images/testimonials/video-thumb-1.jpg',
      videoUrl: null, // Placeholder for video URL
      duration: '2:30',
    },
    {
      id: 'video-2',
      name: 'Anand & Priya',
      title: 'Why We Chose District 25',
      thumbnail: '/images/testimonials/video-thumb-2.jpg',
      videoUrl: null, // Placeholder for video URL
      duration: '3:15',
    },
  ],

  // Statistics
  stats: {
    totalResidents: '750+',
    averageRating: 4.9,
    totalReviews: 500,
    recommendationRate: '98%',
  },

  // CTA
  cta: {
    text: 'Join the Community',
    action: 'enquiry',
    icon: 'groups',
  },
};

// Helper function to get featured testimonials
export const getFeaturedTestimonials = (count = 4) => {
  return testimonialsContent.testimonials.slice(0, count);
};

// Helper function to get testimonials by rating
export const getTestimonialsByRating = (minRating = 5) => {
  return testimonialsContent.testimonials.filter(
    (testimonial) => testimonial.rating >= minRating
  );
};

export default testimonialsContent;
