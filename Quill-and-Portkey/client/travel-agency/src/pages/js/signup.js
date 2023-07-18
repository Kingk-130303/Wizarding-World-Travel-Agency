import React, { useState } from 'react';
import '../css/signup.css'; // Import the corresponding CSS file

function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  
	async function handleSignUp(event) {
		event.preventDefault()

		const response = await fetch('http://localhost:5000/api/auth/createuser', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name,
				email,
				password,
			}),
		})
		const data = await response.json()
		// console.log(data);
		if (data.status === 'ok') {
			alert('Sign up successful')
			window.location.href = '/login'
		}
    else{
      alert(data.error)
    }
  
	}

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
