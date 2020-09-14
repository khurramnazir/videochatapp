var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);

app.get("/", (req, res) => {
  res.send({ response: "I am alive" }).status(200);
});

// update the res.send file to the actual page when started.
// delete index.html file

io.on("connection", (socket) => {
  console.log(`Client connected ${socket.client.id}`);
  socket.on("disconnect", () => console.log("Client disconnected"));
});

module.exports = http;
