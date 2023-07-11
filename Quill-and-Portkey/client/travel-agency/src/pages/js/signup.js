import React, { useState } from 'react';
import '../css/signup.css'; // Import the corresponding CSS file

function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = (e) => {
    e.preventDefault();
    // Handle sign up logic here
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Password:', password);
    // Reset form fields
    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignUp}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;
