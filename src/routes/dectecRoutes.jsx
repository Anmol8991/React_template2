import React from "react";
import ViewUser from "@/pages/dectec/users/ViewUser";
import ViewClient from "@/pages/dectec/clients/ViewClients";
import Dashboard from "@/pages/dectec/Dashboard";
import Clients from "@/pages/dectec/clients/Clients";
import Users from "@/pages/dectec/users/Users";
import Payments from "@/pages/dectec/payments/Payments";
import Rewards from "@/pages/dectec/rewards/Rewards";
import Redemption from "@/pages/dectec/redemptions/Redemption";
import Protocols from "@/pages/dectec/protocols/Protocols";
import ViewProtocol from "@/pages/dectec/protocols/ViewProtocol";
import { AddProtocol } from "@/pages/dectec/protocols/AddProtocol";
import { EditProtocol } from "@/pages/dectec/protocols/EditProtocol";
import { AddClient } from "@/pages/dectec/clients/AddClient";
import { EditClient } from "@/pages/dectec/clients/EditClient";
import { AddUser } from "../pages/dectec/users/AddUser";
import { EditUser } from "../pages/dectec/users/EditUser";

// Dashboard

const dectecAuthProtectedRoutes = [
  { path: "/dashboard", component: <Dashboard /> },

  { path: "/protocols", component: <Protocols /> },
  { path: "/view-protocol/:protocolId", component: <ViewProtocol /> },
  { path: "/add-protocol", component: <AddProtocol /> },
  { path: "/edit-protocol/:protocolId", component: <EditProtocol /> },

  { path: "/clients", component: <Clients /> },
  { path: "/add-client", component: <AddClient /> },
  { path: "/view-client/:clientId", component: <ViewClient /> },
  { path: "/edit-client/:clientId", component: <EditClient /> },

  { path: "/users", component: <Users /> },
  { path: "/view-user/:userId", component: <ViewUser /> },
  { path: "/add-user", component: <AddUser /> },
  { path: "/edit-user/:userId", component: <EditUser /> },

  { path: "/payments", component: <Payments /> },
  { path: "/rewards", component: <Rewards /> },
  { path: "/redemption", component: <Redemption /> },
];

export { dectecAuthProtectedRoutes };
