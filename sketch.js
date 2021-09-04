var sharky, sharkImgUp, sharkImgDown, sharkImgLeft, sharkImgRight;
var bg1, bg2, bg3;
var start = 0;
var play = 1;
var end = 2;
var gameState = 0;
var medalCollected=0;
var win = 0, lose = 0, lost = 0;
var form;
var timer=1;
var m1, ml1, m2, ml2, m3, ml3, m4, ml4, mlg, l1 = 0, l2 = 0, l3 = 0, l4 = 0;
var obstacle, obs1, obs2, obs3, obs4, obstacleG;
var edges, winAnimation, chest, c1, c3;
var hi;

function preload(){
    sharkImgUp = loadImage("image/SHARK-UP.png");
    sharkImgDown = loadImage("image/SHARK-DOWN.png");
    sharkImgLeft = loadImage("image/SHARK-LEFT.png");
    sharkImgRight = loadImage("image/SHARK-RIGHT.png");
    bg1 = loadImage("image/BACKGROUND-STORY.jpg");
    bg2 = loadImage("image/Background.jpg");
    bg3 = loadImage("image/bg3.jpg");
    m1 = loadImage("image/medal1.png");
    m2 = loadImage("image/medal2.png");
    m3 = loadImage("image/medal3.png");
    m4 = loadImage("image/medal4.png");
    obs1 = loadImage("image/anker.png");
    obs2 = loadImage("image/obstacle.png");
    c1 = loadImage("image/win1.png")
    c3 = loadImage("image/win3.png")
   // winAnimation = loadAnimation("image/win1.png","image/win2.png","image/win3.png");

}

function setup(){
    createCanvas(displayWidth, displayHeight);
    obstacleG= new Group();
    mlg=new Group();
    shark=createSprite(displayWidth/2, displayHeight/2, 100, 100);
    shark.addImage(sharkImgRight);
    shark.scale=0.5;
    shark.visible=false
    ml1=createSprite(100, 100, 10, 10);
    ml1.addImage(m1);
    ml1.scale=1.2;
    ml1.visible=false;
    ml2=createSprite(100, 700, 10, 10);
    ml2.addImage(m2);
    ml2.scale=1.2;
    ml2.visible=false;
    ml3=createSprite(1200, 100, 10, 10);
    ml3.addImage(m3);
    ml3.scale=1.2;
    ml3.visible=false;
    ml4=createSprite(1200, 700, 10, 10);
    ml4.addImage(m4);
    ml4.scale=1.2;
    ml4.visible=false;
    mlg.add(ml1,ml2, ml3, ml4);
    chest = createSprite(displayWidth/2, displayHeight/2-100, 100, 100);
    chest.addImage(c1);
    chest.scale=1.5;
    chest.visible=false;
    edges = createEdgeSprites();
    shark.setCollider("rectangle",30,15,shark.width-150,shark.height-250);
}

function draw(){
    if(gameState === start){
        background(bg1);
         fill(255);
         textSize(30);
         text("Sharky is bored living in underwater caves of pacific ocean.", displayWidth/2-500, displayHeight/2-200);
         text("So he decided to leave on an adventure.", displayWidth/2-500, displayHeight/2-165)
         text("Be careful of dangers, you have to face them every second.", displayWidth/2-500, displayHeight/2-130)
         text("Use arrows to move the shark.", displayWidth/2-500, displayHeight/2-95)
         text("As soon you are touching medals click c to collect it.", displayWidth/2-500, displayHeight/2-60);
         text("Click p to start the game.", displayWidth/2-500, displayHeight/2-25)
         
         if(keyDown("p")){
            gameState = play;
        }
        }
    if(gameState === play){
        background(bg2);
        shark.visible=true;
        ml1.visible=true;
        ml2.visible=true;
        ml3.visible=true;
        ml4.visible=true;
        shark.bounceOff(edges);
        sharkyMove();
        medalCollect();
        if(medalCollected > 3){
            textSize(50);
            fill(0);
            chest.visible=true;
            //chest.addAnimation(winAnimation);
            text("YOU WON, press Y", displayWidth/2-200, displayHeight/2);
            text("Press R to restart", displayWidth/2-175, displayHeight/2+50);
            if(keyWentDown("y")){
                chest.addImage(c3);
            }
            if(keyWentDown("r")){
                reset();
            }
        }
       
        textSize(20);
        fill(0)
        if(medalCollected<4){
            fallingObstacles();
            text("Next falling obstacle in : "+timer+" seconds.", displayWidth/2-180, 100);
            if (frameCount % 100 === 0) {
                timer=timer-1;
            }
        }
        // animation();
        // if(lose>2){
        //     win=win-1;
        // }
        
        if(obstacleG.isTouching(shark)){
        gameState = end;
        }
      
    }
  if(gameState === end){
    background(bg3);
    shark.visible=false;
    obstacleG.setLifetimeEach(-1);
    obstacleG.setVelocityYEach(0);
    obstacleG.destroyEach();
    ml1.visible=false;
    ml2.visible=false;
    ml3.visible=false;
    ml4.visible=false;
    push();
    fill(255);
    textSize(50);
    text("YOU DIED", displayWidth/2-100, displayHeight/2);
    pop();

    push();
    fill(255);
    textSize(30);
    text("press 'R' to restart", displayWidth/2-100, displayHeight/2+50);
    pop();

     if(keyDown("r")){
            reset();
        }
  }
    drawSprites();
}
function sharkyMove(){
    if(keyDown("UP_ARROW")){
        shark.y=shark.y-7;
        shark.addImage(sharkImgUp);
        shark.setCollider("rectangle",15,-30,shark.width-50,shark.height+150);
    }
    if(keyWentUp("UP_ARROW")){
        shark.addImage(sharkImgRight);
        shark.setCollider("rectangle",30,15,shark.width+150,shark.height-50);
    }
    if(keyDown("DOWN_ARROW")){
        shark.y=shark.y+8;
        shark.addImage(sharkImgDown);
        shark.setCollider("rectangle",15,30,shark.width-50,shark.height+150);
    }
    if(keyWentUp("DOWN_ARROW")){
        shark.addImage(sharkImgLeft);
        shark.setCollider("rectangle",-30,15,shark.width+150,shark.height-50);
    }
    if(keyDown("LEFT_ARROW")){
        shark.x=shark.x-8;
        shark.addImage(sharkImgLeft);
        shark.setCollider("rectangle",-30,15,shark.width+150,shark.height-50);
    }
    if(keyDown("RIGHT_ARROW")){
        shark.x=shark.x+8;
        shark.addImage(sharkImgRight);
        shark.setCollider("rectangle",30,15,shark.width+150,shark.height-50);
    }
}
function medalCollect(){
    if(keyWentDown("C") && shark.x < ml1.x+100 && shark.y < ml1.y+100){
        medalCollected=medalCollected+1;
        l1 = l1+1;
        ml1.destroy();
    }
    if(keyWentDown("C") && shark.x < 200 && shark.y > 600){
        medalCollected=medalCollected+1;
        l2 = l2+1;
        ml2.destroy();
    }
    if(keyWentDown("C") && shark.x > 1100 && shark.y < 200){
        medalCollected=medalCollected+1;
        l3 = l3+1;
        ml3.destroy();
    }
    if(keyWentDown("C") && shark.x > 1100 && shark.y > 600){
        medalCollected=medalCollected+1;
        l4 = l4+1;
        ml4.destroy();
    }
    if(l1>1){
        medalCollected = medalCollected-1;
        l1=l1-1;
    }
    if(l2>1){
        medalCollected = medalCollected-1;
        l2=l2-1;
    }
    if(l3>1){
        medalCollected = medalCollected-1;
        l3=l3-1;
    }

    if(l4>1){
        medalCollected = medalCollected-1;
        l4=l4-1;
    }
}
function fallingObstacles(){
    var rand1 = Math.round(random(100, 1200));
    if(frameCount % 75 === 0){
        obstacle = createSprite(rand1, -200, 10, 10);
        obstacle.velocityY=10;
        var rand2 = Math.round(random(1,2));
        switch(rand2) {
            case 1: obstacle.addImage(obs1);
                    obstacle.scale=1.75;
                    obstacle.setCollider("rectangle",0,130,obstacle.width-50,obstacle.height-275);
              break;
            case 2: obstacle.addImage(obs2);
                    obstacle.scale=1.5;
            obstacle.setCollider("rectangle",0,0,obstacle.width-40,obstacle.height-40);
              break;
    }
        timer=1;
        obstacle.lifetime=100;
        obstacleG.add(obstacle);
        //obstacle.debug = true
    }
}
function reset(){
  gameState=start;
  medalCollected=0;
  shark.x=displayWidth/2;
  shark.y=displayHeight/2;
  shark.addImage(sharkImgRight);
  shark.setCollider("rectangle",30,15,shark.width+150,shark.height-50);
  shark.visible=false;
  chest.visible=false;
  chest.addImage(c1);
  l1=0;
  l2=0;
  l3=0;
  l4=0;
  ml1=createSprite(100, 100, 10, 10);
    ml1.addImage(m1);
    ml1.scale=1.2;
    ml1.visible=false;
    ml2=createSprite(100, 700, 10, 10);
    ml2.addImage(m2);
    ml2.scale=1.2;
    ml2.visible=false;
    ml3=createSprite(1200, 100, 10, 10);
    ml3.addImage(m3);
    ml3.scale=1.2;
    ml3.visible=false;
    ml4=createSprite(1200, 700, 10, 10);
    ml4.addImage(m4);
    ml4.scale=1.2;
    ml4.visible=false;
}
// function animation(){
//     if(medalCollected>3 && keyWentDown("y")){
//         win=win+1;
//         lose=lose+1;
//     }
//     if(medalCollected>3 && keyWentDown("a")){
//         win=win+1;
//         lost=lost+1;
//     }
// }