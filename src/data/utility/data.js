// Import Images
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
import activity3 from "@/assets/images/brands/dropbox.png";
import activity4 from "@/assets/images/brands/bitbucket.png";
import activity5 from "@/assets/images/brands/mail_chimp.png";

// creatorsData, creatorsListData

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

const dashboardWidgets = [

  {
    id: 1,
    cardColor: "primary",
    label: "Total Earned Points",
    counter: "558",
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
    counter: "6",
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
    counter: "365",
    bgcolor: "warning",
    icon: "bx bxs-down-arrow-circle",
    decimals: 0,
    prefix: "",
    suffix: "",
  },
];

const activitiesData = 
[
  {
    name: "Walk 10 km",
    des: "The task is designed for people who haven't started fitness walking and who don't have major health issues",
  },
  {
    name: "Read Blog",
    des: "Read the blog improve the reading skill and earn points",
  },

  {
    name: "Watch Videos",
    des: "Watch usefull videos to learn more and earn points",
  },

  {
    name: "Two hour Workout",
    des: "daily morning exercise kick-starts your metabolism, gets your heart pumping and may help lower your blood pressure",
  },
];

const recentOrders = 
[
  {
    id: 1,
    clientImg: clientsData[1].logo,
    clientName: clientsData[1].name,
    userName: userData[1].title,
    userImg: userData[1].img,
    type: "Gift Card",
    amount: 809.0,
    statusClass: "success",
    points: "4618",
  },

  {
    id: 2,
    clientImg: clientsData[2].logo,
    clientName: clientsData[2].name,
    userName: userData[2].title,
    userImg: userData[2].img,
    type: "Donation",
    amount: 800.0,
    statusClass: "danger",
    points: "4398",
  },

  {
    id: 3,
    clientImg: clientsData[3].logo,
    clientName: clientsData[3].name,
    userName: userData[3].title,
    userImg: userData[3].img,
    type: "Event",
    amount: 789.0,
    statusClass: "warning",
    points: "4018",
  },

  {
    id: 4,
    clientImg: clientsData[4].logo,
    clientName: clientsData[4].name,
    userName: userData[4].title,
    userImg: userData[4].img,
    type: "Event",
    amount: 779.0,
    statusClass: "warning",
    points: "4000",
  },

  {
    id: 5,
    clientImg: clientsData[5].logo,
    clientName: clientsData[5].name,
    userName: userData[5].title,
    userImg: userData[5].img,
    type: "Donation",
    amount: 689.0,
    statusClass: "danger",
    points: "3818",
  },
  {
    id: 6,
    clientImg: clientsData[6].logo,
    clientName: clientsData[6].name,
    userName: userData[6].title,
    userImg: userData[6].img,
    type: "Gift Card",
    amount: 659.0,
    statusClass: "success",
    points: "3718",
  },

  {
    id: 7,
    clientImg: clientsData[7].logo,
    clientName: clientsData[7].name,
    userName: userData[7].title,
    userImg: userData[7].img,
    type: "Donation",
    amount: 610.0,
    statusClass: "danger",
    points: "3598",
  },

  {
    id: 8,
    clientImg: clientsData[8].logo,
    clientName: clientsData[8].name,
    userName: userData[8].title,
    userImg: userData[8].img,
    type: "Event",
    amount: 590.0,
    statusClass: "warning",
    points: "3000",
  },

  {
    id: 9,
    clientImg: clientsData[9].logo,
    clientName: clientsData[9].name,
    userName: userData[9].title,
    userImg: userData[9].img,
    type: "Event",
    amount: 300.0,
    statusClass: "warning",
    points: "4007",
  },

  {
    id: 10,
    clientImg: clientsData[0].logo,
    clientName: clientsData[0].name,
    userName: userData[0].title,
    userImg: userData[0].img,
    type: "Donation",
    amount: 200.0,
    statusClass: "danger",
    points: "2000",
  },
];

const activityListData = [
    [1,"AI Code", "Write an AI code to fetch last 5 transactions to earn points","12/09/2022",500, '4358'],
    [2,"Tell us about Mindplex", "Let us know about the different dimensions they work on","11/10/2022",34, '8358'],
    [3,"Awareness", "Build something to spread the awareness of Mindplex magazine","15/12/2022",243, '8658'],
    [4,"Join our business", "Help peoples to interact or collaborate here.","21/09/2022",354,'5358'],
    [5,"Watch a Video", "Help people to get the right information.", "13/08/2022", 232,'1234'],
    [6, "Join our business", "Help people to interact or collaborate here.", "22/09/2022",500, '2358'],
    [7,"Watch a Video", "Help people to get the right information.", "23/08/2022", 321,'4334'],

];

const activityData = [
  {
    name:"AI Code",
    description: "Write an AI code to fetch last 5 transactions to earn points",
    date:"12/04/2023",
    points:500,
  },
  {
    name:"Tell us about Mindplex",
    description: "Let us know about the different dimensions they work on",
    date:"11/04/2023",
    points:34},
  {
    name:"Awareness",
    description: "Build something to spread the awareness of Mindplex magazine",
    date:"15/04/2023",
    points:243},
  {
    name:"Join our business",
    description: "Help peoples to interact or collaborate here.",
    date:"21/04/2023",
    points:354},
  {
    name:"Watch a Video", 
    description:"Help people to get the right information.",
    date: "13/05/2023", 
    points:232},
];

const activityTxnData = [
  {
    name:"AI Code",
    description: "Write an AI code to fetch last 5 transactions to earn points",
    date:"13/04/2023",
    points:500,
  },
  {
    name:"AI Code",
    description: "Write an AI code to fetch last 5 transactions to earn points",
    date:"13/04/2023",
    points:500,
  },
  {
    name:"AI Code",
    description: "Write an AI code to fetch last 5 transactions to earn points",
    date:"12/04/2023",
    points:500,
  },
  {
    name:"AI Code",
    description: "Write an AI code to fetch last 5 transactions to earn points",
    date:"12/04/2023",
    points:500,
  },
  {
    name:"AI Code",
    description: "Write an AI code to fetch last 5 transactions to earn points",
    date:"10/05/2023",
    points:500,
  },
  
];

const lastActivity = [
    {
      id: 1,
      time: `Updated 3hrs ago`,
      ratingClass: ``,
      imgbgColor: `warning`,
      img: activity1,
      label: `AI Code`,
      caption: `Write an AI code to fetch last 5 transactions to earn points`,
      number: `40/60`,
      progressBar: 100 * Number(40 / 60) + `%`,
      points: 23,
      date: `13 May, 2023`,
      link: "/activities/activity-detail",
    },
];

const revAll = [{ "name": "Earned Points", "type": "bar", "data": [89, 98, 108, 77, 84, 51, 92] }];
const rev1M = [{ "name": "Earned Points", "type": "bar", "data": [80, 99, 108, 77, 70, 90, 92] }];
const rev6M = [{ "name": "Earned Points", "type": "bar", "data": [30, 30, 9, 30, 10, 30, 50] }];
const rev1Y = [{ "name": "Earned Points", "type": "bar", "data": [60, 80, 108, 77, 80, 93, 92] }];

const redemptionData = [
  [1, "12/04/2023", "Gift Card", "$ 50", 500, "4358"],
  [2, "11/04/2023", "Donation", "$ 80", 34, "8358"],
  [3, "15/05/2023", "Event", "$ 30", 243, "8658"],
  [4, "21/04/2023", "Donation", "$ 50", 354, "5358"],
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
      link: "/activities/activity-detail"
  },
  {
      id: 2,
      time: `Updated 2hrs ago`,
      ratingClass: ``,
      imgbgColor: `danger`,
      img: activity5,
      label: `Upload your AI code`,
      caption: `Upload code with new functionality in AI/ML and earn points`,
      number: `20/67`,
      progressBar: 100 * Number(20 / 67) + `%`,
      points: 3456,
      date: `23 FEB, 2021`
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
      date: `02 Jun, 2020`
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
      date: `10 AUG, 2020`
  }
];

export {
  dashboardWidgets,
  recentOrders,
  clientsData,
  userData,
  activitiesData,
  activityListData,
  activityData,
  lastActivity,
  revAll,
  rev1M,
  rev6M,
  rev1Y,
  redemptionData,
  activityTxnData,
  activitiesList,
};
