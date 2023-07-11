import EnemyController from "./EnemyController.js";
import Player from "./Player.js";
import BulletController from "./BulletController.js";

// Get the elements from the HTML document
var playButton = document.querySelector(".option.play");
var projectsButton = document.querySelector(".option.projects");
var options = document.querySelector(".options");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const background = new Image();
background.src = "../images/space.png"



let isGameOver = false;
let didWin = false;

//BulletController

const playerBulletController = new BulletController(canvas,5, "red",true);
const enemyBulletController = new BulletController(canvas,4,'white',false);

//EnemyController

const enemyController = new EnemyController(canvas,
    enemyBulletController,
    playerBulletController
);

//Player

const player = new Player(canvas,3, playerBulletController);


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

    checkGameOver();
    ctx.drawImage(background,0,0,canvas.width,canvas.height);
    displayGameOver();
    if(!isGameOver && !didWin){
        enemyController.draw(ctx);
        player.draw(ctx);
        playerBulletController.draw(ctx);
        enemyBulletController.draw(ctx);
    }

}

function displayGameOver(){
    if(isGameOver || didWin){
        let text = didWin ? "You Win" : "GameOver";
        let textOffset = didWin ? 3.8 : 5.0;

        ctx.fillStyle = "white";
        ctx.font = "35px Arial";
        ctx.fillText(text, canvas.width/textOffset, canvas.height/2);
    }
}


function checkGameOver(){
    if(isGameOver){
        return;
    }

    if(enemyBulletController.collideWith(player)){
        isGameOver = true;
        return;
    }

    if(enemyController.collideWith(player)){
        isGameOver = true;
        return;
    }

    if(enemyController.enemyRows.length == 0){
        didWin = true;
    }

    return;
}


