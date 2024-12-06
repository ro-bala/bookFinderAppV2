import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import logo from "./logo.png"; // Ensure the path is correct.

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        // Store the token in localStorage or sessionStorage
        localStorage.setItem("authToken", data.token);
        navigate("/home"); // Redirect to home page
      } else {
        alert(data.message); // Show error message
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Error logging in");
    }
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
