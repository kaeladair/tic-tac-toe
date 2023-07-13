const Gameboard = (() => {
    let gameboard = ["", "", "", "", "", "", "", "", ""];

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

    const update = (index, value) => {
        gameboard[index] = value;
        render();
    }

    const getGameboard = () => gameboard;

    return {
        render,
        update,
        getGameboard
     }
})();


playerFactory = (name, mark) => {
    return {
        name, 
        mark
    }
};


const Game = (() => {
    let players = [];
    let currentPlayerIndex;
    let gameOver;

    const start = () => {
        players = [
            playerFactory("Player1", 'X'),
            playerFactory("Player2", 'O')
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
        let index = parseInt(event.target.id.split('-')[1]);
        if (Gameboard.getGameboard()[index] != "")
            return;

        if (checkWinner(Gameboard.getGameboard(), players[currentPlayerIndex].mark)) {
            gameOver = true;
            // Message
        }

        if (CheckTie) {
            gameOver = true;
            // Message
        }

        Gameboard.update(index, players[currentPlayerIndex].mark);
        currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
    }

    const restart = () => {
        for (let i = 0; i < 9; i++) {
            Gameboard.update(i, "");
        }
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
        return true;
        }
        
    }
    return false;
}

function CheckTie(board) {
    return board.every(cell => cell !== "");
}


const restartButton = document.querySelector('#restartButton');
restartButton.addEventListener('click', () => {
    Game.restart();
});

Game.start();