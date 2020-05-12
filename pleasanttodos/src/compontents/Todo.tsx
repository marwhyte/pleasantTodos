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
  markComplete: (task: task) => void;
  deleteTask: (task: task) => void;
}

const Todo: React.FC<Props> = (props: Props) => {
  const [timer, setTimer] = React.useState(0);
  React.useEffect(() => {
    const currentTime = Date.now();
    const endTime = Date.parse(props.task.endDate);
    const timerTillComplete = endTime - currentTime;
    timerTillComplete <= 1000 ? setTimer(0) : setTimer(timerTillComplete);
  }, []);

  return (
    <div className="withDaTrash">
      <div
        onClick={() => props.markComplete(props.task)}
        className={props.task.isCompleted ? "todoCompleted" : "todo"}
      >
        <div className="spacing">
          <p>Task: {props.task.title}</p>
        </div>
        <div className="spacingtimer">
          {timer === 0 ? (
            <div>
              <p>notime</p>
            </div>
          ) : (
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
          )}
        </div>
      </div>
      <div onClick={() => props.deleteTask(props.task)}>
        <FontAwesomeIcon className="trash" icon={faTrash} />
      </div>
    </div>
  );
};
export default Todo;
