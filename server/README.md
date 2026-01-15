# Dynamic Social Media Meta Tags - Server Setup Guide

This guide explains how to set up the server for dynamic Open Graph (OG) meta tags for social media sharing.

## Problem Solved

Social media platforms (Facebook, Twitter, LinkedIn, WhatsApp, etc.) use web crawlers to fetch page information when a link is shared. These crawlers **don't execute JavaScript**, so they only see the static HTML in your `index.html`. 

This server solution intercepts requests from social media crawlers and serves them customized HTML with the correct meta tags for each page.

## How It Works

```
User shares link → Social Media Crawler → Server detects crawler → Returns custom HTML with meta tags
                                                                          ↓
                                                      Facebook/Twitter displays correct title, 
                                                      description, and image
```

```
Regular User → Server → Returns normal Vue.js SPA
```

## Files Created

```
server/
├── index.js                          # Main Express server
├── config/
│   └── metaConfig.js                # Page meta tag configurations
└── middleware/
    └── crawlerMiddleware.js         # Crawler detection & HTML generation
```

## Setup Instructions

### 1. Install Server Dependencies

```bash
npm install express compression helmet morgan cors --save
```

### 2. Add Scripts to package.json

Add these scripts to your `package.json`:

```json
{
  "scripts": {
    "server:dev": "node server/index.js",
    "server:start": "NODE_ENV=production node server/index.js",
    "server:start:win": "set NODE_ENV=production && node server/index.js",
    "build:production": "npm run build && npm run server:start"
  }
}
```

### 3. Create Default OG Image

Create a default Open Graph image at `public/img/og-default.png`:
- Recommended size: **1200x630 pixels**
- Should include your logo and site name
- Use clear, readable text

### 4. Build the Vue Application

```bash
npm run build
```

### 5. Start the Server

**Development:**
```bash
npm run server:dev
```

**Production (Linux/Mac):**
```bash
npm run server:start
```

**Production (Windows):**
```bash
npm run server:start:win
```

## Configuration

### Adding New Dashboards

Edit `server/config/metaConfig.js` to add meta tags for new dashboards:

```javascript
const dashboardMeta = {
  // Add your new dashboard here
  New_Dashboard_Name: {
    title: 'New Dashboard Title',
    description: 'Description of what this dashboard shows...',
    image: `${BASE_URL}/img/dashboardPreviewImages/new-dashboard.png`,
    keywords: 'relevant, keywords, here',
  },
  // ...existing dashboards
};
```

### Adding New Static Pages

Edit `server/config/metaConfig.js`:

```javascript
const staticPageMeta = {
  '/new-page': {
    title: 'New Page Title - MSDAT Nigeria',
    description: 'Description of the new page...',
    image: DEFAULT_IMAGE,
    keywords: 'page keywords',
  },
  // ...existing pages
};
```

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `3000` |
| `NODE_ENV` | Environment (`development`/`production`) | `development` |
| `BASE_URL` | Base URL for images | `https://msdat.fmohconnect.gov.ng` |

## Deployment Options

### Option A: Direct Node.js Deployment

1. Build the Vue app: `npm run build`
2. Start the server: `npm run server:start`
3. Use PM2 for process management:

```bash
# Install PM2
npm install -g pm2

# Start with PM2
pm2 start server/index.js --name "msdat-server"

# Auto-restart on reboot
pm2 startup
pm2 save
```

### Option B: Docker Deployment

Create a `Dockerfile`:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY dist/ ./dist/
COPY server/ ./server/

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

CMD ["node", "server/index.js"]
```

Build and run:

```bash
# Build the Vue app first
npm run build

# Build Docker image
docker build -t msdat-server .

# Run container
docker run -p 3000:3000 -d msdat-server
```

### Option C: Nginx Reverse Proxy

If using Nginx, add this configuration:

```nginx
server {
    listen 80;
    server_name msdat.fmohconnect.gov.ng;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Testing

### Test Crawler Detection Locally

Use curl with a fake user agent:

```bash
# Test as Facebook crawler
curl -H "User-Agent: facebookexternalhit/1.1" http://localhost:3000/dashboard/Health_Outcomes_and_Service_Coverage

# Test as Twitter crawler
curl -H "User-Agent: Twitterbot/1.0" http://localhost:3000/about

# Test as regular user (should redirect to SPA)
curl http://localhost:3000/dashboard/Health_Outcomes_and_Service_Coverage
```

### Validate Meta Tags

Use these tools to validate your meta tags:

1. **Facebook Sharing Debugger**: https://developers.facebook.com/tools/debug/
2. **Twitter Card Validator**: https://cards-dev.twitter.com/validator
3. **LinkedIn Post Inspector**: https://www.linkedin.com/post-inspector/
4. **OpenGraph.xyz**: https://www.opengraph.xyz/

### Clear Facebook Cache

If Facebook shows old meta tags, use the Sharing Debugger to scrape again:
1. Go to https://developers.facebook.com/tools/debug/
2. Enter your URL
3. Click "Scrape Again"

## Supported Social Platforms

The middleware serves optimized meta tags for:

- ✅ Facebook
- ✅ Twitter/X
- ✅ LinkedIn
- ✅ WhatsApp
- ✅ Telegram
- ✅ Slack
- ✅ Discord
- ✅ Pinterest
- ✅ Skype
- ✅ Microsoft Teams
- ✅ Viber
- ✅ Reddit
- ✅ Google Rich Results

## Troubleshooting

### Meta tags not updating
1. Check if the server is running
2. Clear social media platform cache (use their debug tools)
3. Verify the page route is configured in `metaConfig.js`

### Images not loading
1. Ensure images are in `public/img/` before building
2. Verify the image URL is absolute (starts with `https://`)
3. Check image dimensions (1200x630 recommended)

### Server not starting
1. Run `npm run build` first
2. Check if port 3000 is available
3. Verify all dependencies are installed

## API Endpoints

| Endpoint | Description |
|----------|-------------|
| `GET /health` | Health check endpoint |
| `GET /api/version` | API version info |
| `GET /*` | All other routes serve the Vue SPA |

## Contributing

To add support for new pages or dashboards:

1. Add meta configuration in `server/config/metaConfig.js`
2. Create any required preview images in `public/img/`
3. Test using the debug tools listed above
4. Submit a pull request

---

**Note**: Remember to create the `og-default.png` image (1200x630 pixels) and place it in `public/img/` before deployment.
