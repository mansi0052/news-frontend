import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = ({ darkMode, setDarkMode, onSearch }) => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    const trimmed = query.trim();
    if (trimmed !== "") {
      onSearch?.(trimmed);
      navigate(`/search?q=${encodeURIComponent(trimmed)}`);
      setQuery(""); // Clear input
    }
  };

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <header className={`navbar ${darkMode ? "dark" : "light"}`}>
      <h1 className="logo">📰 News Dashboard</h1>

      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search articles..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button className="search-button" onClick={handleSearch}>
          Search
        </button>
      </div>

      <nav className="links">
        <Link to="/">Home</Link>
        <Link to="/summaries">My Summaries</Link>
        <button onClick={toggleDarkMode} className="darkmode-btn">
          {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
        </button>
      </nav>
    </header>
  );
};

export default Header;
