import axios from "axios";

import {
  FETCH_PROTOCOL_LIST_URL,
  FETCH_PROTOCOL_INFO_URL,
  ADD_PROTOCOL_URL,
  EDIT_PROTOCOL_URL,
  DASHBOARD_SUMMARY_URL,
  FETCH_DASHBOARD_PROTOCOL_REVENUE,
  FETCH_DASHBOARD_CLIENT_REVENUE,
  FETCH_CLIENT_INFO_URL,
  ADD_CLIENT_URL,
  FETCH_DASHBOARD_REDEMPTIONS,
  CLIENT_LISTING_URL,
  EDIT_CLIENT_INFO_URL,
  FETCH_USER_OVERVIEW_URL,
  VIEW_CLIENT_OVERVIEW_URL,
  FETCH_USER_PROFILE_URL,
  EDIT_PROFILE_URL,
  FETCH_ACTIVITIES,
  UPDATE_STATUS_PROTOCOL_URL,
  FETCH_POINTS_REWARDED_URL,
  ADD_USER_API,
  FETCH_CLIENT_LIST_URL,
  REDEMPTIONS_LIST_URL,
  PROTOCOL_OVERVIEW_URL,
  FETCH_CLIENT_PAYMENTS_URL,
  FETCH_USER_POINTS_URL,
  TOP_REDEMPTIONS_LIST_URL,
  FETCH_USER_PROTOCOL_DATA_URL,
  FETCH_LAST_ACTIVITY_URL,
  GET_POINTS_FROM_AMOUNT_URL,
  UPDATE_USER_STATUS,
  UPDATE_CLIENT_STATUS,
  FETCH_ACTIVITY_POINTS,
  CLIENT_BUY_POINTS,
  UPLOAD_ACTIVITY,
  EARNED_POINTS_GRAPH,
  FETCH_CATEGORIES,
  EARN_POINTS_URL,
} from "./apiUrls";

// FETCH DASHBOARD WIDGET DATA IN DECTEC ADMIN
export const fetchDashboardSummary = async () => {
  const token = JSON.parse(localStorage.getItem("user_data")).token;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const { data } = await axios.get(DASHBOARD_SUMMARY_URL, config);
    return data;
  } catch (error) {
    return error?.response?.data ?? {};
  }
};

// FETCH PROTOCOLS INFO API (PROTOCOLS PAGE TABLE)
// FETCH DASHBOARD PROTOCOL REVENUE DATA IN DECTEC ADMIN
export const fetchDashboardProtocolRevenue = async () => {
  const token = JSON.parse(localStorage.getItem("user_data")).token;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const { data } = await axios.get(FETCH_DASHBOARD_PROTOCOL_REVENUE, config);
    return data;
  } catch (error) {
    return error?.response?.data ?? {};
  }
};

// FETCH PROTOCOL LIST API (DASHBOARD CLIENT REVENUE CHART DROPDOWN) IN DECTEC ADMIN
export const fetchProtocols = async () => {
  const token = JSON.parse(localStorage.getItem("user_data")).token;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const { data } = await axios.get(`${FETCH_PROTOCOL_LIST_URL}`, config);
    return data;
  } catch (error) {
    return error?.response ?? {};
  }
};

// FETCH CLIENT REVENUE API (DASHBOARD CLIENT REVENUE CHART) IN DECTEC ADMIN
export const fetchClientRevenue = async (protocolId) => {
  const token = JSON.parse(localStorage.getItem("user_data")).token;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: { protocolId },
  };
  try {
    const { data } = await axios.get(
      FETCH_DASHBOARD_CLIENT_REVENUE,

      config
    );
    return data;
  } catch (error) {
    return error?.response?.data ?? {};
  }
};

// FETCH REDEMPTIONS API (DASHBOARD REDEMPTIONS CHART) IN DECTEC ADMIN
export const fetchRedemptions = async (protocolId) => {
  const token = JSON.parse(localStorage.getItem("user_data")).token;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      ...(protocolId ? { protocolId } : {}),
    },
  };
  try {
    const { data } = await axios.get(FETCH_DASHBOARD_REDEMPTIONS, config);
    return data;
  } catch (error) {
    return error?.response?.data ?? {};
  }
};

// FETCH PROTOCOLS INFO API (PROTOCOLS PAGE TABLE) IN DECTEC ADMIN
export const fetchProtocolInfo = async (
  pageNumber = 1,
  pageSize = 10,
  protocolId
) => {
  const token = JSON.parse(localStorage.getItem("user_data")).token;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      pageNumber,
      pageSize,
      ...(protocolId ? { protocolId } : {}),
    },
  };
  try {
    const { data } = await axios.get(FETCH_PROTOCOL_INFO_URL, config);
    return data;
  } catch (error) {
    return error?.response?.data ?? {};
  }
};

// ADD PROTOCOL API
export const addProtocolApi = async (protocolData) => {
  const token = JSON.parse(localStorage.getItem("user_data")).token;
  const formData = Object.keys(protocolData).reduce((formData, key) => {
    formData.append(key, protocolData[key]);
    return formData;
  }, new FormData());
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      ContentType: "multipart/form-data",
    },
  };

  try {
    const { data } = await axios.post(ADD_PROTOCOL_URL, formData, config);
    return data;
  } catch (error) {
    return error?.response?.data ?? {};
  }
};

// VIEW PROTOCOL API WITH PROTOCOLID

export const viewProtocolInfo = async (protocolId) => {
  const token = JSON.parse(localStorage.getItem("user_data")).token;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: { protocolId, pageNumber: 1, pageSize: 1 },
  };
  try {
    const { data } = await axios.get(FETCH_PROTOCOL_INFO_URL, config);
    return data;
  } catch (error) {
    return error?.response?.data ?? {};
  }
};

//EDIT PROTOCOL API WITH PROTOCOLID

export const editProtocolInfo = async (protocolData) => {
  const token = JSON.parse(localStorage.getItem("user_data")).token;
  const formData = Object.keys(protocolData).reduce((formData, key) => {
    formData.append(key, protocolData[key]);
    return formData;
  }, new FormData());
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      ContentType: "multipart/form-data",
    },
  };
  try {
    const { data } = await axios.patch(EDIT_PROTOCOL_URL, formData, config);
    return data;
  } catch (error) {
    return error?.response?.data ?? {};
  }
};

//FETCH CLIENT INFO
export const fetchClientInfo = async (
  pageNumber = 1,
  pageSize = 20,
  protocolId,
  clientId
) => {
  const token = JSON.parse(localStorage.getItem("user_data")).token;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      pageNumber,
      pageSize,
      ...(protocolId ? { protocolId } : {}),
      ...(clientId ? { clientId } : {}),
    },
  };
  try {
    const { data } = await axios.get(FETCH_CLIENT_INFO_URL, config);
    return data;
  } catch (error) {
    return error?.response?.data ?? {};
  }
};

//ADD CLIENT API

export const addClientApi = async (clientData) => {
  const token = JSON.parse(localStorage.getItem("user_data")).token;
  const formData = Object.keys(clientData).reduce((formData, key) => {
    formData.append(key, clientData[key]);
    return formData;
  }, new FormData());
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      ContentType: "multipart/form-data",
    },
  };
  try {
    const { data } = await axios.post(ADD_CLIENT_URL, formData, config);
    return data;
  } catch (error) {
    return error?.response?.data ?? {};
  }
};

// CLIENT LISTING API
export const fetchClientListingApi = async (clientId) => {
  const token = JSON.parse(localStorage.getItem("user_data")).token;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: { clientId: clientId, pageNumber: 1, pageSize: 10 },
  };
  try {
    const { data } = await axios.get(FETCH_CLIENT_INFO_URL, config);
    return data;
  } catch (error) {
    return error?.response?.data ?? {};
  }
};

//EDIT CLIENT DETAILS
export const editClientInfoApi = async (clientData) => {
  const token = JSON.parse(localStorage.getItem("user_data")).token;

  const formData = Object.keys(clientData).reduce((formData, key) => {
    formData.append(key, clientData[key]);
    return formData;
  }, new FormData());
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      ContentType: "multipart/form-data",
    },
  };

  try {
    const { data } = await axios.patch(EDIT_CLIENT_INFO_URL, formData, config);

    return data;
  } catch (error) {
    return error?.response?.data ?? {};
  }
};

// CLIENT BUY POINTS
export const clientBuyPoints = async (params) => {
  const token = JSON.parse(localStorage.getItem("user_data")).token;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const { data } = await axios.post(CLIENT_BUY_POINTS, params, config);
    return data;
  } catch (error) {
    return error?.response?.data ?? {};
  }
};

// UPDATE USER STATUS
export const updateClientStatus = async (clientId) => {
  const token = JSON.parse(localStorage.getItem("user_data")).token;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const { data } = await axios.patch(UPDATE_CLIENT_STATUS, clientId, config);
    return data;
  } catch (error) {
    return error?.response?.data ?? {};
  }
};

// FETCH VIEW CLIENT OVERVIEW (CLIENT - VIEW CLIENT WIDGETS DATA)

export const fetchClientOverview = async (clientId) => {
  const token = JSON.parse(localStorage.getItem("user_data")).token;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: { clientId },
  };
  try {
    const { data } = await axios.get(VIEW_CLIENT_OVERVIEW_URL, config);
    return data;
  } catch (error) {
    return error?.response?.data ?? {};
  }
};

// FETCH USER OVERVIEW (USER - WIDGETS DATA)
export const fetchUserOverview = async () => {
  const token = JSON.parse(localStorage.getItem("user_data")).token;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const { data } = await axios.get(FETCH_USER_OVERVIEW_URL, config);
    return data;
  } catch (error) {
    return error?.response?.data ?? {};
  }
};

// VIEW USER PROFILE API WITH/WITHOUT USERID

export const viewProfileInfo = async (userId, protocolId, clientId) => {
  const token = JSON.parse(localStorage.getItem("user_data")).token;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      ...(userId ? { userId } : {}),
      ...(protocolId ? { protocolId } : {}),
      ...(clientId ? { clientId } : {}),
    },
  };
  try {
    const { data } = await axios.get(FETCH_USER_PROFILE_URL, config);
    return data;
  } catch (error) {
    return error?.response?.data ?? {};
  }
};

// ADD USER
export const addUserApi = async (userData) => {
  const token = JSON.parse(localStorage.getItem("user_data")).token;
  const formData = Object.keys(userData).reduce((formData, key) => {
    formData.append(key, userData[key]);
    return formData;
  }, new FormData());
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      ContentType: "multipart/form-data",
    },
  };
  try {
    const { data } = await axios.post(ADD_USER_API, formData, config);
    return data;
  } catch (error) {
    return error?.response?.data ?? {};
  }
};

//EDIT USER PROFILE
export const editProfileApi = async (userData) => {
  const token = JSON.parse(localStorage.getItem("user_data")).token;
  const formData = Object.keys(userData).reduce((formData, key) => {
    formData.append(key, userData[key]);
    return formData;
  }, new FormData());
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      ContentType: "multipart/form-data",
    },
  };
  try {
    const { data } = await axios.patch(EDIT_PROFILE_URL, formData, config);
    return data;
  } catch (error) {
    return error?.response?.data ?? {};
  }
};

// UPDATE USER STATUS
export const updateUserStatus = async (userId) => {
  const token = JSON.parse(localStorage.getItem("user_data")).token;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const { data } = await axios.patch(UPDATE_USER_STATUS, userId, config);
    return data;
  } catch (error) {
    return error?.response?.data ?? {};
  }
};

//ACTIVITIES DATA
export const activitiesApi = async (
  pageNumber = 1,
  pageSize = 10,
  protocolId,
  clientId,
  activityId
) => {
  const token = JSON.parse(localStorage.getItem("user_data")).token;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      pageNumber,
      pageSize,
      ...(protocolId ? { protocolId } : {}),
      ...(clientId ? { clientId } : {}),
      ...(activityId ? { activityId } : {}),
    },
  };

  try {
    const { data } = await axios.get(FETCH_ACTIVITIES, config);
    return data;
  } catch (error) {
    return error?.response?.data ?? {};
  }
};

//UPDATE PROTOCOL STATUS
export const updateProtocolStatus = async (protocolId) => {
  const token = JSON.parse(localStorage.getItem("user_data")).token;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const { data } = await axios.patch(
      UPDATE_STATUS_PROTOCOL_URL,
      protocolId,
      config
    );
    return data;
  } catch (error) {
    return error?.response?.data ?? {};
  }
};

// GET POINTS REWARDED PAGES API
export const fetchPointsRewarded = async (
  pageNumber = 1,
  pageSize = 10,
  protocolId,
  clientId,
  categoryId
) => {
  const token = JSON.parse(localStorage.getItem("user_data")).token;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      pageNumber,
      pageSize,
      ...(protocolId ? { protocolId } : {}),
      ...(clientId ? { clientId } : {}),
      ...(categoryId ? { categoryId } : {}),
    },
  };

  try {
    const { data } = await axios.get(FETCH_POINTS_REWARDED_URL, config);

    return data;
  } catch (error) {
    return error?.response?.data ?? {};
  }
};
//FETCH CLIENT LIST API (used for populating dropdowns)
//FETCH CLIENT INFO
export const fetchClientList = async (protocolId) => {
  const token = JSON.parse(localStorage.getItem("user_data")).token;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      ...(protocolId ? { protocolId } : {}),
    },
  };
  try {
    const { data } = await axios.get(FETCH_CLIENT_LIST_URL, config);
    return data;
  } catch (error) {
    return error?.response?.data ?? {};
  }
};

// FETCH PROTOCOL OVERVIEW IN VIEW PROTOCOL
export const fetchProtocolOverview = async (protocolId) => {
  const token = JSON.parse(localStorage.getItem("user_data")).token;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: { protocolId },
  };
  try {
    const { data } = await axios.get(PROTOCOL_OVERVIEW_URL, config);
    return data;
  } catch (error) {
    return error?.response?.data ?? {};
  }
};

// FETCH REDEMPTIONS LISTS IN REDEMPTIONS PAGE TABLE
export const fetchRedemptionList = async (
  pageNumber = 1,
  pageSize = 10,
  protocolId,
  clientId
) => {
  const token = JSON.parse(localStorage.getItem("user_data")).token;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      pageNumber,
      pageSize,
      ...(protocolId ? { protocolId } : {}),
      ...(clientId ? { clientId } : {}),
    },
  };
  try {
    const { data } = await axios.get(REDEMPTIONS_LIST_URL, config);
    return data;
  } catch (error) {
    return error?.response?.data ?? {};
  }
};

// FETCH TOP REDEMPTIONS LIST FOR DASHBOARD TOP REDEMPTIONS TABLE
export const fetchTopRedemptionList = async () => {
  const token = JSON.parse(localStorage.getItem("user_data")).token;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      pageNumber: 1,
      pageSize: 10,
    },
  };
  try {
    const { data } = await axios.get(TOP_REDEMPTIONS_LIST_URL, config);
    return data;
  } catch (error) {
    return error?.response?.data ?? {};
  }
};

//CLIENT PAYMENTS LIST
export const clientPaymentsApi = async ({
  pageNumber,
  pageSize,
  protocolId,
  clientId,
}) => {
  const token = JSON.parse(localStorage.getItem("user_data")).token;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      pageNumber,
      pageSize,
      ...(protocolId ? { protocolId } : {}),
      ...(clientId ? { clientId } : {}),
    },
  };
  try {
    const { data } = await axios.get(FETCH_CLIENT_PAYMENTS_URL, config);
    return data;
  } catch (error) {
    return error?.response?.data ?? {};
  }
};

//USERS LIST
export const usersListApi = async (
  pageNumber,
  pageSize,
  protocolId,
  clientId
) => {
  const token = JSON.parse(localStorage.getItem("user_data")).token;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      pageNumber,
      pageSize,
      ...(protocolId ? { protocolId } : {}),
      ...(clientId ? { clientId } : {}),
    },
  };

  try {
    const { data } = await axios.get(FETCH_USER_POINTS_URL, config);
    return data;
  } catch (error) {
    return error?.response?.data ?? {};
  }
};

//FETCHES ALL PROTOCOL AND CLIENTS INFO OF USER
export const fetchUserProtocolDataApi = async (userId) => {
  const token = JSON.parse(localStorage.getItem("user_data")).token;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      ...(userId ? { userId } : {}),
    },
  };

  try {
    const { data } = await axios.get(FETCH_USER_PROTOCOL_DATA_URL, config);

    return data;
  } catch (error) {
    return error?.response?.data ?? {};
  }
};

// FETCH LAST ACTIVITY FOR UTILITY

export const fetchLastActivity = async () => {
  const token = JSON.parse(localStorage.getItem("user_data")).token;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const { data } = await axios.get(FETCH_LAST_ACTIVITY_URL, config);
    return data;
  } catch (error) {
    return error?.response?.data ?? {};
  }
};

//GET POINTS FROM AMOUNT PAID
export const getPointsFromAmountPaidApi = async (protocolId, amount = 0) => {
  const token = JSON.parse(localStorage.getItem("user_data")).token;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      protocolId,
      amount,
    },
  };

  try {
    const { data } = await axios.get(GET_POINTS_FROM_AMOUNT_URL, config);

    return data;
  } catch (error) {
    return error?.response?.data ?? {};
  }
};

//ACTIVITY POINTS INFO
export const fetchActivityPoints = async (
  pageNumber = 1,
  pageSize = 10,
  protocolId,
  clientId
) => {
  const token = JSON.parse(localStorage.getItem("user_data")).token;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      pageNumber,
      pageSize,
      ...(protocolId ? { protocolId } : {}),
      ...(clientId ? { clientId } : {}),
    },
  };

  try {
    const { data } = await axios.get(FETCH_ACTIVITY_POINTS, config);
    return data;
  } catch (error) {
    return error?.response?.data ?? {};
  }
};

//UPLOAD DATA
export const uploadActivityApi = async (uploadData) => {
  const token = JSON.parse(localStorage.getItem("user_data")).token;
  const { activityId, file, points, walletId, activityName } = uploadData;
  const formData = new FormData();
  formData.append("activityId", activityId);
  formData.append("file", file);
  formData.append("points", points);
  formData.append("walletId", walletId);
  formData.append("activityName", activityName);
  formData.append("userAddress", "0x607d0293C4D3F96084cBfc1D253cf7A06c9578a1");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      ContentType: "multipart/form-data",
    },
  };
  try {
    const { data } = await axios.post(EARN_POINTS_URL, formData, config);
    return data;
  } catch (error) {
    return error?.response?.data ?? {};
  }
};

//EARNED POINTS GRAPH
export const earnedPointsGraphApi = async (dateFilter) => {
  const token = JSON.parse(localStorage.getItem("user_data")).token;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      ...(dateFilter ? { dateFilter } : {}),
    },
  };
  try {
    const { data } = await axios.get(EARNED_POINTS_GRAPH, config);
    return data;
  } catch (error) {
    return error?.response?.data ?? {};
  }
};

//CATEGORIES DATA
export const categoriesApi = async () => {
  const token = JSON.parse(localStorage.getItem("user_data")).token;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const { data } = await axios.get(FETCH_CATEGORIES, config);
    return data;
  } catch (error) {
    return error?.response?.data ?? {};
  }
};
