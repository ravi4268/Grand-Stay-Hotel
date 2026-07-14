import React from "react";

function RoomCard({ room, toggleStatus, toggleCleanliness }) {
  const status = room.status || "Available";
  const cleanliness = room.cleanliness || "Clean";
  const amenities = Array.isArray(room.amenities) ? room.amenities : [];

  return (
    <div className="room-card">
      <h3>Room {room.number || "N/A"}</h3>

      <p><strong>Floor:</strong> {room.floor || "N/A"}</p>
      <p><strong>Type:</strong> {room.type || "Standard Room"}</p>
      <p><strong>Bed:</strong> {room.bedType || "Queen Size"}</p>
      <p><strong>Max Occupancy:</strong> {room.maxOccupancy || 2}</p>
      <p><strong>Price:</strong> ₹{room.price || 0}</p>

      <p className={`status ${status.toLowerCase().replace(" ", "-")}`}>
        {status}
      </p>

      <p className={`cleanliness ${cleanliness.toLowerCase()}`}>
        {cleanliness}
      </p>

      <div>
        <strong>Amenities:</strong>
        <p>{amenities.length > 0 ? amenities.join(", ") : "No amenities"}</p>
      </div>

      <button onClick={toggleStatus}>Change Status</button>
      <button onClick={toggleCleanliness}>Change Cleanliness</button>
    </div>
  );
}

export default RoomCard;