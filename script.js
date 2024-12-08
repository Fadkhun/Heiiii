const character = document.getElementById('character');
const box = document.getElementById('box');
const music = document.getElementById('music');
const controls = {
    left: document.getElementById('left'),
    up: document.getElementById('up'),
    down: document.getElementById('down'),
    right: document.getElementById('right')
};

let page = 1; // Current page (1 or 2)
let charX = window.innerWidth / 2 - 40; // Character position
let charY = window.innerHeight / 2 - 40;

// Update character position
function updatePosition() {
    character.style.left = `${charX}px`;
    character.style.top = `${charY}px`;
}

// Switch pages when touching the screen edges
function checkEdges() {
    if (charX <= 0 || charX + 80 >= window.innerWidth || charY <= 0 || charY + 80 >= window.innerHeight) {
        page = page === 1 ? 2 : 1;
        updatePage();
    }
}

// Update the game view based on the current page
function updatePage() {
    if (page === 1) {
        box.style.display = 'none';
        music.pause();
        clearRain();
    } else {
        box.style.display = 'block';
    }
    charX = window.innerWidth / 2 - 40;
    charY = window.innerHeight / 2 - 40;
    updatePosition();
}

// Move character
function moveCharacter(direction) {
    const step = 20;
    if (direction === 'left') charX -= step;
    if (direction === 'right') charX += step;
    if (direction === 'up') charY -= step;
    if (direction === 'down') charY += step;
    updatePosition();
    checkEdges();
}

// Event listeners for controls
controls.left.addEventListener('click', () => moveCharacter('left'));
controls.up.addEventListener('click', () => moveCharacter('up'));
controls.down.addEventListener('click', () => moveCharacter('down'));
controls.right.addEventListener('click', () => moveCharacter('right'));

// Event listener for box click
box.addEventListener('click', () => {
    box.style.transition = 'all 1s';
    box.style.transform = 'translateY(-200px)';
    setTimeout(() => {
        box.style.display = 'none';
        music.play();
        startRain(); // Start rain effect
    }, 1000);
});

// Rain effect
function startRain() {
    clearRain(); // Clear any existing rain
    setInterval(() => {
        const rainDrop = document.createElement('img');
        const randomSize = Math.random() * 140 + 100; // Random size (120px to 240px)
        const randomSpeed = Math.random() * 10 + 5; // Random speed (5s to 15s)
        const randomImage = Math.floor(Math.random() * 27) + 1; // Random image 1.png - 27.png
        rainDrop.src = `${randomImage}.png`;
        rainDrop.style.position = 'absolute';
        rainDrop.style.width = `${randomSize}px`;
        rainDrop.style.height = `${randomSize}px`;
        rainDrop.style.left = `${Math.random() * window.innerWidth}px`;
        rainDrop.style.top = `-100px`;
        rainDrop.style.transition = `top ${randomSpeed}s linear`;
        rainDrop.classList.add('rain-drop');
        document.body.appendChild(rainDrop);

        // Start animation
        setTimeout(() => {
            rainDrop.style.top = `${window.innerHeight + 100}px`;
        }, 100);

        // Remove rain drop after animation
        setTimeout(() => {
            rainDrop.remove();
        }, randomSpeed * 1000 + 100);
    }, 300); // New raindrop every 300ms
}

// Clear existing rain drops
function clearRain() {
    const rainDrops = document.querySelectorAll('.rain-drop');
    rainDrops.forEach(drop => drop.remove());
}

// Initialize the game
updatePage();
