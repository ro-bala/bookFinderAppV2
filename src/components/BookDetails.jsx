import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const BookDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state?.book) {
    return <p>No book details available.</p>;
  }

  const { book } = state;

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
      <button onClick={() => navigate("/new-collection")}>Back to New Collection</button>
    </div>
  );
};

export default BookDetails;
