import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || "http://192.168.1.1:4000/",
  withCredentials: true,
});

export default instance;