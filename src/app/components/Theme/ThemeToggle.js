"use client";

import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

const ThemeToggle = () => {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
      document.documentElement.classList.remove("dark");
      setTheme("light");
    } else {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    }
  }, [theme]);

  const toggleTheme = (e) => {
    if (theme === "light") {
      setTheme("dark");
      localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
    } else if (theme === "dark") {
      setTheme("light");
      localStorage.setItem("theme", "light");
      document.documentElement.classList.remove("dark");
    } else {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    }
  };

  return (
    <button
      className="transition-all ease-in duration-300 p-2"
      onClick={(e) => toggleTheme(e)}
    >
      <FontAwesomeIcon
        className="text-lg"
        icon={theme === "light" ? faSun : faMoon}
      />
    </button>
  );
};

export default ThemeToggle;
