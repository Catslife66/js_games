const game = document.getElementById('game');
const scoreDisplay = document.getElementById('score');

const jeopardyCategories = [
    {
        genre: 'WHO',
        questions: [
            {
                question: "Who wrote Harry Potter?",
                answers: ['JK Rowling', 'JRR Tolkin'],
                correct: 'JK Rowling',
                level: 'easy',
            },
            {
                question: "Who was born on Krypton?",
                answers: ['Aquaman', 'Superman'],
                correct: 'Superman',
                level: 'medium',
            },
            {
                question: "Who designed the first car?",
                answers: ['Karl Benz', 'Henry Ford'],
                correct: 'Karl Benz',
                level: 'hard',
            },
        ]
    },
    {
        genre: 'WHERE',
        questions: [
            {
                question: "Where is Buckingham Palace?",
                answers: ['London', 'New York'],
                correct: 'London',
                level: 'easy',
            },
            {
                question: "Where is the Colosseum?",
                answers: ['Roman', 'Milan'],
                correct: 'Roman',
                level: 'medium',
            },
            {
                question: "Where is Mount Fuji?",
                answers: ['Japan', 'Thailand'],
                correct: 'Japan',
                level: 'hard',
            },
        ]
    },
    {
        genre: 'WHAT',
        questions: [
            {
                question: "Who wrote Harry Potter?",
                answers: ['JK Rowling', 'JRR Tolkin'],
                correct: 'JK Rowling',
                level: 'easy',
            },
            {
                question: "Who was born on Krypton?",
                answers: ['Aquaman', 'Superman'],
                correct: 'Superman',
                level: 'medium',
            },
            {
                question: "Who designed the first car?",
                answers: ['Karl Benz', 'Henry Ford'],
                correct: 'Karl Benz',
                level: 'hard',
            },
        ]
    },
    {
        genre: 'WHEN',
        questions: [
            {
                question: "Where is Buckingham Palace?",
                answers: ['London', 'New York'],
                correct: 'London',
                level: 'easy',
            },
            {
                question: "Where is the Colosseum?",
                answers: ['Roman', 'Milan'],
                correct: 'Roman',
                level: 'medium',
            },
            {
                question: "Where is Mount Fuji?",
                answers: ['Japan', 'Thailand'],
                correct: 'Japan',
                level: 'hard',
            },
        ]
    },
    {
        genre: 'WHY',
        questions: [
            {
                question: "Where is Buckingham Palace?",
                answers: ['London', 'New York'],
                correct: 'London',
                level: 'easy',
            },
            {
                question: "Where is the Colosseum?",
                answers: ['Roman', 'Milan'],
                correct: 'Roman',
                level: 'medium',
            },
            {
                question: "Where is Mount Fuji?",
                answers: ['Japan', 'Thailand'],
                correct: 'Japan',
                level: 'hard',
            },
        ]
    }
]

let score = 0;

jeopardyCategories.forEach(category => {addCategory(category)})

function addCategory(category) {
    const column = document.createElement('div');
    column.classList.add('genre-column')

    const genreTitle = document.createElement('div');
    genreTitle.classList.add('genre-title');
    genreTitle.innerHTML = category.genre;

    column.appendChild(genreTitle)
    game.append(column)

    category.questions.forEach(question => {
        const card = document.createElement('div');
        card.classList.add('card');
        column.append(card);

        if(question.level === 'easy') {
            card.innerHTML = 100;
        }
        if(question.level === 'medium'){
            card.innerHTML = 200;
        }
        if(question.level === 'hard'){
            card.innerHTML = 300;
        }

        card.setAttribute('data-question', question.question);
        card.setAttribute('data-answer-1', question.answers[0]);
        card.setAttribute('data-answer-2', question.answers[1]);
        card.setAttribute('data-correct', question.correct);
        card.setAttribute('data-value', card.getInnerHTML());

        card.addEventListener('click', flipCard);
    })
}

function flipCard() {
    this.innerHTML = '';
    this.style.fontSize = '15px';
    this.style.lineHeight = '30px';
    const textDisplay = document.createElement('div');
    textDisplay.classList.add('card-text');
    textDisplay.innerHTML = this.getAttribute('data-question');
    const firstButton = document.createElement('button');
    const secondBuntton = document.createElement('button');
    firstButton.classList.add('first-button');
    secondBuntton.classList.add('second-button');
    firstButton.innerHTML = this.getAttribute('data-answer-1');
    secondBuntton.innerHTML = this.getAttribute('data-answer-2');
    this.append(textDisplay, firstButton, secondBuntton);
    firstButton.addEventListener('click', getResult);
    secondBuntton.addEventListener('click', getResult);
    
    // const allCards = Array.from(document.querySelectorAll('.card'));
    // allCards.forEach(card => card.removeEventListener('click', flipCard))
}


function getResult() {
    const allCards = Array.from(document.querySelectorAll('.card'));
    allCards.forEach(card => card.addEventListener('click', flipCard));
    
    const cardOfButton = this.parentElement
    
    if(cardOfButton.getAttribute('data-correct') == this.innerHTML){
        score = score + parseInt(cardOfButton.getAttribute('data-value'));
        scoreDisplay.textContent = score;
        cardOfButton.classList.add('correct-answer')
        setTimeout(()=>{
            while(cardOfButton.firstChild){
                cardOfButton.removeChild(cardOfButton.lastChild)
            }
            cardOfButton.innerHTML = cardOfButton.getAttribute('data-value');
        }, 100)
    } else {
        cardOfButton.classList.add('wrong-answer');
        setTimeout(()=>{
            while(cardOfButton.firstChild){
                cardOfButton.removeChild(cardOfButton.lastChild)
            }
            cardOfButton.textContent = 0;
        }, 100)
    }
    cardOfButton.removeEventListener('click', flipCard)
}


// a bug
// the card is answered still can be click and answer again
