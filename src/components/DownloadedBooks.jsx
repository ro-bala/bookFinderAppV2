//DOWNLOADED BOOKS
import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../imgs/logo.png";

const DownloadedBooks = ({ downloadedBooks, removeFromDownloadedBooks }) => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <nav className="navbar">
        <div className="navbar-container">
          <img src={logo} alt="Logo" className="navbar-logo" />
          <p className="current-page">Downloaded Books</p>
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
      <h1>Downloaded Books</h1>
      {downloadedBooks.length === 0 ? (
        <p>No books downloaded yet!</p>
      ) : (
        <div className="grid-container">
          {downloadedBooks.map((book) => (
            <div key={book.key} className="card">
              <img
                src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                alt={book.title}
              />
              <h3>{book.title}</h3>
              <button
                className="favorite-button"
                onClick={() => removeFromDownloadedBooks(book.key)}
              >
                Remove from Downloaded Books
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

export default DownloadedBooks;
