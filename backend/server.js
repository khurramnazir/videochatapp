const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

const { pairUp } = require("../utils/index");

allUsers = {};
pairs = [];

io.on("connection", (socket) => {
  console.log(`user ${socket.client.id} connected`);

  socket.on("checkUsernames", (roomLobby) => {
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
      const newArr = allUsers[roomLobby].filter((user) => {
        return user.id !== socket.client.id;
      });
      allUsers[roomLobby] = newArr;
      io.in(roomLobby).emit("usersInLobby", allUsers[roomLobby]);
    });
  });

  socket.on("move room", ({ roomLobby }) => {
    pairs = pairUp(allUsers[roomLobby]);
    io.in(roomLobby).emit("getAllPairs", pairs);
  });

  socket.on("join pair", ({ pair, roomLobby }) => {
    socket.join(roomLobby + pair);
    io.in(roomLobby + pair).emit("getPairInfo", pairs[pair - 1]);
  });

  socket.on("getAllOtherUsers", ({ pair, roomLobby }) => {
    io.in(roomLobby + pair).clients((err, clients) => {
      const myid = socket.client.id;

      const users = clients.filter((id) => {
        return id !== myid;
      });

      socket.emit("all other users", { users, pairs: pairs[pair - 1] });
    });
  });

  socket.on("sending signal", (payload) => {
    io.to(payload.userToSignal).emit("user joined", {
      signal: payload.signal,
      callerID: payload.callerID,
      pair: pairs[payload.pair - 1],
    });
  });

  socket.on("returning signal", (payload) => {
    io.to(payload.callerID).emit("receiving returned signal", {
      signal: payload.signal,
      id: socket.id,
    });
  });

  socket.on("sendGame", ({ pair, roomLobby, game }) => {
    socket.to(roomLobby + pair).emit("receivedGame", game);
  });

  socket.on("sendPlayerSwap", ({ pair, roomLobby }) => {
    socket.to(roomLobby + pair).emit("receivedPlayerSwap");
  });

  socket.on("sendQuestion", ({ pair, roomLobby, triv }) => {
    socket.to(roomLobby + pair).emit("recievedQuestion", triv);
  });

  socket.on("ansSubmitted", ({ pair, roomLobby, isSubmitted }) => {
    socket.to(roomLobby + pair).emit("recievedSubmitted", isSubmitted);
  });

  socket.on("sendAns", ({ pair, roomLobby, ans }) => {
    socket.to(roomLobby + pair).emit("recievedAnswer", ans);
  });

  socket.on("drawing", ({ pair, roomLobby, data }) => {
    socket.to(roomLobby + pair).emit("recieveDrawing", data);
  });

  socket.on("leave lobby", (roomLobby) => {
    if (socket.rooms[roomLobby]) {
      socket.leave(roomLobby);
      let indexOfUser;
      allUsers[roomLobby].forEach((user, index) => {
        if (user.id === socket.client.id) {
          indexOfUser = index;
        }
      });
      allUsers[roomLobby].splice(indexOfUser, 1);
      io.in(roomLobby).emit("usersInLobby", allUsers[roomLobby]);
    }
  });
});

module.exports = { http, app };
