import React, { useEffect, useState } from "react";
import "../css/userpage.css";



function Userpage() {
  const [IsLoggedIn, SetIsLoggedIn] = useState(false);
  const [tourData, settourData] = useState([]);
  const [userEmail, setuserEmail] = useState([]);
  const [userName, setuserName] = useState([]);

  async function fetchData(SetIsLoggedIn,setuserEmail) {
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
      const data = await response.json()
      if (response.ok) {
        // console.log(data)
        setuserEmail(data.email)
        setuserName(data.name)
        SetIsLoggedIn(true);
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
  
    window.location.href = "/";
  };

  async function fetchTourData(settourData) {
    try {
      const response = await fetch("http://localhost:5000/admin/allTours", {
        method: "GET",
      });
      const data = await response.json();
      settourData(data.tour);
    } catch (error) {
      console.log(error);
    }
  }
  
  const handleBookNow = async (tourName) => {
    if (window.confirm(`Are you sure you want to book ${tourName}`)){
      try {
        const response = await fetch("http://localhost:5000/user/booktour", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            tourname: tourName,
            useremail: userEmail
          }),
        });
        const data = await response.json()
        // console.log(data.name)

        if (response.ok){
          alert(data.data)
        }

      } catch (error) {
        console.log(error)
      }
    }
  };

  const myBookings = () =>{
    window.location.href = '/userpage/userbookings'
  }

  useEffect(() => {
    fetchData(SetIsLoggedIn,setuserEmail,setuserName);
    fetchTourData(settourData);
  }, []);

  return (
    <div>
      {IsLoggedIn ? (
        <>
          <h1>Welcome to the {userName} user's home page</h1>
          <button onClick={()=>myBookings()}>My bookings</button>
          <br />
          <div className="tour-list">
      {tourData.map((tour) => (
        <div key={tour._id} className="tour-card">
          <h2>{tour.name}</h2>
          <p>{tour.description}</p>
          <p>Price: ${tour.price}</p>
          <p>Duration: {tour.duration}</p>
          <button onClick={() => handleBookNow(tour.name)}>Book Now</button>
        </div>
      ))}
    </div>
    <br />
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <h1>Invalid access, please login again</h1>
      )}
    </div>
  );
}

export default Userpage;
