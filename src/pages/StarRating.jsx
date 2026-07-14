import React, { useEffect, useState } from "react";
import "./StarRating.css";
import sani from "../assests/sani.jpg"

const API_URL = "http://localhost:3001/api/rating";

function StarRating() {

  const [hotel, setHotel] = useState(null);
  const [rating, setRating] = useState(5);
  const [booked, setBooked] = useState(false);


  useEffect(() => {

    getHotel();

  }, []);



  const getHotel = async () => {

    try {

      const res = await fetch(API_URL);

      const result = await res.json();

      console.log(result);


      if (result.success && result.data.length > 0) {

        setHotel(result.data[0]);

        setRating(result.data[0].rating);

      }


    } catch (error) {

      console.log(error);

    }

  };



  const handleBooking = () => {

    setBooked(true);

    alert("Booking Confirmed! Thank you for choosing GS Hotel");

  };



  if (!hotel) {

    return <h2>Loading Hotel...</h2>;

  }



  return (

    <div className="hotel-rating-container">


      <div className="hotel-card">

<img
  src={sani}
  alt="GS Hotel"
  className="hotel-image"
/>



        <div className="hotel-content">


          <h2>
            🏨 {hotel.hotelName}
          </h2>


          <p>
            {hotel.review}
          </p>



          <div className="stars">

            {
              [1,2,3,4,5].map((star)=>(

                <span

                  key={star}

                  onClick={()=>setRating(star)}

                  className={
                    star <= rating
                    ? "star active"
                    : "star"
                  }

                >

                ★

                </span>


              ))
            }

          </div>



          <h3>
            {rating} / 5 Rating
          </h3>



          <button

            className="book-btn"

            onClick={handleBooking}

          >

            {
              booked
              ? "Booked ✅"
              : "Book Now"
            }


          </button>



        </div>


      </div>


    </div>

  );

}


export default StarRating;