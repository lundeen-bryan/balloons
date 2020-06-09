let colors = ["yellow", "red", "blue", "violet", "green"];

function createBalloon() {
  let div = document.createElement("div");
  let rand = Math.floor(Math.random() * colors.length);
  div.className = "balloon balloon-" + colors[rand];

  document.body.appendChild(div);
}
