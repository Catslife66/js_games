let board = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
]

let player = 1;
let gameOver = false;

const cells = document.querySelectorAll('.cell');
const result = document.getElementById('result');
const restartBtn = document.getElementById('restartBtn');

cells.forEach((cell, index) => {
    cell.addEventListener("click", () => {placeMaker(index)});
})

restartBtn.addEventListener("click", () => {restart()});

function placeMaker(index){
    let row = Math.floor(index / 3);
    let col = index % 3;
    if(board[row][col] == 0 && !gameOver){
        board[row][col] = player;
        player *= -1;
        console.log(board);
    }
    drawMarker();
    checkWinner();
 
}

function drawMarker(){
    for(let row = 0; row < 3; row++){
        for(let col = 0; col < 3; col++){
            if(board[row][col] == 1){
                cells[row*3 + col].classList.add('circle');
            }
            else if(board[row][col] == -1){
                cells[row*3 + col].classList.add('cross');
            }
        }
    }
}

function checkWinner(){
    //check horizontal and vertical
    for(let i = 0; i < 3; i++){
        let rowSum = board[i][0] + board[i][1] + board[i][2];
        let colSum = board[0][i] + board[1][i] + board[2][i];
        if(rowSum == '3' || colSum == '3'){
            endGame(1);
        }
        else if(rowSum == '-3' || colSum == '-3'){
            endGame(2);
        }
    }
    //check diagonal
    let digonalSum1 = board[0][0] + board[1][1] + board[2][2];
    let digonalSum2 = board[2][0] + board[1][1] + board[0][2];
    if(digonalSum1 == '3' || digonalSum2 == '3'){
        endGame(1);  
    }
    else if(digonalSum1 == '-3' || digonalSum2 == '-3'){
        endGame(2);
    }

    //check draw
    if(board[0].indexOf(0) == -1 && board[1].indexOf(0) == -1 && board[2].indexOf(0) == -1){
        endGame(0);
    }
}

function endGame(winner){
    gameOver = true;
    if(winner == 0){
        result.textContent = 'Draw!';
    }
    else{
        result.textContent = `Player ${winner} wins!`;
    }
}

function restart(){
    board = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ]
    player = 1;
    gameOver = false;
    cells.forEach(cell => {
        cell.classList.remove("circle", "cross");
        //cell.classList = 'cell';
    })
    result.textContent = '';
}