import * as React from "react";
import Todo from "./Todo";
import { useForm } from "react-hook-form";

interface Props {}
// const display = (todos: [], filter: string, query: string) => {
//   var tasksToReturn: [];
//   var tasksToFilter = todos.filter((task) => {
//     return task.title.toLowerCase().includes(query.toLowerCase());
//   });
//   tasksToFilter.forEach((task) => {
//     if (filter === "all") {
//       tasksToReturn.push(task);
//     } else if (filter === "completed" && task.completed) {
//       tasksToReturn.push(task);
//     } else if (filter === "notCompleted" && !task.completed) {
//       tasksToReturn.push(task);
//     } else {
//       tasksToReturn.push(task);
//     }
//   });

//   return tasksToReturn;
// };
interface task {
  title: string;
  startDate: string;
  endDate: string;
  isCompleted: boolean;
}
interface formInput {
  title: string;
  endDate: string;
}
type Inputs = {
  title: string;
  endDate: string;
};

// const initialState = {
//   todos: JSON.parse(localStorage.getItem("todos") || "[]"),
//   count: JSON.parse(localStorage.getItem("todos") || "[]").length,
// };

const Todos: React.FC<Props> = (props: Props) => {
  const { register, handleSubmit } = useForm<Inputs>();
  const [query, setQuery] = React.useState("");
  const [filterToDos, setFilterToDos] = React.useState();
  const [whichFilter, setWhichFilter] = React.useState("all");
  const [todos, setTodos] = React.useState([
    { title: "", startDate: "", endDate: "", isCompleted: false },
  ]);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    var todos;
    if (localStorage.getItem("todos")) {
      todos = localStorage.getItem("todos");
    } else {
      localStorage.setItem("todos", "[]");
      todos = "[]";
    }
    var notStringTodos = JSON.parse(todos || "");
    if (todos !== null) setTodos(notStringTodos);
  }, []);
  const searching = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    console.log(event.target.value);
  };

  const completed = () => {
    setWhichFilter("completed");
  };
  const notCompleted = () => {
    setWhichFilter("notCompleted");
  };
  const all = () => {
    setWhichFilter("all");
  };
  const addTask = (task: task) => {
    var addATodo: task[] = JSON.parse(localStorage.getItem("todos") || "");
    addATodo.push(task);
    if (todos !== undefined) {
      setTodos(addATodo);
    }
    var stringedTasks = JSON.stringify(addATodo);
    localStorage.setItem("todos", stringedTasks);
    console.log("string", stringedTasks);
  };
  const onSubmit = (data: formInput) => {
    var date = new Date();
    var dateStr =
      date.getFullYear() +
      "-" +
      ("00" + (date.getMonth() + 1)).slice(-2) +
      "-" +
      ("00" + date.getDate()).slice(-2) +
      " " +
      ("00" + date.getHours()).slice(-2) +
      ":" +
      ("00" + date.getMinutes()).slice(-2) +
      ":" +
      ("00" + date.getSeconds()).slice(-2);
    var endDate = data.endDate + ":00";
    var newEndDate = endDate.replace("T", " ");
    const newTask: task = {
      title: data.title,
      startDate: dateStr,
      endDate: newEndDate,
      isCompleted: false,
    };
    console.log(newTask);
    addTask(newTask);
  };

  return (
    <div className="wholetodo">
      <h1>Stay on track with todoify!</h1>
      <div className="topFormatting">
        <p>making all your tasks easily accessible</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="formatForm">
          <input
            type="text"
            placeholder="Title"
            name="title"
            ref={register({ min: 1, maxLength: 20 })}
          />

          <input
            type="datetime-local"
            placeholder="end date"
            name="endDate"
            ref={register}
          />
          <input type="submit" className="topButton" placeholder="Submit" />
        </div>
      </form>

      {/* {filterToDos &&
        filterToDos.map((task) => {
          return <Todo task={task} key={task.id} />;
        })} */}

      <p className="todo-count">
        <strong>{count}</strong> {count === 1 ? "item" : "items"} left
      </p>
      <br></br>
      {/* <button onClick={deleteTasks} className="bottomButton">
        Clear completed
      </button> */}
      <form>
        <input
          type="text"
          className="bottomInput"
          placeholder="Search through todos"
          name="search"
          onChange={searching}
        />
        <br></br>
        {/* <button onClick={}>completed</button>
        <button onClick={}>not completed</button> */}
      </form>
      <div className="buttonFlexing">
        <button
          className={
            whichFilter === "completed" ? "topButtonComplete" : "topButton"
          }
          onClick={completed}
        >
          Completed
        </button>
        <button
          className={
            whichFilter === "notCompleted" ? "topButtonComplete" : "topButton"
          }
          onClick={notCompleted}
        >
          Not Completed
        </button>
        <button
          className={whichFilter === "all" ? "topButtonComplete" : "topButton"}
          onClick={all}
        >
          All
        </button>
      </div>
    </div>
  );
};
export default Todos;
