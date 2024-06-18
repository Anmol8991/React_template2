import React, { useState } from "react";
import LightDark from "./LightDark";

//import Components
import ProfileDropdown from "./ProfileDropdown";
import { getWalletAddress, truncateString } from "../../../utils/commonHelper";
import { notify } from "../../../utils/toastify";
import { useUserContext } from "../../../hooks/useUserContext";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { updateWalletAddress } from "../../../api/utilityApi";
import Loader from "../Loader";

const NavHeader = ({
	onChangeLayoutMode,
	leftSidebarType,
	layoutModeType,
	headerClass,
	navTitle,
	navRole,
	navLogo,
}) => {
	const { user, setUser, walletAddress, setWalletAddress } = useUserContext();

	const [replaceWallet, setReplaceWallet] = useState({
		message: "",
		walletId: "",
	});

	const [connectingWallet, setConnectingWallet] = useState(false);
	const toggleMenuBtn = () => {
		var windowSize = document.documentElement.clientWidth;
		if (windowSize > 767)
			document.querySelector(".hamburger-icon").classList.toggle("open");

		//For collapse horizontal menu
		if (document.documentElement.getAttribute("data-layout") === "horizontal") {
			document.body.classList.contains("menu")
				? document.body.classList.remove("menu")
				: document.body.classList.add("menu");
		}

		//For collapse vertical menu
		if (document.documentElement.getAttribute("data-layout") === "vertical") {
			if (windowSize < 1025 && windowSize > 767) {
				document.body.classList.remove("vertical-sidebar-enable");
				document.documentElement.getAttribute("data-sidebar-size") === "sm"
					? document.documentElement.setAttribute("data-sidebar-size", "")
					: document.documentElement.setAttribute("data-sidebar-size", "sm");
			} else if (windowSize > 1025) {
				document.body.classList.remove("vertical-sidebar-enable");
				document.documentElement.getAttribute("data-sidebar-size") === "lg"
					? document.documentElement.setAttribute("data-sidebar-size", "sm")
					: document.documentElement.setAttribute("data-sidebar-size", "lg");
			} else if (windowSize <= 767) {
				document.body.classList.add("vertical-sidebar-enable");
				document.documentElement.setAttribute("data-sidebar-size", "lg");
			}
		}

		//Two column menu
		if (document.documentElement.getAttribute("data-layout") === "twocolumn") {
			document.body.classList.contains("twocolumn-panel")
				? document.body.classList.remove("twocolumn-panel")
				: document.body.classList.add("twocolumn-panel");
		}
	};

	const connectWallet = () => {
		if (replaceWallet.walletId) {
			setConnectingWallet(true);
			sessionStorage.setItem("walletAddress", replaceWallet.walletId);
			setUser((current) => {
				return { ...current, walletId: replaceWallet?.walletId };
			});

			setWalletAddress(replaceWallet.walletId);
			notify("Successfully connected to TWIN wallet", true);
			updateWalletAddress(replaceWallet.walletId)
				.catch((e) => {
					notify(e.message, false);
				})
				.finally(() => {
					setConnectingWallet(false);
					setReplaceWallet({ message: "", walletId: "" });
				});
		}
	};

	const WalletBtn = () => {
		return (
			<button
				style={{ height: "max-content" }}
				className="btn py-2 btn-primary px-3 d-flex align-items-center gap-2"
				onClick={async () => {
					await getWalletAddress(
						setWalletAddress,
						setUser,
						replaceWallet,
						setReplaceWallet
					);
				}}
			>
				<i className="bx bx-wallet-alt"></i>
				<span>{user.walletId ? "Change Wallet" : "Connect Wallet"}</span>
			</button>
		);
	};
	return (
		<React.Fragment>
			<Modal
				centered
				isOpen={replaceWallet?.message === "show"}
				toggle={() => {
					setReplaceWallet(null);
				}}
			>
				<ModalHeader className="w-100 text-center flex justify-content-center">
					Replace wallet?
				</ModalHeader>

				<ModalBody>
					{connectingWallet ? (
						<Loader />
					) : (
						<div className="text-center">
							<i class="bx bx-error fs-1 text-warning"></i>
							<p>
								A TWIN wallet already connected with your account. Do you want
								to use this new wallet and replace your existing wallet?
							</p>
						</div>
					)}
				</ModalBody>

				<ModalFooter className="flex justify-content-center align-items-center gap-2">
					<button onClick={connectWallet} className="btn btn-primary">
						Yes
					</button>
					<button
						onClick={() => {
							setReplaceWallet(null);
						}}
						className="btn btn-light"
						disabled={connectingWallet}
					>
						No
					</button>
				</ModalFooter>
			</Modal>
			<header id="page-topbar" className={headerClass}>
				<div className="layout-width">
					<div className="navbar-header">
						<div className="d-flex gap-2 align-items-center">
							<button
								onClick={toggleMenuBtn}
								type="button"
								className="btn btn-sm px-3 fs-16 header-item vertical-menu-btn topnav-hamburger shadow-none"
								id="topnav-hamburger-icon"
							>
								<span className="hamburger-icon">
									<span></span>
									<span></span>
									<span></span>
								</span>
							</button>
							{user?.role === "end_user" && <WalletBtn />}
						</div>

						<div className="d-flex align-items-center gap-2">
							{user?.role === "end_user" && user?.walletId && (
								<span className="px-3 py-2 bg-light rounded-pill">
									Wallet ID: {truncateString(user?.walletId).props?.children}
								</span>
							)}
							<LightDark
								leftSidebarType={leftSidebarType}
								layoutMode={layoutModeType}
								onChangeLayoutMode={onChangeLayoutMode}
							/>

							{/* ProfileDropdown */}
							<ProfileDropdown
								profileName={navTitle}
								role={navRole}
								profileLogo={navLogo}
							/>
						</div>
					</div>
				</div>
			</header>
		</React.Fragment>
	);
};

export default NavHeader;
