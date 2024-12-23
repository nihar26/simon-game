// Game variables
let sequence = [];
let playerSequence = [];
let gameActive = false;
let level = 0;

// Button elements
const redButton = document.getElementById("red-btn");
const greenButton = document.getElementById("green-btn");
const yellowButton = document.getElementById("yellow-btn");
const blueButton = document.getElementById("blue-btn");
const startButton = document.getElementById("start-btn");
const scoreDisplay = document.getElementById("score");

// Array of button elements for easy iteration
const buttons = [redButton, greenButton, yellowButton, blueButton];

// Game functions
const startGame = () => {
  sequence = [];
  playerSequence = [];
  level = 0;
  gameActive = true;
  nextLevel();
  startButton.disabled = true;
};

const nextLevel = () => {
  level++;
  playerSequence = [];
  scoreDisplay.textContent = `Level: ${level}`;
  const randomButton = buttons[Math.floor(Math.random() * buttons.length)];
  sequence.push(randomButton.id);
  showSequence();
};

const showSequence = () => {
  let i = 0;
  const interval = setInterval(() => {
    activateButton(sequence[i]);
    i++;
    if (i >= sequence.length) {
      clearInterval(interval);
      enableUserInput();
    }
  }, 1000);
};

const activateButton = (id) => {
  const button = document.getElementById(id);
  button.classList.add("active");
  setTimeout(() => {
    button.classList.remove("active");
  }, 500);
};

const enableUserInput = () => {
  buttons.forEach((button) => {
    button.disabled = false;
    button.addEventListener("click", handleUserInput);
  });
};

const disableUserInput = () => {
  buttons.forEach((button) => {
    button.disabled = true;
  });
};

const handleUserInput = (e) => {
  if (!gameActive) return;

  const clickedButton = e.target;
  playerSequence.push(clickedButton.id);
  activateButton(clickedButton.id);

  // Check the user's input
  if (
    playerSequence[playerSequence.length - 1] !==
    sequence[playerSequence.length - 1]
  ) {
    endGame();
  } else if (playerSequence.length === sequence.length) {
    disableUserInput();
    setTimeout(nextLevel, 1000);
  }
};

const endGame = () => {
  gameActive = false;
  scoreDisplay.textContent = `Game Over! Final Level: ${level}`;
  startButton.disabled = false;
};

// Event listener to start the game
startButton.addEventListener("click", startGame);
