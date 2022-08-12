let speed = 50;


const gameboard = document.querySelector('#gameBoard');
const ctx = gameboard.getContext('2d');
const scoreText = document.querySelector('#scoreText');
const resetbtn = document.querySelector("#resetbtn");
const gameWidth = gameboard.width;
const gameHeigth = gameboard.height;

const boardBackground = 'white';
const snakeColor = 'green';
const snakeBorder = 'black';
const foodColor = 'red';

const unitSize = 25;

let running = false;
let Xvelocity = unitSize;
let Yvelocity = 0;

let foodX;
let foodY;

let score = 0;

let snake = [
    {x:unitSize * 4, y:0},
    {x:unitSize * 3, y:0},
    {x:unitSize * 2, y:0},
    {x:unitSize, y:0},
    {x:0, y:0},
];

window.addEventListener('keydown', changeDirection);
resetbtn.addEventListener('click', resetGame);
/* createFood();
drawFood(); */
gameStart();

function gameStart(){
    running = true;
    scoreText.textContent = score;
    createFood();
    drawFood();
    nextTick(); 
}

function nextTick(){
    if(running){
        setTimeout(()=>{
            clearBoard();
            drawFood();
            moveSnake();
            drawSnake();
            checkOver();
            nextTick();
        },speed);
    }else{
        displayGameOver();
    }
}

function clearBoard(){
 
    ctx.fillStyle = boardBackground;
    ctx.fillRect(0,0, gameWidth, gameHeigth);
}


function createFood(){
    function randomFood(min, max){
        const randNum = Math.round((Math.random() * (max - min) + min) / unitSize) * unitSize;
        return randNum;
    }

    foodX = randomFood(0 , gameWidth - unitSize);
    foodY = randomFood(0 , gameWidth - unitSize);
    // console.log(foodX, foodY);
}

function drawFood(){
    ctx.fillStyle = foodColor;
    ctx.fillRect(foodX, foodY, unitSize, unitSize);
}

function moveSnake(){
    const head = {x: snake[0].x + Xvelocity, 
                  y: snake[0].y + Yvelocity};
    snake.unshift(head);
    // in food in eaten
    if(snake[0].x == foodX && snake[0].y == foodY){
        score+=1;
        scoreText.textContent = score;
        speed-=10;
        createFood();
    }else{
        snake.pop();
        
    }
    
}

function drawSnake(){
  
    ctx.fillStyle = snakeColor;
    ctx.strokeStyle = snakeBorder;
    snake.forEach(snakePart => {
        ctx.fillRect(snakePart.x, snakePart.y, unitSize,  unitSize);
        ctx.strokeRect(snakePart.x, snakePart.y, unitSize,  unitSize);
    });

}

function changeDirection(event){
    const keyPressed = event.keyCode;
    console.log(keyPressed);
    const LEFT = [37, 65];
    const RIGTH = [39, 68];
    const UP = [38, 87];
    const DOWN = [40, 83];

    const goingUp = (Yvelocity == -unitSize);
    const goingDown = (Yvelocity == unitSize);
    const goingRigth = (Xvelocity == unitSize);
    const goingLeft = (Xvelocity == -unitSize);

    switch(true){
       
        case(LEFT.includes(keyPressed) && !goingRigth):
            Xvelocity = -unitSize;
            Yvelocity = 0;
            break;
        
        case(UP.includes(keyPressed) && !goingDown):
            Xvelocity = 0;
            Yvelocity = -unitSize;
            break;
        
        case(RIGTH.includes(keyPressed) && !goingLeft):
            Xvelocity = unitSize;
            Yvelocity = 0;
            break;
        
        case(DOWN.includes(keyPressed) && !goingUp):
            Xvelocity = 0;
            Yvelocity = unitSize;
            break;
        
    }
}

function checkOver(){
    switch(true){
        case (snake[0].x < 0):
            running = false;
            break;
        case (snake[0].x >= gameWidth):
            running = false;
            break;
        case (snake[0].y < 0):
            running = false;
            break;
        case (snake[0].y >= gameHeigth):
            running = false;
            break;
        }
    for(let i = 1; i < snake.length; i++){
        if(snake[i].x == snake[0].x && snake[i].y == snake[0].y){
            running = false;
        }
    }
}

function displayGameOver(){
    ctx.font = '50px MV Boli';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    ctx.fillText('Game Over', gameWidth / 2, gameHeigth / 2);
    running = false;

}
function resetGame(){
    score = 0;
    speed = 100;
    Xvelocity = unitSize;
    Yvelocity = 0;
    snake = [
        {x:unitSize * 4, y:0},
        {x:unitSize * 3, y:0},
        {x:unitSize * 2, y:0},
        {x:unitSize, y:0},
        {x:0, y:0},
    ];
    gameStart();

}