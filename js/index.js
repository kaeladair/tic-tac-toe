const Gameboard = (() => {
    let gameboard = ["", "", "", "", "", "", "", "", ""];

    const render = () => {
        let boardHTML = "";
        gameboard.forEach((square, index) => {
            boardHTML += `<div class="square" id="square-${index}">${square}</div>`;
        })
        document.querySelector('#gameboard').innerHTML = boardHTML;
    }
    
    return {
        render,
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
            playerFactory(document.querySelector('#player1').value, 'X'),
            playerFactory(document.querySelector('#player2').value, 'O')
        ];
        currentPlayerIndex = 0;
        gameOver = false;
        Gameboard.render();
    }

    return {
        start
    }

})();


const startButton = document.querySelector('#startButton');
startButton.addEventListener('click', () => {
    Game.start();
});