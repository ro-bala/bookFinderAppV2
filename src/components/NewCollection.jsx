import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const NewCollection = ({ addToFavorites, addToArchive, addToDownloadedBooks }) => {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
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

  return (
    <div className="container">
      <h1>New Collection</h1>

      {/* Navbar for the buttons */}
      <nav className="navbar">
        <ul className="navbar-list">
          <li>
            <button
              className="navbar-link"
              onClick={() => navigate("/my-collection")}
            >
              Go to My Collection
            </button>
          </li>
          <li>
            <button
              className="navbar-link"
              onClick={() => navigate("/archive")}
            >
              Go to Archive
            </button>
          </li>
          <li>
            <button
              className="navbar-link"
              onClick={() => navigate("/downloaded-books")}
            >
              Downloaded Books
            </button>
          </li>
          <li>
            <button
              className="navbar-link"
              onClick={() => navigate("/home")}
            >
              Go to Home Page
            </button>
            <button
              className="navbar-link"
              onClick={() => navigate("/Login")}
            >
              Login/Sign-Up page
            </button>
          </li>
        </ul>
      </nav>

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
              onClick={() => addToFavorites(book)}
            >
              Add to Favorites
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewCollection;
