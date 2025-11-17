// Frontend Authentication Service 

// In-memory and sessionStorage hybrid storage
let frontendToken = null;
let tokenExpiry = null;
const TOKEN_EXPIRY_BUFFER = 15 * 60 * 1000; // 15 minutes (backend expiry time)
const STORAGE_KEY = 'msdat_frontend_token';
const EXPIRY_KEY = 'msdat_frontend_token_expiry';

// Retry configuration
const MAX_RETRIES = 3;
const INITIAL_RETRY_DELAY = 1000; // 1 second

// Token fetch lock to prevent race conditions
let tokenFetchPromise = null;

// Validate environment variables on module load
function validateEnvVariables() {
  const keyId = process.env.VUE_APP_FRONTEND_KEY_ID;
  const auth = process.env.VUE_APP_FRONTEND_AUTH;
  
  if (!keyId || !auth) {
    // console.error('❌ Frontend Auth Error: Missing environment variables');
    // console.error('VUE_APP_FRONTEND_KEY_ID:', keyId ? '✓ Set' : '✗ Missing');
    // console.error('VUE_APP_FRONTEND_AUTH:', auth ? '✓ Set' : '✗ Missing');
    throw new Error('Frontend authentication credentials not configured. Check .env file.');
  }
  
  if (keyId === 'undefined' || auth === 'undefined') {
    throw new Error('Frontend authentication credentials are set to "undefined". Check .env file.');
  }
  
  // console.log('✓ Frontend auth credentials validated');
}

// Initialize: validate env vars and try to restore token from sessionStorage
try {
  validateEnvVariables();
  
  // Try to restore token from sessionStorage (survives page refresh)
  const storedToken = sessionStorage.getItem(STORAGE_KEY);
  const storedExpiry = sessionStorage.getItem(EXPIRY_KEY);
  
  if (storedToken && storedExpiry) {
    const expiryTime = parseInt(storedExpiry, 10);
    if (Date.now() < expiryTime) {
      frontendToken = storedToken;
      tokenExpiry = expiryTime;
      // console.log('✓ Frontend token restored from session storage');
    } else {
      // Clear expired token
      sessionStorage.removeItem(STORAGE_KEY);
      sessionStorage.removeItem(EXPIRY_KEY);
      console.log('ℹ Stored token expired, will fetch new one');
    }
  }
} catch (error) {
  console.error('Frontend auth initialization failed:', error);
}

// Exponential backoff delay calculation
function getRetryDelay(attemptNumber) {
  return INITIAL_RETRY_DELAY * Math.pow(2, attemptNumber - 1);
}

// Sleep utility for retry delays
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Function to fetch a new frontend token from the backend with retry logic
async function getFrontendToken(retryCount = 0) {
  try {
    const baseUrl = process.env.VUE_APP_API_BASE_URL;
    
    if (!baseUrl) {
      throw new Error('VUE_APP_API_BASE_URL is not configured');
    }
    
    const url = `${baseUrl}auth/frontend-token/`;
    
    console.log(`🔄 Fetching frontend token (attempt ${retryCount + 1}/${MAX_RETRIES + 1})...`);
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-FRONTEND-KEY-ID': process.env.VUE_APP_FRONTEND_KEY_ID,
        'X-FRONTEND-AUTH': process.env.VUE_APP_FRONTEND_AUTH,
      },
      mode: 'cors', // Explicitly set CORS mode
      credentials: 'include', // Include credentials for CORS
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage = `Failed to fetch frontend token: ${response.status} ${response.statusText}`;
      
      try {
        const errorJson = JSON.parse(errorText);
        errorMessage += `\nDetails: ${JSON.stringify(errorJson)}`;
      } catch {
        errorMessage += `\nResponse: ${errorText}`;
      }
      
      throw new Error(errorMessage);
    }
    
    const data = await response.json();
    const { token } = data;
    
    if (!token) {
      throw new Error('Backend returned empty token');
    }
    
    // Store token in memory
    frontendToken = token;
    tokenExpiry = Date.now() + TOKEN_EXPIRY_BUFFER;
    
    // Persist to sessionStorage (survives page refresh, cleared on tab close)
    sessionStorage.setItem(STORAGE_KEY, token);
    sessionStorage.setItem(EXPIRY_KEY, tokenExpiry.toString());
    
    // console.log('✓ Frontend token fetched and stored successfully');
    // console.log(`Token expires at: ${new Date(tokenExpiry).toLocaleTimeString()}`);
    
    return token;
    
  } catch (error) {
    console.error(`❌ Token fetch attempt ${retryCount + 1} failed:`, error.message);
    
    // Retry with exponential backoff
    if (retryCount < MAX_RETRIES) {
      const delay = getRetryDelay(retryCount + 1);
      console.log(`⏳ Retrying in ${delay}ms...`);
      await sleep(delay);
      return getFrontendToken(retryCount + 1);
    }
    
    // All retries exhausted
    console.error('❌ All token fetch attempts failed');
    throw new Error(`Failed to fetch frontend token after ${MAX_RETRIES + 1} attempts: ${error.message}`);
  }
}

// Function to get a valid token with race condition prevention
async function getValidToken() {
  // Check if token is still valid
  if (frontendToken && Date.now() < tokenExpiry) {
    return frontendToken;
  }
  
  // If a token fetch is already in progress, wait for it
  if (tokenFetchPromise) {
    console.log('⏳ Token fetch already in progress, waiting...');
    return tokenFetchPromise;
  }
  
  // Start new token fetch and store the promise
  tokenFetchPromise = getFrontendToken()
    .then((token) => {
      tokenFetchPromise = null; // Clear the lock
      return token;
    })
    .catch((error) => {
      tokenFetchPromise = null; // Clear the lock even on error
      throw error;
    });
  
  return tokenFetchPromise;
}

// Function to force token refresh (call this on 401 errors)
async function refreshToken() {
  console.log('🔄 Force refreshing frontend token...');
  
  // Clear existing token
  frontendToken = null;
  tokenExpiry = null;
  sessionStorage.removeItem(STORAGE_KEY);
  sessionStorage.removeItem(EXPIRY_KEY);
  
  // Clear any pending fetch promise
  tokenFetchPromise = null;
  
  // Fetch new token
  return getValidToken();
}

// Function to clear token (call on logout or security events)
function clearToken() {
  console.log('🗑️ Clearing frontend token');
  frontendToken = null;
  tokenExpiry = null;
  sessionStorage.removeItem(STORAGE_KEY);
  sessionStorage.removeItem(EXPIRY_KEY);
  tokenFetchPromise = null;
}

// Export the service functions
export default {
  getFrontendToken,
  getValidToken,
  refreshToken,
  clearToken,
};