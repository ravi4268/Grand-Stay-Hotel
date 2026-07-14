import React, { useEffect, useRef, useState } from "react";

const API_URL = "http://localhost:3001/api/guests";

function PeoplePage() {
  const [bookings, setBookings] = useState([]);
  const didFetch = useRef(false);

  const [newGuest, setNewGuest] = useState({
    guest: "",
    room: "",
    checkIn: "",
    checkOut: "",
    status: "Booked",
  });

  const getGuests = async () => {
    try {
      const res = await fetch(API_URL);
      const result = await res.json();

      if (result.success === true) {
        setBookings(result.data);
      }
    } catch (error) {
      console.log("GET Error:", error);
    }
  };

  useEffect(() => {
    if (didFetch.current) return;
    didFetch.current = true;
    getGuests();
  }, []);

  const handleChange = (e) => {
    setNewGuest({
      ...newGuest,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddGuest = async (e) => {
    e.preventDefault();

    if (!newGuest.guest || !newGuest.room || !newGuest.checkIn || !newGuest.checkOut) {
      alert("Please fill all guest details.");
      return;
    }

  try {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newGuest),
  });

  console.log("Status:", res.status);

  if (!res.ok) {
    throw new Error(`HTTP Error: ${res.status}`);
  }

  const result = await res.json();

  if (result.success) {
    alert("Guest Added Successfully");

    setBookings((prev) => [result.data, ...prev]);

    setNewGuest({
      guest: "",
      room: "",
      checkIn: "",
      checkOut: "",
      status: "Booked",
    });
  }
} catch (error) {
  console.error(error);
}
   
  };

  const updateStatus = async (guestData) => {
    const nextStatus =
      guestData.status === "Booked"
        ? "Checked In"
        : guestData.status === "Checked In"
        ? "Checked Out"
        : "Booked";

    try {
      const res = await fetch(`${API_URL}/${guestData._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: nextStatus }),
      });

      const result = await res.json();

      if (result.success === true) {
        setBookings((prev) =>
          prev.map((item) => (item._id === guestData._id ? result.data : item))
        );
      }
    } catch (error) {
      console.log("PUT Error:", error);
    }
  };

  const deleteGuest = async (id) => {
    if (!window.confirm("Are you sure you want to delete this guest?")) return;

    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      const result = await res.json();

      if (result.success === true) {
        setBookings((prev) => prev.filter((item) => item._id !== id));
      }
    } catch (error) {
      console.log("DELETE Error:", error);
    }
  };

  const currentGuests = bookings.filter((booking) => booking.status === "Checked In");
  const upcomingGuests = bookings.filter((booking) => booking.status === "Booked");

  return (
    <div className="people-page">
      <div className="people-page-header">
        <div>
          <p className="section-label">Hotel occupancy</p>
          <h2>People staying in the hotel</h2>
        </div>
        <div className="people-summary-pill">{currentGuests.length} checked in</div>
      </div>

      <div className="people-summary-grid">
        <div className="people-summary-card">
          <h3>Currently staying</h3>
          <p>{currentGuests.length}</p>
        </div>

        <div className="people-summary-card">
          <h3>Upcoming arrivals</h3>
          <p>{upcomingGuests.length}</p>
        </div>

        <div className="people-summary-card">
          <h3>Total Guests</h3>
          <p>{bookings.length}</p>
        </div>
      </div>

      <section className="people-section">
        <div className="people-section-header">
          <h3>Add a new guest</h3>
          <span className="people-section-badge">Add Yourself</span>
        </div>

        <form className="people-form" onSubmit={handleAddGuest}>
          <div className="people-form-group">
            <label>Guest Name</label>
            <input
              name="guest"
              type="text"
              placeholder="Enter guest name"
              value={newGuest.guest}
              onChange={handleChange}
              required
            />
          </div>

          <div className="people-form-group">
            <label>Room Number</label>
            <input
              name="room"
              type="text"
              placeholder="e.g. 205"
              value={newGuest.room}
              onChange={handleChange}
              required
            />
          </div>

          <div className="people-form-group">
            <label>Check In</label>
            <input
              name="checkIn"
              type="date"
              value={newGuest.checkIn}
              onChange={handleChange}
              required
            />
          </div>

          <div className="people-form-group">
            <label>Check Out</label>
            <input
              name="checkOut"
              type="date"
              value={newGuest.checkOut}
              onChange={handleChange}
              required
            />
          </div>

          <div className="people-form-group">
            <label>Status</label>
            <select name="status" value={newGuest.status} onChange={handleChange}>
              <option value="Booked">Booked</option>
              <option value="Checked In">Checked In</option>
            </select>
          </div>

          <button type="submit" className="people-submit-btn">
            Add Guest
          </button>
        </form>
      </section>

      <section className="people-section">
        <div className="people-section-header">
          <h3>Guests List</h3>
          <span className="people-section-badge">Live Data</span>
        </div>

        {bookings.length === 0 ? (
          <div className="empty-state">No guests found.</div>
        ) : (
          <div className="people-grid">
            {bookings.map((guest) => (
              <article className="people-card" key={guest._id}>
                <div className="people-avatar">
                  {(guest.guest || "G").charAt(0).toUpperCase()}
                </div>

                <div className="people-info">
                  <h4>{guest.guest}</h4>
                  <p>Room {guest.room}</p>

                  <div className="people-meta">
                    <span>Check-in: {guest.checkIn}</span>
                    <span>Check-out: {guest.checkOut}</span>
                  </div>
                </div>

                <span className="people-status">{guest.status}</span>

                <div className="people-actions">
                  <button type="button" onClick={() => updateStatus(guest)}>
                    Next Status
                  </button>

                  <button
                    type="button"
                    onClick={() => deleteGuest(guest._id)}
                    className="people-delete-btn"
                  >
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default PeoplePage;