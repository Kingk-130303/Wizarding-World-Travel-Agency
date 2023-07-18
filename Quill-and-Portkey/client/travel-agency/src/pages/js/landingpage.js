// Homepage.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../css/landingpage.css';

function LandingPage() {
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
