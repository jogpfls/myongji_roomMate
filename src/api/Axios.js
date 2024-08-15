import axios from "axios";

export const Axios = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  // baseURL: process.env.REACT_APP_BASE_URL || "https://localhost:8080",
  withCredentials: true,
});
