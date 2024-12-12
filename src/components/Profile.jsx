import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../imgs/logo.png"; // Adjust the path to your logo file

const Profile = () => {
  const [user, setUser] = useState({});
  const [authToken, setAuthToken] = useState(localStorage.getItem('token')); // Assuming you're using token from localStorage
  const [bio, setBio] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    if (!authToken) {
      alert("You must be logged in to see your profile.");
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_BE_URL}/api/user/profile`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${authToken}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        setUser(data);
        setBio(data.bio || '');
      } else {
        alert(data.message || "Error fetching user profile");
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const handleBioChange = (e) => {
    setBio(e.target.value);
  };

  const handleBioSave = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BE_URL}/api/user/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authToken}`,
        },
        body: JSON.stringify({ bio }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Bio updated successfully!");
      } else {
        alert(data.message || "Error updating bio");
      }
    } catch (error) {
      console.error("Error updating bio:", error);
    }
  };

  return (
    <div className="container">
      <nav className="navbar">
        <div className="navbar-container">
          <img src={logo} alt="Logo" className="navbar-logo" />
          <ul className="navbar-list">
            <li>
              <button className="navbar-link" onClick={() => navigate("/my-collection")}>
                My Collection
              </button>
            </li>
            <li>
              <button className="navbar-link" onClick={() => navigate("/archive")}>
                Archive
              </button>
            </li>
            <li>
              <button className="navbar-link" onClick={() => navigate("/downloaded-books")}>
                Downloaded Books
              </button>
            </li>
            <li>
              <button className="navbar-link" onClick={() => navigate("/home")}>
                Home Page
              </button>
              
            </li>
          </ul>
        </div>
      </nav>

      <h1>Profile</h1>
      <div className="profile-container">
        <img src={`https://via.placeholder.com/150`} alt="Profile" className="profile-pic" />
        <div className="profile-details">
          <p><strong>Full Name:</strong> {user.fullName}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Password:</strong> ******</p>
          <div className="bio-section">
            <h3>Bio</h3>
            <textarea
              value={bio}
              onChange={handleBioChange}
              placeholder="Write a short bio..."
            />
            <button onClick={handleBioSave} className="btn">Save Bio</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
