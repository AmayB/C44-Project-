//ghost runner game!

var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"
var gameover, gameoverImg;

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
  gameoverImg = loadImage("game_over.png");
}

function setup() {
  createCanvas(600, 600);
  spookySound.loop();
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

  gameover = createSprite(300,300);
  gameover.addImage("gameover", gameoverImg);
  gameover.scale = 0.5;
  gameover.visible = false;

  ghost = createSprite(300,300,20,20);
  ghost.addImage(ghostImg);
  ghost.scale = 0.3;

  ghost.debug = true;
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
}

function draw() {
  background(200);


  if (gameState === "play") {

    if(keyDown("RIGHT")) {
      ghost.x = ghost.x + 4;
    }

    if(keyDown("LEFT")) {
      ghost.x = ghost.x + -4;
    }

    if(keyDown("SPACE")) {
      ghost.velocityY = -10;
    }

    ghost.velocityY = ghost.velocityY + 0.8;

    spawnDoors();

    if(tower.y > 400){
      tower.y = 300;
    }

    if(climbersGroup.isTouching(ghost)) {
      ghost.velictyX = 0;
    }

    if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600) {
      ghost.destroy();
      gameState = "end";
    }

    if(gameState === "end") {
      gameover.visible = true;
    }

  }



  drawSprites();
}

function spawnDoors() {
  if(frameCount % 240 === 0) {
    var door = createSprite(200,-50);
    var climber = createSprite(200,10);
    var invisibleBlock = createSprite(200,10);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;

    door.x = Math.round(random(120,400)); 
    climber.x = door.x;
    invisibleBlock.x = door.x


    door.addImage(doorImg);
    climber.addImage(climberImg);

    door.velocityY = 1;
    climber.velocityY = 1;
    invisibleBlock.velocityY = 1;

    ghost.depth = door.depth;
    ghost.depth = ghost.depth + 1;

    door.lifetime = 800;
    climber.lifetime = 800;
    invisibleBlock.lifetime = 800;

    invisibleBlock.debug = true;

    invisibleBlockGroup.add(invisibleBlock);
    climbersGroup.add(climber);
    doorsGroup.add(door);
  }
}