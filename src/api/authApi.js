import axios from "axios";
import {
  LOGIN_URL,
  LOGOUT_URL,
  SEND_OTP,
  VERIFY_OTP_URL,
  VERIFY_TOKEN,
} from "./apiUrls";

export const login = async (credentials) => {
  try {
    const { data } = await axios.post(LOGIN_URL, {}, { auth: credentials });
    return data;
  } catch (error) {
    return error?.response?.data ?? {};
  }
};

export const verifyToken = async () => {
  const token = JSON.parse(localStorage.getItem("user_data")).token;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const { data } = await axios.get(VERIFY_TOKEN, config);
    return data;
  } catch (error) {
    return error?.response?.data ?? {};
  }
};

export const verifyOtp = async (credentials) => {
  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };
  try {
    const { data } = await axios.post(VERIFY_OTP_URL, credentials, config);
    return data;
  } catch (error) {
    return error?.response?.data ?? {};
  }
};

export const logout = async () => {
  const token = JSON.parse(localStorage.getItem("user_data")).token;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const { data } = await axios.post(LOGOUT_URL, {}, config);
    return data;
  } catch (error) {
    return error?.response?.data ?? {};
  }
};

export const sendEmailOtp = async (credentials) => {
  try {
    const { data } = await axios.post(SEND_OTP, credentials);
    return data;
  } catch (error) {
    return error?.response?.data ?? {};
  }
};
