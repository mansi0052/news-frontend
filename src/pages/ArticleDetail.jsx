import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const fallbackImage = "https://placehold.co/600x300?text=NewsDash";

const ArticleDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const articleFromState = location.state?.article;
  const articleFromSession = sessionStorage.getItem("selectedArticle");
  const article =
    articleFromState || (articleFromSession && JSON.parse(articleFromSession));

  useEffect(() => {
    if (articleFromState) {
      sessionStorage.setItem("selectedArticle", JSON.stringify(articleFromState));
    }
  }, [articleFromState]);

  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSummarize = async () => {
    if (!article || !article.url) return;

    setLoading(true);
    setError("");
    setSummary("");

    const cached = sessionStorage.getItem(article.url);
    if (cached) {
      setSummary(cached);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("http://localhost:5001/api/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `Summarize the following article in 3 bullet points:\n\n${article.content || article.description || article.title}`,
        }),
      });

      const data = await res.json();

      if (res.ok && data.summary) {
        setSummary(data.summary);
        sessionStorage.setItem(article.url, data.summary);
      } else {
        setError(data.error || "Failed to get summary.");
      }
    } catch (err) {
      console.error("⚠️ Summary error:", err);
      setError("Summarization failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSummary = async () => {
    if (!summary || !article) return;

    try {
      const res = await fetch("http://localhost:5001/api/summaries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: article.title,
          url: article.url,
          source: article.source?.name || "Unknown",
          date: article.publishedAt || new Date().toISOString(),
          summary,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("✅ Summary saved successfully!");
      } else {
        alert("❌ Failed to save summary: " + data.error);
      }
    } catch (err) {
      console.error("❌ Save error:", err);
      alert("❌ Save failed.");
    }
  };

  if (!article) {
    return (
      <div style={{ padding: "2rem" }}>
        <p>No article found.</p>
        <button onClick={() => navigate("/")}>← Back</button>
      </div>
    );
  }

  return (
    <div
      className="page-container"
      style={{
        paddingTop: "80px",
        backgroundColor: "var(--bg)",
        color: "var(--text)",
        minHeight: "100vh",
        transition: "background-color 0.3s, color 0.3s",
      }}
    >
      <div
        style={{
          maxWidth: "800px",
          width: "90%",
          margin: "0 auto",
          background: "var(--bg)",
          color: "var(--text)",
          padding: "2rem",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <img
          src={article.urlToImage || fallbackImage}
          alt={article.title}
          onError={(e) => (e.target.src = fallbackImage)}
          style={{ width: "100%", borderRadius: "12px" }}
        />

        <h2 style={{ marginTop: "1rem" }}>{article.title}</h2>

        <div style={{ marginBottom: "1rem" }}>
          <p><strong>Author:</strong> {article.author || "Unknown"}</p>
          <p><strong>Source:</strong> {article.source?.name || "Unknown"}</p>
          <p><strong>Published:</strong> {article.publishedAt ? new Date(article.publishedAt).toLocaleString() : "N/A"}</p>
        </div>

        <p>{article.content || article.description || "No content available."}</p>

        <div
          style={{
            display: "flex",
            gap: "1rem",
            marginTop: "1rem",
            flexWrap: "wrap",
          }}
        >
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              backgroundColor: "#1e1e2f",
              color: "white",
              padding: "0.6rem 1.2rem",
              borderRadius: "6px",
              textDecoration: "none",
              fontWeight: "600",
            }}
          >
            Read Original Article
          </a>
          <button
            onClick={handleSummarize}
            disabled={loading}
            style={{
              backgroundColor: loading ? "#6a4b9c" : "#7b5cff",
              color: "white",
              padding: "0.65rem 1.5rem",
              border: "none",
              borderRadius: "8px",
              fontWeight: "700",
              fontSize: "1rem",
              cursor: loading ? "not-allowed" : "pointer",
              boxShadow: loading ? "none" : "0 4px 15px rgba(123, 92, 255, 0.6)",
              transition: "all 0.3s ease",
            }}
          >
            {loading ? "Summarising..." : "Summarise"}
          </button>
        </div>

        {error && (
          <p
            style={{
              background: "#ffe0e0",
              color: "#c00",
              padding: "0.75rem 1rem",
              borderRadius: "8px",
              marginTop: "1rem",
              fontWeight: "500",
            }}
          >
            {error}
          </p>
        )}

        {summary && (
          <div
            style={{
              marginTop: "2rem",
              padding: "1.5rem",
              background: "var(--card-bg, #fff)",
              borderRadius: "12px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              animation: "fadeIn 0.5s ease",
              color: "var(--text)",
            }}
          >
            <h3 style={{ marginBottom: "1rem" }}>📝 Summary</h3>
            <ul style={{ paddingLeft: "1.5rem", lineHeight: "1.6" }}>
              {summary.split("\n").map((point, index) => (
                <li key={index} style={{ marginBottom: "0.5rem" }}>
                  {point}
                </li>
              ))}
            </ul>

            <button
              onClick={handleSaveSummary}
              style={{
                marginTop: "1.5rem",
                backgroundColor: "#28a745",
                color: "white",
                border: "none",
                padding: "0.6rem 1.2rem",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "600",
                boxShadow: "0 4px 12px rgba(40,167,69,0.4)",
              }}
            >
              💾 Save Summary
            </button>
          </div>
        )}

        <button
          onClick={() => navigate("/")}
          style={{
            marginTop: "2rem",
            backgroundColor: "#1e1e2f",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            padding: "0.6rem 1.2rem",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          ← Back
        </button>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default ArticleDetail;
