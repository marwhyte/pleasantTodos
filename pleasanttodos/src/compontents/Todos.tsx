import * as React from "react";
import Todo from "./Todo";
import { useForm } from "react-hook-form";
// @ts-ignore
import DateTimePicker from "react-datetime-picker";

interface Props {}

interface task {
  title: string;
  startDate: string;
  endDate: string;
  isCompleted: boolean;
  id: number;
}
interface formInput {
  title: string;
  endDate: string;
}
type Inputs = {
  title: string;
  endDate: string;
};

const tasksToDisplay = (todos: task[], filter: string, query: string) => {
  var returnedTasks: task[] = [];
  var filteredTasks: task[] = todos.filter((task) => {
    return task.title.toLowerCase().includes(query.toLowerCase());
  });
  filteredTasks.forEach((task: task) => {
    if (filter === "all") {
      returnedTasks.push(task);
    } else if (filter === "completed" && task.isCompleted) {
      returnedTasks.push(task);
    } else if (filter === "notCompleted" && !task.isCompleted) {
      returnedTasks.push(task);
    }
  });
  return returnedTasks;
};

const Todos: React.FC<Props> = (props: Props) => {
  const { register, handleSubmit, errors } = useForm<Inputs>();
  const [query, setQuery] = React.useState("");
  const [filterToDos, setFilterToDos] = React.useState([
    { title: "", startDate: "", endDate: "", isCompleted: false, id: 0 },
  ]);
  const [whichFilter, setWhichFilter] = React.useState("all");
  const [todos, setTodos] = React.useState([
    { title: "", startDate: "", endDate: "", isCompleted: false, id: 0 },
  ]);
  const [count, setCount] = React.useState(0);
  const [dateTime, setDateTime] = React.useState("");
  const [maxDate] = React.useState(
    new Date(new Date().setFullYear(new Date().getFullYear() + 2))
  );

  React.useEffect(() => {
    var todos;
    if (localStorage.getItem("todos")) {
      todos = localStorage.getItem("todos");
    } else {
      localStorage.setItem("todos", "[]");
      todos = "[]";
    }
    var notStringTodos = JSON.parse(todos || "");
    if (todos !== null) {
      setTodos(notStringTodos);
    }
  }, []);
  React.useEffect(() => {
    setFilterToDos(tasksToDisplay(todos, whichFilter, query));
  }, [todos, whichFilter, query]);
  const searching = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };
  React.useEffect(() => {
    const notCompletedTodos = todos.filter(
      (todo) => todo.isCompleted === false
    );
    setCount(notCompletedTodos.length);
    console.log(todos);
  }, [todos]);

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
  };
  const markTaskComplete = (task: task) => {
    var markTodoCompleted: task[] = JSON.parse(
      localStorage.getItem("todos") || ""
    );
    var index = todos.indexOf(task);
    const isTrueOrFalse = markTodoCompleted[index].isCompleted;
    markTodoCompleted[index] = {
      ...markTodoCompleted[index],
      isCompleted: !isTrueOrFalse,
    };
    setTodos(markTodoCompleted);
    const newTodos = JSON.stringify(markTodoCompleted);
    localStorage.setItem("todos", newTodos);
  };
  const deleteTask = (task: task) => {
    var deleteTask: task[] = JSON.parse(localStorage.getItem("todos") || "");
    var returnedArray = deleteTask.filter((item) => item.id !== task.id);
    setTodos(returnedArray);
    const stringedReturn = JSON.stringify(returnedArray);
    localStorage.setItem("todos", stringedReturn);
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
    const lastElement = todos.length;
    console.log(dateTime);
    const endDate = JSON.stringify(dateTime);
    const endDate1 = endDate.replace("T", " ");
    const endDate2 = endDate1.replace("Z", "");
    var nextID;
    lastElement === 0 ? (nextID = 1) : (nextID = todos[lastElement - 1].id + 1);

    const newTask: task = {
      title: data.title,
      startDate: dateStr,
      endDate: endDate2,
      isCompleted: false,
      id: nextID,
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
            className="input"
            ref={register({
              required: "Required",
              pattern: {
                value: /^.{1,50}$/i,
                message: "Task Name must be 1-50 characters long!",
              },
            })}
          />
          {errors.title && errors.title.message}

          <DateTimePicker
            onChange={(date: string) => setDateTime(date)}
            value={dateTime}
            maxDate={maxDate}
          />
          <input type="submit" className="input" placeholder="Submit" />
        </div>
      </form>

      {filterToDos &&
        filterToDos.map((task) => {
          return (
            <Todo
              task={task}
              key={task.id}
              markComplete={markTaskComplete}
              deleteTask={deleteTask}
            />
          );
        })}

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
          className="input"
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
            whichFilter === "completed"
              ? "bottomButtonComplete"
              : "bottomButton"
          }
          onClick={completed}
        >
          Completed
        </button>
        <button
          className={
            whichFilter === "notCompleted"
              ? "bottomButtonComplete"
              : "bottomButton"
          }
          onClick={notCompleted}
        >
          Not Completed
        </button>
        <button
          className={
            whichFilter === "all" ? "bottomButtonComplete" : "bottomButton"
          }
          onClick={all}
        >
          All
        </button>
      </div>
    </div>
  );
};
export default Todos;
