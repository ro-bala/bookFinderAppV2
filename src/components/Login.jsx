import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import logo from "./logo.png"; // Ensure the path is correct.

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/home");
  };
  return (
    <div className="login-container">
      <img src={logo} alt="Logo" className="app-logo" />
      <div className="login-card">
        <h1>Login / Sign-Up</h1>
        <div className="login-form">
          <input
            type="text"
            placeholder="Email or Username"
            className="login-input"
          />
          <input
            type="password"
            placeholder="Password"
            className="login-input"
          />
          <button className="login-button" onClick={handleLogin}>
            Login
          </button>
          <p className="signup-message">
            Don’t have an account?{" "}
            <span
              className="signup-link"
              onClick={() => navigate("./signup")}
            >
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
