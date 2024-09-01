import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://cyparta-backend-gf7qm.ondigitalocean.app/api",
  timeout: 5000,
});

export default axiosInstance;
