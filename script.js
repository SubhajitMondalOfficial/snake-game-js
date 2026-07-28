document.addEventListener("DOMContentLoaded", function () {
  const board = document.querySelector(".board");
  const blockWidth = 30;
  const blockHeight = 30;

  
  function createBoard() {
      // Remove old blocks
      board.innerHTML = ""
      
      const cols = Math.floor(board.clientWidth / blockWidth);
      const rows = Math.floor(board.clientHeight / blockHeight);

    for (let i = 0; i < rows * cols; i++) {
      const block = document.createElement("div");
      block.classList.add("block");
      board.appendChild(block);
    }
  }

  // Create the board when the page loads
  window.addEventListener("load", createBoard);

  // Recreate the board whenever the window size changes
  window.addEventListener("resize", createBoard);

   
});
