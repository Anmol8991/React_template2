import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SimpleBar from "simplebar-react";
//import logo
import perk from "@/assets/images/demo/SingularityNetLogo-removebg-preview.png";
import dectec from "@/assets/images/demo/dectec.png";
import sentienceLogoDark from "@/assets/images/demo/Sentience-Logo.png";
import sentienceLogoLight from "@/assets/images/demo/WhiteLogo2.png";
import sophia from "@/assets/images/demo/sophiaVerse4.jpg";
import twinLogo from "@/assets/images/twinLogo.webp";
//Import Components
import VerticalLayout from "./VerticalLayouts/index";
import { Container } from "reactstrap";
const dectecSideBarMenuData = [
	{
		label: "Menu",
		isHeader: true,
	},

	{
		id: "dashboard",
		label: "Dashboard",
		icon: "bx bx-home",
		link: "/dashboard",
		click: function (e) {
			e.preventDefault();
			setIscurrentState("Dashboard");
		},
	},

	{
		id: "protocols",
		label: "Protocols",
		icon: "bx bx-cube-alt",
		link: "/protocols",
		click: function (e) {
			e.preventDefault();
			setIscurrentState("Protocols");
		},
	},

	{
		id: "clients",
		label: "Clients",
		icon: "bx bx-map-pin",
		link: "/clients",
		click: function (e) {
			e.preventDefault();
			setIscurrentState("Clients");
		},
	},

	{
		id: "users",
		label: "Users",
		icon: "bx bx-user-circle",
		link: "/users",
		click: function (e) {
			e.preventDefault();
			setIscurrentState("Users");
		},
	},

	{
		label: "Points",
		isHeader: true,
	},

	{
		id: "payments",
		label: "Payments",
		icon: "bx bx-dollar-circle",
		link: "/payments",
		click: function (e) {
			e.preventDefault();
			setIscurrentState("Payments");
		},
	},

	{
		id: "earned",
		label: "Rewards",
		icon: "bx bx-bar-chart-alt-2",
		link: "/rewards",
		click: function (e) {
			e.preventDefault();
			setIscurrentState("Rewards");
		},
	},

	{
		id: "redemption",
		label: "Redemptions",
		icon: "bx bx-gift",
		link: "/redemption",
		click: function (e) {
			e.preventDefault();
			setIscurrentState("Redemptions");
		},
	},
];

const clientSideBarMenuData = [
	{
		label: "Menu",
		isHeader: true,
	},

	{
		id: "dashboard",
		label: "Dashboard",
		icon: "bx bx-home",
		link: "/dashboard",
		click: function (e) {
			e.preventDefault();
			setIscurrentState("Dashboard");
		},
	},

	{
		id: "activity",
		label: "Activities",
		icon: "bx bx-task",
		link: "/activity",
		click: function (e) {
			e.preventDefault();
			setIscurrentState("Activity");
		},
	},
	{
		id: "users",
		label: "Users",
		icon: "bx bx-user-circle",
		link: "/users",
		click: function (e) {
			e.preventDefault();
			setIscurrentState("Users");
		},
	},
];

const protocolSideBarMenuData = [
	{
		label: "Menu",
		isHeader: true,
	},
	{
		id: "dashboard",
		label: "Dashboard",
		icon: "bx bx-home",
		link: "/dashboard",
		click: function (e) {
			e.preventDefault();
			setIscurrentState("Dashboard");
		},
	},
	{
		id: "activities",
		label: "Activities",
		icon: "bx bx-map-pin",
		link: "/activities",
		click: function (e) {
			e.preventDefault();
			setIscurrentState("Activities");
		},
	},

	{
		id: "clients",
		label: "Clients",
		icon: "bx bx-map-pin",
		link: "/clients",
		click: function (e) {
			e.preventDefault();
			setIscurrentState("Clients");
		},
	},

	{
		id: "users",
		label: "Users",
		icon: "bx bx-user-circle",
		link: "/users",
		click: function (e) {
			e.preventDefault();
			setIscurrentState("Users");
		},
	},

	{
		label: "Points",
		isHeader: true,
	},

	{
		id: "earned",
		label: "Earned",
		icon: "bx bx-bar-chart-alt-2",
		link: "/earned",
		click: function (e) {
			e.preventDefault();
			setIscurrentState("Earned");
		},
	},

	{
		id: "redemption",
		label: "Redemptions",
		icon: "bx bx-gift",
		link: "/redemption",
		click: function (e) {
			e.preventDefault();
			setIscurrentState("Redemption");
		},
	},
];

const Sidebar = ({ layoutType }) => {
	const role = JSON.parse(localStorage.getItem("user_data"))?.role;
	const protocolName = JSON.parse(
		localStorage.getItem("user_data")
	)?.protocolName;

	const [isPreference, setIsPreference] = useState(false);
	const [iscurrentState, setIscurrentState] = useState("Preferences");

	// console.log(localStorage.getItem("role"));
	useEffect(() => {
		document.body.classList.remove("twocolumn-panel");
		if (iscurrentState !== "Preferences") {
			setIsPreference(false);
		}
	}, [isPreference]);

	const utilitySideBarMenuData = [
		{
			label: "Menu",
			isHeader: true,
		},
		{
			id: "dashboard",
			label: "Dashboard",
			icon: "bx bx-home",
			link: "/dashboard",
			click: function (e) {
				e.preventDefault();
				setIscurrentState("Dashboard");
			},
		},
		{
			id: "Activities",
			label: "Activities",
			icon: "bx bx-task",
			link: "/activities",
			click: function (e) {
				e.preventDefault();
				setIscurrentState("Activities");
			},
		},
		{
			id: "Earned Points",
			label: "Earned Points",
			icon: "bx bx-coin-stack",
			link: "/activities/activity-list",
			click: function (e) {
				e.preventDefault();
				setIscurrentState("Earned Points");
			},
		},
		{
			id: "profile",
			label: "Profile",
			icon: "bx bx-user-circle",
			link: "/profile",
			click: function (e) {
				e.preventDefault();
				setIscurrentState("Profile");
			},
		},
		{
			id: "referrals",
			label: "Referral",
			icon: "ri-equalizer-line",
			link: "/activities/refer-activity",
			stateVariables: isPreference,
			click: function (e) {
				e.preventDefault();
				setIsPreference(!isPreference);
				setIscurrentState("Preferences");
			},
			subItems: [
				{
					id: "referrals",
					label: "Referral",
					link: "/activities/refer-activity",
					parentId: "preferences",
				},
			],
		},
	];

	const twinUtilitySidebarMenuData = [
		{
			label: "Menu",
			isHeader: true,
		},
		{
			id: "dashboard",
			label: "Dashboard",
			icon: "bx bx-home",
			link: "/dashboard",
			click: function (e) {
				e.preventDefault();
				setIscurrentState("dashboard");
			},
		},
		{
			id: "activitiesList",
			label: "Earn Points",
			icon: "bx bx-task",
			link: "/activities",
			click: function (e) {
				e.preventDefault();
				setIscurrentState("activitiesList");
			},
		},
		{
			id: "Activities",
			label: "Earned Points",
			icon: "bx bx-coin-stack",
			link: "/activities/activity-list",
			click: function (e) {
				e.preventDefault();
				setIscurrentState("Activities");
			},
		},
		{
			id: "dataUploads",
			label: "Data Uploads",
			icon: "bx bx-upload",
			link: "/activities/data-uploads",
			click: function (e) {
				e.preventDefault();
				setIscurrentState("dataUploads");
			},
		},
		{
			id: "trainings",
			label: "Trainings",
			icon: "bx bx-book-reader",
			link: "/trainings",
			click: function (e) {
				e.preventDefault();
				setIscurrentState("trainings");
			},
		},
		{
			id: "profile",
			label: "Profile",
			icon: "bx bx-user-circle",
			link: "/profile",
			click: function (e) {
				e.preventDefault();
				setIscurrentState("profile");
			},
		},
		{
			id: "referrals",
			label: "Referrals",
			icon: "bx bx-share",
			link: "/activities/refer-activity",
			stateVariables: isPreference,
			click: function (e) {
				e.preventDefault();
				setIsPreference(!isPreference);
				setIscurrentState("Referrals");
			},

			// subItems: [
			//   {
			//     id: "referrals",
			//     label: "Referral",
			//     link: "/activities/refer-activity",
			//     parentId: "preferences",
			//   },
			// ]
		},
	];
	useEffect(() => {
		var verticalOverlay = document.getElementsByClassName("vertical-overlay");
		if (verticalOverlay) {
			verticalOverlay[0].addEventListener("click", function () {
				document.body.classList.remove("vertical-sidebar-enable");
			});
		}
	});

	const addEventListenerOnSmHoverMenu = () => {
		// add listener Sidebar Hover icon on change layout from setting
		if (
			document.documentElement.getAttribute("data-sidebar-size") === "sm-hover"
		) {
			document.documentElement.setAttribute(
				"data-sidebar-size",
				"sm-hover-active"
			);
		} else if (
			document.documentElement.getAttribute("data-sidebar-size") ===
			"sm-hover-active"
		) {
			document.documentElement.setAttribute("data-sidebar-size", "sm-hover");
		} else {
			document.documentElement.setAttribute("data-sidebar-size", "sm-hover");
		}
	};
	return (
		<React.Fragment>
			<div className="app-menu navbar-menu custom-sidebar">
				<div className="navbar-brand-box">
					<Link to="/" className="logo logo-dark">
						<span className="logo-sm">
							<img
								src={
									role === "dectec_admin"
										? dectec
										: role === "client_admin"
										? perk
										: role === "protocol_admin"
										? twinLogo
										: role === "end_user" &&
										  protocolName &&
										  protocolName.toLowerCase() === "twin"
										? twinLogo
										: sentienceLogoDark
								}
								alt=""
								className="rounded-circle   avatar-xs shadow"
							/>
						</span>
						<span className="logo-lg">
							<img
								src={
									role === "dectec_admin"
										? dectec
										: role === "client_admin"
										? perk
										: role === "protocol_admin"
										? twinLogo
										: role === "end_user" &&
										  protocolName &&
										  protocolName.toLowerCase() === "twin"
										? twinLogo
										: sentienceLogoDark
								}
								alt=""
								className="rounded-circle   avatar-xs shadow"
							/>
						</span>
					</Link>

					<Link to="/" className="logo logo-light">
						<span className="logo-sm">
							<img
								src={
									role === "dectec_admin"
										? dectec
										: role === "client_admin"
										? perk
										: role === "protocol_admin"
										? twinLogo
										: role === "end_user" &&
										  protocolName &&
										  protocolName.toLowerCase() === "twin"
										? twinLogo
										: sentienceLogoLight
								}
								alt=""
								className="rounded-circle   avatar-xs shadow"
							/>
						</span>
						<span className="logo-lg">
							<img
								src={
									role === "dectec_admin"
										? dectec
										: role === "client_admin"
										? perk
										: role === "protocol_admin"
										? twinLogo
										: role === "end_user" &&
										  protocolName &&
										  protocolName.toLowerCase() === "twin"
										? twinLogo
										: sentienceLogoLight
								}
								alt=""
								className="rounded-circle   avatar-xs shadow"
							/>
						</span>
					</Link>
					<button
						onClick={addEventListenerOnSmHoverMenu}
						type="button"
						className="btn btn-sm p-0 fs-20 header-item float-end btn-vertical-sm-hover"
						id="vertical-hover"
					>
						<i className="ri-record-circle-line"></i>
					</button>
				</div>
				<React.Fragment>
					<SimpleBar id="scrollbar" className="h-100">
						<Container fluid>
							<div id="two-column-menu"></div>
							<ul className="navbar-nav" id="navbar-nav">
								<VerticalLayout
									layoutType={layoutType}
									sidebarMenuData={
										role === "dectec_admin"
											? dectecSideBarMenuData
											: role === "client_admin"
											? clientSideBarMenuData
											: role === "protocol_admin"
											? protocolSideBarMenuData
											: role === "end_user" &&
											  protocolName &&
											  protocolName.toLowerCase() === "twin"
											? twinUtilitySidebarMenuData
											: utilitySideBarMenuData
									}
								/>
							</ul>
						</Container>
					</SimpleBar>
					<div className="sidebar-background"></div>
				</React.Fragment>
			</div>
			<div className="vertical-overlay"></div>
		</React.Fragment>
	);
};

export default Sidebar;
