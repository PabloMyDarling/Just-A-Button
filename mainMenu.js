function setModeAndStartGame(clicks) {
  localStorage.setItem("increaseClicksBy", clicks);
  window.location.href = "./game.html";
}

document.getElementById("easymodeButton").addEventListener("click", () => {
  setModeAndStartGame(45);
});

document.getElementById("normalmodeButton").addEventListener("click", () => {
  setModeAndStartGame(70);
});

document.getElementById("hardmodeButton").addEventListener("click", () => {
  setModeAndStartGame(95);
});

