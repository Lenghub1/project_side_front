import { io } from "socket.io-client";

const URL = import.meta.env.VITE_BASE_URL_DEV || "http://localhost:3000/api/v1";
export const socket = io(URL, {
  autoConnect: false,
});
