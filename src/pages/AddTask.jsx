import React, { useEffect, useState } from "react";
import { Button } from "../components/button";
import { auth, db } from "../firebase-config/firebase.js";
import { getDoc, doc, addDoc, collection } from "firebase/firestore";

function AddTask() {
  const [userDetails, setUserDetails] = useState(null);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDueDate, setNewTaskDueDate] = useState("");
  const [newTaskPriority, setNewTaskPriority] = useState("Low");

  const tasksReference = collection(db, "tasks");

  const fetchUserData = async () => {
    try {
      auth.onAuthStateChanged(async (user) => {
        const docReference = doc(db, "users", user.uid);
        const docData = await getDoc(docReference);

        if (docData.exists()) {
          setUserDetails(docData.data());
        }
      });
    } catch (error) {
      console.error("User is not signed in", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const backToLogin = () => {
    window.location.href = "/login";
  };

  const addTask = async () => {
    const newTask = {
      title: newTaskTitle,
      dueDate: newTaskDueDate,
      priority: newTaskPriority,
    };

    try {
      await addDoc(tasksReference, newTask);
      window.location.href = "/profile";
    } catch (error) {
      console.error("Error adding task", error);
    }
  };

  if (userDetails) {
    return (
      <div className="w-[500px] bg-[#343434] shadow-lg px-4 py-8 rounded-lg">
        <div className="flex w-[90%] mx-auto items-center justify-center gap-5 pb-6 border-b border-[#1a1a1a]">
          <img src="/friday.png" alt="friday logo" className="w-16" />
          <div>
            <h1 className="text-6xl font-bold mb-1">Friday</h1>
          </div>
        </div>

        <div className="w-[90%] mx-auto">
          <div className="items-center justify-between">
            <div className="flex flex-col gap-4 pt-6">
              <h1 className="text-lg font-semibold text-center">
                Create a new task
              </h1>

              <input
                onChange={(e) => {
                  setNewTaskTitle(e.target.value);
                }}
                className="bg-gray-300 text-black px-2 py-1 rounded-lg"
                type="text"
                name="newTitle"
                placeholder="Enter Task Title"
              />

              <input
                onChange={(e) => {
                  setNewTaskDueDate(e.target.value);
                }}
                className="bg-gray-300 text-black px-2 py-1 rounded-lg"
                type="text"
                name="NewDueDate"
                placeholder="Enter Due Date"
              />

              <select
                onChange={(e) => {
                  setNewTaskPriority(e.target.value);
                }}
                value={newTaskPriority}
                className="bg-gray-300 text-lg text-black px-2 py-1 rounded-lg"
                name="NewPriority"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>

              <Button text="Add Task" clicked={addTask} />
            </div>
          </div>
        </div>
      </div>
    );
  } else if (userDetails === null) {
    return (
      <div className="w-[500px] bg-[#343434] shadow-lg px-4 py-8 rounded-lg">
        <div className="w-[90%] mx-auto text-center">
          <div>
            <h3 className="text-xl font-semibold">You are signed out</h3>
          </div>

          <Button
            clicked={backToLogin}
            customStyle={`mt-6 w-full`}
            text={"Sign In"}
          />
        </div>
      </div>
    );
  } else {
    return (
      <div className="w-[500px] bg-[#343434] shadow-lg px-4 py-8 rounded-lg">
        <div className="w-[90%] mx-auto text-center">
          <div>
            <h3 className="text-xl font-semibold">Loading your details</h3>
          </div>
        </div>
      </div>
    );
  }
}

export default AddTask;
