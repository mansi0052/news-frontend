import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&apiKey=${
            import.meta.env.VITE_NEWS_API_KEY
          }`
        );
        const data = await response.json();
        if (data.status === "ok") {
          setArticles(data.articles);
        } else {
          setError("Failed to fetch articles.");
        }
      } catch (err) {
        setError("Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    if (query) fetchArticles();
  }, [query]);

  return (
    <div style={{ paddingTop: "80px", maxWidth: "900px", margin: "0 auto" }}>
      <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>
        🔍 Search Results for "{query}"
      </h2>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && articles.length === 0 && <p>No articles found.</p>}

      {articles.map((article, index) => (
        <div
          key={index}
          style={{
            border: "1px solid #ddd",
            padding: "1rem",
            borderRadius: "10px",
            marginBottom: "1rem",
            backgroundColor: "#fff",
          }}
        >
          <h3>{article.title}</h3>
          <p>
            <strong>Source:</strong> {article.source.name} <br />
            <strong>Published:</strong>{" "}
            {new Date(article.publishedAt).toLocaleString()}
          </p>
          <p>{article.description}</p>
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              marginTop: "1rem",
              backgroundColor: "#1e1e2f",
              color: "#fff",
              padding: "0.5rem 1rem",
              borderRadius: "6px",
              textDecoration: "none",
            }}
          >
            Read Full Article
          </a>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
