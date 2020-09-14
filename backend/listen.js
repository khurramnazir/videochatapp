const http = require("./server");

const PORT = process.env.PORT || 5000;

http.listen(PORT, function () {
  console.log(`listening on port ${PORT}`);
});
