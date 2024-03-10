// import axios from "axios";

axios.defaults.baseURL = process.env.VITE_BASE_URL_DEV;
axios.defaults.headers.common["Authorization"] = "AUTH_TOKEN";
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";

// export const api = axios.create({
//   baseURL: "BASE_URL", // Change real server url
//   timeout: 3000, // Request time
// });

import axios from "axios";

// function to get the access token from memory
function getAccessToken() {
  // retrieve the access token from memory
  // example
  function getAccessToken() {
    return 1;
  }
  return getAccessToken();
}

// Create an instance of axios with custom configuration
export const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL_DEV || "http://localhost:3000/api/v1",
  timeout: 3000,
  withCredentials: true, // include cookies in the request
  headers: {
    "Content-Type": "application/x-www-form-urlencoded"
  }
});

// function to automatically set the Authorization header if an access token is present
api.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
