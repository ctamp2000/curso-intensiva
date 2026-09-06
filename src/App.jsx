import "./style.css";
import { Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import Community from "./pages/Community";
import CommunityAccess from "./pages/CommunityAccess";

export default function App() {
  return (
    <div className="min-h-screen bg-brand-bg flex flex-col">
      <main id="main-content">
        <Routes>
          <Route path="/" element={<Community />} />
          <Route path="/portal" element={<Home />} />
          <Route path="/acesso-comunidade" element={<CommunityAccess />} />
        </Routes>
      </main>
    </div>
  );
}
