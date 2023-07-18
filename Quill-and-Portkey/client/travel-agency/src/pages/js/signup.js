import React, { useState } from "react";
import "../css/signup.css"; // Import the corresponding CSS file
const jwt_secret = "king@123"

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");
  const [secretKey, setSecretKey] = useState("");

  async function handleSignUp(event) {
    if (userType === "Admin" && secretKey !== jwt_secret) {
      event.preventDefault();
      alert("Invalid Admin");
    } else {
      event.preventDefault();

      const response = await fetch(
        "http://localhost:5000/api/auth/createuser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
            userType,
          }),
        }
      );

      // console.log(data);
      if (response.status === 200) {
        alert("Sign up successful");
        window.location.href = "/login";
      } else {
        const data = await response.json();
        alert(data.error);
      }
    }
  }

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignUp}>
        <div>
          <input
            type="radio"
            name="UserType"
            value="User"
            onChange={(e) => setUserType(e.target.value)}
          />
          User &nbsp;
          <input
            type="radio"
            name="UserType"
            value="Admin"
            onChange={(e) => setUserType(e.target.value)}
            required
          />
          Admin
        </div>
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
        {userType === "Admin" ? (
         
            <input
              type="password"
              placeholder="Secret Key"
              onChange={(e) => setSecretKey(e.target.value)}
              required
            />
         
        ) : null}
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;
