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
import company6 from "@/assets/images/demo/company2.png";
import avatar1 from "@/assets/images/users/avatar-1.jpg";
import avatar2 from "@/assets/images/users/avatar-2.jpg";
import avatar3 from "@/assets/images/users/avatar-3.jpg";
import avatar4 from "@/assets/images/users/avatar-4.jpg";
import avatar5 from "@/assets/images/users/avatar-5.jpg";
import avatar6 from "@/assets/images/users/avatar-6.jpg";
import avatar7 from "@/assets/images/users/avatar-7.jpg";
import avatar8 from "@/assets/images/users/avatar-8.jpg";

const dashboardWidgets = [
    {
        id: 4,
        cardColor: "info",
        label: "Amount Received",
        counter: "165.89",
        bgcolor: "danger bg-gradient",
        icon: "bx bx-wallet",
        decimals: 2,
        prefix: "$",
        suffix: ""
    },
    {
        id: 1,
        cardColor: "primary",
        label: "Redeemed Amount",
        counter: "559.25",
        bgcolor: "success bg-gradient",
        icon: "bx bx-dollar-circle",
        decimals: 2,
        prefix: "$",
        suffix: ""
    },
    {
        id: 3,
        cardColor: "success",
        label: "Earned Points",
        counter: "813",
        bgcolor: "info bg-gradient",
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
        bgcolor: "success bg-gradient",
        icon: "bx bx-gift",
        decimals: 0,
        prefix: "",
        suffix: "k",
        link: "redemption"
    },

];

const bestSellingProducts = [
    {
        id: 1,
        img: product1,
        label: "Branded T-Shirts",
        date: "24 Apr 2021",
        price: 29.0,
        orders: 62,
        stock: 510,
        amount: 1798,
    },
    {
        id: 2,
        img: product2,
        label: "Bentwood Chair",
        date: "19 Mar 2021",
        price: 85.2,
        orders: 35,
        amount: 2982,
    },
    {
        id: 3,
        img: product3,
        label: "Borosil Paper Cup",
        date: "01 Mar 2021",
        price: 14.0,
        orders: 80,
        stock: 749,
        amount: 1120,
    },
    {
        id: 4,
        img: product4,
        label: "One Seater Sofa",
        date: "11 Feb 2021",
        price: 127.5,
        orders: 56,
        amount: 7140,
    },
    {
        id: 5,
        img: product5,
        label: "Stillbird Helmet",
        date: "17 Jan 2021",
        price: 54,
        orders: 74,
        stock: 805,
        amount: 3996,
    },
];

const topSellers = [
    {
        id: 1,
        img: company1,
        label: "iTest Factory",
        name: "Oliver Tyler",
        product: "Bags and Wallets",
        stock: 8547,
        amount: 541200,
        percentage: 32,
    },
    {
        id: 2,
        img: company2,
        label: "Digitech Galaxy",
        name: "John Roberts",
        product: "Watches",
        stock: 895,
        amount: 75030,
        percentage: 79,
    },
    {
        id: 3,
        img: company3,
        label: "Nesta Technologies",
        name: "Harley Fuller",
        product: "Bike Accessories",
        stock: 3470,
        amount: 45600,
        percentage: 90,
    },
    {
        id: 4,
        img: company8,
        label: "Zoetic Fashion",
        name: "James Bowen",
        product: "Clothes",
        stock: 5488,
        amount: 29456,
        percentage: 40,
    },
    {
        id: 5,
        img: company5,
        label: "Meta4Systems",
        name: "Zoe Dennis",
        product: "Furniture",
        stock: 4100,
        amount: 11260,
        percentage: 57,
    },
];

const recentOrders = [
    {
        id: 1,
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
        userImg: avatar2,
        userName: "Allexa",
        type: "Donation",
        amount: 800.0,
        statusClass: "danger",
        points: "4398",
    },

    {
        id: 3,
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
        userImg: avatar4,
        userName: "Nell Potter",
        type: "Event",
        amount: 779.0,
        statusClass: "warning",
        points: "4000",
    },

    {
        id: 5,
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
        userImg: avatar7,
        userName: "	Chase Osborne",
        type: "Donation",
        amount: 610.0,
        statusClass: "danger",
        points: "3598",
    },

    {
        id: 8,
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
        userImg: avatar2,
        userName: "Ivory Bush",
        type: "Event",
        amount: 300.0,
        statusClass: "warning",
        points: "4007",
    },

    {
        id: 10,
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

const topCategories = [
    {
        id: 1,
        category: "Mobile & Accessories",
        total: "10,294",
    },
    {
        id: 2,
        category: "Desktop",
        total: "6,256",
    },
    {
        id: 3,
        category: "Electronics",
        total: "3,479",
    },
    {
        id: 4,
        category: "Home & Furniture",
        total: "2,275",
    },
    {
        id: 5,
        category: "Grocery",
        total: "1,950",
    },
    {
        id: 6,
        category: "Fashion",
        total: "1,582",
    },
    {
        id: 7,
        category: "Appliances",
        total: "1,037",
    },
    {
        id: 8,
        category: "Beauty, Toys & More",
        total: "924",
    },
    {
        id: 9,
        category: "Food & Drinks",
        total: "701",
    },
    {
        id: 10,
        category: "Toys & Games",
        total: "239",
    },
];

// Revenue Chart Data
const allRevenueData = [
    {
        name: "Orders",
        type: "area",
        data: [34, 65, 46, 68, 49, 61, 42, 44, 78, 52, 63, 67],
    },
    {
        name: "Earnings",
        type: "bar",
        data: [
            89.25, 98.58, 68.74, 108.87, 77.54, 84.03, 51.24, 28.57, 92.57, 42.36,
            88.51, 36.57,
        ],
    },
    {
        name: "Refunds",
        type: "line",
        data: [8, 12, 7, 17, 21, 11, 5, 9, 7, 29, 12, 35],
    },
];

const monthRevenueData = [
    {
        name: "Orders",
        type: "area",
        data: [54, 85, 66, 18, 29, 31, 12, 14, 38, 72, 33, 27],
    },
    {
        name: "Earnings",
        type: "bar",
        data: [
            89.25, 98.58, 68.74, 108.87, 77.54, 84.03, 51.24, 28.57, 92.57, 42.36,
            88.51, 36.57,
        ],
    },
    {
        name: "Refunds",
        type: "line",
        data: [18, 22, 27, 37, 41, 21, 15, 19, 27, 19, 22, 45],
    },
];

const halfYearRevenueData = [
    {
        name: "Orders",
        type: "area",
        data: [34, 65, 46, 68, 49, 61, 42, 44, 78, 52, 63, 67],
    },
    {
        name: "Earnings",
        type: "bar",
        data: [
            89.25, 98.58, 68.74, 108.87, 77.54, 84.03, 51.24, 28.57, 92.57, 42.36,
            88.51, 36.57,
        ],
    },
    {
        name: "Refunds",
        type: "line",
        data: [8, 22, 87, 47, 41, 31, 5, 9, 47, 49, 32, 55],
    },
];

const yearRevenueData = [
    {
        name: "Orders",
        type: "area",
        data: [14, 35, 26, 38, 29, 31, 22, 24, 58, 32, 33, 77],
    },
    {
        name: "Earnings",
        type: "bar",
        data: [
            99.25, 88.58, 78.74, 118.87, 87.54, 94.03, 61.24, 58.57, 102.57, 62.36,
            48.51, 66.57,
        ],
    },
    {
        name: "Refunds",
        type: "line",
        data: [58, 42, 47, 57, 71, 21, 15, 69, 17, 39, 52, 55],
    },
];

const paymentData = [
    {   points: 500,
        amount: "510",
        date: "12/09/2022" 
    },
    {   points: 700,
        amount: "820",
        date: "10/03/2022" 
    },
    {   points: 600,
        amount: "630",
        date: "04/12/2022" 
    },
    {   points: 800,
        amount: "960",
        date: "12/06/2022" 
    },
    {   points: 500,
        amount: "510",
        date: "12/09/2022" 
    },
  ];

export { dashboardWidgets,paymentData, bestSellingProducts, topSellers, recentOrders, topCategories, allRevenueData, monthRevenueData, halfYearRevenueData, yearRevenueData };