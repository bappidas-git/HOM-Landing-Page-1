/**
 * Pixels API Service
 * Handles pixel and tracking settings management
 */

import axiosInstance, { apiRequest } from './axiosInstance';
import { PIXEL_ENDPOINTS } from './endpoints';

/**
 * Get current pixel settings
 * @returns {Promise} API response with pixel settings
 */
export const getPixelSettings = async () => {
  return apiRequest(() => axiosInstance.get(PIXEL_ENDPOINTS.BASE));
};

/**
 * Update pixel settings
 * @param {Object} settings - Pixel settings to update
 * @returns {Promise} API response
 */
export const updatePixelSettings = async (settings) => {
  const payload = {
    ...settings,
    updatedAt: new Date().toISOString(),
  };

  return apiRequest(() => axiosInstance.patch(PIXEL_ENDPOINTS.UPDATE, payload));
};

/**
 * Update Google Analytics settings
 * @param {Object} gaSettings - GA4 settings
 * @param {string} gaSettings.googleAnalyticsId - GA4 Measurement ID
 * @param {boolean} gaSettings.googleAnalyticsEnabled - Enable/disable flag
 * @returns {Promise} API response
 */
export const updateGoogleAnalytics = async (gaSettings) => {
  return updatePixelSettings({
    googleAnalyticsId: gaSettings.googleAnalyticsId,
    googleAnalyticsEnabled: gaSettings.googleAnalyticsEnabled,
  });
};

/**
 * Update Google Tag Manager settings
 * @param {Object} gtmSettings - GTM settings
 * @param {string} gtmSettings.googleTagManagerId - GTM Container ID
 * @param {boolean} gtmSettings.googleTagManagerEnabled - Enable/disable flag
 * @returns {Promise} API response
 */
export const updateGoogleTagManager = async (gtmSettings) => {
  return updatePixelSettings({
    googleTagManagerId: gtmSettings.googleTagManagerId,
    googleTagManagerEnabled: gtmSettings.googleTagManagerEnabled,
  });
};

/**
 * Update Facebook Pixel settings
 * @param {Object} fbSettings - Facebook Pixel settings
 * @param {string} fbSettings.facebookPixelId - Pixel ID
 * @param {boolean} fbSettings.facebookPixelEnabled - Enable/disable flag
 * @returns {Promise} API response
 */
export const updateFacebookPixel = async (fbSettings) => {
  return updatePixelSettings({
    facebookPixelId: fbSettings.facebookPixelId,
    facebookPixelEnabled: fbSettings.facebookPixelEnabled,
  });
};

/**
 * Update Google Ads settings
 * @param {Object} googleAdsSettings - Google Ads settings
 * @param {string} googleAdsSettings.googleAdsConversionId - Conversion ID
 * @param {string} googleAdsSettings.googleAdsConversionLabel - Conversion Label
 * @param {boolean} googleAdsSettings.googleAdsEnabled - Enable/disable flag
 * @returns {Promise} API response
 */
export const updateGoogleAds = async (googleAdsSettings) => {
  return updatePixelSettings({
    googleAdsConversionId: googleAdsSettings.googleAdsConversionId,
    googleAdsConversionLabel: googleAdsSettings.googleAdsConversionLabel,
    googleAdsEnabled: googleAdsSettings.googleAdsEnabled,
  });
};

/**
 * Update LinkedIn Insight Tag settings
 * @param {Object} linkedInSettings - LinkedIn settings
 * @param {string} linkedInSettings.linkedInInsightTag - Partner ID
 * @param {boolean} linkedInSettings.linkedInEnabled - Enable/disable flag
 * @returns {Promise} API response
 */
export const updateLinkedInInsight = async (linkedInSettings) => {
  return updatePixelSettings({
    linkedInInsightTag: linkedInSettings.linkedInInsightTag,
    linkedInEnabled: linkedInSettings.linkedInEnabled,
  });
};

/**
 * Update Hotjar settings
 * @param {Object} hotjarSettings - Hotjar settings
 * @param {string} hotjarSettings.hotjarId - Site ID
 * @param {boolean} hotjarSettings.hotjarEnabled - Enable/disable flag
 * @returns {Promise} API response
 */
export const updateHotjar = async (hotjarSettings) => {
  return updatePixelSettings({
    hotjarId: hotjarSettings.hotjarId,
    hotjarEnabled: hotjarSettings.hotjarEnabled,
  });
};

/**
 * Update custom scripts
 * @param {Object} scripts - Custom scripts
 * @param {string} scripts.customHeadScripts - Scripts for head section
 * @param {string} scripts.customBodyStartScripts - Scripts for body start
 * @param {string} scripts.customBodyEndScripts - Scripts for body end
 * @returns {Promise} API response
 */
export const updateCustomScripts = async (scripts) => {
  return updatePixelSettings({
    customHeadScripts: scripts.customHeadScripts,
    customBodyStartScripts: scripts.customBodyStartScripts,
    customBodyEndScripts: scripts.customBodyEndScripts,
  });
};

/**
 * Enable/disable all tracking
 * @param {boolean} enabled - Enable or disable all tracking
 * @returns {Promise} API response
 */
export const toggleAllTracking = async (enabled) => {
  return updatePixelSettings({
    googleAnalyticsEnabled: enabled,
    googleTagManagerEnabled: enabled,
    facebookPixelEnabled: enabled,
    googleAdsEnabled: enabled,
    linkedInEnabled: enabled,
    hotjarEnabled: enabled,
  });
};

/**
 * Validate pixel ID format
 * @param {string} type - Pixel type (ga, gtm, fb, gads, linkedin, hotjar)
 * @param {string} id - Pixel ID to validate
 * @returns {Object} Validation result
 */
export const validatePixelId = (type, id) => {
  if (!id || id.trim() === '') {
    return { isValid: true, message: '' }; // Empty is valid (disabled)
  }

  const patterns = {
    ga: /^G-[A-Z0-9]+$/,
    gtm: /^GTM-[A-Z0-9]+$/,
    fb: /^\d{15,16}$/,
    gads: /^AW-\d+$/,
    linkedin: /^\d+$/,
    hotjar: /^\d+$/,
  };

  const typeNames = {
    ga: 'Google Analytics',
    gtm: 'Google Tag Manager',
    fb: 'Facebook Pixel',
    gads: 'Google Ads',
    linkedin: 'LinkedIn',
    hotjar: 'Hotjar',
  };

  const pattern = patterns[type];
  if (!pattern) {
    return { isValid: false, message: 'Unknown pixel type' };
  }

  if (!pattern.test(id)) {
    return {
      isValid: false,
      message: `Invalid ${typeNames[type]} ID format`,
    };
  }

  return { isValid: true, message: '' };
};

/**
 * Generate tracking scripts HTML
 * @param {Object} settings - Pixel settings
 * @returns {Object} Scripts for head, body start, and body end
 */
export const generateTrackingScripts = (settings) => {
  const headScripts = [];
  const bodyStartScripts = [];
  const bodyEndScripts = [];

  // Google Analytics 4
  if (settings.googleAnalyticsEnabled && settings.googleAnalyticsId) {
    headScripts.push(`
<!-- Google Analytics 4 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=${settings.googleAnalyticsId}"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '${settings.googleAnalyticsId}');
</script>`);
  }

  // Google Tag Manager
  if (settings.googleTagManagerEnabled && settings.googleTagManagerId) {
    headScripts.push(`
<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${settings.googleTagManagerId}');</script>`);

    bodyStartScripts.push(`
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${settings.googleTagManagerId}"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>`);
  }

  // Facebook Pixel
  if (settings.facebookPixelEnabled && settings.facebookPixelId) {
    headScripts.push(`
<!-- Facebook Pixel -->
<script>
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', '${settings.facebookPixelId}');
  fbq('track', 'PageView');
</script>
<noscript><img height="1" width="1" style="display:none"
  src="https://www.facebook.com/tr?id=${settings.facebookPixelId}&ev=PageView&noscript=1"
/></noscript>`);
  }

  // LinkedIn Insight Tag
  if (settings.linkedInEnabled && settings.linkedInInsightTag) {
    headScripts.push(`
<!-- LinkedIn Insight Tag -->
<script type="text/javascript">
_linkedin_partner_id = "${settings.linkedInInsightTag}";
window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
window._linkedin_data_partner_ids.push(_linkedin_partner_id);
</script>
<script type="text/javascript">
(function(l) {
if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
window.lintrk.q=[]}
var s = document.getElementsByTagName("script")[0];
var b = document.createElement("script");
b.type = "text/javascript";b.async = true;
b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
s.parentNode.insertBefore(b, s);})(window.lintrk);
</script>
<noscript><img height="1" width="1" style="display:none;" alt=""
src="https://px.ads.linkedin.com/collect/?pid=${settings.linkedInInsightTag}&fmt=gif" /></noscript>`);
  }

  // Hotjar
  if (settings.hotjarEnabled && settings.hotjarId) {
    headScripts.push(`
<!-- Hotjar Tracking Code -->
<script>
    (function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:${settings.hotjarId},hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
</script>`);
  }

  // Custom scripts
  if (settings.customHeadScripts) {
    headScripts.push(`\n<!-- Custom Head Scripts -->\n${settings.customHeadScripts}`);
  }
  if (settings.customBodyStartScripts) {
    bodyStartScripts.push(`\n<!-- Custom Body Start Scripts -->\n${settings.customBodyStartScripts}`);
  }
  if (settings.customBodyEndScripts) {
    bodyEndScripts.push(`\n<!-- Custom Body End Scripts -->\n${settings.customBodyEndScripts}`);
  }

  return {
    head: headScripts.join('\n'),
    bodyStart: bodyStartScripts.join('\n'),
    bodyEnd: bodyEndScripts.join('\n'),
  };
};

/**
 * Get enabled tracking platforms
 * @param {Object} settings - Pixel settings
 * @returns {Array} List of enabled platforms
 */
export const getEnabledTracking = (settings) => {
  const platforms = [];

  if (settings.googleAnalyticsEnabled && settings.googleAnalyticsId) {
    platforms.push({
      name: 'Google Analytics 4',
      id: settings.googleAnalyticsId,
      type: 'ga',
    });
  }
  if (settings.googleTagManagerEnabled && settings.googleTagManagerId) {
    platforms.push({
      name: 'Google Tag Manager',
      id: settings.googleTagManagerId,
      type: 'gtm',
    });
  }
  if (settings.facebookPixelEnabled && settings.facebookPixelId) {
    platforms.push({
      name: 'Facebook Pixel',
      id: settings.facebookPixelId,
      type: 'fb',
    });
  }
  if (settings.googleAdsEnabled && settings.googleAdsConversionId) {
    platforms.push({
      name: 'Google Ads',
      id: settings.googleAdsConversionId,
      type: 'gads',
    });
  }
  if (settings.linkedInEnabled && settings.linkedInInsightTag) {
    platforms.push({
      name: 'LinkedIn Insight',
      id: settings.linkedInInsightTag,
      type: 'linkedin',
    });
  }
  if (settings.hotjarEnabled && settings.hotjarId) {
    platforms.push({
      name: 'Hotjar',
      id: settings.hotjarId,
      type: 'hotjar',
    });
  }

  return platforms;
};

export default {
  getPixelSettings,
  updatePixelSettings,
  updateGoogleAnalytics,
  updateGoogleTagManager,
  updateFacebookPixel,
  updateGoogleAds,
  updateLinkedInInsight,
  updateHotjar,
  updateCustomScripts,
  toggleAllTracking,
  validatePixelId,
  generateTrackingScripts,
  getEnabledTracking,
};
