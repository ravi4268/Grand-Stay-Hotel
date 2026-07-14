export {
  authAPI,
  roomsAPI,
  bookingsAPI,
  contactsAPI,
  paymentsAPI,
  galleryAPI,
  ratingsAPI,
  locationAPI,
  transportAPI,
  parkingAPI,
  amenitiesAPI,
  dashboardAPI,
  default as allAPIs,
} from './api';

export {
  default as API_CONFIG,
  getEndpoint,
  getAuthHeaders,
  validateResponse,
  handleAPIError,
  fetchWithRetry,
} from './apiConfig';

export * from './api';
