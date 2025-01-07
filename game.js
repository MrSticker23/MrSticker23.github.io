const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Example: Draw the pegs
function drawPeg(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI * 2);
    ctx.fillStyle = "orange";
    ctx.fill();
    ctx.closePath();
}

// Example: Game Loop
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw pegs
    drawPeg(100, 100);
    drawPeg(200, 150);
    drawPeg(300, 200);

    requestAnimationFrame(gameLoop);
}

gameLoop();
