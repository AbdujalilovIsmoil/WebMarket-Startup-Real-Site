import axios from "axios";

const api = axios.create({
  baseURL: "https://startupwepapp.onrender.com/api",
});

export default api;
