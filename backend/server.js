var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);
const { pairUp } = require("../utils/index");

app.get("/", (req, res) => {
  res.send({ response: "I am alive" }).status(200);
});

allUsers = {};

io.on("connection", (socket) => {
  console.log(`user ${socket.client.id} connected`);

  socket.on("join room", ({ roomLobby, username, type }) => {
    socket.join(roomLobby);
    const userObject = { name: username, id: socket.client.id, type };
    if (allUsers[roomLobby]) {
      allUsers[roomLobby].push(userObject);
    } else {
      allUsers[roomLobby] = [userObject];
    }

    io.in(roomLobby).emit("usersInLobby", allUsers[roomLobby]);

    socket.on("disconnect", (reason) => {
      console.log(reason);
      console.log("user disconnected");
      const newArr = allUsers[roomLobby].filter((user) => {
        return user.id !== socket.client.id;
      });
      allUsers[roomLobby] = newArr;
      io.in(roomLobby).emit("usersInLobby", newArr);
    });
  });

  socket.on("move room", ({ roomLobby }) => {
    const pairs = pairUp(allUsers[roomLobby]);
    io.in(roomLobby).emit("getAllPairs", pairs);
  });

  socket.on("join pair", ({ pair, roomLobby, stream }) => {
    socket.join(roomLobby + pair);
  });
});

module.exports = http;
