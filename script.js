const canvas = document.getElementById('volleyballCanvas');
const ctx = canvas.getContext('2d');

// Ball properties
const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: 10,
  speed: 5,
  dx: 2,
  dy: -2
};

// Player properties
const player = {
  x: canvas.width / 2 - 50,
  y: canvas.height - 30,
  width: 100,
  height: 10,
  speed: 8
};

// Key state
const keys = {
  left: false,
  right: false
};

// Event listeners for key presses
document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);

function handleKeyDown(event) {
  if (event.key === 'ArrowLeft') {
    keys.left = true;
  } else if (event.key === 'ArrowRight') {
    keys.right = true;
  }
}

function handleKeyUp(event) {
  if (event.key === 'ArrowLeft') {
    keys.left = false;
  } else if (event.key === 'ArrowRight') {
    keys.right = false;
  }
}

// Update the game state
function update() {
  // Move the player based on key input
  if (keys.left && player.x > 0) {
    player.x -= player.speed;
  }

  if (keys.right && player.x < canvas.width - player.width) {
    player.x += player.speed;
  }

  // Update the ball position
  ball.x += ball.dx;
  ball.y += ball.dy;

  // Check collision with walls
  if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
    ball.dx = -ball.dx;
  }

  if (ball.y - ball.radius < 0) {
    ball.dy = -ball.dy;
  }

  // Check collision with the player
  if (
    ball.y + ball.radius > player.y &&
    ball.y - ball.radius < player.y + player.height &&
    ball.x + ball.radius > player.x &&
    ball.x - ball.radius < player.x + player.width
  ) {
    ball.dy = -ball.dy;
  }
}

// Draw the game elements
function draw() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the ball
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = '#0095DD';
  ctx.fill();
  ctx.closePath();

  // Draw the player
  ctx.beginPath();
  ctx.rect(player.x, player.y, player.width, player.height);
  ctx.fillStyle = '#0095DD';
  ctx.fill();
  ctx.closePath();
}

// Main game loop
function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();