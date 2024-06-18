import React from "react";
import { ActivityList } from "@/components/utilities/twin/earnedPoints/ActivityList";
import {
	Activity,
	UploadData,
	ActivityTransactionList,
	Dashboard,
	DataUploads,
	EditProfile,
	ProfilePage,
	UploadDetail,
	LearningActivity,
	EventActivity,
	ReferActivity,
} from "../pages/utilities/twin";
import EventRegisterForm from "../pages/utilities/twin/activity/EventRegisterForm";
import DataUploadsActivity from "../pages/utilities/twin/activity/DataUploadsActivity";
import LearningContent from "../pages/utilities/twin/activity/LearningContent";
import Trainings from "../pages/utilities/twin/trainings/Trainings";
import TrainingContent from "../pages/utilities/twin/trainings/TrainingContent";
import AllTrainingContent from "../pages/utilities/twin/trainings/AllTrainingContent.jsx";

const twinUtilityRoute = [
	{ path: "/dashboard", component: <Dashboard /> },
	{ path: "/activities", component: <Activity /> },
	{
		path: "/activities/upload-data/:activityId",
		component: <UploadData />,
	},
	{ path: "/activities/activity-list", component: <ActivityList /> },
	{
		path: "/transaction-list/:categoryId",
		component: <ActivityTransactionList />,
	},
	{ path: "/activities/data-uploads", component: <DataUploads /> },
	{
		path: "/activities/learn-activity/:activityId",
		component: <LearningActivity />,
	},
	{
		path: "/register-event/:activityId",
		component: <EventRegisterForm />,
	},
	{
		path: "/learning-content/:activityId",
		component: <LearningContent />,
	},
	{ path: "/upload-detail/:fileId", component: <UploadDetail /> },
	{
		path: "/activities/refer-activity",
		component: <ReferActivity />,
	},
	{
		path: "/activities/upload-activity/:activityId",
		component: <DataUploadsActivity />,
	},
	{
		path: "/activities/event-activity/:activityId",
		component: <EventActivity />,
	},

	{ path: "/profile", component: <ProfilePage /> },
	{ path: "/edit-profile", component: <EditProfile /> },
	{ path: "/trainings", component: <Trainings /> },
	{ path: "/all-trainings/:itemId", component: <AllTrainingContent /> },
	{ path: "/trainings/:trainingId", component: <TrainingContent /> },
];

export { twinUtilityRoute };
