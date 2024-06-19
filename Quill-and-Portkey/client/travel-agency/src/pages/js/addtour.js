import React, { useState,useEffect } from 'react';
import '../css/addtour.css' // Import the CSS file
import { toast } from 'react-toastify';

const initialFormState = {
  name: '',
  description: '',
  itenary: '',
  image: '',
  price: '',
  date: '',
  capacity: '',
};

function NewTourPackageForm() {
  const [formData, setFormData] = useState(initialFormState);
  const [IsLoggedIn, SetIsLoggedIn] = useState(false);


  useEffect(() => {
    fetchData();
    
  }, []);

  async function fetchData() {
    try {
      const token = localStorage.getItem('jwtToken');
      const response = await fetch('http://localhost:5000/api/private/admin', {
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
    console.log(formData)
    event.preventDefault();
    try {
        const response = await fetch('http://localhost:5000/admin/addtour', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
  
        if (response.status === 200) {
          console.log('Tour package created successfully!');
          toast.success('Tour package created successfully!',
          {
            position: "top-center",
            autoClose : 3000
          })
          setFormData(initialFormState);
          setTimeout(() => {
            window.location.href = "/adminpage"; // Redirect back to the admin page after successful update
          }, 3000);
        }

        else if (response.status === 400){
            toast.error('A tour with this name already exists',{
              position: "top-center",
              autoClose : 5000
            })
        }
        
        else {
          console.error('Error creating tour package');
          window.location.href = '/adminpage'
        }
      } catch (error) {
        console.error('Error creating tour package:', error);
      }
  };

  return (
    <div>
    {IsLoggedIn ? (<>
      <div className="form-container">
<h2>Create New Tour Package</h2>
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
    Itenary:
    <textarea
      name="itenary"
      value={formData.itenary}
      onChange={handleChange}
      required
    ></textarea>
  </label>
  <label>
    ImageUrl:
    <input
      type="text"
      name="image"
      value={formData.image}
      onChange={handleChange}
      required
    />
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
    Date &nbsp;
    <input
      type="date"
      name="date"
      value={formData.date}
      onChange={handleChange}
      required
    />
  </label>
  <label>
  Capacity:
    <input
      type="number"
      name="capacity"
      value={formData.capacity}
      onChange={handleChange}
      required
    />
  </label>
  <button type="submit">Create Tour Package</button>
</form>
</div>
</>):(
     <h1>Invalid access, please login again</h1>
)}
</div>
   
  );
}

export default NewTourPackageForm;


