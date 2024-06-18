import React from "react";
import { Navigate } from "react-router-dom";
import { ActivityList } from "@/components/utility/earnedPoints/ActivityList";
import {
  ActivityDetail,
  ProfilePage,
  Dashboard,
  Activity,
  ActivityTransactionList,
  EditProfile,
} from "@/pages/utility/index";

const utilityAuthProtectedRoutes = [
  { path: "/dashboard", component: <Dashboard /> },
  { path: "/activities", component: <Activity /> },
  { path: "/activities/activity-detail/:activityId", component: <ActivityDetail /> },
  { path: "/activities/activity-list", component: <ActivityList /> },
  { path: "/transaction-list/:activityId", component: <ActivityTransactionList /> },
  { path: "/profile", component: <ProfilePage /> },
  { path: "/edit-profile", component: <EditProfile /> },
  { path: "*", component: <Navigate to="/login" /> },
];

export { sentienceUtilityRoutes };
