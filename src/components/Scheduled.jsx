import ScheduledTaskBox from "./ScheduledTaskBox";
import { useEffect, useState } from "react";

function Scheduled() {
  const [scheduledTasks, setScheduledTasks] = useState([]);
  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    if (tasks) {
      setScheduledTasks(tasks.filter((task) => task.status === "scheduled"));
    }
  }, []);
  return (
    <div>
      <h2>Scheduled</h2>
      <ul>
        {scheduledTasks.map((task) => {
          return (
            <ScheduledTaskBox
              key={task.taskTitle}
              title={task.taskTitle}
              description={task.taskDetail}
              status={task.status}
              dueDate={task.taskDueDate}
              dueTime={task.taskDueTime}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default Scheduled;
