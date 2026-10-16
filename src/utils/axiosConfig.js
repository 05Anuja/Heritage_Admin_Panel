import axios from "axios";
import { url } from "../../constants.js";

const Axios = axios.create({
  baseURL: url,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request Interceptor
Axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
Axios.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle unauthorized responses here when auth flow is implemented.
    return Promise.reject(error);
  }
);

export default Axios;