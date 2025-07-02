import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import MySummaries from "./pages/MySummaries";
import "./index.css";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="*" element={<App />}> 
          <Route index element={<Home />} />
          <Route path="summaries" element={<MySummaries />} />
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>
);