import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import About from "./pages/about";
import Rankings from "./pages/rankings";
import { AnimatePresence } from "framer-motion";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode='wait'>
      <Routes key={location.pathname} location={location}>
        <Route path="/" element={<Rankings />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </AnimatePresence>
  );
}

export default AnimatedRoutes;