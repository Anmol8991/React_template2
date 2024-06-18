import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";

//import images
import perk from "@/assets/images/demo/SingularityNetLogo-removebg-preview.png";
import dectec from "@/assets/images/demo/dectec.png";
import userlogo from "@/assets/images/users/avatar-5.jpg";
import twinLogo from "@/assets/images/demo/twinLogo.webp";
import { useUserContext } from "../../../hooks/useUserContext";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../api/authApi";
import { notify } from "../../../utils/toastify";
import { viewProfileInfo } from "../../../api/dectecApi";
import {
  changeLayoutMode,
  changeSidebarTheme,
} from "../../../store/layouts/action";
import { layoutModeTypes, leftSidebarTypes } from "./layoutConstants/layout";
// import ChangeRole from "../../../pages/commonPages/ChangeRole";

const ProfileDropdown = () => {
  const role = JSON.parse(localStorage.getItem("user_data"))?.role;
  const { setUser, setWalletAddress } = useUserContext();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userProfilePic, setUserProfilePic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //Dropdown Toggle
  const [isProfileDropdown, setIsProfileDropdown] = useState(false);
  const toggleProfileDropdown = () => {
    setIsProfileDropdown(!isProfileDropdown);
  };

  useEffect(() => {
    viewProfileInfo().then(({ success, message, data }) => {
      if (success) {
        const { name, profilePic, email } = data[0];
        setUserName(name);
        setUserEmail(email);
        setUserProfilePic(profilePic);
        setLoading(false);
      } else {
        setError(message);
        setLoading(false);
      }
    });
  }, []);
  const onChangeLayoutMode = () => {
    dispatch(changeSidebarTheme(leftSidebarTypes.DARK));
    dispatch(changeLayoutMode(layoutModeTypes.DARKMODE));
  };

  const handleLogout = () => {
    logout()
      .then((res) => {
        if (res.success) {
          setUser(null);
          localStorage.removeItem("user_data");
          sessionStorage.removeItem("walletAddress");
          setWalletAddress(null);
          onChangeLayoutMode();
          navigate("/login");

          notify(res.message, true);
        } else {
          notify(res.message, false);
        }
      })
      .catch((err) => {
        notify(err.message, false);
      });
  };
  return (
    <React.Fragment>
      <Dropdown
        isOpen={isProfileDropdown}
        toggle={toggleProfileDropdown}
        className="ms-sm-3 header-item topbar-user"
      >
        <DropdownToggle tag="button" type="button" className="btn shadow-none">
          <span className="d-flex align-items-center">
            <img
              className="rounded-circle header-profile-user"
              src={
                role === "dectec_admin"
                  ? dectec
                  : role === "client_admin"
                  ? perk
                  : role === "protocol_admin"
                  ? twinLogo
                  : role === "twin_utility"
                  ? userlogo
                  : userProfilePic
              }
              alt="NavHeader Avatar"
            />
            <span className="text-start ms-xl-2">
              <span className="d-none d-xl-inline-block ms-1 fw-medium user-name-text">
                {role === "dectec_admin"
                  ? "Dectec"
                  : role === "client_admin"
                  ? "Singularity"
                  : role === "protocol_admin"
                  ? JSON.parse(localStorage.getItem("user_data"))?.protocolName
                  : role === "twin_utility"
                  ? "Alex Smith"
                  : userName}
              </span>
              <span className="d-none d-xl-block ms-1 fs-12 text-muted user-name-sub-text">
                {role === "dectec_admin"
                  ? "Super Admin"
                  : role === "client_admin"
                  ? "Client Admin"
                  : role === "protocol_admin"
                  ? "Protocol Admin"
                  : role === "twin_utility"
                  ? "alexsmith@gmail.com"
                  : role === "end_user" && userEmail}
              </span>
            </span>
          </span>
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-end">
          {role === "twin_utility" && (
            <DropdownItem onClick={() => navigate("/profile")}>
              <i className="mdi mdi-camera-front text-muted fs-16 align-middle me-1"></i>{" "}
              <span className="align-middle" data-key="t-logout">
                Profile
              </span>
            </DropdownItem>
          )}
          <DropdownItem onClick={handleLogout}>
            <i className="mdi mdi-logout text-muted fs-16 align-middle me-1"></i>{" "}
            <span className="align-middle" data-key="t-logout">
              Logout
            </span>
          </DropdownItem>
          {/* <DropdownItem toggle={false}>
            <ChangeRole />
          </DropdownItem> */}
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  );
};

export default ProfileDropdown;
