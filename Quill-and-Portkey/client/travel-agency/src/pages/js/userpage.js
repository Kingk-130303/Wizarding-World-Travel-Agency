import React, { useEffect, useState } from 'react';
import '../css/userpage.css';

async function fetchData(SetIsLoggedIn) {
  try {
    const token = localStorage.getItem('jwtToken');
    const response = await fetch('http://localhost:5000/api/private', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: token
      }),
    });
    if (response.ok) {
      SetIsLoggedIn(true);
    }
  } catch (error) {
    console.log(error);
  }
}

const handleLogout = () => {

  localStorage.removeItem('jwtToken');
 
  window.location.href = '/login';
};

function Userpage() {
  const [IsLoggedIn, SetIsLoggedIn] = useState(false);

  useEffect(() => {
    fetchData(SetIsLoggedIn);
  }, []);

  return (
    <div>
      {IsLoggedIn ? (
        <><h1>Welcome to the user's home page</h1>
        <button onClick={handleLogout}>Logout</button></>
        
      ) : (
        <h1>Invalid access, please login again</h1>
      )}
    </div>
  );
}

export default Userpage;
