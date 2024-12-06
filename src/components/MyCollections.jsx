import React from "react";
import { useNavigate } from "react-router-dom";

const MyCollection = ({ favorites, removeFromFavorites }) => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h1>My Collection</h1>
      {favorites.length === 0 ? (
        <p>No favorite books added yet!</p>
      ) : (
        <div className="grid-container">
          {favorites.map((book) => (
            <div key={book.key} className="card">
              <img
                src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                alt={book.title}
              />
              <h3>{book.title}</h3>
              <button
                className="favorite-button"
                onClick={() => removeFromFavorites(book.key)}
              >
                Remove from Favorites
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

export default MyCollection;
