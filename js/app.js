//UX IDEA: GET INPUT FROM USER
const admiral1 = "Jack Sparrow",
	admiral2 = "Barbosa";
//UX IDEA: CHOOSE WHO GOES FIRST FROM USER INPUT, LET THEM CHOOSE THEIR FLEET PICS
let currentAdmiral = "Barbosa";
let gridArray = Array(100).fill("", 0); //Create 100 index array and fill /w ""
let currentBattle = true;
console.log(gridArray);
const admiralObject = {};

//UX IDEA: DRAG AND DROP FLEET
//UX IDEA: SELECTABLE VESSELS
//UX IDEA: DECENT AI

createBoard(); //create the board and all of the cells

//get all elements of class "cell"

const cells = document.querySelectorAll(".cell");
//run a loop and add event listeners to all cells with cellClicked function
if (currentBattle === true) {
	cells.forEach((cell) => {
		cell.addEventListener("click", attack);
	});
	for (let i = 0; i < 11; i++) {
		document.querySelector(`#\\@${i}`).removeEventListener("click", attack);

		if (i > 0) {
			document
				.querySelector(`#${String.fromCharCode(64 + i)}` + "0")
				.removeEventListener("click", attack);
		}
		console.log(String.fromCharCode(64 + i));
	}
}

//NEED TO DO: Run the turn-based attack function and within function run the cellClicked function
function cellClicked(clickedCellEvent) {
	console.log("clickedCellEvent:", clickedCellEvent);
	//clickedCellEvent pulls in data in the form of the object PointerEvent
	//e.g. .target below is the property/value "target: div#A3.cell"
	//which is the same as the HTML form: <div class="cell" id="A3"></div>

	//go further and use clickedCell.id and it will give the string "A3"

	const clickedCell = clickedCellEvent.target;
	console.log("clickedCell.target: ", clickedCell);

	//clickedCell.id is a String
	console.log("clickedCell.id ", clickedCell.id);

	//Return the id of the clicked cell so I can use it in the
	//future placeFleet() and attack() functions
	return clickedCell.id;
}

function attack(clickedCellEvent) {
	//This will be part of the reset/game over function
	//Check if the currentBattle is ongoing, if it's over, can't attack
	console.log("atttack func");
	if (currentBattle === false) {
		return;
	}
	//REPLACE THE CELL WITH A HIT OR MISS INDICATOR
	//I think this code will work, but I need to change the gridId info as well as the url
	let attackCell = cellClicked(clickedCellEvent);

	//I might use .find here for somethinggridArray.find(gridId] = document.
	document.getElementById(`${attackCell}`).style.backgroundImage =
		"url(./media/hitTile.png";

	//TAKE TURNS
	//Ternary: Is the current admiral admiral1? If truthy, change to admiral2
	//When run again, if the current admiral is admiral2, change to admiral1
	currentAdmiral = currentAdmiral === admiral1 ? admiral2 : admiral1;
	console.log(currentAdmiral);
}

function createBoard() {
	let i = 0,
		j = 0;
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
}
