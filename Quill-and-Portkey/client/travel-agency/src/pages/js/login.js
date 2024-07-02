import React, { useState} from 'react';
import { toast } from "react-toastify";
import { Link } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import '../css/login.css';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');



  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  async function handleLogin(e) {
    e.preventDefault();
  
    try {
      const response = await fetch('https://wizardingworldtravels.vercel.app/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Login failed\nInvalid email or password');
      }
  
      const data = await response.json();
      localStorage.setItem('jwtToken', data.token);
      toast.success('Login successful', {
        autoClose: 3000,
        position: 'top-center',
      });
  
      if (data.user.userType === 'User') {
        setTimeout(() => {
          window.location.href = '/userpage'; // Redirect back to the user page after successful update
        }, 3000);
      } else {
        setTimeout(() => {
          window.location.href = '/adminpage'; // Redirect back to the admin page after successful update
        }, 3000);
      }
    } catch (error) {
      toast.error('Login Failed\nInvalid email or password', {
        position: 'top-center',
        autoClose: 3000,
      });
    }
  }

  
  
  

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login</h2>
        <input
        required
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
        />
        <input
        required
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
        />
        <button type="submit">Unlock</button>

        <p className='sign-up'>New here?<Link to="/signup" className='sign-up'>Sign Up</Link></p>
      </form>
    </div>

  );
};

export default Login;

