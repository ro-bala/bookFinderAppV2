import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import logo from "./logo.png"; // Ensure the path is correct.

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const userData = { email, password };

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      
      if (response.ok) {
        // Save token in localStorage
        localStorage.setItem("token", data.token);
        navigate("/home");
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error("Login failed:", err);
      alert("Login failed, please try again.");
    }
  };

  return (
    <div className="login-container">
      <img src={logo} alt="Logo" className="app-logo" />
      <div className="login-card">
        <h1>Login / Sign-Up</h1>
        <div className="login-form">
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
