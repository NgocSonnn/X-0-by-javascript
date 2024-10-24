var currentPlayer = "X";
var board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

function place(position) {
  var [row, col] = position.split(",");
  var element = document.getElementById(position);

  if (element) {
    if (board[row][col] === "") {
      board[row][col] = currentPlayer;
      element.innerHTML = currentPlayer;

      if (checkWin()) {
        document.getElementById(
          "status"
        ).innerText = `Player ${currentPlayer} wins!`;
        disableClicks();
      } else if (checkDraw()) {
        document.getElementById("status").innerText = "It's a draw!";
      } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        document.getElementById(
          "status"
        ).innerText = `Player ${currentPlayer}'s turn`;
      }
    }
  } else {
    console.error("Element not found:", position);
  }
}

function checkWin() {
  for (var i = 0; i < 3; i++) {
    if (
      board[i][0] === currentPlayer &&
      board[i][1] === currentPlayer &&
      board[i][2] === currentPlayer
    ) {
      return true;
    }
    if (
      board[0][i] === currentPlayer &&
      board[1][i] === currentPlayer &&
      board[2][i] === currentPlayer
    ) {
      return true;
    }
  }
  if (
    board[0][0] === currentPlayer &&
    board[1][1] === currentPlayer &&
    board[2][2] === currentPlayer
  ) {
    return true;
  }
  if (
    board[0][2] === currentPlayer &&
    board[1][1] === currentPlayer &&
    board[2][0] === currentPlayer
  ) {
    return true;
  }
  return false;
}

function checkDraw() {
  for (var row of board) {
    for (var cell of row) {
      if (cell === "") {
        return false;
      }
    }
  }
  return true;
}

function disableClicks() {
  var cells = document.getElementsByClassName("cell");
  for (var cell of cells) {
    cell.onclick = null;
  }
}

function resetGame() {
  currentPlayer = "X";
  board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  var cells = document.getElementsByClassName("cell");
  for (var cell of cells) {
    cell.innerHTML = "";
    cell.setAttribute("onclick", 'place("' + cell.getAttribute("id") + '")');
  }
  document.getElementById(
    "status"
  ).innerText = `Player ${currentPlayer}'s turn`;
}
