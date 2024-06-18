// Import Images
import Img1 from "@/assets/images/nft/img-01.jpg";
import Img2 from "@/assets/images/nft/img-02.jpg";
import Img3 from "@/assets/images/nft/img-03.jpg";
import Img4 from "@/assets/images/nft/img-04.jpg";
import Img5 from "@/assets/images/nft/img-05.jpg";
import Img6 from "@/assets/images/nft/img-06.jpg";

import ImgGif1 from "@/assets/images/nft/gif/img-1.gif";
import ImgGif2 from "@/assets/images/nft/gif/img-2.gif";
import ImgGif3 from "@/assets/images/nft/gif/img-3.gif";
import ImgGif4 from "@/assets/images/nft/gif/img-4.gif";
import ImgGif5 from "@/assets/images/nft/gif/img-5.gif";

import avatar8 from "@/assets/images/users/avatar-8.jpg";
import avatar10 from "@/assets/images/users/avatar-10.jpg";
import avatar1 from "@/assets/images/users/avatar-1.jpg";
import avatar2 from "@/assets/images/users/avatar-2.jpg";
import avatar3 from "@/assets/images/users/avatar-3.jpg";
import avatar4 from "@/assets/images/users/avatar-4.jpg";
import avatar5 from "@/assets/images/users/avatar-5.jpg";
import avatar6 from "@/assets/images/users/avatar-6.jpg";
import avatar7 from "@/assets/images/users/avatar-7.jpg";
import avatar9 from "@/assets/images/users/avatar-9.jpg";

import metaMask from "@/assets/images/nft/wallet/metamask.png";
import coinbase from "@/assets/images/nft/wallet/coinbase.png";
import kukai from "@/assets/images/nft/wallet/kukai.png";
import binance from "@/assets/images/nft/wallet/binance.png";
import enjin from "@/assets/images/nft/wallet/enjin.png";
import alpha from "@/assets/images/nft/wallet/alpha.png";
import math from "@/assets/images/nft/wallet/math.png";

import {
  topartWork,
  topartWorkUser,
  featuredNFTData,
  popularityData,
  recentNFTsData,
  topCollectionData,
  popularCreatorsData,
  allMarketplaceData,
  monthMarketplaceData,
  halfyearMarketplaceData,
  yearMarketplaceData,
} from "./dashboardNFT";

// creatorsData, creatorsListData

import {
  expolreNow,
  aution,
  NFTRanking,
  creatorsData,
  creatorsListData,
  walletConnectData,
  topDrop,
  topCreator,
  topCollection,
  tradingArtworkData,
  nftArtworkData,
  popularCreatorsNFT,
  marketPlacewidget,
} from "./NFTMarketplace";

import huddleLogo from "@/assets/images/companies/img-1.png";
import biswap from "@/assets/images/demo/biswap.jpg";
import apextech from "@/assets/images/companies/img-2.png";
import near from "@/assets/images/companies/img-3.png";
import hightech from "@/assets/images/companies/img-4.png";
import softtech from "@/assets/images/companies/img-5.png";
import foxtech from "@/assets/images/companies/img-6.png";
import arrowtech from "@/assets/images/companies/img-9.png";
import tvsarive from "@/assets/images/companies/img-7.png";
import spacetech from "@/assets/images/companies/img-8.png";
import activity1 from "@/assets/images/brands/slack.png";
import activity2 from "@/assets/images/brands/dribbble.png";
import activity3 from "@/assets/images/brands/dropbox.png";
import activity4 from "@/assets/images/brands/bitbucket.png";

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

const clientsData = [
  {
    name: "Huddle",
    logo: huddleLogo,
  },
  {
    name: "Biswap",
    logo: biswap,
  },
  {
    name: "Apex Tech",
    logo: apextech,
  },
  {
    name: "Near",
    logo: near,
  },
  {
    name: "High Tech",
    logo: hightech,
  },
  {
    name: "Soft Tech",
    logo: softtech,
  },
  {
    name: "Fox Tech",
    logo: foxtech,
  },
  {
    name: "Arrow Tech",
    logo: arrowtech,
  },
  {
    name: "Arive",
    logo: tvsarive,
  },
  {
    name: "Space Tech",
    logo: spacetech,
  },
];

const userData = [
  {
    id: 3,
    img: avatar3,
    title: " Donald Risher",
  },
  {
    id: 4,
    img: avatar4,
    title: "Sofia Cunha",
  },
  {
    id: 5,
    img: avatar5,
    title: "Luis Rocha",
  },

  {
    id: 6,
    img: avatar6,
    title: "Vitoria Rodrigues",
  },
  {
    id: 7,
    img: avatar7,
    title: "Vitoria Rodrigues",
  },
  {
    id: 8,
    img: avatar8,
    title: "Julia William",
  },
  {
    id: 9,
    img: avatar9,
    title: "Turnal Saw",
  },
  {
    id: 10,
    img: avatar10,
    title: "Jansh Brown",
  },
  {
    id: 1,
    img: avatar1,
    title: "Susan Denton",
  },
  {
    id: 2,
    img: avatar2,
    title: "Prezy William",
  },
];

const ecomWidgets = [
  {
    id: 1,
    cardColor: "secondary",
    label: "Points Balance",
    counter: "34.5",
    bgcolor: "success",
    icon: "bx bxs-badge-dollar",
    decimals: 2,
    prefix: "",
    suffix: "",
  },
  {
    id: 2,
    cardColor: "success",
    label: "Points Redeemed",
    counter: "813",
    bgcolor: "info",
    icon: " bx bx-gift",
    decimals: 0,
    prefix: "",
    suffix: "k",
  },
  {
    id: 3,
    cardColor: "info",
    label: "Points Bought",
    counter: "16589",
    bgcolor: "danger",
    icon: "bx bx-wallet",
    decimals: 0,
    prefix: "",
    suffix: "",
  },
  {
    id: 4,
    cardColor: "success",
    label: "Points Rewarded",
    counter: "813",
    bgcolor: "info",
    icon: " bx bx-bar-chart-alt-2",
    decimals: 0,
    prefix: "",
    suffix: "k",
  },
  {
    id: 3,
    cardColor: "success",
    label: "Users",
    counter: "1987",
    bgcolor: "warning",
    icon: "bx bx-user-circle",
    decimals: 0,
    prefix: "",
    suffix: "",
    link: "users",
  },

  {
    id: 3,
    cardColor: "success",
    label: "Activities",
    counter: "33",
    bgcolor: "primary",
    icon: "bx bx-task",
    decimals: 0,
    prefix: "",
    suffix: "",
  },
  {
    id: 2,
    cardColor: "secondary",
    label: "Amount Paid",
    counter: "3.45",
    bgcolor: "info",
    icon: "bx bxs-badge-dollar",
    decimals: 2,
    prefix: "$",
    suffix: "M",
  },
];

const activitiesData = [
  {
    name: "Provide Training data",
    des: "Upload training documents, video, audio or presentations for AI/ML and earn points",
  },
  {
    name: "Upload your AI code",
    des: "Upload code with new functionality in AI/ML and earn points",
  },
  {
    name: "Provide AI project Idea",
    des: "Upload full project idea with details for AI/ML projects and earn points",
  },
  {
    name: "Upload AI project",
    des: "Upload your AI/ML project with live link and details and earn points",
  },
];

const activitiesList = [
  {
    id: 1,
    time: ``,
    ratingClass: `Updated 3hrs ago`,
    imgbgColor: `warning`,
    img: activity1,
    label: `Provide Training data`,
    caption: `Upload training documents, video, audio or presentations for AI/ML and earn points`,
    number: `40/60`,
    progressBar: 100 * Number(40 / 60) + `%`,
    points: 2345,
    date: `10 Jul, 2021`,
    link: "/view-activity",
  },
  {
    id: 2,
    time: `Updated 2hrs ago`,
    ratingClass: ``,
    imgbgColor: `danger`,
    img: activity2,
    label: `Upload your AI code`,
    caption: `Upload code with new functionality in AI/ML and earn points`,
    number: `20/67`,
    progressBar: 100 * Number(20 / 67) + `%`,
    points: 3456,
    date: `23 FEB, 2021`,
  },
  {
    id: 3,
    time: `Updated 3hrs ago`,
    ratingClass: ``,
    imgbgColor: `info`,
    img: activity3,
    label: `Provide AI project Idea`,
    caption: `Upload full project idea with details for AI/ML projects and earn points `,
    number: `36/56`,
    progressBar: 100 * Number(36 / 56) + `%`,
    points: 2345,
    date: `02 Jun, 2020`,
  },
  {
    id: 4,
    time: `Updated 1hrs ago`,
    ratingClass: ``,
    imgbgColor: `danger`,
    img: activity4,
    label: `Upload AI project`,
    caption: `Upload your AI/ML project with live link and details and earn points. `,
    number: `1/1`,
    progressBar: 100 + `%`,
    points: 3000,
    date: `10 AUG, 2020`,
  },
];

const recentOrders = [
  {
    id: 1,
    clientImg: clientsData[1].logo,
    clientName: clientsData[1].name,
    userName: userData[1].title,
    userImg: userData[1].img,
    points: "4618",
  },

  {
    id: 2,
    clientImg: clientsData[2].logo,
    clientName: clientsData[2].name,
    userName: userData[2].title,
    userImg: userData[2].img,
    points: "4398",
  },

  {
    id: 3,
    clientImg: clientsData[3].logo,
    clientName: clientsData[3].name,
    userName: userData[3].title,
    userImg: userData[3].img,
    points: "4018",
  },

  {
    id: 4,
    clientImg: clientsData[4].logo,
    clientName: clientsData[4].name,
    userName: userData[4].title,
    userImg: userData[4].img,
    points: "4000",
  },

  {
    id: 5,
    clientImg: clientsData[5].logo,
    clientName: clientsData[5].name,
    userName: userData[5].title,
    userImg: userData[5].img,
    points: "3818",
  },
  {
    id: 6,
    clientImg: clientsData[6].logo,
    clientName: clientsData[6].name,
    userName: userData[6].title,
    userImg: userData[6].img,
    points: "3718",
  },

  {
    id: 7,
    clientImg: clientsData[7].logo,
    clientName: clientsData[7].name,
    userName: userData[7].title,
    userImg: userData[7].img,
    points: "3598",
  },

  {
    id: 8,
    clientImg: clientsData[8].logo,
    clientName: clientsData[8].name,
    userName: userData[8].title,
    userImg: userData[8].img,
    points: "3000",
  },

  {
    id: 9,
    clientImg: clientsData[9].logo,
    clientName: clientsData[9].name,
    userName: userData[9].title,
    userImg: userData[9].img,
    points: "4007",
  },

  {
    id: 10,
    clientImg: clientsData[0].logo,
    clientName: clientsData[0].name,
    userName: userData[0].title,
    userImg: userData[0].img,
    points: "2000",
  },
];

export {
  expolreNow,
  aution,
  NFTRanking,
  creatorsData,
  creatorsListData,
  walletConnectData,
  topDrop,
  topCreator,
  activitiesList,
  topCollection,
  tradingArtworkData,
  nftArtworkData,
  popularCreatorsNFT,
  marketPlacewidget,
  ecomWidgets,
  recentOrders,
  date,
  clientsData,
  userData,
  activitiesData,
  topartWork,
  topartWorkUser,
  featuredNFTData,
  popularityData,
  recentNFTsData,
  topCollectionData,
  popularCreatorsData,
  allMarketplaceData,
  monthMarketplaceData,
  halfyearMarketplaceData,
  yearMarketplaceData,
};
