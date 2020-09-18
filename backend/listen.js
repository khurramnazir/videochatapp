const http = require("./server");
const app = require("./server");
const path = require("path");
require("dotenv").config();
const express = require("express");

//console.log(process.env);
//console.log(process.env.NODE_ENV);
console.log(process.env.NODE_ENV, "outside the if");
if (process.env.NODE_ENV === "production") {
  console.log(process.env.NODE_ENV === "production");
  app.use(express.static(path.join(__dirname, "../video_chat_app/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../video_chat_app/build/index.html"));
  });
}

const PORT = process.env.PORT || 5000;

http.listen(PORT, function () {
  console.log(`listening on port ${PORT}`);
});
