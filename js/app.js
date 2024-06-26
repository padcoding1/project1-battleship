//TODO THEN MAKE SURE YOU"VE ERROR TESTED
//TODO THEN MAKE SURE YOU GIT PUSH EVERYTHING
//TODO MAKE SURE YOU SUBMIT ALL NEEDED DOCUMENTS
//TODO ***DO I NEED THE FONT DOWNLOADED OR CAN I ACCESS VIA API?!

const game = {
  gameContent: false,
  instructions: true,
  playersForm: false,
  admiral1: "Jack Sparrow",
  admiral2: "Barbosa",
  currentAdmiral: "Barbosa",

  gridArray: [100],
  gridId: "",
  coords1: [
    ["A1", "A2", "A3", "A4", "A5"],
    ["B3", "C3", "D3", "E3"],
    ["C5", "C6", "C7"],
    ["F8", "G8"],
  ],
  coords2: [
    ["", "", "", "", ""],
    ["", "", "", ""],
    ["", "", ""],
    ["", ""],
  ],

  currentBattle: true,

  hitsLeftPlayer1: 14,
  hitsLeftPlayer2: 14,
};

function createNewGame() {
  console.log("createNewGame func");
  document.getElementById("gamecontent").innerHTML = "";
  console.log("...next func is nested!");
  getUserInput();
}

function getUserInput() {
  console.log("getUserInput func");
  game.playersForm = true;
  document.querySelector("#messagebox").innerText = "Who is playing?";
  let gameContent = document.querySelector("#gamecontent");

  let playerForm = document.createElement("form");
  playerForm.id = "players";
  gameContent.appendChild(playerForm);

  let inputField1 = document.createElement("input");
  inputField1.type = "text";
  inputField1.id = "admiral1";
  //inputField1.value = "Jack Sparrow";
  inputField1.placeholder = "Enter Player 1 Name";
  playerForm.appendChild(inputField1);

  let inputField2 = document.createElement("input");
  inputField2.type = "text";
  inputField2.id = "admiral2";
  // inputField2.value = "Barbosa;
  inputField2.placeholder = "Enter Player 2 Name";
  playerForm.appendChild(inputField2);

  let submit = document.createElement("button");
  submit.type = "submit";
  submit.innerText = "Submit";
  submit.id = "submit";
  playerForm.appendChild(submit);

  document.getElementById("submit").addEventListener("click", function (event) {
    event.preventDefault();
    console.log("...next func is nested!");
    getPlayerNames();
  });
}

function getPlayerNames() {
  console.log("getPlayerNames func");
  game.admiral1 = document.getElementById("admiral1").value;
  game.admiral2 = document.getElementById("admiral2").value;
  game.currentAdmiral = game.admiral1;
  console.log(game.admiral1);
  console.log(game.admiral2);
  let remove = document.getElementById("players");
  remove.remove();

  console.log("...next func is nested!");
  //vesselCoords();
  createBoard();
}
function vesselCoords() {
  document.querySelector("#messagebox").innerText = " ";
  createBoard();
  let tempCoords;
  for (let i = 0; i < 4; i++) {
    for (let j = 5; j > 1; j--) {
      tempCoords = randomVessel(j);
      while (alreadyPlaced1(tempCoords) === true) {
        tempCoords = randomVessel(j);
      }
    }
    game.coords1[i] = tempCoords;
  }

  for (let i = 0; i < 4; i++) {
    for (let j = 5; j > 1; j--) {
      tempCoords = randomVessel(5);
      while (alreadyPlaced2(tempCoords) === true) {
        tempCoords = randomVessel(j);
      }
      game.coords2[i] = tempCoords;
    }
  }
  console.log(game.coords1);
  console.log(game.coords2);
}

function randomVessel(length) {
  let row, column;
  let verOrHor = Math.floor(Math.random() * 2);
  let coords = [];
  if (verOrHor === 1) {
    row = Math.floor(Math.random() * 10);
    column = Math.floor(Math.random() * (10 - length));
  } else {
    row = Math.floor(Math.random() * (10 - length));
    column = Math.floor(Math.random() * 10);
  }
  for (let i = 0; i < 5; i++) {
    if (verOrHor === 1) {
      coords.push(String.fromCharCode(65 + row) + (column + i));
    } else {
      coords.push(String.fromCharCode(65 + i) + column);
    }
  }
  console.log(coords);
  return coords;
}
function alreadyPlaced1(coords) {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < coords.length; j++) {
      if (game.coords1[i].indexOf(coords[j]) >= 0) {
        return true;
      }
    }
  }
  return false;
}
function alreadyPlaced2(coords) {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < coords.length; j++) {
      if (game.coords2[i].indexOf(coords[j]) >= 0) {
        return true;
      }
    }
  }
  return false;
}

function createBoard() {
  console.log("createBoard func");
  let i = 0,
    j = 0,
    gridCount = 0;
  game.boardCreated = true;
  let gameBoard = document.createElement("div");
  gameBoard.setAttribute("class", "test");
  gameBoard.setAttribute("id", "board");
  document.getElementById("gamecontent").style.flexDirection = "none";

  document.getElementById("gamecontent").appendChild(gameBoard);
  for (i = 0; i < 11; i++) {
    for (j = 0; j < 11; j++) {
      let divElement = document.createElement("div");
      let gridCode = String.fromCharCode(64 + i) + j;
      divElement.setAttribute("class", "cell");
      divElement.setAttribute("id", gridCode);

      document.getElementById("board").appendChild(divElement);

      document.getElementById(`${gridCode}`).style.background =
        "rgba(255, 255, 255, 0.2)";
      if (i === 0 && j > 0 && j < 11) {
        divElement.textContent = j;
        document.getElementById(`${gridCode}`).style.background =
          "rgba(255, 215, 0, 0.8)";
      }
      if (j === 0 && i > 0 && i < 11) {
        divElement.textContent = String.fromCharCode(64 + i);
        document.getElementById(`${gridCode}`).style.background =
          "rgba(255, 215, 0, 0.8)";
      }
      document.getElementById("@0").style.border = "none";
      document.getElementById("@0").style.background = "none";
    }
  }
  for (let k = 1; k < 11; k++) {
    for (let l = 1; l < 11; l++) {
      game.gridArray[gridCount] = String.fromCharCode(64 + k) + l;
      gridCount += 1;
    }
  }
  createEventListeners();
}

function createEventListeners() {
  console.log("createEventListeners func");
  document.querySelector("#messagebox").innerText = "Let's Play!";

  const cells = document.querySelectorAll(".cell");
  if (game.currentBattle === true) {
    cells.forEach((cell) => {
      cell.addEventListener("click", nextAction);
    });
    for (let i = 0; i < 11; i++) {
      document
        .querySelector(`#\\@${i}`)
        .removeEventListener("click", nextAction);

      if (i > 0) {
        document
          .querySelector(`#${String.fromCharCode(64 + i)}` + "0")
          .removeEventListener("click", nextAction);
      }
    }
  }
  turnText();
}

function turnText() {
  console.log("turntext func");

  setTimeout((turntext) => {
    document.querySelector(
      "#messagebox"
    ).innerText = `${game.currentAdmiral}'s turn! Click to FIRE!`;
  }, 1500);
}

function nextAction(gridId) {
  console.log("nextAction func");
  if (game.currentBattle === false) {
    document.querySelector("#messagebox").innerText = `Game Over`;
  }
  hitOrMiss(gridId);
}

function cellClicked(clickedCellEvent) {
  console.log("cellClicked func");
  const clickedCell = clickedCellEvent.target;
  console.log(clickedCell.id.toString());
  return clickedCell.id.toString();
}

function checkGridId(gridId) {
  console.log("checkGridId func");
  game.gridId = cellClicked(gridId);
  array = game.gridArray;
  doneCell = array.indexOf(game.gridId);
  for (let i = 0; i < 5; i++) {
    if (doneCell !== -1) {
      game.gridArray[doneCell] = true;
      return game.gridId;
    }
    if (doneCell === -1) {
      document.querySelector(
        "#messagebox"
      ).innerText = `${game.gridId} already clicked here. Try Again`;
      return;
    }
  }
}

function hitOrMiss(gridId) {
  console.log("hitOrMiss func");
  if (game.currentBattle === false) {
    return;
  }

  let shotCell = checkGridId(gridId);

  for (let j = 0; j < 4; j++) {
    for (let i = 0; i < 4; i++) {
      shotCell = shotCell.toString();
      console.log("!!!!!", shotCell.type);
      if (shotCell === game.coords1[j][i]) {
        game.hitsLeftPlayer1 -= 1;
        document.querySelector("#messagebox").innerText = `${game.gridId} HIT!`;
        playExplosion();

        document.getElementById(`${game.gridId}`).style.backgroundImage =
          "url(../media/explosion.gif;";
        setTimeout(
          (explosion) =>
            (document.getElementById(`${game.gridId}`).style.backgroundImage =
              "url(./media/hitTile.png"),
          1500
        );
      }
    }
  }

  document.querySelector("#messagebox").innerText = `${game.gridId} MISS!`;
  playSplash();
  document.getElementById(`${game.gridId}`).style.backgroundImage = "none";
  document.getElementById(`${game.gridId}`).style.backgroundColor = "yellow";

  if (game.hitsLeftPlayer1 === 0 || game.hitsLeftPlayer2 === 0) {
    document.querySelector(
      "#messagebox"
    ).innerText = `${game.currentAdmiral} WON!`;
    game.currentBattle = false;
  }
  setTimeout(switchAdmiral(), 2000);
}
function switchAdmiral() {
  console.log("switchAdmiral func");
  if (game.currentBattle === false) {
    return;
  }
  game.currentAdmiral =
    game.currentAdmiral === game.admiral1 ? game.admiral2 : game.admiral1;
  console.log("CURRENT ADMIRAL NOW: ", game.currentAdmiral);
  setTimeout(turnText(), 1000);
}

function playExplosion() {
  console.log("PLAY EXPLOSION func");
  let audio = document.getElementById("explosion");
  audio.volume = 0.3;
  audio.play();
}

function playSplash() {
  console.log("PLAY SPLASH func");
  let audio = document.getElementById("splash");
  audio.volume = 1;
  audio.play();
}

let music = document.getElementById("piratetheme");
music.volume = 0.1;
let newGame = document.querySelector("#newGame");
newGame.addEventListener("click", createNewGame);

/*COMMENT GRAVEYARD


LOGIC FOR CLEARING A CONTAINER:
document.getElemetById("gamecontent").innerHTML = "";

/////////////
LOGIC FOR LATER: Getting User Inputs for Ship Locations
console.log(cellClicked(gridId));
  let coords1 = game.vessels.coordsPlayer1;
  let hitsLeft1 = game.vessels.hitsLeftPlayer1;
  let k = 5;
  for (j = 0; j < 4; j++) {
    console.log("inside loop", j);
    for (let i = k; i > k; i--) {
      console.log("inside loop", i, "max loop: ", k);
      document.querySelector("#messagebox").innerText = `Ship ${
        j + 1
      } has ${i} cells left to place.`;
      coords1[j][i] = cellClicked(gridId);
      console.log(coords1[j]);
    }
    k = +1;
  }

/////////////


*/
