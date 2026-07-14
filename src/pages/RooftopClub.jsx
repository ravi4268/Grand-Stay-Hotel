import React, { useEffect, useState } from "react";
import "./RooftopClub.css";

const API_URL = "http://localhost:3001/api/rooftop";

function RooftopClub() {

  const [club, setClub] = useState([]);

  useEffect(() => {
    fetchClub();
  }, []);

  const fetchClub = async () => {
    try {
      const res = await fetch(API_URL);
      const result = await res.json();

      if(result.success){
        setClub(result.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="rooftop-container">

      <h1>🌃 Rooftop Disco Club</h1>

      <div className="club-grid">

        {club.map((item)=>(
          <div className="club-card" key={item._id}>

            <h2>{item.club_name}</h2>

            <p>
              <strong>Opening :</strong> {item.opening_time}
            </p>

            <p>
              <strong>Closing :</strong> {item.closing_time}
            </p>

            <p>
              <strong>Entry Fee :</strong> ₹{item.entry_fee}
            </p>

          </div>
        ))}

      </div>

    </div>
  );
}

export default RooftopClub;