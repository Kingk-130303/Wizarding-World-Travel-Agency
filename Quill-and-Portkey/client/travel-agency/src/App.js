import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './pages/js/signup';
import Login from './pages/js/login';
import Userpage from './pages/js/userpage';
import LandingPage from './pages/js/landingpage';
import Adminpage from './pages/js/adminpage';



function App() {


  return (
    <Router>

        <Routes>
        <Route path="/" element={<LandingPage/>} exact />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/userpage" element={<Userpage/>} />
        <Route path="/adminpage" element={<Adminpage/>} />
  
        </Routes>
    </Router>
  );
};

export default App;
