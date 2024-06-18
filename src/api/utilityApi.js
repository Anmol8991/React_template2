import axios from "axios";
import {
  CHAT_API_URL,
  EARN_POINTS_URL,
  FETCH_ACTIVITIES,
  FETCH_ACTIVITY_GAS_FEE,
  GET_ACTIVITY_INFO,
  UPDATE_WALLET_ADDRESS,
  USER_UPLOAD_DETAIL,
  USER_UPLOAD_LIST,
} from "./apiUrls";

export const getActivityGasFee = async (data) => {
  const token = JSON.parse(localStorage.getItem("user_data")).token;
  const formData = new FormData();
  formData.append("activityId", data.activityId);
  if (data.file) formData.append("file", data.file);

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      ContentType: "multipart/form-data",
    },
  };
  try {
    const { data } = await axios.post(FETCH_ACTIVITY_GAS_FEE, formData, config);
    return data;
  } catch (error) {
    return error?.response?.data ?? {};
  }
};

export const fetchUploadList = async (pageNumber = 1, pageSize = 10, flag) => {
  const token = JSON.parse(localStorage.getItem("user_data")).token;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      pageNumber,
      pageSize,
      flag,
    },
  };
  try {
    const { data } = await axios.get(USER_UPLOAD_LIST, config);
    return data;
  } catch (error) {
    return error?.response?.data ?? {};
  }
};

export const fetchUploadFileDetail = async (fileId) => {
  const token = JSON.parse(localStorage.getItem("user_data")).token;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      fileId,
    },
  };
  try {
    const { data } = await axios.get(USER_UPLOAD_DETAIL, config);
    return data;
  } catch (error) {
    return error?.response?.data ?? {};
  }
};

export const earnPoints = async ({ activityId, file, data }) => {
  const formData = new FormData();
  formData.append("activityId", activityId);
  if (file) formData.append("file", file);
  if (data) formData.append("data", data);
  const token = JSON.parse(localStorage.getItem("user_data")).token;
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

export const getActivityList = async (categoryId) => {
  const token = JSON.parse(localStorage.getItem("user_data")).token;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      ...(categoryId ? { categoryId } : {}),
    },
  };

  try {
    const { data } = await axios.get(FETCH_ACTIVITIES, config);
    return data;
  } catch (error) {
    return error?.response?.data ?? {};
  }
};

export const getActivityInfo = async (activityId) => {
  const token = JSON.parse(localStorage.getItem("user_data")).token;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      ...(activityId ? { activityId } : {}),
    },
  };
  try {
    const { data } = await axios.get(GET_ACTIVITY_INFO, config);
    return data;
  } catch (error) {
    return error?.response?.data ?? {};
  }
};

export const updateWalletAddress = async (walletAddress) => {
  const formData = new FormData();
  formData.append("walletId", walletAddress);

  const token = JSON.parse(localStorage.getItem("user_data")).token;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      ContentType: "multipart/form-data",
    },
  };
  try {
    const { data } = await axios.patch(UPDATE_WALLET_ADDRESS, formData, config);
    return data;
  } catch (error) {
    return error?.response?.data ?? {};
  }
};

export const chatApi = async ({ question, brainName, files, prevMessages }) => {
  const token = JSON.parse(localStorage.getItem("user_data")).token;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      ContentType: "application/json",
    },
  };
  try {
    const { data } = await axios.post(
      CHAT_API_URL,
      { question, brainName, files, prevMessages },
      config
    );
    return data;
  } catch (error) {
    return error?.response?.data ?? {};
  }
};
