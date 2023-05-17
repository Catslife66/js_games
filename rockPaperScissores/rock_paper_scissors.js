const playerText = document.querySelector('#playerText');
const enemyText = document.querySelector('#enemyText');
const resultText = document.querySelector('#resultText');
const playBtns = document.querySelectorAll('.playBtn');

let player;
let enemy;
let result;

playBtns.forEach(button => button.addEventListener("click", () => {
    player = button.textContent;
    enemyPlay();
    playerText.textContent = `Player: ${player}`;
    enemyText.textContent = `Enemy: ${enemy}`;
    resultText.textContent = checkWinner();
}))

function enemyPlay(){
    const num = Math.floor(Math.random() * 3) + 1;
    switch(num){
        case 1:
            enemy = 'Rock';
            break;
        case 2:
            enemy = 'Paper';
            break;
        case 3:
            enemy = 'Scissors';
            break;
    }
}

function checkWinner(){
    if(player == enemy){
        return "Draw!"
    }
    else if(enemy == 'Rock'){
        return player == 'Paper'? 'You win!': 'You lose!';
    }
    else if(enemy == 'Paper'){
        return player == 'Scissors'? 'You win!': 'You lose!';
    }
    else if(enemy == 'Scissors'){
        return player == 'Rock'? 'You win!': 'You lose!';
    }
}