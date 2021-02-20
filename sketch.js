
const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var player,player2;
var playerImg,playerImg1,playerImg2,playerImg3;
var rightFlag = false;
var leftFlag = false;

var player2RightFlag = false;
var player2LeftFlag = false;

var fireball,fireballImg;

var gameState = 0;

var border ;

var intro;
var box1;
var box

var introImg; 


var bar;
var border1;

var player2Img,player2Img1,player2Img2;

var engine,world;
var rect1 ,rect2,rect3,rect4;
var back,backImg;
var home1,home2;

var ground;
var brick;

var doorimg,door,doorimg1;
var displayDiamondFlag = true;


var dinoGroup;
var dino,dinoImg;
var wall;
var doorimg2;

var back2Img;

var player1Score = 0;
var player2Score = 0;
var doorFlag = true;
var bullet1,bullet2,bullet3,bullet4;
var bullet1Img,bullet2Img,bullet3Img,bullet4Img;

var player1RightBulletGroup,player1LeftBulletGroup;
var player2RightBulletGroup,player2LeftBulletGroup;

var player16Img;

var fireballGroup;



function preload(){
  // loading player image
  playerImg = loadImage("flash/plr1.png");
  playerImg1 = loadAnimation("flash/plr1.png","flash/plr2.png","flash/plr3.png","flash/plr4.png","flash/plr5.png","flash/plr6.png","flash/plr7.png");
  playerImg2 = loadAnimation("flash/plr8.png","flash/plr9.png","flash/plr10.png","flash/plr11.png","flash/plr12.png","flash/plr13.png","flash/plr14.png");
  playerImg3 = loadAnimation("flash/plr14.png");
  player16Img = loadAnimation("flash/player16.png")
   
    // loading player2 image
  player2Img = loadImage("flash/player1.png"); 
  player2Img1 = loadAnimation("flash/player1.png","flash/player2.png","flash/player3.png","flash/player4.png","flash/player5.png","flash/player6.png","flash/player7.png","flash/player8.png");
  player2Img2 = loadAnimation("flash/player9.png","flash/player10.png","flash/player11.png","flash/player12.png","flash/player13.png","flash/player14.png","flash/player15.png","flash/player16.png");
 
  //loading background 
  backImg = loadImage("wall.png");
  
 // loading the obsatcles
  fireballImg = loadAnimation("flash/fireball1.png","flash/fireball2.png","flash/fireball3.png","flash/fireball4.png","flash/fireball5.png",)
  dinoImg = loadAnimation("flash/dino1.png","flash/dino2.png","flash/dino3.png","flash/dino4.png","flash/dino5.png","flash/dino6.png","flash/dino7.png"); 

  //loading a brick
  brick = loadImage("flash/brick.png");

  //loading the intro
  introImg = loadImage("flash/introduction.png");


  //loading a bullet
  bullet1Img = loadImage("flash/bullet1.png");
  bullet2Img = loadImage("flash/bullet2.png");
  bullet3Img = loadImage("flash/bullet3.png");
  bullet4Img = loadImage("flash/bullet4.png");

  //loading the door
  
  doorimg = loadAnimation("flash/door1.png");
  doorimg2 = loadAnimation("flash/door6.png");
  doorimg1 = loadAnimation("flash/door1.png","flash/door2.png","flash/door3.png","flash/door4.png","flash/door5.png","flash/door6.png");  

  
}

function setup() {
  engine = Engine.create();
  world = engine.world;
   
  //createing the canvas
  createCanvas(displayWidth,displayHeight-100);
  
  //making bullet groups
  player1RightBulletGroup = new Group(); 
  player1LeftBulletGroup = new Group();

  player2RightBulletGroup = new Group(); 
  player2LeftBulletGroup = new Group();

  //creating intro
  intro  = createSprite(width/2,height/2,10,10);
  intro.addImage("introduction",introImg);
  intro.scale = 0.5;
  

  //making fireball group
  fireballGroup = new Group;
 
  //creating the box
  box = createSprite(10,10,10,10);
  boxGroup = new Group;

  // making background
  back  = createSprite(displayWidth/2,displayHeight/2,displayWidth,displayHeight);
  back.scale = 4;
  back.addImage("bk",backImg);
  //back.addImage("bck",back2Img);

  // creating some bars
  rect1 = createSprite(displayWidth/6 ,displayHeight/1.5,displayWidth/2,displayHeight/90);
  rect2 = createSprite(displayWidth/1.25,displayHeight/6,displayWidth/2,displayHeight/90)
  rect3 = createSprite(200,height/2,200,10);
  rect4 = createSprite(1220,height/2,200,10);

  //creating borders
  wall = createSprite(10,height/2,10,height);
  border = createSprite(1430,height/2,10,height);

  //creating a group for dino
  dinoGroup = createGroup();
  
  //creating a box`
  box1 = createSprite(700,600,100,10);
  box1.velocityX = -3;
  console.log(box.velocityX);
  
  
  //creating player
  player = createSprite(displayWidth/10,displayHeight/1.20,10,10); 
  player.scale = 0.3;
  player.addAnimation("stand",playerImg);
  player.addAnimation("run",playerImg1);
  player.addAnimation("back",playerImg2);
  player.addAnimation("backWords",playerImg3);

  
  //creating player2
  player2 = createSprite(displayWidth/1.20,displayHeight/10,10,10);
  player2.scale = 0.5;
  player2.addAnimation("standing",player2Img);
  player2.addAnimation("runing",player2Img1);
  player2.addAnimation("bck",player2Img2);
  player2.addAnimation("bk",player16Img);

//creating ground
  ground = createSprite(displayWidth/2,displayHeight-110,displayWidth,20);


//creating a door  
  door =  createSprite(width/2-100,height/2-100,20,20);
  door.addAnimation("closed",doorimg);
  door.addAnimation("open",doorimg1);
  door.addAnimation("opened",doorimg2);
  door.scale = 0.3;
  
  

  console.log(displayWidth);
  console.log(displayHeight);

 
 setInterval(function(){
  box.destroy();
  spawnDiamonds();
},10000);




}

function draw() {
 
    if(gameState === 0){
     console.log(gameState);
     
       
    if(keyDown("right")){
      player.x = player.x+5;
      player.changeAnimation("run",playerImg1);
      rightFlag = true;
      leftFlag = false;
      
    }else if(keyDown("left")){
     player.x = player.x-5;
     player.changeAnimation("back",playerImg2);
     rightFlag = false;
      leftFlag = true;
     
   }
     else{
       if(rightFlag){
        player.changeAnimation("stand",playerImg);
       }else if(leftFlag){
         player.changeAnimation("backWords",playerImg3);
       }
       
    }
  
    
  
    box1.bounceOff(rect1);
     box1.bounceOff(border);
  
     player.collide(box1);
     player.collide(rect4);
     player.collide(rect3);

     player2.collide(rect3);
     player2.collide(rect4);
     player2.collide(box1);
  
    if(keyDown("up")) {
      player.velocityY= -12;
    
      
    }
    player.velocityY = player.velocityY +0.7;
    
    if(keyDown("d")){
     player2.x = player2.x+5;
     player2.changeAnimation("runing",player2Img1);
     player2RightFlag = true;
     player2LeftFlag  = false;
     
   }else if(keyDown("a")){
    player2.x = player2.x-5;
    player2.changeAnimation("bck",player2Img2);
    player2RightFlag = false;
     player2LeftFlag  = true;
    
   } 
   else{
     if(player2RightFlag){
       player2.changeAnimation("standing",player2Img);
      }else if(player2LeftFlag){
        player2.changeAnimation("bk",player16Img);
      }
      
   }
   
   
   
   
   if(keyDown("w")) {
    player2.velocityY= -12;
   
    
   }
   
   
   
   player2.velocityY = player2.velocityY +0.7;
   
   
  {
  
    
    
    
   
  //player.collide(box);
   
  
  player2.depth = box.depth+1
  player.depth = box.depth+1
  
   createEdgeSprites();
  
   if(displayDiamondFlag){
   // spawnDiamonds();
    displayDiamondFlag = false;
  }
   
  if(player.isTouching(box) ){
  player1Score++;
  player.collide(box);
  box.destroy();
  
  }
  
  
  spawnDinos();
  if(player2.isTouching(box) ){
    player2Score++;
    player2.collide(box);
    box.destroy();
    
    }
  
    if(player1Score === 10 && doorFlag){
      door.changeAnimation("open",doorimg1);
      doorFlag = false;
      door.changeAnimation("opened",doorimg2);
      level = 2;
    }
   
    if(player.isTouching(dinoGroup)){
      
     // player.collide(dinoGroup);
     dinoGroup.destroyEach();
      player1Score = player1Score-1;
      
    
    }
    if(player.isTouching(fireballGroup)){
      
     // player.collide(dinoGroup);
     fireballGroup.destroyEach();
      player1Score = player1Score-1;
    }
    if(player2.isTouching(dinoGroup)){
      dinoGroup.destroyEach();   
     // player.collide(dinoGroup);
  
      player2Score = player2Score-1;
    
    }
    if(player2.isTouching(fireballGroup)){
      fireballGroup.destroyEach();
     // player.collide(dinoGroup);
      player2Score = player2Score-1;
    }
  
    if(player1LeftBulletGroup.isTouching(dinoGroup)){
    
      player1LeftBulletGroup.destroyEach();
      dinoGroup.destroyEach();
  
     }
     if(player1RightBulletGroup.isTouching(dinoGroup) ){
  
      player1RightBulletGroup.destroyEach();
      dinoGroup.destroyEach();
     }
     if(player2LeftBulletGroup.isTouching(dinoGroup)){
  
      player2LeftBulletGroup.destroyEach();
      dinoGroup.destroyEach();
     }
     if(player2RightBulletGroup.isTouching(dinoGroup) ){
      player2RightBulletGroup.destroyEach();
      dinoGroup.destroyEach();
     }
     if( player1LeftBulletGroup.isTouching(fireballGroup)){
  
      player1LeftBulletGroup.destroyEach();
      fireballGroup.destroyEach();
     }
     if(player1RightBulletGroup.isTouching(fireballGroup)){
      player1RightBulletGroup.destroyEach();
      fireballGroup.destroyEach();
     }
     if( player2LeftBulletGroup.isTouching(fireballGroup)){
  
      player2LeftBulletGroup.destroyEach();
      fireballGroup.destroyEach();
     }
     if( player2RightBulletGroup.isTouching(fireballGroup)){
  
      player2RightBulletGroup.destroyEach();
      fireballGroup.destroyEach();
     }
  
    if(player2.isTouching(dinoGroup)){
      //player2.collide(dinoGroup);
      player2Score = 0;
    } 
    
    if(keyWentDown("enter")){
      player1SpawnBullets();
    }
  
    if(keyWentDown("space")){
      player2SpawnBullets();
    }
      
    spawnFireball();
    
  
      
    }
  
    
    player2.collide(rect1);
  player2.collide(rect2);
  player2.collide(ground);
  
  //player.addAnimation("run",playerImg1);
  
  player.collide(rect1);
  player.collide(rect2);
  player.collide(ground);
    drawSprites();
    textSize(40);
  text("Player1 Score : " + player1Score,50,30);
  text("Player2 Score : " + player2Score,width-400,30);
  
     
      if (player1Score === player1Score-1){
        text("COME ON YOU CAN DO IT ",width/2,height/2);
    
      }
      if(player1Score === 10){
         gameState = 1;
        
      }
    
  
  }else if(gameState === 1){
    clear();
    if(player1Score === 10){
      text("PLAYER 1 HAS WON THE GAME",width/2,height/2);
    }
    
    if(player2score === 10){
      text("PLAYER 2 HAS WON THE GAME",width/2,height/2);
    }
    
  }

  
}

 function spawnDiamonds(){ 
   //box.destroy();


   var x =Math.round(random(10,width-100));
   var y =Math.round(random(10,height-100));
  
   box = createSprite(x,y,10,10);
   box.addImage(brick);
   box.scale = 0.2;
  
//debug
   //boxGroup.add(box);
  

  
}
function spawnDinos(){
  if (frameCount % 300 === 0) {
    dino = createSprite(10,Math.round(random(10,height-100)),10,10);
    dino.addAnimation("fly",dinoImg);
    dino.scale = 0.3;
    
   
    dino.velocityX = 3;
    
     //assign lifetime to the variable
    dino.lifetime = 500;
    
   
    dinoGroup.add(dino);
    console.log(dino.x);
}
}
function spawnFireball(){
  if (frameCount % 250 === 0) {
    fireball = createSprite(width,Math.round(random(10,height-100)),10,10);
    fireball.addAnimation("move",fireballImg);
    fireball.scale = 0.3;
    
   
    fireball.velocityX = -3;
    
     //assign lifetime to the variable
     fireball.lifetime = 500;
    
    fireballGroup.add(fireball);
    
}
}
  function player1SpawnBullets(){

   var bullet = createSprite(player.x,player.y,10,10);
   bullet.scale = 0.4;
   if(rightFlag){
     bullet.addImage(bullet1Img);
     bullet.velocityX = 4;
    
     player1RightBulletGroup.add(bullet);

   } else if(leftFlag) {
    bullet.addImage(bullet3Img);
    bullet.velocityX = -4;
   
    player1LeftBulletGroup.add(bullet);

   }


  } 
  function player2SpawnBullets(){
    var bullet = createSprite(player2.x,player2.y,10,10);
    bullet.scale = 0.4
    if(player2RightFlag){
      bullet.addImage(bullet2Img);
      bullet.velocityX = 4;
     
      player2RightBulletGroup.add(bullet);
 
    } else if(player2LeftFlag) {
     bullet.addImage(bullet4Img);
     bullet.velocityX = -4;
    
     player2LeftBulletGroup.add(bullet);
 
    }
 
 
   }
   function text(){
    
   }