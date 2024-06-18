import React from "react";
import { Navigate } from "react-router-dom";
import Login from "../pages/commonPages/Login";
import TwoStep from "../pages/commonPages/TwoStep";
import SignupPage from "@/pages/commonPages/SignupPage";

const publicRoutes = [
  //AuthenticationInner pages
  { path: "/login", component: <Login /> },
  { path: "/two-step", component: <TwoStep /> },
  { path: "*", component: <Navigate to="/login" /> },
  { path: "/sign-up", component: <SignupPage /> },
];

export { publicRoutes };
