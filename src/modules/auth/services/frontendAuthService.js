// Frontend Authentication Service
let frontendToken = null;
let tokenExpiry = null;
const TOKEN_EXPIRY_BUFFER = 5 * 60 * 1000; 
// Function to fetch a new frontend token from the backend
async function getFrontendToken() {
  try {
    const url = `${process.env.VUE_APP_API_BASE_URL}auth/frontend-token/`;
    console.log('Fetching frontend token from:', url);
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-FRONTEND-KEY-ID': process.env.VUE_APP_FRONTEND_KEY_ID,
        'X-FRONTEND-AUTH': process.env.VUE_APP_FRONTEND_AUTH,
      },
    });
    console.log('Response status:', response.status);
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response:', errorText);
      throw new Error(`Failed to fetch frontend token: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    console.log('Token data:', data);
    const { token } = data;
    frontendToken = token;
    tokenExpiry = Date.now() + TOKEN_EXPIRY_BUFFER;
    return token;
  } catch (error) {
    console.error('Failed to fetch frontend token:', error);
    throw error;
  }
}

// Function to get a valid token, refreshing if expired
async function getValidToken() {
  if (!frontendToken || Date.now() >= tokenExpiry) {
    await getFrontendToken();
  }
  return frontendToken;
}

// Export the service functions
export default {
  getFrontendToken,
  getValidToken,
};