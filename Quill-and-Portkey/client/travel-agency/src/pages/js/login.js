import React, { useState} from 'react';
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
   
      await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }).then(response => response.json()).then(data => {
        
        localStorage.setItem('jwtToken', data.token);
        // console.log(data.user.email)
        alert('Login successful');
        if (data.user.userType === "User"){
        window.location.href = '/userpage';
        }
        else{
          window.location.href = '/adminpage'
        }
      }).catch(err => {
        alert('Login Failed\nInvalid email or password');
      })
    }
  

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
