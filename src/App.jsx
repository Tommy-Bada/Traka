import "./App.css";
// import Control from "./components/Control";
import Scheduled from "./components/Scheduled";
import InProgress from "./components/InProgress";
import Completed from "./components/Completed";
import { useState } from "react";

function App() {
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

  const [isAddNewOpen, setIsAddNewOpen] = useState(false);
  function handleAddNew() {
    setIsAddNewOpen(!isAddNewOpen);
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
        <form>
          <input type="text" placeholder="What do you want to do?" />
          <input type="paragraph" placeholder="Break it down" />
          <input type="date" placeholder="Deadline" />
          <input type="time" placeholder="Time" />
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