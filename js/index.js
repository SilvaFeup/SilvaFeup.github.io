import EnemyController from "./EnemyController.js";

// Get the elements from the HTML document
var playButton = document.querySelector(".option.play");
var projectsButton = document.querySelector(".option.projects");
var options = document.querySelector(".options");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const background = new Image();
background.src = "../images/space.png"


//EnemyController

const enemyController = new EnemyController(canvas);

// Hide the canvas element by default
canvas.style.display = "none";

// Add a click event listener to the play button
playButton.addEventListener("click", function() {
    // Hide the options section
    options.style.display = "none";
    // Show the canvas element
    canvas.style.display = "block";
    // Start the game function 
    setInterval(game, 1000/60);
})

function game(){
    ctx.drawImage(background,0,0,canvas.width,canvas.height);
    enemyController.draw(ctx);
}


