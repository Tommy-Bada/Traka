import { useState, useEffect } from "react";
import InProgressTaskBox from "./InProgressTaskBox";

function InProgress() {
  const [inProgressTasksData, setInProgressTasksData] = useState([]);

  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    if (tasks) {
      setInProgressTasksData(tasks);
    }
  }, []);

  const completedTask = (title) => {
    const completedTasks = inProgressTasksData.map((task) =>
      task.taskTitle === title ? { ...task, status: "completed" } : task
    );
    console.log(completedTasks, title);
    localStorage.setItem("tasks", JSON.stringify(completedTasks));
    setInProgressTasksData(completedTasks);
  };

  return (
    <div className="mt-[20px]">
      <ul>
        {inProgressTasksData
          .filter((task) => task.status === "in-progress")
          .map((task, index) => {
            return (
              <InProgressTaskBox
                key={index}
                title={task.taskTitle}
                description={task.taskDetail}
                status={task.status}
                dueDate={task.taskDueDate}
                dueTime={task.taskDueTime}
                onCompleted={() => completedTask(task.taskTitle)}
              />
            );
          })}
      </ul>
    </div>
  );
}

export default InProgress;
