const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Game State
let unlockedLevels = 1; // Default starting level
const totalLevels = 10; // Total levels available
const menu = document.getElementById("menu");
const levelsContainer = document.getElementById("levels");
const saveCodeInput = document.getElementById("saveCodeInput");

// Initialize the game for the selected level
function startLevel(level) {
    console.log(`Starting Level ${level}`);
    menu.style.display = "none";
    canvas.style.display = "block";
    initializeGame(level);
}

// Display levels in the menu
function updateLevelSelection() {
    levelsContainer.innerHTML = "";
    for (let i = 1; i <= totalLevels; i++) {
        const levelButton = document.createElement("button");
        levelButton.textContent = `Level ${i}`;
        levelButton.disabled = i > unlockedLevels; // Lock levels beyond current progress
        levelButton.addEventListener("click", () => startLevel(i));
        levelsContainer.appendChild(levelButton);
    }
    document.getElementById("levelSelect").style.display = "block";
}

// Generate a 7-character save code
function generateSaveCode(level) {
    return (Math.random().toString(36).substr(2, 6) + level).toUpperCase();
}

// Decode and unlock levels from a save code
function unlockLevels(code) {
    if (code && code.length >= 7) {
        const level = parseInt(code.slice(-1), 10); // Last digit of code represents level
        if (!isNaN(level) && level >= 1 && level <= totalLevels) {
            unlockedLevels = Math.max(unlockedLevels, level);
            updateLevelSelection();
        }
    }
}

// Save progress to local storage
function saveProgressToLocal() {
    localStorage.setItem("unlockedLevels", unlockedLevels);
}

// Load progress from local storage
function loadProgressFromLocal() {
    const savedLevels = parseInt(localStorage.getItem("unlockedLevels"), 10);
    if (!isNaN(savedLevels)) {
        unlockedLevels = savedLevels;
    }
}

// Event Listeners
document.getElementById("startGame").addEventListener("click", updateLevelSelection);
document.getElementById("loadProgress").addEventListener("click", () => {
    const code = saveCodeInput.value.trim();
    unlockLevels(code);
});

// Example: Complete a level
function completeLevel(level) {
    if (level >= unlockedLevels) {
        unlockedLevels = level + 1;
    }
    const saveCode = generateSaveCode(unlockedLevels);
    alert(`Your Save Code: ${saveCode}`);
    saveProgressToLocal();
    menu.style.display = "block";
    canvas.style.display = "none";
    updateLevelSelection();
}

// Simple game logic placeholder
function initializeGame(level) {
    let ball = { x: 400, y: 50, radius: 10, dx: 2, dy: 2 };
    const pegs = [{ x: 200, y: 200, radius: 10 }, { x: 400, y: 300, radius: 10 }];

    function drawBall() {
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fillStyle = "red";
        ctx.fill();
        ctx.closePath();
    }

    function drawPegs() {
        pegs.forEach(peg => {
            ctx.beginPath();
            ctx.arc(peg.x, peg.y, peg.radius, 0, Math.PI * 2);
            ctx.fillStyle = "orange";
            ctx.fill();
            ctx.closePath();
        });
    }

    function updateBall() {
        ball.dy += 0.1; // Gravity
        ball.x += ball.dx;
        ball.y += ball.dy;

        // Bounce off walls
        if (ball.x < ball.radius || ball.x > canvas.width - ball.radius) ball.dx *= -1;
        if (ball.y > canvas.height - ball.radius) ball.dy *= -0.8; // Reduce speed after bounce
    }

    function checkCollision(ball, peg) {
        const dist = Math.sqrt((ball.x - peg.x) ** 2 + (ball.y - peg.y) ** 2);
        return dist < ball.radius + peg.radius;
    }

    function gameLoop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawPegs();
        drawBall();
        updateBall();

        pegs.forEach((peg, index) => {
            if (checkCollision(ball, peg)) {
                pegs.splice(index, 1); // Remove peg on collision
            }
        });

        if (pegs.length === 0) {
            alert(`Level ${level} Complete!`);
            completeLevel(level);
            return;
        }

        requestAnimationFrame(gameLoop);
    }

    gameLoop();
}

// Load progress on page load
window.onload = () => {
    loadProgressFromLocal();
    updateLevelSelection();
};

// Save progress before closing the page
window.onbeforeunload = saveProgressToLocal;
