import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const axiosInstance = axios.create({
  baseURL: process.env.BASE_URL,
  timeout: 10000,
    headers: {
    "Content-Type": "application/json",
    ...(process.env.ACCESS_TOKEN && {
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
    })
    }
});

export default axiosInstance;