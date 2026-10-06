let intervallIds = [];

function setStoppableInterval(fn, time) {
  let id = setInterval(fn, time);
  intervallIds.push(id);
  console.log("Interval gestartet:", intervallIds.length);
}

function stopGame() {
  intervallIds.forEach(clearInterval);
}