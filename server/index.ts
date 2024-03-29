const express = require("express");
const http = require("http");
const dotenv = require("dotenv").config();

const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");

const app = express();
const server = http.createServer(app);
var io = require("socket.io")(server);

const port = process.env.PORT || 5050;

io.on("connection", (socket) => {
  socket.on("join", ({ room, name }, callback) => {
    const user = addUser({ id: socket.id, name, room });

    if (user.error) {
      return callback(user);
    }

    callback({ user });

    socket.emit("message", {
      name: "Admin",
      message: `${user.name} welcome to ${user.room}`,
    });

    socket.broadcast.to(user.room).emit("message", {
      message: `${user.name} has joined the room`,
      name: "Admin",
    });

    socket.join(user.room);
  });

  socket.on("sendMessage", ({ message }) => {
    const user = getUser(socket.id);

    if (user) {
      io.to(user.room).emit("message", { message, name: user.name });
    }
  });

  socket.on("disconnect", function () {
    const user = getUser(socket.id);

    if (user) {
      socket.broadcast.to(user.room).emit("message", {
        message: `${user.name} left the room`,
        name: "Admin",
      });
    }
  });
});

app.use("/", (req, res) => {
  res.send("Server is running");
});

server.listen(port, () => {
  console.log(`server listening on *:${port}`);
});
