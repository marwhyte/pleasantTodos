import React, { useState, useEffect } from "react";
import Todo from "./compontents/Todo";
import Todos from "./compontents/Todos";
import "./App.css";

function App() {
  const [darkMode, setDarkMode] = useState(getMode());
  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  function getMode() {
    const isReturningUser = "dark" in localStorage;
    const userHasDark = getPrefScheme();
    const savedMode = JSON.parse(localStorage.getItem("dark") || "");
    if (isReturningUser) {
      return savedMode;
    } else if (userHasDark) {
      return true;
    } else {
      return false;
    }
  }

  function getPrefScheme() {
    if (!window.matchMedia) return;

    return window.matchMedia("prefers-color-scheme: dark").matches;
  }
  return (
    <div className={darkMode ? "dark-mode" : "light-mode"}>
      <div className="toggle">
        <button onClick={() => setDarkMode((prevMode: boolean) => !prevMode)}>
          toggle
        </button>
      </div>
      <Todos />
    </div>
  );
}

export default App;
