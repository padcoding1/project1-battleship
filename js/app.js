//UX IDEA: GET INPUT FROM USER

const game = {
  admiral1: "Jack Sparrow",
  admiral2: "Barbosa",
  //UX IDEA: CHOOSE WHO GOES FIRST FROM USER INPUT, LET THEM CHOOSE THEIR FLEET PICS
  currentAdmiral: "Barbosa",

  gridArray: [100], //To keep track of which gridIds have been clicked
  gridId: "",

  currentBattle: true,
  vessels: {
    coords: [
      ["", "", "", "", ""],
      ["", "", "", ""],
      ["", "", ""],
      ["", ""],
    ],
    vesselCount: 0,
    hitsLeft: 0,
    vesselInfo: {
      vesselHit: false,
      vesselNum: undefined,
      vesselSection: undefined,
    },
  },
};

//UX IDEA: DRAG AND DROP FLEET
//UX IDEA: SELECTABLE VESSELS
//UX IDEA: DECENT AI

createBoard(); //create the board and all of the cells
vesselCoords();
createEventListeners();

function createBoard() {
  console.log("Call createBoard");
  let i = 0,
    j = 0,
    gridCount = 0;

  for (i = 0; i < 11; i++) {
    for (j = 0; j < 11; j++) {
      let divElement = document.createElement("div");
      let gridCode = String.fromCharCode(64 + i) + j;
      divElement.setAttribute("class", "cell");
      divElement.setAttribute("id", gridCode);
      divElement.style.backgroundImage = "url(./media/oceanTile.png";
      document.getElementById("board").appendChild(divElement);
      if (i === 0 && j > 0 && j < 11) {
        divElement.textContent = j;
        document.getElementById(`${gridCode}`).style.backgroundImage =
          "url(./media/borderTile.png";
      }
      if (j === 0 && i > 0 && i < 11) {
        divElement.textContent = String.fromCharCode(64 + i);
        document.getElementById(`${gridCode}`).style.backgroundImage =
          "url(./media/borderTile.png";
      }
      //style the top left corner of the grid
      document.getElementById("@0").style.backgroundImage =
        "url(./media/borderTile.png";
    }
  }
  for (let k = 1; k < 11; k++) {
    for (let l = 1; l < 11; l++) {
      game.gridArray[gridCount] = String.fromCharCode(64 + k) + l;
      gridCount += 1;
    }
  }
}

//TODO: GET VESSEL PLACEMENT COORDS FROM USER
function vesselCoords() {
  console.log("Call vesselCoords");
  let coords = game.vessels.coords;
  let hitsLeft = game.vessels.hitsLeft;
  // for (let i = 0; i < game.vesselCount; i++) {
  coords[0] = ["A1", "A2", "A3", "A4", "A5"];
  coords[1] = ["B1", "B2", "B3", "B4"];
  coords[2] = ["C1", "C2", "C3"];
  coords[3] = ["D1", "D2"];
  game.vessels.vesselCount = game.vessels.coords.length;
  game.vessels.coords.forEach(
    (vessel) => (game.vessels.hitsLeft = game.vessels.hitsLeft + vessel.length)
  );
  console.log("hitsLeft: ", game.vessels.hitsLeft);
}

function nextAction(gridId) {
  console.log("Call nextAction");
  console.log("currentBattle: ", game.currentBattle);
  if (game.currentBattle === false) {
    document.querySelector("h2").innerText = `Game Over`;
  }
  hitOrMiss(gridId);
  switchAdmiral();
}

function createEventListeners() {
  const cells = document.querySelectorAll(".cell");
  //run a loop and add event listeners to all cells with cellClicked function
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
  document.querySelector(".newgame").addEventListener("click", newGame);
  console.log("Call createEventListeners:");
}
function newGame() {
  game.currentBattle = false;
}
function cellClicked(clickedCellEvent) {
  // console.log("clickedCellEvent:", clickedCellEvent);

  //clickedCellEvent pulls in data in the form of the object PointerEvent
  //e.g. .target below is the property/value "target: div#A3.cell"
  //which is the same as the HTML form: <div class="cell" id="A3"></div>

  //go further and use clickedCell.id and it will give the string "A3"

  const clickedCell = clickedCellEvent.target;
  // console.log("clickedCell.target: ", clickedCell);

  //clickedCell.id is a String
  console.log("Call cellClicked:", clickedCell.id);

  //Return the id of the clicked cell so I can use it in the
  //future placeFleet() and hitOrMiss() functions
  return clickedCell.id.toString();
}

function checkGridId(gridId) {
  //This will be part of the reset/game over function
  //Check if the currentBattle is ongoing, if it's over, can't hitOrMiss

  //REPLACE THE CELL WITH A HIT OR MISS INDICATOR
  //I think this code will work, but I need to change the gridId info as well as the url
  game.gridId = cellClicked(gridId);
  object = game.vessels;
  for (let i = 0; i < object.vesselCount; i++) {
    object.vesselInfo.vesselSection = object.coords[i].indexOf(game.gridId);
    if (object.vesselInfo.vesselSection > -1) {
      console.log(
        `Section ${object.vesselInfo.vesselSection} of Vessel #${i} found at ${game.gridId}`
      );
      object.vesselInfo.vesselNum = i;
      object.vesselInfo.vesselSection;
      console.log("Call checkGridId", object.vesselInfo);
      return;
    }
  }
}

function hitOrMiss(gridId) {
  if (game.currentBattle === false) {
    return;
  }
  console.log("Calling hitOrMiss func");
  checkGridId(gridId);
  let info = game.vessels.vesselInfo;
  let id = game.gridId;
  let array = game.gridArray;
  let arrayIndex = array.indexOf(id);
  console.log("info:", info);
  console.log("vesselHit: ", info.vesselHit);
  if (arrayIndex === -1) {
    document.querySelector(
      "h2"
    ).innerText = `${id} already clicked here. Try Again`;
    console.log("else if array", array);
    return;
  } else {
    document.querySelector("h2").innerText = `${id} clicked`;
    console.log("arrayIndex: ", arrayIndex);
    array[arrayIndex] = true;
    console.log("else array", array);
  }

  //otherwise, if the index from above is greater than/equal to zero,
  //display the grid id and a new hit message
  //and return true
  //also check the condition if the ship is sunk with isSunk function
  //if it's true, increment this.shipsSunk

  if (info.vesselSection != -1) {
    info.vesselSection = "hit";
    document.querySelector("h2").innerText = `${id} HIT!`;

    document.getElementById(`${game.gridId}`).style.backgroundImage =
      "url(./media/explosion.gif";
    setTimeout(
      (explosion) =>
        (document.getElementById(`${game.gridId}`).style.backgroundImage =
          "url(./media/hitTile.png"),
      900
    );
    game.vessels.hitsLeft -= 1;
    console.log("HITS LEFT: ", game.vessels.hitsLeft);
  } else {
    document.querySelector("h2").innerText = `${id} MISS!`;
    document.getElementById(`${game.gridId}`).style.backgroundImage = "none";
    document.getElementById(`${game.gridId}`).style.backgroundColor = "yellow";
  }

  if (game.vessels.hitsLeft === 0) {
    document.querySelector("h2").innerText = `${game.currentAdmiral} WON!`;
    game.currentBattle = false;

    //   document.getElement("h2").innerText = "You sunk my battleship!";
  }
}

//I might use .find here for somethinggridArray.find(gridId] = document.
// console.log("game.gridId:", game.gridId);

function switchAdmiral() {
  //TAKE TURNS
  //Ternary: Is the current admiral admiral1? If truthy, change to admiral2
  //When run again, if the current admiral is admiral2, change to admiral1
  game.currentAdmiral =
    game.currentAdmiral === game.admiral1 ? game.admiral2 : game.admiral1;
  console.log("Call switchAdmiral:", game.currentAdmiral);
}

$(function () {
  $(".draggable").draggable({
    containment: "parent",
    cursor: "move",
    revert: true,
  });
});

$(function () {
  $(".square").droppable({
    drop: handleDrop,
  });
});

function handleDrop(event, ui) {
  ui.draggable.position({
    of: $(this),
    my: "left top",
    at: "left top",
  });
  ui.draggable.draggable("option", "revert", false);
  ui.draggable.draggable("option", "grid", [52, 52]);
}
