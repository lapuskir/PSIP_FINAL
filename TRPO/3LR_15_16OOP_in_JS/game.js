const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let player = {
  x: canvas.width / 2 - 25,
  y: canvas.height - 60,
  width: 50,
  height: 50,
  color: 'blue',
  speed: 10
};

let obstacles = [];
let lives = 3;
let level = 1;
let obstacleSpeed = 5;
let obstacleCreationInterval = 2000;
let isPaused = false; // Переменная для отслеживания паузы

function drawPlayer() {
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.width, player.height);
}

function createObstacle() {
  let obstacle = {
    x: Math.random() * canvas.width,
    y: -50,
    width: 50,
    height: 50,
    color: 'red',
    speed: obstacleSpeed
  };
  obstacles.push(obstacle);
}

function drawObstacles() {
  obstacles.forEach((obstacle, index) => {
    ctx.fillStyle = obstacle.color;
    ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    obstacle.y += obstacle.speed;

    if (obstacle.y > canvas.height) {
      obstacles.splice(index, 1);
    }
  });
}

function checkCollision() {
  obstacles.forEach((obstacle) => {
    if (
      player.x < obstacle.x + obstacle.width &&
      player.x + player.width > obstacle.x &&
      player.y < obstacle.y + obstacle.height &&
      player.height + player.y > obstacle.y
    ) {
      obstacles = [];
      lives--;

      if (lives === 0) {
        alert("Game Over!");
        document.location.reload();
      } else {
        alert("You lost a life! Lives remaining: " + lives);
      }
    }
  });
}

document.addEventListener('keydown', function(event) {
  if (event.key === 'p' || event.key === 'P') { // Нажатие на клавишу "P" ставит/снимает паузу
    isPaused = !isPaused; // Переключаем состояние паузы
  }

  if (!isPaused) { // Управление игроком только если игра не на паузе
    if (event.key === 'ArrowLeft' && player.x > 0) {
      player.x -= player.speed;
    } else if (event.key === 'ArrowRight' && player.x + player.width < canvas.width) {
      player.x += player.speed;
    }
  }
});

function drawStats() {
  ctx.fillStyle = 'black';
  ctx.font = '24px Arial';
  ctx.fillText("Lives: " + lives, 20, 30);
  ctx.fillText("Level: " + level, 20, 60);
}

function increaseDifficulty() {
  level++;
  obstacleSpeed += 1;
  obstacleCreationInterval = Math.max(500, obstacleCreationInterval - 200);
  clearInterval(obstacleCreationTimer);
  obstacleCreationTimer = setInterval(createObstacle, obstacleCreationInterval);
}

// Функция для отображения паузы
function drawPauseMessage() {
  if (isPaused) {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)'; // Полупрозрачный черный фон
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'white';
    ctx.font = '48px Arial';
    ctx.textAlign = 'center';
    ctx.fillText("PAUSED", canvas.width / 2, canvas.height / 2); // Сообщение "PAUSED"
  }
}

function gameLoop() {
  if (!isPaused) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();
    drawObstacles();
    checkCollision();
    drawStats();
  }

  drawPauseMessage(); // Отображаем сообщение о паузе
  requestAnimationFrame(gameLoop);
}

let obstacleCreationTimer = setInterval(createObstacle, obstacleCreationInterval);
setInterval(increaseDifficulty, 30000);

gameLoop();
