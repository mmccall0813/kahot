// server.js
// where all the backend magic happens
// dont expect any of this code to be sane
// i code like a drunk monkey on a xanax overdose

const express = require("express");
const kahoot = require("kahoot.js-updated");
const config = require("./config.json");
const app = express();
app.use(express.static("public"));
const listener = app.listen(config.port, () => {
  console.log("Kahot listening on port " + listener.address().port);
});
const io = require("socket.io")(listener);
io.on("connection", (socket) => {
  console.log("A user connected")
  var pin = "";
  var name = ""
  socket.on("pin", (number) => {
    pin = number; // set the pin number for the socket so we can remember it later when we get the game pin
    socket.emit("stateChange", 2)
    console.log("pin " + number)
  })
})