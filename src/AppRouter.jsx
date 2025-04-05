import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import { useEffect, useState } from "react";
import { auth } from "./firebase-config/firebase";
import RedirectLogin from "./components/redirect-login";
import AddTask from "./pages/AddTask";
import EditTask from "./pages/EditTask";
import { NotFound } from "./pages/NotFound";

function AppRouter() {
  const [user, setUser] = useState();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const isSignedIn = auth.onAuthStateChanged((user) => {
      setUser(user);
      setIsLoading(false);
    });

    return () => isSignedIn();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RedirectLogin user={user} />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/profile",
      element: <Profile />,
    },
    {
      path: "/add-task",
      element: <AddTask />,
    },
    {
      path: "/edit-task/:id",
      element: <EditTask />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default AppRouter;
