let canvas;
let world;
let keyboard = new Keyboard();
let endScreenRef = document.getElementById("endScreen");

let startScreenRef = document.getElementById("startScreen");
let gameOverScreenRef = document.getElementById("gameOverScreen");
let winningScreenRef = document.getElementById("winningScreen");
let audioMute = false;
let sleeping = false;
let sleepTimer;

function init() {
  canvas = document.getElementById("canvas");
  
  bindBtnsPressEvents();
}

function startGame() {
  startScreenRef.style.display = "none";
  AudioHub.playOne(AudioHub.GAMESTART);
  level1 = createLevel1();
  world = new World(canvas, keyboard, level1);
  startSleepingTimer();
}

function gameOver() {
  gameOverScreenRef.classList.remove("d-none");
  stopGame();
}

function stopGame() {
  intervalIds.forEach(clearInterval);
}

function winning() {
  winningScreenRef.classList.remove("d-none");
  stopGame();
  
}

function restartGame() {
  stopGame();
  gameOverScreenRef.style.display = "none";
  winningScreenRef.style.display = "none";
  level1 = createLevel1();
  world = new World(canvas, keyboard, level1);
}

function bindBtnsPressEvents() {
  touchStartLeft();
  touchEndLeft();
  touchStartRight();
  touchEndRight();
  touchStartSpace();
  touchEndSpace();
  touchStartD();
  touchEndD();
}

window.addEventListener("keydown", (e) => {
  if (e.key == "ArrowRight") {
    keyboard.RIGHT = true;
  }

  if (e.key == "ArrowLeft") {
    keyboard.LEFT = true;
  }

  if (e.key == "ArrowUp") {
    keyboard.UP = true;
  }

  if (e.key == "ArrowDown") {
    keyboard.DOWN = true;
  }

  if (e.key == " ") {
    keyboard.SPACE = true;
  }

  if (e.key.toLowerCase() == "d") {
    keyboard.D = true;
  }
});

window.addEventListener("keyup", (e) => {
  if (e.key == "ArrowRight") {
    keyboard.RIGHT = false;
  }

  if (e.key == "ArrowLeft") {
    keyboard.LEFT = false;
  }

  if (e.key == "ArrowUp") {
    keyboard.UP = false;
  }

  if (e.key == "ArrowDown") {
    keyboard.DOWN = false;
  }

  if (e.key == " ") {
    keyboard.SPACE = false;
  }

  if (e.key.toLowerCase() == "d") {
    keyboard.D = false;
  }
});

document.getElementById("anleitungButton").addEventListener("click", () => {
  document.getElementById("anleitungDialog").showModal();
});

document.getElementById("soundButton").addEventListener("click", () => {
  AudioHub.toggleMute();
  document.getElementById("soundButton").classList.toggle("muted");
});

document.getElementById("linkButton").addEventListener("click", () => {
  document.getElementById("linkDialog").showModal();
});

function closeDialog(dialogId) {
  document.getElementById(dialogId).close();
}

function startSleepingTimer() {
  clearTimeout(sleepTimer);
  sleeping = false;
  sleepTimer = setTimeout(() => {
    sleeping = true;
  }, 12000);
}

function touchStartLeft() {
  document.getElementById("btnLeft").addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.LEFT = true;
  });
}

function touchEndLeft() {
  document.getElementById("btnLeft").addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.LEFT = false;
  });
}

function touchStartRight() {
  document.getElementById("btnRight").addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.RIGHT = true;
  });
}
function touchEndRight() {
  document.getElementById("btnRight").addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.RIGHT = false;
  });
}

function touchStartSpace() {
  document.getElementById("btnJump").addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.SPACE = true;
  });
}
function touchEndSpace() {
  document.getElementById("btnJump").addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.SPACE = false;
  });
}

function touchStartD() {
  document.getElementById("btnThrow").addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.D = true;
  });
}
function touchEndD() {
  document.getElementById("btnThrow").addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.D = false;
  });
}
