import * as React from "react";
import Todo from "./Todo";

interface Props {}
const Todos: React.FC<Props> = (props: Props) => {
  return (
    <div className="todos">
      <p>your todo</p>
    </div>
  );
};
export default Todos;
