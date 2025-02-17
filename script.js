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

// Start the game
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

// Restart the game
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

// Function to create and animate a falling word
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

// Listen for form submission and validate the typed word when Enter is pressed
form.addEventListener('submit', (event) => {
  event.preventDefault();  // Prevent page reload on form submission

  const typedWord = inputField.value.trim().toLowerCase();
  if (!typedWord) {
    // If input is empty, show validation message (optional)
    inputField.setCustomValidity('Please type a word');
    inputField.reportValidity();
    return;
  }

  // Check if typed word matches the falling word
  if (currentWordElement && typedWord === currentWordElement.textContent.trim().toLowerCase()) {
    console.log("✅ Correct word typed:", typedWord);

    score++;
    scoreDisplay.textContent = `Score: ${score}`;
    clearInterval(fallInterval);
    currentWordElement.remove(); // Remove the correct word
    currentWordElement = null;
    inputField.value = ''; // Clear input field
    FallingWord(); // Start next word
  } else {
    console.log("❌ Incorrect word typed:", typedWord);
    
    // If the word is incorrect, just remove it after "Enter" is pressed
    if (currentWordElement) {
      currentWordElement.remove(); // Remove the falling word immediately
      currentWordElement = null;
    }

    // End the game after incorrect word
    endGame();
  }
});

// Optional: Add an event listener for input field focus to reset custom validation on each input change
inputField.addEventListener('input', () => {
  inputField.setCustomValidity(''); // Reset custom validity when the user types
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
