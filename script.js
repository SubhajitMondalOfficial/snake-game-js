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

const board = document.querySelector(".board");

const blockHeight = 50;
const blockWidth = 50;

const blocks = [];

const snake = [{ x: 1, y: 3 }];

let direction = "right";

let interValId = null; 

const rows = Math.floor(board.clientHeight / blockHeight);
const cols = Math.floor(board.clientWidth / blockWidth);

for (let row = 0; row < rows; row++) {
  for (let col = 0; col < cols; col++) {
    const block = document.createElement("div");
    block.classList.add("block");
    board.appendChild(block);
    block.textContent = `${row}-${col}`;
    blocks[`${row}-${col}`] = block;
  }
}

function renderElement() {
  snake.forEach((fregment) => {
    blocks[`${fregment.x}-${fregment.y}`].classList.add("fill");
  });
}

interValId = setInterval(() => {
  let head = null;

  if (direction === "left") {
    // console.log(`x: ${snake[0].x}, y:${snake[0].y - 1}`);

    head = {
      x: snake[0].x,
      y: snake[0].y - 1,
    };
  } else if(direction === "right"){
    // console.log(`x: ${snake[0].x}, y:${snake[0].y + 1}`);

    head = {
        x: snake[0].x,
        y: snake[0].y + 1
    }
  }else if(direction === "down"){
    head = {
        x: snake[0].x + 1 ,
        y: snake[0].y,
    }
  } else if(direction === "up"){
    head = {
        x: snake[0].x - 1 ,
        y: snake[0].y,
    }
  }
  if(head.x < 0 || head.x >= rows || head.y < 0 || head.y >= cols){
    alert('Game Over');
    clearInterval(interValId)
  }

  snake.forEach((fregment) => { 
    blocks[`${fregment.x}-${fregment.y}`].classList.remove("fill");
  });

  snake.unshift(head);
  snake.pop();

  renderElement();
}, 300);











window.addEventListener("keydown", (e) => {
    console.log(e.key);
    if(e.key === "ArrowUp"){
        direction = "up"
    } else if(e.key === "ArrowDown"){
        direction = "down"
    } else if(e.key === "ArrowRight"){
        direction = "right"
    } else if(e.key === "ArrowLeft"){
        direction = "left"
    }
    
})