const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const dotenv = require("dotenv").config();

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const port = process.env.PORT;

io.on("connection", (socket) => {
  socket.on("message", ({ message, user }) => {
    io.emit("message", {
      message,
      user,
    });
  });
});

app.use("/", (req, res) => {
  res.send("Server is running");
});

server.listen(port, () => {
  console.log(`server listening on *:${port}`);
});
