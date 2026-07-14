import React, { useEffect, useRef, useState } from "react";

const API_URL = "http://localhost:3001/api/rooms";

function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [filter, setFilter] = useState("All");
  const didFetch = useRef(false);

  const [newRoom, setNewRoom] = useState({
    number: "",
    floor: "1st Floor",
    type: "Standard Room",
    bedType: "Queen Size",
    maxOccupancy: 2,
    price: "",
    status: "Available",
    cleanliness: "Clean",
    amenities: "",
  });

  const getRooms = async () => {
    try {
      const res = await fetch(API_URL);
      const result = await res.json();

      if (result.success === true) {
        setRooms(result.data);
      }
    } catch (error) {
      console.log("GET Error:", error);
    }
  };

  useEffect(() => {
    if (didFetch.current) return;
    didFetch.current = true;
    getRooms();
  }, []);

  const handleChange = (e) => {
    setNewRoom({
      ...newRoom,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddRoom = async (e) => {
    e.preventDefault();

    const roomData = {
      ...newRoom,
      price: Number(newRoom.price),
      maxOccupancy: Number(newRoom.maxOccupancy),
      amenities: newRoom.amenities
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
    };

    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(roomData),
    });

    const result = await res.json();

    if (result.success === true) {
      setRooms((prev) => [result.data, ...prev]);

      setNewRoom({
        number: "",
        floor: "1st Floor",
        type: "Standard Room",
        bedType: "Queen Size",
        maxOccupancy: 2,
        price: "",
        status: "Available",
        cleanliness: "Clean",
        amenities: "",
      });
    }
  };

  const toggleStatus = async (room) => {
    const statusOrder = ["Available", "Booked", "Occupied", "Maintenance"];
    const currentIndex = statusOrder.indexOf(room.status || "Available");
    const nextStatus = statusOrder[(currentIndex + 1) % statusOrder.length];

    const res = await fetch(`${API_URL}/${room._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: nextStatus }),
    });

    const result = await res.json();

    if (result.success === true) {
      setRooms((prev) =>
        prev.map((item) => (item._id === room._id ? result.data : item))
      );
    }
  };

  const toggleCleanliness = async (room) => {
    const current = room.cleanliness || "Clean";
    const nextClean =
      current === "Clean" ? "Dirty" : current === "Dirty" ? "Inspected" : "Clean";

    const res = await fetch(`${API_URL}/${room._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cleanliness: nextClean }),
    });

    const result = await res.json();

    if (result.success === true) {
      setRooms((prev) =>
        prev.map((item) => (item._id === room._id ? result.data : item))
      );
    }
  };

  const deleteRoom = async (id) => {
    if (!window.confirm("Are you sure you want to delete room?")) return;

    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    const result = await res.json();

    if (result.success === true) {
      setRooms((prev) => prev.filter((room) => room._id !== id));
    }
  };

  const filteredRooms = rooms.filter(
    (room) => filter === "All" || room.status === filter
  );

  return (
    <div className="rooms-page">
      <div className="form-container">
        <h3>➕ Add New Room</h3>

        <form onSubmit={handleAddRoom} className="room-form">
          <input
            name="number"
            type="text"
            placeholder="Room Number"
            value={newRoom.number}
            onChange={handleChange}
            required
          />

          <input
            name="price"
            type="number"
            placeholder="Price per Night"
            value={newRoom.price}
            onChange={handleChange}
            required
          />

          <select name="floor" value={newRoom.floor} onChange={handleChange}>
            <option value="1st Floor">1st Floor</option>
            <option value="2nd Floor">2nd Floor</option>
            <option value="3rd Floor">3rd Floor</option>
            <option value="4th Floor">4th Floor</option>
            <option value="5th Floor">5th Floor</option>
            <option value="6th Floor">6th Floor</option>
            <option value="7th Floor">7th Floor</option>
          </select>

          <select name="type" value={newRoom.type} onChange={handleChange}>
            <option value="Standard Room">Standard Room</option>
            <option value="Deluxe Suite">Deluxe Suite</option>
            <option value="Penthouse">Penthouse</option>
            <option value="Super Deluxe">Super Deluxe</option>
          </select>

          <select name="bedType" value={newRoom.bedType} onChange={handleChange}>
            <option value="Twin Beds">Twin Beds</option>
            <option value="Queen Size">Queen Size</option>
            <option value="King Size">King Size</option>
            <option value="Suit Room">Suit Room</option>
            <option value="Penthouse">Penthouse</option>
          </select>

          <input
            name="maxOccupancy"
            type="number"
            placeholder="Max Occupants"
            value={newRoom.maxOccupancy}
            onChange={handleChange}
          />

          <input
            name="amenities"
            type="text"
            placeholder="Amenities: WiFi, AC"
            value={newRoom.amenities}
            onChange={handleChange}
          />

          <button type="submit" className="submit-btn">
            Save Room
          </button>
        </form>
      </div>

      <div className="rooms-header">
        <h2>Room Fleet Directory</h2>

        <div className="filter-container">
          <label>Filter Status: </label>

          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="All">All Statuses</option>
            <option value="Available">Available</option>
            <option value="Booked">Booked</option>
            <option value="Occupied">Occupied</option>
            <option value="Maintenance">Maintenance</option>
          </select>
        </div>
      </div>

      <div className="rooms-grid">
        {filteredRooms.length === 0 ? (
          <p className="no-records">No rooms found.</p>
        ) : (
          filteredRooms.map((room) => (
            <div className="room-info-card" key={room._id}>
              <h2>Room No: {room.number || "N/A"}</h2>
              <h3>Floor: {room.floor || "N/A"}</h3>

              <p><b>Type:</b> {room.type || "Standard Room"}</p>
              <p><b>Bed:</b> {room.bedType || "Queen Size"}</p>
              <p><b>Max Occupancy:</b> {room.maxOccupancy || 2}</p>
              <p><b>Price:</b> ₹{room.price || 0}</p>
              <p><b>Status:</b> {room.status || "Available"}</p>
              <p><b>Cleanliness:</b> {room.cleanliness || "Clean"}</p>
              <p>
                <b>Amenities:</b>{" "}
                {Array.isArray(room.amenities) && room.amenities.length > 0
                  ? room.amenities.join(", ")
                  : "No amenities"}
              </p>

              <div className="room-actions">
                <button onClick={() => toggleStatus(room)}>Change Status</button>
                <button onClick={() => toggleCleanliness(room)}>Cleanliness</button>
                <button
                  onClick={() => deleteRoom(room._id)}
                  className="delete-room-btn"
                >
                  Delete Room
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Rooms;