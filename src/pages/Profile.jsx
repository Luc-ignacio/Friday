import React, { useEffect, useState } from "react";
import { Button } from "../components/button";
import { auth, db } from "../firebase-config/firebase.js";
import { toast, ToastContainer } from "react-toastify";
import { getDoc, doc } from "firebase/firestore";
import { GetTasks } from "../components/get-tasks.jsx";

function Profile() {
  const [userDetails, setUserDetails] = useState(null);

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

  const signOut = async () => {
    try {
      await auth.signOut();
      window.location.href = "/login";
      toast.success("User signed out successfully");
    } catch (error) {
      console.error("Failed to sign out", error);
      toast.error("Failed to sign out");
    }
  };

  const backToLogin = () => {
    window.location.href = "/login";
  };
  const goToAddTaskPage = () => {
    window.location.href = "/add-task";
  };

  if (userDetails) {
    return (
      <div className="w-[90%] grid grid-cols-1 md:grid-cols-3 bg-[#343434] shadow-lg px-4 py-8 rounded-lg">
        <div className="w-[90%] mx-auto col-span-3">
          <div className="items-center justify-between pb-6 border-b border-[#1a1a1a]">
            <div className="flex items-center gap-5 pb-3">
              <img src="/friday.png" alt="friday logo" className="w-16" />
              <h1 className="text-6xl font-bold">Friday</h1>
            </div>

            <div className="items-center">
              <h3 className="text-xl font-semibold">
                Welcome {userDetails.firstName} {userDetails.lastName}
              </h3>
              <p>
                Your weekend plans start here – keep track, stay organised, and
                make the most of your days off.
              </p>
            </div>
          </div>

          <GetTasks />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-6">
            <Button
              clicked={goToAddTaskPage}
              customStyle={`w-full`}
              text={"Add Task"}
            />
            <Button
              clicked={signOut}
              customStyle={`w-full`}
              text={"Sign Out"}
            />
          </div>
          <ToastContainer />
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

export default Profile;
