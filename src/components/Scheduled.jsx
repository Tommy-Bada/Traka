/* eslint-disable react/prop-types */
import ScheduledTaskBox from "./ScheduledTaskBox";
import { useEffect, useState } from "react";

function Scheduled() {
  // Get Data from Local Storage and Set State
  const [scheduledTasksData, setScheduledTasksData] = useState([]);
  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    if (tasks) {
      setScheduledTasksData(tasks);
    }
  }, []);

  // Handle Data Sorting according to Due Date and Time
  const [taskSorted, setTaskSorted] = useState(false);

  function sortByDateAndTime(tasks) {
    return tasks.slice().sort((a, b) => {
      const dateA = new Date(a.taskDueDate).getTime();
      const dateB = new Date(b.taskDueDate).getTime();
      if (dateA === dateB) {
        const timeA = a.taskDueTime.split(":").map(Number);
        const timeB = b.taskDueTime.split(":").map(Number);

        if (timeA[0] !== timeB[0]) {
          return timeA[0] - timeB[0]; // Compare hours
        } else {
          return timeA[1] - timeB[1]; // Compare minutes if hours are the same
        }
      }

      return dateA - dateB;
    });
  }

  // Usage in your component
  const handleSortByDateAndTime = () => {
    const sorted = sortByDateAndTime(scheduledTasksData);
    setScheduledTasksData(sorted);
    setTaskSorted(true);
  };

  //Handle Task Start
  const startTask = (title) => {
    const startedTasks = scheduledTasksData.map((task) =>
      task.taskTitle === title ? { ...task, status: "in-progress" } : task
    );
    localStorage.setItem("tasks", JSON.stringify(startedTasks));
    setScheduledTasksData(startedTasks);
  };

  //Handle Task Delete
  const deleteTask = (title) => {
    const deletedTasks = scheduledTasksData.filter(
      (task) => task.taskTitle !== title
    );
    localStorage.setItem("tasks", JSON.stringify(deletedTasks));
    setScheduledTasksData(deletedTasks);
  };

  //Handle Editing Task
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTask, setUpdatedTask] = useState([]);
  const [taskToUpdate, setTaskToUpdate] = useState("");

  const editTask = (title) => {
    const taskToEdit = scheduledTasksData.filter(
      (task) => task.taskTitle === title && task.status === "scheduled"
    );
    setTaskToUpdate(taskToEdit[0].taskTitle);
    setUpdatedTask(taskToEdit[0]);
    setTaskSorted(true);

    setIsEditing(true);
  };

  //Control Update Form
  function handleChange(event) {
    setUpdatedTask((prevTaskData) => {
      return {
        ...prevTaskData,
        [event.target.name]: event.target.value,
      };
    });
  }

  //Handle Update after Editing
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
      const updatedTasks = scheduledTasksData.filter(
        (task) => task.taskTitle !== taskToUpdate
      );
      updatedTasks.push(updatedTask);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      setScheduledTasksData(updatedTasks);
      setIsEditing(false);
    }
  }

  function handleBack() {
    setIsEditing(false);
  }

  return (
    <div>
      <div className="my-[20px]">
        {taskSorted || (
          <button
            className="w-[100%] text-center bg-[#62EEA8] text-[16px] p-[10px] rounded-md mb-[10px] shadow-[0px_4px_0px_0px_#000000] border-[3px] border-black"
            onClick={handleSortByDateAndTime}
          >
            Prioritize
          </button>
        )}
      </div>
      <div>
        {isEditing && (
          <form onSubmit={handleUpdate}>
            <input
              className="w-[100%] p-[15px] text-[16px] mb-[10px]  rounded-md shadow-[3px_3px_3px_1px_rgba(0,0,0,0.25)]"
              name="taskTitle"
              value={updatedTask.taskTitle}
              onChange={handleChange}
            />
            <textarea
              className="w-[100%] p-[15px] text-[16px] mb-[10px] rounded-md shadow-[3px_3px_3px_1px_rgba(0,0,0,0.25)]"
              type="paragraph"
              name="taskDetail"
              value={updatedTask.taskDetail}
              onChange={handleChange}
            ></textarea>

            <input
              className="w-[100%] p-[15px] text-[16px] mb-[10px] rounded-md shadow-[3px_3px_3px_1px_rgba(0,0,0,0.25)]"
              type="date"
              name="taskDueDate"
              value={updatedTask.taskDueDate}
              onChange={handleChange}
            />
            <input
              className="w-[100%] p-[15px] text-[16px] mb-[10px] rounded-md shadow-[3px_3px_3px_1px_rgba(0,0,0,0.25)]"
              type="time"
              name="taskDueTime"
              value={updatedTask.taskDueTime}
              onChange={handleChange}
            />
            <button
              className="w-[100%] text-center bg-[#62EEA8] text-[16px] p-[10px] rounded-md shadow-[0px_4px_0px_0px_#000000] border-[3px] border-black my-[10px]"
              type="submit"
            >
              Update Task
            </button>
            <button
              className="w-[100%] text-center bg-[#FF9F9F] text-[16px] p-[10px] rounded-md mb-[30px] shadow-[0px_4px_0px_0px_#000000] border-[3px] border-black"
              type="submit"
              onClick={handleBack}
            >
              Cancel
            </button>
          </form>
        )}
      </div>
      <ul>
        {isEditing ||
          scheduledTasksData
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
