//geminiAPI.js
export const getSummary = async (articleText) => {
  try {
    const res = await fetch("http://localhost:5000/api/summarize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: articleText })
    });
    const data = await res.json();
    return data.summary || "No summary returned.";
  } catch (err) {
    console.error("Error calling backend summarizer:", err);
    return "Error summarizing article.";
  }
};
