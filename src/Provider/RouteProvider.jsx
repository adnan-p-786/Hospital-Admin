import { Navigate } from "react-router-dom";

export const RouteProtect = ({ children }) => {
    const token = localStorage.getItem("token");
    if (token) {
        return <>{children}</>;
    } else {
        return <Navigate to={"/login"} />;
    }
};


export const LoginProtect = ({ children }) => {
  const token = localStorage.getItem("token");
  if (token) {
    return <Navigate to={"/"} />;
  } else {
    return <>{children}</>;
  }
};