import React, { useState } from "react";
import { auth } from "../firebase-config/firebase.js";
import { toast, ToastContainer } from "react-toastify";
import { Button } from "../components/button.jsx";
import { signInWithEmailAndPassword } from "firebase/auth";

function Login() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setCredentials(() => {
      if (name === "email") {
        return {
          email: value,
          password: credentials.password,
        };
      } else if (name === "password") {
        return {
          email: credentials.email,
          password: value,
        };
      }
    });
  };

  const SignInWithEmail = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      );
      window.location.href = "/profile";
      const user = auth.currentUser;
      toast.success("User signed in successfully");
    } catch (error) {
      console.error("Failed to sign in", error);
      toast.error("Failed to sign in");
    }
  };

  // const SignUpWithGoogle = async () => {
  //   try {
  //     await signInWithPopup(auth, googleProvider);
  //     toast.success("User created successfully");
  //     setCredentials({
  //       fName: "",
  //       lName: "",
  //       email: "",
  //       password: "",
  //     });
  //   } catch (error) {
  //     console.error("Failed to sign up with Google", error);
  //     toast.error("Failed to sign up with Google");
  //   }
  // };

  return (
    <div className="w-[500px]">
      <div className="bg-[#343434] shadow-lg px-4 py-8 rounded-lg text-center">
        <div className="flex w-[90%] mx-auto text-left items-center justify-between pb-6 border-b border-[#1a1a1a]">
          <img src="/friday.png" alt="friday logo" className="w-25" />
          <div>
            <h1 className="text-6xl font-bold mb-1">Friday</h1>
            <p className="text">Because weekends deserve better plans</p>
          </div>
        </div>

        <form
          className="flex flex-col w-[90%] mx-auto pt-6"
          onSubmit={SignInWithEmail}
        >
          <h1 className="text-xl font-semibold">Welcome back</h1>
          <p className="mb-8">Please enter your details to sign in</p>

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
          {/* <div className="flex flex-1 pb-6 border-b border-[#1a1a1a] relative"> */}
          <Button customStyle={`flex flex-1 justify-center`} text="Sign In" />
          {/* <p className="absolute px-4 top-5/6 left-1/2 transform -translate-x-1/2 bg-[#343434] text-sm">
            OR
          </p> */}
          {/* </div> */}
        </form>

        <div className="flex gap-1 mt-6 text-sm justify-center">
          <p>Don't have an account?</p>
          <a
            className="text-[#646cff] font-semibold hover:underline"
            href="/register"
          >
            Sign Up
          </a>
        </div>

        {/* <Button
        clicked={SignUpWithGoogle}
        customStyle={`mt-6 w-full`}
        text="Sign In With Google"
        img={
          <img
            src="./src/assets/google-logo.png"
            alt="Google Logo"
            className="w-10"
          />
        }
      /> */}

        <ToastContainer />
      </div>
    </div>
  );
}

export default Login;
