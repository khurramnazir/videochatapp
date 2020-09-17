const http = require("./server");
const app = require("./server");
const path = require("path");
require("dotenv").config();
const express = require("express");

if (process.env.PROD) {
  app.use(express.static(path.join(__dirname, "/../video_chat_app/build")));
  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "/../video_chat_app/build/index.html"));
  });
}

const PORT = process.env.PORT || 5000;

http.listen(PORT, function () {
  console.log(`listening on port ${PORT}`);
});
