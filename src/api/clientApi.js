import axios from "axios";
import {
  FETCH_POINTS_REWARDED_PER_ACTIVITY,
  TOP_REDEMPTIONS_LIST_URL,
} from "./apiUrls";

export const fetchPointsRewardedPerActivity = async (dateFilter = "1m") => {
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
    const { data } = await axios.get(
      FETCH_POINTS_REWARDED_PER_ACTIVITY,
      config
    );
    return data?.data ?? [];
  } catch (error) {
    return error?.response?.data ?? {};
  }
};
