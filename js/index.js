import EnemyController from "./EnemyController.js";
import Player from "./Player.js";
import BulletController from "./BulletController.js";

//about-me section

const slides = document.querySelectorAll(".slide");
const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");
const dots = document.querySelectorAll(".dot");

let currentSlide = 0;

// Show initial slide
showSlide(currentSlide);

// Function to show a specific slide
function showSlide(index) {
  // Hide all slides
  slides.forEach((slide) => slide.classList.remove("current"));
  // Remove active class from all dots
  dots.forEach((dot) => dot.classList.remove("active"));

  // Show the selected slide
  slides[index].classList.add("current");
  // Add active class to the current dot
  dots[index].classList.add("active");
}

// Next button event listener
nextButton.addEventListener("click", () => {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
});

// Previous button event listener
prevButton.addEventListener("click", () => {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
});

// Dot click event listener
dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    currentSlide = index;
    showSlide(currentSlide);
  });
});

//

// Get the elements from the HTML document
var playButton = document.querySelector(".option.play");
var projectsButton = document.querySelector(".option.projects");
var options = document.querySelector(".options");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const background = new Image();
background.src = "../images/space.png";

let isGameOver = false;
let didWin = false;
let gameOverTimer = null; // Timer to remove canvas and show options after Game Over
let gameInterval = null; // Store the interval ID

// BulletController
const playerBulletController = new BulletController(canvas, 5, "red", true);
const enemyBulletController = new BulletController(canvas, 4, "white", false);

// EnemyController
const enemyController = new EnemyController(
  canvas,
  enemyBulletController,
  playerBulletController
);

// Player
const player = new Player(canvas, 3, playerBulletController);

// Hide the canvas element by default
canvas.style.display = "none";

// Add a click event listener to the play button
playButton.addEventListener("click", function () {
  // Clear any existing interval to avoid speeding up the game
  if (gameInterval) {
    clearInterval(gameInterval);
  }

  // Hide the options section
  options.style.display = "none";
  // Show the canvas element
  canvas.style.display = "block";

  // Reset game state
  isGameOver = false;
  didWin = false;
  gameOverTimer = null; // Reset timer

  // Start the game function
  gameInterval = setInterval(game, 1000 / 60);
});

function game() {
  checkGameOver();
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  displayGameOver();
  if (!isGameOver && !didWin) {
    enemyController.draw(ctx);
    player.draw(ctx);
    playerBulletController.draw(ctx);
    enemyBulletController.draw(ctx);
  }
}

function displayGameOver() {
  if (isGameOver || didWin) {
    let text = didWin ? "You Win" : "Game Over";

    // Set text alignment to center both horizontally and vertically
    ctx.fillStyle = "white";
    ctx.font = "35px Arial";
    ctx.textAlign = "center"; // Center horizontally
    ctx.textBaseline = "middle"; // Center vertically

    // Draw the game over or win message
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);

    // Start the game over countdown
    if (!gameOverTimer) {
      gameOverTimer = 3; // 3 seconds countdown
    }

    // Set smaller font for the countdown message
    ctx.font = "20px Arial";
    ctx.fillText(
      `Returning to menu in ${gameOverTimer.toFixed(1)}s`,
      canvas.width / 2,
      canvas.height / 2 + 40
    );

    // Decrease the timer
    gameOverTimer -= 1 / 60; // Decrement with each frame (60fps)

    // If the timer reaches 0, hide the canvas and show options
    if (gameOverTimer <= 0) {
      canvas.style.display = "none"; // Hide canvas
      options.style.display = "flex"; // Show options
    }
  }
}

function checkGameOver() {
  if (isGameOver) {
    return;
  }

  if (enemyBulletController.collideWith(player)) {
    isGameOver = true;
    return;
  }

  if (enemyController.collideWith(player)) {
    isGameOver = true;
    return;
  }

  if (enemyController.enemyRows.length == 0) {
    didWin = true;
  }

  return;
}
