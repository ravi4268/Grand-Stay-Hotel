import React, { useEffect, useRef, useState } from "react";

const API_URL = "http://localhost:3001/api/guests";

function Dashboard() {
  const [bookings, setBookings] = useState([]);
  const [editId, setEditId] = useState(null);
  const didFetch = useRef(false);

  const [newBooking, setNewBooking] = useState({
    guest: "",
    room: "",
    checkIn: "",
    checkOut: "",
    status: "Booked",
  });

  const getBookings = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();

      if (data.success === true) {
        setBookings(data.data);
      }
    } catch (error) {
      console.log("GET Error:", error);
    }
  };

  useEffect(() => {
    if (didFetch.current) return;
    didFetch.current = true;
    getBookings();
  }, []);

  const handleChange = (e) => {
    setNewBooking({
      ...newBooking,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = editId ? `${API_URL}/${editId}` : API_URL;
    const method = editId ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBooking),
      });

      const data = await res.json();

      if (data.success === true) {
        if (editId) {
          setBookings((prev) =>
            prev.map((item) => (item._id === editId ? data.data : item))
          );
        } else {
          setBookings((prev) => [data.data, ...prev]);
        }

        setNewBooking({
          guest: "",
          room: "",
          checkIn: "",
          checkOut: "",
          status: "Booked",
        });

        setEditId(null);
      }
    } catch (error) {
      console.log("POST/PUT Error:", error);
    }
  };

  const handleEdit = (booking) => {
    setEditId(booking._id);

    setNewBooking({
      guest: booking.guest || "",
      room: booking.room || "",
      checkIn: booking.checkIn || "",
      checkOut: booking.checkOut || "",
      status: booking.status || "Booked",
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete?")) return;

    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.success === true) {
        setBookings((prev) => prev.filter((item) => item._id !== id));
      }
    } catch (error) {
      console.log("DELETE Error:", error);
    }
  };

  return (
    <div className="dashboard-page">
      <h2>Dashboard Booking CRUD</h2>

      <div className="form-container">
        <h3>{editId ? "Update Booking" : "Add Booking"}</h3>

        <form onSubmit={handleSubmit} className="room-form">
          <input
            type="text"
            name="guest"
            placeholder="Guest Name"
            value={newBooking.guest}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="room"
            placeholder="Room No"
            value={newBooking.room}
            onChange={handleChange}
            required
          />

          <input
            type="date"
            name="checkIn"
            value={newBooking.checkIn}
            onChange={handleChange}
            required
          />

          <input
            type="date"
            name="checkOut"
            value={newBooking.checkOut}
            onChange={handleChange}
            required
          />

          <select
            name="status"
            value={newBooking.status}
            onChange={handleChange}
          >
            <option value="Booked">Booked</option>
            <option value="Checked In">Checked In</option>
            <option value="Checked Out">Checked Out</option>
          </select>

          <button type="submit">
            {editId ? "Update Booking" : "Add Booking"}
          </button>
        </form>
      </div>

      <div className="booking-card-container">
        <h3>Booking List</h3>

        {bookings.length === 0 ? (
          <div className="no-booking">No Booking Found</div>
        ) : (
          <div className="booking-grid">
            {bookings.map((booking) => (
              <div className="booking-card" key={booking._id}>
                <h3>{booking.guest || "No Guest"}</h3>

                <p>
                  <b>Room:</b> {booking.room || "N/A"}
                </p>
                <p>
                  <b>Check In:</b> {booking.checkIn || "N/A"}
                </p>
                <p>
                  <b>Check Out:</b> {booking.checkOut || "N/A"}
                </p>
                <p>
                  <b>Status:</b> {booking.status || "Booked"}
                </p>

                <div className="booking-actions">
                  <button onClick={() => handleEdit(booking)}>Edit</button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(booking._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;