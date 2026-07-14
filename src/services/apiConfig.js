const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',

  TIMEOUT: process.env.REACT_APP_TIMEOUT || 30000,

  DEBUG_MODE: process.env.REACT_APP_DEBUG === 'true' || false,

  API_VERSION: 'v1',

  RETRY_CONFIG: {
    maxRetries: 3,
    retryDelay: 1000, 
    retryableStatusCodes: [408, 429, 500, 502, 503, 504],
  },

  ENDPOINTS: {
    AUTH_LOGIN: '/auth/login',
    AUTH_LOGOUT: '/auth/logout',
    AUTH_VALIDATE: '/auth/validate',

    ROOMS: '/rooms',
    ROOM_BY_ID: (id) => `/rooms/${id}`,
    ROOM_STATUS: (id) => `/rooms/${id}/status`,

    BOOKINGS: '/bookings',
    BOOKING_BY_ID: (id) => `/bookings/${id}`,
    BOOKING_CANCEL: (id) => `/bookings/${id}/cancel`,

    CONTACTS: '/contacts',
    CONTACT_BY_ID: (id) => `/contacts/${id}`,

    PAYMENTS: '/payments',
    PAYMENT_BY_ID: (id) => `/payments/${id}`,
    PAYMENT_PROCESS: '/payments/process',
    PAYMENT_REFUND: (id) => `/payments/${id}/refund`,

    GALLERY: '/gallery',
    GALLERY_UPLOAD: '/gallery/upload',
    GALLERY_DELETE: (id) => `/gallery/${id}`,

    // Ratings
    RATINGS: '/ratings',
    RATING_BY_GUEST: (id) => `/ratings/guest/${id}`,

    // Location
    LOCATION: '/location',

    // Transport
    TRANSPORT: '/transport',
    TRANSPORT_BOOK: '/transport/book',

    // Parking
    PARKING: '/parking',
    PARKING_RESERVE: '/parking/reserve',
    PARKING_RELEASE: (id) => `/parking/${id}/release`,

    // Amenities
    AMENITIES: '/amenities',
    AMENITY_BY_ID: (id) => `/amenities/${id}`,
    AMENITY_BOOK: (id) => `/amenities/${id}/book`,

    // Dashboard
    DASHBOARD_STATS: '/dashboard/stats',
    DASHBOARD_OCCUPANCY: '/dashboard/occupancy',
    DASHBOARD_REVENUE: '/dashboard/revenue',
  },

  // HTTP Headers
  DEFAULT_HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },

  // HTTP Methods
  METHODS: {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
    PATCH: 'PATCH',
  },

  // Status codes
  STATUS_CODES: {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    INTERNAL_SERVER_ERROR: 500,
    SERVICE_UNAVAILABLE: 503,
  },

  // Error messages
  ERROR_MESSAGES: {
    NETWORK_ERROR: 'Network error. Please check your internet connection.',
    TIMEOUT_ERROR: 'Request timeout. Please try again.',
    UNAUTHORIZED_ERROR: 'Unauthorized. Please login again.',
    NOT_FOUND_ERROR: 'Resource not found.',
    SERVER_ERROR: 'Server error. Please try again later.',
    VALIDATION_ERROR: 'Validation error. Please check your input.',
  },

  CACHE_CONFIG: {
    enableCache: true,
    cacheDuration: 5 * 60 * 1000, 
    cacheExcludeEndpoints: ['/auth/login', '/auth/logout', '/payments/process'],
  },

  TOKEN_CONFIG: {
    tokenKey: 'auth_token',
    tokenRefreshKey: 'refresh_token',
    tokenExpireTime: 24 * 60 * 60 * 1000, 
  },

  FEATURES: {
    enableAnalytics: true,
    enableErrorReporting: true,
    enableOfflineMode: false,
    enableServiceWorker: false,
  },
};

export const getEndpoint = (endpoint, ...params) => {
  if (typeof endpoint === 'function') {
    return `${API_CONFIG.BASE_URL}${endpoint(...params)}`;
  }
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

export const getAuthHeaders = () => {
  const token = localStorage.getItem(API_CONFIG.TOKEN_CONFIG.tokenKey);
  return {
    ...API_CONFIG.DEFAULT_HEADERS,
    ...(token && { 'Authorization': `Bearer ${token}` }),
  };
};

export const validateResponse = (response) => {
  if (!response.ok) {
    const error = new Error();
    error.status = response.status;
    error.statusText = response.statusText;
    throw error;
  }
  return response;
};

export const handleAPIError = (error) => {
  const errorInfo = {
    message: API_CONFIG.ERROR_MESSAGES.NETWORK_ERROR,
    status: null,
    details: null,
  };

  if (error.status) {
    errorInfo.status = error.status;
    
    switch (error.status) {
      case API_CONFIG.STATUS_CODES.UNAUTHORIZED:
        errorInfo.message = API_CONFIG.ERROR_MESSAGES.UNAUTHORIZED_ERROR;
        localStorage.removeItem(API_CONFIG.TOKEN_CONFIG.tokenKey);
        window.location.href = '/login';
        break;
      case API_CONFIG.STATUS_CODES.NOT_FOUND:
        errorInfo.message = API_CONFIG.ERROR_MESSAGES.NOT_FOUND_ERROR;
        break;
      case API_CONFIG.STATUS_CODES.BAD_REQUEST:
        errorInfo.message = API_CONFIG.ERROR_MESSAGES.VALIDATION_ERROR;
        break;
      case API_CONFIG.STATUS_CODES.INTERNAL_SERVER_ERROR:
      case API_CONFIG.STATUS_CODES.SERVICE_UNAVAILABLE:
        errorInfo.message = API_CONFIG.ERROR_MESSAGES.SERVER_ERROR;
        break;
      default:
        errorInfo.message = error.statusText || API_CONFIG.ERROR_MESSAGES.NETWORK_ERROR;
    }
  }

  if (API_CONFIG.DEBUG_MODE) {
    console.error('API Error:', errorInfo);
  }

  if (API_CONFIG.FEATURES.enableErrorReporting && errorInfo.status) {
    
  }

  return errorInfo;
};

export const fetchWithRetry = async (url, options = {}, retryCount = 0) => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);

    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    return validateResponse(response);
  } catch (error) {
    clearTimeout(timeoutId);

    if (retryCount < API_CONFIG.RETRY_CONFIG.maxRetries) {
      const shouldRetry = 
        error.name === 'AbortError' ||
        (error.status && API_CONFIG.RETRY_CONFIG.retryableStatusCodes.includes(error.status));

      if (shouldRetry) {
        await new Promise(resolve => 
          setTimeout(resolve, API_CONFIG.RETRY_CONFIG.retryDelay * (retryCount + 1))
        );
        return fetchWithRetry(url, options, retryCount + 1);
      }
    }

    throw error;
  }
};

export default API_CONFIG;
