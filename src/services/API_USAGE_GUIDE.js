// API USAGE GUIDE

// Import the APIs in your components
import { 
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
  dashboardAPI 
} from '../services/api';

// ============================================
// AUTHENTICATION EXAMPLES
// ============================================

// Login Example
const handleLogin = async () => {
  try {
    const response = await authAPI.login('admin', 'admin123');
    localStorage.setItem('auth_token', response.token);
    // Handle successful login
  } catch (error) {
    console.error('Login failed:', error);
  }
};

// Logout Example
const handleLogout = async () => {
  try {
    await authAPI.logout();
    localStorage.removeItem('auth_token');
    // Handle logout
  } catch (error) {
    console.error('Logout failed:', error);
  }
};

// ============================================
// ROOMS API EXAMPLES
// ============================================

// Get all rooms
const fetchAllRooms = async () => {
  try {
    const rooms = await roomsAPI.getAllRooms();
    setRooms(rooms);
  } catch (error) {
    console.error('Failed to fetch rooms:', error);
  }
};

// Get single room
const fetchRoomById = async (roomId) => {
  try {
    const room = await roomsAPI.getRoomById(roomId);
    setRoom(room);
  } catch (error) {
    console.error('Failed to fetch room:', error);
  }
};

// Create new room
const addNewRoom = async (roomData) => {
  try {
    const newRoom = await roomsAPI.createRoom({
      number: '103',
      floor: '1st Floor',
      type: 'Deluxe Suite',
      bedType: 'King Size',
      maxOccupancy: 3,
      price: 150,
      status: 'Available',
      cleanliness: 'Clean',
      amenities: ['WiFi', 'AC', 'Mini Bar']
    });
    setRooms([...rooms, newRoom]);
  } catch (error) {
    console.error('Failed to create room:', error);
  }
};

// Update room
const updateRoomData = async (roomId, updatedData) => {
  try {
    const updatedRoom = await roomsAPI.updateRoom(roomId, updatedData);
    setRooms(rooms.map(r => r.id === roomId ? updatedRoom : r));
  } catch (error) {
    console.error('Failed to update room:', error);
  }
};

// Delete room
const deleteRoomData = async (roomId) => {
  try {
    await roomsAPI.deleteRoom(roomId);
    setRooms(rooms.filter(r => r.id !== roomId));
  } catch (error) {
    console.error('Failed to delete room:', error);
  }
};

// Update room status
const changeRoomStatus = async (roomId, newStatus) => {
  try {
    const updatedRoom = await roomsAPI.updateRoomStatus(roomId, newStatus);
    // Update room status in state
  } catch (error) {
    console.error('Failed to update room status:', error);
  }
};

// ============================================
// BOOKINGS API EXAMPLES
// ============================================

// Get all bookings
const fetchAllBookings = async () => {
  try {
    const bookings = await bookingsAPI.getAllBookings();
    setBookings(bookings);
  } catch (error) {
    console.error('Failed to fetch bookings:', error);
  }
};

// Create booking
const makeBooking = async (bookingData) => {
  try {
    const booking = await bookingsAPI.createBooking({
      guestId: '123',
      roomId: '101',
      checkInDate: '2024-07-15',
      checkOutDate: '2024-07-20',
      numberOfGuests: 2,
      totalPrice: 750,
      status: 'Confirmed'
    });
    setBookings([...bookings, booking]);
  } catch (error) {
    console.error('Failed to create booking:', error);
  }
};

// Cancel booking
const cancelBooking = async (bookingId) => {
  try {
    await bookingsAPI.cancelBooking(bookingId);
    setBookings(bookings.filter(b => b.id !== bookingId));
  } catch (error) {
    console.error('Failed to cancel booking:', error);
  }
};

// ============================================
// CONTACTS API EXAMPLES
// ============================================

// Get all contacts
const fetchAllContacts = async () => {
  try {
    const contacts = await contactsAPI.getAllContacts();
    setContacts(contacts);
  } catch (error) {
    console.error('Failed to fetch contacts:', error);
  }
};

// Add new contact
const addNewContact = async (contactData) => {
  try {
    const newContact = await contactsAPI.createContact({
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1234567890',
      address: '123 Main St',
      city: 'New York',
      country: 'USA'
    });
    setContacts([...contacts, newContact]);
  } catch (error) {
    console.error('Failed to create contact:', error);
  }
};

// ============================================
// PAYMENTS API EXAMPLES
// ============================================

// Process payment
const processPayment = async (paymentData) => {
  try {
    const payment = await paymentsAPI.processPayment({
      bookingId: '123',
      amount: 750,
      paymentMethod: 'credit_card',
      cardDetails: {
        number: '**** **** **** 1234',
        expiryDate: '12/25',
        cvv: '***'
      }
    });
    console.log('Payment processed:', payment);
  } catch (error) {
    console.error('Failed to process payment:', error);
  }
};

// Get all payments
const fetchAllPayments = async () => {
  try {
    const payments = await paymentsAPI.getAllPayments();
    setPayments(payments);
  } catch (error) {
    console.error('Failed to fetch payments:', error);
  }
};

// Process refund
const refundPayment = async (paymentId) => {
  try {
    const refund = await paymentsAPI.refundPayment(paymentId, {
      reason: 'Guest requested cancellation',
      amount: 750
    });
    console.log('Refund processed:', refund);
  } catch (error) {
    console.error('Failed to process refund:', error);
  }
};

// ============================================
// GALLERY API EXAMPLES
// ============================================

// Get gallery images
const fetchGalleryImages = async () => {
  try {
    const images = await galleryAPI.getAllGalleryImages();
    setGalleryImages(images);
  } catch (error) {
    console.error('Failed to fetch gallery images:', error);
  }
};

// Upload image
const uploadImage = async (file) => {
  try {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('title', 'Room Image');
    formData.append('description', 'Beautiful room view');
    
    const response = await galleryAPI.uploadGalleryImage(formData);
    setGalleryImages([...galleryImages, response]);
  } catch (error) {
    console.error('Failed to upload image:', error);
  }
};

// ============================================
// RATINGS API EXAMPLES
// ============================================

// Get all ratings
const fetchAllRatings = async () => {
  try {
    const ratings = await ratingsAPI.getAllRatings();
    setRatings(ratings);
  } catch (error) {
    console.error('Failed to fetch ratings:', error);
  }
};

// Submit rating
const submitRating = async (ratingData) => {
  try {
    const rating = await ratingsAPI.submitRating({
      bookingId: '123',
      guestId: '456',
      rating: 5,
      comment: 'Excellent service!',
      categories: {
        cleanliness: 5,
        service: 5,
        comfort: 4,
        value: 4
      }
    });
    setRatings([...ratings, rating]);
  } catch (error) {
    console.error('Failed to submit rating:', error);
  }
};

// ============================================
// LOCATION API EXAMPLES
// ============================================

// Get hotel location
const fetchHotelLocation = async () => {
  try {
    const location = await locationAPI.getHotelLocation();
    setLocation(location);
  } catch (error) {
    console.error('Failed to fetch location:', error);
  }
};

// ============================================
// TRANSPORT API EXAMPLES
// ============================================

// Get transport options
const fetchTransportOptions = async () => {
  try {
    const transports = await transportAPI.getAllTransports();
    setTransports(transports);
  } catch (error) {
    console.error('Failed to fetch transport:', error);
  }
};

// Book transport
const bookTransport = async (transportData) => {
  try {
    const booking = await transportAPI.bookTransport({
      guestId: '123',
      transportType: 'Airport Pickup',
      pickupTime: '2024-07-15 10:00',
      destination: 'Airport'
    });
    console.log('Transport booked:', booking);
  } catch (error) {
    console.error('Failed to book transport:', error);
  }
};

// ============================================
// PARKING API EXAMPLES
// ============================================

// Get parking spots
const fetchParkingSpots = async () => {
  try {
    const spots = await parkingAPI.getAllParkingSpots();
    setParkingSpots(spots);
  } catch (error) {
    console.error('Failed to fetch parking spots:', error);
  }
};

// Reserve parking
const reserveParking = async (parkingData) => {
  try {
    const reservation = await parkingAPI.reserveParkingSpot({
      guestId: '123',
      spotNumber: 'A-101',
      vehicleNumber: 'ABC-1234',
      checkInDate: '2024-07-15',
      checkOutDate: '2024-07-20'
    });
    console.log('Parking reserved:', reservation);
  } catch (error) {
    console.error('Failed to reserve parking:', error);
  }
};

// ============================================
// AMENITIES API EXAMPLES
// ============================================

// Get all amenities
const fetchAllAmenities = async () => {
  try {
    const amenities = await amenitiesAPI.getAllAmenities();
    setAmenities(amenities);
  } catch (error) {
    console.error('Failed to fetch amenities:', error);
  }
};

// Book amenity (Rooftop Club, Game Place, etc.)
const bookAmenity = async (amenityId) => {
  try {
    const booking = await amenitiesAPI.bookAmenity(amenityId, {
      guestId: '123',
      bookingDate: '2024-07-16',
      startTime: '18:00',
      endTime: '22:00',
      numberOfPeople: 4
    });
    console.log('Amenity booked:', booking);
  } catch (error) {
    console.error('Failed to book amenity:', error);
  }
};

// ============================================
// DASHBOARD API EXAMPLES
// ============================================

// Get dashboard statistics
const fetchDashboardStats = async () => {
  try {
    const stats = await dashboardAPI.getDashboardStats();
    setDashboardStats(stats);
  } catch (error) {
    console.error('Failed to fetch dashboard stats:', error);
  }
};

// Get occupancy rate
const fetchOccupancyRate = async () => {
  try {
    const occupancy = await dashboardAPI.getOccupancyRate();
    setOccupancyRate(occupancy);
  } catch (error) {
    console.error('Failed to fetch occupancy rate:', error);
  }
};

// Get revenue report
const fetchRevenueReport = async (startDate, endDate) => {
  try {
    const report = await dashboardAPI.getRevenueReport(startDate, endDate);
    setRevenueReport(report);
  } catch (error) {
    console.error('Failed to fetch revenue report:', error);
  }
};

// ============================================
// USAGE IN REACT COMPONENT EXAMPLE
// ============================================

/*
import React, { useState, useEffect } from 'react';
import { roomsAPI } from '../services/api';

function RoomsComponent() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadRooms = async () => {
      try {
        setLoading(true);
        const data = await roomsAPI.getAllRooms();
        setRooms(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadRooms();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {rooms.map(room => (
        <div key={room.id}>
          <h3>{room.number} - {room.type}</h3>
          <p>Status: {room.status}</p>
          <p>Price: ${room.price}</p>
        </div>
      ))}
    </div>
  );
}

export default RoomsComponent;
*/
