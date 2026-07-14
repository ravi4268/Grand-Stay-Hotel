import React, { useEffect, useState } from "react";
import "./HotelLocation.css";

function HotelLocation() {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/api/location")
      .then((res) => res.json())
      .then((result) => {
        if (result.success && result.data.length > 0) {
          setLocation(result.data[0]);
        }
      })
      .catch(console.error);
  }, []);

  if (!location) return <h2>Loading...</h2>;

  return (
    <div className="location-container">
      <div className="location-card">
        <h2>📍 {location.hotelName}</h2>

        <div className="address-box">
          <h4>Address</h4>
          <p>
            {location.address}
            <br />
            {location.city}
            <br />
            {location.state}, {location.country} - {location.pincode}
          </p>
        </div>

        <div className="map-container">
          <iframe
            title="Hotel Location"
            src={location.mapUrl}
            loading="lazy"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}

export default HotelLocation;