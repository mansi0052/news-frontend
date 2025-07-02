<a
  href={article.url}
  target="_blank"
  rel="noopener noreferrer"
  style={{
    display: "inline-block",
    marginTop: "1rem",
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

{}
<button onClick={handleSummarize} style={{ marginTop: "1rem" }}>
  {loading ? "Summarising..." : "Summarise"}
</button>
