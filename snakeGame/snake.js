document.addEventListener('DOMContentLoaded', ()=> {
    const squares = document.querySelectorAll('.grid div');
    const scoreDisplay = document.querySelector('span');
    const startBtn = document.querySelector('.start');

    const width = 10;
    let currentIndex = 0;
    let appleIndex = 0;
    let currentSnake = [2, 1, 0] // 2 is head, 1 is body, 0 is tail
    let direction = 1;
    let score = 0;
    let speed = 0.9;
    let intervalTime = 0;
    let interval = 0;

    //to start, and restart the game
    function startGame(){
        //clean the screen
        currentSnake.forEach(index => squares[index].classList.remove('snake'));
        squares[appleIndex].classList.remove('apple');
        clearInterval(interval);
        score = 0;
        //reset the game
        randomApple();
        direction = 1;
        scoreDisplay.innerHTML = score;
        intervalTime = 1000;
        currentSnake = [2, 1, 0];
        currentIndex = 0;
        currentSnake.forEach(index => squares[index].classList.add('snake'));
        interval = setInterval(moveOutcomes, intervalTime)
    }

    //create food
    function randomApple(){
        do{
            appleIndex = Math.floor(Math.random()*squares.length);
        }while(squares[appleIndex].classList.contains('snake')){
            squares[appleIndex].classList.add('apple');
        }
    }

    //all game outcomes
    function moveOutcomes(){
        //check collision
        if(
            (currentSnake[0] + width >= (width * width) && direction === width) ||   //head hits bottom
            (currentSnake[0] - width <= 0 && direction === -width) ||                //head hits top
            (currentSnake[0] % width === width-1 && direction === 1) ||              //head hits right
            (currentSnake[0] % width === 0 && direction === -1) ||                   //head hits left
            (squares[currentSnake[0] + direction].classList.contains('snake'))       //head hits body
        ){
            return clearInterval(interval); // stop interations
        }
        //move snake
        const tail = currentSnake.pop();
        squares[tail].classList.remove('snake');
        currentSnake.unshift(currentSnake[0] + direction)
        // check if food is eaten
        if(squares[currentSnake[0]].classList.contains('apple')){
            squares[currentSnake[0]].classList.remove('apple');
            squares[tail].classList.add('snake');
            currentSnake.push(tail)
            randomApple();
            score ++;
            scoreDisplay.textContent = score;
            clearInterval(interval);
            intervalTime = intervalTime * speed;
            interval = setInterval(moveOutcomes, intervalTime);
        }
        squares[currentSnake[0]].classList.add('snake');
    }

    //assign functions to keycodes
    function control(event){
        squares[currentIndex].classList.remove('snake');

        if(event.keyCode === 39){
            direction = 1;
        }else if(event.keyCode === 38){
            direction = -width;
        }else if(event.keyCode ===37){
            direction = -1;
        }else if(event.keyCode === 40){
            direction = +width
        }
    }

    document.addEventListener('keyup', control);
    startBtn.addEventListener('click', startGame)
})