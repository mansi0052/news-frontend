const ArticleDetail = ({ article }) => {
  const fallbackImage = "https://placehold.co/600x300.png?text=NewsDash";

  return (
    <div style={{ maxWidth: "800px", margin: "2rem auto" }}>
      <img
        src={article.urlToImage || fallbackImage}
        alt={article.title}
        style={{ width: "100%", borderRadius: "12px" }}
      />
      <h2 style={{ marginTop: "1rem" }}>{article.title}</h2>
      <p>{article.content || article.description || "No content available."}</p>
    </div>
  );
};

export default ArticleDetail;
