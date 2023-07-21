import React, { useState,useEffect } from 'react';
import '../css/addtour.css' // Import the CSS file

const initialFormState = {
  name: '',
  description: '',
  price: '',
  duration: '',
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
          alert('Tour package created successfully!')
          setFormData(initialFormState);
          window.location.href = '/adminpage'
        }

        else if (response.status === 400){
            alert('A tour with this name already exists')
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


