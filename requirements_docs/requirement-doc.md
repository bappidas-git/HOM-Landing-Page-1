# NAMBIAR DISTRICT 25 PHASE 2
# REAL ESTATE LANDING PAGE - COMPLETE REQUIREMENTS DOCUMENT

================================================================================
## TABLE OF CONTENTS
================================================================================

1. PROJECT OVERVIEW
2. TECHNOLOGY STACK
3. FILE STRUCTURE
4. LANDING PAGE REQUIREMENTS
5. ADMIN PANEL REQUIREMENTS
6. API SPECIFICATIONS
7. LEAD MANAGEMENT SYSTEM
8. SEO & MARKETING FEATURES
9. CONTENT DATA - NAMBIAR DISTRICT 25
10. COMPONENT SPECIFICATIONS

================================================================================
## 1. PROJECT OVERVIEW
================================================================================

### 1.1 Project Information
- **Project Name:** Nambiar District 25 Phase 2
- **Developer:** Nambiar Builders
- **Location:** Chandapura Dommasandra Road, Dommasandra, Bengaluru - 562125
- **Project Type:** Integrated Township - Premium Apartments
- **Unit Types:** 2 BHK, 3 BHK (3B2T, 3B3T-S, 3B3T-M, 3B3T-L), 4 BHK
- **Price Range:** Starting ₹1.24 Cr onwards
- **RERA Number:** PRM/KA/RERA/1251/308/PR/200825/008011
- **Contact:** 702 603 4444
- **Tagline:** "THE SOHO LIFE RETURNS"

### 1.2 Purpose
Create a high-converting real estate landing page optimized for:
- Google Ads (PPC campaigns)
- Meta Ads (Facebook/Instagram)
- SEO optimization
- Lead generation with duplicate prevention
- Admin panel for lead management

### 1.3 Key Features
- Single-page landing design with smooth scroll navigation
- Lead capture form with duplicate prevention (mobile/email)
- Site visit booking with pickup/drop and meal preferences
- Admin panel for complete lead and SEO management
- Mobile-first responsive design with app-like feel
- Bottom navigation for mobile/tablet devices
- Modern animations using Framer Motion

================================================================================
## 2. TECHNOLOGY STACK
================================================================================

### 2.1 Frontend
- **Framework:** Next.js 14.2.15 (Pages Router)
- **Language:** JavaScript only (NO TypeScript - .jsx/.js files only)
- **UI Library:** Material UI (MUI) v6
- **Animation:** Framer Motion v11
- **Styling:** CSS Modules (.module.css) + MUI Theme
- **Form Handling:** React Hook Form + Yup validation
- **HTTP Client:** Axios
- **Charts:** Chart.js + react-chartjs-2
- **Carousel:** Swiper.js
- **Date Handling:** date-fns
- **Notifications:** react-hot-toast
- **Confetti:** canvas-confetti

### 2.2 Backend (Mock API)
- **Mock Server:** JSON Server v0.17.4
- **Database:** db.json file
- **Development Port:** 3001

### 2.3 Scripts
```json
{
  "dev": "concurrently \"next dev\" \"json-server --watch db.json --port 3001\"",
  "build": "next build",
  "start": "next start",
  "lint": "next lint"
}
```

================================================================================
## 3. FILE STRUCTURE
================================================================================

```
nambiar-district25/
├── .env.local                          # Environment variables
├── .env.example                        # Environment template
├── .gitignore
├── package.json
├── next.config.js
├── jsconfig.json
├── db.json                             # JSON Server database
│
├── public/
│   ├── favicon.ico
│   ├── robots.txt
│   ├── sitemap.xml
│   └── images/
│       └── placeholder/
│
└── src/
    ├── pages/
    │   ├── _app.jsx
    │   ├── _document.jsx
    │   ├── index.jsx                   # Main landing page
    │   ├── thank-you.jsx               # Thank you page
    │   ├── 404.jsx
    │   ├── 500.jsx
    │   └── admin/
    │       ├── index.jsx               # Admin redirect
    │       ├── login.jsx
    │       ├── dashboard.jsx
    │       ├── leads/
    │       │   ├── index.jsx
    │       │   └── [id].jsx
    │       ├── seo/
    │       │   └── index.jsx
    │       ├── pixels/
    │       │   └── index.jsx
    │       ├── schema/
    │       │   └── index.jsx
    │       ├── keywords/
    │       │   └── index.jsx
    │       ├── settings/
    │       │   └── index.jsx
    │       └── audit-log/
    │           └── index.jsx
    │
    ├── components/
    │   ├── common/
    │   │   ├── Header/
    │   │   ├── Footer/
    │   │   ├── BottomNavigation/
    │   │   ├── MobileDrawer/
    │   │   ├── LeadForm/
    │   │   ├── LeadFormPopup/
    │   │   ├── FloatingCTA/
    │   │   ├── SectionWrapper/
    │   │   ├── SectionTitle/
    │   │   ├── AnimatedCard/
    │   │   ├── ImageGallery/
    │   │   ├── Loading/
    │   │   ├── ScrollToTop/
    │   │   └── SEOHead/
    │   │
    │   ├── landing/
    │   │   ├── Hero/
    │   │   ├── Overview/
    │   │   ├── Highlights/
    │   │   ├── Amenities/
    │   │   ├── FloorPlans/
    │   │   ├── UnitPlans/
    │   │   ├── Gallery/
    │   │   ├── VirtualTour/
    │   │   ├── Location/
    │   │   ├── Pricing/
    │   │   ├── PaymentPlan/
    │   │   ├── Developer/
    │   │   ├── Specifications/
    │   │   ├── Testimonials/
    │   │   ├── FAQ/
    │   │   ├── CTASection/
    │   │   └── TrustBadges/
    │   │
    │   ├── admin/
    │   │   ├── AdminLayout/
    │   │   ├── Sidebar/
    │   │   ├── AdminHeader/
    │   │   ├── DashboardStats/
    │   │   ├── LeadsTable/
    │   │   ├── LeadDetail/
    │   │   ├── SEOManager/
    │   │   ├── PixelManager/
    │   │   ├── SchemaManager/
    │   │   ├── KeywordManager/
    │   │   ├── AuditLog/
    │   │   └── Charts/
    │   │
    │   └── thank-you/
    │       ├── Confetti/
    │       ├── ThankYouHero/
    │       ├── NextSteps/
    │       └── ContactInfo/
    │
    ├── context/
    │   ├── AuthContext.jsx
    │   ├── LeadFormContext.jsx
    │   ├── UIContext.jsx
    │   └── index.js
    │
    ├── hooks/
    │   ├── useAuth.js
    │   ├── useLeadForm.js
    │   ├── useResponsive.js
    │   ├── useScrollPosition.js
    │   ├── useLocalStorage.js
    │   ├── useIntersectionObserver.js
    │   ├── useGeolocation.js
    │   ├── useIPAddress.js
    │   └── index.js
    │
    ├── lib/
    │   ├── api/
    │   │   ├── axiosInstance.js
    │   │   ├── endpoints.js
    │   │   ├── leads.js
    │   │   ├── auth.js
    │   │   ├── seo.js
    │   │   ├── pixels.js
    │   │   ├── schema.js
    │   │   ├── keywords.js
    │   │   ├── auditLog.js
    │   │   ├── dashboard.js
    │   │   └── index.js
    │   │
    │   ├── utils/
    │   │   ├── validation.js
    │   │   ├── formatters.js
    │   │   ├── geolocation.js
    │   │   ├── ipAddress.js
    │   │   ├── storage.js
    │   │   ├── duplicateCheck.js
    │   │   └── index.js
    │   │
    │   └── constants/
    │       ├── routes.js
    │       ├── navigationItems.js
    │       ├── adminNavigation.js
    │       ├── seoDefaults.js
    │       ├── schemaTemplates.js
    │       └── index.js
    │
    ├── styles/
    │   ├── globals.css
    │   ├── variables.css
    │   ├── animations.css
    │   ├── admin.css
    │   └── thank-you.css
    │
    ├── theme/
    │   ├── muiTheme.js
    │   ├── colors.js
    │   └── index.js
    │
    └── data/
        └── content/
            ├── siteConfig.js
            ├── hero.js
            ├── overview.js
            ├── highlights.js
            ├── amenities.js
            ├── floorPlans.js
            ├── unitPlans.js
            ├── gallery.js
            ├── location.js
            ├── pricing.js
            ├── paymentPlan.js
            ├── developer.js
            ├── specifications.js
            ├── testimonials.js
            ├── faq.js
            ├── ctaSection.js
            ├── thankYou.js
            ├── footer.js
            └── index.js
```

================================================================================
## 4. LANDING PAGE REQUIREMENTS
================================================================================

### 4.1 Header Component
**Path:** `src/components/common/Header/`

**Desktop (>1024px):**
- Fixed position at top, transparent initially
- Solid background (#1a1a2e) on scroll
- Logo on left: Nambiar Builders + District 25
- Navigation menu in center:
  - Home, Overview, Amenities, Floor Plans, Location, Pricing, Contact
- CTA button on right: "Book Site Visit" (opens popup form)
- Smooth scroll to sections on nav click

**Mobile/Tablet (≤1024px):**
- Header is HIDDEN
- Bottom navigation takes over

---

### 4.2 Bottom Navigation Component
**Path:** `src/components/common/BottomNavigation/`

**Visible on Mobile/Tablet only (≤1024px):**
- Fixed at bottom with safe area padding
- 5 navigation items with icons:
  1. Home (HomeIcon) - scrolls to top
  2. Plans (GridViewIcon) - scrolls to floor plans
  3. Amenities (PoolIcon) - scrolls to amenities
  4. Location (LocationOnIcon) - scrolls to location
  5. Enquire (SendIcon) - opens lead form popup
- Active state indicator (colored underline)
- Background blur effect

---

### 4.3 Mobile Drawer Component
**Path:** `src/components/common/MobileDrawer/`

**Features:**
- Full-screen drawer from bottom (Framer Motion)
- Logo at top
- Full navigation menu with icons
- Quick contact buttons:
  - Call Now: tel:+917026034444
  - WhatsApp: https://wa.me/917026034444
- Social media links
- RERA information
- Close button (X icon)

---

### 4.4 Hero Section
**Path:** `src/components/landing/Hero/`

**Layout:**
- Full viewport height (100vh)
- Background: Gradient overlay on hero image
- Split layout: Content left (60%), Form right (40%) on desktop
- Stacked on mobile: Content top, Form bottom

**Content (Left Side):**
```
Pre-title: "LAUNCHING PHASE 2"
Main Title: "THE SOHO LIFE RETURNS"
Subtitle: "Live The Soho Life at Bengaluru's Finest Integrated Township"

Key Highlights (4 items in grid):
- 2, 3 & 4 BHK Premium Apartments
- Starting ₹1.24 Cr* Onwards
- 7 Acre Clubhouse with 74+ Amenities
- 600m from Upcoming Metro Station

CTA Buttons:
- Primary: "Download Brochure" (opens popup)
- Secondary: "View Price Sheet" (opens popup)
```

**Form (Right Side):**
- Embedded LeadForm component
- Title: "Get Exclusive Offers"
- Subtitle: "Register your interest now"

**Animations:**
- Text fade-in from left (staggered)
- Form slide-in from right
- Floating badge animations
- Parallax effect on scroll

---

### 4.5 Lead Form Component
**Path:** `src/components/common/LeadForm/`

**Form Fields:**

1. **Name** (required)
   - Type: Text input
   - Placeholder: "Enter your name"
   - Validation: Min 2 characters, letters only

2. **Mobile Number** (required)
   - Type: Phone input with +91 prefix
   - Placeholder: "10-digit mobile number"
   - Validation: Exactly 10 digits, Indian mobile format
   - **Duplicate Check:** Check against submittedContacts collection

3. **Email** (required)
   - Type: Email input
   - Placeholder: "Enter your email"
   - Validation: Valid email format
   - **Duplicate Check:** Check against submittedContacts collection

4. **Message** (optional)
   - Type: Textarea
   - Placeholder: "Any specific requirements?"
   - Max: 500 characters

5. **Site Visit Toggle** (optional)
   - Label: "I want to schedule a site visit"
   - Type: Switch/Toggle
   - Shows additional fields when enabled:

   5a. **Site Visit Date**
       - Type: Date picker
       - Min: Tomorrow
       - Max: 30 days from today

   5b. **Site Visit Time**
       - Type: Dropdown
       - Options: 9:00 AM, 10:00 AM, 11:00 AM, 12:00 PM, 2:00 PM, 3:00 PM, 4:00 PM, 5:00 PM

6. **Pickup & Drop Toggle** (conditional - shows if site visit enabled)
   - Label: "I want free pickup & drop service"
   - Type: Switch/Toggle
   - Shows additional fields when enabled:

   6a. **Pickup Location**
       - Type: Text input
       - Placeholder: "Enter pickup address"

   6b. **Drop Location**
       - Type: Text input with checkbox
       - Checkbox: "Same as pickup location"

7. **Meal Preference Toggle** (conditional - shows if site visit enabled)
   - Label: "I would like complimentary refreshments"
   - Type: Switch/Toggle
   - Shows radio options when enabled:
     - Breakfast
     - Lunch
     - Coffee/Snacks

**Form Behavior:**
- Progressive disclosure (show more options as user engages)
- Real-time validation with error messages
- Loading state during submission (spinner in button)
- Success: Redirect to /thank-you page
- Error: Show toast notification

**Duplicate Prevention Logic:**
```javascript
// On form submit:
1. Check if mobile exists in submittedContacts
2. Check if email exists in submittedContacts
3. If either exists:
   - Show error: "You have already submitted an inquiry. Our team will contact you soon."
   - Do NOT submit the form
4. If neither exists:
   - Submit lead to /leads endpoint
   - Add mobile+email to /submittedContacts
   - Redirect to thank-you page
```

**Data Captured (Hidden Fields):**
- Source: "hero_form" | "popup_form" | "cta_form"
- IP Address: From IP API
- Location: City, State, Country (from IP)
- User Agent: Browser info
- UTM Parameters: utm_source, utm_medium, utm_campaign, utm_term, utm_content
- Timestamp: ISO format

---

### 4.6 Lead Form Popup Component
**Path:** `src/components/common/LeadFormPopup/`

**Triggers:**
- "Download Brochure" button click
- "View Price Sheet" button click
- "Book Site Visit" button click
- "Enquire Now" in bottom nav
- Exit intent detection (desktop only)
- After 30 seconds on page (once per session)

**Popup Content:**
- Modal with backdrop blur
- Dynamic title based on trigger:
  - Brochure: "Get Brochure & Price List"
  - Price: "Get Exclusive Pricing Details"
  - Site Visit: "Schedule Your Site Visit"
  - Default: "Register Your Interest"
- Same LeadForm component
- Close button (X) in corner

**Animations:**
- Backdrop fade in
- Modal scale + fade from center
- Close: reverse animations

---

### 4.7 Overview Section
**Path:** `src/components/landing/Overview/`

**Content:**
```
Section ID: "overview"

Title: "Live The Soho Life"

Description:
"It's a breezy morning. You're enjoying a cup of French Press outside a quaint café. 
Right across the street is the theater where you've got tickets to an internationally 
renowned musical. After the performance, it's time for lunch at a Michelin-star restaurant, 
before taking a stroll through a beautiful, modern neighbourhood.

Ah, the SOHO Life is amazing. But you're not in SOHO. You're in Bengaluru.

District 25 is our take on The SOHO Life - a place where work meets play, where art 
thrives and nature blossoms. Our aim is to build one of the world's finest neighbourhoods 
right here in the Garden City, an address whose true value will be felt for generations to come.

Phase 1 saw over 750+ happy families find their forever home at Nambiar District 25. 
And now, as we launch Phase 2, it could be you."

Key Stats (animated counters):
- 750+ Happy Families in Phase 1
- 7 Acre Clubhouse
- 80% Open Space
- 3500+ Trees
- 74+ Amenities
- 4 Units per Floor

CTA: "Explore Amenities" (scrolls to amenities section)
```

**Layout:**
- Two-column: Image left, Content right
- Image: Club SOHO pool rendering
- Mobile: Stacked (image top, content bottom)

---

### 4.8 Highlights Section
**Path:** `src/components/landing/Highlights/`

**Content:**
```
Section ID: "highlights"
Title: "A District in Itself"
Subtitle: "What makes District 25 special"

Highlight Cards (6 items):

1. Villa Living in an Apartment
   Icon: HomeIcon
   Description: "Skyrise apartments designed with all the perks of villa living. 
   No common walls, sunlit windows with large picturesque balconies."

2. It's Premium. It's Private.
   Icon: SecurityIcon
   Description: "Spacious balconies, no shared walls - the ultimate in privacy and comfort. 
   Just 4 units per floor and 4 elevators in each tower."

3. A District Full of Possibilities
   Icon: MapIcon
   Description: "Homes, shopping, sports facilities, and a 1km Spine Road connecting it all. 
   Everything you need within walking distance."

4. The New Beating Heart of SWIFT City
   Icon: FavoriteIcon
   Description: "Rub shoulders with the who's who of Bengaluru at an ultra-luxury 
   integrated township in the heart of the tech corridor."

5. Put the Style in Lifestyle
   Icon: StarIcon
   Description: "Activities galore at the state-of-the-art 7 acre clubhouse. 
   From Olympic-length pool to bowling alley."

6. Be Connected to Mother Nature
   Icon: NatureIcon
   Description: "Live in a sprawling expanse with 80% open space, 40% green space, 
   and 3500+ trees native to Bengaluru."
```

**Layout:**
- 3 columns on desktop, 2 on tablet, 1 on mobile
- Cards with hover lift effect
- Staggered entrance animation

---

### 4.9 Amenities Section
**Path:** `src/components/landing/Amenities/`

**Content:**
```
Section ID: "amenities"
Title: "74+ World-Class Amenities"
Subtitle: "Experience the SOHO lifestyle"

Categories (Tab Filter):
1. All
2. Sports & Fitness
3. Leisure & Recreation
4. Nature & Gardens
5. Clubhouse

OUTDOOR AMENITIES (Phase 1 & 2):
1. Carriage way with cycling lane
2. Verge treeline
3. Raised pedestrian crossing
4. Treeline with benches
5. Podium driveway & dropoff
6. Cycle stand
7. Raised bus halt zone (School bus bay)
8. Waiting area - Semi-covered in boulevard
9. Open pavilions
10. Maidan with large trees
11. Santhe street along bus waiting area
12. Senior's hall
13. Hobby center
14. Swimming pool
15. Kids pool
16. Poolside deck
17. Circle time
18. Space for Martial arts Dojo / Hobby centre
19. Tree court & sportsmen plaza
20. Pickleball court
21. Basketball court
22. Volleyball court
23. Tennis court
24. Plaza
25. Seating arena
26. Orchard around pavilion
27. Rain tree plaza
28. Pocket park
29. Palm court
30. Heliconia garden
31. Sacred flower garden
32. Medicinal plant beds
33. Multipurpose land with peripheral mounds
34. Pollinator garden
35. Butterfly garden & walkway
36. Hammock garden
37. Nocturnal garden
38. Bamboo groves around parking
39. Tree courts
40. Pet pocket park
41. Multipurpose pavilion
42. Yoga deck
43. Trampoline
44. Kids' Play zones
45. Swing plaza
46. Roof deck
47. Exercise garden
48. Laughter club
49. Outdoor work station

CLUBHOUSE AMENITIES:
50. SOHO Zone - Flea Market
51. Arrival courts
52. Sculpture court
53. Food Truck zone
54. Promenade
55. Pavilion
56. Activity zone
57. Great lawn
58. Projection wall
59. Play area
60. Kids' play zone 1
61. Kids' play zone 2 - totlot
62. Tree court
63. Two wheeler parking
64. Truck parking
65. Poolside deck
66. Family pool
67. Olympic length pool
68. Party lawn
69. Oval glade
70. Green buffer
71. Water court
72. Observatory
73. Indoor pool
74. Spa & Salon
```

**Layout:**
- Filter tabs at top
- Grid of amenity cards with icons
- Show 12 initially, "View All" button to expand
- Search/filter functionality

---

### 4.10 Floor Plans Section
**Path:** `src/components/landing/FloorPlans/`

**Content:**
```
Section ID: "floor-plans"
Title: "Choose Your Dream Home"
Subtitle: "Thoughtfully designed floor plans"

Unit Types (Tab Filter):
1. All
2. 2 BHK
3. 3 BHK
4. 4 BHK

FLOOR PLAN DATA:

1. 2 BHK (Tower 10 - Units U3, U4)
   - Type: 2BHK
   - Carpet Area: 75.13 sq.m | 809 sq.ft
   - Balcony Area: 7.56 sq.m | 81 sq.ft
   - S.B.A: 115.71 sq.m | 1,245 sq.ft
   - No. of Units: 68 (34 each in U3 & U4)
   - Bedrooms: 2
   - Bathrooms: 2
   - Key Features: Master Bedroom (11'4" x 13'1"), Living & Dining (20'2" x 12'0"), Kitchen (8'0" x 9'10")

2. 3 BHK - 3B2T (Tower 10 - Units U1, U2)
   - Type: 3B2T
   - Carpet Area: 89.61 sq.m | 965 sq.ft
   - Balcony Area: 8.03 sq.m | 86 sq.ft
   - S.B.A: 135.12 sq.m | 1,454 sq.ft
   - No. of Units: 66 (32 in U1, 34 in U2)
   - Bedrooms: 3
   - Bathrooms: 2
   - Key Features: Master Bedroom (11'4" x 13'1"), Living & Dining (21'8" x 12'0"), Kitchen (8'0" x 9'10")

3. 3 BHK Small - 3B3T(S) (Tower 9 U2/U4, Tower 11 U1/U3)
   - Type: 3B3T (S)
   - Carpet Area: 104.46 sq.m | 1,124 sq.ft
   - Balcony Area: 10.18 sq.m | 110 sq.ft
   - S.B.A: 157.46 sq.m | 1,695 sq.ft
   - No. of Units: 134 (66 each tower)
   - Bedrooms: 3
   - Bathrooms: 3
   - Key Features: Master Bedroom (11'4" x 14'1"), Living & Dining (21'4" x 12'0"), Kitchen (9'10" x 9'7")

4. 3 BHK Medium - 3B3T(M) (Tower 8 - All Units)
   - Type: 3B3T (M)
   - Carpet Area: 111.13 sq.m | 1,196 sq.ft
   - Balcony Area: 18.19 sq.m | 196 sq.ft
   - S.B.A: 176.16 sq.m | 1,896 sq.ft
   - No. of Units: 136 (34 each in U1-U4)
   - Bedrooms: 3
   - Bathrooms: 3
   - Key Features: Master Bedroom (15'0" x 11'4"), Living & Dining (13'0" x 23'5"), Kitchen (9'0" x 11'5")

5. 3 BHK Large - 3B3T(L) (Tower 9 U1/U3, Tower 11 U2/U4)
   - Type: 3B3T (L)
   - Carpet Area: 121.04 sq.m | 1,303 sq.ft
   - Balcony Area: 19.64 sq.m | 211 sq.ft
   - S.B.A: 190.11 sq.m | 2,046 sq.ft
   - No. of Units: 136 (68 each tower)
   - Bedrooms: 3
   - Bathrooms: 3
   - Key Features: Master Bedroom (12'0" x 15'0"), Living & Dining (24'2" x 13'0"), Kitchen (11'6" x 9'7"), Walk-in Wardrobe

6. 4 BHK (Tower 12 - All Units)
   - Type: 4BHK
   - Carpet Area: 153.17 sq.m | 1,649 sq.ft
   - Balcony Area: 23.59 sq.m | 254 sq.ft
   - S.B.A: 237.91 sq.m | 2,561 sq.ft
   - No. of Units: 134 (32 in U1, 34 each in U2-U4)
   - Bedrooms: 4
   - Bathrooms: 4
   - Key Features: Master Bedroom (12'0" x 16'0"), Living & Dining (27'1" x 13'7"), Kitchen (13'5" x 10'4"), Walk-in Wardrobe

7. 4 BHK Large - 4BHK(L) (Tower 7 - All Units)
   - Type: 4BHK (L)
   - Carpet Area: 181.87 sq.m | 1,958 sq.ft
   - Balcony Area: 23.70 sq.m | 255 sq.ft
   - S.B.A: 278.28 sq.m | 2,995 sq.ft
   - No. of Units: 134 (32 in U1, 34 each in U2-U4)
   - Bedrooms: 4
   - Bathrooms: 5
   - Key Features: Master Bedroom (16'5" x 12'2"), Living+Dining+Family (14'9" x 30'0"), Kitchen (13'0" x 13'1"), Sky Deck, WFH/Servant Room
```

**Features:**
- Tab filter by BHK type
- Floor plan image viewer with zoom
- Specifications table below each plan
- "Download Floor Plan" CTA (triggers popup)
- Swiper carousel for mobile

---

### 4.11 Unit Plans Section
**Path:** `src/components/landing/UnitPlans/`

**Content:**
- Tower-wise unit distribution table
- Key plan showing unit positions (U1, U2, U3, U4)
- Interactive key plan with hover states
- Unit comparison feature

---

### 4.12 Gallery Section
**Path:** `src/components/landing/Gallery/`

**Categories:**
- All
- Exterior Views
- Clubhouse
- Amenities
- Master Plan
- Aerial Views

**Features:**
- Masonry grid layout
- Lightbox on click (Swiper)
- Image zoom and navigation
- Download option
- Share option (copy link)

---

### 4.13 Virtual Tour Section
**Path:** `src/components/landing/VirtualTour/`

**Content:**
- 360° virtual tour embed (placeholder iframe)
- Video walkthrough embed
- Sample flat video
- Construction progress video (placeholder)

---

### 4.14 Location Section
**Path:** `src/components/landing/Location/`

**Content:**
```
Section ID: "location"
Title: "An Address in Bengaluru's Fastest Growing Neighbourhood"
Subtitle: "Strategic location with excellent connectivity"

Project Address:
Chandapura Dommasandra Road, Dommasandra, Bengaluru - 562125

Key Distances:
- Upcoming Muthanallur Metro Station: 600m
- Wipro SEZ: 3 km
- Electronic City Phase 2: 5 km
- Electronic City Phase 1: 8 km
- Sarjapur Road: 2 km
- Whitefield: 12 km
- Bengaluru International Airport: 45 km

Nearby Landmarks by Category:

IT Parks & Offices:
- Wipro SEZ - 3 km
- Cisco - 5 km
- Intel - 6 km
- Microsoft - 7 km
- Wells Fargo - 8 km
- Infosys (Electronic City) - 8 km
- HCL - 9 km

Schools:
- Bethany High School - 2 km
- TISB - 4 km
- Greenwood High - 5 km
- Oakridge International School - 3 km
- Inventure Academy - 2 km

Hospitals:
- Manipal Hospitals - 6 km
- Narayana Health - 7 km

Malls & Shopping:
- Forum Value Mall - 8 km
- Central Mall - 7 km

Investment Highlight:
"Post 2021, the Sarjapura Road area has seen a boom in demand for luxury housing 
with property prices approaching a 63% rise. Nambiar District 25 is strategically 
located close to Wipro, Cisco, ITPL, and Electronic City."
```

**Features:**
- Interactive Google Map embed
- Category filter for nearby places
- Distance calculator
- Location advantage cards

---

### 4.15 Pricing Section
**Path:** `src/components/landing/Pricing/`

**Content:**
```
Section ID: "pricing"
Title: "Transparent Pricing"
Subtitle: "Invest in your future"

Pricing Table:

| Unit Type    | Carpet Area  | S.B.A      | Starting Price* |
|--------------|--------------|------------|-----------------|
| 2 BHK        | 809 sq.ft    | 1,245 sq.ft | ₹1.24 Cr       |
| 3 BHK (3B2T) | 965 sq.ft    | 1,454 sq.ft | ₹1.45 Cr       |
| 3 BHK (S)    | 1,124 sq.ft  | 1,695 sq.ft | ₹1.69 Cr       |
| 3 BHK (M)    | 1,196 sq.ft  | 1,896 sq.ft | ₹1.89 Cr       |
| 3 BHK (L)    | 1,303 sq.ft  | 2,046 sq.ft | ₹2.04 Cr       |
| 4 BHK        | 1,649 sq.ft  | 2,561 sq.ft | ₹2.56 Cr       |
| 4 BHK (L)    | 1,958 sq.ft  | 2,995 sq.ft | ₹2.99 Cr       |

*Prices are indicative and subject to change. T&C apply.

CTA: "Get Exact Price" (opens popup form)
```

**Features:**
- Pricing cards with comparison
- EMI calculator (placeholder)
- "Get Exact Price" CTA triggers popup

---

### 4.16 Payment Plan Section
**Path:** `src/components/landing/PaymentPlan/`

**Content:**
```
Standard Payment Plan:
- Booking Amount: 10%
- On Agreement: 10%
- Construction Linked: 70%
- On Possession: 10%
```

**Features:**
- Timeline/milestone visualization
- Bank loan partners logos
- "Get Payment Plan" CTA

---

### 4.17 Developer Section
**Path:** `src/components/landing/Developer/`

**Content:**
```
Section ID: "developer"
Title: "About Nambiar Builders"
Subtitle: "Building trust, delivering excellence"

Description:
"Nambiar Builders is one of Bengaluru's most trusted premium builders with a legacy of 
delivering quality homes. With a focus on innovation, sustainability, and customer 
satisfaction, Nambiar has established itself as a leader in the real estate industry."

Awards:
- Integrated Township of the Year - Times Business Awards
- Trusted Premium Builder of the Year - Times Business Awards

Other Projects:
- Nambiar Ellegenza
- Nambiar Millenia
- Nambiar Bellezea

Head Office:
2nd Floor, PR Business Centre, Above Croma, Outer Ring Road,
Kadubisanahalli, Marathahalli Post, Bengaluru - 560103
```

---

### 4.18 Specifications Section
**Path:** `src/components/landing/Specifications/`

**Content:**
```
Section ID: "specifications"
Title: "Premium Specifications"
Subtitle: "Quality in every detail"

Categories:

STRUCTURE:
- RCC structure

COMMON LOBBY:
- All common lobby flooring in vitrified tiles
- Wall dado in Granite/Marble/Ceramic tiles

LIFT:
- 3 passenger lifts & 1 service lift in each tower

FLOORING:
- Vitrified tiles in foyer, living, dining, corridors and all bedrooms
- Ceramic/Vitrified tiles in all balconies

KITCHEN:
- No counter or dado to be provided
- Provision for exhaust fan
- Flooring in vitrified tiles
- Ceramic tile flooring for utility

DOORS:
- Main door: Engineered wood flush doors
- Internal doors: Engineered wood flush doors

EXTERNAL DOORS AND WINDOWS:
- UPVC/Aluminum frames and sliding shutters for all external doors with clear glass
- UPVC/Aluminum-framed windows with clear glass

TOILETS:
- Ceramic/Vitrified tiles for flooring and walls up to false ceiling
- All toilets with countertop wash basins
- EWCs and chrome-plated fittings
- Suspended pipeline in all toilets concealed within false ceiling

PAINTING:
- Premium external emulsion on exterior walls
- Internal walls and ceilings in emulsion
- All railings in MS with enamel paint

ELECTRICAL:
- PVC insulated copper wires with modular switches
- Sufficient power outlets and light points provided
- Internet and TV points in living room and all bedrooms

SECURITY:
- Security cabins at township entry and exit points
- CCTV coverage on all main entry and exit points

DG POWER:
- DG backup for all common areas
- 100% backup for all apartments
```

---

### 4.19 Testimonials Section
**Path:** `src/components/landing/Testimonials/`

**Content:**
```
Sample Testimonials:

1. Name: "Rajesh K."
   Designation: "Phase 1 Resident"
   Rating: 5 stars
   Quote: "The quality of construction and attention to detail at District 25 is exceptional. 
   We're proud to be part of this community. The amenities are world-class!"

2. Name: "Priya M."
   Designation: "Phase 1 Resident"
   Rating: 5 stars
   Quote: "From booking to possession, the experience with Nambiar was seamless. 
   The clubhouse is amazing and our kids love the play areas."

3. Name: "Arun S."
   Designation: "Phase 1 Resident"
   Rating: 5 stars
   Quote: "Location, amenities, and the SOHO lifestyle - District 25 has it all. 
   Best investment decision we made. Property value has already appreciated 30%!"

4. Name: "Deepa R."
   Designation: "Phase 1 Resident"
   Rating: 5 stars
   Quote: "The community here is wonderful. Weekend markets, events at the clubhouse, 
   and friendly neighbors make it feel like a true neighborhood."
```

**Features:**
- Carousel with autoplay
- Star ratings
- Read more/less for long testimonials

---

### 4.20 FAQ Section
**Path:** `src/components/landing/FAQ/`

**Content:**
```
Section ID: "faq"
Title: "Frequently Asked Questions"

FAQs:

1. Q: What is the RERA number for District 25 Phase 2?
   A: PRM/KA/RERA/1251/308/PR/200825/008011

2. Q: What are the available unit configurations?
   A: We offer 2 BHK, 3 BHK (multiple variants including 3B2T, 3B3T Small, Medium, and Large), 
   and 4 BHK apartments ranging from 1,245 to 2,995 sq.ft.

3. Q: What is the starting price?
   A: Starting from ₹1.24 Cr* onwards for 2 BHK apartments. Prices vary based on unit type, 
   floor, and facing. Contact us for exact pricing.

4. Q: Is there a metro station nearby?
   A: Yes, the upcoming Muthanallur Metro Station (Red Line) is just 600 meters away from 
   District 25.

5. Q: What are the clubhouse facilities?
   A: The 7-acre clubhouse includes Olympic-length pool, gym, sports courts (tennis, basketball, 
   badminton, squash), spa, restaurant, co-working space, and 70+ amenities.

6. Q: Is home loan available?
   A: Yes, the project is approved by all major banks including SBI, HDFC, ICICI, Axis, and others.

7. Q: What is the possession timeline?
   A: Please contact our sales team for the latest possession timeline and construction updates.

8. Q: What is the booking amount?
   A: The booking amount is typically 10% of the property value. Contact us for current offers.

9. Q: Do you provide site visit transportation?
   A: Yes, we offer complimentary pickup and drop service for site visits from anywhere in Bengaluru.

10. Q: How many units per floor?
    A: Just 4 units per floor with 4 elevators, ensuring privacy and convenience.
```

**Features:**
- Accordion layout
- FAQ Schema markup for SEO
- Search/filter functionality
- "Have more questions?" CTA

---

### 4.21 CTA Section
**Path:** `src/components/landing/CTASection/`

**Content:**
```
Section ID: "contact"
Title: "Ready to Experience the SOHO Life?"
Subtitle: "Book your exclusive site visit today"

CTA Buttons:
- Primary: "Schedule Site Visit" (opens popup)
- Secondary: "Call Us: 702 603 4444"

Trust Elements:
- "750+ Happy Families"
- "RERA Registered"
- "Bank Approved"
```

**Layout:**
- Full-width gradient background
- Lead form embedded (desktop)
- Floating animation elements

---

### 4.22 Trust Badges Section
**Path:** `src/components/landing/TrustBadges/`

**Content:**
```
Badges:
- RERA Registered (with number)
- CREDAI Member
- Times Business Awards Winner
- Bank Approved: SBI, HDFC, ICICI, Axis, LIC Housing
```

---

### 4.23 Footer Component
**Path:** `src/components/common/Footer/`

**Sections:**

1. **About:**
   - Nambiar Builders logo
   - Brief description
   - Social links: Facebook, Instagram, LinkedIn, YouTube, Twitter

2. **Quick Links:**
   - Home
   - About Project
   - Floor Plans
   - Amenities
   - Location
   - Contact

3. **Contact Info:**
   - Address: Chandapura Dommasandra Road, Dommasandra, Bengaluru - 562125
   - Phone: 702 603 4444
   - Email: sales@nambiardistrict25.com
   - WhatsApp: +91 702 603 4444

4. **Legal:**
   - Privacy Policy
   - Terms & Conditions
   - Disclaimer
   - RERA Info

**Bottom Bar:**
- Copyright: © 2025 Nambiar Builders. All rights reserved.
- RERA: PRM/KA/RERA/1251/308/PR/200825/008011

---

### 4.24 Floating CTA Component
**Path:** `src/components/common/FloatingCTA/`

**Features:**
- Fixed position bottom-right (desktop) / above bottom nav (mobile)
- WhatsApp button (green)
- Call button (blue)
- Animated pulse effect
- Show after scrolling 200px

---

### 4.25 Scroll To Top Component
**Path:** `src/components/common/ScrollToTop/`

**Features:**
- Fixed position bottom-right
- Show after scrolling 500px
- Smooth scroll to top
- Arrow up icon

================================================================================
## 5. ADMIN PANEL REQUIREMENTS
================================================================================

### 5.1 Admin Login
**Path:** `src/pages/admin/login.jsx`

**Features:**
- Email/Password login form
- Demo credentials: admin@realestate.com / admin123
- Remember me checkbox
- Error handling with toast notifications
- JWT token stored in cookies (httpOnly)
- Redirect to dashboard on success

---

### 5.2 Admin Layout
**Path:** `src/components/admin/AdminLayout/`

**Features:**
- Sidebar navigation (collapsible)
- Top header with user info and logout
- Breadcrumb navigation
- Responsive: sidebar becomes drawer on mobile
- Dark/Light mode toggle

---

### 5.3 Admin Sidebar
**Path:** `src/components/admin/Sidebar/`

**Navigation Items:**
1. Dashboard (DashboardIcon) - /admin/dashboard
2. Leads (PeopleIcon) - /admin/leads
3. SEO Settings (SearchIcon) - /admin/seo
4. Pixels & Tracking (AnalyticsIcon) - /admin/pixels
5. Schema Markup (CodeIcon) - /admin/schema
6. Keywords (KeyIcon) - /admin/keywords
7. Settings (SettingsIcon) - /admin/settings
8. Audit Log (HistoryIcon) - /admin/audit-log
9. Logout (LogoutIcon)

---

### 5.4 Dashboard Page
**Path:** `src/pages/admin/dashboard.jsx`

**Stats Cards:**
- Total Leads (all time)
- New Leads (today)
- Contacted Leads
- Site Visits Scheduled
- Converted Leads
- Conversion Rate (%)

**Charts:**
1. Leads by Day (Line chart - last 7 days)
2. Leads by Source (Pie chart)
3. Lead Status Distribution (Bar chart)

**Recent Leads Table:**
- Last 10 leads
- Columns: Name, Mobile, Source, Status, Date
- Quick actions: View, Update Status

**Quick Actions:**
- Export All Leads (CSV)
- View Analytics
- Refresh Data

---

### 5.5 Leads Management
**Path:** `src/pages/admin/leads/`

**List Page (index.jsx):**

**Data Table Columns:**
- ID
- Name
- Mobile
- Email
- Source
- Status (with color badge)
- Site Visit (Yes/No)
- Created Date
- Actions (View, Edit, Delete)

**Filters:**
- Status: All, New, Contacted, Site Visit Scheduled, Visited, Negotiation, Converted, Lost
- Source: All, Hero Form, Popup Form, CTA Form
- Date Range picker
- Search: Name, Email, Mobile

**Bulk Actions:**
- Update Status
- Delete Selected
- Export Selected (CSV)

**Pagination:**
- 10, 25, 50 per page options

---

**Detail Page ([id].jsx):**

**Lead Information Display:**
- Full name, email, mobile
- Message
- Source
- Created date/time
- IP Address
- Location (City, State, Country)
- User Agent
- UTM Parameters

**Site Visit Details (if applicable):**
- Date & Time
- Pickup Location
- Drop Location
- Meal Preference

**Status Management:**
- Current status with color badge
- Status update dropdown
- Status history timeline

**Notes Section:**
- Add new note
- View existing notes with timestamps
- Notes by admin user

**Activity Timeline:**
- Status changes
- Notes added
- Follow-ups scheduled

**Actions:**
- Assign to team member
- Schedule follow-up
- Mark as converted/lost
- Delete lead

---

### 5.6 SEO Management
**Path:** `src/pages/admin/seo/`

**Tabs:**

**1. Meta Tags:**
- Page Title (60 char limit with counter)
- Meta Description (160 char limit with counter)
- Keywords (comma separated)
- Canonical URL
- Robots meta (index/noindex, follow/nofollow)
- Author
- Language

**2. Open Graph:**
- OG Title
- OG Description
- OG Image (with upload/preview)
- OG Type (website)
- OG Locale (en_IN)

**3. Twitter Cards:**
- Card Type (summary_large_image)
- Twitter Title
- Twitter Description
- Twitter Image
- Twitter Site (@handle)

**4. Geo Tags:**
- Region (IN-KA)
- Placename (Bengaluru)
- Position (latitude, longitude)

**Features:**
- Live preview panel
- Character limit indicators
- SEO score calculation
- Save/Reset buttons
- Audit log on save

---

### 5.7 Pixel & Tracking Management
**Path:** `src/pages/admin/pixels/`

**Tracking Integrations:**

**1. Google Analytics 4:**
- Measurement ID (G-XXXXXXXXXX)
- Enable/Disable toggle
- Enhanced measurement toggle

**2. Google Tag Manager:**
- Container ID (GTM-XXXXXXX)
- Enable/Disable toggle

**3. Facebook Pixel:**
- Pixel ID
- Enable/Disable toggle
- Events to track checkboxes:
  - PageView
  - Lead
  - ViewContent
  - Contact

**4. Google Ads:**
- Conversion ID
- Conversion Label
- Enable/Disable toggle

**5. LinkedIn Insight Tag:**
- Partner ID
- Enable/Disable toggle

**6. Hotjar:**
- Site ID
- Enable/Disable toggle

**7. Custom Scripts:**
- Head scripts textarea
- Body start scripts textarea
- Body end scripts textarea

**Features:**
- Test/Debug mode
- Connection status indicators
- Save/Reset buttons

---

### 5.8 Schema Management
**Path:** `src/pages/admin/schema/`

**Schema Types:**

**1. Organization Schema:**
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Nambiar Builders",
  "url": "https://nambiardistrict25.com",
  "logo": "logo_url",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+91-7026034444",
    "contactType": "sales"
  }
}
```

**2. RealEstateAgent Schema:**
```json
{
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  "name": "Nambiar District 25",
  "image": "project_image_url",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Chandapura Dommasandra Road",
    "addressLocality": "Dommasandra",
    "addressRegion": "Karnataka",
    "postalCode": "562125",
    "addressCountry": "IN"
  },
  "priceRange": "₹1.24 Cr - ₹3 Cr"
}
```

**3. Apartment Schema:**
```json
{
  "@context": "https://schema.org",
  "@type": "Apartment",
  "name": "Nambiar District 25 Phase 2",
  "description": "Premium 2, 3 & 4 BHK apartments...",
  "numberOfRooms": "2-4",
  "floorSize": {
    "@type": "QuantitativeValue",
    "value": "1245-2995",
    "unitCode": "SQF"
  }
}
```

**4. FAQPage Schema:**
- Auto-generated from FAQ content
- Manual override option

**5. BreadcrumbList Schema:**
- Auto-generated
- Custom items option

**Features:**
- JSON-LD editor with syntax highlighting
- Schema validation
- Preview (Google Rich Results format)
- Import/Export

---

### 5.9 Keywords Management
**Path:** `src/pages/admin/keywords/`

**Keyword Entry Fields:**
- Keyword text
- Type: Primary, Secondary, Long-tail, Branded
- Search Volume (optional)
- Difficulty: Low, Medium, High
- Current Position (optional)
- Active/Inactive toggle

**Features:**
- Keywords table with sorting
- Add/Edit/Delete keywords
- Import from CSV
- Export to CSV
- Bulk actions

---

### 5.10 Settings Page
**Path:** `src/pages/admin/settings/`

**Sections:**

**1. General Settings:**
- Site Name
- Site URL
- Contact Email
- Contact Phone
- WhatsApp Number
- Project Address

**2. Social Links:**
- Facebook URL
- Instagram URL
- LinkedIn URL
- YouTube URL
- Twitter URL

**3. Lead Settings:**
- Notification emails (comma separated)
- Enable/Disable site visit booking
- Enable/Disable pickup/drop service
- Enable/Disable meal booking
- Available time slots (JSON)
- Meal options (JSON)

**4. System:**
- Maintenance mode toggle
- Clear cache button
- Backup database button

---

### 5.11 Audit Log
**Path:** `src/pages/admin/audit-log/`

**Log Entry Fields:**
- Timestamp
- User (name)
- Action: LOGIN, CREATE, UPDATE, DELETE
- Module: LEAD, SEO, PIXEL, SCHEMA, KEYWORD, SETTINGS
- Description
- IP Address
- Metadata (old/new values as JSON)

**Features:**
- Filter by action, module, user, date range
- Search functionality
- Export logs (CSV)
- Pagination

================================================================================
## 6. API SPECIFICATIONS
================================================================================

### 6.1 Base Configuration
```
Development: http://localhost:3001
Production: https://api.yourdomain.com/api/v1
```

### 6.2 Endpoints

**Authentication:**
```
POST /login              - Admin login
POST /logout             - Admin logout
GET  /users/1            - Get current user (mock)
```

**Leads:**
```
GET    /leads                    - Get all leads
GET    /leads/:id                - Get single lead
POST   /leads                    - Create lead
PATCH  /leads/:id                - Update lead
DELETE /leads/:id                - Delete lead
```

**Submitted Contacts (Duplicate Check):**
```
GET    /submittedContacts        - Get all
POST   /submittedContacts        - Add new
GET    /submittedContacts?mobile=xxx  - Check by mobile
GET    /submittedContacts?email=xxx   - Check by email
```

**SEO Settings:**
```
GET    /seoSettings              - Get settings
PATCH  /seoSettings              - Update settings
```

**Pixel Settings:**
```
GET    /pixelSettings            - Get settings
PATCH  /pixelSettings            - Update settings
```

**Schema Settings:**
```
GET    /schemaSettings           - Get settings
PATCH  /schemaSettings           - Update settings
```

**Keywords:**
```
GET    /keywords                 - Get all
POST   /keywords                 - Add new
PATCH  /keywords/:id             - Update
DELETE /keywords/:id             - Delete
```

**Audit Log:**
```
GET    /auditLogs                - Get logs
POST   /auditLogs                - Create log entry
```

**Dashboard:**
```
GET    /dashboardStats           - Get statistics
```

**Settings:**
```
GET    /settings                 - Get settings
PATCH  /settings                 - Update settings
```

================================================================================
## 7. LEAD MANAGEMENT SYSTEM
================================================================================

### 7.1 Lead Data Structure
```javascript
{
  id: Number,
  name: String,
  email: String,
  mobile: String,
  message: String,
  source: "hero_form" | "popup_form" | "cta_form",
  
  // Site Visit
  wantsSiteVisit: Boolean,
  siteVisitDate: String,  // YYYY-MM-DD
  siteVisitTime: String,  // "10:00 AM"
  
  // Pickup/Drop
  wantsPickupDrop: Boolean,
  pickupLocation: String,
  dropLocation: String,
  
  // Meal Preference
  wantsMeal: Boolean,
  mealPreference: "breakfast" | "lunch" | "coffee",
  
  // Tracking
  ipAddress: String,
  city: String,
  state: String,
  country: String,
  userAgent: String,
  utmSource: String,
  utmMedium: String,
  utmCampaign: String,
  
  // Status
  status: "new" | "contacted" | "site_visit_scheduled" | "visited" | "negotiation" | "converted" | "lost",
  priority: "low" | "medium" | "high",
  
  // Management
  notes: Array,
  assignedTo: Number,
  followUpDate: String,
  
  // Timestamps
  createdAt: String,
  updatedAt: String
}
```

### 7.2 Duplicate Prevention Flow
```
1. User fills form
2. On submit:
   a. API call: GET /submittedContacts?mobile={mobile}
   b. If found → Show error, stop
   c. API call: GET /submittedContacts?email={email}
   d. If found → Show error, stop
   e. If neither found → Continue
3. POST /leads (create lead)
4. POST /submittedContacts (add mobile+email)
5. Redirect to /thank-you
```

================================================================================
## 8. SEO & MARKETING FEATURES
================================================================================

### 8.1 On-Page SEO
- Dynamic meta tags via SEOHead component
- Schema markup (JSON-LD)
- Semantic HTML structure
- Image alt tags
- Internal linking

### 8.2 Technical SEO
- Next.js static optimization
- robots.txt configuration
- XML sitemap
- Canonical URLs
- Mobile-friendly design

### 8.3 Conversion Tracking
- Google Analytics events
- Facebook Pixel events
- Google Ads conversions
- Custom event tracking

================================================================================
## 9. CONTENT DATA - NAMBIAR DISTRICT 25
================================================================================

### 9.1 Site Configuration
```javascript
// src/data/content/siteConfig.js
export const siteConfig = {
  siteName: "Nambiar District 25 Phase 2",
  tagline: "THE SOHO LIFE RETURNS",
  developer: "Nambiar Builders",
  
  contact: {
    phone: "+91 702 603 4444",
    whatsapp: "+917026034444",
    email: "sales@nambiardistrict25.com"
  },
  
  address: {
    project: "Chandapura Dommasandra Road, Dommasandra, Bengaluru - 562125",
    office: "2nd Floor, PR Business Centre, Above Croma, Outer Ring Road, Kadubisanahalli, Marathahalli Post, Bengaluru - 560103"
  },
  
  rera: "PRM/KA/RERA/1251/308/PR/200825/008011",
  
  social: {
    facebook: "https://facebook.com/nambiarbuilders",
    instagram: "https://instagram.com/nambiarbuilders",
    linkedin: "https://linkedin.com/company/nambiarbuilders",
    youtube: "https://youtube.com/nambiarbuilders",
    twitter: "https://twitter.com/nambiarbuilders"
  },
  
  pricing: {
    starting: "₹1.24 Cr",
    range: "₹1.24 Cr - ₹3 Cr"
  },
  
  features: {
    clubhouseSize: "7 Acres",
    clubhouseSqft: "2.5 Lakh+ sq.ft",
    openSpace: "80%",
    greenSpace: "40%",
    trees: "3500+",
    amenities: "74+",
    metroDistance: "600m",
    unitsPerFloor: "4",
    elevatorsPerTower: "4"
  }
};
```

### 9.2 Color Theme
```javascript
// src/theme/colors.js
export const colors = {
  primary: {
    main: "#1a1a2e",      // Dark navy
    light: "#2d2d4a",
    dark: "#0f0f1a",
    contrastText: "#ffffff"
  },
  secondary: {
    main: "#8B9A46",      // Olive green (Nambiar brand)
    light: "#a3b15e",
    dark: "#6b7a36",
    contrastText: "#ffffff"
  },
  accent: {
    gold: "#c9a227",
    copper: "#b87333",
    teal: "#008080"
  },
  background: {
    default: "#ffffff",
    paper: "#f8f9fa",
    dark: "#1a1a2e"
  },
  text: {
    primary: "#1a1a2e",
    secondary: "#666666",
    light: "#999999"
  }
};
```

================================================================================
## 10. COMPONENT SPECIFICATIONS
================================================================================

### 10.1 Each Component Structure
```
ComponentName/
├── ComponentName.jsx       # Main component
├── ComponentName.module.css # Styles
└── index.js                # Export
```

### 10.2 Animation Standards
- Use Framer Motion for all animations
- Intersection Observer for scroll animations
- Staggered children animations
- Hover lift effect: y: -10, shadow increase
- Page transitions: fade + slide

### 10.3 Responsive Breakpoints
```css
/* MUI Default Breakpoints */
xs: 0px      /* Mobile */
sm: 600px    /* Large mobile */
md: 900px    /* Tablet */
lg: 1200px   /* Desktop */
xl: 1536px   /* Large desktop */
```

### 10.4 Mobile-First Rules
- Bottom navigation visible on ≤1024px
- Header visible on >1024px
- Touch-friendly targets (min 44px)
- Swipeable carousels
- No hover-only interactions on mobile

================================================================================
## END OF REQUIREMENTS DOCUMENT
================================================================================