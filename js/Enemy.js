export default class Enemy {
    constructor (x,y,imageNumber){
        this.x = x;
        this.y = y;
        this.image = new Image();
        this.width = 16;
        this.height =6;

        this.image.src = `../images/enemy${imageNumber}.png`;
    }

    draw(ctx){
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height);
    }
}