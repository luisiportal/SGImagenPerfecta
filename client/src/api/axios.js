import axios from "axios";

const instance = axios.create({
  baseURL: "http://192.168.1.1:4000/",
  withCredentials: true,
});

export default instance;