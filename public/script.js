// The client-side javascript
/*
This code will probably be very messy, as i'm not too familiar 
with socket.io and things like it.
*/

var socket = io();
// If your IDE says that io is not defined, dont worry about it, we import socket.io in the index.html

// Define socket stuff
socket.on("stateChange", (which) => {
  Kahot.setState(which)
})

socket.on("disconnect", () => {
  Kahot.setState(1);
  $("#nickError")[0].innerHTML = "Disconnected from server";
})

socket.on("connect", ()=> {
    $("#nickError")[0].innerHTML = "";
})

function answer(num){
  socket.emit("answer", num)
}

function gamePin(){
  var value = document.getElementById("pin").value;
  if(!isNaN(value)){
  socket.emit("pin", value)
  }else{
    $("#pinError")[0].innerHTML = "Please enter a valid PIN number.";
  }
}

function gameNick(){
  var value = document.getElementById("nickInput").value
  if(value !== "" ){
    socket.emit("nick", value)
  }else{
    $("#nickError")[0].innerHTML = "Nickname cannot be empty";
  }
}

class Game {
  constructor(){
    this.socket = socket;
    this.state = 1;
    /*
    these are not in order
    Game states:
    1: Waiting for pin to be entered
    2: Waiting for name to be entered
    3: Waiting for game to start
    
    4, 5, and 6 will rotate once the game starts
    
    4: waiting for question
    5: waiting for player to answer question
    6: player answered question, waiting for results to be shown and next one to start
    7: question results
    8: joining game
    9: quiz started
    10: True or false question
    11: Multiple choice question
    12: quiz ended
    
    */
  }
  setState(which){
    this.state = parseInt(which);
    $(".KahotGameItem").hide();
    var answertext = ["Genius machine?", "Lightning smart?", "Classroom perfection?"]
    switch(this.state){
      case 1: $("#gamecode").show(); break;
      case 2: $("#nickname").show(); break;
      case 3: $("#loading").show(); $("#loadingMessage")[0].innerHTML = "You're In!"; break;
      case 4: $("#loading").show(); $("#loadingMessage")[0].innerHTML = "Question starting..."; break;
      case 5: $("#question").show(); break;
      case 6: $("#loading").show(); $("#loadingMessage")[0].innerHTML = answertext[Math.floor(Math.random()*answertext.length)]; break;
      case 8: $("#loading").show(); $("#loadingMessage")[0].innerHTML = "Joining game..."; break;
      case 9: $("#loading").show(); $("#loadingMessage")[0].innerHTML = "Quiz started!"; break;
      case 10: $("#truefalse").show(); break;
      case 11: $("#multichoice").show(); break;
    }
  }
}

var Kahot = new Game();