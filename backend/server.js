var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);

app.get("/", (req, res) => {
  res.send({ response: "I am alive" }).status(200);
});

allUsers = {};

io.on("connection", (socket) => {
  socket.emit("yourID", socket.id);
  console.log(socket.id, '<<<< on connection')
  socket.on("join room", ({ roomLobby, username, type }) => {
    socket.join(roomLobby);
    const userObject = { name: username, id: socket.client.id, type };
    if (allUsers[roomLobby]) {
      allUsers[roomLobby].push(userObject);
    } else {
      allUsers[roomLobby] = [userObject];
    }
    socket.emit("usersInLobby", allUsers[roomLobby]);

    socket.on("disconnect", () => {
      console.log('user disconnected')
      const newArr = allUsers[roomLobby].filter((user) => {
        return user.id !== socket.client.id;
      });
      allUsers[roomLobby] = newArr;
    });
  });
});

module.exports = http;
