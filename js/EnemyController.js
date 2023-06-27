import Enemy from "./Enemy.js";
export default class EnemyController{

    enemyMap = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [2, 2, 2, 3, 3, 3, 3, 2, 2, 2],
        [2, 2, 2, 3, 3, 3, 3, 2, 2, 2],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
    ];

    enemyRows = [];

    constructor(canvas) {

        this.canvas = canvas;
        this.createEnemies();
        
    }

    draw(ctx){
        this.drawEnemies(ctx);
    }

    drawEnemies(ctx){
        this.enemyRows.flat().forEach((enemy)=>{
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