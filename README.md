# Nambiar District 25 Phase 2 - Real Estate Landing Page

A professional, high-converting real estate landing page with an integrated admin panel for lead management and SEO optimization. Built with Next.js, Material UI, and Framer Motion.

## Features

### Landing Page
- **Single-page design** with smooth scroll navigation
- **Lead capture forms** with duplicate prevention (phone + email)
- **Site visit booking** with pickup/drop and meal preferences
- **Mobile-first responsive design** with bottom navigation for mobile/tablet
- **Modern animations** using Framer Motion
- **SEO optimized** with structured data (JSON-LD)
- **Google Ads & Meta Ads** ready with tracking pixel integration

### Admin Panel
- **Dashboard** with analytics, charts, and key metrics
- **Lead Management** - View, edit, assign, and track leads
- **SEO Management** - Meta tags, Open Graph, Twitter cards
- **Pixel Tracking** - Google Analytics, GTM, Facebook Pixel, Google Ads
- **Schema Management** - Structured data (JSON-LD) editor
- **Keyword Tracking** - SEO keyword management
- **Audit Logging** - Complete activity tracking
- **Settings** - Site configuration and preferences

## Tech Stack

### Frontend
- **Framework:** Next.js 14.2 (Pages Router)
- **Language:** JavaScript (ES6+)
- **UI Library:** Material-UI (MUI) v6
- **Animation:** Framer Motion v11
- **Styling:** Emotion (CSS-in-JS) + CSS Modules
- **Form Handling:** React Hook Form + Yup validation
- **HTTP Client:** Axios
- **Charts:** Chart.js + react-chartjs-2
- **Carousel:** Swiper.js
- **Date Handling:** date-fns
- **Notifications:** react-hot-toast

### Backend (Mock API)
- **API Server:** JSON Server
- **Database:** db.json (REST API)
- **Authentication:** JWT tokens

## Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0

## Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd HOM-Landing-Page-1
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` with your configuration:
   ```env
   # App Configuration
   NEXT_PUBLIC_APP_NAME=Nambiar District 25
   NEXT_PUBLIC_APP_URL=http://localhost:3000

   # API Configuration
   NEXT_PUBLIC_API_URL=http://localhost:3001

   # Google Analytics (optional)
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

   # Facebook Pixel (optional)
   NEXT_PUBLIC_FB_PIXEL_ID=your_pixel_id
   ```

## Development

Run both the Next.js development server and JSON Server API concurrently:

```bash
npm run dev
```

This starts:
- **Next.js** on `http://localhost:3000`
- **JSON Server API** on `http://localhost:3001`

### Individual Commands

```bash
# Run Next.js only
npm run dev:next

# Run JSON Server API only
npm run dev:api
```

## Production Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

## Project Structure

```
├── public/                   # Static assets
│   ├── images/              # Image assets
│   ├── favicon.ico
│   ├── robots.txt
│   └── sitemap.xml
│
├── src/
│   ├── pages/               # Next.js pages
│   │   ├── index.jsx        # Landing page
│   │   ├── thank-you.jsx    # Thank you page
│   │   ├── admin/           # Admin panel pages
│   │   ├── 404.jsx
│   │   └── 500.jsx
│   │
│   ├── components/
│   │   ├── common/          # Shared components
│   │   ├── landing/         # Landing page sections
│   │   ├── admin/           # Admin panel components
│   │   └── thank-you/       # Thank you page components
│   │
│   ├── context/             # React Context providers
│   ├── hooks/               # Custom React hooks
│   ├── lib/
│   │   ├── api/             # API client modules
│   │   ├── utils/           # Utility functions
│   │   └── constants/       # Constants and configs
│   │
│   ├── data/
│   │   └── content/         # Content data files
│   │
│   ├── styles/              # Global CSS styles
│   └── theme/               # MUI theme configuration
│
├── db.json                   # JSON Server database
├── next.config.js           # Next.js configuration
├── package.json
└── README.md
```

## Admin Panel Access

**Default Credentials:**
- **Email:** admin@realestate.com
- **Password:** admin123

Access the admin panel at: `http://localhost:3000/admin`

## API Endpoints

The JSON Server provides the following REST endpoints:

| Endpoint | Description |
|----------|-------------|
| `/leads` | Lead management |
| `/submittedContacts` | Duplicate prevention |
| `/seoSettings` | SEO configuration |
| `/pixelSettings` | Tracking pixels |
| `/schemaSettings` | Schema markup |
| `/keywords` | SEO keywords |
| `/auditLogs` | Activity logs |
| `/settings` | Site settings |
| `/users` | Admin users |

## Key Features Implementation

### Lead Duplicate Prevention
The system prevents duplicate form submissions by checking both phone and email:
1. On form submit, check `/submittedContacts` for existing phone
2. Check `/submittedContacts` for existing email
3. If either exists, show error message
4. If neither exists, create lead and add to submitted contacts

### Animation System
The project uses Framer Motion with:
- Scroll-triggered animations
- Staggered children animations
- Hover effects (lift, glow, scale)
- Page transitions
- Reduced motion support for accessibility

### Mobile Navigation
- Desktop (>1024px): Fixed header with navigation
- Mobile/Tablet (≤1024px): Bottom navigation bar with 5 items

## Customization

### Colors
Edit the theme in `src/theme/colors.js`:
```javascript
export const colors = {
  primary: {
    main: '#1a1a2e',      // Dark navy
  },
  secondary: {
    main: '#8B9A46',      // Olive green (brand)
  },
  // ...
};
```

### Content
All content is stored in `src/data/content/`:
- `siteConfig.js` - Site-wide configuration
- `hero.js` - Hero section content
- `amenities.js` - Amenities list
- `floorPlans.js` - Floor plan details
- `pricing.js` - Pricing information
- And more...

## Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Import project in Vercel
3. Configure environment variables
4. Deploy

### Docker
```bash
# Build image
docker build -t nambiar-landing .

# Run container
docker run -p 3000:3000 nambiar-landing
```

### Traditional Server
```bash
npm run build
npm start
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Android)

## Performance Optimizations

- **Image Optimization:** Next.js Image component with AVIF/WebP
- **Code Splitting:** Automatic by Next.js
- **SWC Minification:** Faster builds
- **Cache Headers:** Static asset caching
- **Reduced Motion:** Respects user preferences
- **Mobile Optimizations:** Faster animations on mobile

## License

MIT License - see LICENSE file for details.

## Support

For issues and feature requests, please open an issue on GitHub.

---

Built with care by Assam Digital
