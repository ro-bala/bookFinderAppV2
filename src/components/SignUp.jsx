import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import logo from "./logo.png"; // Ensure the path is correct.

const SignUp = () => {
  const navigate = useNavigate();

  // Local state to hold form data
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault(); // Prevent form from reloading the page

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fullName, email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Account created successfully!");
        navigate("/home"); // Redirect after account creation
      } else {
        alert(data.message); // Show error message if user already exists
      }
    } catch (error) {
      console.error("Error creating account:", error);
      alert("Error creating account");
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
