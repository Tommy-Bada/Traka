import { useState, useEffect } from "react";
import CompletedTaskBox from "./CompletedTaskBox";
function Completed() {
  const [completedProgressTasksData, setCompletedProgressTasksData] = useState(
    []
  );

  // Get completed task from Local Storage and Set State
  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    if (tasks) {
      setCompletedProgressTasksData(tasks);
    }
  }, []);

  return (
    <div className="mt-[20px]">
      <ul>
        {completedProgressTasksData
          .filter((task) => task.status === "completed")
          .map((task, index) => {
            return (
              <CompletedTaskBox
                key={index}
                title={task.taskTitle}
                description={task.taskDetail}
                // status={task.status}
                // dueDate={task.taskDueDate}
                // dueTime={task.taskDueTime}
              />
            );
          })}
      </ul>
    </div>
  );
}
export default Completed;
