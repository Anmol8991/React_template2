import axios from "axios";
import {
  ADD_ACTIVITY_CLIENT_URL,
  ADD_CLIENT_URL,
  CLIENT_BUY_POINTS,
  CLIENT_LISTING_URL,
  EDIT_CLIENT_INFO_URL,
  FETCH_ACTIVITIES,
  FETCH_CLIENT_INFO_URL,
  FETCH_CLIENT_PAYMENTS_URL,
  FETCH_POINTS_HISTORY,
  FETCH_TOP_USERS,
  FETCH_USER_BY_COUNTRIES,
  GET_POINTS_FROM_AMOUNT_URL,
  PROTOCOL_OVERVIEW_URL,
  TOP_REDEMPTIONS_LIST_URL,
  ACTIVITIES_LIST_URL
} from "./apiUrls";

// FETCH PROTOCOL OVERVIEW IN VIEW PROTOCOL
export const fetchProtocolOverview = async () => {
  const token = JSON.parse(localStorage.getItem("user_data")).token;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const { data } = await axios.get(PROTOCOL_OVERVIEW_URL, config);
    return data;
  } catch (error) {
    return error?.response?.data ?? {};
  }
};


export const fetchActivityInfo = async (pageNumber = 1, pageSize = 10) => {
  const token = JSON.parse(localStorage.getItem("user_data")).token;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      pageNumber,
      pageSize,
    },
  };
  try {
    const { data } = await axios.get(ACTIVITIES_LIST_URL, config);

    return data;
  } catch (error) {
    return error?.response?.data ?? {};
  }
};

export const fetchUsersByCountries = async () => {
  const token = JSON.parse(localStorage.getItem("user_data")).token;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const { data } = await axios.get(FETCH_USER_BY_COUNTRIES, config);

    return data;
  } catch (error) {
    return error?.response?.data ?? {};
  }
};

export const fetchTopUsers = async () => {
  const token = JSON.parse(localStorage.getItem("user_data")).token;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const { data } = await axios.get(FETCH_TOP_USERS, config);
    return data;
  } catch (error) {
    return error?.response?.data ?? {};
  }
};

export const fetchTopRedemptionList = async (pageNumber = 1, pageSize = 10) => {
  const token = JSON.parse(localStorage.getItem("user_data")).token;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      pageNumber,
      pageSize,
    },
  };
  try {
    const { data } = await axios.get(TOP_REDEMPTIONS_LIST_URL, config);

    return data;
  } catch (error) {
    return error?.response?.data ?? {};
  }
};

//FETCH CLIENT INFO
export const fetchClientInfo = async (
  pageNumber = 1,
  pageSize = 20,
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

export const fetchClientListByProtocolId = async (protocolId) => {
  const token = JSON.parse(localStorage.getItem("user_data")).token;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      protocolId
    },
  };
  try {
    const { data } = await axios.get(CLIENT_LISTING_URL, config);
    return data;
  } catch (error) {
    return error?.response?.data ?? {};
  }
};

export const fetchPointsHistory = async (dateFilter = "1y") => {
  const token = JSON.parse(localStorage.getItem("user_data")).token;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      dateFilter,
    },
  };
  try {
    const { data } = await axios.get(FETCH_POINTS_HISTORY, config);
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


//ADD CLIENT API
export const addActivityApi = async (activitiesData) => {
  const token = JSON.parse(localStorage.getItem("user_data")).token;
  const formData = Object.keys(activitiesData).reduce((formData, key) => {
    formData.append(key, activitiesData[key]);
    return formData;
  }, new FormData());
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      ContentType: "multipart/form-data",
    },
  };
  try {
    const { data } = await axios.post(ADD_ACTIVITY_CLIENT_URL, formData, config);
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

//ACTIVITIES DATA
export const activitiesApi = async (
  pageNumber = 1,
  pageSize = 10,
  protocolId,
  clientId,
  activityId,
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