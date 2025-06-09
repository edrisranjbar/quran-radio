import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
app.use(cors());

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

let listenerCount = 0;

io.on("connection", (socket) => {
  listenerCount++;
  io.emit("listenerCount", listenerCount);

  socket.on("disconnect", () => {
    listenerCount--;
    io.emit("listenerCount", listenerCount);
  });
});

const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
  console.log(`WebSocket server running on port ${PORT}`);
});