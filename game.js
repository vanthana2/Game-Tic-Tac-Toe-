"use strict";
document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll('.board__cell');
    const restartButton = document.querySelector('.game-restart-btn');
    const popup = document.querySelector('.popup');
    const message = document.querySelector('#message');
    const popupRestartButton = document.querySelector('.popup__restart-btn');
    // const laughXSound = document.getElementById('laughX');
    // const sneezeOSound = document.getElementById('sneezeO');
    let currentPlayer = 'X';
    let gameActive = true;
    let gameState = ["", "", "", "", "", "", "", "", ""];

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const handleCellPlayed = (clickedCell, clickedCellIndex) => {
        gameState[clickedCellIndex] = currentPlayer;
        clickedCell.textContent = currentPlayer;
        // if (currentPlayer === 'X') {
        //     laughXSound.play();
        // } else {
        //     sneezeOSound.play();
        // }
    };

    const handlePlayerChange = () => {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
    };

    const handleResultValidation = () => {
        let roundWon = false;
        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
            if (gameState[a] === "" || gameState[b] === "" || gameState[c] === "") {
                continue;
            }
            if (gameState[a] === gameState[b] && gameState[b] === gameState[c]) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            message.textContent = `Player ${currentPlayer} has won!`;
            popup.classList.remove('hide');
            gameActive = false;
            return;
        }

        const roundDraw = !gameState.includes("");
        if (roundDraw) {
            message.textContent = "It's a draw!";
            popup.classList.remove('hide');
            gameActive = false;
            return;
        }

        handlePlayerChange();
    };

    const handleCellClick = (event) => {
        const clickedCell = event.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index')) - 1;

        if (gameState[clickedCellIndex] !== "" || !gameActive) {
            return;
        }

        handleCellPlayed(clickedCell, clickedCellIndex);
        handleResultValidation();
    };

    const handleRestartGame = () => {
        gameActive = true;
        currentPlayer = 'X';
        gameState = ["", "", "", "", "", "", "", "", ""];
        cells.forEach(cell => {
            cell.textContent = "";
            cell.style.backgroundColor = "";
        });
        popup.classList.add('hide');
    };

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    restartButton.addEventListener('click', handleRestartGame);
    popupRestartButton.addEventListener('click', handleRestartGame);
});
