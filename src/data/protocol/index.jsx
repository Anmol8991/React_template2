// Import Images
import Img2 from "@/assets/images/nft/img-02.jpg";
import Img3 from "@/assets/images/nft/img-03.jpg";
import Img4 from "@/assets/images/nft/img-04.jpg";
import Img5 from "@/assets/images/nft/img-05.jpg";
import avatar3 from "@/assets/images/users/avatar-3.jpg";
import avatar5 from "@/assets/images/users/avatar-5.jpg";
import avatar6 from "@/assets/images/users/avatar-6.jpg";
import avatar8 from "@/assets/images/users/avatar-8.jpg";
import nunet from "@/assets/images/demo/NunetLogo.png";
import singularitydao from "@/assets/images/demo/SingularityDaoLogo.jpg";
import singularitynet from "@/assets/images/demo/SingularityNetLogo.png";
import rejuve from "@/assets/images/demo/rejuveLogo.png";
import hypercycle from "@/assets/images/demo/hypercycleLogo.jpg";
import trueagi from "@/assets/images/demo/trueagiLogo.png";
import cogitoprotocol from "@/assets/images/demo/cogitoprotocolLogo.jpg";
import jamgalaxy from "@/assets/images/demo/jamgalaxyLogo.jpg";
import mindplex from "@/assets/images/demo/mindplex.svg";

import {
  topartWork,
  popularityData,
  topCollectionData,
  popularCreatorsData,
} from "@/components/protocol/dashboard/data/dashboardNFT";

// creatorsData, creatorsListData

import {
  expolreNow,
  aution,
  creatorsData,
  creatorsListData,
  walletConnectData,
  topDrop,
  topCreator,
  topCollection,
} from "@/components/protocol/dashboard/data/NFTMarketplace";

const clientsData = [
  {
    name: "Nunet",
    logo: nunet,
    description:"lorem epsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
  },
  {
    name: "SingularityDao",
    logo: singularitydao,
    description: "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets"
  },
  {
    name: "SingularityNet",
    logo: singularitynet,
    description: "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets"
  },
  {
    name: "Rejuve",
    logo: rejuve,
    description:"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it h"
  },
  {
    name: "Hypercycle",
    logo: hypercycle,
    description:"Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum'"
  },
  {
    name: "Trueagi",
    logo: trueagi,
    description: "Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' wi"
  },
  {
    name: "Cogito Protocol",
    logo: cogitoprotocol,
    description: "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets"

  },
  {
    name: "Jam Galaxy",
    logo: jamgalaxy,
    description: "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheetsMany desktop publishing "
  },
  {
    name: "Mindplex",
    logo: mindplex,
    description: "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets"
  },
];

const ecomWidgets = [
  {
    id: 4,
    cardColor: "info",
    label: "Amount Received",
    counter: "9.89",
    bgcolor: "danger",
    icon: "bx bx-wallet",
    decimals: 2,
    prefix: "$",
    suffix: "M"
  },
  {
    id: 1,
    cardColor: "primary",
    label: "Redeemed Amount",
    counter: "8.25",
    bgcolor: "success",
    icon: "bx bx-dollar-circle",
    decimals: 2,
    prefix: "$",
    suffix: "M"
  },

  {
    id: 3,
    cardColor: "success",
    label: "Earned Points",
    counter: "813",
    bgcolor: "info",
    icon: " bx bx-bar-chart-alt-2",
    decimals: 0,
    prefix: "",
    suffix: "k",
    link: "earned",
  },
  {
    id: 3,
    cardColor: "success",
    label: "Redeemed Points",
    counter: "798",
    bgcolor: "secondary",
    icon: "bx bx-gift",
    decimals: 0,
    prefix: "",
    suffix: "k",
    link: "redemption"
  },

];

const recentOrders = [
  {
    id: 1,
    clientImg: clientsData[2].logo,
    clientName: clientsData[2].name,
    userImg: Img3,
    userName: "Alex Smith",
    type: "Gift Card",
    amount: 809.0,
    statusClass: "success",
    points: "4618",
  },

  {
    id: 2,
    userImg: Img2,
    userName: "Allexa",
    type: "Donation",
    amount: 800.0,
    statusClass: "danger",
    points: "4398",
  },

  {
    id: 3,
    clientImg: clientsData[3].logo,
    clientName: clientsData[3].name,
    userImg: avatar3,
    userName: "Nell Ayers",
    type: "Event",
    amount: 789.0,
    statusClass: "warning",
    points: "4018",
  },

  {
    id: 4,
    userImg: Img4,
    userName: "Nell Potter",
    type: "Event",
    amount: 779.0,
    statusClass: "warning",
    points: "4000",
  },

  {
    id: 5,
    clientImg: clientsData[4].logo,
    clientName: clientsData[4].name,
    userImg: avatar5,
    userName: "Lucian Griffith",
    type: "Donation",
    amount: 689.0,
    statusClass: "danger",
    points: "3818",
  },
  {
    id: 6,
    clientImg: clientsData[5].logo,
    clientName: clientsData[5].name,
    userImg: avatar6,
    userName: "Forrest Ellis",
    type: "Gift Card",
    amount: 659.0,
    statusClass: "success",
    points: "3718",
  },

  {
    id: 7,
    userImg: Img4,
    userName: "	Chase Osborne",
    type: "Donation",
    amount: 610.0,
    statusClass: "danger",
    points: "3598",
  },

  {
    id: 8,
    clientImg: clientsData[6].logo,
    clientName: clientsData[6].name,
    userImg: avatar8,
    userName: "Cathleen Rivas",
    type: "Event",
    amount: 590.0,
    statusClass: "warning",
    points: "3000",
  },

  {
    id: 9,
    userImg: Img5,
    userName: "Ivory Bush",
    type: "Event",
    amount: 300.0,
    statusClass: "warning",
    points: "4007",
  },

  {
    id: 10,
    clientImg: clientsData[1].logo,
    clientName: clientsData[1].name,
    userImg: avatar3,
    userName: "Lars Stone",
    type: "Donation",
    amount: 200.0,
    statusClass: "danger",
    points: "2000",
  },
];

const date = [
  {
    date: "	30 Nov 2023",
  },

  {

    date: "	27 Nov 2023",

  },

  {

    date: "	12 Aug 2023",

  },

  {

    date: "	14 Jul 2023",

  },

  {

    date: "	23 Jun 2023",

  },
  {

    date: "	26 May 2023",

  },

  {

    date: "	06 April 2023",

  },

  {

    date: "	18 Mar 2023",

  },

  {

    date: "	17 Feb 2023",

  },

  {

    date: "	09 Jan 2023",

  },
];

export {
  expolreNow,
  aution,
  creatorsData,
  creatorsListData,
  walletConnectData,
  topDrop,
  topCreator,
  topCollection,
  ecomWidgets,
  recentOrders,
  clientsData,
  date,
  topartWork,
  popularityData,
  topCollectionData,
  popularCreatorsData,
};
