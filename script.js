// Global Variables
var turn = "X";
const sqr_area = document.getElementsByClassName("sqr_area")[0];
const sqr_elements = document.getElementsByClassName("sqr");
const squares = {
    a1: document.querySelector("#a1").textContent,
    a2: document.querySelector("#a2").textContent,
    a3: document.querySelector("#a3").textContent,
    b1: document.querySelector("#b1").textContent,
    b2: document.querySelector("#b2").textContent,
    b3: document.querySelector("#b3").textContent,
    c1: document.querySelector("#c1").textContent,
    c2: document.querySelector("#c2").textContent,
    c3: document.querySelector("#c3").textContent
};
let playerWin = false;

// Sounds
const tieSound = new Audio('sounds/tie.mp3');
const winSound = new Audio('sounds/right.mp3');



// Main Functions
function getWinningCombinations() {
    return [
        ["a1", "a2", "a3"],
        ["b1", "b2", "b3"],
        ["c1", "c2", "c3"],
        ["a1", "b1", "c1"],
        ["a2", "b2", "c2"],
        ["a3", "b3", "c3"],
        ["a1", "b2", "c3"],
        ["a3", "b2", "c1"]
    ];
}

function checkAllFilled() {
    const allFilled = Object.values(squares).every(value => value !== "");
    return allFilled
}

function playWrongSound() {
    const wrongSound = new Audio('sounds/wrong.mp3');
    wrongSound.play();
}


// Win Implementation

function winCheck(winningCombinations) {
    winningCombinations.forEach((combination, index) => {
        if (combination.every(square => squares[square] !== "" && squares[square] === squares[combination[0]])) {
            playerWin = true;
            winShow(index);
            return true;
        }
    });
}

function winShow(index) {
    const winningCombinations = getWinningCombinations();
    const winningCombination = winningCombinations[index];

    winningCombination.forEach(square => {
        const squareElement = document.querySelector(`#${square}`);
        if (squareElement) {
            squareElement.classList.add("win_show");
            squareElement.classList.remove("wrong_show");
        }
    });

    for (var i = 0; i < sqr_elements.length; i++) {
        sqr_elements[i].classList.remove("wrong_show");
        sqr_elements[i].classList.remove("shake");
    }

    winSound.play();
    stopGame();
}




// Tie Implementation

function tieCheck() {
    if (!playerWin){
        if (checkAllFilled()) {
            tieShow();
            return true;
        }
    }
}

function tieShow() {
    for (var i = 0; i < sqr_elements.length; i++) {
        sqr_elements[i].classList.add("tie_show");
        sqr_elements[i].classList.remove("shake");
    }

    // Play the tie sound
    tieSound.play();
    stopGame();
}


// Bad Move Implementation

function wrongCheck(parentArray , lastMove) {
    console.log(lastMove)
    let n_turn = turn == "X" ? "O" : "X";
    console.log(n_turn);
    for(var i = 0; i < parentArray.length; i++){
        let emptySquares = 0; let filledSquares = 0;
        for(var j = 0; j < parentArray[i].length; j++){
            if (!parentArray[i][j].includes(lastMove)){
                if (squares[parentArray[i][j]] == ""){
                    emptySquares++;
                } else if (squares[parentArray[i][j]] == n_turn){
                    filledSquares++;
                }
            }
            if (emptySquares == 1 && filledSquares == 2){
                wrongShow(lastMove);
            }
        }

    }
}

function wrongShow(lastMove) {
    if (!playerWin){
        const wrongMove = document.getElementById(lastMove);
        wrongMove.classList.add("wrong_show");
        wrongMove.classList.add("shake");
        setTimeout(() => {
            wrongMove.classList.remove("wrong_show");
            wrongMove.classList.remove("shake");
        }, 500);
        playWrongSound();
    }
}



// Stop Game Implementation

function stopGame() {
    const sqr_elements = document.getElementsByClassName("sqr");
    for (var i = 0; i < sqr_elements.length; i++) {
        sqr_elements[i].replaceWith(sqr_elements[i].cloneNode(true));
    }
}



// Main Event Listener

for (var i = 0; i < sqr_elements.length; i++) {
    sqr_elements[i].addEventListener("click", function() {
        const pElement = this.querySelector(".sqr_text");
        if (pElement.textContent != "") {
            return;
        } else {
            pElement.textContent = turn;
            if (turn == "X") {
                turn = "O";
            } else {
                turn = "X";
            }
        }

        // Update variables with current state of the game board
        squares.a1 = document.querySelector("#a1").textContent;
        squares.a2 = document.querySelector("#a2").textContent;
        squares.a3 = document.querySelector("#a3").textContent;
        squares.b1 = document.querySelector("#b1").textContent;
        squares.b2 = document.querySelector("#b2").textContent;
        squares.b3 = document.querySelector("#b3").textContent;
        squares.c1 = document.querySelector("#c1").textContent;
        squares.c2 = document.querySelector("#c2").textContent;
        squares.c3 = document.querySelector("#c3").textContent;
        if (!winCheck(getWinningCombinations())){
            wrongCheck(getWinningCombinations() , pElement.parentElement.id);
            tieCheck();
        };
    });
}