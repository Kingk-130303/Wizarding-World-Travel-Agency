import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useState } from "react";
import {Link} from 'react-router-dom'
import "../css/signup.css"; // Import the corresponding CSS file


function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");
  const [secretKey, setSecretKey] = useState("");

  async function handleSignUp(event) {
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
            secretKey
          }),
        }
      );

      // console.log(data);
      if (response.status === 200) {
        toast.success("Sign up successful",{
          position: "top-center",
          autoClose : 3000
        });
        setTimeout(() => {
          window.location.href = "/login"; // Redirect back to the admin page after successful update
        }, 3000);
       
      } else {
        const data = await response.json();
        toast.error(data.error,{
          position :"top-center",
          autoClose: 5000
        });
      }
    
  }

  return (
    <div className="signup-background">
    <div className="signup-container">
      <form  className = "signup-form" onSubmit={handleSignUp}>
      <h2 className="head" >Wizarding World</h2>
        <div>
          <input
            type="radio"
            name="UserType"
            value="User"
            onChange={(e) => setUserType(e.target.value)}
          />
 <span className="user-type-label">User</span> &nbsp;          
        <input
            type="radio"
            name="UserType"
            value="Admin"
            onChange={(e) => setUserType(e.target.value)}
            required
          />
           <span className="user-type-label">Admin</span>

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
        <button className="submit">Enter</button>
      </form>
      <p className="log-in">
        Already signed up? <Link to="/login">Log in</Link>
      </p>
    </div>
    </div>
  );
}

export default SignUp;
