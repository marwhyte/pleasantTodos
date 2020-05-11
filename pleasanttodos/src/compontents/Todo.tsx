import * as React from "react";
import Timer from "react-compound-timer";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface task {
  title: string;
  startDate: string;
  endDate: string;
  isCompleted: boolean;
  id: number;
}

interface Props {
  task: task;
  key: number;
}

const Todo: React.FC<Props> = (props: Props) => {
  const [timer, setTimer] = React.useState(0);
  React.useEffect(() => {
    const currentTime = Date.now();
    const endTime = Date.parse(props.task.endDate);
    const timerTillComplete = endTime - currentTime;
    setTimer(timerTillComplete);
  }, []);
  const changeCompleted = () => {
    const completedStatus = props.task.isCompleted;
    props.task.isCompleted = !completedStatus;
  };

  return (
    <div
      onClick={changeCompleted}
      className={props.task.isCompleted ? "singleTaskCompleted" : "singleTask"}
    >
      <div className="spacing">
        <p>Task: {props.task.title}</p>
      </div>
      <div className="spacingtimer">
        <Timer initialTime={timer} direction="backward">
          {() => (
            <React.Fragment>
              <Timer.Days />
              <span> </span> days <span> </span>
              <Timer.Hours />
              <span> </span> hours<span> </span>
              <Timer.Minutes />
              <span> </span>
              minutes<span> </span>
              <Timer.Seconds />
              <span> </span> seconds<span> </span>
            </React.Fragment>
          )}
        </Timer>
      </div>

      {/* <div onClick={deleteTask}>
        <FontAwesomeIcon className="trash" icon={faTrash} />
      </div> */}
    </div>
  );
};
export default Todo;
