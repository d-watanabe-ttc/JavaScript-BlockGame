class paddleHandler{
    constructor(paddleHeight, paddleWidth, paddleX){

    this.paddleHeight = paddleHeight;
    this.paddleWidth = paddleWidth;
    this.paddleX = paddleX;
    }
    
    drawPaddle() {
        ctx.beginPath();
        ctx.rect(this.paddleX, canvas.height-this.paddleHeight, this.paddleWidth, this.paddleHeight);
        // ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }
}