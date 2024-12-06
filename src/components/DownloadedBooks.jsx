import React from "react";
import { useNavigate } from "react-router-dom";

const DownloadedBooks = ({ downloadedBooks, removeFromDownloadedBooks }) => {
  const navigate = useNavigate();

  return (
    <div className="container">
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
