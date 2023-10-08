import "./App.css";
import Scheduled from "./components/Scheduled";
import InProgress from "./components/InProgress";
import Completed from "./components/Completed";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import { faRectangleXmark } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

function App() {
  // Handle Click Interactions Between Scheduled, In Progress, and Completed
  const [isScheduledTaskOpen, setIsScheduledTaskOpen] = useState(false);
  const [isInProgressTaskOpen, setIsInProgressTaskOpen] = useState(false);
  const [isCompletedTaskOpen, setIsCompletedTaskOpen] = useState(false);

  function handleShowScheduledTask() {
    setIsScheduledTaskOpen(true);
    setIsInProgressTaskOpen(false);
    setIsCompletedTaskOpen(false);
    setIsAddNewOpen(false);
  }

  function handleShowInProgressTask() {
    setIsScheduledTaskOpen(false);
    setIsInProgressTaskOpen(true);
    setIsCompletedTaskOpen(false);
    setIsAddNewOpen(false);
  }

  function handleShowCompletedTask() {
    setIsScheduledTaskOpen(false);
    setIsInProgressTaskOpen(false);
    setIsCompletedTaskOpen(true);
    setIsAddNewOpen(false);
  }

  // Handle Add New Screen
  const [isAddNewOpen, setIsAddNewOpen] = useState(false);
  function handleAddNew() {
    setIsAddNewOpen(!isAddNewOpen);
    setIsScheduledTaskOpen(false);
    setIsInProgressTaskOpen(false);
    setIsCompletedTaskOpen(false);
  }

  //Handle Clear Every Task
  function handleClearTaks() {
    localStorage.clear();
    setIsScheduledTaskOpen(false);
    setIsInProgressTaskOpen(false);
    setIsCompletedTaskOpen(false);
  }

  // Handle Task Input
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
    if (
      taskData.taskTitle == "" ||
      taskData.taskDetail == "" ||
      taskData.taskDueDate == "" ||
      taskData.taskDueTime == ""
    ) {
      alert("Please input all your task information");
    } else {
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
      setIsScheduledTaskOpen(true);
    }
  }

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <p className="pr-[0px]" onClick={handleAddNew}>
          {isAddNewOpen ? (
            <FontAwesomeIcon
              icon={faRectangleXmark}
              style={{ color: "#6369D9" }}
              size="2xl"
            />
          ) : (
            <FontAwesomeIcon
              icon={faSquarePlus}
              style={{ color: "#6369D9" }}
              size="2xl"
            />
          )}
        </p>
        <p onClick={handleClearTaks}>
          <FontAwesomeIcon
            icon={faTrashCan}
            size="xl"
            style={{ color: "#6369D9" }}
          />
        </p>
      </div>
      <div>
        <ul className="flex items-center justify-between">
          <li>
            <button
              className="bg-[#D3C7F5] text-[#6369D9] py-[5px] px-[15px] rounded-md"
              onClick={handleShowScheduledTask}
            >
              To do
            </button>
          </li>
          <li>
            <button
              className="bg-[#D3C7F5] text-[#6369D9] py-[5px] px-[15px] rounded-md"
              onClick={handleShowInProgressTask}
            >
              In Progress
            </button>
          </li>
          <li>
            <button
              className="bg-[#D3C7F5] text-[#6369D9] py-[5px] px-[15px] rounded-md"
              onClick={handleShowCompletedTask}
            >
              Completed
            </button>
          </li>
        </ul>
      </div>
      {isAddNewOpen && (
        <form onSubmit={handleTaskSubmit} className="mt-[20px]">
          <input
            className="w-[100%] p-[10px] my-[10px] border-2 border-[#6369D9] rounded-full placeholder:text-[#6368d9] text-[#6368d9]"
            type="text"
            placeholder="What do you want to do?"
            name="taskTitle"
            value={taskData.taskTitle}
            onChange={handleTaskInput}
          />
          <br />
          <textarea
            className="w-[100%] p-[10px] my-[10px] border-2 border-[#6369D9] rounded-md placeholder:text-[#6368d9] text-[#6368d9]"
            placeholder="Break it down"
            name="taskDetail"
            value={taskData.taskDetail}
            onChange={handleTaskInput}
          ></textarea>
          <br />
          <input
            className="w-[100%] p-[10px] my-[10px] border-2 border-[#6369D9] rounded-full text-[#6368d9]"
            type="date"
            placeholder="Deadline"
            name="taskDueDate"
            value={taskData.taskDueDate}
            onChange={handleTaskInput}
          />
          <br />
          <input
            className="w-[100%] p-[10px] my-[10px] border-2 border-[#6369D9] rounded-full text-[#6368d9]"
            type="time"
            placeholder="Time"
            name="taskDueTime"
            value={taskData.taskDueTime}
            onChange={handleTaskInput}
          />
          <br />
          <button
            className="bg-[#6368D9] text-[#D1D0F9] text-[16px] text-center w-[100%]  mt-[20px] py-[10px] rounded-md"
            type="submit"
          >
            Add Task
          </button>
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
