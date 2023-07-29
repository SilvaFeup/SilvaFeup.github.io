export default class Player{


    rightPressed = false;
    leftPressed = false;
    shootPressed = false;

    constructor(canvas,velocity, bulletController){
        this.canvas = canvas;
        this.velocity = velocity;
        this.bulletController = bulletController;

        this.x = this.canvas.width/2;
        this.y = this.canvas.height - 30;

        this.width = 25;
        this.height = 24;

        this.image = new Image();
        this.image.src = "../images/player.png";

        document.addEventListener("keydown",this.keydown);
        document.addEventListener("keyup",this.keyup);


        // Find all buttons with class "arcade-button"
        const buttons = document.querySelectorAll('.arcade-button');

        // Add event listeners for button press events
        buttons.forEach(button => {
            button.addEventListener('mousedown', this.handleButtonPress);
            button.addEventListener('touchstart', this.handleButtonPress);
            button.addEventListener('mouseup', this.handleButtonRelease);
            button.addEventListener('touchend', this.handleButtonRelease);
            button.addEventListener('touchcancel', this.handleButtonRelease);
        });
 
        // Find the joystick element with class "arcade-joystick"
        const joystick = document.querySelector('.arcade-joystick');
 
        // Add event listener for joystick press event
        joystick.addEventListener('mousedown', this.handleJoystickPress);
        joystick.addEventListener('touchstart', this.handleJoystickPress);
        document.addEventListener('mouseup', this.handleJoystickRelease);
        document.addEventListener('touchend', this.handleJoystickRelease);
        document.addEventListener('touchcancel', this.handleJoystickRelease);
    }

    draw(ctx){

        if(this.shootPressed){
            this.bulletController.shoot(this.x+this.width/2, this.y,2,5);
        }
        this.move();
        this.collideWithWalls();
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height);
    }

    collideWithWalls(){
        //left
        if(this.x < 0){
            this.x = 0;
        }

        if(this.x > this.canvas.width - this.width){
            this.x = this.canvas.width - this.width;
        }
    }

    move(){

        if(this.rightPressed){

            this.x += this.velocity;

        }
        else if(this.leftPressed){
            this.x += -this.velocity;
        }
    }

    keydown = event => {
        if(event.code == 'ArrowRight'){
            this.rightPressed = true;
        }
        if(event.code == 'ArrowLeft'){
            this.leftPressed = true;
        }

        if(event.code == "Space"){
            this.shootPressed = true;
        }
    }

    keyup = event => {
        if(event.code == 'ArrowRight'){
            this.rightPressed = false;
        }
        if(event.code == 'ArrowLeft'){
            this.leftPressed = false;
        }
        if(event.code == "Space"){
            this.shootPressed = false;
        }
    }


    // Event handler for button press events
    handleButtonPress = event => {
        const button = event.target;
        if (button.classList.contains('red')) {
            this.leftPressed = true;
        } else if (button.classList.contains('blue')) {
            this.rightPressed = true;
        }
    }

    // Event handler for button release events
    handleButtonRelease = event => {
        this.leftPressed = false;
        this.rightPressed = false;
    }

    // Event handler for joystick press event
    handleJoystickPress = () => {
        this.shootPressed = true;
    }

    // Event handler for joystick release event
    handleJoystickRelease = () => {
        this.shootPressed = false;
    }
}