//level 1
// const computerDisplay = document.getElementById('computer');
// const userDisplay = document.getElementById('user');
// const resultDisplay = document.getElementById('result');
// const choices = document.querySelectorAll('button');

// let user;
// let computer;
// let result;

// choices.forEach(choice => choice.addEventListener("click", (event)=>{
//     user = event.target.id;
//     userDisplay.innerHTML = user;
//     coomputerChoice();
//     checkWinner();
// }))

// function coomputerChoice(){
//     let ranNum = Math.round(Math.random() * choices.length);
//     switch(ranNum){
//         case 1:
//             computer = 'rock';
//             break
//         case 2:
//             computer = 'paper';
//             break
//         case 3:
//             computer = 'scissors';
//             break
//     }
//     computerDisplay.innerHTML = computer;
// }

// function checkWinner(){
//     if(computer == user){
//         result = 'Draw!' 
//     }else if(computer == 'rock'){
//         user == 'scissors'? result = 'You lose!' : result = 'You win!';
//     }else if(computer == 'paper'){
//         user == 'rock'? result = 'You lose!' : result = 'You win!';
//     }else if(computer == 'scissors'){
//         user == 'paper'? result = 'You lose!' : result = 'You win!';
//     }
//     resultDisplay.innerHTML = result;
// }



//level2
// const userDisplay = document.createElement('h1');
// const computerDisplay = document.createElement('h1');
// const resultDisplay = document.createElement('h1');
// const gameGrid = document.getElementById('game');
// gameGrid.append(userDisplay, computerDisplay, resultDisplay);

// const choices = ['rock', 'paper', 'scissors']
// let userChoice;
// let computerChoice;

// const handleClick = event => {
//     userChoice = event.target.id;
//     userDisplay.innerHTML = 'User choice: ' + userChoice;
//     randomChoice();
//     getResult();
// }

// const randomChoice = () =>{
//     const ranChoice = choices[Math.floor(Math.random()*choices.length)];
//     computerDisplay.innerHTML = 'Computer choice: ' + ranChoice;
//     computerChoice = ranChoice;
// }

// for(let i = 0; i < choices.length; i++){
//     const button = document.createElement('button');
//     button.id = choices[i];
//     button.innerHTML = choices[i];
//     button.addEventListener("click", handleClick)
//     gameGrid.appendChild(button);
// }

// const getResult = () =>{
//     switch (userChoice + computerChoice) {
//         case 'scissorspaper':
//         case 'rockscissors':
//         case 'paperrock':
//             resultDisplay.innerHTML = "YOU WIN!"
//             break
//         case 'paperscissors':
//         case 'scissorsrock':
//         case 'rockpaper':
//             resultDisplay.innerHTML = "YOU LOSE!"
//             break
//         case 'paperpaper':
//         case 'scissorsscissors':
//         case 'rockrock':
//             resultDisplay.innerHTML = "ITS A DRAW!"
//             break
//     }
// }


//level 3
