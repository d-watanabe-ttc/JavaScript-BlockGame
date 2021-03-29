//Canvasの取得
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

ctx.beginPath();
ctx.rect(20, 40, 50, 50); //x座標 y座標 width height

var ball = new ballHandler(canvas.width/2, canvas.height-30, 2, 2, 10);
console.log(ball);

var paddle = new paddleHandler(10, 75, (canvas.width-75)/2);

//ボールの座標
// var x = canvas.width/2;
// var y = canvas.height-30;
// var dx = 2;
// var dy = -2;
// var ballRadius = 10;

//パドル用の変数
// var paddleHeight = 10;
// var paddleWidth = 75;
// var paddleX = (canvas.width-paddleWidth)/2;

//スコア
var score = 0;
//ライフ
var lives = 3;

//ブロック変数
var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

var bricks = [];
for(var c=0; c<brickColumnCount; c++){
    bricks[c] = [];
    for(var r=0; r<brickRowCount; r++){
        bricks[c][r] = {x: 0, y: 0, status: 1};
    }
}

//ボールの描写
// function drawBall(){
//     ctx.beginPath();
//     ctx.arc(x, y, ballRadius, 0, Math.PI*2);
//     // ctx.fillStyle = "#0095DD";
//     ctx.fill();
//     ctx.closePath();  
// }

//パドル（下の棒）の描写
// function drawPaddle() {
//     ctx.beginPath();
//     ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
//     // ctx.fillStyle = "#0095DD";
//     ctx.fill();
//     ctx.closePath();
// }

//ブロックの描写
function drawBricks(){
    for(var c=0; c<brickColumnCount; c++){
        for(var r=0; r<brickRowCount; r++){
            if(bricks[c][r].status == 1){
                var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
                var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fill();
                ctx.closePath();                   
            }
        }
    }
}

function drawLives() {
    ctx.font = "16px Arial";
    // ctx.fillStyle = "#0095DD";
    ctx.fillText("Lives: "+lives, canvas.width-65, 20);
}

//描画コード
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    ball.drawBall();
    paddle.drawPaddle();
    drawScore();
    drawLives();
    collsionDetection();

    //反射用の条件文
    if(ball.x + ball.dx > canvas.width-ball.ballRadius || ball.x + ball.dx < ball.ballRadius){
        ball.dx = -ball.dx;
        getRandomColor();
    }
    if(ball.y + ball.dy < ball.ballRadius){
        ball.dy = -ball.dy;
        getRandomColor();
    }
    //パドルの反射とゲームオーバーの条件式
    else if(ball.y + ball.dy > canvas.height-ball.ballRadius){
        if(ball.x > paddle.paddleX && ball.x < paddle.paddleX + paddle.paddleWidth){
            // dx *= 1.1;
            // dy *= 1.1;
            rapidBall();
            ball.dy = -ball.dy;
            // score = score + 5;
        }           
        else{
            lives--;
            if(!lives) {
                alert("GAME OVER");
                document.location.reload();
            }
            else {
                ball.x = canvas.width/2;
                ball.y = canvas.height-30;
                ball.dx = 2;
                ball.dy = -2;
                ball.paddleX = (canvas.width-paddle.paddleWidth)/2;
            }
        }
    }

    //パドルの移動速度の変更
    if(rightPressed && paddle.paddleX < canvas.width-paddle.paddleWidth){
        paddle.paddleX += 7
    }
    else if(leftPressed && paddle.paddleX > 0){
        paddle.paddleX -= 7;
    }

    //ボールの描画位置を変える
    // x += dx;
    // y += dy; 
    ball.moveball();
} 

//色ランダム変換関数　第三章練習問題
function getRandomColor(){
    ctx.fillStyle = "rgb(" + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + ")";
} 


//マウスの入力イベント（未実装）
// document.addEventListener("mousemove", mouseMoveHandler, false);

// function mouseMoveHandler(e){
//     var relativeX = e.clientX - canvas.offsetLeft;
//     if(relativeX > 0 && relativeX < canvas.width){
//         paddleX = relativeX - paddleWidth/2;
//     }
// }

//ブロックにボールがぶつかったときの処理
function collsionDetection(){
    for(var c = 0; c<brickColumnCount; c++){
        for(var r = 0; r<brickRowCount; r++){
            var b = bricks[c][r];
            if(b.status == 1){
                if(ball.x > b.x && ball.x < b.x + brickWidth && ball.y > b.y && ball.y < b.y + brickHeight){
                    getRandomColor();
                    // dx *= 1.1;
                    // dy *= 1.1;
                    ball.dy = -ball.dy;
                    b.status = 0;
                    score++;
                    if(score == brickRowCount*brickColumnCount){
                        alert("おめでとう！君のスコアは" + score +"だ！");
                        document.location.reload();
                    }
                } 
            }
        }
    }
}

function drawScore() {
    ctx.font = "16px Ariel";
    // ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: "+score, 8, 20);
}

//ボールを早くする
function rapidBall(){
    ball.dx *= 1.1;
    ball.dy *= 1.1;
}

//10ミリ秒ごとにdraw関数を実行する
var interval = setInterval(draw, 10); 