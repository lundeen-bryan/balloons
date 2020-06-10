let colors = ["yellow", "red", "blue", "violet", "green"];
let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;
let body = document.body;
let scores = document.querySelectorAll(".score");
let num = 0;
let total = 10;
let currentBalloon = 0;
let gameOver = false;
let totalShadow = document.querySelector(".total-shadow");

function createBalloon() {
  let div = document.createElement("div");
  let rand = Math.floor(Math.random() * colors.length);
  div.className = "balloon balloon-" + colors[rand];

  rand = Math.floor(Math.random() * (windowWidth - 100));
  div.style.left = rand + "px";
  div.dataset.number = currentBalloon; /* creates unique id to ea balloon */
  currentBalloon++;
  body.appendChild(div);
  animateBalloon(div);
}

function animateBalloon(elem) {
  let pos = 0;
  let interval = setInterval(frame, 10);

  function frame() {
    if (
      pos >= window.innerHeight + 200 &&
      document.querySelector('[data-number="' + elem.dataset.number + '"]') !==
        null
    ) {
      clearInterval(interval);
      gameOver = true;
    } else {
      pos++;
      elem.style.top = windowHeight - pos + "px";
    }
  }
}

function deleteBalloon(elem) {
  elem.remove();
  num++;
  updateScore();
}

function updateScore() {
  for (let i = 0; i < scores.length; i++) {
    scores[i].textContent = num;
  }
}

function startGame() {
  let loop = setInterval(function () {
    if (!gameOver && num !== total) {
      createBalloon();
    } else if (num !== total) {
      clearInterval(loop);
      totalShadow.style.display = "flex";
      totalShadow.querySelector(".lose").style.display = "block";
    } else {
      clearInterval(loop);
      totalShadow.style.display = "flex";
      totalShadow.querySelector(".win").style.display = "block";
    }
  }, 800);
}
/* 
 event delegation 
 an event is a special object that keeps track of 
 all actions made by a user, eg. the user clicks
 then action is saved in 'event'
 below it will only log an event if it is of class
 balloon
*/
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("balloon")) {
    deleteBalloon(event.target);
  }
});

startGame();
