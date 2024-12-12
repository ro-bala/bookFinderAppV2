//MY COLLECTIONS
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../imgs/logo.png"; // Adjust the path to your logo file

const MyCollection = ({ removeFromFavorites }) => {
  const [favorites, setFavorites] = useState([]);
  const [authToken, setAuthToken] = useState(localStorage.getItem('token')); // Assuming you're using token from localStorage
  const navigate = useNavigate();

  useEffect(() => {
    fetchFavorites(); // Fetch saved books when the component mounts
  }, []);

  const fetchFavorites = async () => {
    if (!authToken) {
      alert("You must be logged in to see your collection.");
      navigate("/login"); // Redirect to login if no token
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_BE_URL}/api/books/collections`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${authToken}`, // Send the token in the header
        },
      });

      const data = await response.json();
      if (response.ok) {
        setFavorites(data.books); // Assuming the backend returns an array of books
      } else {
        alert(data.message || "Error fetching favorite books");
      }
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  };
  const handleBookClick = (book) => {
    navigate(`/book-details`, { state: { book } }); // Navigate to book details
  };
  const handleRemoveFavorite = async (bookId) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BE_URL}/api/books/collections/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json", // Add content type header
          "Authorization": `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          key: bookId, // Send the book key in the request body
        }),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        alert("Error removing book: " + errorText);
        return;
      }
  
      // Remove the book from the local state
      setFavorites(favorites.filter((book) => book.key !== bookId));
  
      alert("Book removed from favorites.");
    } catch (error) {
      console.error("Error removing book:", error);
      alert("Error removing book.");
    }
  };

  return (
    <div className="container">
      <nav className="navbar">
        <div className="navbar-container">
          <img src={logo} alt="Logo" className="navbar-logo" />
          <p className="current-page">My Collection</p>
          <ul className="navbar-list">
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
            <li>
              <button className="navbar-link" onClick={() => navigate("/profile")}>
                Profile
              </button>
            </li>
          </ul>
        </div>
      </nav>

      <h1>My Collection</h1>
      {favorites.length === 0 ? (
        <p>No favorite books added yet!</p>
      ) : (
        <div className="grid-container">
          {favorites.map((book) => (
            <div key={book.key} className="card">
              <img
              src={`https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`}
              alt={book.title}
              onClick={() => handleBookClick(book)}
              style={{ cursor: "pointer" }}
            />
              <h3>{book.title}</h3>
              <button
                className="favorite-button"
                onClick={() => handleRemoveFavorite(book.key)}
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
