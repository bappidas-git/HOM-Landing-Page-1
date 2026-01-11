/**
 * Next.js Custom Document
 * Customizes the HTML document structure with comprehensive SEO setup
 *
 * Includes:
 * - Font preloading and optimization
 * - Favicon and app icons
 * - Theme color and PWA manifest
 * - Base SEO meta tags
 * - Geo meta tags for local SEO
 * - Organization structured data (JSON-LD)
 * - Google Analytics and Tag Manager placeholders
 * - Facebook Pixel placeholder
 */

import { Html, Head, Main, NextScript } from 'next/document';

// Organization Schema for SEO
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'RealEstateAgent',
  name: 'Nambiar District 25 Phase 2',
  description: 'Premium 2, 3 & 4 BHK apartments in Dommasandra, Bengaluru by Nambiar Builders',
  url: 'https://nambiardistrict25.com',
  logo: 'https://nambiardistrict25.com/images/logo.png',
  image: 'https://nambiardistrict25.com/images/og-image.jpg',
  telephone: '+91-7026034444',
  email: 'sales@nambiardistrict25.com',
  priceRange: '₹1.24 Cr - ₹3 Cr',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Chandapura Dommasandra Road',
    addressLocality: 'Dommasandra',
    addressRegion: 'Karnataka',
    postalCode: '562125',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '12.8698',
    longitude: '77.7500',
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    opens: '09:00',
    closes: '20:00',
  },
  sameAs: [
    'https://facebook.com/nambiarbuilders',
    'https://instagram.com/nambiarbuilders',
    'https://linkedin.com/company/nambiarbuilders',
    'https://youtube.com/nambiarbuilders',
    'https://twitter.com/nambiarbuilders',
  ],
  parentOrganization: {
    '@type': 'Organization',
    name: 'Nambiar Builders',
    url: 'https://nambiarbuilders.com',
  },
};

// Real Estate Project Schema
const projectSchema = {
  '@context': 'https://schema.org',
  '@type': 'Apartment',
  name: 'Nambiar District 25 Phase 2',
  description: 'Premium 2, 3 & 4 BHK apartments with 74+ world-class amenities, 7-acre clubhouse, and 600m from upcoming metro station.',
  numberOfRooms: '2-4',
  floorSize: {
    '@type': 'QuantitativeValue',
    minValue: 1245,
    maxValue: 2995,
    unitCode: 'SQF',
  },
  amenityFeature: [
    { '@type': 'LocationFeatureSpecification', name: 'Swimming Pool' },
    { '@type': 'LocationFeatureSpecification', name: 'Gymnasium' },
    { '@type': 'LocationFeatureSpecification', name: 'Clubhouse' },
    { '@type': 'LocationFeatureSpecification', name: 'Tennis Court' },
    { '@type': 'LocationFeatureSpecification', name: 'Children Play Area' },
  ],
};

export default function Document() {
  return (
    <Html lang="en" dir="ltr">
      <Head>
        {/* DNS Prefetch for performance */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://connect.facebook.net" />

        {/* Preconnect to Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Google Fonts - Poppins and Inter with font-display swap */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />

        {/* Material Icons */}
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />

        {/* Favicon and App Icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#1a1a2e" />

        {/* Theme and Browser Colors */}
        <meta name="theme-color" content="#1a1a2e" />
        <meta name="msapplication-TileColor" content="#1a1a2e" />
        <meta name="msapplication-config" content="/browserconfig.xml" />

        {/* Base SEO Meta Tags */}
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="bingbot" content="index, follow" />

        {/* Language and Region */}
        <meta httpEquiv="content-language" content="en-IN" />
        <meta name="language" content="English" />

        {/* Geo Meta Tags for Local SEO */}
        <meta name="geo.region" content="IN-KA" />
        <meta name="geo.placename" content="Bengaluru, Karnataka, India" />
        <meta name="geo.position" content="12.8698;77.7500" />
        <meta name="ICBM" content="12.8698, 77.7500" />

        {/* Publisher and Author */}
        <meta name="author" content="Nambiar Builders" />
        <meta name="publisher" content="Nambiar Builders" />
        <meta name="copyright" content="2025 Nambiar Builders" />

        {/* Mobile Web App Capable */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="District 25" />
        <meta name="mobile-web-app-capable" content="yes" />

        {/* Format Detection */}
        <meta name="format-detection" content="telephone=yes" />
        <meta name="format-detection" content="address=yes" />

        {/* Referrer Policy */}
        <meta name="referrer" content="origin-when-cross-origin" />

        {/* Security Headers */}
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

        {/* Organization Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />

        {/* Real Estate Project Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(projectSchema) }}
        />

        {/* Google Tag Manager - Head (placeholder, ID from env) */}
        {process.env.NEXT_PUBLIC_GTM_ID && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_ID}');
              `,
            }}
          />
        )}

        {/* Google Analytics 4 (placeholder, ID from env) */}
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}', {
                    page_path: window.location.pathname,
                    anonymize_ip: true,
                    cookie_flags: 'SameSite=None;Secure'
                  });
                `,
              }}
            />
          </>
        )}

        {/* Facebook Pixel (placeholder, ID from env) */}
        {process.env.NEXT_PUBLIC_FB_PIXEL_ID && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '${process.env.NEXT_PUBLIC_FB_PIXEL_ID}');
                fbq('track', 'PageView');
              `,
            }}
          />
        )}
      </Head>
      <body>
        {/* Google Tag Manager - Body (noscript fallback) */}
        {process.env.NEXT_PUBLIC_GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
              title="Google Tag Manager"
            />
          </noscript>
        )}

        {/* Facebook Pixel - noscript fallback */}
        {process.env.NEXT_PUBLIC_FB_PIXEL_ID && (
          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: 'none' }}
              src={`https://www.facebook.com/tr?id=${process.env.NEXT_PUBLIC_FB_PIXEL_ID}&ev=PageView&noscript=1`}
              alt=""
            />
          </noscript>
        )}

        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
