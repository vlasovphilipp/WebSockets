const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const dotenv = require("dotenv").config();

const io = new Server(server, {
  cors: {
    origins: ["*"],
    handlePreflightRequest: (req, res) => {
      res.writeHead(200, {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,POST",
        "Access-Control-Allow-Headers": "my-custom-header",
      });
      res.end();
    },
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

server.listen(port, () => {
  console.log(`server listening on *:${port}`);
});
