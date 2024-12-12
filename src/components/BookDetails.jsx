import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const BookDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [bookDetails, setBookDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  if (!state?.book) {
    return <p>No book details available.</p>;
  }

  const { book } = state;

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        // Fetch additional details using the book's key from Open Library API
        const response = await axios.get(`https://openlibrary.org${book.key}.json`);
        setBookDetails(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching book details:", error);
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [book.key]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container">
      <h1>{book.title}</h1>
      <img
        src={`https://covers.openlibrary.org/b/id/${book.cover_id}-L.jpg`}
        alt={book.title}
        style={{ maxWidth: "300px", marginBottom: "20px" }}
      />
      <p>
        <strong>Author(s):</strong> {book.authors?.map((author) => author.name).join(", ")}
      </p>
      <p>
        <strong>Key:</strong> {book.key}
      </p>
      <p>
        <strong>Published:</strong> {bookDetails?.publish_date || "N/A"}
      </p>
      <p>
        <strong>Number of Pages:</strong> {bookDetails?.number_of_pages || "N/A"}
      </p>
      <p>
        <strong>Description:</strong> {bookDetails?.description || "No description available."}
      </p>
      <p>
        <strong>ISBN:</strong> {bookDetails?.isbn_13?.join(", ") || "N/A"}
      </p>
      
      <button onClick={() => navigate("/new-collection")}>Back to New Collection</button>
    </div>
  );
};

export default BookDetails;
