var PLAY = 1;
var END = 0;
var gameState = PLAY;
var count = 0;
var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloudimage,cloudsGroup;
var obstacleimage1,obstacleimage2,obstacleimage3,obstacleimage4,obstacleimage5,obstacleimage6,obstaclegroup;
var gameover,gameoverimg;
var restart,restartimg;
function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png"); 
  groundImage = loadImage("ground2.png");
  cloudimage = loadImage("cloud.png");
  obstacleimage1 = loadImage("obstacle1.png");
  obstacleimage2 = loadImage("obstacle2.png");
  obstacleimage3 = loadImage("obstacle3.png");
  obstacleimage4 = loadImage("obstacle4.png");
  obstacleimage5 = loadImage("obstacle5.png");
  obstacleimage6 = loadImage("obstacle6.png");
  gameoverimg = loadImage("gameOver.png"); 
  restartimg = loadImage("restart.png");
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -2;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  cloudsGroup = new Group ();
  obstaclegroup = new Group();
  gameover = createSprite(300,100); 
  gameover.addImage(gameoverimg);
  gameover.scale = 0.5;
  gameover.visible =false;
  restart = createSprite(300,150);
  restart.addImage(restartimg);
  restart.scale = 0.5;
  restart.visible = false;
}

function draw() {
  background("white");  
  if(gameState === PLAY){
  //move the ground
  ground.velocityX = -(6 + 3*count/100);
  //scoring
  
  count = count + Math.round(World.frameRate/10);
    
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
   //jump when the space key is pressed
  if(keyDown("space") && trex.y >= 20){
    trex.velocityY = -10;
  }  
  
  //add gravity
  trex.velocityY = trex.velocityY + 0.8; 
  
  //spawn the clouds
  spawnclouds();
  
  //spawn obstacles
  spawnobstcles();
  
  //End the game when trex is touching the obstacle
  if(obstaclegroup.isTouching(trex)){
    gameState = END;
    //aySound("die.mp3");
  }
}

else if(gameState === END) {
  gameover.visible = true;
  restart.visible = true;
  
  //set velcity of each game object to 0
  ground.velocityX = 0;
  trex.velocityY = 0;
  obstaclegroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
  
  //change the trex animation
  trex.addImage(trex_collided);
  
  //set lifetime of the game objects so that they are never destroyed
  obstaclegroup.setLifetimeEach(-1);
  cloudsGroup.setLifetimeEach(-1);
  
  
}
    
  trex.collide(invisibleGround);
  spawnobstcles();
  drawSprites();
  
}
function spawnclouds(){
 if(World.frammeCount % 60 === 0){
   var cloud = createSprite(600,120,40,10);
   cloud.y =  Math.round(random(80,120));
   cloud.addImage (cloudimage);
   cloud.scale = 0.5;
   cloud.velocityX = -3;
   cloud.lifetime = 200;
   cloud.depth = trex.depth+1;
   cloudsGroup.add(cloud);
   
  } 
} 
function spawnobstcles(){
if(World.frameCount % 70  === 0){
   var obstacle = createSprite(600,170,40,10);
   //stacle.addImage (obstacle);
   obstacle.scale = 0.5;
   obstacle.velocityX = -6;
  var rand = Math.round(random(1,6));
  switch(rand){
      case 1:obstacle.addImage (obstacleimage1);
      break;
      case 2:obstacle.addImage (obstacleimage2);
      break;
      case 3:obstacle.addImage (obstacleimage3);
      break;
      case 4:obstacle.addImage (obstacleimage4);
      break;
      case 5:obstacle.addImage (obstacleimage5);
      break;
      case 6:obstacle.addImage (obstacleimage6);
      break;
  }   
   obstacle.lifetime = 200;
   obstacle.depth = trex.depth+1;
   obstaclegroup.add(obstacle);
   
  }   
  
}
