var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);

app.get("/", (req, res) => {
  res.send({ response: "I am alive" }).status(200);
});

allUsers = {};

io.on("connection", (socket) => {
  socket.on("join room", ({ roomLobby, username, type }) => {
    socket.join(roomLobby);
    const userObject = { name: username, id: socket.client.id, type };
    if (allUsers[roomLobby]) {
      allUsers[roomLobby].push(userObject);
    } else {
      allUsers[roomLobby] = [userObject];
    }

    io.in(roomLobby).emit("usersInLobby", allUsers[roomLobby]);

    io.in(roomLobby).emit("moveToChat", "http://localhost:3000/bridges/room1");

    socket.on("disconnect", () => {
      const newArr = allUsers[roomLobby].filter((user) => {
        return user.id !== socket.client.id;
      });
      allUsers[roomLobby] = newArr;
    });
  });
});

module.exports = http;
