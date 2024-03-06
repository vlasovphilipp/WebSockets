const express = require("express");
const http = require("http");
const dotenv = require("dotenv").config();

const app = express();
const server = http.createServer(app);
var io = require("socket.io")(server);

const port = process.env.PORT || 5050;

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
