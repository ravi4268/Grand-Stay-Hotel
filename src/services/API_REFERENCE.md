# API Reference Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
All endpoints (except login) require an Authorization header:
```
Authorization: Bearer {auth_token}
```

## 🔐 Authentication APIs

### Login
- **Method:** POST
- **Endpoint:** `/auth/login`
- **Body:** `{ username, password }`
- **Response:** `{ token, user }`

### Logout
- **Method:** POST
- **Endpoint:** `/auth/logout`
- **Response:** `{ message: "Logged out successfully" }`

### Validate Token
- **Method:** GET
- **Endpoint:** `/auth/validate`
- **Response:** `{ valid: true, user }`

---

## 🏨 Rooms APIs

### Get All Rooms
- **Method:** GET
- **Endpoint:** `/rooms`
- **Response:** `Array of room objects`

### Get Room by ID
- **Method:** GET
- **Endpoint:** `/rooms/{roomId}`
- **Response:** `Room object`

### Create Room
- **Method:** POST
- **Endpoint:** `/rooms`
- **Body:** `{ number, floor, type, bedType, maxOccupancy, price, status, cleanliness, amenities }`
- **Response:** `Created room object`

### Update Room
- **Method:** PUT
- **Endpoint:** `/rooms/{roomId}`
- **Body:** `{ ...updatedData }`
- **Response:** `Updated room object`

### Delete Room
- **Method:** DELETE
- **Endpoint:** `/rooms/{roomId}`
- **Response:** `{ message: "Room deleted successfully" }`

### Update Room Status
- **Method:** PATCH
- **Endpoint:** `/rooms/{roomId}/status`
- **Body:** `{ status: "Available|Booked|Occupied|Maintenance" }`
- **Response:** `Updated room object`

---

## 📅 Bookings APIs

### Get All Bookings
- **Method:** GET
- **Endpoint:** `/bookings`
- **Response:** `Array of booking objects`

### Get Booking by ID
- **Method:** GET
- **Endpoint:** `/bookings/{bookingId}`
- **Response:** `Booking object`

### Create Booking
- **Method:** POST
- **Endpoint:** `/bookings`
- **Body:** `{ guestId, roomId, checkInDate, checkOutDate, numberOfGuests, totalPrice, status }`
- **Response:** `Created booking object`

### Update Booking
- **Method:** PUT
- **Endpoint:** `/bookings/{bookingId}`
- **Body:** `{ ...updatedData }`
- **Response:** `Updated booking object`

### Cancel Booking
- **Method:** POST
- **Endpoint:** `/bookings/{bookingId}/cancel`
- **Response:** `{ message: "Booking cancelled successfully" }`

---

## 👥 Contacts APIs

### Get All Contacts
- **Method:** GET
- **Endpoint:** `/contacts`
- **Response:** `Array of contact objects`

### Get Contact by ID
- **Method:** GET
- **Endpoint:** `/contacts/{contactId}`
- **Response:** `Contact object`

### Create Contact
- **Method:** POST
- **Endpoint:** `/contacts`
- **Body:** `{ name, email, phone, address, city, country }`
- **Response:** `Created contact object`

### Update Contact
- **Method:** PUT
- **Endpoint:** `/contacts/{contactId}`
- **Body:** `{ ...updatedData }`
- **Response:** `Updated contact object`

### Delete Contact
- **Method:** DELETE
- **Endpoint:** `/contacts/{contactId}`
- **Response:** `{ message: "Contact deleted successfully" }`

---

## 💳 Payments APIs

### Get All Payments
- **Method:** GET
- **Endpoint:** `/payments`
- **Response:** `Array of payment objects`

### Get Payment by ID
- **Method:** GET
- **Endpoint:** `/payments/{paymentId}`
- **Response:** `Payment object`

### Process Payment
- **Method:** POST
- **Endpoint:** `/payments/process`
- **Body:** `{ bookingId, amount, paymentMethod, cardDetails }`
- **Response:** `{ paymentId, status: "success", transactionId }`

### Refund Payment
- **Method:** POST
- **Endpoint:** `/payments/{paymentId}/refund`
- **Body:** `{ reason, amount }`
- **Response:** `{ refundId, status: "success" }`

---

## 🖼️ Gallery APIs

### Get All Gallery Images
- **Method:** GET
- **Endpoint:** `/gallery`
- **Response:** `Array of image objects`

### Upload Gallery Image
- **Method:** POST
- **Endpoint:** `/gallery/upload`
- **Body:** `FormData { image, title, description }`
- **Response:** `{ imageId, imageUrl, title, description }`

### Delete Gallery Image
- **Method:** DELETE
- **Endpoint:** `/gallery/{imageId}`
- **Response:** `{ message: "Image deleted successfully" }`

---

## ⭐ Ratings APIs

### Get All Ratings
- **Method:** GET
- **Endpoint:** `/ratings`
- **Response:** `Array of rating objects`

### Submit Rating
- **Method:** POST
- **Endpoint:** `/ratings`
- **Body:** `{ bookingId, guestId, rating, comment, categories }`
- **Response:** `Created rating object`

### Get Ratings by Guest ID
- **Method:** GET
- **Endpoint:** `/ratings/guest/{guestId}`
- **Response:** `Array of guest's rating objects`

---

## 📍 Location APIs

### Get Hotel Location
- **Method:** GET
- **Endpoint:** `/location`
- **Response:** `{ latitude, longitude, address, city, country, googleMapsUrl }`

### Update Hotel Location
- **Method:** PUT
- **Endpoint:** `/location`
- **Body:** `{ latitude, longitude, address, city, country }`
- **Response:** `Updated location object`

---

## 🚗 Transport APIs

### Get All Transports
- **Method:** GET
- **Endpoint:** `/transport`
- **Response:** `Array of transport options`

### Book Transport
- **Method:** POST
- **Endpoint:** `/transport/book`
- **Body:** `{ guestId, transportType, pickupTime, destination, numberOfPassengers }`
- **Response:** `{ bookingId, status: "confirmed", estimatedCost }`

---

## 🅿️ Parking APIs

### Get All Parking Spots
- **Method:** GET
- **Endpoint:** `/parking`
- **Response:** `Array of parking spot objects`

### Reserve Parking Spot
- **Method:** POST
- **Endpoint:** `/parking/reserve`
- **Body:** `{ guestId, spotNumber, vehicleNumber, checkInDate, checkOutDate }`
- **Response:** `{ reservationId, spotNumber, status: "reserved" }`

### Release Parking Spot
- **Method:** POST
- **Endpoint:** `/parking/{spotId}/release`
- **Response:** `{ message: "Parking spot released successfully" }`

---

## 🎊 Amenities APIs

### Get All Amenities
- **Method:** GET
- **Endpoint:** `/amenities`
- **Response:** `Array of amenity objects (Rooftop Club, Game Place, Bathroom, etc.)`

### Get Amenity by ID
- **Method:** GET
- **Endpoint:** `/amenities/{amenityId}`
- **Response:** `Amenity object`

### Book Amenity
- **Method:** POST
- **Endpoint:** `/amenities/{amenityId}/book`
- **Body:** `{ guestId, bookingDate, startTime, endTime, numberOfPeople }`
- **Response:** `{ bookingId, status: "confirmed", cost }`

### Update Amenity
- **Method:** PUT
- **Endpoint:** `/amenities/{amenityId}`
- **Body:** `{ ...updatedData }`
- **Response:** `Updated amenity object`

---

## 📊 Dashboard APIs

### Get Dashboard Statistics
- **Method:** GET
- **Endpoint:** `/dashboard/stats`
- **Response:** `{ totalRooms, occupiedRooms, availableRooms, totalBookings, totalRevenue }`

### Get Occupancy Rate
- **Method:** GET
- **Endpoint:** `/dashboard/occupancy`
- **Response:** `{ occupancyRate: 75, totalRooms: 100, occupiedRooms: 75 }`

### Get Revenue Report
- **Method:** GET
- **Endpoint:** `/dashboard/revenue?startDate={date}&endDate={date}`
- **Response:** `{ totalRevenue, dailyRevenue: [], monthlyRevenue: [] }`

---

## Error Handling

All APIs return error objects in this format:
```json
{
  "error": true,
  "message": "Error description",
  "status": 400,
  "timestamp": "2024-07-02T10:30:00Z"
}
```

## Common Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized (Missing or invalid token)
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

---

## Environment Variables

Create a `.env` file in your project root:
```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_TIMEOUT=30000
```

---

## Example cURL Commands

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

### Get All Rooms
```bash
curl -X GET http://localhost:5000/api/rooms \
  -H "Authorization: Bearer your_token_here"
```

### Create Room
```bash
curl -X POST http://localhost:5000/api/rooms \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your_token_here" \
  -d '{
    "number": "103",
    "floor": "1st Floor",
    "type": "Deluxe Suite",
    "bedType": "King Size",
    "maxOccupancy": 3,
    "price": 150,
    "status": "Available",
    "cleanliness": "Clean",
    "amenities": ["WiFi", "AC", "Mini Bar"]
  }'
```

### Process Payment
```bash
curl -X POST http://localhost:5000/api/payments/process \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your_token_here" \
  -d '{
    "bookingId": "123",
    "amount": 750,
    "paymentMethod": "credit_card",
    "cardDetails": {"number": "****", "expiryDate": "12/25", "cvv": "***"}
  }'
```
