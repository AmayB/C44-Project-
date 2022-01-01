var canvas;
var ironman, ironmanImg;
var sky, skyImg;
var robot, robotImg, robotGroup, trappedGirl, trappedGirlImg;
var play, titleScreenImg, titleScreen;
var gameState = "start";
var score = 0;
var backgroundMusic;

function preload() {
    ironmanImg = loadImage("Images/ironMan.png");
    skyImg = loadImage("Images/sky.jpg");
    robotImg = loadImage("Images/robot.png");
    trappedGirlImg = loadImage("Images/trappedGirl.png");
    backgroundMusic = loadSound("Images/backgroundMusic.mp3")
    titleScreenImg = loadImage("Images/titleScreen.jpg");
}

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    backgroundMusic.play();

    sky = createSprite(300,300);
    sky.addImage("sky",skyImg);
    sky.scale = 6;
    sky.velocityY = 1;

    titleScreen = createSprite(960,530,width,height);
    titleScreen.addImage("title", titleScreenImg);
    titleScreen.scale = 1;

    play = createImg('play.png');
    play.position(1200,300);
    play.size(500,500);
    play.mouseClicked(hide);

    ironman = createSprite(300,300,20,20);
    ironman.addImage(ironmanImg);
    ironman.scale = 0.3;
    ironman.visible = false;

    robotGroup = new Group();

    score = 0;
}

function draw() {
    background(200);
    if (gameState === "play") {
        score = score + Math.round(getFrameRate() / 60);
        ironman.visible = true;
        if(keyDown("RIGHT")) {
            ironman.x = ironman.x + 8;
        }
      
        if(keyDown("LEFT")) {
            ironman.x = ironman.x + -8;
        }
      
        if(keyDown("SPACE")) {
            ironman.velocityY = -10;
        }

        ironman.velocityY = ironman.velocityY + 0.8;

        if(sky.y > 1000){
            sky.y = 300;
        }

        spawnRobots();

        if (robotGroup.isTouching(ironman)) {
            gameState = "end";
          }
    }
    else if (gameState === "end") {
        ironman.velocityY = 0;
        sky.velocityY = 0;
    }
    drawSprites();
}

function spawnRobots() {
    if (frameCount % 30 === 0) {
        var robot = createSprite(600,-100,40,10);
        robot.x = Math.round(random(1800,40));
        robot.addImage(robotImg);
        robot.scale = 0.3;
        robot.velocityY = (6 + 3 * score / 100);
        robot.lifetime = 200;
        robot.depth = ironman.depth;
        ironman.depth = ironman.depth + 1;
        robotGroup.add(robot);
        robot.debug = true;
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
  
function hide() {
    play.visible = false;
    titleScreen.visible = false;
    gameState = "play";
}