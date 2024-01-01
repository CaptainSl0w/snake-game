// Create a canvas and get its context

let canvas = document.getElementById('gameCanvas');
let context = canvas.getContext('2d');
document.body.appendChild(canvas);
canvas.width = 400;
canvas.height = 400;

// Define the size of a box (a segment of the snake or a food item)
let box = 20;

// Initialize the snake as an array of boxes
let snake = [];
snake[0] = {x: 10 * box, y: 10 * box};

// Initialize the direction of the snake's movement
let direction;

// Create a food item at a random position
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

// Initialize the score
let score = 0;

// Function to draw the game background
function createBG() {
    context.fillStyle = "lightgray";
    context.fillRect(0, 0, 20 * box, 20 * box);
}

// Function to draw the snake
function createSnake() {
    for(let i = 0; i < snake.length; i++){
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

// Function to draw the food
function drawFood() {
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

// Event listener for arrow keys to change the direction of the snake
document.addEventListener('keydown', update);

function update(event) {
    if(event.keyCode == 37 && direction != 'right') direction = 'left';
    if(event.keyCode == 38 && direction != 'down') direction = 'up';
    if(event.keyCode == 39 && direction != 'left') direction = 'right';
    if(event.keyCode == 40 && direction != 'up') direction = 'down';
}

// Main game function
function startGame() {
    // If the snake hits the border, it appears on the opposite side
    if(snake[0].x > 15 * box && direction == 'right') snake[0].x = 0;
    if(snake[0].x < 0 && direction == 'left') snake[0].x = 16 * box;
    if(snake[0].y > 15 * box && direction == 'down') snake[0].y = 0;
    if(snake[0].y < 0 && direction == 'up') snake[0].y = 16 * box;

    // If the snake hits itself, the game ends
    for(let i = 1; i < snake.length; i++) {
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            clearInterval(game);
            alert('Game Over!');
        }
        
    }

    // Draw the game objects
    createBG();
    createSnake();
    drawFood();

    // Move the snake
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(direction == 'right') snakeX += box;
    if(direction == 'left') snakeX -= box;
    if(direction == 'up') snakeY -= box;
    if(direction == 'down') snakeY += box;

    // If the snake eats the food, a new food item is created
    // Otherwise, the tail of the snake is removed (the snake moves)
    if(snakeX != food.x || snakeY != food.y) {
        snake.pop();
    } else {
        score++;
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
    }

    // Add a new head to the snake (the snake moves)
    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);
    
    // Draw the score
    context.fillStyle = "black";
    context.font = "20px Arial";
    context.fillText("Score: " + score, 2*box, 1.6*box);
}

// Start the game loop
let game = setInterval(startGame, 100);