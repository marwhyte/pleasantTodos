import * as React from "react";
import Todo from "./Todo";
import { useForm } from "react-hook-form";
// @ts-ignore
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboardList } from "@fortawesome/free-solid-svg-icons";

interface task {
  title: string;
  isCompleted: boolean;
  id: number;
}
interface Props {
  query: string;
  todos: task[];
}
interface formInput {
  title: string;
}
type Inputs = {
  title: string;
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
  const { register, handleSubmit, errors, reset } = useForm<Inputs>();
  const [filterToDos, setFilterToDos] = React.useState([
    { title: "", isCompleted: false, id: 0 },
  ]);
  const [whichFilter, setWhichFilter] = React.useState("all");
  const [todos, setTodos] = React.useState([
    { title: "", isCompleted: false, id: 0 },
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
    if (todos !== null) {
      setTodos(notStringTodos);
    }
  }, [props.todos]);

  React.useEffect(() => {
    setFilterToDos(tasksToDisplay(todos, whichFilter, props.query));
  }, [todos, whichFilter, props.query]);

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

  const editATask = (newTitle: string, taskId: number) => {
    var updatedTitle: task[] = JSON.parse(localStorage.getItem("todos") || "");
    var returnedArray = updatedTitle.map((task) => {
      if (task.id === taskId) {
        task.title = newTitle;
        return task;
      } else {
        return task;
      }
    });
    setTodos(returnedArray);
    const stringedReturn = JSON.stringify(returnedArray);
    localStorage.setItem("todos", stringedReturn);
  };

  const onSubmit = (data: formInput) => {
    var nextID;
    const lastElement = todos.length;
    lastElement === 0 ? (nextID = 1) : (nextID = todos[lastElement - 1].id + 1);

    const newTask: task = {
      title: data.title,
      isCompleted: false,
      id: nextID,
    };
    console.log(newTask);
    addTask(newTask);
    reset();
  };

  return (
    <div className="wholetodo">
      <div className="topOfTodos">
        <h1>
          Pleasant Todos <FontAwesomeIcon icon={faClipboardList} />
        </h1>
        <div className="topFormatting">
          <p>making all your tasks easily accessible </p>
        </div>
        <div>
          <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <div className="formatForm">
              <div className="inputAndError">
                <input
                  type="text"
                  placeholder="Title"
                  name="title"
                  className="topInput"
                  ref={register({
                    required: "Required",
                  })}
                />
                <div className="redtext">
                  {errors.title && errors.title.message}
                </div>
              </div>
              <input type="submit" className="topButton" placeholder="Submit" />
            </div>
          </form>
        </div>
        <div className="allTodos">
          {filterToDos &&
            filterToDos.map((task) => {
              return (
                <Todo
                  task={task}
                  key={task.id}
                  markComplete={markTaskComplete}
                  deleteTask={deleteTask}
                  editTask={editATask}
                />
              );
            })}
          <p className="todo-count">
            <strong>{count}</strong> {count === 1 ? "item" : "items"} left
          </p>
        </div>
      </div>

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
