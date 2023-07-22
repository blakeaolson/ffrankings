import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import About from "./pages/about";
import Rankings from "./pages/rankings";
import Analysis from "./pages/analysis";
import { AnimatePresence } from "framer-motion";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode='wait'>
      <Routes key={location.pathname} location={location}>
        <Route path="/" element={<Rankings />} />
        <Route path="/team-analysis" element={<Analysis />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </AnimatePresence>
  );
}

export default AnimatedRoutes;