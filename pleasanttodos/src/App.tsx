import React, { useState, useEffect } from "react";
import Todos from "./compontents/Todos";
import "./App.scss";
import Switch from "@material-ui/core/Switch";
import { withStyles } from "@material-ui/core/styles";
import { purple } from "@material-ui/core/colors";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-solid-svg-icons";
import { faSun } from "@fortawesome/free-solid-svg-icons";

const PurpleSwitch = withStyles({
  switchBase: {
    color: purple[300],
    "&$checked": {
      color: purple[500],
    },
    "&$checked + $track": {
      color: purple[500],
      backgroundColor: purple[500],
    },
  },
  checked: {},
  track: {},
})(Switch);

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
        <PurpleSwitch
          onChange={() => setDarkMode((prevMode: boolean) => !prevMode)}
          name="checkedA"
          color="secondary"
        />
        {darkMode ? (
          <FontAwesomeIcon color="#FEFCD7" icon={faMoon} />
        ) : (
          <FontAwesomeIcon color="#FDB813" icon={faSun} />
        )}
      </div>

      <Todos />
    </div>
  );
}

export default App;
