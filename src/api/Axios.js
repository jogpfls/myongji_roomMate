import axios from "axios";

export const Axios = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL || "https://api.mutsideout.com",
  withCredentials: true,
});
