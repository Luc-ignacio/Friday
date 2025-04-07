import React, { useEffect, useState } from "react";
import { Button } from "../components/button.jsx";
import { auth, db } from "../firebase-config/firebase.js";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import logo from "/friday.png";

function EditTask() {
  const [userDetails, setUserDetails] = useState(null);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDueDate, setNewTaskDueDate] = useState("");
  const [newTaskPriority, setNewTaskPriority] = useState("Low");

  const taskId = useParams();

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
    fetchTaskData(taskId.id);
  }, []);

  const [task, setTask] = useState();

  const fetchTaskData = async (id) => {
    const taskReference = doc(db, "tasks", id);
    try {
      const taskData = await getDoc(taskReference);
      if (taskData.exists()) {
        setTask(taskData.data());
      }
    } catch (error) {
      console.error("Error fetching task data", error);
    }
  };

  const editTask = async (id) => {
    const taskDoc = doc(db, "tasks", id);

    try {
      await updateDoc(taskDoc, {
        title: newTaskTitle,
        dueDate: newTaskDueDate,
        priority: newTaskPriority,
      });
      window.location.href = "/profile";
      toast.success("Task edited successfully");
    } catch (error) {
      console.error("Failed to edit task", error);
      toast.error("Failed to edit task");
    }
  };

  if (userDetails) {
    return (
      <div className="w-[95vw] md:w-[500px] bg-[#343434] shadow-lg px-4 py-8 rounded-lg">
        <div className="flex w-[95%] mx-auto items-center justify-center gap-6 pb-6 border-b border-[#1a1a1a]">
          <img src={logo} alt="friday logo" className="w-15 md:w-20" />
          <div>
            <h1 className="text-5xl md:text-6xl font-bold mb-1">Friday</h1>
          </div>
        </div>

        <div className="w-[95%] mx-auto">
          <div className="items-center justify-between">
            <div className="flex flex-col gap-4 pt-6">
              <h1 className="text-lg font-semibold text-center">
                Edit this task
              </h1>

              <input
                onChange={(e) => {
                  setNewTaskTitle(e.target.value);
                }}
                className="bg-gray-300 text-black px-2 py-1 rounded-lg"
                type="text"
                name="newTitle"
                placeholder={task.title}
              />

              <input
                onChange={(e) => {
                  setNewTaskDueDate(e.target.value);
                }}
                className="bg-gray-300 text-black px-2 py-1 rounded-lg"
                type="text"
                name="NewDueDate"
                placeholder={task.dueDate}
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

              <Button
                text="Edit Task"
                clicked={() => {
                  editTask(taskId.id);
                }}
              />
              <Button
                text="Cancel"
                clicked={() => {
                  window.location.href = "/profile";
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <p>Loading...</p>;
  }
}

export default EditTask;
