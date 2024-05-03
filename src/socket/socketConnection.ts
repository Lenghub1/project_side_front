import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const connectWithSocketServer = (userDetail: any) => {
  socket = io("http://localhost:3000");

  socket.on("connect", () => {
    console.log("successfully connected with socket");
    console.log(socket!.id);

    // Emit userDetail to backend
    socket!.emit("userDetails", userDetail);
  });
};
