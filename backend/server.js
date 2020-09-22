const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

const { pairUp } = require("../utils/index");

allUsers = {};

io.on("connection", (socket) => {
  console.log(`user ${socket.client.id} connected`);

  socket.on("checkUsernames", (roomLobby) => {
    console.log(allUsers);
    socket.emit("usersInLobby", allUsers[roomLobby]);
  });

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

  socket.on("join pair", ({ pair, roomLobby }) => {
    socket.join(roomLobby + pair);
  });

  socket.on("getAllOtherUsers", ({ pair, roomLobby }) => {
    io.in(roomLobby + pair).clients((err, clients) => {
      const myid = socket.client.id;

      const user = clients.filter((id) => {
        return id === myid;
      });

      socket.to(roomLobby + pair).emit("all other users", user);
    });
  });

  socket.on("sending signal", (payload) => {
    io.to(payload.userToSignal).emit("user joined", {
      signal: payload.signal,
      callerID: payload.callerID,
    });
  });
  socket.on("returning signal", (payload) => {
    io.to(payload.callerID).emit("receiving returned signal", {
      signal: payload.signal,
      id: socket.id,
    });
  });

  socket.on("leave lobby", (roomLobby) => {
    socket.leave(roomLobby);
    // let indexOfUser;
    // allUsers[roomLobby].forEach((user, index) => {
    //   if (user.id === socket.client.id) {
    //     indexOfUser = index;
    //   }
    // });
    // allUsers[roomLobby].splice(indexOfUser, 1);
  });
});

module.exports = { http, app };
