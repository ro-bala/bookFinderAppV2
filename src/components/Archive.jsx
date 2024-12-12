//ARCHIVE
import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../imgs/logo.png";

const Archive = ({ archive, removeFromArchive }) => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <nav className="navbar">
        <div className="navbar-container">
          <img src={logo} alt="Logo" className="navbar-logo" />
          <p className="current-page">Archive</p>
          <ul className="navbar-list">
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
              <button className="navbar-link" onClick={() => navigate("/home")}>
                Home Page
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
      <h1>Archive</h1>
      {archive.length === 0 ? (
        <p>No books added to the archive yet!</p>
      ) : (
        <div className="grid-container">
          {archive.map((book) => (
            <div key={book.key} className="card">
              <img
                src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                alt={book.title}
              />
              <h3>{book.title}</h3>
              <button
                className="favorite-button"
                onClick={() => removeFromArchive(book.key)}
              >
                Remove from Archive
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Go to Home Button */}
      <button onClick={() => navigate("/home")} className="go-home-button">
        Go to Home
      </button>
    </div>
  );
};

export default Archive;
