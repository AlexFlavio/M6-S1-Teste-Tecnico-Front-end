import axios from "axios";

const API = axios.create({
  baseURL: "https://frontend-challenge-7bu3nxh76a-uc.a.run.app",
  timeout: 2000000,
});

export default API;
