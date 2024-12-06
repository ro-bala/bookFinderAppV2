import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const goToNewCollection = () => {
    navigate("/new-collection");
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <ul className="navbar-list">
          <li>
            <Link to="/archive" className="navbar-link">
              Archive
            </Link>
          </li>
          <li>
            <Link to="/my-collection" className="navbar-link">
              My Collection
            </Link>
          </li>
          <li>
            <Link to="/downloaded-books" className="navbar-link">
              Downloaded Books
            </Link>
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <div className="container">
        <h1 className="home-title">Click to see new book collection</h1>
        <button className="btn" onClick={goToNewCollection}>
          New Collection
        </button>
      </div>
    </div>
  );
};

export default Home;
