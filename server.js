// server.js
// where all the backend magic happens
// dont expect any of this code to be sane
// i code like a drunk monkey on a xanax overdose

const express = require("express");
const config = require("./config.json");
const app = express();
app.use(express.static("public"));
const listener = app.listen(process.env.PORT, () => {
  console.log("Kahot listening on port " + listener.address().port);
});
const io = require("socket.io")(listener);
io.on("connection", (socket) => {
  //
  
  
})