import React, { useEffect, useState } from "react";
import "../css/userbookings.css";

function UserBookings() {
  const [IsLoggedIn, SetIsLoggedIn] = useState(false);
  const [userBookings, setuserBookings] = useState([]);
  const [userEmail, setuserEmail] = useState("");

  async function fetchData() {
    try {
      const token = localStorage.getItem("jwtToken");
      const response = await fetch("http://localhost:5000/api/private/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: token,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setuserEmail(data.email);
        SetIsLoggedIn(true);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchBookings() {
    try {
      const response = await fetch("http://localhost:5000/user/userbookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          useremail: userEmail,
        }),
      });
      const data = await response.json();
      // Ensure that data is an array before setting userBookings state
      if (Array.isArray(data.data)) {
        setuserBookings(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
    fetchBookings();
  }, [userEmail]);

  return (
    <div>
      {IsLoggedIn ? (
        <>
          {userBookings.length > 0 ? (
            userBookings.map((tour) => (
              <div key={tour._id}>
                <h2>{tour.tourname}</h2>
              </div>
            ))
          ) : (
            <h2>No bookings found.</h2>
          )}
        </>
      ) : (
        <h1>Invalid access, please login again</h1>
      )}
    </div>
  );
}

export default UserBookings;
