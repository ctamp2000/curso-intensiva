import React, { useState } from "react";
import "./style.css";
import Header from "./components/Header.jsx";
import Home from "./components/Home.jsx";
import Products from "./components/Products.jsx";
import Collaborators from "./components/Collaborators.jsx";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");

  const handleNavigation = (page) => {
    setCurrentPage(page);
    // Scroll to top
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-brand-bg flex flex-col">
      <Header onNavigate={handleNavigation} />
      <main id="main-content">
        {currentPage === "home" && <Home onNavigate={handleNavigation} />}
        {currentPage === "products" && <Products />}
        {currentPage === "collaborators" && <Collaborators />}
      </main>
    </div>
  );
}
