import React, { useEffect, useState } from "react";
import "../css/userpage.css";



function Userpage() {
  const [IsLoggedIn, SetIsLoggedIn] = useState(false);
  const [tourData, settourData] = useState([]);
  const [userEmail, setuserEmail] = useState([]);

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
        
        setuserEmail(data.email)
        SetIsLoggedIn(true);
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
  
    window.location.href = "/login";
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
        console.log(data)

        if (response.ok){
          alert(data.data)
        }

      } catch (error) {
        console.log(error)
      }
    }
  };

  useEffect(() => {
    fetchData(SetIsLoggedIn,setuserEmail);
    fetchTourData(settourData);
  }, []);

  return (
    <div>
      {IsLoggedIn ? (
        <>
          <h1>Welcome to the user's home page</h1>
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
