//for sidebar routes

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Navdata = () => {
  const history = useNavigate();

  const [iscurrentState, setIscurrentState] = useState(null);

  useEffect(() => {
    document.body.classList.remove("twocolumn-panel");

    if (iscurrentState === "Dashboard") {
      history("/dashboard");
      document.body.classList.add("twocolumn-panel");
    }
    if (iscurrentState === "Clients") {
      history("/clients");
      document.body.classList.add("twocolumn-panel");
    }
  }, [history, iscurrentState]);

  const menuItems = [
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
      id: "rewards",
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
  return <React.Fragment>{menuItems}</React.Fragment>;
};
export default Navdata;
