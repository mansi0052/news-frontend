import React from "react";

const NoResults = ({
  message = "Nothing found.",
  suggestion = "Try changing your search or category.",
  image = "https://placehold.co/400x200?text=No+Results",
}) => {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "2rem",
        color: "#555",
        maxWidth: "600px",
        margin: "0 auto",
      }}
    >
      <img
        src={image}
        alt="No Results"
        style={{ width: "100%", maxWidth: "300px", borderRadius: "12px", marginBottom: "1rem" }}
      />
      <h2 style={{ fontWeight: "600", marginBottom: "0.5rem" }}>{message}</h2>
      <p style={{ color: "#777" }}>{suggestion}</p>
    </div>
  );
};

export default NoResults;
