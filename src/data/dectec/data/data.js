// Import Images
import product1 from "@/assets/images/products/img-1.png";
import product2 from "@/assets/images/products/img-2.png";
import product3 from "@/assets/images/products/img-3.png";
import product4 from "@/assets/images/products/img-4.png";
import product5 from "@/assets/images/products/img-5.png";

import company1 from "@/assets/images/companies/img-1.png";
import company2 from "@/assets/images/companies/img-2.png";
import company3 from "@/assets/images/companies/img-3.png";
import company5 from "@/assets/images/companies/img-5.png";
import company8 from "@/assets/images/companies/img-8.png";

import protocol from "@/assets/images/demo/perk.png";
import sophiaDao from "@/assets/images/demo/sophiaDao.png";
import dereal from "@/assets/images/demo/dereal.jpg";
import dope from "@/assets/images/demo/dope.png";
import devnet from "@/assets/images/demo/devnet.png";
import company4 from "@/assets/images/demo/company1.png";
import company6 from "@/assets/images/demo/company2.png";
import company7 from "@/assets/images/demo/company3.jpg";
import company9 from "@/assets/images/demo/company4.jpg";
import company10 from "@/assets/images/demo/company5.png";
import arrow_company from "@/assets/images/demo/arrow-company.png";

import avatar1 from "@/assets/images/users/avatar-1.jpg";
import avatar2 from "@/assets/images/users/avatar-2.jpg";
import avatar3 from "@/assets/images/users/avatar-3.jpg";
import avatar4 from "@/assets/images/users/avatar-4.jpg";
import avatar5 from "@/assets/images/users/avatar-5.jpg";
import avatar6 from "@/assets/images/users/avatar-6.jpg";
import avatar7 from "@/assets/images/users/avatar-7.jpg";
import avatar8 from "@/assets/images/users/avatar-8.jpg";

export const dashboardWidgets = [
  {
    id: 4,
    cardColor: "info",
    label: "Amount Received",
    counter: "165.89",
    bgcolor: "danger",
    icon: "bx bx-wallet",
    decimals: 2,
    prefix: "$",
    suffix: "K",
    link: "payments",
  },
  {
    id: 1,
    cardColor: "primary",
    label: "Points Bought",
    counter: "59.25",
    bgcolor: "success",
    icon: "bx bx-coin",
    decimals: 2,
    prefix: "",
    suffix: "M",
    link: "payments",
  },
  {
    id: 2,
    cardColor: "secondary",
    label: "Points Rewarded",
    counter: "31.3",
    bgcolor: "info",
    icon: "bx bx-gift",
    decimals: 2,
    prefix: "",
    suffix: "M",
    link: "rewards",
  },
  {
    id: 3,
    cardColor: "success",
    label: "Points Redeemed",
    counter: "38.9",
    bgcolor: "warning",
    icon: "bx bx-bar-chart-alt-2",
    decimals: 2,
    prefix: "",
    suffix: "M",
    link: "redemption",
  },

  {
    id: 3,
    cardColor: "success",
    label: "Users",
    counter: "1987",
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
    counter: "45",
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
    counter: "5",
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
    counter: "3873",
    bgcolor: "primary",
    icon: "bx bx-task",
    decimals: 0,
    prefix: "",
    separator: ",",
    suffix: "",
  },
];
export const recentOrders = [
  {
    id: 1,
    protocolImg: protocol,
    protocolName: "PERK",
    clientImg: company1,
    clientName: "huddle",
    userImg: avatar1,
    userName: "Alex Smith",
    type: "Gift Card",
    amount: 809.0,
    statusClass: "success",
    points: "4618",
  },

  {
    id: 2,
    protocolImg: sophiaDao,
    protocolName: "SophiaDao",
    clientImg: company2,
    clientName: "Spacetach",
    userImg: avatar2,
    userName: "Allexa",
    type: "Donation",
    amount: 800.0,
    statusClass: "danger",
    points: "4398",
  },

  {
    id: 3,
    protocolImg: devnet,
    protocolName: "DVNet",
    clientImg: company3,
    clientName: "Infity",
    userImg: avatar3,
    userName: "Nell Ayers",
    type: "Event",
    amount: 789.0,
    statusClass: "warning",
    points: "4018",
  },

  {
    id: 4,
    protocolImg: dereal,
    protocolName: "dereal",
    clientImg: company4,
    clientName: "Digitech Galaxy",
    userImg: avatar4,
    userName: "Nell Potter",
    type: "Event",
    amount: 779.0,
    statusClass: "warning",
    points: "4000",
  },

  {
    id: 5,
    protocolImg: dope,
    protocolName: "Dope",
    clientImg: company5,
    clientName: "iTest Factory",
    userImg: avatar5,
    userName: "Lucian Griffith",
    type: "Donation",
    amount: 689.0,
    statusClass: "danger",
    points: "3818",
  },
  {
    id: 6,
    protocolImg: protocol,
    protocolName: "PERK",
    clientImg: company6,
    clientName: "Oxford",
    userImg: avatar6,
    userName: "Forrest Ellis",
    type: "Gift Card",
    amount: 659.0,
    statusClass: "success",
    points: "3718",
  },

  {
    id: 7,
    protocolImg: sophiaDao,
    protocolName: "SophiaDao",
    clientImg: company7,
    clientName: "USB Flash",
    userImg: avatar7,
    userName: "	Chase Osborne",
    type: "Donation",
    amount: 610.0,
    statusClass: "danger",
    points: "3598",
  },

  {
    id: 8,
    protocolImg: devnet,
    protocolName: "DVNet",
    clientImg: company8,
    clientName: "Funky",
    userImg: avatar8,
    userName: "Cathleen Rivas",
    type: "Event",
    amount: 590.0,
    statusClass: "warning",
    points: "3000",
  },

  {
    id: 9,
    protocolImg: dereal,
    protocolName: "dereal",
    clientImg: company4,
    clientName: "Digitech Galaxy",
    userImg: avatar2,
    userName: "Ivory Bush",
    type: "Event",
    amount: 300.0,
    statusClass: "warning",
    points: "4007",
  },

  {
    id: 10,
    protocolImg: dope,
    protocolName: "Dope",
    clientImg: company5,
    clientName: "iTest Factory",
    userImg: avatar3,
    userName: "Lars Stone",
    type: "Donation",
    amount: 200.0,
    statusClass: "danger",
    points: "2000",
  },
];
export const paymentsWidget1 = [
  {
    id: 3,
    cardColor: "success",
    label: "Received Amount",
    counter: "93.5",
    bgcolor: "danger",
    icon: "bx bx-wallet",
    decimals: 1,
    prefix: "$",
    suffix: "M",
    separator: ",",
  },

  {
    id: 2,
    cardColor: "secondary",
    label: "Points Bought",
    counter: "445.67",
    bgcolor: "warning",
    icon: "bx bx-coin",
    decimals: 2,
    prefix: "",
    suffix: "M",
    separator: ",",
  },
];

export const paymentsWidget2 = [
  {
    id: 3,
    cardColor: "success",
    label: "Received Amount",
    counter: "97.8",
    bgcolor: "danger",
    icon: "bx bx-wallet",
    decimals: 1,
    prefix: "$",
    suffix: "M",
    separator: ",",
  },

  {
    id: 2,
    cardColor: "secondary",
    label: "Points Bought",
    counter: "345.67",
    bgcolor: "warning",
    icon: "bx bx-coin",
    decimals: 2,
    prefix: "",
    suffix: "M",
    separator: ",",
  },
];
export const protocolPaymentsData = [
  {
    id: 1,
    protocolImg: protocol,
    protocolName: "PERK",
    clientImg: company1,
    clientName: "huddle",
  },

  {
    id: 2,
    protocolImg: sophiaDao,
    protocolName: "SophiaDao",
    clientImg: company2,
    clientName: "Spacetach",
  },

  {
    id: 3,
    protocolImg: devnet,
    protocolName: "DVNet",
    clientImg: company3,
    clientName: "Infity",
  },

  {
    id: 4,
    protocolImg: dereal,
    protocolName: "dereal",
    clientImg: company4,
    clientName: "Digitech Galaxy",
  },

  {
    id: 5,
    protocolImg: dope,
    protocolName: "Dope",
    clientImg: company5,
    clientName: "iTest Factory",
  },
  {
    id: 6,
    protocolImg: protocol,
    protocolName: "PERK",
    clientImg: company6,
    clientName: "Oxford",
  },

  {
    id: 7,
    protocolImg: sophiaDao,
    protocolName: "SophiaDao",
    clientImg: company7,
    clientName: "USB Flash",
  },

  {
    id: 8,
    protocolImg: devnet,
    protocolName: "DVNet",
    clientImg: company8,
    clientName: "Funky",
  },

  {
    id: 9,
    protocolImg: dereal,
    protocolName: "dereal",
    clientImg: company4,
    clientName: "Digitech Galaxy",
  },

  {
    id: 10,
    protocolImg: dope,
    protocolName: "Dope",
    clientImg: company5,
    clientName: "iTest Factory",
  },
];
export const userWidget1 = [
  {
    id: 3,
    cardColor: "success",
    label: "Total Users",
    counter: "9806",
    bgcolor: "info",
    icon: "bx bx-user-circle",
    decimals: 0,
    prefix: "",
    suffix: "",
    separator: ",",
  },

  {
    id: 2,
    cardColor: "secondary",
    label: "Active Users",
    counter: "4567",
    bgcolor: "warning",
    icon: "bx bx-user-check",
    decimals: 0,
    prefix: "",
    suffix: "",
    separator: ",",
  },
  {
    id: 3,
    cardColor: "success",
    label: "Inactive Users",
    counter: "5045",
    bgcolor: "danger",
    icon: "bx bx-user-minus",
    decimals: 0,
    prefix: "",
    suffix: "",
    separator: ",",
  },
  {
    id: 3,
    cardColor: "success",
    label: "New Users",
    counter: "200",
    bgcolor: "primary",
    icon: "bx bx-user-plus",
    decimals: 0,
    prefix: "",
    suffix: "",
    separator: ",",
  },
];

export const userWidget2 = [
  {
    id: 3,
    cardColor: "success",
    label: "Total Users",
    counter: "9876",
    bgcolor: "info",
    icon: "bx bx-user-circle",
    decimals: 0,
    prefix: "",
    suffix: "",
    separator: ",",
  },

  {
    id: 2,
    cardColor: "secondary",
    label: "Active Users",
    counter: "5678",
    bgcolor: "warning",
    icon: "bx bx-user-check",
    decimals: 0,
    prefix: "",
    suffix: "",
    separator: ",",
  },
  {
    id: 3,
    cardColor: "success",
    label: "Inactive Users",
    counter: "3987",
    bgcolor: "danger",
    icon: "bx bx-user-minus",
    decimals: 0,
    prefix: "",
    suffix: "",
    separator: ",",
  },
];

export const protocolUsersData = [
  {
    id: 1,
    protocolImg: protocol,
    protocolName: "PERK",
    clientImg: company1,
    clientName: "huddle",
    userImg: avatar1,
    userName: "Alex Smith",
    email: "Gift Card",
    status: "active",
  },

  {
    id: 2,
    protocolImg: sophiaDao,
    protocolName: "SophiaDao",
    clientImg: company2,
    clientName: "Spacetach",
    userImg: avatar2,
    userName: "Allexa",
    email: "Donation",
    status: "inactive",
  },

  {
    id: 3,
    protocolImg: devnet,
    protocolName: "DVNet",
    clientImg: company3,
    clientName: "Infity",
    userImg: avatar3,
    userName: "Nell Ayers",
    email: "Event",
    status: "active",
  },

  {
    id: 4,
    protocolImg: dereal,
    protocolName: "dereal",
    clientImg: company4,
    clientName: "Digitech Galaxy",
    userImg: avatar4,
    userName: "Nell Potter",
    email: "Event",
    status: "inactive",
  },

  {
    id: 5,
    protocolImg: dope,
    protocolName: "Dope",
    clientImg: company5,
    clientName: "iTest Factory",
    userImg: avatar5,
    userName: "Lucian Griffith",
    email: "Donation",
    status: "inactive",
  },
  {
    id: 6,
    protocolImg: protocol,
    protocolName: "PERK",
    clientImg: company6,
    clientName: "Oxford",
    userImg: avatar6,
    userName: "Forrest Ellis",
    email: "Gift Card",
    status: "active",
  },

  {
    id: 7,
    protocolImg: sophiaDao,
    protocolName: "SophiaDao",
    clientImg: company7,
    clientName: "USB Flash",
    userImg: avatar7,
    userName: "	Chase Osborne",
    email: "Donation",
    status: "active",
  },

  {
    id: 8,
    protocolImg: devnet,
    protocolName: "DVNet",
    clientImg: company8,
    clientName: "Funky",
    userImg: avatar8,
    userName: "Cathleen Rivas",
    email: "Event",
    status: "inactive",
  },

  {
    id: 9,
    protocolImg: dereal,
    protocolName: "dereal",
    clientImg: company4,
    clientName: "Digitech Galaxy",
    userImg: avatar2,
    userName: "Ivory Bush",
    email: "Event",
    status: "active",
  },

  {
    id: 10,
    protocolImg: dope,
    protocolName: "Dope",
    clientImg: company5,
    clientName: "iTest Factory",
    userImg: avatar3,
    userName: "Lars Stone",
    email: "Donation",
    status: "inactive",
  },
];
export const data2 = [
  {
    date: "	20 Dec 2017",
  },

  {
    date: "	17 Jan 2017",
  },

  {
    date: "	17 Mar 2008",
  },

  {
    date: "	17 Feb 2022",
  },

  {
    date: "	17 Aug 2017",
  },
  {
    date: "	17 Nov 2017",
  },

  {
    date: "	17 Dec 2003",
  },

  {
    date: "	17 Mar 2011",
  },

  {
    date: "	17 Jul 2019",
  },

  {
    date: "	09 Jun 2021",
  },
];
export const redemptionWidgets = [
  {
    id: 3,
    cardColor: "success",
    label: "Redeemed Amount",
    counter: "98.76",
    bgcolor: "info",
    src: "https://cdn.lordicon.com/yeallgsa.json",
    decimals: 2,
    prefix: "$",
    suffix: "M",
    separator: ",",
  },

  {
    id: 2,
    cardColor: "secondary",
    label: "Redeemed Points",
    counter: "567.8",
    bgcolor: "warning",
    src: "https://cdn.lordicon.com/qhviklyi.json",
    decimals: 1,
    prefix: "",
    suffix: "M",
    separator: ",",
  },
];

export const protocolRedemptionData = [
  {
    id: 1,
    protocolImg: protocol,
    protocolName: "PERK",
    clientImg: company1,
    clientName: "huddle",
    userImg: avatar1,
    userName: "Alex Smith",
    type: "Gift Card",
    amount: 809.0,
    statusClass: "success",
    points: "4618",
    date: data2[0].date,
  },

  {
    id: 2,
    protocolImg: sophiaDao,
    protocolName: "SophiaDao",
    clientImg: company2,
    clientName: "Spacetach",
    userImg: avatar2,
    userName: "Allexa",
    type: "Donation",
    amount: 800.0,
    statusClass: "danger",
    points: "4398",
    date: data2[1].date,
  },

  {
    id: 3,
    protocolImg: devnet,
    protocolName: "DVNet",
    clientImg: company3,
    clientName: "Infity",
    userImg: avatar3,
    userName: "Nell Ayers",
    type: "Event",
    amount: 789.0,
    statusClass: "warning",
    points: "4018",
    date: data2[2].date,
  },

  {
    id: 4,
    protocolImg: dereal,
    protocolName: "dereal",
    clientImg: company4,
    clientName: "Digitech Galaxy",
    userImg: avatar4,
    userName: "Nell Potter",
    type: "Event",
    amount: 779.0,
    statusClass: "warning",
    points: "4000",
    date: data2[3].date,
  },

  {
    id: 5,
    protocolImg: dope,
    protocolName: "Dope",
    clientImg: company5,
    clientName: "iTest Factory",
    userImg: avatar5,
    userName: "Lucian Griffith",
    type: "Donation",
    amount: 689.0,
    statusClass: "danger",
    points: "3818",
    date: data2[4].date,
  },
  {
    id: 6,
    protocolImg: protocol,
    protocolName: "PERK",
    clientImg: company6,
    clientName: "Oxford",
    userImg: avatar6,
    userName: "Forrest Ellis",
    type: "Gift Card",
    amount: 659.0,
    statusClass: "success",
    points: "3718",
    date: data2[5].date,
  },

  {
    id: 7,
    protocolImg: sophiaDao,
    protocolName: "SophiaDao",
    clientImg: company7,
    clientName: "USB Flash",
    userImg: avatar7,
    userName: "	Chase Osborne",
    type: "Donation",
    amount: 610.0,
    statusClass: "danger",
    points: "3598",
    date: data2[6].date,
  },

  {
    id: 8,
    protocolImg: devnet,
    protocolName: "DVNet",
    clientImg: company8,
    clientName: "Funky",
    userImg: avatar8,
    userName: "Cathleen Rivas",
    type: "Event",
    amount: 590.0,
    statusClass: "warning",
    points: "3000",
    date: data2[7].date,
  },

  {
    id: 9,
    protocolImg: dereal,
    protocolName: "dereal",
    clientImg: company4,
    clientName: "Digitech Galaxy",
    userImg: avatar2,
    userName: "Ivory Bush",
    type: "Event",
    amount: 300.0,
    statusClass: "warning",
    points: "4007",
    date: data2[8].date,
  },

  {
    id: 10,
    protocolImg: dope,
    protocolName: "Dope",
    clientImg: company5,
    clientName: "iTest Factory",
    userImg: avatar3,
    userName: "Lars Stone",
    type: "Donation",
    amount: 200.0,
    statusClass: "danger",
    points: "2000",
    date: data2[9].date,
  },
];
