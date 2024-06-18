import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import withRouter from "../withRouter";

//import Components
import NavHeader from "./NavHeader";
import Sidebar from "./Sidebar";

//import actions
import {
  changeLayout,
  changeSidebarTheme,
  changeLayoutMode,
  changeLayoutWidth,
  changeLayoutPosition,
  changeTopbarTheme,
  changeLeftsidebarSizeType,
  changeLeftsidebarViewType,
  changeSidebarImageType,
} from "@/store/actions";

//redux
import { useSelector, useDispatch } from "react-redux";

const Layout = (props) => {
  const [headerClass, setHeaderClass] = useState("");
  const dispatch = useDispatch();
  const {
    layoutType,
    leftSidebarType,
    layoutModeType,
    layoutWidthType,
    layoutPositionType,
    topbarThemeType,
    leftsidbarSizeType,
    leftSidebarViewType,
    leftSidebarImageType,
  } = useSelector((state) => ({
    layoutType: state.Layout.layoutType,
    leftSidebarType: state.Layout.leftSidebarType,
    layoutModeType: state.Layout.layoutModeType,
    layoutWidthType: state.Layout.layoutWidthType,
    layoutPositionType: state.Layout.layoutPositionType,
    topbarThemeType: state.Layout.topbarThemeType,
    leftsidbarSizeType: state.Layout.leftsidbarSizeType,
    leftSidebarViewType: state.Layout.leftSidebarViewType,
    leftSidebarImageType: state.Layout.leftSidebarImageType,
  }));

  /*
    layout settings
    */
  useEffect(() => {
    if (
      layoutType ||
      leftSidebarType ||
      layoutModeType ||
      layoutWidthType ||
      layoutPositionType ||
      topbarThemeType ||
      leftsidbarSizeType ||
      leftSidebarViewType ||
      leftSidebarImageType
    ) {
      dispatch(changeLeftsidebarViewType(leftSidebarViewType));
      dispatch(changeLeftsidebarSizeType(leftsidbarSizeType));
      dispatch(changeSidebarTheme(leftSidebarType));
      dispatch(changeLayoutMode(layoutModeType));
      dispatch(changeLayoutWidth(layoutWidthType));
      dispatch(changeLayoutPosition(layoutPositionType));
      dispatch(changeTopbarTheme(topbarThemeType));
      dispatch(changeLayout(layoutType));
      dispatch(changeSidebarImageType(leftSidebarImageType));
    }
  }, [
    layoutType,
    leftSidebarType,
    layoutModeType,
    layoutWidthType,
    layoutPositionType,
    topbarThemeType,
    leftsidbarSizeType,
    leftSidebarViewType,
    leftSidebarImageType,
    dispatch,
  ]);
  /*
    call dark/light mode
    */
  const onChangeLayoutMode = (value, sidebar) => {
    if (changeLayoutMode) {
      dispatch(changeLayoutMode(value));
      dispatch(changeSidebarTheme(sidebar));
    }
  };

  // className add remove in header
  useEffect(() => {
    window.addEventListener("scroll", scrollNavigation, true);
  });
  function scrollNavigation() {
    var scrollup = document.documentElement.scrollTop;
    if (scrollup > 50) {
      setHeaderClass("topbar-shadow");
    } else {
      setHeaderClass("");
    }
  }

  return (
    <React.Fragment>
      <div id="layout-wrapper">
        <NavHeader
          headerClass={headerClass}
          leftSidebarType={leftSidebarType}
          layoutModeType={layoutModeType}
          onChangeLayoutMode={onChangeLayoutMode}
          navTitle="Dectec"
          navRole="SuperAdmin"
          // navLogo={dectec}
        />
        <Sidebar layoutType={layoutType} />
        <div className="main-content">{props.children}</div>
      </div>
    </React.Fragment>
  );
};

Layout.propTypes = {
  children: PropTypes.object,
};

export default withRouter(Layout);
