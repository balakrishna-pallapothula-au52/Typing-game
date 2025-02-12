import words from "./words.js";

// Initializing variables
const form = document.getElementById('typing-form');
const inputField = document.getElementById('typed-word');
const wordDisplay = document.getElementById('game-container');
const startButton = document.getElementById('start-game');
const restartButton = document.getElementById('restart-game');
const gameOverScreen = document.getElementById('game-over');
const finalScoreDisplay = document.getElementById('final-score');
const scoreDisplay = document.getElementById('score');

// Game state variables
let score = 0;
let gameRunning = false;
let currentWordElement = null;
let fallInterval = null;

// Start and Restart Buttons
startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', restartGame);

function startGame() {
  score = 0;
  gameRunning = true;
  gameOverScreen.style.display = 'none';
  scoreDisplay.textContent = `Score: ${score}`;
  startButton.style.display = 'none';
  restartButton.style.display = 'none';
  inputField.disabled = false;
  inputField.value = '';
  inputField.focus();
  FallingWord();
}

function restartGame() {
  score = 0;
  gameRunning = true;
  scoreDisplay.textContent = `Score: ${score}`;
  gameOverScreen.style.display = 'none';
  restartButton.style.display = 'none';
  startButton.style.display = 'none';
  inputField.disabled = false;
  inputField.value = "";
  wordDisplay.innerHTML = ''; // Clear word display
  inputField.focus();
  FallingWord();
}

// Function to  a falling word
function FallingWord() {
  if (!gameRunning) return;

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
}

//validate user input with the falling word
inputField.addEventListener('input', () => {
  if (!currentWordElement) return; // No word on screen

  const typedWord = inputField.value.trim().toLowerCase();
  const expectedWord = currentWordElement.textContent.trim().toLowerCase();

  console.log("Typed:", typedWord, "| Expected:", expectedWord);

  if (typedWord === expectedWord) {
    console.log("✅ Correct word typed:", expectedWord);

    score++;
    scoreDisplay.textContent = `Score: ${score}`;
    clearInterval(fallInterval);
    currentWordElement.remove(); // Remove the correct word
    currentWordElement = null;
    inputField.value = ''; // Clear input field
    FallingWord(); // Start next word
  }
});

// End the game
function endGame() {
  gameRunning = false;
  gameOverScreen.style.display = 'block';
  finalScoreDisplay.textContent = score;
  inputField.disabled = true;
  restartButton.style.display = 'inline-block';
  startButton.style.display = 'none';
}
