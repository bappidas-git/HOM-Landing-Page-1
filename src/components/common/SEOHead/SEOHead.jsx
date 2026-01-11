/**
 * SEOHead Component
 * Dynamic meta tags and SEO configuration using Next.js Head
 */

import Head from 'next/head';
import { useRouter } from 'next/router';
import {
  SITE_INFO,
  DEFAULT_META,
  DEFAULT_OG,
  DEFAULT_TWITTER,
  GEO_TAGS,
  STRUCTURED_DATA,
} from '@/lib/constants/seoDefaults';

/**
 * SEOHead component for managing page meta tags
 * @param {Object} props - Component props
 * @param {string} props.title - Page title
 * @param {string} props.description - Meta description
 * @param {string} props.keywords - Meta keywords
 * @param {string} props.canonical - Canonical URL
 * @param {string} props.robots - Robots meta tag
 * @param {Object} props.og - Open Graph data
 * @param {Object} props.twitter - Twitter Card data
 * @param {Object} props.structuredData - JSON-LD structured data
 * @param {boolean} props.noIndex - Whether to noindex the page
 * @param {React.ReactNode} props.children - Additional head elements
 */
const SEOHead = ({
  title,
  description,
  keywords,
  canonical,
  robots,
  og = {},
  twitter = {},
  structuredData,
  noIndex = false,
  children,
}) => {
  const router = useRouter();

  // Build full title
  const fullTitle = title
    ? `${title} | ${SITE_INFO.siteName}`
    : DEFAULT_META.title;

  // Get canonical URL
  const canonicalUrl = canonical || `${SITE_INFO.siteUrl}${router.asPath}`;

  // Build robots meta
  const robotsMeta = noIndex ? 'noindex, nofollow' : (robots || DEFAULT_META.robots);

  // Merge OG data with defaults
  const ogData = {
    title: og.title || title || DEFAULT_OG.title,
    description: og.description || description || DEFAULT_OG.description,
    image: og.image || DEFAULT_OG.image,
    type: og.type || DEFAULT_OG.type,
    locale: og.locale || DEFAULT_OG.locale,
    siteName: og.siteName || DEFAULT_OG.siteName,
    url: og.url || canonicalUrl,
  };

  // Merge Twitter data with defaults
  const twitterData = {
    card: twitter.card || DEFAULT_TWITTER.card,
    title: twitter.title || title || DEFAULT_TWITTER.title,
    description: twitter.description || description || DEFAULT_TWITTER.description,
    image: twitter.image || DEFAULT_TWITTER.image,
    site: twitter.site || DEFAULT_TWITTER.site,
    creator: twitter.creator || DEFAULT_TWITTER.creator,
  };

  // Build structured data
  const jsonLd = structuredData || STRUCTURED_DATA.organization;

  // Ensure image URLs are absolute
  const getAbsoluteUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    return `${SITE_INFO.siteUrl}${url.startsWith('/') ? '' : '/'}${url}`;
  };

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description || DEFAULT_META.description} />
      <meta name="keywords" content={keywords || DEFAULT_META.keywords} />
      <meta name="author" content={DEFAULT_META.author} />
      <meta name="robots" content={robotsMeta} />
      <meta name="language" content={DEFAULT_META.language} />

      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={ogData.title} />
      <meta property="og:description" content={ogData.description} />
      <meta property="og:image" content={getAbsoluteUrl(ogData.image)} />
      <meta property="og:type" content={ogData.type} />
      <meta property="og:locale" content={ogData.locale} />
      <meta property="og:site_name" content={ogData.siteName} />
      <meta property="og:url" content={ogData.url} />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content={twitterData.card} />
      <meta name="twitter:title" content={twitterData.title} />
      <meta name="twitter:description" content={twitterData.description} />
      <meta name="twitter:image" content={getAbsoluteUrl(twitterData.image)} />
      <meta name="twitter:site" content={twitterData.site} />
      <meta name="twitter:creator" content={twitterData.creator} />

      {/* Geo Tags */}
      <meta name="geo.region" content={GEO_TAGS.region} />
      <meta name="geo.placename" content={GEO_TAGS.placename} />
      <meta name="geo.position" content={GEO_TAGS.position} />
      <meta name="ICBM" content={GEO_TAGS.ICBM} />

      {/* Mobile Optimization */}
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      <meta name="theme-color" content="#1a1a2e" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />

      {/* Structured Data (JSON-LD) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Additional head elements */}
      {children}
    </Head>
  );
};

export default SEOHead;
