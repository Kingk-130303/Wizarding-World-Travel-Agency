import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../css/landingpage.css';
import travelVideo2 from '../assets/travelVideo2.mp4';



function LandingPage() {
  const [NewUser, setNewUser] = useState(false);
  const [menuActive, setMenuActive] = useState(false);

  useEffect(() => {
    fetchLandingData();
    fetchTourData();
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
      const data = await response.json();
      if (data.status === 308){
        window.location.href = '/adminpage';
      } else if (data.status === 309){
        window.location.href = '/userpage';
      } else if (data.status === 401){
        setNewUser(true);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }


  const handleMenuToggle = (section) => {
    setMenuActive((prevMenuActive) => !prevMenuActive);
  
    if (section === 'tours') {
      const toursSection = document.getElementById('tours');
      const toursPosition = toursSection.getBoundingClientRect().top;
      const offsetPosition = toursPosition +1; // Adjust the offset as needed
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  
    if (section === 'about-us') {
      const aboutUsSection = document.getElementById('about-us');
      aboutUsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    if (section === 'showcase'){
      const showcaseSection = document.getElementById('showcase');
      showcaseSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

    }
  };
  

const [TourData, setTourData] = useState(null);


async function fetchTourData() {
  try {
    const response = await fetch('http://localhost:5000/api/private/tourdata', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    setTourData(data.tours);
    // console.log(TourData.image)

  } catch (error) {
    console.log(error);
  }
}

const [currentSlide, setCurrentSlide] = useState(0);

const nextSlide = () => {
  setCurrentSlide((prevSlide) => (prevSlide === TourData.length - 1 ? 0 : prevSlide + 1));
};

const prevSlide = () => {
  setCurrentSlide((prevSlide) => (prevSlide === 0 ? TourData.length - 1 : prevSlide - 1));
};


  const formatDate = (dateStr) => {
    const dateObj = new Date(dateStr);
    return `${dateObj.getDate()}-${(dateObj.getMonth() + 1).toString().padStart(2, "0")}-${dateObj.getFullYear()}`;
  };

  async function handleBookNow(){
    // console.log("book now")
    window.location.href = "/signup";
  }


return (
  <div>
    <section id = 'showcase' className={`showcase ${menuActive ? 'active' : ''}`}>
      <header>
        <h2 className="logo">
          <div className="animate-bounce-fade">Quill &amp; Portkey</div>
        </h2>
        <div
          className={`toggle ${menuActive ? 'active' : ''}`}
          onClick={handleMenuToggle}
          style={{ backgroundColor: 'brown' }}
        ></div>
      </header>
      <video src={travelVideo2} muted autoPlay></video>
      <div className="overlay"></div>
    
      <div className="text">
        <h4 className="animate-fade-in one-liner">Embark on a magical journey to the enchanting world of Harry Potter on our tours !</h4>
        <button className="animate-fade-in tour-btn" onClick={() => document.getElementById('tours').scrollIntoView({ behavior: 'smooth', block: 'start' })}>
  Explore Tours
</button>

      </div>
    </section>
    <div className={`menu ${menuActive ? 'active' : ''}`}>
      <ul>
        <li>
          <a href="signup" className="animate-fade-in">
            Sign Up
          </a>
        </li>
        <li>
          <a href="login" className="animate-fade-in">
            Log In
          </a>
        </li>
        <li>
          <a className="animate-fade-in" onClick={() => handleMenuToggle('tours')}>
            Tours
          </a>
        </li>
        <li>
          <a  className="animate-fade-in" onClick={() => handleMenuToggle('about-us')}>
            About Us
          </a>
        </li>
      </ul>
    </div>

    <section id="tours" className="tours-section">
  {TourData ? (
    TourData.length === 0 ? (
      <div className="no-tour-message">No tours yet.</div>
    ) : (
      <div className="slider">
        {TourData.map((tour, index) => (
          <div
            className={index === currentSlide ? 'slide active' : 'slide'}
            key={index}
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${tour.image})`,
              backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
              
            }}
          >
            <div className="slide-content">
              <h2>{tour.name}</h2>
              <button className="book-now" onClick={()=> handleBookNow()}>Book Now</button>
              

              <br />
              <p> Cost : {tour.price} Galleons</p>
             
              <p>Date: {formatDate(tour.date)}</p>
              <p>Description <br /><br />{tour.description}</p>
              {/* <p>{tour.itenary}</p> */}
             

            </div> 
            <button id='back-button' onClick={() => document.getElementById('showcase').scrollIntoView({ behavior: 'smooth', block: 'start' })}>Home</button>

          </div>
        ))}
        {/* <button className="home" onClick={() => handleMenuToggle('showcase')}>Home</button> */}
        <button className="prev-btn" onClick={prevSlide}>
        &#8592;
        </button>
        <button className="next-btn" onClick={nextSlide}>
        &#8594;
        </button>
      </div>
    )
  ) : (
    <div>Loading...</div>
  )}
</section>


<section id="about-us" className="about-us-section">

  <div className="about-us-content">
  {/* <button className="home" onClick={() => handleMenuToggle('showcase')}>Home</button> */}
  <button id='home-button' onClick={() => document.getElementById('showcase').scrollIntoView({ behavior: 'smooth', block: 'start' })}>Home</button>

    <h2>About Us</h2>

    <p>Welcome to Quill & Portkey, where magic meets adventure! Embark on a journey through the wizarding world with us, as we unveil the enchanting landscapes and mystical tales inspired by J.K. Rowling's Harry Potter series. At Quill & Portkey, we're passionate about creating immersive experiences that transport you to the heart of Hogwarts, Diagon Alley, and beyond.

Our team of dedicated wizards and witches are here to curate every detail of your magical adventure. From the moment you step into our world, expect to be enchanted by our commitment to authenticity and quality. Whether you're a first-time visitor or a seasoned witch or wizard, our tours are designed to captivate, educate, and ignite your imagination.</p>
  </div>
  
</section>

  </div>
);

}

export default LandingPage;
