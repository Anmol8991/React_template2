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
  LearningActivity,
  ReferActivity,
  EventActivity,
} from "../pages/utility";
import EventRegisterForm from "../pages/utilities/twin/activity/EventRegisterForm";

const utilityAuthProtectedRoutes = [
  { path: "/dashboard", component: <Dashboard /> },
  { path: "/activities", component: <Activity /> },
  {
    path: "/activities/activity-detail/:activityId",
    component: <ActivityDetail />,
  },
  { path: "/activities/activity-list", component: <ActivityList /> },
  {
    path: "/activities/refer-activity",
    component: <ReferActivity />,
  },
  {
    path: "/activities/event-activity/:activityId",
    component: <EventActivity />,
  },
  {
    path: "/register-event",
    component: <EventRegisterForm />,
  },
  {
    path: "/activities/activity-page/:activityId",
    component: <LearningActivity />,
  },
  {
    path: "/transaction-list/:activityId",
    component: <ActivityTransactionList />,
  },
  { path: "/profile", component: <ProfilePage /> },
  { path: "/edit-profile", component: <EditProfile /> },
  { path: "*", component: <Navigate to="/login" /> },
];

export { utilityAuthProtectedRoutes };
