import React, { useState, useEffect } from "react";
import Todos from "./compontents/Todos";
import "./App.scss";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";

function App() {
  const [darkMode, setDarkMode] = useState(getMode());
  function getMode() {
    var isReturningUser: boolean | string;
    var savedMode: boolean;
    if (
      localStorage.getItem("darkMode") === "true" ||
      localStorage.getItem("darkMode") === "false"
    ) {
      isReturningUser = "darkMode" in localStorage;
      savedMode = JSON.parse(localStorage.getItem("darkMode") || "");
    } else {
      isReturningUser = "none";
      savedMode = false;
    }
    const userHasDark = getPrefScheme();
    if (isReturningUser !== "none") {
      return savedMode;
    } else if (userHasDark) {
      return true;
    } else {
      return false;
    }
  }

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  function getPrefScheme() {
    if (!window.matchMedia) return;
    console.log(window.matchMedia("prefers-color-scheme: dark").matches);
    return window.matchMedia("prefers-color-scheme: dark").matches;
  }
  return (
    <div className={darkMode ? "dark-mode" : "light-mode"}>
      <div className="toggle">
        <FormControlLabel
          control={
            <Switch
              onChange={() => setDarkMode((prevMode: boolean) => !prevMode)}
              name="checkedA"
            />
          }
          label="Secondary"
        />
      </div>
      <Todos />
    </div>
  );
}

export default App;
