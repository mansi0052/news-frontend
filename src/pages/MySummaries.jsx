import React, { useEffect, useState } from "react";

const MySummaries = () => {
  const [summaries, setSummaries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editedText, setEditedText] = useState("");

  useEffect(() => {
    const fetchSummaries = async () => {
      try {
        const res = await fetch("http://localhost:5001/api/summaries");
        const data = await res.json();
        if (Array.isArray(data)) {
          setSummaries(data);
        } else {
          setError("Unexpected response format.");
        }
      } catch (err) {
        setError("Failed to load summaries.");
      } finally {
        setLoading(false);
      }
    };

    fetchSummaries();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this summary?")) return;

    try {
      const res = await fetch(`http://localhost:5001/api/summaries/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setSummaries((prev) => prev.filter((summary) => summary._id !== id));
      } else {
        alert("Failed to delete summary.");
      }
    } catch (err) {
      alert("Error deleting summary.");
    }
  };

  const handleUpdate = async (id) => {
    try {
      const res = await fetch(`http://localhost:5001/api/summaries/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ summary: editedText }),
      });

      if (res.ok) {
        const updated = await res.json();
        setSummaries((prev) =>
          prev.map((s) => (s._id === id ? updated : s))
        );
        setEditingId(null);
      } else {
        alert("Failed to update summary.");
      }
    } catch (err) {
      alert("Error updating summary.");
    }
  };

  return (
    <div
      style={{
        paddingTop: "80px",
        maxWidth: "900px",
        margin: "0 auto",
        backgroundColor: "var(--bg)",
        color: "var(--text)",
        minHeight: "100vh",
        transition: "background-color 0.3s ease, color 0.3s ease",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>📚 My Summaries</h2>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {summaries.length === 0 && !loading && <p>No summaries found.</p>}

      {summaries.map((summary) => (
        <div
          key={summary._id}
          style={{
            border: "1px solid #ddd",
            borderRadius: "10px",
            padding: "1rem",
            marginBottom: "1.5rem",
            background: "var(--bg)",
            color: "var(--text)",
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          }}
        >
          <h3>{summary.title}</h3>
          <p style={{ fontSize: "0.9rem", color: "var(--text)" }}>
            <strong>Source:</strong> {summary.source} <br />
            <strong>Date:</strong> {new Date(summary.date).toLocaleString()}
          </p>

          {editingId === summary._id ? (
            <>
              <textarea
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
                rows={5}
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                  marginBottom: "1rem",
                  resize: "vertical",
                  backgroundColor: "var(--bg)",
                  color: "var(--text)",
                }}
              />
              <div style={{ display: "flex", gap: "1rem" }}>
                <button
                  onClick={() => handleUpdate(summary._id)}
                  style={{
                    backgroundColor: "#4CAF50",
                    color: "#fff",
                    padding: "0.6rem 1.2rem",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontWeight: "600",
                  }}
                >
                  💾 Save
                </button>
                <button
                  onClick={() => setEditingId(null)}
                  style={{
                    backgroundColor: "#ccc",
                    color: "#000",
                    padding: "0.6rem 1.2rem",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontWeight: "600",
                  }}
                >
                  ❌ Cancel
                </button>
              </div>
            </>
          ) : (
            <ul style={{ marginTop: "1rem" }}>
              {summary.summary.split("\n").map((line, idx) => (
                <li key={idx}>{line}</li>
              ))}
            </ul>
          )}

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "1rem",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            <a
              href={summary.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                backgroundColor: "#1e1e2f",
                color: "#fff",
                padding: "0.6rem 1.2rem",
                borderRadius: "6px",
                textDecoration: "none",
                fontWeight: "600",
              }}
            >
              View Full Article
            </a>
            {editingId !== summary._id && (
              <button
                onClick={() => {
                  setEditingId(summary._id);
                  setEditedText(summary.summary);
                }}
                style={{
                  backgroundColor: "#007bff",
                  color: "#fff",
                  border: "none",
                  padding: "0.6rem 1.2rem",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: "600",
                }}
              >
                ✏️ Edit
              </button>
            )}
            <button
              onClick={() => handleDelete(summary._id)}
              style={{
                backgroundColor: "#ff4d4f",
                color: "#fff",
                border: "none",
                padding: "0.6rem 1rem",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "600",
              }}
            >
              🗑️ Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MySummaries;
