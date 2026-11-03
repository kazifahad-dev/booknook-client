"use client";

import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

export default function ThemeToggle() {
  const [theme, setTheme] = useState(null);

  
  useEffect(() => {
    setTheme(document.documentElement.getAttribute("data-theme") || "booknook");
  }, []);

  const toggleTheme = () => {
    const next = theme === "booknook-dark" ? "booknook" : "booknook-dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("booknook-theme", next);
    } catch (e) {}
    setTheme(next);
  };


  if (!theme) return <span className="btn btn-ghost btn-circle btn-sm invisible" />;

  const isDark = theme === "booknook-dark";

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className="btn btn-ghost btn-circle btn-sm text-lg"
    >
      {isDark ? <FaSun /> : <FaMoon />}
    </button>
  );
}