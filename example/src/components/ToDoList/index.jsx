import React from "react";
import { useCallback, useState } from "react";

function ToDoList() {
  const [taskTitle, setTaskTitle] = useState("");
  const [tasks, setTasks] = useState([]);
  const [emptyMessage, setEmptyMessage] = useState(false);

  const handleTaskRegister = useCallback(
    (e) => {
      e.preventDefault();
      if (taskTitle !== "") {
        setEmptyMessage(false);
        setTasks((old) => [...old, taskTitle]);
        setTaskTitle("");
      } else {
        setEmptyMessage(true);
      }
    },
    [taskTitle]
  );

  return (
    <>
      <form onSubmit={handleTaskRegister}>
        <input
          type="text"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          data-testid="task_input"
        />
        <button type="submit" data-testid="task_button">
          Adicionar nova tarefa
        </button>
        {emptyMessage && <p>O campo não pode estar vazio!</p>}
      </form>
      <ul>
        {tasks.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </>
  );
}

export default ToDoList;
