import axios from "axios";

const API = axios.create({
  baseURL: "https://trendora-backend-zy6y.onrender.com/api",
});

export default API;
