// Papan permainan
const gameBoard = document.getElementById('game-board');
const statusDisplay = document.getElementById('status');
const boardSize = 10;
let pacmanPosition = { x: 0, y: 0 };
let coinsCollected = 0;

// Layout papan (0 = jalan, 1 = rintangan, 2 = koin)
const layout = [
  [0, 0, 0, 0, 1, 0, 2, 0, 0, 0],
  [0, 1, 1, 0, 1, 0, 1, 1, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
  [1, 1, 1, 1, 0, 1, 1, 0, 1, 0],
  [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
  [0, 2, 0, 1, 1, 0, 1, 1, 1, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 0, 1, 1, 0, 1, 0],
  [0, 2, 0, 0, 0, 0, 0, 0, 1, 0],
  [0, 0, 0, 1, 1, 1, 0, 2, 0, 0]
];

// Membuat papan permainan
function createBoard() {
    gameBoard.innerHTML = '';
    layout.forEach((row, y) => {
        row.forEach((cell, x) => {
            const div = document.createElement('div');
            div.classList.add('cell');
            if (cell === 1) {
                div.classList.add('obstacle');
            } else if (cell === 2) {
                const coin = document.createElement('div');
                coin.classList.add('coin');
                div.appendChild(coin);
            }
            gameBoard.appendChild(div);
        });
    });
}

function drawPacman() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => cell.classList.remove('pacman'));

    const pacmanIndex = pacmanPosition.y * boardSize + pacmanPosition.x;
    cells[pacmanIndex].classList.add('pacman');
}

// Mengecek jika Pacman dapat bergerak ke posisi baru
function canMoveTo(x, y) {
    if (x < 0 || y < 0 || x >= boardSize || y >= boardSize) return false;
    return layout[y][x] !== 1; // Tidak bisa bergerak ke obstacle
}

// Mengecek jika Pacman berada di atas koin
function collectCoin() {
    if (layout[pacmanPosition.y][pacmanPosition.x] === 2) {
        layout[pacmanPosition.y][pacmanPosition.x] = 0;
        coinsCollected++;
        statusDisplay.textContent = `Coins Collected: ${coinsCollected}`;
        createBoard(); // Gambar ulang papan untuk menghilangkan koin
    }
}

// Mengecek jika semua koin sudah dikumpulkan
function checkWin() {
    if (coinsCollected === 4) { // Total ada 4 koin di papan
        alert('Congratulations! You collected all the coins!');
    }
}

// Fungsi untuk memindahkan Pacman
function movePacman(event) {
    let newX = pacmanPosition.x;
    let newY = pacmanPosition.y;

    switch (event.key) {
        case 'ArrowUp':
            newY--;
            break;
        case 'ArrowDown':
            newY++;
            break;
        case 'ArrowLeft':
            newX--;
            break;
        case 'ArrowRight':
            newX++;
            break;
    }

    if (canMoveTo(newX, newY)) {
        pacmanPosition.x = newX;
        pacmanPosition.y = newY;
        collectCoin();
        checkWin();
        drawPacman();
    }
}

// Gambar papan pertama kali dan pasang event listener
createBoard();
drawPacman();
document.addEventListener('keydown', movePacman);
