let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let score = { X: 0, O: 0 };
let gameActive = true;

const grid = document.getElementById("grid");
const turnDisplay = document.getElementById("turn");
const scoreDisplay = document.getElementById("score");
const resultDisplay = document.getElementById("result");
const resetBtn = document.getElementById("resetBtn");

// Create grid buttons
for (let i = 0; i < 9; i++) {
  const cell = document.createElement("button");
  cell.dataset.index = i;
  cell.addEventListener("click", handleClick);
  grid.appendChild(cell);
}

function handleClick(e) {
  const index = e.target.dataset.index;
  if (board[index] !== "" || !gameActive) return;

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;
  e.target.style.backgroundColor = currentPlayer === "X" ? "#c8e6c9" : "#bbdefb";
  e.target.style.border = currentPlayer === "X" ? "2px solid #2e7d32" : "2px solid #1565c0";

  const winner = checkWinner();
  if (winner) {
    resultDisplay.textContent = winner === "Draw" ? "It's a draw!" : `🎉 Player ${winner} wins!`;
    if (winner !== "Draw") {
      highlightWinner(winningCombo);
      score[winner]++;
      updateScore();
    }
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  turnDisplay.textContent = `Player ${currentPlayer}'s Turn`;
}

let winningCombo = [];
function checkWinner() {
  const combos = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];
  for (let combo of combos) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      winningCombo = combo;
      return board[a];
    }
  }
  return board.includes("") ? null : "Draw";
}

function highlightWinner(combo) {
  for (let idx of combo) {
    grid.children[idx].style.backgroundColor = "#ffeb3b";
  }
}

function updateScore() {
  scoreDisplay.textContent = `Score — X: ${score.X} | O: ${score.O}`;
}

resetBtn.addEventListener("click", () => {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  resultDisplay.textContent = "";
  turnDisplay.textContent = "Player X's Turn";

  for (let btn of grid.children) {
    btn.textContent = "";
    btn.style.backgroundColor = "#eeeeee";
    btn.style.border = "1px solid #ccc";
  }
});