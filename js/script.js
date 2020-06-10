let colors = ["yellow", "red", "blue", "violet", "green"];
let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;
let body = document.body;
let scores = document.querySelectorAll(".score");
let num = 0;
let total = 100;
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
  let random = Math.floor(Math.random() * 6 - 3);
  let interval = setInterval(frame, 12 - Math.floor(num / 10) + random);

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
  playBallSound();
}

function playBallSound() {
  let audio = document.createElement("audio");
  audio.src = "sounds/pop.mp3";
  audio.play();
}

function updateScore() {
  for (let i = 0; i < scores.length; i++) {
    scores[i].textContent = num;
  }
}

function startGame() {
  restartGame();
  let timeout = 0;

  let loop = setInterval(function () {
    timeout = Math.floor(Math.random() * 600 - 100);
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
  }, 800 + timeout);
}
/* 
 event delegation 
 an event is a special object that keeps track of 
 all actions made by a user, eg. the user clicks
 then action is saved in 'event'
 below it will only log an event if it is of class
 balloon
*/

function restartGame() {
  let forRemoving = document.querySelectorAll(".balloon");
  for (let i = 0; i < forRemoving.length; i++) {
    /* deleteBalloon(event.target); */
    forRemoving[i].remove();
  }
  gameOver = false;
  num = 0;
  updateScore();
}
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("balloon")) {
    deleteBalloon(event.target);
  }
});

document.querySelector(".restart").addEventListener("click", function () {
  totalShadow.style.display = "none";
  totalShadow.querySelector(".win").style.display = "none";
  totalShadow.querySelector(".lose").style.display = "none";
  startGame();
});
document.querySelector(".cancel").addEventListener("click", function () {
  totalShadow.style.display = "none";
});

startGame();
