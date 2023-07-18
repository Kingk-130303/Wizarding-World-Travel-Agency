import React, { useEffect, useState } from 'react';
import '../css/homepage.css';

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
    const data = await response.json();
    console.log(data);
    if (response.ok) {
      SetIsLoggedIn(true);
    }
  } catch (error) {
    console.log(error);
  }
}

function Homepage() {
  const [IsLoggedIn, SetIsLoggedIn] = useState(false);

  useEffect(() => {
    fetchData(SetIsLoggedIn);
  }, []);

  return (
    <div>
      {IsLoggedIn ? (
        <h1>Welcome to the user's home page</h1>
      ) : (
        <h1>Invalid access, please login again</h1>
      )}
    </div>
  );
}

export default Homepage;
