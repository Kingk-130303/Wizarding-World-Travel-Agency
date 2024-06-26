import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './pages/js/signup';
import Login from './pages/js/login';
import Userpage from './pages/js/userpage';
import LandingPage from './pages/js/landingpage';
import Adminpage from './pages/js/adminpage';
import Addtour from './pages/js/addtour';
import UserBookings from './pages/js/userBookings';
import UpdateTourPackageForm from './pages/js/updatetour';
import TourRegistrations from './pages/js/tourreg';







function App() {


  return (
    <Router>

        <Routes>
        <Route path="/" element={<LandingPage/>} exact />
        <Route path="/signup" element={<SignUp/>} />
   
        <Route path="/login" element={<Login/>} />
        <Route path="/userpage" element={<Userpage/>} />
        <Route path="/userpage/userbookings" element={<UserBookings/>} />
        <Route path="/adminpage" element={<Adminpage/>} />
        <Route path="/adminpage/addtour" element={<Addtour/>} />
        <Route path="/adminpage/updatetour" element={<UpdateTourPackageForm/>} />
        <Route path="/adminpage/tourreg" element={<TourRegistrations/>} />
  
        </Routes>
    </Router>
  );
};

export default App;
