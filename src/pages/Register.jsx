import React, { useState } from "react";
import { auth, googleProvider, db } from "../firebase-config/firebase.js";
import { toast } from "react-toastify";
import { Button } from "../components/button.jsx";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { Link } from "react-router-dom";

function Register() {
  const [credentials, setCredentials] = useState({
    fName: "",
    lName: "",
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setCredentials(() => {
      if (name === "fName") {
        return {
          fName: value,
          lName: credentials.lName,
          email: credentials.email,
          password: credentials.password,
        };
      } else if (name === "lName") {
        return {
          fName: credentials.fName,
          lName: value,
          email: credentials.email,
          password: credentials.password,
        };
      } else if (name === "email") {
        return {
          fName: credentials.fName,
          lName: credentials.lName,
          email: value,
          password: credentials.password,
        };
      } else if (name === "password") {
        return {
          fName: credentials.fName,
          lName: credentials.lName,
          email: credentials.email,
          password: value,
        };
      }
    });
  };

  const SignUpWithEmail = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      );

      const user = auth?.currentUser;
      if (user) {
        [
          await setDoc(doc(db, "users", user.uid), {
            email: user.email,
            firstName: credentials.fName,
            lastName: credentials.lName,
          }),
        ];
      }
      toast.success("User signed up successfully");
      window.location.href = "/profile";
    } catch (error) {
      console.error("Failed to sign up", error);
      toast.error("Failed to sign up");
    }
  };

  const SignUpWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      const user = auth?.currentUser;
      if (user) {
        [
          await setDoc(doc(db, "users", user.uid), {
            email: user.email,
            firstName: auth?.currentUser.displayName,
            lastName: "",
          }),
        ];
      }
      toast.success("User signed up successfully");
      window.location.href = "/profile";
    } catch (error) {
      console.error("Failed to sign up with Google", error);
      toast.error("Failed to sign up with Google");
    }
  };

  return (
    <div className="w-[500px] bg-[#343434] shadow-lg px-4 py-8 rounded-lg">
      <div className="flex w-full items-center justify-center gap-5 pb-6 border-b border-[#1a1a1a]">
        <img src="/friday.png" alt="friday logo" className="w-16" />
        <div>
          <h1 className="text-6xl font-bold mb-1">Friday</h1>
        </div>
      </div>

      <form
        className="flex flex-col w-[90%] mx-auto pt-6 text-center"
        onSubmit={SignUpWithEmail}
      >
        <h1 className="text-xl font-semibold">Get Started</h1>
        <p className="mb-8">Create your account now</p>

        <input
          onChange={handleChange}
          name="fName"
          type="text"
          value={credentials.fName}
          className={"bg-gray-300 text-black px-2 py-1 rounded-lg mb-6"}
          placeholder="First Name"
        />
        <input
          onChange={handleChange}
          name="lName"
          type="text"
          value={credentials.lName}
          className={"bg-gray-300 text-black px-2 py-1 rounded-lg mb-6"}
          placeholder="Last Name"
        />
        <input
          onChange={handleChange}
          name="email"
          type="email"
          value={credentials.email}
          className={"bg-gray-300 text-black px-2 py-1 rounded-lg mb-6"}
          placeholder="Email"
        />
        <input
          onChange={handleChange}
          name="password"
          type="password"
          value={credentials.password}
          className={"bg-gray-300 text-black px-2 py-1 rounded-lg mb-6"}
          placeholder="Password"
        />
        <div className="flex flex-1 pb-6 border-b border-[#1a1a1a] relative">
          <Button customStyle={`flex flex-1 justify-center`} text="Sign Up" />
          <p className="absolute px-4 top-5/6 left-1/2 transform -translate-x-1/2 bg-[#343434] text-sm">
            OR
          </p>
        </div>
      </form>

      <Button
        clicked={SignUpWithGoogle}
        customStyle={`mt-6 w-[90%] mx-auto`}
        text="Sign Up With Google"
        img={<img src="/google-logo.png" alt="Google Logo" className="w-10" />}
      />

      <div className="flex gap-1 mt-6 text-sm justify-center">
        <p>Already have an account?</p>
        <Link
          className="text-[#646cff] font-semibold hover:underline"
          to="/login"
        >
          Sign In
        </Link>
      </div>
    </div>
  );
}

export default Register;
