let canvas;
let world;
let keyboard = new Keyboard();
let endScreenRef = document.getElementById("endScreen");


let startScreenRef = document.getElementById("startScreen");
let gameOverScreenRef = document.getElementById("gameOverScreen");
let winningScreenRef = document.getElementById("winningScreen");

function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
  startSleepingTimer();
    bindBtnsPressEvents();
}

function startGame() {
  startScreenRef.style.display = "none";
}

function gameOver() {
  gameOverScreenRef.classList.remove("d-none");
  stopGame();
}

function stopGame(){
  intervalIds.forEach(clearInterval);
}

function winning() {
  winningScreenRef.classList.remove("d-none");
}

function restartGame() {
  gameOverScreenRef.style.display = "none";
  winningScreenRef.style.display = "none";
  world = new World(canvas, keyboard);
}


function bindBtnsPressEvents() {
  document.getElementById("btnLeft").addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.LEFT = true;
  });

  document.getElementById("btnLeft").addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.LEFT = false;
  });

  document.getElementById("btnRight").addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.RIGHT = true;
  });

  document.getElementById("btnRight").addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.RIGHT = false;
  });

  document.getElementById("btnJump").addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.SPACE = true;
  });

  document.getElementById("btnJump").addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.SPACE = false;
  });

  document.getElementById("btnThrow").addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.D = true;
  });

  document.getElementById("btnThrow").addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.D = false;
  });
}



window.addEventListener("keydown", (e) => {
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

window.addEventListener("keyup", (e) => {
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

document.getElementById("anleitungButton").addEventListener("click", () => {
  document.getElementById("anleitungDialog").showModal();
});

document.getElementById("soundButton").addEventListener("click", () => {
  document.getElementById("soundDialog").showModal();
});

document.getElementById("linkButton").addEventListener("click", () => {
  document.getElementById("linkDialog").showModal();
});

function closeDialog(dialogId) {
  document.getElementById(dialogId).close();
}

let sleeping = false;
let sleepTimer;

function startSleepingTimer() {
  clearTimeout(sleepTimer);

  sleeping = false;

  sleepTimer = setTimeout(() => {
    sleeping = true;
  }, 12000);
}