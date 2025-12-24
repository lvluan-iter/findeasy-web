export const Endpoint = {
  // User endpoints
  getUsers: '/api/users',
  getUserInfo: '/api/users/info',
  getUserById: (userId) => `/api/users/id/${userId}`,
  updateUser: (userId) => `/api/users/${userId}`,
  updateUserPassword: (userId) => `/api/users/${userId}/password`,
  updateUserStatus: (userId) => `/api/users/status/${userId}`,
  updateUserRole: (userId) => `/api/users/${userId}/role`,
  lockUser: (userId) => `/api/users/${userId}/lock`,
  unlockUser: (userId) => `/api/users/${userId}/unlock`,

  // Property endpoints
  getProperties: '/api/properties',
  createProperty: '/api/properties',
  getPropertiesByUser: (userId) => `/api/properties/user/${userId}`,
  getPropertyById: (propertyId) => `/api/properties/${propertyId}`,
  updateProperty: (propertyId) => `/api/properties/${propertyId}`,
  searchProperties: '/api/properties/search',
  searchNearbyProperties: '/api/properties/searchNearby',
  getAvailableProperties: '/api/properties/available',
  getPopularProperties: '/api/properties/popular',
  getPropertyStats: (userId) => `/api/properties/stats/${userId}`,
  getQuickStats: (userId) => `/api/properties/quick-stats/${userId}`,
  getAdminQuickStats: '/api/properties/admin/quick-stats',
  togglePropertyVisibility: (propertyId) => `/api/properties/${propertyId}/toggle-visibility`,
  extendProperty: (propertyId) => `/api/properties/${propertyId}/extend`,
  deleteProperty: (propertyId) => `/api/properties/${propertyId}`,
  approveProperty: (propertyId) => `/api/properties/${propertyId}/approve`,
  rejectProperty: (propertyId) => `/api/properties/${propertyId}/reject`,
  lockProperty: (propertyId) => `/api/properties/${propertyId}/lock`,
  unlockProperty: (propertyId) => `/api/properties/${propertyId}/unlock`,

  // Category endpoints
  getCategories: '/api/categories/',
  createCategory: '/api/categories',
  updateCategory: (categoryId) => `/api/categories/${categoryId}`,
  deleteCategory: (categoryId) => `/api/categories/${categoryId}`,

  // Location endpoints
  getLocations: '/api/location',

  // Amenities endpoints
  getAmenities: '/api/amenities',
  createAmenity: '/api/amenities',
  updateAmenity: (amenityId) => `/api/amenities/${amenityId}`,
  deleteAmenity: (amenityId) => `/api/amenities/${amenityId}`,

  // User favorites endpoints
  addToFavorites: (userId, propertyId) => `/api/users/${userId}/favorites/${propertyId}`,
  removeFromFavorites: (userId, propertyId) => `/api/users/${userId}/favorites/${propertyId}`,

  // Tour request endpoints
  createTourRequest: '/api/tour-requests',
  getTourRequestsByUser: (userId) => `/api/tour-requests/user/${userId}`,
  getTourRequestsByEmail: (email) => `/api/tour-requests/email/${email}`,
  updateTourRequestStatus: (requestId) => `/api/tour-requests/${requestId}/status`,
  rescheduleTourRequest: (requestId) => `/api/tour-requests/${requestId}/reschedule`,
  deleteTourRequest: (requestId) => `/api/tour-requests/${requestId}`,
  updateTourRequestDate: (requestId) => `/api/tour-requests/${requestId}/date`,

  // Upload endpoints
  uploadImages: '/api/upload-images',

  // Auth endpoints
  login: '/api/auth/login',
  register: '/api/auth/register',
  forgotPassword: '/api/auth/forgot-password',
  resetPassword: '/api/auth/reset-password',
  refreshToken: '/api/auth/refresh-token',

  // Conversation endpoints
  getConversation: (conversationId) => `/conversations/${conversationId}`
};
