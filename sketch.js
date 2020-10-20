var ball,line1,line2,line3,line4,line5,line6,player,computer,goal1,goal2,ballImage;
gameState = "serve";
  
  var ch,die;
  var compScore = 0;
  var playScore = 0;
function preload(){
 ch = loadSound("checkPoint.mp3");
 die = loadSound("die.mp3");
 ballImage = loadImage("ball.png");
}

function setup() {
  ball = createSprite(200, 200, 15, 15);
  ball.shapeColor = "blue";
  ball.addImage(ballImage);
  ball.scale = 0.15;
  
  line1 = createSprite(200, 390, 380, 6);
  line1.shapeColor = "lightblue";
  
  line2 = createSprite(200, 10, 380, 6);
  line2.shapeColor = "lightblue";
  
  line3 = createSprite(10, 200, 6, 380);
  line3.shapeColor = "lightblue";
  
  line4 = createSprite(390, 200, 6, 380);
  line4.shapeColor = "lightblue";
  
   line5 = createSprite(200,150,380,6);
  line5.shapeColor = "lightblue";
  
  line6 = createSprite(200, 250, 380, 6);
  line6.shapeColor = "lightblue";
  
   player = createSprite(200, 350, 70, 10);
  player.shapeColor = "black";
  
  computer = createSprite(200, 50, 70, 10);
  computer.shapeColor = "black";
  
  goal1 = createSprite(200, 28,100,20);
  goal1.shapeColor = "yellow";
  
   goal2 = createSprite(200, 372, 100, 20);
  goal2.shapeColor = "yellow";
}

function draw() {
 background("orange");
  
  
  if(ball.isTouching(player) || ball.isTouching(computer)) {
    ch.play();
  }
  
  // computer score and player score
  textSize(20);
  text(playScore, 25, 225);
  text(compScore, 25, 190);
  
  createEdgeSprites();
  ball.bounceOff(line1);
  ball.bounceOff(line2);
  ball.bounceOff(line3);
  ball.bounceOff(line4);
  ball.bounceOff(player);
  ball.bounceOff(computer);
  
  // middle line
  for(var i = 12; i < 385; i=i+20) {
     line(i,200,i+10,200)
  }

  if(gameState === "serve") {
    text("press space to serve", 100, 180);
  }

  //press space key to play
  if(keyDown("space") && gameState === "serve") {
    serve();
    gameState = "play";
  }
  
  // when playScore = 5 and compScore  = 5 press r to restart,game over
  if(playScore === 5 || compScore  === 5) {
    gameState = "game over";
    text("GAME OVER!",150,180);
    text("press r to restart",140,240);
  }
  
  // when press 'r' restart game
  if(keyDown("r") && gameState === "game over") {
    gameState = "serve";
    compScore = 0;
    playScore = 0;
  }
  
  // computer follow ball
  computer.x = ball.x;
  
  if(ball.isTouching(goal1)) {
    ball.x = 200;
    ball.y = 200;
    ball.velocityX = 0;
    ball.velocityY = 0;
    gameState = "serve";
    playScore = playScore + 1;
    die.play();
  }
  
  if(ball.isTouching(goal2)) {
    ball.x = 200;
    ball.y = 200;
    ball.velocityX = 0;
    ball.velocityY = 0;
    gameState = "serve";
    compScore = compScore + 1;
    die.play();
  }
  
  // arrows to control player
  if(keyDown("up")) {
    if(player.y>260) {
      player.y = player.y-10;
    }
  }
  
  if(keyDown("down")) {
    if(player.y<380) {
      player.y = player.y+10;
    }
  }
  
  if(keyDown("left")) {
    if(player.x>50) {
      player.x = player.x-10;
    }
  }
  
  if(keyDown("right")) {
    if(player.x<350) {
      player.x = player.x+10;
    }
  }
 
  drawSprites();
  
}

function serve() {
  ball.velocityX = 5;
  ball.velocityY = 4;
}