import React, { useEffect, useState } from "react";
import { fetchNewsByCategory } from "../api/newsAPI";
import ArticleList from "../components/ArticleList";
import CategoryTabs from "../components/CategoryTabs";

const Home = ({ searchQuery }) => {
  const [articles, setArticles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("general");
  const [error, setError] = useState("");

  const loadArticles = async (category, query) => {
    try {
      setError("");
      const data = await fetchNewsByCategory(category, query);
      if (data.length === 0) {
        setError("No articles found for this category.");
      }
      setArticles(data);
    } catch (err) {
      setError("Failed to load news articles. Please check your connection.");
      setArticles([]);
    }
  };

  useEffect(() => {
    loadArticles(selectedCategory, searchQuery);
  }, [selectedCategory, searchQuery]);

  return (
    <div>
      <CategoryTabs selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />
      {error ? (
        <div style={{ textAlign: "center", color: "#b00020", marginTop: "2rem" }}>
          <h3>{error}</h3>
        </div>
      ) : (
        <ArticleList articles={articles} />
      )}
    </div>
  );
};

export default Home;
