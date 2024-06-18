import React from "react";
import { ViewUser, Users, Earned, Redemption } from "@/pages/protocol";

import Dashboard from "../pages/protocol/Dashboard";
import { AddActivity } from "@/pages/protocol/activities/AddActivity";
import Activities from "../pages/protocol/activities/Activities";
import ViewActivity from "../pages/protocol/activities/ViewActivity";
import { EditActivity } from "../pages/protocol/activities/EditActivity";
import { AddUser } from "../pages/protocol/users/AddUser";
import { EditUser } from "../pages/protocol/users/EditUser";
import Clients from "../pages/protocol/clients/Clients.jsx";
import AddClient from "../pages/protocol/clients/AddClient.jsx";
import ViewClient from "../pages/protocol/clients/ViewClients.jsx";
import EditClient from "../pages/protocol/clients/EditClient.jsx";

const protocolAuthProtectedRoutes = [
	{ path: "/view-user", component: <ViewUser /> },
	// { path: "/view-client", component: <ViewClient /> },
	{ path: "/dashboard", component: <Dashboard /> },

	{ path: "/clients", component: <Clients /> },
	{ path: "/add-client", component: <AddClient /> },
	{ path: "/view-client/:clientId", component: <ViewClient /> },
	{ path: "/edit-client/:clientId", component: <EditClient /> },

	{ path: "/users", component: <Users /> },
	{ path: "/view-user/:userId", component: <ViewUser /> },
	{ path: "/edit-user/:userId", component: <EditUser /> },
	{ path: "/earned", component: <Earned /> },
	{ path: "/redemption", component: <Redemption /> },
	{ path: "/add-user", component: <AddUser /> },
	{ path: "/activities", component: <Activities /> },
	{ path: "/add-activity", component: <AddActivity /> },
	{ path: "/view-activity", component: <ViewActivity /> },
	{ path: "/edit-activity", component: <EditActivity /> },
];

export { protocolAuthProtectedRoutes };
