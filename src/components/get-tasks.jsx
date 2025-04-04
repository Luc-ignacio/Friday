import React from "react";
import { useEffect, useState } from "react";
import { db } from "../firebase-config/firebase.js";
import { getDocs, collection, doc, deleteDoc } from "firebase/firestore";
import { Button } from "./button.jsx";
import { useNavigate } from "react-router-dom";

export const GetTasks = () => {
  const [tasksList, setTasksList] = useState([]);

  const tasksCollectionRef = collection(db, "tasks");

  const getTasksList = async () => {
    try {
      const data = await getDocs(tasksCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setTasksList(filteredData);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  useEffect(() => {
    getTasksList();
  }, []);

  const deleteTask = async (id) => {
    const taskDoc = doc(db, "tasks", id);
    try {
      await deleteDoc(taskDoc);
      getTasksList();
    } catch (error) {
      console.error("Failed to delete task", error);
    }
  };

  const navigate = useNavigate();

  const goToEditTaskPage = (id) => {
    navigate(`/edit-task/${id}`);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6 text-left pb-6 border-b border-[#1a1a1a]">
      {tasksList.length > 0 ? (
        tasksList.map((task) => {
          return (
            <div
              key={task.id}
              className="flex justify-between items-center rounded-lg px-4 py-8 bg-[#1a1a1a] col-span-1"
            >
              <div className="w-full">
                <h2 className="text-lg">
                  <b>Title: </b>
                  {task.title}
                </h2>
                <p>
                  <b>Due Date: </b>
                  {task.dueDate}
                </p>
                <p>
                  <b>Priority: </b>
                  {task.priority}
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <Button
                  text="Edit"
                  customStyle={"text-sm bg-[#343434] h-10"}
                  clicked={() => goToEditTaskPage(task.id)}
                />
                <Button
                  text="Delete"
                  customStyle={"text-sm bg-[#343434] h-10"}
                  clicked={() => {
                    deleteTask(task.id);
                  }}
                />
              </div>
            </div>
          );
        })
      ) : (
        <p className="col-span-3 border-b-4 border-[#646cff] w-fit text-xl font-semibold">
          Nothing planned yet – Add something fun to get started.
        </p>
      )}
    </div>
  );
};
