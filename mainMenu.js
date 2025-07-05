function setModeAndStartGame(clicks, time) {
  sessionStorage.setItem("increaseClicksBy", clicks);
  sessionStorage.setItem("increaseTimeBy", time);
  window.location.href = "./game.html";
}

document.getElementById("easymodeButton").addEventListener("click", () => {
  setModeAndStartGame(50, 15);
});

document.getElementById("normalmodeButton").addEventListener("click", () => {
  setModeAndStartGame(75, 10);
});

document.getElementById("hardmodeButton").addEventListener("click", () => {
  setModeAndStartGame(100, 5);
});

