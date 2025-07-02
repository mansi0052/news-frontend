import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const fallbackImage = "https://placehold.co/300x180.png?text=NewsDash";

const ArticleCard = ({ article }) => {
  const [imgSrc, setImgSrc] = useState(
    article.urlToImage && article.urlToImage.trim() !== ""
      ? article.urlToImage
      : fallbackImage
  );

  const navigate = useNavigate();

  useEffect(() => {
    setImgSrc(
      article.urlToImage && article.urlToImage.trim() !== ""
        ? article.urlToImage
        : fallbackImage
    );
  }, [article]);

  const handleClick = () => {
    sessionStorage.setItem("selectedArticle", JSON.stringify(article));
    navigate("/article", { state: { article } });
  };

  const formattedDate = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "Unknown date";

  return (
    <div
      className="card"
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick();
        }
      }}
      role="button"
      tabIndex={0}
      style={{
        cursor: "pointer",
        padding: "1rem",
        border: "1px solid var(--card-border, #ccc)",
        borderRadius: "12px",
        backgroundColor: "var(--bg)",
        color: "var(--text)",
        maxWidth: "380px",
        transition: "box-shadow 0.3s ease",
        boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
        userSelect: "none",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.15)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.boxShadow = "0 2px 6px rgba(0,0,0,0.05)")
      }
    >
      <img
        src={imgSrc}
        alt={article.title}
        onError={() => setImgSrc(fallbackImage)}
        style={{
          width: "100%",
          height: "180px",
          objectFit: "cover",
          borderRadius: "8px",
          marginBottom: "0.75rem",
        }}
      />

      <h4 style={{ margin: "0 0 0.5rem", fontSize: "1.1rem", fontWeight: "600" }}>
        {article.title}
      </h4>

      <p style={{ fontSize: "0.95rem", marginBottom: "0.75rem" }}>
        {article.description || "No description available."}
      </p>

      <div
        style={{
          fontSize: "0.85rem",
          color: "var(--text)",
          display: "flex",
          flexDirection: "column",
          gap: "0.3rem",
          borderTop: "1px solid #ddd",
          paddingTop: "0.5rem",
        }}
      >
        <span><strong>Author:</strong> {article.author || "Unknown"}</span>
        <span><strong>Source:</strong> {article.source?.name || "Unknown"}</span>
        <span><strong>Published:</strong> {formattedDate}</span>
      </div>
    </div>
  );
};

export default ArticleCard;
