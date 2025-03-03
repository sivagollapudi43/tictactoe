let boxes = document.querySelectorAll(".box");
let turnO = true;
let count = 0;
let nameX = "Player X";
let nameO = "Player O";

function submitNames() {
  nameX = document.getElementById("nameX").value || "Player X";
  nameO = document.getElementById("nameO").value || "Player O";
  alert(`Welcome ${nameX} and ${nameO}! Let the game begin.`);
}

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (box.innerText !== "") {
      alert("That box is already filled. Please choose another.");
      return;
    }
    box.innerText = turnO ? "O" : "X";
    box.style.color = turnO ? "red" : "blue";
    turnO = !turnO;
    count++;
    if (checkWinner()) return;
    if (count === 9) alert("It's a draw!");
  });
});

function checkWinner() {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  for (let pattern of winPatterns) {
    let [a, b, c] = pattern;
    if (boxes[a].innerText && boxes[a].innerText === boxes[b].innerText && boxes[b].innerText === boxes[c].innerText) {
      let winner = boxes[a].innerText === "X" ? nameX : nameO;
      alert(`Congratulations, ${winner} wins!`);
      disableBoxes();
      return true;
    }
  }
  return false;
}

function disableBoxes() {
  boxes.forEach(box => box.disabled = true);
}

function resetGame() {
  boxes.forEach(box => {
    box.disabled = false;
    box.innerText = "";
  });
  count = 0;
  turnO = true;
}
