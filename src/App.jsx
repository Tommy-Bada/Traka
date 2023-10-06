import "./App.css";
import Scheduled from "./components/Scheduled";
import InProgress from "./components/InProgress";
import Completed from "./components/Completed";
import { useState } from "react";

function App() {
  // Handle Click Interactions
  const [isScheduledTaskOpen, setIsScheduledTaskOpen] = useState(true);
  const [isInProgressTaskOpen, setIsInProgressTaskOpen] = useState(false);
  const [isCompletedTaskOpen, setIsCompletedTaskOpen] = useState(false);
  function handleShowScheduledTask() {
    setIsScheduledTaskOpen(true);
    setIsInProgressTaskOpen(false);
    setIsCompletedTaskOpen(false);
  }
  function handleShowInProgressTask() {
    setIsScheduledTaskOpen(false);
    setIsInProgressTaskOpen(true);
    setIsCompletedTaskOpen(false);
  }
  function handleShowCompletedTask() {
    setIsScheduledTaskOpen(false);
    setIsInProgressTaskOpen(false);
    setIsCompletedTaskOpen(true);
  }

  // Handle Add New Screen
  const [isAddNewOpen, setIsAddNewOpen] = useState(false);
  function handleAddNew() {
    setIsAddNewOpen(!isAddNewOpen);
  }

  // Handle Task Form
  const [taskData, setTaskData] = useState({
    taskTitle: "",
    taskDetail: "",
    taskDueDate: "",
    taskDueTime: "",
    status: "scheduled",
  });

  function handleTaskInput(event) {
    setTaskData((prevTaskData) => {
      return {
        ...prevTaskData,
        [event.target.name]: event.target.value,
      };
    });
  }

  function handleTaskSubmit(event) {
    event.preventDefault();
    setTaskData({
      taskTitle: "",
      taskDetail: "",
      taskDueDate: "",
      taskDueTime: "",
      status: "scheduled",
    });
    let tasks;
    if (localStorage.getItem("tasks") === null) {
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    console.log(tasks);
    tasks.push(taskData);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    setIsAddNewOpen(false);
  }

  return (
    <>
      <div>
        <h1>Traka</h1>
        <p onClick={handleAddNew}>{isAddNewOpen ? "x" : "+"}</p>
      </div>
      <div>
        <div>
          <input type="text" placeholder="search task" />
        </div>
        <ul>
          <li onClick={handleShowScheduledTask}>Scheduled Task</li>
          <li onClick={handleShowInProgressTask}>In Progress</li>
          <li onClick={handleShowCompletedTask}>Completed</li>
        </ul>
      </div>
      {isAddNewOpen && (
        <form onSubmit={handleTaskSubmit}>
          <input
            type="text"
            placeholder="What do you want to do?"
            name="taskTitle"
            onChange={handleTaskInput}
          />
          <input
            type="paragraph"
            placeholder="Break it down"
            name="taskDetail"
            onChange={handleTaskInput}
          />
          <input
            type="date"
            placeholder="Deadline"
            name="taskDueDate"
            onChange={handleTaskInput}
          />
          <input
            type="time"
            placeholder="Time"
            name="taskDueTime"
            onChange={handleTaskInput}
          />
          <button type="submit">Add Task</button>
        </form>
      )}

      <div>
        {isScheduledTaskOpen && <Scheduled />}
        {isInProgressTaskOpen && <InProgress />}
        {isCompletedTaskOpen && <Completed />}
      </div>
    </>
  );
}

export default App;
