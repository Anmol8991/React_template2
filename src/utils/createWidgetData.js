export const dectecDashboardWidgetData = (data) => {
  const newData = [
    {
      id: 4,
      cardColor: "info",
      label: "Amount Received",
      counter: `${data[0]?.amountReceived.value.toFixed(
        data[0]?.amountReceived?.decimals
      )}`,

      bgcolor: "danger",
      icon: "bx bx-wallet",
      // decimals: data[0]?.amountReceived?.decimals,
      prefix: data[0]?.amountReceived?.prefix ?? "",
      suffix: data[0]?.amountReceived?.suffix ?? "",
      link: "payments",
    },
    {
      id: 1,
      cardColor: "primary",
      label: "Points Bought",
      counter: `${(data[0]?.pointsBought.value).toFixed(
        data[0]?.pointsBought.decimals
      )}`,
      bgcolor: "success",
      icon: "bx bx-coin",
      decimals: data[0]?.pointsBought.decimals,
      prefix: data[0]?.pointsBought?.prefix ?? "",
      suffix: data[0]?.pointsBought?.suffix ?? "",
      link: "payments",
    },
    {
      id: 2,
      cardColor: "secondary",
      label: "Points Rewarded",
      counter: `${(data[0]?.pointsRewarded?.value).toFixed(
        data[0]?.pointsRewarded?.decimals
      )}`,
      bgcolor: "info",
      icon: "bx bx-gift",
      decimals: data[0]?.pointsRewarded?.decimals,
      prefix: data[0]?.pointsRewarded?.prefix ?? "",
      suffix: data[0]?.pointsRewarded?.suffix ?? "",
      link: "rewards",
    },
    {
      id: 3,
      cardColor: "success",
      label: "Points Redeemed",
      counter: `${(data[0]?.redeemedPoints.value).toFixed(
        data[0]?.redeemedPoints.decimals
      )}`,
      bgcolor: "warning",
      icon: "bx bx-bar-chart-alt-2",
      decimals: data[0]?.redeemedPoints.decimals,
      prefix: data[0]?.redeemedPoints.prefix ?? "",
      suffix: data[0]?.redeemedPoints.suffix ?? "",
      link: "redemption",
    },
    {
      id: 3,
      cardColor: "success",
      label: "Users",
      counter: data[0]?.users,
      bgcolor: "info",
      icon: "bx bx-user-circle",
      decimals: 0,
      prefix: "",
      suffix: "",
      separator: ",",
      link: "users",
    },
    {
      id: 2,
      cardColor: "secondary",
      label: "Clients",
      counter: data[0]?.clients,
      bgcolor: "warning",
      icon: "bx bx-cube-alt",
      decimals: 0,
      prefix: "",
      suffix: "",
      link: "clients",
    },
    {
      id: 3,
      cardColor: "success",
      label: "Protocols",
      counter: data[0]?.protocols,
      bgcolor: "danger",
      icon: "bx bx-map-pin",
      decimals: 0,
      prefix: "",
      suffix: "",
      link: "protocols",
    },

    {
      id: 3,
      cardColor: "success",
      label: "Activities",
      counter: data[0]?.activities,
      bgcolor: "primary",
      icon: "bx bx-task",
      decimals: 0,
      prefix: "",
      separator: ",",
      suffix: "",
      link: "rewards",
    },
  ];

  return newData;
};

export const dectectUserWidgetData = (data) => {
  const dataObj = data[0];

  const result = [
    {
      id: 1,
      cardColor: "success",
      label: "TOTAL USERS",
      counter: dataObj?.totalUsers ?? 0,
      bgcolor: "info",
      icon: "bx bx-user-circle",
    },
    {
      id: 2,
      cardColor: "success",
      label: "ACTIVE USERS",
      counter: dataObj?.activeUsers ?? 0,
      bgcolor: "warning",
      icon: "bx bx-user-check",
    },
    {
      id: 3,
      cardColor: "success",
      label: "INACTIVE USERS",
      counter: dataObj?.inactiveUsers ?? 0,
      bgcolor: "danger",
      icon: "bx bx-user-minus",
    },
  ];

  return result;
};

export const dectectViewClientWidgetData = (data) => {
  const newData = [
    {
      id: 1,
      cardColor: "info",
      label: "Amount Paid",
      counter: data[0]?.amountPaid?.value,
      bgcolor: "danger",
      icon: "bx bx-wallet",
      decimals: data[0]?.amountPaid?.decimals,
      prefix: data[0]?.amountPaid?.prefix,
      suffix: data[0]?.amountPaid?.suffix,
      link: "payments",
    },
    {
      id: 2,
      cardColor: "primary",
      label: "Points Bought",
      counter: data[0]?.pointsBought?.value,
      bgcolor: "success",
      icon: "bx bx-dollar-circle",
      decimals: data[0]?.pointsBought?.decimals,
      prefix: data[0]?.pointsBought?.prefix,
      suffix: data[0]?.pointsBought?.suffix,
      link: "payments",
    },
    {
      id: 3,
      cardColor: "primary",
      label: "Points Rewarded",
      counter: data[0]?.pointsRewarded?.value,
      bgcolor: "success",
      icon: "bx bx-dollar-circle",
      decimals: data[0]?.pointsRewarded?.decimals,
      prefix: data[0]?.pointsRewarded?.prefix,
      suffix: data[0]?.pointsRewarded?.suffix,
      link: "rewards",
    },
    {
      id: 4,
      cardColor: "success",
      label: "Users",
      counter: data[0]?.users,
      bgcolor: "warning",
      icon: "bx bx-user-circle",
      decimals: 0,
      prefix: "",
      suffix: "",
      link: "users",
    },
    {
      id: 5,
      cardColor: "success",
      label: "Activities",
      counter: data[0]?.activities,
      bgcolor: "primary",
      icon: "bx bx-task",
      decimals: 0,
      prefix: "",
      suffix: "",
    },
  ];

  return newData;
};

export const dectectViewProtocolWidgetData = (data) => {
  const newData = [
    {
      id: 1,
      cardColor: "info",
      label: "Amount Paid",
      counter: data?.amountPaid?.value,
      bgcolor: "danger",
      icon: "bx bx-wallet",
      decimals: data?.amountPaid?.decimals,
      prefix: data?.amountPaid?.prefix,
      suffix: data?.amountPaid?.suffix,
      link: "", //payments
    },
    {
      id: 2,
      cardColor: "primary",
      label: "Points Bought",
      counter: data?.pointsBought?.value,
      bgcolor: "success",
      icon: "bx bx-dollar-circle",
      decimals: data?.pointsBought?.decimals,
      prefix: data?.pointsBought?.prefix,
      suffix: data?.pointsBought?.suffix,
      link: "",
    },
    {
      id: 3,
      cardColor: "primary",
      label: "Points Rewarded",
      counter: data?.pointsRewarded?.value,
      bgcolor: "success",
      icon: "bx bx-dollar-circle",
      decimals: data?.pointsRewarded?.decimals,
      prefix: data?.pointsRewarded?.prefix,
      suffix: data?.pointsRewarded?.suffix,
      link: "",
    },
    {
      id: 4,
      cardColor: "success",
      label: "Users",
      counter: data?.users,
      bgcolor: "warning",
      icon: "bx bx-user-circle",
      decimals: 0,
      prefix: "",
      suffix: "",
      link: "", //users
    },
    {
      id: 5,
      cardColor: "success",
      label: "Clients",
      counter: data?.clients,
      bgcolor: "primary",
      icon: "bx bx-user-circle",
      decimals: 0,
      prefix: "",
      suffix: "",
      link: "", //clients
    },
  ];

  return newData;
};

export const getProtocolWidgetData = (data) => {
  const newData = [
    {
      id: 1,
      cardColor: "info",
      label: "Amount Paid",
      counter: data?.amountPaid?.value,
      bgcolor: "danger",
      icon: "bx bx-wallet",
      decimals: data?.amountPaid?.decimals,
      prefix: data?.amountPaid?.prefix,
      suffix: data?.amountPaid?.suffix,
      link: "", //payments
    },
    {
      id: 2,
      cardColor: "primary",
      label: "Points Bought",
      counter: data?.pointsBought?.value,
      bgcolor: "success",
      icon: "bx bx-dollar-circle",
      decimals: data?.pointsBought?.decimals,
      prefix: data?.pointsBought?.prefix,
      suffix: data?.pointsBought?.suffix,
      link: "",
    },
    {
      id: 3,
      cardColor: "primary",
      label: "Points Rewarded",
      counter: data?.pointsRewarded?.value,
      bgcolor: "success",
      icon: "bx bx-dollar-circle",
      decimals: data?.pointsRewarded?.decimals,
      prefix: data?.pointsRewarded?.prefix,
      suffix: data?.pointsRewarded?.suffix,
      link: "",
    },
    // {
    //   id: 4,
    //   cardColor: "success",
    //   label: "Clients",
    //   counter: data?.clients,
    //   bgcolor: "warning",
    //   icon: "bx bx-user-circle",
    //   decimals: 0,
    //   prefix: "",
    //   suffix: "",
    //   link: "", //users
    // },
  ];

  return newData;
};

export const dectectViewUserWidgetData = (data) => {
  const newData = [
    {
      id: 1,
      cardColor: "primary",
      label: "Total Earned Points",
      counter: data?.earnedPoints,
      bgcolor: "success",
      icon: "bx bxs-medal",
      decimals: 0,
      prefix: "",
      suffix: "",
    },

    {
      id: 3,
      cardColor: "success",
      label: "Completed Activities",
      counter: data?.activityCount,
      bgcolor: "primary",
      icon: "bx bx-task",
      decimals: 0,
      prefix: "",
      suffix: "",
    },
    {
      id: 4,
      cardColor: "info",
      label: "Redeemed Points",
      counter: data?.redeemedPoints,
      bgcolor: "warning",
      icon: "bx bxs-down-arrow-circle",
      decimals: 0,
      prefix: "",
      suffix: "",
    },
  ];

  return newData;
};
