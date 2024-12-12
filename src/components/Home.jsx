//HOME
import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../imgs/logo.png"; // Adjust the path to your logo file

const Home = () => {
  const navigate = useNavigate();

  const goToNewCollection = () => {
    navigate("/new-collection");
  };

  return (
    <div className="container">
      <nav className="navbar">
        <div className="navbar-container">
          <img src={logo} alt="Logo" className="navbar-logo" />
          <p className="current-page">Home</p>
          <ul className="navbar-list">
            <li>
              <button className="navbar-link" onClick={() => navigate("/archive")}>
                Archive
              </button>
            </li>
            <li>
              <button className="navbar-link" onClick={() => navigate("/my-collection")}>
                My Collection
              </button>
            </li>
            <li>
              <button className="navbar-link" onClick={() => navigate("/downloaded-books")}>
                Downloaded Books
              </button>
            </li>
            <li>
              <button className="navbar-link" onClick={() => navigate("/profile")}>
                Profile
              </button>
            </li>
          </ul>
        </div>
      </nav>

      <h1 className="home-title">Welcome to BookWorm!</h1>
      <button className="btn" onClick={goToNewCollection}>
        Find a Book
      </button>
    </div>
  );
};

export default Home;
