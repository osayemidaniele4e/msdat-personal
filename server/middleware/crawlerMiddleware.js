 /**
 * Social Media Crawler Detection Middleware
 * 
 * This middleware intercepts requests from social media crawlers (Facebook, Twitter, etc.)
 * and serves them pre-rendered HTML with proper meta tags for social sharing.
 */

const { 
  BASE_URL, 
  DEFAULT_IMAGE, 
  dashboardMeta, 
  staticPageMeta, 
  nigerianStates 
} = require('../config/metaConfig');

/**
 * List of known social media crawler user agents
 */
const CRAWLER_USER_AGENTS = [
  // Facebook
  'facebookexternalhit',
  'Facebot',
  'facebookcatalog',
  // Twitter
  'Twitterbot',
  // LinkedIn
  'LinkedInBot',
  'linkedinbot',
  // Pinterest
  'Pinterest',
  'Pinterestbot',
  // Slack
  'Slackbot',
  'Slackbot-LinkExpanding',
  // Telegram
  'TelegramBot',
  // WhatsApp
  'WhatsApp',
  // Discord
  'Discordbot',
  // Skype
  'SkypeUriPreview',
  // Microsoft Teams
  'MicrosoftTeams',
  // Snapchat
  'Snapchat',
  // Reddit
  'redditbot',
  // Viber
  'Viber',
  // Google (for rich results)
  'Googlebot',
  'Google-Structured-Data-Testing-Tool',
  // Bing
  'bingbot',
  // Yahoo
  'Slurp',
  // Other link preview bots
  'embedly',
  'Quora Link Preview',
  'showyoubot',
  'outbrain',
  'rogerbot',
  'developers.google.com/+/web/snippet',
];

/**
 * Check if the request is from a social media crawler
 * @param {string} userAgent - The user agent string from the request
 * @returns {boolean} - True if the request is from a crawler
 */
function isCrawler(userAgent) {
  if (!userAgent) return false;
  
  const lowerUserAgent = userAgent.toLowerCase();
  return CRAWLER_USER_AGENTS.some(crawler => 
    lowerUserAgent.includes(crawler.toLowerCase())
  );
}

/**
 * Format a dashboard name from URL format to display format
 * @param {string} urlName - Dashboard name with underscores
 * @returns {string} - Formatted display name
 */
function formatDashboardName(urlName) {
  if (!urlName) return 'Dashboard';
  return urlName.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

/**
 * Get meta information for a given path
 * @param {string} pathname - The URL path
 * @returns {Object} - Meta information object
 */
function getMetaForPath(pathname) {
  // Remove trailing slash if present
  const cleanPath = pathname.endsWith('/') && pathname !== '/' 
    ? pathname.slice(0, -1) 
    : pathname;

  // Check for exact static page match first
  if (staticPageMeta[cleanPath]) {
    return staticPageMeta[cleanPath];
  }

  // Handle dynamic dashboard routes: /dashboard/:name or /dashboard/:name/:id
  const dashboardMatch = cleanPath.match(/^\/dashboard\/([^/]+)/);
  if (dashboardMatch) {
    const dashboardName = dashboardMatch[1];
    
    if (dashboardMeta[dashboardName]) {
      return {
        title: `${dashboardMeta[dashboardName].title} - MSDAT Nigeria`,
        description: dashboardMeta[dashboardName].description,
        image: dashboardMeta[dashboardName].image,
        keywords: dashboardMeta[dashboardName].keywords,
      };
    }
    
    // Fallback for unknown dashboards
    const formattedName = formatDashboardName(dashboardName);
    return {
      title: `${formattedName} - MSDAT Nigeria`,
      description: `Explore ${formattedName} indicators on the Multi-Source Data Analytics and Triangulation (MSDAT) platform for Nigeria.`,
      image: DEFAULT_IMAGE,
      keywords: `${formattedName.toLowerCase()}, health data, Nigeria, MSDAT`,
    };
  }

  // Handle custom dashboard routes: /custom-dashboard/:name
  const customDashboardMatch = cleanPath.match(/^\/custom-dashboard\/([^/]+)/);
  if (customDashboardMatch) {
    const dashboardName = formatDashboardName(customDashboardMatch[1]);
    return {
      title: `${dashboardName} - Custom Dashboard - MSDAT Nigeria`,
      description: `View the custom ${dashboardName} dashboard on MSDAT Nigeria.`,
      image: DEFAULT_IMAGE,
      keywords: `custom dashboard, ${dashboardName.toLowerCase()}, MSDAT`,
    };
  }

  // Handle public custom dashboards: /custom/public/:id
  const publicCustomMatch = cleanPath.match(/^\/custom\/public\/([^/]+)/);
  if (publicCustomMatch) {
    return {
      title: 'Shared Dashboard - MSDAT Nigeria',
      description: 'View a publicly shared custom dashboard on the MSDAT platform.',
      image: DEFAULT_IMAGE,
      keywords: 'shared dashboard, public dashboard, MSDAT',
    };
  }

  // Handle state health profiles: /health-profiles/:state
  const stateProfileMatch = cleanPath.match(/^\/health-profiles\/([^/]+)/);
  if (stateProfileMatch) {
    const stateName = decodeURIComponent(stateProfileMatch[1]).replace(/-/g, ' ');
    const formattedState = stateName.replace(/\b\w/g, c => c.toUpperCase());
    
    // Check if it's a valid Nigerian state
    const isValidState = nigerianStates.some(
      s => s.toLowerCase() === formattedState.toLowerCase()
    );
    
    if (isValidState) {
      return {
        title: `${formattedState} State Health Profile - MSDAT Nigeria`,
        description: `Comprehensive health profile for ${formattedState} State, Nigeria. View health indicators, demographics, facility data, and health outcomes.`,
        image: DEFAULT_IMAGE,
        keywords: `${formattedState}, state profile, Nigeria health data, health indicators`,
      };
    }
  }

  // Handle Health Think routes
  if (cleanPath.startsWith('/health-think')) {
    return staticPageMeta['/health-think'];
  }

  // Default fallback
  return staticPageMeta['/'];
}

/**
 * Generate HTML document with proper meta tags for social media crawlers
 * @param {Object} meta - Meta information object
 * @param {string} fullUrl - Full URL of the page
 * @param {string} hostUrl - Base URL of the site (protocol + host)
 * @returns {string} - Complete HTML document
 */
function generateCrawlerHtml(meta, fullUrl, hostUrl) {
  const title = meta.title || 'MSDAT Nigeria';
  const description = meta.description || 'Multi-Source Data Analytics and Triangulation platform for Health Data in Nigeria.';
  let image = meta.image || DEFAULT_IMAGE;
  
  // Ensure image URL is absolute
  if (hostUrl && image && image.startsWith('/')) {
    image = `${hostUrl}${image}`;
  }
  
  const keywords = meta.keywords || 'MSDAT, health data, Nigeria, analytics';
  
  // Ensure favicon URLs are absolute or root-relative
  const faviconUrl = hostUrl ? `${hostUrl}/favicon.ico` : '/favicon.ico';
  const appleIconUrl = hostUrl ? `${hostUrl}/img/icons/apple-touch-icon.png` : '/img/icons/apple-touch-icon.png';

  return `<!DOCTYPE html>
<html lang="en" prefix="og: http://ogp.me/ns#">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <!-- Primary Meta Tags -->
  <title>${title}</title>
  <meta name="title" content="${title}">
  <meta name="description" content="${description}">
  <meta name="keywords" content="${keywords}">
  <meta name="author" content="Federal Ministry of Health, Nigeria">
  <meta name="robots" content="index, follow">
  
  <!-- Canonical URL -->
  <link rel="canonical" href="${fullUrl}">
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="${fullUrl}">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:image" content="${image}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="${title}">
  <meta property="og:site_name" content="MSDAT Nigeria">
  <meta property="og:locale" content="en_NG">
  
  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:url" content="${fullUrl}">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="${description}">
  <meta name="twitter:image" content="${image}">
  <meta name="twitter:image:alt" content="${title}">
  <meta name="twitter:site" content="@FMoaborHealth">
  <meta name="twitter:creator" content="@FMoaborHealth">
  
  <!-- LinkedIn -->
  <meta property="linkedin:owner" content="Federal Ministry of Health Nigeria">
  
  <!-- WhatsApp -->
  <meta property="og:image:secure_url" content="${image}">
  
  <!-- Telegram -->
  <meta name="telegram:channel" content="@fmohng">
  
  <!-- Favicon -->
  <link rel="icon" href="${faviconUrl}">
  <link rel="apple-touch-icon" sizes="180x180" href="${appleIconUrl}">
  
  <!-- Theme Color -->
  <meta name="theme-color" content="#348A57">
  <meta name="msapplication-TileColor" content="#348A57">
  
  <!-- Additional SEO -->
  <meta name="geo.region" content="NG">
  <meta name="geo.country" content="Nigeria">
</head>
<body>
  <div id="app">
    <header>
      <h1>${title}</h1>
    </header>
    <main>
      <p>${description}</p>
      <p>Visit <a href="${fullUrl}">${fullUrl}</a> to access the full interactive dashboard.</p>
    </main>
    <footer>
      <p>&copy; ${new Date().getFullYear()} Federal Ministry of Health, Nigeria. All rights reserved.</p>
    </footer>
  </div>
</body>
</html>`;
}

/**
 * Express middleware for handling social media crawler requests
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
function crawlerMiddleware(req, res, next) {
  const userAgent = req.get('User-Agent') || req.headers['user-agent'];
  
  // Only intercept GET requests from crawlers
  if (req.method !== 'GET' || !isCrawler(userAgent)) {
    return next();
  }

  // Skip API routes and static assets
  if (req.path.startsWith('/api/') || 
      req.path.startsWith('/static/') ||
      req.path.match(/\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot|map)$/i)) {
    return next();
  }

  // Generate meta for the requested path
  const meta = getMetaForPath(req.path);
  const protocol = req.protocol || 'https';
  const host = req.get('host') || req.headers.host || 'msdat.fmohconnect.gov.ng';
  const fullUrl = `${protocol}://${host}${req.originalUrl}`;
  const hostUrl = `${protocol}://${host}`;

  // Log crawler request for analytics (optional)
  console.log(`[Crawler] ${userAgent.substring(0, 50)}... requested: ${req.path}`);

  // Send pre-rendered HTML with meta tags
  res.set('Content-Type', 'text/html');
  res.send(generateCrawlerHtml(meta, fullUrl, hostUrl));
}

module.exports = {
  crawlerMiddleware,
  isCrawler,
  getMetaForPath,
  generateCrawlerHtml,
  CRAWLER_USER_AGENTS,
};
