import React, { useEffect, useState } from "react";

import "../css/updatetour.css"; // Import the CSS file
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const initialFormState = {
  name: "",
  description: "",
  price: "",
  duration: "",
};

function UpdateTourPackageForm() {
  const tourName = localStorage.getItem("tourName");
  const [formData, setFormData] = useState(initialFormState);
  const [IsLoggedIn, SetIsLoggedIn] = useState(false);

  useEffect(() => {
    fetchData();
    // Fetch the old values for the tour with the specified name
    fetchTourData();
  }, []);

  const fetchTourData = async () => {
    try {
      const response = await fetch(`https://wizardingworldtravels.vercel.app/admin/gettour`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: tourName,
          }),
      });
      const data = await response.json();
      // Set the form data with the old values
      setFormData({
        name: data.tour.name,
        description: data.tour.description,
        price: data.tour.price,
        duration: data.tour.duration,
      });
    } catch (error) {
      console.log(error);
    }
  };

  
async function fetchData() {
    try {
      const token = localStorage.getItem('jwtToken');
      const response = await fetch('https://wizardingworldtravels.vercel.app/api/private/admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: token
        }),
      });
      const data = await response.json()
      // console.log(data)
      if (response.ok) {
        SetIsLoggedIn(true);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`https://wizardingworldtravels.vercel.app/admin/updatetour`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({...formData, tourName }), // Pass tour name in the request body
      });

      if (response.status === 200) {
        console.log("Tour package updated successfully!");
         toast.success("Tour package updated successfully!",{
          position: "top-center",
          autoClose: 5000
        });
        setTimeout(() => {
          window.location.href = "/adminpage"; // Redirect back to the admin page after successful update
        }, 5000);// Redirect back to the admin page after successful update
      } else {
        console.error("Error updating tour package");
        window.location.href = `/adminpage/update/${tourName}`; // Stay on the update page in case of an error
      }
    } catch (error) {
      console.error("Error updating tour package:", error);
    }
  };

  return (
    <div>
        {IsLoggedIn ? (<><div className="form-container">
      <h2>Update Tour Package</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </label>
        <label>
          Price:
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Duration:
          <input
            type="text"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Update Tour Package</button>
      </form>
    </div></>):(
         <h1>Invalid access, please login again</h1>
    )}
    </div>
    
  );
}

export default UpdateTourPackageForm;







