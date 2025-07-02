// frontend/src/api/newsAPI.js
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL || "https://news-backend-production-35eb.up.railway.app";

export const fetchNewsByCategory = async (category = "general", query = "") => {
  const url = `${BASE_URL}/api/news?category=${category}&q=${query}`;

  try {
    const response = await axios.get(url);
    return response.data || [];
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
};
