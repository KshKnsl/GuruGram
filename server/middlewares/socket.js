const { Server } = require("socket.io");
const http = require("http");
const express = require("express");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"], 
  },
});

// Store online users and their socket IDs
const userSocketMap = {}; // { userId: socketId }

function getReceiverSocketId(userId) {
  return userSocketMap[userId] || null; // Return null if userId is not found
}

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId) {
    userSocketMap[userId] = socket.id;
    console.log(`User ${userId} mapped to socket ${socket.id}`);
  } else {
    console.warn("Connection attempted without a userId");
  }

  // Notify all clients of the online users
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.id);

    // Find and remove the userId associated with the disconnected socket
    for (const [id, sockId] of Object.entries(userSocketMap)) {
      if (sockId === socket.id) {
        delete userSocketMap[id];
        break;
      }
    }

    // Notify all clients of the updated online users
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

module.exports = { io, app, server, getReceiverSocketId };
