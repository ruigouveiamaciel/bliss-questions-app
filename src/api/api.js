import axios from "axios";

// The axios instance
const api = axios.create({
  baseURL: "https://private-bbbe9-blissrecruitmentapi.apiary-mock.com/",
  timeout: 5000,
});

export default api;
