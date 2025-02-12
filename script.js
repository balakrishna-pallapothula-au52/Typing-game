import words from "./words.js";

// Initializing variables
const form = document.getElementById('typing-form');
const typedWord = document.getElementById('typed-word');
const wordDisplay = document.getElementById('game-container');
const inputField = document.getElementById('typed-word');
const startButton = document.getElementById('start-game');
const restartButton = document.getElementById('restart-game');
const gameOverScreen = document.getElementById('game-over');
const finalScoreDisplay = document.getElementById('final-score');
const scoreDisplay = document.getElementById('score');

// Game state variables
let score = 0;
let gameRunning = false;
let currentWordElement = null;
let fallInterval = null; // clear it when the game ends

// Form Validation (Bootstrap)
form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (form.checkValidity()) {
    processTypedWord();
  } else {
    typedWord.classList.add('is-invalid');
  }
  form.classList.add('was-validated');
});

// Start the game
startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', restartGame);

function startGame() {
  score = 0;
  gameRunning = true;
  gameOverScreen.style.display = 'none';
  scoreDisplay.textContent = `Score: ${score}`;
  startButton.style.display = 'none';
  restartButton.style.display = 'none'; // Hide restart button initially
  inputField.disabled = false;
  fallingWord();
}

function restartGame() {
  score = 0;
  gameRunning = true;
  scoreDisplay.textContent = `Score: ${score}`;
  gameOverScreen.style.display = 'none';
  restartButton.style.display = 'none'; // Hide restart button until game ends
  startButton.style.display = 'none';  // Keep start button hidden during game
  inputField.disabled = false;
  inputField.value = "";
  wordDisplay.innerHTML = ''; // Clear the word display
  fallingWord();
}

// falling words from top
function fallingWord() {
  // const words = ['hello', 'world', 'javascript', 'bootstrap', 'coding'];
  const word = words[Math.floor(Math.random() * words.length)];
  currentWordElement = document.createElement('div');
  currentWordElement.classList.add('falling-word');
  currentWordElement.textContent = word;
  wordDisplay.appendChild(currentWordElement);

  let wordPosition = 0;
  const wordSpeed = 2;

  // Word falling animation
  fallInterval = setInterval(() => {
    if (gameRunning) {
      wordPosition += wordSpeed;
      currentWordElement.style.top = `${wordPosition}px`;

      if (wordPosition > window.innerHeight - currentWordElement.offsetHeight) {
        clearInterval(fallInterval);
        endGame();
      }
    }
  }, 50);

  // Check for user input and compare typed word
  inputField.addEventListener('input', () => {
    if (inputField.value.toLowerCase() === word.toLowerCase()) {
      score++;
      scoreDisplay.textContent = `Score: ${score}`;
      clearInterval(fallInterval); // Clear falling word 
      currentWordElement.remove(); // Remove word after typing
      inputField.value = ''; // Clear input field
      fallingWord(); // falling the next word
    }
  });
}

// End the game
function endGame() {
  gameRunning = false;
  gameOverScreen.style.display = 'block';
  finalScoreDisplay.textContent = score;
  inputField.disabled = true;
  restartButton.style.display = 'inline-block'; // Show restart button
  startButton.style.display = 'none'; // Hide start button after game ends
}



