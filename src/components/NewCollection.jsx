import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../imgs/logo.png"; // Adjust the path to your logo file
import Vines from "../imgs/Vines.jpeg";

const NewCollection = ({ addToFavorites, addToArchive, addToDownloadedBooks }) => {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [authToken, setAuthToken] = useState(localStorage.getItem('token')); // Assuming you're using token from localStorage
  const [favorites, setFavorites] = useState([]); // State for favorites
  const [archive, setArchive] = useState([]); // State for archive
  const [downloadedBooks, setDownloadedBooks] = useState([]); // State for downloaded books
  const navigate = useNavigate();

  useEffect(() => {
    fetchRandomBooks(); // Fetch 5 random books on page load
  }, []);

  // Define a list of subjects for random selection
  const subjects = ["love", "science", "history", "art", "fiction", "biography", "mystery", "fantasy", "technology"];

  // Fetch random books (5 books) on page load or button click
  const fetchRandomBooks = () => {
    const randomSubject = subjects[Math.floor(Math.random() * subjects.length)]; // Pick a random subject
    fetch(`https://openlibrary.org/subjects/${randomSubject}.json?limit=5`) // Fetch books from the random subject
      .then((response) => response.json())
      .then((data) => setBooks(data.works || []))
      .catch((error) => console.error("Error fetching books:", error));
  };

  // Fetch books based on search query, limiting to 5 results
  const fetchBooksBySearch = () => {
    if (searchQuery.trim() !== "") {
      fetch(`https://openlibrary.org/search.json?q=${searchQuery}&limit=5`)
        .then((response) => response.json())
        .then((data) => setBooks(data.docs || []))
        .catch((error) => console.error("Error fetching books:", error));
    }
  };

  // Handle search input changes
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); // Update search query state
  };

  // Handle search button click to fetch books related to the query
  const handleSearchClick = () => {
    fetchBooksBySearch(); // Fetch books if search query is not empty
  };

  // Handle generate random books button click
  const handleGenerateRandomBooks = () => {
    fetchRandomBooks(); // Fetch random books (5 random books)
  };

  // Handle book click for book details
  const handleBookClick = (book) => {
    navigate(`/book-details`, { state: { book } }); // Navigate to book details
  };

  // Save book to favorites, checking if it's already in the list
  const saveBookToFavorites = async (book) => {
    if (!authToken) {
      alert("You must be logged in to save books.");
      return;
    }

    // Check if book is already in favorites
    if (favorites.some((favorite) => favorite.key === book.key)) {
      alert("This book is already in your favorites!");
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_BE_URL}/api/books/collections/save/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authToken}`, // Send the token in the header
        },
        body: JSON.stringify({ book }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Book saved to your favorites!");
        setFavorites([...favorites, book]); // Add book to favorites list
        addToFavorites(book); // Optionally update the local state if you keep track of favorites
      } else {
        alert(data.message || "Error saving book");
      }
    } catch (error) {
      console.error("Error saving book:", error);
    }
  };

  // Send book to archive, checking if it's already in the list
  const sendToArchive = (book) => {
    // Check if book is already in the archive
    if (archive.some((archivedBook) => archivedBook.key === book.key)) {
      alert("This book is already in your archive!");
      return;
    }
    setArchive([...archive, book]);
    addToArchive(book); // Optionally update the archive state
    alert("Book added to archive!"); // Alert when added to archive
  };

  // Download book, checking if it's already in the list
  const downloadBook = (book) => {
    // Check if book is already downloaded
    if (downloadedBooks.some((downloaded) => downloaded.key === book.key)) {
      alert("This book is already downloaded!");
      return;
    }
    setDownloadedBooks([...downloadedBooks, book]);
    addToDownloadedBooks(book); // Optionally update the downloaded books state
    alert("Book downloaded!"); // Alert when added to downloaded books
  };

  // Render book images and handle missing cover images
  const renderBookImage = (book) => {
    const coverId = book.cover_i || book.cover_id; // Handle both cover_i and cover_id
    return coverId
      ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
      : "https://via.placeholder.com/150"; // Fallback image if no cover
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
          onChange={handleSearchChange} // Handle input change
        />
        <button onClick={handleSearchClick}>Search</button> {/* Button to trigger search */}
      </div>

      {/* Generate Random Books Button */}
      <button onClick={handleGenerateRandomBooks}>Generate Random Books</button>

      {/* Books Display */}
      <div className="grid-container">
        <img src={Vines} alt="Background" />
        {books.length === 0 && <p>No books available to display.</p>} {/* Display if no books */}
        {books.map((book) => (
          <div className="card" key={book.key}>
            <img
              src={renderBookImage(book)} // Use the renderBookImage function to handle images
              alt={book.title}
              onClick={() => handleBookClick(book)}
              style={{ cursor: "pointer" }}
            />
            <h3>{book.title}</h3>
            <p>By: {book.author_name?.join(", ") || "Unknown"}</p>
            <button
              className="favorite-button"
              onClick={() => saveBookToFavorites(book)} // Call the function when adding to favorites
            >
              Add to Collection
            </button>
            <button
              className="archive-button"
              onClick={() => sendToArchive(book)} // Call the function when sending to archive
            >
              Send to Archive
            </button>
            <button
              className="download-button"
              onClick={() => downloadBook(book)} // Call the function when downloading the book
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
