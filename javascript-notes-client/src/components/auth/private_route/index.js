import React from "react";
import { Navigate, Outlet } from "react-router-dom";

//this function will recieve the component called by the router and all the rest of the information passed to it (like path, exact, etc)
const PrivateRoute = () => {
  const user = localStorage.getItem("user");
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
