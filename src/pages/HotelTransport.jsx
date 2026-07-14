import React, { useEffect, useState } from "react";
import "./HotelTransport.css";

const API_URL = "http://localhost:3001/api/pickdrop";

function HotelTransport() {

  const [transport, setTransport] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTransport();
  }, []);

  const fetchTransport = async () => {
    try {
      const res = await fetch(API_URL);
      const result = await res.json();

      console.log(result);

      if (result.success) {
        setTransport(result.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="transport-container">

      <h2>🚖 Hotel Pick & Drop Service</h2>

      <div className="places-grid">

        {transport.map((item) => (

          <div className="place-card" key={item._id}>

            <h3>{item.guest_name}</h3>

            <p><strong>Pickup:</strong> {item.pickup_location}</p>

            <p><strong>Drop:</strong> {item.drop_location}</p>

            <p><strong>Driver:</strong> {item.driver_name}</p>

          </div>

        ))}

      </div>

    </div>
  );
}

export default HotelTransport;