let stairBorder = "8px groove green";

let jumpKey = "j";
let changeDirectionKey = "f";
let xDirection = -1;

function sprite() {
  this.block = document.createElement("div");
  this.xPosition = 7;
  this.yPosition = 7;
  this.block.id = "sprite";
  this.block.innerText = "<";
}

function stair() {
  this.block = document.createElement("div");
  this.xPosition = 7;
  this.yPosition = 7;
  this.block.className = "stair";
  this.block.style.borderBottom = stairBorder;
}

function makeBoard() {
  let grid = document.createElement("div");
  grid.id = "grid";
  for (let j = 0; j < 10; j++) {
    let row = document.createElement("div");
    row.id = `row${j}`;
    row.className = "rows";
    for (let i = 0; i < 15; i++) {
      let cell = document.createElement("div");
      cell.id = `grid[${j}][${i}]`;
      cell.dataset.xPosition = i;
      cell.dataset.yPosition = j;
      cell.className = "cells";
      row.appendChild(cell);
    }
    grid.append(row);
  }
  return grid;
}
let game = document.querySelector("#game");
game.innerHTML = "";
game.append(makeBoard());
createStairs();
let player = new sprite();
const start = document.getElementById(
  `grid[${player.yPosition}][${player.xPosition}]`
);
start.append(player.block);
createGroundFrom(player.yPosition);

document.addEventListener("keydown", stepUp);
let points = 0;
makeBoard();
let pointsDisplay = document.querySelector("#points");

pointsDisplay.innerText = points;

let highScoreDisplay = document.querySelector("#high-score");
let highScore = 0;
highScoreDisplay.innerText = highScore;

function stepUp() {
  let stairs = document.querySelectorAll(".stair");
  switch (event.key) {
    case jumpKey:
      for (let i = 0; i < stairs.length; i++) {
        let currentStairX = parseInt(
          stairs[i].parentElement.getAttribute("data-x-position")
        );
        let currentStairY = parseInt(
          stairs[i].parentElement.getAttribute("data-y-position")
        );
        let stairDestination = document.getElementById(
          `grid[${currentStairY + 1}][${currentStairX - xDirection}]`
        );
        if (stairDestination !== null) {
          stairDestination.append(stairs[i]);
        } else {
          stairs[i].style.border = "";
        }
      }
      if (checkForStair(player.block.nextElementSibling)) {
        points += 1;
        pointsDisplay.innerText = points;
        addStair();
      } else {
        alert("you fell!");
        game.innerHTML = "";
        game.append(makeBoard());
        createStairs();
        player = new sprite();
        const start = document.getElementById(
          `grid[${player.yPosition}][${player.xPosition}]`
        );
        start.append(player.block);
        createGroundFrom(player.yPosition);
        if (points > highScore) {
          highScore = points;
          highScoreDisplay.innerText = highScore;
        }
        points = 0;
        pointsDisplay.innerText = points;
        xDirection = -1;
      }
      break;
    case changeDirectionKey:
      switch (xDirection) {
        case -1:
          xDirection = 1;
          player.block.innerText = ">";
          break;
        case 1:
          xDirection = -1;
          player.block.innerText = "<";
          break;
      }
      for (let i = 0; i < stairs.length; i++) {
        let currentStairX = parseInt(
          stairs[i].parentElement.getAttribute("data-x-position")
        );
        let currentStairY = parseInt(
          stairs[i].parentElement.getAttribute("data-y-position")
        );
        let stairDestination = document.getElementById(
          `grid[${currentStairY + 1}][${currentStairX - xDirection}]`
        );
        if (stairDestination !== null) {
          stairDestination.append(stairs[i]);
        } else {
          stairs[i].style.border = "";
        }
      }
      if (checkForStair(player.block.nextSibling)) {
        points += 1;
        pointsDisplay.innerText = points;
        addStair();
      } else {
        alert("you fell!");
        game.innerHTML = "";
        game.append(makeBoard());
        createStairs();
        player = new sprite();
        const start = document.getElementById(
          `grid[${player.yPosition}][${player.xPosition}]`
        );
        start.append(player.block);
        createGroundFrom(player.yPosition);
        if (points > highScore) {
          highScore = points;
          highScoreDisplay.innerText = highScore;
        }
        points = 0;
        pointsDisplay.innerText = points;
        xDirection = -1;
      }
  }

  function checkForStair(a) {
    let cellInQuestion = a;
    if (cellInQuestion === null) {
      return false;
    } else if (cellInQuestion.style.borderBottom === stairBorder) {
      return true;
    }
  }
}

function createGroundFrom(y) {
  let groundY = y;
  for (let j = 0; j < 2; j++) {
    for (let i = 0; i < 15; i++) {
      let groundPiece = document.createElement("div");
      groundPiece.className = "ground";
      groundPiece.style.backgroundColor = "limegreen";
      let groundPieceLocation = document.getElementById(
        `grid[${groundY + 1 + j}][${i}]`
      );
      groundPieceLocation.append(groundPiece);
    }
  }
}

function createStairs() {
  let lastStair;
  for (let i = 7; i > 0; i--) {
    let newStair = new stair();
    if (lastStair !== undefined) {
      newStair.xPosition = lastStair.xPosition;
    }
    newStair.xPosition = decideX(newStair.xPosition);
    let stairLocation = document.getElementById(
      `grid[${i - 1}][${newStair.xPosition}]`
    );
    stairLocation.appendChild(newStair.block);
    lastStair = newStair;
  }
}

function addStair() {
  let topStair = document.querySelector(".stair");
  console.log(topStair);
  let topStairX = parseInt(
    topStair.parentElement.getAttribute("data-x-position")
  );
  let topStairY = parseInt(
    topStair.parentElement.getAttribute("data-y-position")
  );
  let newStairX = decideX(topStairX);
  let newStairY = topStairY - 1;
  let stair = document.createElement("div");
  let newStairLocation = document.getElementById(
    `grid[${newStairY}][${newStairX}]`
  );
  stair.className = "stair";
  stair.style.borderBottom = stairBorder;
  newStairLocation.appendChild(stair);
}

function decideX(x) {
  let flipCoin = Math.floor(Math.random() * 2);
  switch (flipCoin) {
    case 0:
      return x - 1;
    case 1:
      return x + 1;
  }
}
