import axios from "axios";

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const BASE_URL = "https://newsapi.org/v2/top-headlines";

export const fetchNewsByCategory = async (category = "general", query = "") => {
  const url = `${BASE_URL}?category=${category}&q=${query}&language=en&pageSize=30&apiKey=${API_KEY}`;

  try {
    const response = await axios.get(url);
    return response.data.articles || [];
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
};
