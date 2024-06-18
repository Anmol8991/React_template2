import React from "react";
import { Routes, Route } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import NonAuthLayout from "@/components/common/layout/NonAuthLayout";

//Layouts
// import NonAuthLayout from "../Layouts/NonAuthLayout";
import VerticalLayout from "@/components/common/layout/index";

//routes
import { publicRoutes } from "./commonRoutes";
import { dectecAuthProtectedRoutes } from "./dectecRoutes";
import { protocolAuthProtectedRoutes } from "./protocolRoutes";
import { utilityAuthProtectedRoutes } from "./utilityRoutes";
import { clientAuthProtectedRoutes } from "./clientRoutes";
import SecuredRoutes from "./SecuredRoutes";
import { useUserContext } from "../hooks/useUserContext";
import { twinUtilityRoute } from "./twinUtilityRoutes";

const Index = () => {
	const user = useUserContext();
	console.log({ userDatauserData: user });
	const protocolName = user && user?.user?.protocolName;
	console.log("===================sdfdfdfdfdfdfdfdfdfdfdfdfdfdf", protocolName);
	const role = user && user?.user?.role;
	const currentRoute =
		role === "dectec_admin"
			? dectecAuthProtectedRoutes
			: role === "client_admin"
			? clientAuthProtectedRoutes
			: role === "protocol_admin"
			? protocolAuthProtectedRoutes
			: role === "end_user" &&
			  protocolName &&
			  protocolName.toLowerCase() === "twin"
			? twinUtilityRoute
			: utilityAuthProtectedRoutes;

	return (
		<>
			<ToastContainer
				position="top-right"
				autoClose={3000}
				hideProgressBar
				newestOnTop
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="colored"
			/>
			<Routes>
				<Route>
					{publicRoutes &&
						Array.isArray(publicRoutes) &&
						publicRoutes?.map((route, idx) => (
							<Route
								path={route.path}
								element={<NonAuthLayout>{route.component}</NonAuthLayout>}
								key={idx}
								exact={true}
							/>
						))}
				</Route>

				<Route element={<SecuredRoutes />}>
					{currentRoute &&
						Array.isArray(currentRoute) &&
						currentRoute?.map((route, idx) => (
							<Route
								path={route.path}
								element={<VerticalLayout>{route.component}</VerticalLayout>}
								key={idx}
							/>
						))}
				</Route>
			</Routes>
		</>
	);
};

export default Index;
