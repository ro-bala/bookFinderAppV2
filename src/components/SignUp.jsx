import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import logo from "./logo.png"; // Ensure the path is correct.

const SignUp = () => {
  const navigate = useNavigate();

  const handleSignUp = () => {
    alert("Account created successfully!");
    navigate("/home"); // Redirect after account creation
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
            className="login-input"
          />
          <input
            type="email"
            placeholder="Email"
            className="login-input"
          />
          <input
            type="password"
            placeholder="Password"
            className="login-input"
          />
          <input
            type="password"
            placeholder="Confirm Password"
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
