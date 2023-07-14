// Gameboard Module
const Gameboard = (() => {
    let gameboard = ["", "", "", "", "", "", "", "", ""];
    // Render gameboard to the DOM
    const render = () => {
        let boardHTML = "";
        gameboard.forEach((square, index) => {
            boardHTML += `<div class="square" id="square-${index}">${square}</div>`;
        })
        document.querySelector('#gameboard').innerHTML = boardHTML;
        const squares = document.querySelectorAll('.square');
        squares.forEach((square) => {
            square.addEventListener('click', Game.handleClick);
        })
    }
    // Update the gameboard array
    const update = (index, value) => {
        gameboard[index] = value;
        render();
    }
    // Get the gameboard array
    const getGameboard = () => gameboard;
    // Return to public access
    return {
        render,
        update,
        getGameboard
     }
})();

// Factory function to create players
playerFactory = (name, mark) => {
    return {
        name, 
        mark
    }
};

function disableHover() {
    const squares = document.querySelectorAll('.square');
    squares.forEach((square) => {
        square.classList.add('no-hover');
    });
}

function enableHover() {
    const squares = document.querySelectorAll('.square');
    squares.forEach((square) => {
        square.classList.remove('no-hover');
    });
}


// Game Flow
const Game = (() => {
    let players = [];
    let currentPlayerIndex;
    let gameOver;

    const start = () => {
        players = [
            playerFactory("Player 1", 'X'),
            playerFactory("Player 2", 'O')
        ];
        currentPlayerIndex = 0;
        gameOver = false;
        Gameboard.render();
        const squares = document.querySelectorAll('.square');
        squares.forEach((square) => {
            square.addEventListener('click', Game.handleClick);
        })
    }

    const handleClick = (event) => {
        if (gameOver) return;

        let index = parseInt(event.target.id.split('-')[1]);
        if (Gameboard.getGameboard()[index] != "")
            return;

        Gameboard.update(index, players[currentPlayerIndex].mark);

        const winningCombination = checkWinner(Gameboard.getGameboard());

        if (winningCombination) {
            gameOver = true;
            highlightWinningSquares(winningCombination);
            disableHover();
            // Message
        }

        if (CheckTie(Gameboard.getGameboard())) {
            gameOver = true;
            disableHover();
            // Message
        }

        currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;

        const player = document.querySelector('#playerTurn');
        player.innerHTML = `${players[currentPlayerIndex].name}, Your Move`;
    }

    const restart = () => {
        gameOver = false;
        for (let i = 0; i < 9; i++) {
            const square = document.querySelector(`#square-${i}`);
            square.classList.remove('winning-square');
            Gameboard.update(i, "");
        }
        enableHover();
        Gameboard.render();
    }

    return {
        start,
        handleClick,
        restart
    }
})();

function checkWinner(board) {
    const winningCombos = [
        [0, 1, 2], 
        [3, 4, 5],
        [6, 7, 8],
        [0, 4, 8],
        [6, 4, 2],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8]
    ];

    for (let i = 0; i < winningCombos.length; i++) {
        const [a, b, c] = winningCombos[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return winningCombos[i];
        }
    }
    return null;
}

function CheckTie(board) {
    return board.every(cell => cell !== "");
}

function highlightWinningSquares(winningCombination) {
    winningCombination.forEach(index => {
        const winningSquare = document.querySelector(`#square-${index}`);
        winningSquare.classList.add('winning-square');
    });
}

const restartButton = document.querySelector('#restartButton');
restartButton.addEventListener('click', () => {
    Game.restart();
});

Game.start();
