// const board = document.querySelector(".board");
// const blockWidth = 50;
// const blockHeight = 50;

// const blocks = [];
// const snake = [
//     {x:1, y:3},
//     {x:1, y:4},
//     {x:1, y:5},
// ];

// function createBoard() {
//   // Remove old blocks
//   board.innerHTML = "";

//   const cols = Math.floor(board.clientWidth / blockWidth);
//   const rows = Math.floor(board.clientHeight / blockHeight);

//   for (let row = 0; row < rows; row++) {
//     for (let col = 0; col < cols; col++) {
//       const block = document.createElement("div");
//       block.classList.add("block");
//       board.appendChild(block);
//       block.innerText = `${row}-${col}`;
//       blocks[`${row}-${col}`] = block;
//     }
//   }
// }

// function render(){
//     snake.forEach(segment => {
//         blocks[`${segment.x}-${segment.y}`].classList.add("fill")

//     })
// }
// render()

// // Create the board when the page loads
// window.addEventListener("load", createBoard);

// // Recreate the board whenever the window size changes
// window.addEventListener("resize", createBoard);

// ***********************

// const board = document.querySelector(".board");
// const startButton = document.querySelector(".btnStart");
// const StartModal = document.querySelector(".modal");
// const gameOverModal = document.querySelector(".gameOver");
// const gameOverButton = document.querySelector(".btnReStart");

// const blockHeight = 50;
// const blockWidth = 50;
// const blocks = [];
// let snake = [{ x: 3, y: 5 }];
// let head = null;
// let direction = "down";
// let interValId = null;

// let rows = Math.floor(board.clientHeight / blockHeight);
// let cols = Math.floor(board.clientWidth / blockWidth);
// let food = {
//   x: Math.floor(Math.random() * rows),
//   y: Math.floor(Math.random() * cols),
// };

// // Rinder Snake into the Bored
// function RenderBlcks() {
//   board.innerHTML = "";
//   blocks.length = 0;

//   for (let row = 0; row < rows; row++) {
//     for (let col = 0; col < cols; col++) {
//       const block = document.createElement("div");
//       block.classList.add("block");
//       board.appendChild(block);
//       blocks[`${row}-${col}`] = block;
//     }
//   }

//   renderElement();
//   startGame();
// }

// function renderElement() {
//   blocks[`${food.x}-${food.y}`].classList.add("food");

//   if (direction === "left") {
//     head = {
//       x: snake[0].x,
//       y: snake[0].y - 1,
//     };
//   } else if (direction === "right") {
//     head = {
//       x: snake[0].x,
//       y: snake[0].y + 1,
//     };
//   } else if (direction === "down") {
//     head = {
//       x: snake[0].x + 1,
//       y: snake[0].y,
//     };
//   } else if (direction === "up") {
//     head = {
//       x: snake[0].x - 1,
//       y: snake[0].y,
//     };
//   }
//   if (head.x < 0 || head.x >= rows || head.y < 0 || head.y >= cols) {
//     clearInterval(interValId);
//     gameOverModal.style.display = "flex";

//     return;
//   }

//   if (head.x == food.x && head.y === food.y) {
//     blocks[`${food.x}-${food.y}`].classList.remove("food");
//     food = {
//       x: Math.floor(Math.random() * rows),
//       y: Math.floor(Math.random() * cols),
//     };
//     blocks[`${food.x}-${food.y}`].classList.add("food");

//     snake.push(head);
//   }

//   snake.forEach((fregment) => {
//     blocks[`${fregment.x}-${fregment.y}`].classList.remove("fill");
//   });

//   snake.unshift(head);
//   snake.pop();

//   snake.forEach((fregment) => {
//     blocks[`${fregment.x}-${fregment.y}`].classList.add("fill");
//   });
// }

// // interValId = setInterval(() => {
// //   renderElement();
// // }, 300);

// // ReStart Game Modal
// gameOverButton.addEventListener("click", ReStartGame);

// function ReStartGame() {
//   blocks[`${food.x}-${food.y}`].classList.remove("food");
//   snake.forEach((fregment) => {
//     blocks[`${fregment.x}-${fregment.y}`].classList.remove("fill");
//   });

//   gameOverModal.style.display = "none";
//   direction = "down";
//   snake = [{ x: 3, y: 5 }];
//   food = {
//     x: Math.floor(Math.random() * rows),
//     y: Math.floor(Math.random() * cols),
//   };

//   interValId = setInterval(() => {
//     renderElement();
//   }, 300);
// }

// // Start Game Modal
// function startGame() {
//   startButton.addEventListener("click", function () {
//     StartModal.classList.add("hidden");
//     interValId = setInterval(() => {
//       renderElement();
//     }, 300);
//   });
// }

// // Control Snake Direction
// window.addEventListener("keydown", (e) => {
//   if (e.key === "ArrowUp") {
//     direction = "up";
//   } else if (e.key === "ArrowDown") {
//     direction = "down";
//   } else if (e.key === "ArrowRight") {
//     direction = "right";
//   } else if (e.key === "ArrowLeft") {
//     direction = "left";
//   }
// });

// startGame();
// // Create the board when the page loads
// window.addEventListener("load", RenderBlcks);

// // Recreate the board whenever the window size changes
// window.addEventListener("resize", RenderBlcks);

// **********************************************

// ===================== DOM Elements =====================

const board = document.querySelector(".board");
const startButton = document.querySelector(".btnStart");
const StartModal = document.querySelector(".modal");
const gameOverModal = document.querySelector(".gameOver");
const gameOverButton = document.querySelector(".btnReStart");

// ==================== Game Constants ====================

const blockHeight = 50;
const blockWidth = 50;

// ====================== Game State ======================

const blocks = [];

let snake = [{ x: 3, y: 5 }];
let head = null;

let direction = "down";
let interValId = null;

let rows = Math.floor(board.clientHeight / blockHeight);
let cols = Math.floor(board.clientWidth / blockWidth);

let food = {
  x: Math.floor(Math.random() * rows),
  y: Math.floor(Math.random() * cols),
};

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
  if (head.x < 0 || head.x >= rows || head.y < 0 || head.y >= cols) {
    clearInterval(interValId);
    gameOverModal.style.display = "flex";

    return;
  }

  if (head.x == food.x && head.y === food.y) {
    blocks[`${food.x}-${food.y}`].classList.remove("food");
    food = {
      x: Math.floor(Math.random() * rows),
      y: Math.floor(Math.random() * cols),
    };
    blocks[`${food.x}-${food.y}`].classList.add("food");

    snake.push(head);
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

  interValId = setInterval(() => {
    renderElement();
  }, 300);
}

function ReStartGame() {
  blocks[`${food.x}-${food.y}`].classList.remove("food");
  snake.forEach((fregment) => {
    blocks[`${fregment.x}-${fregment.y}`].classList.remove("fill");
  });

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
}

// ================ Event Listeners & Controls ================

startButton.addEventListener("click", startGame);

gameOverButton.addEventListener("click", ReStartGame);

window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp") {
    direction = "up";
  } else if (e.key === "ArrowDown") {
    direction = "down";
  } else if (e.key === "ArrowLeft") {
    direction = "left";
  } else if (e.key === "ArrowRight") {
    direction = "right";
  }
});

window.addEventListener("load", createBoard);

window.addEventListener("resize", createBoard);
