import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './pages/js/homepage';
import SignUp from './pages/js/signup';
import Login from './pages/js/login';



function App() {


  return (
    <Router>

        <Routes>
        <Route path="/" element={<Homepage/>} exact />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/login" element={<Login/>} />
        </Routes>
    </Router>
  );
};

export default App;
