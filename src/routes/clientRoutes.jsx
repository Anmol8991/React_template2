import {
  Dashboard,
  Users,
  ViewActivity,
  Activity,
  ViewUser,
  AddActivity,
} from "@/pages/client";
import { AddUser } from "@/pages/protocol/users/AddUser";

export const clientAuthProtectedRoutes = [
  { path: "/view-user", component: <ViewUser /> },
  { path: "/view-activity", component: <ViewActivity /> },
  { path: "/dashboard", component: <Dashboard /> },
  { path: "/activity", component: <Activity /> },
  { path: "/add-activity", component: <AddActivity /> },
  { path: "/users", component: <Users /> },
  { path: "/add-user", component: <AddUser /> },

];