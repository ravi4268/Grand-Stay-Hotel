# Hotel Management API Services - Complete Guide

This document provides a complete guide to using the API services in the Hotel Management application.

## 📁 Files Overview

### 1. `api.js`
Main API service file containing all fetch methods organized by functionality:
- Authentication APIs
- Room Management APIs
- Booking APIs
- Contact Management APIs
- Payment Processing APIs
- Gallery APIs
- Rating/Review APIs
- Location APIs
- Transport APIs
- Parking APIs
- Amenities APIs
- Dashboard APIs

### 2. `apiConfig.js`
Configuration file for API settings:
- Base URL configuration
- Endpoint definitions
- HTTP methods and headers
- Status codes
- Error messages
- Cache settings
- Token management
- Retry logic

### 3. `API_USAGE_GUIDE.js`
Practical examples showing how to use each API:
- Step-by-step usage examples
- React component integration examples
- Error handling patterns

### 4. `API_REFERENCE.md`
Complete API documentation:
- Endpoint descriptions
- Request/response formats
- cURL command examples
- Error handling information

### 5. `.env.example`
Environment variable template for configuration

---

## 🚀 Getting Started

### Step 1: Setup Environment Variables

Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Update the values in `.env.local`:
```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_TIMEOUT=30000
REACT_APP_DEBUG=false
```

### Step 2: Import API Services

In your React components:
```javascript
import { 
  authAPI, 
  roomsAPI, 
  bookingsAPI, 
  // ... other APIs
} from '../services/api';
```

### Step 3: Use API Methods

```javascript
// Example: Fetch rooms
const fetchRooms = async () => {
  try {
    const rooms = await roomsAPI.getAllRooms();
    console.log(rooms);
  } catch (error) {
    console.error('Error fetching rooms:', error);
  }
};
```

---

## 🔐 Authentication Flow

### 1. Login
```javascript
const handleLogin = async (username, password) => {
  try {
    const response = await authAPI.login(username, password);
    localStorage.setItem('auth_token', response.token);
    // Redirect to dashboard
  } catch (error) {
    console.error('Login failed:', error);
  }
};
```

### 2. Token Validation
The API automatically includes the token from localStorage in all requests:
```javascript
// Token is automatically added to Authorization header
// Authorization: Bearer {token}
```

### 3. Logout
```javascript
const handleLogout = async () => {
  try {
    await authAPI.logout();
    localStorage.removeItem('auth_token');
    // Redirect to login
  } catch (error) {
    console.error('Logout failed:', error);
  }
};
```

---

## 🏨 Rooms Management

### Create a New Room
```javascript
const addRoom = async () => {
  try {
    const newRoom = await roomsAPI.createRoom({
      number: '201',
      floor: '2nd Floor',
      type: 'Premium Suite',
      bedType: 'King Size',
      maxOccupancy: 4,
      price: 200,
      status: 'Available',
      cleanliness: 'Clean',
      amenities: ['WiFi', 'AC', 'Mini Bar', 'Balcony']
    });
    console.log('Room created:', newRoom);
  } catch (error) {
    console.error('Failed to create room:', error);
  }
};
```

### Update Room Status
```javascript
const updateStatus = async (roomId, newStatus) => {
  try {
    const updated = await roomsAPI.updateRoomStatus(roomId, newStatus);
    console.log('Room status updated:', updated);
  } catch (error) {
    console.error('Failed to update status:', error);
  }
};
```

### Get Available Rooms
```javascript
const getAvailableRooms = async () => {
  try {
    const allRooms = await roomsAPI.getAllRooms();
    const available = allRooms.filter(room => room.status === 'Available');
    return available;
  } catch (error) {
    console.error('Failed to fetch available rooms:', error);
  }
};
```

---

## 📅 Bookings Management

### Create a Booking
```javascript
const makeBooking = async (bookingDetails) => {
  try {
    const booking = await bookingsAPI.createBooking({
      guestId: '123',
      roomId: '101',
      checkInDate: '2024-07-20',
      checkOutDate: '2024-07-25',
      numberOfGuests: 2,
      totalPrice: 1000,
      status: 'Confirmed'
    });
    console.log('Booking created:', booking);
  } catch (error) {
    console.error('Failed to create booking:', error);
  }
};
```

### Cancel a Booking
```javascript
const cancelBooking = async (bookingId) => {
  try {
    await bookingsAPI.cancelBooking(bookingId);
    console.log('Booking cancelled');
  } catch (error) {
    console.error('Failed to cancel booking:', error);
  }
};
```

---

## 💳 Payment Processing

### Process Payment
```javascript
const processPayment = async (paymentInfo) => {
  try {
    const payment = await paymentsAPI.processPayment({
      bookingId: 'BOOKING123',
      amount: 1000,
      paymentMethod: 'credit_card',
      cardDetails: {
        number: '**** **** **** 1234',
        expiryDate: '12/25',
        cvv: '***'
      }
    });
    console.log('Payment processed:', payment);
  } catch (error) {
    console.error('Payment failed:', error);
  }
};
```

### Process Refund
```javascript
const processRefund = async (paymentId) => {
  try {
    const refund = await paymentsAPI.refundPayment(paymentId, {
      reason: 'Guest request',
      amount: 1000
    });
    console.log('Refund processed:', refund);
  } catch (error) {
    console.error('Refund failed:', error);
  }
};
```

---

## 🖼️ Gallery Management

### Upload Image
```javascript
const uploadImage = async (file) => {
  try {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('title', 'Deluxe Room');
    formData.append('description', 'Beautiful deluxe room with balcony');
    
    const response = await galleryAPI.uploadGalleryImage(formData);
    console.log('Image uploaded:', response);
  } catch (error) {
    console.error('Upload failed:', error);
  }
};
```

### Get Gallery Images
```javascript
const fetchGallery = async () => {
  try {
    const images = await galleryAPI.getAllGalleryImages();
    console.log('Gallery images:', images);
  } catch (error) {
    console.error('Failed to fetch images:', error);
  }
};
```

---

## ⭐ Ratings and Reviews

### Submit Rating
```javascript
const submitRating = async (guestId, bookingId) => {
  try {
    const rating = await ratingsAPI.submitRating({
      bookingId: bookingId,
      guestId: guestId,
      rating: 5,
      comment: 'Excellent service and hospitality!',
      categories: {
        cleanliness: 5,
        service: 5,
        comfort: 4,
        value: 4
      }
    });
    console.log('Rating submitted:', rating);
  } catch (error) {
    console.error('Failed to submit rating:', error);
  }
};
```

---

## 🎊 Amenities Booking

### Book Amenity (Rooftop Club, Game Place, etc.)
```javascript
const bookAmenity = async (amenityId, guestId) => {
  try {
    const booking = await amenitiesAPI.bookAmenity(amenityId, {
      guestId: guestId,
      bookingDate: '2024-07-21',
      startTime: '18:00',
      endTime: '22:00',
      numberOfPeople: 4
    });
    console.log('Amenity booked:', booking);
  } catch (error) {
    console.error('Failed to book amenity:', error);
  }
};
```

---

## 🚗 Transport & Parking

### Book Transport
```javascript
const bookTransport = async (guestId) => {
  try {
    const booking = await transportAPI.bookTransport({
      guestId: guestId,
      transportType: 'Airport Pickup',
      pickupTime: '2024-07-20 10:00',
      destination: 'John F. Kennedy Airport'
    });
    console.log('Transport booked:', booking);
  } catch (error) {
    console.error('Failed to book transport:', error);
  }
};
```

### Reserve Parking
```javascript
const reserveParking = async (guestId) => {
  try {
    const reservation = await parkingAPI.reserveParkingSpot({
      guestId: guestId,
      spotNumber: 'A-101',
      vehicleNumber: 'ABC-1234',
      checkInDate: '2024-07-20',
      checkOutDate: '2024-07-25'
    });
    console.log('Parking reserved:', reservation);
  } catch (error) {
    console.error('Failed to reserve parking:', error);
  }
};
```

---

## 📊 Dashboard Statistics

### Get Dashboard Stats
```javascript
const fetchDashboardStats = async () => {
  try {
    const stats = await dashboardAPI.getDashboardStats();
    console.log('Stats:', stats);
    // stats.totalRooms
    // stats.occupiedRooms
    // stats.availableRooms
    // stats.totalBookings
    // stats.totalRevenue
  } catch (error) {
    console.error('Failed to fetch stats:', error);
  }
};
```

### Get Occupancy Rate
```javascript
const fetchOccupancy = async () => {
  try {
    const occupancy = await dashboardAPI.getOccupancyRate();
    console.log(`Occupancy: ${occupancy.occupancyRate}%`);
  } catch (error) {
    console.error('Failed to fetch occupancy:', error);
  }
};
```

### Get Revenue Report
```javascript
const fetchRevenueReport = async () => {
  try {
    const report = await dashboardAPI.getRevenueReport('2024-07-01', '2024-07-31');
    console.log('Revenue report:', report);
  } catch (error) {
    console.error('Failed to fetch report:', error);
  }
};
```

---

## 🛡️ Error Handling

All API methods include try-catch error handling. Errors are logged and thrown:

```javascript
// Custom error handling
try {
  const rooms = await roomsAPI.getAllRooms();
} catch (error) {
  if (error.status === 401) {
    // Unauthorized - redirect to login
    localStorage.removeItem('auth_token');
    window.location.href = '/login';
  } else if (error.status === 404) {
    // Not found
    console.error('Resource not found');
  } else {
    // Other errors
    console.error('An error occurred:', error.message);
  }
}
```

---

## 🔄 React Hooks Integration

### useEffect Hook for Data Fetching
```javascript
import { useEffect, useState } from 'react';
import { roomsAPI } from '../services/api';

function RoomsPage() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setLoading(true);
        const data = await roomsAPI.getAllRooms();
        setRooms(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error('Failed to fetch rooms:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {rooms.map(room => (
        <div key={room.id}>
          <h3>{room.number}</h3>
          <p>{room.type}</p>
          <p>Status: {room.status}</p>
        </div>
      ))}
    </div>
  );
}
```

---

## 🧪 Testing API Calls

### Using Postman or Insomnia
1. Set base URL: `http://localhost:5000/api`
2. Add authorization header: `Authorization: Bearer {token}`
3. Test endpoints using provided cURL examples

### Using Browser Console
```javascript
// Login first
await authAPI.login('admin', 'admin123');

// Then fetch data
const rooms = await roomsAPI.getAllRooms();
console.log(rooms);
```

---

## 📝 Tips & Best Practices

1. **Always handle errors** - Use try-catch blocks
2. **Store token safely** - Use localStorage or sessionStorage
3. **Set timeouts** - Configure REACT_APP_TIMEOUT
4. **Use environment variables** - Don't hardcode API URLs
5. **Implement loading states** - Show user feedback while fetching
6. **Cache responses** - For frequently accessed data
7. **Validate input** - Before sending to API
8. **Log errors** - For debugging purposes
9. **Test thoroughly** - Test all API endpoints
10. **Document API usage** - Keep this guide updated

---

## 🐛 Troubleshooting

### Token Expired
- Check token expiration time in `apiConfig.js`
- Implement token refresh logic if needed

### CORS Errors
- Ensure backend has proper CORS headers
- Check API base URL in `.env.local`

### Timeout Errors
- Increase `REACT_APP_TIMEOUT` value
- Check backend server status

### Authentication Errors
- Verify credentials
- Check token format in localStorage
- Ensure token is included in headers

---

## 📚 Additional Resources

- [Complete API Reference](./API_REFERENCE.md)
- [Usage Examples](./API_USAGE_GUIDE.js)
- [Configuration File](./apiConfig.js)
- [Main API Service](./api.js)

---

## ✅ Checklist for Integration

- [ ] Copy `.env.example` to `.env.local`
- [ ] Update API base URL in `.env.local`
- [ ] Import API services in components
- [ ] Implement authentication logic
- [ ] Add error handling
- [ ] Test all endpoints
- [ ] Setup loading states
- [ ] Configure retry logic
- [ ] Document custom changes
- [ ] Deploy with production API URL

---

**Last Updated:** July 2024  
**API Version:** v1  
**Status:** Complete and Ready for Integration
