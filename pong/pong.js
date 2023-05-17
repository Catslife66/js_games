const gameBoard = document.getElementById("gameBoard");
const scoreText = document.getElementById("scoreText");
const resetBtn = document.getElementById("resetBtn");
const context = gameBoard.getContext('2d');
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const paddleWidth = 20;
const paddleHeight = 60;
const boardColour = 'green';

const paddle1 = {x: 0, y: 0};
const paddle1Colour = 'blue';
const paddleBorderColour = 'black';
const paddle2 = {x: gameWidth-paddleWidth, y: gameHeight-paddleHeight};
const paddle2Color = 'red';
const paddleSpeed = 50;
const ballColour = 'yellow';
const ballRadius = 10;

let interval;
let score1 = 0;
let score2 = 0;
let ballxDirection;
let ballyDirection;
let ballx = gameWidth/2;
let bally = gameHeight/2;
let ballSpeed;


//w=87 s=83 up=38 down=40
window.addEventListener("keydown", movePaddle);
//resetBtn.addEventListener("click", resetGame);

playGame();
function playGame(){
    createBall();
    nextTick();
};
function nextTick(){
    interval = setInterval(()=>{
        clearBoard();
        drawPaddle();
        drawBall(ballx, bally);
        ballMove();
        checkCollision();

    }, 10)
};
function clearBoard(){
    context.fillStyle = boardColour;
    context.fillRect(0, 0, gameWidth, gameHeight);
};
function createBall(){
    ballSpeed = 1;
    if(Math.round(Math.random())== 0){
        ballxDirection = -1;
    }
    else{
        ballxDirection = 1;
    };
    if(Math.round(Math.random())== 0){
        ballyDirection = -1;
    }
    else{
        ballyDirection = 1;
    };
    ballx = gameWidth/2;
    bally = gameHeight/2;
    drawBall(ballx, bally);
}
function ballMove(){
    ballx += ballSpeed * ballxDirection;
    bally += ballSpeed * ballyDirection;
}
function drawBall(ballx, bally){
    context.beginPath();
    context.fillStyle = ballColour;
    context.arc(ballx, bally, ballRadius, 0, 2*Math.PI);
    context.stroke();
    context.fill();
};
function drawPaddle(){
    context.fillStyle = paddle1Colour;
    context.fillRect(paddle1.x, paddle1.y, paddleWidth, paddleHeight);
    context.strokeRect(paddle1.x, paddle1.y, paddleWidth, paddleHeight);
    context.fillStyle = paddle2Color;
    context.fillRect(paddle2.x, paddle2.y, paddleWidth, paddleHeight);
    context.strokeRect(paddle2.x, paddle2.y, paddleWidth, paddleHeight);
};
function movePaddle(event){
    if(event.keyCode == 87 && paddle1.y > 0){
        paddle1.y -= paddleSpeed;
    }
    else if(event.keyCode == 83 && paddle1.y < gameHeight - paddleHeight){
        paddle1.y += paddleSpeed;
    }
    else if(event.keyCode == 38 && paddle2.y > 0){
        paddle2.y -= paddleSpeed;
    }
    else if(event.keyCode == 40 && paddle2.y < gameHeight - paddleHeight){
        paddle2.y += paddleSpeed;
    }
    // const keyPressed = event.keyCode;
    // const paddle1Up = 87;
    // const paddle1Down = 83;
    // const paddle2Up = 38;
    // const paddle2Down = 40;
    // switch(keyPressed){
    //     case(paddle1Up):
    //         if(paddle1.y > 0){
    //             paddle1.y -= paddleSpeed;
    //         }
    //         break;
    //     case(paddle1Down):
    //         if(paddle1.y < gameHeight - paddleHeight){
    //             paddle1.y += paddleSpeed;
    //         }
    //         break;
    //     case(paddle2Up):
    //         if(paddle2.y > 0){
    //             paddle2.y -= paddleSpeed;
    //         }
    //         break;
    //     case(paddle2Down):
    //         if(paddle2.y < gameHeight - paddleHeight){
    //             paddle2.y += paddleSpeed;
    //         }
    //         break;
    // }
}
function checkCollision(){
    if(bally - ballRadius < 0){
        ballyDirection *= -1;
    }
    if(bally + ballRadius > gameHeight){
        ballyDirection *= -1;
    }
    if(ballx <= 0){
        score2 += 1;
        updateScore();
        createBall();
        return;
    }
    if(ballx > gameWidth){
        score1 += 1;
        updateScore();
        createBall();
        return;
    }
    if(ballx-ballRadius <= paddle1.x+paddleWidth){
        if(bally > paddle1.y && bally < paddle1.y+paddleHeight){
            ballx = paddle1.x + paddleWidth + ballRadius;
            ballxDirection *= -1;
        }
    }
    if(ballx+ballRadius >= paddle2.x ){
        if(bally > paddle2.y && bally < paddle2.y+paddleHeight){
            ballx = paddle2.x - ballRadius;
            ballxDirection *= -1;
           
        }
    }
}

function updateScore(){
    scoreText.textContent = `${score1} : ${score2}`;
};
// function resetGame();


