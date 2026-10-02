let canvas;
let world;
let keyboard = new Keyboard();
let endScreenRef = document.getElementById("endScreen");
console.log(endScreenRef);

function init(){
  
    // endScreenRef.style.setProperty("top", "-720px");
    // endScreenRef.style.setProperty("z-index", "0");
    // start = document.getElementById("startScreen");
    canvas = document.getElementById("canvas");
    world = new World(canvas, keyboard);
    
   
}

// function gameOver(){
//  endScreenRef.style.zIndex = 999;
//  endScreenRef.style.top = 0;
// }

   

window.addEventListener('keydown',(e) => {
  if (e.keyCode == 39) {
    keyboard.RIGHT = true;
  }
   if (e.keyCode == 37) {
    keyboard.LEFT = true;
  }
   if (e.keyCode == 38) {
    keyboard.UP = true;
  }
   if (e.keyCode == 40) {
    keyboard.DOWN = true;
  }
   if (e.keyCode == 32) {
    keyboard.SPACE = true;
  }
   if (e.keyCode == 68) {
    keyboard.D = true;
  }
});

window.addEventListener('keyup',(e) => {
  if (e.keyCode == 39) {
    keyboard.RIGHT = false;
  }
   if (e.keyCode == 37) {
    keyboard.LEFT = false;
  }
   if (e.keyCode == 38) {
    keyboard.UP = false;
  }
   if (e.keyCode == 40) {
    keyboard.DOWN = false;
  }
   if (e.keyCode == 32) {
    keyboard.SPACE = false;
  }
   if (e.keyCode == 68) {
    keyboard.D = false;
  }
});


// document.getElementById("anleitungButton").addEventListener("click", () => {
//     document.getElementById("anleitungDialog").showModal();
// });

// document.getElementById("soundButton").addEventListener("click", () => {
//     document.getElementById("soundDialog").showModal();
// });

// document.getElementById("linkButton").addEventListener("click", () => {
//     document.getElementById("linkDialog").showModal();
// });


// document.getElementsByClassName("close-dialog").addEventListener("click", () => {
//     document.getElementById("dialog").close();
// });