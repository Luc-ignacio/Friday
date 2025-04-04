import { Navigate } from "react-router-dom";

const RedirectLogin = ({ user }) => {
  if (user === undefined) {
    return <p>Loading...</p>;
  } else {
    return user ? <Navigate to="/profile" /> : <Navigate to="/login" />;
  }
};

export default RedirectLogin;
