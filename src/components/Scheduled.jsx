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

  const deleteTask = (title) => {
    const deletedTasks = scheduledTasksData.filter(
      (task) => task.taskTitle !== title
    );
    localStorage.setItem("tasks", JSON.stringify(deletedTasks));
    setScheduledTasksData(deletedTasks);
  };

  const [isEditing, setIsEditing] = useState(false);

  const [updatedTask, setUpdatedTask] = useState([]);
  const [taskToUpdate, setTaskToUpdate] = useState("");

  const editTask = (title) => {
    const taskToEdit = scheduledTasksData.filter(
      (task) => task.taskTitle === title && task.status === "scheduled"
    );
    console.log(taskToEdit[0].taskTitle);
    setTaskToUpdate(taskToEdit[0].taskTitle);
    setUpdatedTask(taskToEdit[0]);

    setIsEditing(true);
  };

  function handleChange(event) {
    setUpdatedTask((prevTaskData) => {
      return {
        ...prevTaskData,
        [event.target.name]: event.target.value,
      };
    });
  }

  function handleUpdate(event) {
    event.preventDefault();
    if (
      updatedTask.taskTitle == "" ||
      updatedTask.taskDetail == "" ||
      updatedTask.taskDueDate == "" ||
      updatedTask.taskDueTime == ""
    ) {
      alert("Please input all your task information");
    } else {
      console.log("this text", taskToUpdate);
      const updatedTasks = scheduledTasksData.filter(
        (task) => task.taskTitle !== taskToUpdate
      );
      updatedTasks.push(updatedTask);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      setScheduledTasksData(updatedTasks);
      setIsEditing(false);
    }
  }

  return (
    <div>
      <h2>Scheduled</h2>
      <div>
        {isEditing && (
          <form onSubmit={handleUpdate}>
            <input
              type="text"
              name="taskTitle"
              value={updatedTask.taskTitle}
              onChange={handleChange}
            />
            <input
              type="paragraph"
              name="taskDetail"
              value={updatedTask.taskDetail}
              onChange={handleChange}
            />
            <input
              type="date"
              name="taskDueDate"
              value={updatedTask.taskDueDate}
              onChange={handleChange}
            />
            <input
              type="time"
              name="taskDueTime"
              value={updatedTask.taskDueTime}
              onChange={handleChange}
            />
            <button type="submit">Update Task</button>
          </form>
        )}
      </div>
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
                onDelete={() => deleteTask(task.taskTitle)}
                onEdit={() => editTask(task.taskTitle)}
              />
            );
          })}
      </ul>
    </div>
  );
}

export default Scheduled;
