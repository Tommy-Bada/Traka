import "./App.css";
import Scheduled from "./components/Scheduled";
import InProgress from "./components/InProgress";
import Completed from "./components/Completed";
import google from "./assets/google.png";
import { useEffect, useState } from "react";

import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

function App() {
  const firebaseConfig = {
    apiKey: "AIzaSyAK53gEP6MQ4ctlY7vSiFbE0UUKgb29zF8",
    authDomain: "traka-a32ec.firebaseapp.com",
    projectId: "traka-a32ec",
    storageBucket: "traka-a32ec.appspot.com",
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  //Handle User Sign Up, Sign In and Sign Out
  const [isUserSignedIn, setIsUserSignedIn] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const handleAuthenticationFormChange = (event) => {
    setUserData((prevUserData) => {
      return {
        ...prevUserData,
        [event.target.name]: event.target.value,
      };
    });
  };

  //Create Account with Email and Password
  function authCreateAccountWithEmail() {
    const email = userData.email;
    const password = userData.password;
    if (email == "" || password == "") {
      alert("Please input an email and password for your account");
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          setIsUserSignedIn(true);
          setUserData({
            email: "",
            password: "",
          });
          if (userCredential.user.displayName !== null) {
            const parts = userCredential.user.displayName.split(" ");
            setFirstName(parts[0]);
          }
        })
        .catch((error) => {
          console.error(error.message);
          alert(error.message);
        });
    }
  }

  //Sign In with Email and Password
  function authSignInWithEmail() {
    const email = userData.email;
    const password = userData.password;
    if (email == "" || password == "") {
      alert("Please input your email and password to sign in");
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          setIsUserSignedIn(true);
          setUserData({
            email: "",
            password: "",
          });
          if (userCredential.user.displayName !== null) {
            const parts = userCredential.user.displayName.split(" ");
            setFirstName(parts[0]);
          }
        })
        .catch((error) => {
          console.error(error.message);
          alert(
            "It looks like you're not a registered user. Get started by creating an account."
          );
        });
    }
  }

  //Sign Out
  function authSignOut() {
    signOut(auth)
      .then(() => {
        setIsUserSignedIn(false);
      })
      .catch((error) => {
        console.error(error.message);
        alert(error.message);
      });
  }

  //Check Auth State to fetch some details
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsUserSignedIn(true);
      } else {
        setIsUserSignedIn(false);
      }
    });
  }, []);

  //Sign in with google
  function authSignInWithGoogle() {
    signInWithPopup(auth, provider)
      .then((result) => {
        setIsUserSignedIn(true);
        setUserData({
          email: "",
          password: "",
        });
        if (result.user.displayName !== null) {
          const parts = result.user.displayName.split(" ");

          setFirstName(parts[0]);
        }
      })
      .catch((error) => {
        console.error(error.message);
        alert(error.message);
      });
  }

  //Show name when signed in
  const [firstName, setFirstName] = useState("there");

  // Handle Click Interactions Between Scheduled, In Progress, and Completed
  const [isScheduledTaskOpen, setIsScheduledTaskOpen] = useState(false);
  const [isInProgressTaskOpen, setIsInProgressTaskOpen] = useState(false);
  const [isCompletedTaskOpen, setIsCompletedTaskOpen] = useState(false);

  //Function to show scheduled task
  function handleShowScheduledTask() {
    setIsScheduledTaskOpen(true);
    setIsInProgressTaskOpen(false);
    setIsCompletedTaskOpen(false);
    setIsAddNewOpen(false);
  }

  //Function to show tasks in progress
  function handleShowInProgressTask() {
    setIsScheduledTaskOpen(false);
    setIsInProgressTaskOpen(true);
    setIsCompletedTaskOpen(false);
    setIsAddNewOpen(false);
  }
  //Function to show completed tasks
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

  // Handle Task Submit
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
      tasks.push(taskData);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      setIsAddNewOpen(false);
      setIsScheduledTaskOpen(true);
    }
  }

  return (
    <>
      {isUserSignedIn ? (
        <section id="logged-in-view">
          <p className="mb-[1rem]">
            Hey {firstName}, what do you want to do today?
          </p>
          <div className="flex justify-between items-center mb-8">
            <p className="pr-[0px]" onClick={handleAddNew}>
              {isAddNewOpen ? (
                <p className="text-center bg-[#FF9F9F] text-[16px] px-[15px] py-[5px] rounded-md mb-[10px] shadow-[0px_2px_0px_0px_#000000] border-[3px] border-black">
                  Cancel
                </p>
              ) : (
                <p className="text-center bg-[#62EEA8] text-[16px] px-[15px] py-[5px] rounded-md mb-[10px] shadow-[0px_2px_0px_0px_#000000] border-[3px] border-black">
                  Add Task
                </p>
              )}
            </p>

            <p
              onClick={authSignOut}
              className=" text-center bg-[#FF9F9F] text-[16px] px-[15px] py-[5px] rounded-md mb-[10px] shadow-[0px_2px_0px_0px_#000000] border-[3px] border-black"
            >
              Sign Out
            </p>
          </div>

          <div>
            {isAddNewOpen && (
              <form onSubmit={handleTaskSubmit} className="my-[20px]">
                <input
                  className="w-[100%] p-[15px] text-[16px] mb-[10px]  rounded-md placeholder:text-[#747E79] shadow-[3px_3px_3px_1px_rgba(0,0,0,0.25)]"
                  type="text"
                  placeholder="What do you want to do?"
                  name="taskTitle"
                  value={taskData.taskTitle}
                  onChange={handleTaskInput}
                />
                <br />
                <textarea
                  className="w-[100%] p-[15px] text-[16px] mb-[10px] rounded-md placeholder:text-[#747E79] shadow-[3px_3px_3px_1px_rgba(0,0,0,0.25)]"
                  placeholder="Break it down"
                  name="taskDetail"
                  value={taskData.taskDetail}
                  onChange={handleTaskInput}
                ></textarea>
                <br />
                <input
                  className="w-[100%] p-[15px] text-[16px] mb-[10px] rounded-md placeholder:text-[#747E79] shadow-[3px_3px_3px_1px_rgba(0,0,0,0.25)]"
                  type="date"
                  onFocus={(e) => (e.target.type = "date")}
                  onBlur={(e) => (e.target.type = "text")}
                  placeholder="Which day is your task due?"
                  name="taskDueDate"
                  value={taskData.taskDueDate}
                  onChange={handleTaskInput}
                />
                <br />
                <input
                  className="w-[100%] p-[15px] text-[16px] mb-[10px] rounded-md placeholder:text-[#747E79] shadow-[3px_3px_3px_1px_rgba(0,0,0,0.25)]"
                  type="time"
                  onFocus={(e) => (e.target.type = "time")}
                  onBlur={(e) => (e.target.type = "text")}
                  placeholder="What time is your task due?"
                  name="taskDueTime"
                  value={taskData.taskDueTime}
                  onChange={handleTaskInput}
                />
                <br />
                <button
                  className="w-[100%] text-center bg-[#62EEA8] text-[16px] p-[10px] rounded-md mb-[10px] shadow-[0px_4px_0px_0px_#000000] border-[3px] border-black"
                  type="submit"
                >
                  Add Task
                </button>
              </form>
            )}
          </div>
          <div>
            <ul className="sm:flex-col ">
              <li>
                <button
                  className={`${
                    isScheduledTaskOpen ? "bg-black" : "bg-[#fff6e8]"
                  } ${
                    isScheduledTaskOpen ? "text-[#fff6e8]" : "text-black"
                  } p-[10px] rounded-md w-[100%] mb-[20px] text-[18px] border-[3px] border-black`}
                  onClick={handleShowScheduledTask}
                >
                  To do
                </button>
              </li>
              <li>
                <button
                  className={`${
                    isInProgressTaskOpen ? "bg-black" : "bg-[#fff6e8]"
                  } ${
                    isInProgressTaskOpen ? "text-[#fff6e8]" : "text-black"
                  } p-[10px] rounded-md w-[100%] mb-[20px] text-[18px] border-[3px] border-black`}
                  onClick={handleShowInProgressTask}
                >
                  In Progress
                </button>
              </li>
              <li>
                <button
                  className={`${
                    isCompletedTaskOpen ? "bg-black" : "bg-[#fff6e8]"
                  } ${
                    isCompletedTaskOpen ? "text-[#fff6e8]" : "text-black"
                  } p-[10px] rounded-md w-[100%] mb-[20px] text-[18px] border-[3px] border-black`}
                  onClick={handleShowCompletedTask}
                >
                  Completed
                </button>
              </li>
            </ul>
          </div>
          <div>
            {isScheduledTaskOpen && <Scheduled />}
            {isInProgressTaskOpen && <InProgress />}
            {isCompletedTaskOpen && <Completed />}
          </div>
          <button
            onClick={handleClearTaks}
            className="w-[100%] text-center bg-[#FF9F9F] text-[18px] p-[15px] rounded-md mb-[10px] shadow-[0px_5px_0px_0px_#000000] border-[3px] border-black"
          >
            Clear All
          </button>
        </section>
      ) : (
        <section>
          <h1 className="font-black text-[48px] mb-[30px]">Taska</h1>
          <div
            onClick={authSignInWithGoogle}
            className="w-[100%] flex items-center justify-center bg-white p-[15px] shadow-[3px_3px_3px_1px_rgba(0,0,0,0.25)] mb-[20px] rounded-md"
          >
            <div className="mr-[10px] ">
              <img src={google} alt="google icon" className="w-[24px]" />
            </div>
            <p className="text-[16px]">Sign in with Google</p>
          </div>

          <div className="">
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-[100%] p-[15px] text-[16px] mb-[10px] border-[3px] border-black rounded-md "
              value={userData.email}
              onChange={handleAuthenticationFormChange}
            />
            <br />
            <input
              name="password"
              type="password"
              placeholder="Password"
              className="w-[100%] p-[15px] text-[16px] mb-[10px] border-[3px] border-black rounded-md "
              value={userData.password}
              onChange={handleAuthenticationFormChange}
            />
            <br />

            <button
              onClick={authSignInWithEmail}
              className="w-[100%] text-center bg-[#FFDE00] text-[16px] p-[15px] rounded-md mb-[10px] shadow-[0px_5px_0px_0px_#000000] border-[3px] border-black"
            >
              Sign in
            </button>
            <br />
            <button
              onClick={authCreateAccountWithEmail}
              className="w-[100%] text-center bg-[#FFE769] text-[16px] p-[15px] rounded-md mb-[10px] shadow-[0px_5px_0px_0px_#000000] border-[3px] border-black"
            >
              Create Account
            </button>
          </div>
        </section>
      )}
    </>
  );
}

export default App;
