// The client-side javascript
/*
This code will probably be very messy, as i'm not too familiar 
with socket.io and things like it.

*/

var socket = io();
// If your IDE says that io is not defined, dont worry about it, we import it in the html.

class Game {
  constructor(){
    this.socket = socket;
    this.state = 1;
    /*
    Game states:
    1: Waiting for pin to be entered
    */
  }
}