import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import NewCollection from "./components/NewCollection";
import BookDetails from "./components/BookDetails";
import MyCollection from "./components/MyCollections";
import Archive from "./components/Archive";
import DownloadedBooks from "./components/DownloadedBooks"; // Import DownloadedBooks page

import logo from "./components/logo.png"; 
import "./App.css";

const App = () => {
  const [favorites, setFavorites] = useState([]);
  const [archive, setArchive] = useState([]);
  const [downloadedBooks, setDownloadedBooks] = useState([]); // Track downloaded books

  const addToFavorites = (book) => {
    if (!favorites.some((fav) => fav.key === book.key)) {
      setFavorites([...favorites, book]);
    }
  };

  const addToArchive = (book) => {
    if (!archive.some((arch) => arch.key === book.key)) {
      setArchive([...archive, book]);
    }
  };

  const addToDownloadedBooks = (book) => {
    if (!downloadedBooks.some((downloaded) => downloaded.key === book.key)) {
      setDownloadedBooks([...downloadedBooks, book]);
    }
  };

  const removeFromFavorites = (key) => {
    setFavorites(favorites.filter((book) => book.key !== key));
  };

  const removeFromArchive = (key) => {
    setArchive(archive.filter((book) => book.key !== key));
  };

  const removeFromDownloadedBooks = (key) => {
    setDownloadedBooks(downloadedBooks.filter((book) => book.key !== key));
  };

  return (
    <Router>
      <div className="app">
        <header className="app-header"></header>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route
            path="/new-collection"
            element={
              <NewCollection
                addToFavorites={addToFavorites}
                addToArchive={addToArchive}
                addToDownloadedBooks={addToDownloadedBooks} // Pass function to NewCollection
              />
            }
          />
          <Route
            path="/my-collection"
            element={
              <MyCollection
                favorites={favorites}
                removeFromFavorites={removeFromFavorites}
              />
            }
          />
          <Route
            path="/archive"
            element={
              <Archive archive={archive} removeFromArchive={removeFromArchive} />
            }
          />
          <Route
            path="/downloaded-books"
            element={
              <DownloadedBooks
                downloadedBooks={downloadedBooks}
                removeFromDownloadedBooks={removeFromDownloadedBooks}
              />
            }
          />
          <Route path="/book-details" element={<BookDetails />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
