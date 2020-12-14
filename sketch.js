var monkey, monkey_running;
var banana, bananaImage, obstacle, obstacleImage;
var bananaGroup, obstacleGroup;
var score;
var ground;
var invisibleGround;
var survivalTime = 0;
var bananaCount = 0;

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");

}



function setup() {
  createCanvas(600, 400);

  monkey = createSprite(100, 300, 10, 10)
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;

  ground = createSprite(50, 335, 1200, 10);

  invisibleGround = createSprite(50, 345, 1200, 10);
  invisibleGround.visible = false;

  bananaGroup = new Group();
  obstacleGroup = new Group();


}



function draw() {

  background("white");

  stroke("black");
  textSize(20);
  fill("black");
  survivalTime = Math.ceil(frameCount / frameRate());
  text("SurvivalTime:" + survivalTime, 100, 50);
  text("BananaCount:" + bananaCount, 350, 50);

  if (bananaGroup.isTouching(monkey)) {

    bananaGroup.destroyEach();
    bananaCount = bananaCount + 1;

  }
  
  /*was about to add the collision of monkey and obstacle
  but wasnt any gameover pic or any other pic to make the monkey 
  look animate after being touched or even a gameover pic*/
  
  /* if(obstacleGroup.isTouching(monkey)){  
   }*/

  ground.velocityX = -4;
  if (ground.x < 300) {
    ground.x = ground.width / 2;
  }
  console.log(monkey.y);

  if (keyDown("space") && monkey.y > 150) {
    monkey.velocityY = -10;
  }
  monkey.velocityY = monkey.velocityY + 0.5;

  monkey.collide(ground);

  food();
  obstacles();

  drawSprites();
}

function food() {

  if (frameCount % 80 === 0) {
    banana = createSprite(600, Math.round(random(120, 200)), 10, 10);
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -4;
    banana.lifetime = 150;
    bananaGroup.add(banana);
  }
}

function obstacles() {

  if (frameCount % 300 === 0) {

    obstacle = createSprite(500, 325, 10, 10);
    obstacle.addImage(obstaceImage);
    obstacle.scale = 0.1;
    obstacle.velocityX = -4;
    obstacle.collide(invisibleGround);
    obstacleGroup.add(obstacle);
  }
}