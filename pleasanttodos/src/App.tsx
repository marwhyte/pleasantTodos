import React, { useState, useEffect } from "react";
import Todos from "./compontents/Todos";
import "./App.scss";
import Switch from "@material-ui/core/Switch";
import { withStyles } from "@material-ui/core/styles";
import { purple } from "@material-ui/core/colors";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-solid-svg-icons";
import { faSun } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
interface task {
  title: string;
  isCompleted: boolean;
  id: number;
}
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
  const [query, setQuery] = useState("");
  const [todos, setTodos] = React.useState([
    { title: "", isCompleted: false, id: 0 },
  ]);
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
  const searching = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const deletedAllCompleted = () => {
    var deleteCompletedTasks: task[] = JSON.parse(
      localStorage.getItem("todos") || ""
    );
    var returnedArray = deleteCompletedTasks.filter(
      (item) => item.isCompleted === false
    );
    setTodos(returnedArray);
    const stringedReturn = JSON.stringify(returnedArray);
    localStorage.setItem("todos", stringedReturn);
  };

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  function getPrefScheme() {
    if (!window.matchMedia) return;
    console.log(window.matchMedia("prefers-color-scheme: dark").matches);
    return window.matchMedia("prefers-color-scheme: dark").matches;
  }
  return (
    <div className="App">
      <div className={darkMode ? "dark-mode" : "light-mode"}>
        <div className="toggle">
          <div className="formAndClear">
            <input
              type="text"
              className="bottomInput"
              placeholder="Search through todos"
              name="search"
              onChange={searching}
            />
            <div className="toolbar">
              <button
                className="clearButton"
                onClick={() => deletedAllCompleted()}
              >
                Clear Completed
              </button>
            </div>
          </div>
          <div>
            <PurpleSwitch
              checked={darkMode}
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
        </div>

        <Todos query={query} todos={todos} />
        <div className="githublink">
          <div className="insidegithub">
            <FontAwesomeIcon icon={faGithub} />
            <p>marwhyte</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
