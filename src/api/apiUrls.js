const BASE_URL = "https://dectec.stagingapps.xyz/";
// const BASE_URL = "http://localhost:5001/";

const NGROK_URL =
  "https://20be-2409-4042-e0c-3ec8-613f-3f2d-8139-a4c7.ngrok-free.app/";
export const LOGIN_URL = BASE_URL + "user/login";
export const LOGOUT_URL = BASE_URL + "user/logout";
export const VERIFY_TOKEN = BASE_URL + "user/tokenExpiryCheck";
export const VERIFY_OTP_URL = BASE_URL + "user/verifyOtp";
export const SEND_OTP = BASE_URL + "user/sendOtp";

//Dashboard
export const DASHBOARD_SUMMARY_URL = BASE_URL + "dashboard/overview";
export const FETCH_DASHBOARD_PROTOCOL_REVENUE =
  BASE_URL + "dashboard/protocolRevenue";
export const FETCH_DASHBOARD_CLIENT_REVENUE =
  BASE_URL + "dashboard/clientRevenue";
export const FETCH_DASHBOARD_REDEMPTIONS = BASE_URL + "dashboard/redemption";

//Protocols
export const FETCH_PROTOCOL_LIST_URL = BASE_URL + "protocol/list";
export const FETCH_PROTOCOL_INFO_URL = BASE_URL + "protocol/info";
export const ADD_PROTOCOL_URL = BASE_URL + "protocol/addNew";
export const EDIT_PROTOCOL_URL = BASE_URL + "protocol/editInfo";
export const UPDATE_STATUS_PROTOCOL_URL = BASE_URL + "protocol/statusUpdate";
export const PROTOCOL_OVERVIEW_URL = BASE_URL + "protocol/overview";
export const GET_POINTS_FROM_AMOUNT_URL = BASE_URL + "protocol/amountPoints";
export const UPDATE_PROTOCOL_STATUS = BASE_URL + "protocol/statusUpdate";

//Clients
export const FETCH_CLIENT_INFO_URL = BASE_URL + "client/info";
export const ADD_CLIENT_URL = BASE_URL + "client/addNew";
export const ADD_ACTIVITY_CLIENT_URL = BASE_URL + "client/addActivity";
export const CLIENT_LISTING_URL = BASE_URL + "client/list";
export const EDIT_CLIENT_INFO_URL = BASE_URL + "client/editInfo";
export const VIEW_CLIENT_OVERVIEW_URL = BASE_URL + "client/overview";
export const FETCH_CLIENT_LIST_URL = BASE_URL + "client/list";
export const UPDATE_CLIENT_STATUS = BASE_URL + "client/statusUpdate";
export const CLIENT_BUY_POINTS = BASE_URL + "client/buyPoints";

export const ACTIVITIES_LIST_URL = BASE_URL + "activity/list";

// Users
export const FETCH_USER_OVERVIEW_URL = BASE_URL + "user/overview";
export const FETCH_USER_PROFILE_URL = BASE_URL + "user/getProfile";
export const EDIT_PROFILE_URL = BASE_URL + "user/editProfile";
export const ADD_USER_API = BASE_URL + "user/addUser";
export const FETCH_USER_POINTS_URL = BASE_URL + "user/points";
export const FETCH_USER_PROTOCOL_DATA_URL = BASE_URL + "user/protocolData";
export const FETCH_LAST_ACTIVITY_URL = BASE_URL + "activity/getLastActivity";

export const UPDATE_USER_STATUS = BASE_URL + "user/statusUpdate";
export const EARNED_POINTS_GRAPH = BASE_URL + "activity/revenue";

// Points Rewarded
export const FETCH_POINTS_REWARDED_URL = BASE_URL + "user/transactions";

// Redemptions
export const REDEMPTIONS_LIST_URL = BASE_URL + "redemptions/list";
export const TOP_REDEMPTIONS_LIST_URL = BASE_URL + "redemptions/topList";

// PAYMENTS
export const FETCH_CLIENT_PAYMENTS_URL = BASE_URL + "client/payments";

// Common
export const FETCH_ACTIVITIES = BASE_URL + "activity/list";
export const FETCH_ACTIVITY_POINTS = BASE_URL + "activity/points";
export const UPLOAD_ACTIVITY = NGROK_URL + "user/earnReward";
export const FETCH_CATEGORIES = BASE_URL + "category/list";

export const FETCH_POINTS_REWARDED_PER_ACTIVITY = BASE_URL + "activity/revenue";
export const FETCH_USER_BY_COUNTRIES = BASE_URL + "dashboard/userByCountries";

//Protocol dashboard urls
export const FETCH_TOP_USERS = BASE_URL + "user/topUsers";
export const FETCH_POINTS_HISTORY = BASE_URL + "protocol/pointsHistory";

// UTILITY URLS
export const FETCH_ACTIVITY_GAS_FEE = BASE_URL + "user/calcGasFees";
export const USER_UPLOAD_LIST = BASE_URL + "user/uploadDataList";
export const USER_UPLOAD_DETAIL = BASE_URL + "user/uploadDetails";
export const EARN_POINTS_URL = BASE_URL + "user/earnPoints";
export const GET_ACTIVITY_INFO = BASE_URL + "activity/info";
export const UPDATE_WALLET_ADDRESS = BASE_URL + "user/updateWalletId";
export const CHAT_API_URL = BASE_URL + "user/chat";




