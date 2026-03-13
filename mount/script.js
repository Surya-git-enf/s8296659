const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game settings
const gravity = 0.5;
const friction = 0.9;

// Player settings (red square)
const player = {
    x: 50,
    y: canvas.height - 70, // Start above ground
    width: 30,
    height: 30,
    color: 'red',
    speed: 5,
    jumpForce: -10,
    dx: 0, // Horizontal velocity
    dy: 0, // Vertical velocity
    isGrounded: false
};

// Ground settings
const ground = {
    x: 0,
    y: canvas.height - 40,
    width: canvas.width,
    height: 40,
    color: '#006400' // Dark green
};

// Input state
const keys = {
    left: false,
    right: false,
    space: false
};

// Draw functions
function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawGround() {
    ctx.fillStyle = ground.color;
    ctx.fillRect(ground.x, ground.y, ground.width, ground.height);
}

// Update game state
function update() {
    // Apply gravity
    player.dy += gravity;

    // Apply horizontal movement
    if (keys.left) {
        player.dx = -player.speed;
    } else if (keys.right) {
        player.dx = player.speed;
    } else {
        player.dx *= friction; // Apply friction when no key is pressed
    }

    // Update player position
    player.x += player.dx;
    player.y += player.dy;

    // Keep player within horizontal bounds
    if (player.x < 0) {
        player.x = 0;
    }
    if (player.x + player.width > canvas.width) {
        player.x = canvas.width - player.width;
    }

    // Collision with ground
    if (player.y + player.height > ground.y) {
        player.y = ground.y - player.height;
        player.dy = 0;
        player.isGrounded = true;
    }

    // Jumping
    if (keys.space && player.isGrounded) {
        player.dy = player.jumpForce;
        player.isGrounded = false;
    }

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw game elements
    drawGround();
    drawPlayer();

    requestAnimationFrame(update);
}

// Event listeners for input
document.addEventListener('keydown', (e) => {
    switch (e.code) {
        case 'ArrowLeft':
        case 'KeyA':
            keys.left = true;
            break;
        case 'ArrowRight':
        case 'KeyD':
            keys.right = true;
            break;
        case 'Space':
            keys.space = true;
            break;
    }
});

document.addEventListener('keyup', (e) => {
    switch (e.code) {
        case 'ArrowLeft':
        case 'KeyA':
            keys.left = false;
            break;
        case 'ArrowRight':
        case 'KeyD':
            keys.right = false;
            break;
        case 'Space':
            keys.space = false;
            break;
    }
});

// Start the game loop
update();