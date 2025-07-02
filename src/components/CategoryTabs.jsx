import React from "react";

const categories = [
  "general",
  "business",
  "entertainment",
  "health",
  "science",
  "sports",
  "technology",
];

const CategoryTabs = ({ selectedCategory, onSelectCategory }) => (
  <div className="category-tabs">
    {categories.map((cat) => (
      <button
        key={cat}
        onClick={() => onSelectCategory(cat)}
        className={selectedCategory === cat ? "selected" : ""}
      >
        {cat.charAt(0).toUpperCase() + cat.slice(1)}
      </button>
    ))}
  </div>
);

export default CategoryTabs;
