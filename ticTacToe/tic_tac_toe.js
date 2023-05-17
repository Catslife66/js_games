const cells = document.querySelectorAll('.cell');
const statusText = document.querySelector('#statusText');
const restartBtn = document.querySelector('#restartBtn');
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let options = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let running = false;

playGame();

function playGame(){
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    running = true;
    statusText.textContent = `${currentPlayer}'s turn`;
    restartBtn.addEventListener("click", restart)
}

function cellClicked(){
    const cellIndex = this.getAttribute("cellIndex");
    if(options[cellIndex] != '' || !running){
        return;
    }
    updateCell(this, cellIndex);
    checkWinner();
}

function updateCell(cell, index){
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

function changePlayer(){
    currentPlayer = (currentPlayer == 'X') ? 'O' : 'X';
    statusText.textContent = `${currentPlayer}'s turn`;
}

function checkWinner(){
    let winning = false;

    for(let i = 0; i < winConditions.length; i++){
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if(cellA == "" || cellB == "" || cellC == ""){
            continue;
        }
        if(cellA == cellB && cellB == cellC){
            winning = true;
            break;
        }
    }

    if(winning){
        statusText.textContent = `${currentPlayer} wins!`;
        running = false;
    }
    else if(!options.includes("")){
        statusText.textContent = `Draw!`;
        running = false;
    }
    else{
        changePlayer();
    }
}

function restart(){
    running = true;
    options = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    cells.forEach(cell => cell.textContent = '');
    statusText.textContent = `${currentPlayer}'s turn`;
}



// my version
// let wins = [
//     [0, 1, 2],
//     [3, 4, 5],
//     [6, 7, 8],
//     [0, 3, 6],
//     [1, 4, 7],
//     [2, 5, 8],
//     [0, 4, 8],
//     [2, 4, 6]
// ]
// let player = 1;
// let board = ['', '', '', '', '', '', '', '', ''];
// let winning = false;
// const cells = document.querySelectorAll('.cell');
// const result = document.getElementById('statusText');
// const restartBtn = document.getElementById('restartBtn');

// cells.forEach((cell, index) =>{
//     cell.addEventListener("click", () => {ticCell(index)});
// })
// restartBtn.addEventListener("click", () => {restart()})

// function ticCell(index){
//     if(board[index] == '' && !winning){
//         board[index] = player;
//         player *= -1;
//         console.log(board);
//     }
//     if(board[index] == 1){
//         cells[index].textContent = 'X'
//         result.textContent = "Player X's turn.";
//     }
//     else if(board[index] == -1){
//         cells[index].textContent = 'O';
//         result.textContent = "Player O's turn.";
//     }
//     checkWinner();
// }

// function checkWinner(){
//     for(let i = 0; i < wins.length; i++){
//         let win = wins[i];
//         let cellA = board[win[0]];
//         let cellB = board[win[1]];
//         let cellC = board[win[2]];
//         if(cellA == 1 && cellB == 1 && cellC == 1){
//             winning = true;
//             result.textContent = "Player X wins."
//             break;
//         }
//         else if(cellA == -1 && cellB == -1 && cellC == -1){
//             winning = true;
//             result.textContent = "Player O wins."
//             break;
//         }
//         else if(!board.includes('')){
//             result.textContent = "Draw!"
//         }
//     }
// }

// function restart(){
//     player = 1;
//     board = ['', '', '', '', '', '', '', '', ''];
//     winning = false;
//     for(let i = 0; i < cells.length; i++){
//         let cell = cells[i];
//         cell.textContent = '';
//     }
//     result.textContent = '';
// }