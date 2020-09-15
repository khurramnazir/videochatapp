var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);

app.get("/", (req, res) => {
  res.send({ response: "I am alive" }).status(200);
});

// update the res.send file to the actual page when started.
// delete index.html file

// users = [
//   { username: "dave", userID: "erhguifherf2934", room: "arup" },
//   { username: "dave", userID: "erhguifherf2934", room: "gui" },
//   { username: "dave", userID: "erhguifherf2934", room: "arup" },
// ];

users = {
  bridges: [
    { name: "bob", id: "ihvbd", type: "admin" },
    { name: "dave", id: "higvih", type: "user" },
    { name: "lauren", id: "yufcy", type: "user" },
    { name: "Sophie", id: "sjhdoks", type: "admin" },
    { name: "Pete", id: "djkbidf", type: "user" },
    { name: "James", id: "lkjdkj", type: "admin" },
  ],
  mep: [
    { name: "bob", id: "ihvbd", type: "admin" },
    { name: "dave", id: "higvih", type: "user" },
    { name: "lauren", id: "yufcy", type: "user" },
    { name: "Sophie", id: "sjhdoks", type: "admin" },
    { name: "Pete", id: "djkbidf", type: "user" },
    { name: "James", id: "lkjdkj", type: "admin" },
  ],
};

io.on("connection", (socket) => {
  //console.log(`Client connected ${socket.client.id}`);
  socket.on("disconnect", () => console.log(`Client disconnected`));
  socket.emit("yourID", socket.id);
  socket.on("join room", ({ roomLobby, username }) => {
    socket.join(roomLobby);
    console.log(
      `Client ${username} with id: ${socket.client.id} has joined room ${roomLobby}`
    );
    // io.of("/")
    //   .in(roomLobby)
    //   .clients((err, clients) => {
    //     console.log(clients);
    //   });
    // socket.on("myname", (username) => {
    //   console.log(
    //     `Client ${name} with id: ${socket.client.id} has joined room ${roomLobby}`
    //   );
    // });
  });
});

module.exports = http;
