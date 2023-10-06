/* eslint-disable react/prop-types */
import ScheduledTaskBox from "./ScheduledTaskBox";
import { useEffect, useState } from "react";

function Scheduled() {
  const [scheduledTasksData, setScheduledTasksData] = useState([]);
  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    if (tasks) {
      setScheduledTasksData(tasks);
    }
  }, []);

  const startTask = (title) => {
    const startedTasks = scheduledTasksData.map((task) =>
      task.taskTitle === title ? { ...task, status: "in-progress" } : task
    );
    console.log(startedTasks);
    localStorage.setItem("tasks", JSON.stringify(startedTasks));
    setScheduledTasksData(startedTasks);
  };

  return (
    <div>
      <h2>Scheduled</h2>
      <ul>
        {scheduledTasksData
          .filter((task) => task.status === "scheduled")
          .map((task, index) => {
            return (
              <ScheduledTaskBox
                key={index}
                title={task.taskTitle}
                description={task.taskDetail}
                status={task.status}
                dueDate={task.taskDueDate}
                dueTime={task.taskDueTime}
                onStart={() => startTask(task.taskTitle)}
                // onEdit={}
                // onDelete={}
              />
            );
          })}
      </ul>
    </div>
  );
}

export default Scheduled;
