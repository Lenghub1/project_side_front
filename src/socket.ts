// import { io } from "socket.io-client";

const URL = import.meta.env.VITE_BASE_SERVER_DEV || "http://localhost:3000";
export const socket = io(URL, {
  autoConnect: false,
});

// window.addEventListener("beforeunload", () => {
//   socket.disconnect();
// });
