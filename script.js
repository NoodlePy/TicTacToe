var turn = "X";
var playerWin = false;
const wrongSound = new Audio('sounds/wrong.mp3');
const sqr_area = document.getElementsByClassName("sqr_area")[0];
const sqr_elements = document.getElementsByClassName("sqr");

window.onload = function() {
    console.log("aa");
}

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

function wrongShow(player, clickedSquare) {
    if (playerWin == false) {
        const winningCombinations = getWinningCombinations();
        for (let combination of winningCombinations) {
            let playerCount = 0;
            let emptyCount = 0;
            for (let square of combination) {
                if (squares[square] === player) {
                    playerCount++;
                } else if (squares[square] === "") {
                    emptyCount++;
                }
            }
            if (playerCount === 2 && emptyCount === 1) {
                const squareElement = document.querySelector(`#${clickedSquare}`);
                if (squareElement) {
                    squareElement.classList.add("wrong_show");
                    sqr_area.classList.add("shake");
                    setTimeout(() => {
                        sqr_area.classList.remove("shake");
                    }, 500); // Remove the class after 2 seconds
                    setTimeout(() => {
                        squareElement.classList.remove("wrong_show");
                    }, 500); // Remove the class after 2 seconds
                }
                return true;
            }
        }
        return false;
    }
}

function winShow(index) {
    playerWin = true;
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
    }

    // Play the winning sound
    const winSound = new Audio('sounds/right.mp3');
    wrongSound.pause();
    winSound.play();
    wrongSound.pause();
}

function tieShow() {
    for (var i = 0; i < sqr_elements.length; i++) {
        sqr_elements[i].classList.add("tie_show");
    }

    // Play the tie sound
    const tieSound = new Audio('sounds/tie.mp3');
    tieSound.play();
}


function stopGame() {
    const sqr_elements = document.getElementsByClassName("sqr");
    for (var i = 0; i < sqr_elements.length; i++) {
        sqr_elements[i].replaceWith(sqr_elements[i].cloneNode(true));
    }
}

for (var i = 0; i < sqr_elements.length; i++) {
    sqr_elements[i].addEventListener("click", function() {
        const pElement = this.querySelector(".sqr_text");
        if (pElement.textContent != "") {
            return;
        } else {
            const currentPlayer = turn;
            const clickedSquare = this.id;
            if (wrongShow(currentPlayer, clickedSquare)) {
                wrongSound.play();
            }
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

        const winningCombinations = getWinningCombinations();

        let isWinner = false;
        winningCombinations.forEach((combination, index) => {
            if (combination.every(square => squares[square] !== "" && squares[square] === squares[combination[0]])) {
                stopGame();
                winShow(index);
                isWinner = true;
                return;
            }
        });

        if (!isWinner) {
            const allFilled = Object.values(squares).every(value => value !== "");
            if (allFilled) {
                stopGame();
                tieShow();
            }
        }
    });
}