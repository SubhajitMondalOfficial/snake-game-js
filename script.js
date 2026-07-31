// ===================== DOM Elements =====================

const board = document.querySelector(".board");
const startButton = document.querySelector(".btnStart");
const StartModal = document.querySelector(".modal");
const gameOverModal = document.querySelector(".gameOver");
const gameOverButton = document.querySelector(".btnReStart");
let scoreElement = document.querySelector(".score");
let highScoreElement = document.querySelector(".high-score");
let timeElement = document.querySelector(".time");
let Yourtime = document.querySelector(".Yourtime");
let Yourscore = document.querySelector(".Yourscore");
let GameOverReason = document.querySelector(".gmov");

// ==================== Game Constants ====================

const blockHeight = 50;
const blockWidth = 50;

// ====================== Game State ======================

const blocks = [];

let snake = [
  {
    x: 3,
    y: 5,
  },
];
let head = null;

let direction = "down";
let interValId = null;
let timerIntervalId = null;

let rows = Math.floor(board.clientHeight / blockHeight);
let cols = Math.floor(board.clientWidth / blockWidth);

let food = {
  x: Math.floor(Math.random() * rows),
  y: Math.floor(Math.random() * cols),
};

let highScore = JSON.parse(localStorage.getItem("SetHighScore")) || 0;
let score = 0;
let time = `00:00`;

// =================== Board Functions ====================

function createBoard() {
  rows = Math.floor(board.clientHeight / blockHeight);
  cols = Math.floor(board.clientWidth / blockWidth);

  board.innerHTML = "";
  blocks.length = 0;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const block = document.createElement("div");
      block.classList.add("block");
      board.appendChild(block);

      blocks[`${row}-${col}`] = block;
    }
  }

  renderElement();
}

// =================== Snake Functions ====================

function renderElement() {
  blocks[`${food.x}-${food.y}`].classList.add("food");

  if (direction === "left") {
    head = {
      x: snake[0].x,
      y: snake[0].y - 1,
    };
  } else if (direction === "right") {
    head = {
      x: snake[0].x,
      y: snake[0].y + 1,
    };
  } else if (direction === "down") {
    head = {
      x: snake[0].x + 1,
      y: snake[0].y,
    };
  } else if (direction === "up") {
    head = {
      x: snake[0].x - 1,
      y: snake[0].y,
    };
  }

  // Wall collision logic
  if (head.x < 0 || head.x >= rows || head.y < 0 || head.y >= cols) {
    clearInterval(interValId);
    clearInterval(timerIntervalId);
    gameOverModal.style.display = "flex";
    GameOverReason.innerText = `Game Over For Wall Collision !!`;
    return;
  }

  // Self collision logic
  if (snake.some((segment) => segment.x === head.x && segment.y === head.y)) {
    clearInterval(interValId);
    clearInterval(timerIntervalId);
    gameOverModal.style.display = "flex";
    GameOverReason.innerText = `Game Over For Self Collision !!`;
    return;
  }

  // Food consumer logic
  if (head.x == food.x && head.y === food.y) {
    blocks[`${food.x}-${food.y}`].classList.remove("food");
    food = {
      x: Math.floor(Math.random() * rows),
      y: Math.floor(Math.random() * cols),
    };
    blocks[`${food.x}-${food.y}`].classList.add("food");
    snake.push(head);

    score += 10;
    scoreElement.innerText = score;
    Yourscore.innerText = `Your Score: ${score}`;

    if (score > highScore) {
      highScore = score;
      localStorage.setItem("SetHighScore", JSON.stringify(highScore));
    }
  }

  snake.forEach((fregment) => {
    blocks[`${fregment.x}-${fregment.y}`].classList.remove("fill");
  });

  snake.unshift(head);
  snake.pop();

  snake.forEach((fregment) => {
    blocks[`${fregment.x}-${fregment.y}`].classList.add("fill");
  });
}

// ==================== Game Functions ====================

function startGame() {
  StartModal.classList.add("hidden");
  score = 0;
  time = `00:00`;
  scoreElement.innerText = score;
  timeElement.innerText = time;
  highScoreElement.innerText = highScore;

  interValId = setInterval(() => {
    renderElement();
  }, 300);

  timerIntervalId = setInterval(() => {
    let [min, sec] = time.split(":").map(Number);
    if (sec == 59) {
      min += 1;
      sec = 0;
    } else {
      sec += 1;
    }

    time = `${min} : ${sec}`;
    timeElement.innerText = time;
    Yourtime.innerText = `Your Time :- ${time}`;
  }, 1000);
}

function ReStartGame() {
  blocks[`${food.x}-${food.y}`].classList.remove("food");
  snake.forEach((fregment) => {
    blocks[`${fregment.x}-${fregment.y}`].classList.remove("fill");
  });

  score = 0;
  time = `00:00`;

  scoreElement.innerText = score;
  timeElement.innerText = time;
  highScoreElement.innerText = highScore;
  gameOverModal.style.display = "none";
  direction = "down";
  snake = [{ x: 3, y: 5 }];
  food = {
    x: Math.floor(Math.random() * rows),
    y: Math.floor(Math.random() * cols),
  };

  interValId = setInterval(() => {
    renderElement();
  }, 300);

  timerIntervalId = setInterval(() => {
    let [min, sec] = time.split(":").map(Number);
    if (sec == 59) {
      min += 1;
      sec = 0;
    } else {
      sec += 1;
    }

    time = `${min} : ${sec}`;
    timeElement.innerText = time;
  }, 1000);
}

// ================ Event Listeners & Controls ================

startButton.addEventListener("click", startGame);

gameOverButton.addEventListener("click", ReStartGame);

window.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowUp":
      if (direction !== "down") {
        direction = "up";
      }
      break;

    case "ArrowDown":
      if (direction !== "up") {
        direction = "down";
      }
      break;

    case "ArrowLeft":
      if (direction !== "right") {
        direction = "left";
      }
      break;
    
    case "ArrowRight":
      if(direction !== "left"){
        direction = "right"
      }
  } 
});

window.addEventListener("load", createBoard);

window.addEventListener("resize", createBoard);
