import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './pages/js/signup';
import Login from './pages/js/login';
import Homepage from './pages/js/homepage';
import LandingPage from './pages/js/landingpage';



function App() {


  return (
    <Router>

        <Routes>
        <Route path="/" element={<LandingPage/>} exact />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/homepage" element={<Homepage/>} />
  
        </Routes>
    </Router>
  );
};

export default App;
