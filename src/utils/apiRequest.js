import axios from "axios";

const newRequest = axios.create({
  baseURL: "https://dectec-backend.onrender.com/",
  withCredentials: true,
});

export default newRequest;
