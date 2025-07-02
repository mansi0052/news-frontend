import React from "react";
import ArticleCard from "./ArticleCard";
import NoResults from "./NoResults";

const ArticleList = ({ articles }) => {
  if (!articles || articles.length === 0) {
    return (
      <NoResults
        message="No Articles Found"
        suggestion="Try a different category or search term."
        image="https://placehold.co/400x200?text=No+Articles"
      />
    );
  }

  return (
    <div className="article-list">
      {articles.map((article, index) => (
        <ArticleCard key={index} article={article} />
      ))}
    </div>
  );
};

export default ArticleList;
