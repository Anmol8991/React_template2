import React from "react";

//constants
import { layoutModeTypes, leftSidebarTypes } from "./layoutConstants/layout";

const LightDark = ({ layoutMode, leftSidebarType, onChangeLayoutMode }) => {
  const mode =
    layoutMode === layoutModeTypes["DARKMODE"]
      ? layoutModeTypes["LIGHTMODE"]
      : layoutModeTypes["DARKMODE"];
  const sidebarmode =
    leftSidebarType === leftSidebarTypes["DARK"]
      ? leftSidebarTypes["LIGHT"]
      : leftSidebarTypes["DARK"];

  return (
    <div className="ms-1 header-item d-none d-sm-flex">
      <button
        onClick={() => {
          onChangeLayoutMode(mode, sidebarmode);
        }}
        type="button"
        className="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle light-dark-mode shadow-none"
      >
        <i className="bx bx-moon fs-22"></i>
      </button>
    </div>
  );
};

export default LightDark;
