import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "../hooks/useUserContext";

const SecuredRoutes = () => {
  const {user} = useUserContext();
  return <>{user ? <Outlet /> : <Navigate to={"/login"} />}</>;
};

export default SecuredRoutes;
