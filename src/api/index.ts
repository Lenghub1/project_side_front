import axios from "axios";

axios.defaults.baseURL = process.env.VITE_BASE_URL_DEV;
axios.defaults.headers.common["Authorization"] = "AUTH_TOKEN";
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";

export const api = axios.create({
  baseURL: "BASE_URL", // Change real server url
  timeout: 3000 // Request time
});
