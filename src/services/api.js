const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://backened-hotel-management-3ee8.onrender.com/api';

export const authAPI = {
  login: async (username, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      return await response.json();
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  logout: async () => {
    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Logout failed');
      }

      return await response.json();
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  },

  validateToken: async () => {
    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch(`${API_BASE_URL}/auth/validate`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Token validation failed');
      }

      return await response.json();
    } catch (error) {
      console.error('Token validation error:', error);
      throw error;
    }
  },
};

export const roomsAPI = {
  getAllRooms: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/rooms`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch rooms');
      }

      return await response.json();
    } catch (error) {
      console.error('Get rooms error:', error);
      throw error;
    }
  },

  getRoomById: async (roomId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/rooms/${roomId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch room');
      }

      return await response.json();
    } catch (error) {
      console.error('Get room by ID error:', error);
      throw error;
    }
  },

  createRoom: async (roomData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/rooms`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
        },
        body: JSON.stringify(roomData),
      });

      if (!response.ok) {
        throw new Error('Failed to create room');
      }

      return await response.json();
    } catch (error) {
      console.error('Create room error:', error);
      throw error;
    }
  },

  updateRoom: async (roomId, roomData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/rooms/${roomId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
        },
        body: JSON.stringify(roomData),
      });

      if (!response.ok) {
        throw new Error('Failed to update room');
      }

      return await response.json();
    } catch (error) {
      console.error('Update room error:', error);
      throw error;
    }
  },

  deleteRoom: async (roomId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/rooms/${roomId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete room');
      }

      return await response.json();
    } catch (error) {
      console.error('Delete room error:', error);
      throw error;
    }
  },

  updateRoomStatus: async (roomId, status) => {
    try {
      const response = await fetch(`${API_BASE_URL}/rooms/${roomId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error('Failed to update room status');
      }

      return await response.json();
    } catch (error) {
      console.error('Update room status error:', error);
      throw error;
    }
  },
};

export const bookingsAPI = {
  getAllBookings: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/bookings`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch bookings');
      }

      return await response.json();
    } catch (error) {
      console.error('Get bookings error:', error);
      throw error;
    }
  },

  getBookingById: async (bookingId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/bookings/${bookingId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch booking');
      }

      return await response.json();
    } catch (error) {
      console.error('Get booking by ID error:', error);
      throw error;
    }
  },

  createBooking: async (bookingData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
        },
        body: JSON.stringify(bookingData),
      });

      if (!response.ok) {
        throw new Error('Failed to create booking');
      }

      return await response.json();
    } catch (error) {
      console.error('Create booking error:', error);
      throw error;
    }
  },

  updateBooking: async (bookingId, bookingData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/bookings/${bookingId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
        },
        body: JSON.stringify(bookingData),
      });

      if (!response.ok) {
        throw new Error('Failed to update booking');
      }

      return await response.json();
    } catch (error) {
      console.error('Update booking error:', error);
      throw error;
    }
  },

  cancelBooking: async (bookingId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/bookings/${bookingId}/cancel`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to cancel booking');
      }

      return await response.json();
    } catch (error) {
      console.error('Cancel booking error:', error);
      throw error;
    }
  },
};

export const contactsAPI = {
  getAllContacts: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/contacts`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch contacts');
      }

      return await response.json();
    } catch (error) {
      console.error('Get contacts error:', error);
      throw error;
    }
  },

  getContactById: async (contactId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/contacts/${contactId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch contact');
      }

      return await response.json();
    } catch (error) {
      console.error('Get contact by ID error:', error);
      throw error;
    }
  },

  createContact: async (contactData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/contacts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
        },
        body: JSON.stringify(contactData),
      });

      if (!response.ok) {
        throw new Error('Failed to create contact');
      }

      return await response.json();
    } catch (error) {
      console.error('Create contact error:', error);
      throw error;
    }
  },

  updateContact: async (contactId, contactData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/contacts/${contactId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
        },
        body: JSON.stringify(contactData),
      });

      if (!response.ok) {
        throw new Error('Failed to update contact');
      }

      return await response.json();
    } catch (error) {
      console.error('Update contact error:', error);
      throw error;
    }
  },

  deleteContact: async (contactId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/contacts/${contactId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete contact');
      }

      return await response.json();
    } catch (error) {
      console.error('Delete contact error:', error);
      throw error;
    }
  },
};

export const paymentsAPI = {
  getAllPayments: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/payments`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch payments');
      }

      return await response.json();
    } catch (error) {
      console.error('Get payments error:', error);
      throw error;
    }
  },

  processPayment: async (paymentData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/payments/process`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
        },
        body: JSON.stringify(paymentData),
      });

      if (!response.ok) {
        throw new Error('Failed to process payment');
      }

      return await response.json();
    } catch (error) {
      console.error('Process payment error:', error);
      throw error;
    }
  },

  getPaymentById: async (paymentId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/payments/${paymentId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch payment');
      }

      return await response.json();
    } catch (error) {
      console.error('Get payment by ID error:', error);
      throw error;
    }
  },

  refundPayment: async (paymentId, refundData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/payments/${paymentId}/refund`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
        },
        body: JSON.stringify(refundData),
      });

      if (!response.ok) {
        throw new Error('Failed to process refund');
      }

      return await response.json();
    } catch (error) {
      console.error('Refund payment error:', error);
      throw error;
    }
  },
};

export const galleryAPI = {
  getAllGalleryImages: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/gallery`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch gallery images');
      }

      return await response.json();
    } catch (error) {
      console.error('Get gallery images error:', error);
      throw error;
    }
  },

  uploadGalleryImage: async (formData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/gallery/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload image');
      }

      return await response.json();
    } catch (error) {
      console.error('Upload gallery image error:', error);
      throw error;
    }
  },

  deleteGalleryImage: async (imageId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/gallery/${imageId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete image');
      }

      return await response.json();
    } catch (error) {
      console.error('Delete gallery image error:', error);
      throw error;
    }
  },
};

export const ratingsAPI = {
  getAllRatings: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/ratings`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch ratings');
      }

      return await response.json();
    } catch (error) {
      console.error('Get ratings error:', error);
      throw error;
    }
  },

  submitRating: async (ratingData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/ratings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
        },
        body: JSON.stringify(ratingData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit rating');
      }

      return await response.json();
    } catch (error) {
      console.error('Submit rating error:', error);
      throw error;
    }
  },

  getRatingsByGuestId: async (guestId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/ratings/guest/${guestId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch guest ratings');
      }

      return await response.json();
    } catch (error) {
      console.error('Get guest ratings error:', error);
      throw error;
    }
  },
};

export const locationAPI = {
  getHotelLocation: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/location`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch location');
      }

      return await response.json();
    } catch (error) {
      console.error('Get hotel location error:', error);
      throw error;
    }
  },

  updateHotelLocation: async (locationData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/location`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
        },
        body: JSON.stringify(locationData),
      });

      if (!response.ok) {
        throw new Error('Failed to update location');
      }

      return await response.json();
    } catch (error) {
      console.error('Update hotel location error:', error);
      throw error;
    }
  },
};

export const transportAPI = {
  getAllTransports: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/transport`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch transport');
      }

      return await response.json();
    } catch (error) {
      console.error('Get transport error:', error);
      throw error;
    }
  },

  bookTransport: async (transportData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/transport/book`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
        },
        body: JSON.stringify(transportData),
      });

      if (!response.ok) {
        throw new Error('Failed to book transport');
      }

      return await response.json();
    } catch (error) {
      console.error('Book transport error:', error);
      throw error;
    }
  },
};

export const parkingAPI = {
  getAllParkingSpots: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/parking`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch parking spots');
      }

      return await response.json();
    } catch (error) {
      console.error('Get parking spots error:', error);
      throw error;
    }
  },

  reserveParkingSpot: async (parkingData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/parking/reserve`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
        },
        body: JSON.stringify(parkingData),
      });

      if (!response.ok) {
        throw new Error('Failed to reserve parking');
      }

      return await response.json();
    } catch (error) {
      console.error('Reserve parking error:', error);
      throw error;
    }
  },

  releaseParkingSpot: async (spotId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/parking/${spotId}/release`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to release parking');
      }

      return await response.json();
    } catch (error) {
      console.error('Release parking error:', error);
      throw error;
    }
  },
};

export const amenitiesAPI = {
  getAllAmenities: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/amenities`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch amenities');
      }

      return await response.json();
    } catch (error) {
      console.error('Get amenities error:', error);
      throw error;
    }
  },

  getAmenityById: async (amenityId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/amenities/${amenityId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch amenity');
      }

      return await response.json();
    } catch (error) {
      console.error('Get amenity error:', error);
      throw error;
    }
  },

  bookAmenity: async (amenityId, bookingData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/amenities/${amenityId}/book`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
        },
        body: JSON.stringify(bookingData),
      });

      if (!response.ok) {
        throw new Error('Failed to book amenity');
      }

      return await response.json();
    } catch (error) {
      console.error('Book amenity error:', error);
      throw error;
    }
  },

  updateAmenity: async (amenityId, amenityData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/amenities/${amenityId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
        },
        body: JSON.stringify(amenityData),
      });

      if (!response.ok) {
        throw new Error('Failed to update amenity');
      }

      return await response.json();
    } catch (error) {
      console.error('Update amenity error:', error);
      throw error;
    }
  },
};

export const dashboardAPI = {
  getDashboardStats: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/dashboard/stats`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch dashboard stats');
      }

      return await response.json();
    } catch (error) {
      console.error('Get dashboard stats error:', error);
      throw error;
    }
  },

  getOccupancyRate: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/dashboard/occupancy`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch occupancy rate');
      }

      return await response.json();
    } catch (error) {
      console.error('Get occupancy rate error:', error);
      throw error;
    }
  },

  getRevenueReport: async (startDate, endDate) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/dashboard/revenue?startDate=${startDate}&endDate=${endDate}`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch revenue report');
      }

      return await response.json();
    } catch (error) {
      console.error('Get revenue report error:', error);
      throw error;
    }
  },
};

export default {
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
};
