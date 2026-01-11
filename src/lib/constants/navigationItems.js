/**
 * Navigation Items for Nambiar District 25
 * Used in Header and Bottom Navigation components
 */

import { SECTION_IDS } from './routes';

// Desktop navigation items
export const DESKTOP_NAV_ITEMS = [
  {
    id: 'home',
    label: 'Home',
    href: `#${SECTION_IDS.HOME}`,
    sectionId: SECTION_IDS.HOME,
  },
  {
    id: 'overview',
    label: 'Overview',
    href: `#${SECTION_IDS.OVERVIEW}`,
    sectionId: SECTION_IDS.OVERVIEW,
  },
  {
    id: 'amenities',
    label: 'Amenities',
    href: `#${SECTION_IDS.AMENITIES}`,
    sectionId: SECTION_IDS.AMENITIES,
  },
  {
    id: 'floor-plans',
    label: 'Floor Plans',
    href: `#${SECTION_IDS.FLOOR_PLANS}`,
    sectionId: SECTION_IDS.FLOOR_PLANS,
  },
  {
    id: 'location',
    label: 'Location',
    href: `#${SECTION_IDS.LOCATION}`,
    sectionId: SECTION_IDS.LOCATION,
  },
  {
    id: 'pricing',
    label: 'Pricing',
    href: `#${SECTION_IDS.PRICING}`,
    sectionId: SECTION_IDS.PRICING,
  },
  {
    id: 'contact',
    label: 'Contact',
    href: `#${SECTION_IDS.CONTACT}`,
    sectionId: SECTION_IDS.CONTACT,
  },
];

// Mobile bottom navigation items (5 items max)
export const BOTTOM_NAV_ITEMS = [
  {
    id: 'home',
    label: 'Home',
    icon: 'Home',
    href: `#${SECTION_IDS.HOME}`,
    sectionId: SECTION_IDS.HOME,
  },
  {
    id: 'plans',
    label: 'Plans',
    icon: 'GridView',
    href: `#${SECTION_IDS.FLOOR_PLANS}`,
    sectionId: SECTION_IDS.FLOOR_PLANS,
  },
  {
    id: 'amenities',
    label: 'Amenities',
    icon: 'Pool',
    href: `#${SECTION_IDS.AMENITIES}`,
    sectionId: SECTION_IDS.AMENITIES,
  },
  {
    id: 'location',
    label: 'Location',
    icon: 'LocationOn',
    href: `#${SECTION_IDS.LOCATION}`,
    sectionId: SECTION_IDS.LOCATION,
  },
  {
    id: 'enquire',
    label: 'Enquire',
    icon: 'Send',
    action: 'openLeadForm',
    isAction: true,
  },
];

// Mobile drawer full navigation items
export const MOBILE_DRAWER_NAV_ITEMS = [
  {
    id: 'home',
    label: 'Home',
    icon: 'Home',
    href: `#${SECTION_IDS.HOME}`,
    sectionId: SECTION_IDS.HOME,
  },
  {
    id: 'overview',
    label: 'Overview',
    icon: 'Info',
    href: `#${SECTION_IDS.OVERVIEW}`,
    sectionId: SECTION_IDS.OVERVIEW,
  },
  {
    id: 'highlights',
    label: 'Highlights',
    icon: 'Star',
    href: `#${SECTION_IDS.HIGHLIGHTS}`,
    sectionId: SECTION_IDS.HIGHLIGHTS,
  },
  {
    id: 'amenities',
    label: 'Amenities',
    icon: 'Pool',
    href: `#${SECTION_IDS.AMENITIES}`,
    sectionId: SECTION_IDS.AMENITIES,
  },
  {
    id: 'floor-plans',
    label: 'Floor Plans',
    icon: 'GridView',
    href: `#${SECTION_IDS.FLOOR_PLANS}`,
    sectionId: SECTION_IDS.FLOOR_PLANS,
  },
  {
    id: 'gallery',
    label: 'Gallery',
    icon: 'PhotoLibrary',
    href: `#${SECTION_IDS.GALLERY}`,
    sectionId: SECTION_IDS.GALLERY,
  },
  {
    id: 'location',
    label: 'Location',
    icon: 'LocationOn',
    href: `#${SECTION_IDS.LOCATION}`,
    sectionId: SECTION_IDS.LOCATION,
  },
  {
    id: 'pricing',
    label: 'Pricing',
    icon: 'CurrencyRupee',
    href: `#${SECTION_IDS.PRICING}`,
    sectionId: SECTION_IDS.PRICING,
  },
  {
    id: 'developer',
    label: 'Developer',
    icon: 'Business',
    href: `#${SECTION_IDS.DEVELOPER}`,
    sectionId: SECTION_IDS.DEVELOPER,
  },
  {
    id: 'faq',
    label: 'FAQ',
    icon: 'QuestionAnswer',
    href: `#${SECTION_IDS.FAQ}`,
    sectionId: SECTION_IDS.FAQ,
  },
  {
    id: 'contact',
    label: 'Contact Us',
    icon: 'ContactPhone',
    href: `#${SECTION_IDS.CONTACT}`,
    sectionId: SECTION_IDS.CONTACT,
  },
];

// Footer quick links
export const FOOTER_QUICK_LINKS = [
  { label: 'Home', href: `#${SECTION_IDS.HOME}` },
  { label: 'About Project', href: `#${SECTION_IDS.OVERVIEW}` },
  { label: 'Floor Plans', href: `#${SECTION_IDS.FLOOR_PLANS}` },
  { label: 'Amenities', href: `#${SECTION_IDS.AMENITIES}` },
  { label: 'Location', href: `#${SECTION_IDS.LOCATION}` },
  { label: 'Contact', href: `#${SECTION_IDS.CONTACT}` },
];

// Footer legal links
export const FOOTER_LEGAL_LINKS = [
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms & Conditions', href: '/terms-and-conditions' },
  { label: 'Disclaimer', href: '/disclaimer' },
  { label: 'RERA Info', href: '#rera' },
];

export default {
  DESKTOP_NAV_ITEMS,
  BOTTOM_NAV_ITEMS,
  MOBILE_DRAWER_NAV_ITEMS,
  FOOTER_QUICK_LINKS,
  FOOTER_LEGAL_LINKS,
};
