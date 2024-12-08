import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import logo from "./logo.png"; // Ensure the path is correct.

const SignUp = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const userData = { fullName, email, password };

    try {
      const response = await fetch(`${import.meta.env.VITE_BE_URL}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Account created successfully! Please login.");
        navigate("/"); // Redirect to login after successful signup
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error("Signup failed:", err);
      alert("Signup failed, please try again.");
    }
  };

  return (
    <div className="login-container">
      <img src={logo} alt="Logo" className="app-logo" />
      <div className="login-card">
        <h1>Sign Up</h1>
        <div className="login-form">
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="login-input"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="login-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="login-input"
          />
          <button className="login-button" onClick={handleSignUp}>
            Create Account
          </button>
          <p className="signup-message">
            Already have an account?{" "}
            <span
              className="signup-link"
              onClick={() => navigate("/")} // Redirect to login
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
