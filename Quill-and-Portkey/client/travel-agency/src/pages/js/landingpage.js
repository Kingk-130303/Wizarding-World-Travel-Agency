// Homepage.js
import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import '../css/landingpage.css';




function LandingPage() {

const [NewUser,setNewUser] = useState(false)

  useEffect(() => {
    fetchLandingData();
    
  }, []);

  

  async function fetchLandingData() {
    try {
      const token = localStorage.getItem('jwtToken');
      const response = await fetch('http://localhost:5000/api/private/landinguser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: token
        }),
      });
      const data = await response.json()
      if (data.status === 308){
        window.location.href = '/adminpage'
      }
      else if (data.status === 309){
        window.location.href = '/userpage'
      }
      else if (data.status === 401){
        setNewUser(true);

      }
      else{
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/tours">Tours</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/signup">Sign Up</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
      </nav>

      <section>
        <h1>Welcome to Our Tour Packages</h1>
        <p>Explore our amazing tour packages and book your dream tour today.</p>
        <button className="book-now-button">Book Now</button>
      </section>
    </div>
  );
}

export default LandingPage;
