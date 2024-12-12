//NEW COLLECTION
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../imgs/logo.png"; // Adjust the path to your logo file
import Vines from "../imgs/Vines.jpeg";

const NewCollection = ({ addToFavorites, addToArchive, addToDownloadedBooks }) => {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [authToken, setAuthToken] = useState(localStorage.getItem('token')); // Assuming you're using token from localStorage
  const navigate = useNavigate();

  useEffect(() => {
    fetchBooks(); // Initial load of books
  }, []);

  const fetchBooks = (subject = "love") => {
    fetch(`https://openlibrary.org/subjects/${subject}.json?limit=20`)
      .then((response) => response.json())
      .then((data) => setBooks(data.works || []))
      .catch((error) => console.error("Error fetching books:", error));
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBookClick = (book) => {
    navigate(`/book-details`, { state: { book } }); // Navigate to book details
  };

  const handleGenerateNewBooks = () => {
    const subjects = ["love", "science", "history", "art", "fiction"];
    const randomSubject = subjects[Math.floor(Math.random() * subjects.length)];
    fetchBooks(randomSubject); // Fetch books from a random subject
  };

  const saveBookToFavorites = async (book) => {
    if (!authToken) {
      alert("You must be logged in to save books.");
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_BE_URL}/api/books/collections/save/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authToken}`, // Send the token in the header
        },
        body: JSON.stringify({ book })
      });

      const data = await response.json();
      if (response.ok) {
        alert("Book saved to your favorites!");
        addToFavorites(book); // Optionally update the local state if you keep track of favorites
      } else {
        alert(data.message || "Error saving book");
      }
    } catch (error) {
      console.error("Error saving book:", error);
    }
  };

  return (
    <div className="container">
      <nav className="navbar">
        <div className="navbar-container">
          <img src={logo} alt="Logo" className="navbar-logo" />
          <p className="current-page">Find A Book</p>
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

      <h1>New Collection</h1>

      {/* Search Bar */}
      <div className="search-container">
        <input
          type="text"
          className="search-bar"
          placeholder="Search for a book..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      {/* Generate New Books Button */}
      <button className="generate-button" onClick={handleGenerateNewBooks}>
        Generate New Books
      </button>

      {/* Books Display */}
      <div className="grid-container">
        <img src={Vines} />
        {filteredBooks.map((book) => (
          <div className="card" key={book.key}>
            <img
              src={`https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`}
              alt={book.title}
              onClick={() => handleBookClick(book)}
              style={{ cursor: "pointer" }}
            />
            <h3>{book.title}</h3>
            <p>By: {book.authors?.map((author) => author.name).join(", ")}</p>
            <button
              className="favorite-button"
              onClick={() => saveBookToFavorites(book)} // Call the function when adding to favorites
            >
              Add to Collection
            </button>
            <button
              className="archive-button"
              onClick={() => addToArchive(book)}
            >
              Send to Archive
            </button>
            <button
              className="download-button"
              onClick={() => addToDownloadedBooks(book)}
            >
              Download Book
            </button>
            <img src={Vines} />
          </div>
        ))}
      
      </div>
    </div>
  );
};

export default NewCollection;
