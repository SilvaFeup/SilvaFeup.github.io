import Enemy from "./Enemy.js";
import MovingDirection from "./MovingDirection.js";


export default class EnemyController{

    enemyMap = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [2, 2, 2, 3, 3, 3, 3, 2, 2, 2],
        [2, 2, 2, 3, 3, 3, 3, 2, 2, 2],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];

    enemyRows = [];

    currentDirection = MovingDirection.right;
    xVelocity = 0;
    yVelocity = 0;
    
    defaultXVelocity = 0.5;
    defaultYVelocity = 0.5;

    moveDownTimerDefault = 20;
    moveDownTimer = this.moveDownTimerDefault;

    fireBulletTimerDefault = 100;
    fireBulletTimer = this.fireBulletTimerDefault;

    constructor(canvas, enemyBulletController, playerBulletController) {

        this.canvas = canvas;
        this.enemyBulletController = enemyBulletController;
        this.playerBulletController = playerBulletController;
        this.createEnemies();

        this.enemyDeathSound = new Audio("../sounds/enemy-death.wav");
        this.enemyDeathSound.volume = 0.5;
        
    }

    draw(ctx){

        this.decrementMoveDownTimer();
        this.updateVelocityAndDirection();
        this.collisionDetection();
        this.drawEnemies(ctx);
        this.resetMoveDownTimer();
        this.fireBullet()

    }

    collisionDetection(){
        this.enemyRows.forEach(enemyRow=>{
            enemyRow.forEach((enemy,enemyIndex)=>{
               if(this.playerBulletController.collideWith(enemy)){
                //play death sound
                //remove enemy
                this.enemyDeathSound.currentTime = 0;
                this.enemyDeathSound.play();
                enemyRow.splice(enemyIndex,1);
               } 
            })
        });

        this.enemyRows = this.enemyRows.filter(enemyRow=> enemyRow.length>0);
    }

    collideWith(sprite){
        return this.enemyRows.flat().some(enemy=>enemy.collideWith(sprite));
    }

    resetMoveDownTimer(){
        if( this.moveDownTimer <= 0){
            this.moveDownTimer = this.moveDownTimerDefault;
        }
    }

    fireBullet(){
        this.fireBulletTimer--;
        if(this.fireBulletTimer <=0){
            this.fireBulletTimer = this.fireBulletTimerDefault;
            const allEnemies = this.enemyRows.flat();
            const enemyIndex = Math.floor(Math.random() * allEnemies.length);

            const enemy = allEnemies[enemyIndex];
            this.enemyBulletController.shoot(enemy.x,enemy.y,-1.5);
        }
    }

    decrementMoveDownTimer(){
        if(this.currentDirection == MovingDirection.downLeft || 
            this.currentDirection == MovingDirection.downRight){

                this.moveDownTimer--;

        }
    }

    updateVelocityAndDirection(){

        for(const enemyRow of this.enemyRows){
            if(this.currentDirection == MovingDirection.right){
                this.updateVelocity(this.defaultXVelocity,0);

                if(this.switchDirection(true,enemyRow[enemyRow.length - 1])){
                    break;
                }
            }

            else if(this.currentDirection == MovingDirection.downLeft){

                if(this.moveDown(MovingDirection.left)){
                    break;
                }
            }

            else if(this.currentDirection == MovingDirection.left){

                this.updateVelocity(-this.defaultXVelocity,0);

                if(this.switchDirection(false,enemyRow[0])){
                    break;
                }
            }

            else if(this.currentDirection == MovingDirection.downRight){

                if(this.moveDown(MovingDirection.right)){
                    break;
                }
            }

            
        }
    }

    updateVelocity(xVelocity,yVelocity){

        this.xVelocity = xVelocity;
        this.yVelocity = yVelocity;
    }

    switchDirection(toLeft, LimitEnemy){

        if(toLeft){

            if(LimitEnemy.x + LimitEnemy.width >= this.canvas.width){
                this.currentDirection = MovingDirection.downLeft;
                return true;
            }
        }
        else{
            if(LimitEnemy.x <= 0){
                this.currentDirection = MovingDirection.downRight;
                return true;
            }
        }

        return false;
    }

    moveDown(newDirection){

        this.xVelocity = 0;
        this.yVelocity = this.defaultYVelocity;

        if(this.moveDownTimer <= 0){
            this.currentDirection = newDirection;
            return true;
        }

        return false;
    }

    drawEnemies(ctx){
        this.enemyRows.flat().forEach((enemy)=>{
            enemy.move(this.xVelocity,this.yVelocity);
            enemy.draw(ctx);
        })
    }


    createEnemies(){

        this.enemyMap.forEach((row,rowIndex)=>{
            this.enemyRows[rowIndex] = [];
            row.forEach((enemyNumber,enemyIndex)=>{
                if(enemyNumber > 0){
                    this.enemyRows[rowIndex].push(new Enemy(enemyIndex*20, rowIndex*10.5,enemyNumber));
                }
            })
        } )

    }
}