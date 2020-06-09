let colors = ["yellow", "red", "blue", "violet", "green"];
let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;
let body = document.body;

function createBalloon() {
  let div = document.createElement("div");
  let rand = Math.floor(Math.random() * colors.length);
  div.className = "balloon balloon-" + colors[rand];

  rand = Math.floor(Math.random() * (windowWidth - 100));
  div.style.left = rand + "px";

  body.appendChild(div);
  animateBalloon(div);
}

function animateBalloon(elem) {
  let pos = 0;
  let interval = setInterval(frame, 10);

  function frame() {
    console.log(pos);
    if (pos >= window.innerHeight + 200) {
      clearInterval(interval);
      deleteBalloon(elem);
    } else {
      pos++;
      elem.style.top = windowHeight - pos + "px";
    }
  }
}

function deleteBalloon(elem) {
  elem.remove();
}
