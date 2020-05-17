import * as React from "react";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Checkbox from "@material-ui/core/Checkbox";
import TextareaAutosize from "react-autosize-textarea";

interface task {
  title: string;
  isCompleted: boolean;
  id: number;
}

interface Props {
  task: task;
  key: number;
  markComplete: (task: task) => void;
  deleteTask: (task: task) => void;
  editTask: (newTitle: string, taskId: number) => void;
}

const Todo: React.FC<Props> = (props: Props) => {
  const [input, setInput] = React.useState(props.task.title);

  const searching = (e: string) => {
    setInput(e);
    props.editTask(e, props.task.id);
  };
  return (
    <div className="withDaTrash">
      <div
        // onClick={() => props.markComplete(props.task)}
        className={props.task.isCompleted ? "todoCompleted" : "todo"}
      >
        <div className="spacing">
          <Checkbox
            checked={props.task.isCompleted}
            onChange={() => props.markComplete(props.task)}
            color="primary"
            inputProps={{ "aria-label": "secondary checkbox" }}
          />
          <TextareaAutosize
            className="editTask"
            placeholder="Add a title!"
            name="search"
            value={input}
            onChange={(e) => searching(e.currentTarget.value)}
          />
        </div>
      </div>
      <div className="trashIcon" onClick={() => props.deleteTask(props.task)}>
        <FontAwesomeIcon className="trash" icon={faTimes} />
      </div>
    </div>
  );
};
export default Todo;
