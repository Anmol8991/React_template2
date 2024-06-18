import React, { useEffect } from "react";
import withRouter from "../withRouter";

//redux
import { useSelector } from "react-redux";
import { useUserContext } from "../../../hooks/useUserContext";
import { Navigate } from "react-router-dom";

const NonAuthLayout = ({ children }) => {
  const { user } = useUserContext();
  const { layoutModeType } = useSelector((state) => ({
    layoutModeType: state.Layout.layoutModeType,
  }));

  useEffect(() => {
    if (layoutModeType === "dark") {
      document.body.setAttribute("data-layout-mode", "dark");
    } else {
      document.body.setAttribute("data-layout-mode", "light");
    }
    return () => {
      document.body.removeAttribute("data-layout-mode");
    };
  }, [layoutModeType]);
  return <div>{user ? <Navigate to={"/dashboard"} /> : children}</div>;
};

export default withRouter(NonAuthLayout);
