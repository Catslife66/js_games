let board = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
];
const playturn = document.getElementById('playturn');
const resultDisplay = document.getElementById('result');
const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
const resetBtn = document.getElementById('resetBtn');

const width = 560;
const height = 480;
const unit = 80;
const rowNum = 6;
const colNum = 7;

let col;
let row;
let currentPlayer = 1;
let winning = false;
let rect = canvas.getBoundingClientRect();
let player1 = 'red';
let player2 = 'blue';

startGame();
resetBtn.addEventListener("click", resetGame);


function startGame(){
    drawBoard();
    tickToken();
}

function drawBoard(){
    for(let r = 1; r < rowNum; r++){
        context.beginPath();
        context.moveTo(0, r* unit);
        context.lineTo(562, r* unit);
        context.lineWidth = 1;
        context.stroke();
    }
    for(let c = 1; c < colNum; c++){
        context.beginPath();
        context.moveTo(c* unit, 0);
        context.lineTo(c* unit, 486);
        context.lineWidth = 1;
        context.stroke();
    }
}

function drawToken(row, col, player){
    let x = col* unit + unit/2;
    let y = row* unit + unit/2;
    context.beginPath();
    context.fillStyle = `${player}`;
    context.arc(x, y, 30, 0, 2*Math.PI);
    context.stroke();
    context.fill();
}

function tickToken(){
    canvas.addEventListener('click', (event) =>{
        col = Math.floor((event.clientX-rect.left)/unit);
        row = Math.floor((event.clientY-rect.top)/unit);
        if(!winning){
            if((row < 5 && board[row][col] == 0 && board[row+1][col] != 0) || 
            (row == 5 && board[5][col] == 0)){
                if(currentPlayer == 1){
                    board[row][col] = 1;
                    currentPlayer = 2; 
                    drawToken(row, col, player1);
                    playturn.innerHTML = `Player ${currentPlayer}'s turn.`
                    resultDisplay.textContent = ' ';
                }else if(currentPlayer == 2){
                    board[row][col] = 2; 
                    drawToken(row, col, player2);
                    currentPlayer = 1;
                    playturn.innerHTML = `Player ${currentPlayer}'s turn.`
                    resultDisplay.textContent = ' ';
                }
            }else if(row < 5 && board[row][col] == 0 && board[row+1][col] == 0){
                resultDisplay.textContent = 'You cannot put a token here.';
            }
            checkWinner();  
        }
    }) 
}

function checkWinner(){
    //check horizontal win
    for(let r = 0; r < rowNum; r++){
        for(let c = 0; c < 4; c++){
            if(board[r][c] == 1 && board[r][c+1] == 1 && board[r][c+2] == 1 && board[r][c+3] == 1){
                playturn.textContent = 'Player 1 wins!';
                winning = true;
                break;
            }
            if(board[r][c] == 2 && board[r][c+1] == 2 && board[r][c+2] == 2 && board[r][c+3] == 2){
                playturn.textContent = 'Player 2 wins!';
                winning = true;
                break;
            }
        }
    }
    //check vertical win
    for(let c = 0; c < colNum; c++){
        for(let r = 0; r < 3; r++){
            if(board[r][c] == 1 && board[r+1][c] == 1 && board[r+2][c] == 1 && board[r+3][c] == 1){
                playturn.textContent = 'Player 1 wins!';
                winning = true;
                break;
            }
            if(board[r][c] == 2 && board[r+1][c] == 2 && board[r+2][c] == 2 && board[r+3][c] == 2){
                playturn.textContent = 'Player 2 wins!';
                winning = true;
                break;
            }
        }
    }
    //check \ win
    for(let r = 0; r < 3; r ++){
        for(let c= 0; c < 4; c++){
            if(board[r][c] == 1 && board[r+1][c+1] == 1 && board[r+2][c+2] == 1 && board[r+3][c+3] == 1){
                playturn.textContent = 'Player 1 wins!';
                winning = true;
                break;
            }
            if(board[r][c] == 2 && board[r+1][c+1] == 2 && board[r+2][c+2] == 2 && board[r+3][c+3] == 2){
                playturn.textContent = 'Player 2 wins!';
                winning = true;
                break;
            }
        }
    }
    //check / win
    for(let r = 0; r < 3; r++){
        for(let c = 0; c < 3; c++){
            if(board[r][c+3] == 1 && board[r+1][c+2] == 1 && board[r+2][c+1] == 1 && board[r+3][c] == 1){
                playturn.textContent = 'Player 1 wins!';
                winning = true;
                break;
            }
            if(board[r][c+3] == 2 && board[r+1][c+2] == 2 && board[r+2][c+1] == 2 && board[r+3][c] == 2){
                playturn.textContent = 'Player 2 wins!';
                winning = true;
                break;
            }
        }
    }
}

function resetGame(){
    board = [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
    ];
    currentPlayer = 1;
    winning = false;
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawBoard();
    playturn.textContent = "Player 1's turn.";
}