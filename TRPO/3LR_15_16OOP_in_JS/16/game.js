class Player {
    constructor(x, y, width, height, color, speed) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.color = color;
      this.speed = speed;
    }
  
    draw(ctx) {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  
    move(direction, canvasWidth) {
      if (direction === 'left' && this.x > 0) {
        this.x -= this.speed;
      } else if (direction === 'right' && this.x + this.width < canvasWidth) {
        this.x += this.speed;
      }
    }
  }
  
  class Obstacle {
    constructor(x, y, width, height, color, speed) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.color = color;
      this.speed = speed;
    }
  
    draw(ctx) {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  
    update() {
      this.y += this.speed;
    }
  
    isOutOfScreen(canvasHeight) {
      return this.y > canvasHeight;
    }
  
    isCollidingWith(player) {
      return (
        player.x < this.x + this.width &&
        player.x + player.width > this.x &&
        player.y < this.y + this.height &&
        player.height + player.y > this.y
      );
    }
  }
  
  class Game {
    constructor(canvas, ctx) {
      this.canvas = canvas;
      this.ctx = ctx;
      this.player = new Player(canvas.width / 2 - 25, canvas.height - 60, 50, 50, 'blue', 10);
      this.obstacles = [];
      this.lives = 3;
      this.level = 1;
      this.obstacleSpeed = 5;
      this.obstacleCreationInterval = 2000;
      this.isPaused = false;
  
      this.obstacleCreationTimer = setInterval(() => this.createObstacle(), this.obstacleCreationInterval);
      setInterval(() => this.increaseDifficulty(), 30000);
  
      document.addEventListener('keydown', (event) => this.handleKeyDown(event));
    }
  
    createObstacle() {
      const x = Math.random() * this.canvas.width;
      const y = -50;
      const width = 50;
      const height = 50;
      const color = 'red';
      const speed = this.obstacleSpeed;
  
      this.obstacles.push(new Obstacle(x, y, width, height, color, speed));
    }
  
    drawObstacles() {
      this.obstacles.forEach((obstacle, index) => {
        obstacle.draw(this.ctx);
        obstacle.update();
  
        if (obstacle.isOutOfScreen(this.canvas.height)) {
          this.obstacles.splice(index, 1);
        }
  
        if (obstacle.isCollidingWith(this.player)) {
          this.obstacles = [];
          this.lives--;
          if (this.lives === 0) {
            alert("Game Over!");
            document.location.reload();
          } else {
            alert(`You lost a life! Lives remaining: ${this.lives}`);
          }
        }
      });
    }
  
    drawStats() {
      this.ctx.fillStyle = 'black';
      this.ctx.font = '24px Arial';
      this.ctx.fillText("Lives: " + this.lives, 20, 30);
      this.ctx.fillText("Level: " + this.level, 20, 60);
    }
  
    drawPauseMessage() {
      if (this.isPaused) {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  
        this.ctx.fillStyle = 'white';
        this.ctx.font = '48px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText("PAUSED", this.canvas.width / 2, this.canvas.height / 2);
      }
    }
  
    handleKeyDown(event) {
      if (event.key === 'p' || event.key === 'P') {
        this.isPaused = !this.isPaused;
      }
  
      if (!this.isPaused) {
        if (event.key === 'ArrowLeft') {
          this.player.move('left', this.canvas.width);
        } else if (event.key === 'ArrowRight') {
          this.player.move('right', this.canvas.width);
        }
      }
    }
  
    increaseDifficulty() {
      this.level++;
      this.obstacleSpeed += 1;
      this.obstacleCreationInterval = Math.max(500, this.obstacleCreationInterval - 200);
      clearInterval(this.obstacleCreationTimer);
      this.obstacleCreationTimer = setInterval(() => this.createObstacle(), this.obstacleCreationInterval);
    }
  
    gameLoop() {
      if (!this.isPaused) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.player.draw(this.ctx);
        this.drawObstacles();
        this.drawStats();
      }
  
      this.drawPauseMessage();
      requestAnimationFrame(() => this.gameLoop());
    }
  }
  
  const canvas = document.getElementById("gameCanvas");
  const ctx = canvas.getContext("2d");
  
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  const game = new Game(canvas, ctx);
  game.gameLoop();
  