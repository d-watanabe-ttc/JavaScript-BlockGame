class ballHandler{
    constructor(x, y, dx, dy, ballRadius){
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.ballRadius = ballRadius 
    }

    drawBall(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.ballRadius, 0, Math.PI*2);
        // ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();  
    }

    moveball(){
        this.x += this.dx;
        this.y += this.dy; 
    }
    
}