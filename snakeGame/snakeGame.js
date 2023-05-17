const gameBoard = document.querySelector('#gameBoard');
const scoreTxt = document.querySelector('#score');
const context = gameBoard.getContext('2d');
const restartBtn = document.getElementById('restartBtn');

const size = 25;
const screenWidth = gameBoard.width;
const screenHeight = gameBoard.height;
const snakeColor = 'green';
const snakeBorder = 'white';
const foodColor = 'red';
const boardBackground = 'white';

let running = false;
let foodX;
let foodY;
let food;
let score = 0;
let xSpeed = size;
let ySpeed = 0;
let snake = [
    {x: 4*size, y: 0},
    {x: 3*size, y: 0},
    {x: 2*size, y: 0},
    {x: 1*size, y: 0},
    {x: 0, y: 0}
]
let timer;

window.addEventListener("keydown", changeDirection);
restartBtn.addEventListener("click", restartGame);

gameStart();

function gameStart(){
    running = true;
    scoreTxt.textContent = score;
    createFood();
    drawFood();
    nextTick();
};
function nextTick(){
    if(running){
        timer = setTimeout(() => {
            clearBoard();
            drawFood();
            moveSnake();
            drawSnake();
            checkGameOver();
            nextTick(); 
         }, 100);
    }
    else{
        displayGameOver();
    }
};

function clearBoard(){
    context.fillStyle = boardBackground;
    context.fillRect(0, 0, screenWidth, screenHeight);
};

function createFood(){
    foodX = Math.floor(Math.random()*(screenWidth - size) / size) * size;
    foodY = Math.floor(Math.random()*(screenHeight - size) / size) * size;
    food = {x: foodX, y:foodY}
    return foodX, foodY, food;
};
function drawFood(){
    context.fillStyle = foodColor;
    context.fillRect(foodX, foodY, size, size);
}
function moveSnake(){
    const head = {x: snake[0].x + xSpeed, y: snake[0].y + ySpeed};
    snake.unshift(head);
    // if food is eaten
    if(snake[0].x == foodX && snake[0].y == foodY){
        score += 1;
        scoreTxt.textContent = score;
        createFood();
    }
    else{
        snake.pop();//if food not eaten snake length not change, cos always pop the last one.
    }
};
function drawSnake(){
    context.fillStyle = snakeColor;
    context.scrokeStyle = snakeBorder;
    snake.forEach(snakePart => {
        context.fillRect(snakePart.x, snakePart.y, size, size);
        context.strokeRect(snakePart.x, snakePart.y, size, size);
    })
    // for(let i = 0; i < snake.length; i++){
    //     context.fillRect(snake[i].x, snake[i].y, size, size);
    //     context.strokeRect(snake[i].x, snake[i].y, size, size);
    // }
};
function changeDirection(event){
    const keyPressed = event.keyCode;
    const LEFT = 37;
    const RIGHT = 39;
    const UP = 38;
    const DOWN = 40;

    const goingUp = (ySpeed == -size);
    const goingDown = (ySpeed == size);
    const goingRight = (xSpeed == size);
    const goingLeft = (xSpeed == -size);

    switch(true){
        case(keyPressed == LEFT && !goingRight):
            xSpeed = -size;
            ySpeed = 0;
            break;
        case(keyPressed == UP && !goingDown):
            xSpeed = 0;
            ySpeed = -size;
            break;
        case(keyPressed == RIGHT && !goingLeft):
            xSpeed = size;
            ySpeed = 0;
            break;
        case(keyPressed == DOWN && !goingUp):
            xSpeed = 0;
            ySpeed = size;
            break;
    }

};
function checkGameOver(){
    // collide border
    switch(true){
        case (snake[0].x < 0):
            running = false;
            break;
        case (snake[0].x >= screenWidth):
            running = false;
            break;
        case (snake[0].y < 0):
            running = false;
            break;
        case (snake[0].y >= screenHeight):
            running = false;
            break;
    }
    // collide body
    for(let i = 1; i < snake.length; i++){
        if(snake[i].x == snake[0].x && snake[i].y == snake[0].y){
            running = false;
        }
    }

};
function displayGameOver(){
    context.font = "50px MV Boli";
    context.fillStyle = "black";
    context.textAlign = "center";
    context.fillText("GAME OVER!", screenWidth / 2, screenHeight / 2);
    running = false;
};
function restartGame(){
    score = 0;
    xSpeed = size;
    ySpeed = 0;
    snake = [
        {x: 4*size, y: 0},
        {x: 3*size, y: 0},
        {x: 2*size, y: 0},
        {x: 1*size, y: 0},
        {x: 0, y: 0}
    ];
    clearTimeout(timer);
    gameStart();
};



