//create starting screen variables
var mode;
//Create Drawing variables
var canvas;
var context;
var mode;

//create input variables
var upKey;
var rightKey;
var downKey;
var leftKey;
var shootKey;
var startKey;

//create game variables
var gameLoop;
var player;
var borders = [];
var playerBullets = new Array();
var enemies = new Array();
var levelCount = 0;
var bulletCounter = 1;
var enemyKill = 0;


//Runs once page has loaded
window.onload = function startGame() {
  mode = 0;
  //Assign canvas and context variables
  canvas = document.getElementById('game-canvas');
  context = canvas.getContext('2d');

  //setup key listeners
  setupInputs();
  //create player
  player = new Player(640, 599);
  //create borders
  for(let i = -1; i<13; i++) {
    borders.push(new Border(0+100*i, 650, 100, 75, 1));
  }

  //start game gameLoop
  gameLoop = setInterval(step, 1000/30);
}

function start() {
  mode = 1;
  player.active = true;
  //Assign canvas and context variables
  canvas = document.getElementById('game-canvas');
  context = canvas.getContext('2d');

  //setup key listeners
  setupInputs();
  //create player
  player = new Player(640, 599);
  //create borders
  for(let i = -1; i<13; i++) {
    borders.push(new Border(0+100*i, 650, 100, 75, 1));
  }
  enemies = new Array();
  playerBullets = new Array();
  levelCount = 0;
  enemyKill = 0;
}

function createEnemies() {
  for(let i = 0; i<levelCount; i++) {
    if(i % 2 > 0) {
      enemies.push(new Enemy(1140, 599));
    } else {
      enemies.push(new Enemy(110, 599));
    }
  }
}

function step() {
  //Step Player
  player.step();
  //draw everything
  draw();
  if(mode == 1) {
    if(enemies.length <= 0) {
      levelCount++;
      createEnemies();
    }
  } else if(mode == 0) {
    context.font = "30px monospace";
    context.fillStyle = "white";
    context.fillText('Press ENTER To Start!', canvas.width/2 - 200, canvas.height/2-50);
  }
  if(startKey) {
    start();
  }
}

function draw() {

    //clear the canvas
    context.fillStyle = "#87CEEB";
    context.fillRect(0,0,1280,720);

    //create and update scoreboard
    drawLevel();
    drawKilled();

    //draw boxes for enemy spawn points
    context.rect(100, 575, 50, 75);
    context.stroke();

    context.rect(1130, 575, 50, 75);
    context.stroke();
    //draw the Player
    if(player.active) {
      player.draw();
    } else if (!player.active) {
      player.dead();
    }

    //draw the borders
    for (let i = 0; i<borders.length;i++) {
      borders[i].draw();
    }

    //print and animate player bullets
    for (let i = 0; i<playerBullets.length; i++) {
      playerBullets[i].draw();
      playerBullets[i].step();
    }

    if(player.active == false) {
      playerDead();
    }
    if(mode == 1) {
      //print every single enemy in level and animate them to chase character
      for (let i = 0; i<enemies.length; i++) {
        enemies[i].draw();
        enemies[i].step();
      }

      //check health of enemies and delete if zero
      for(let i = 0; i<enemies.length; i++) {
        if(enemies[i].health <= 0) {
          if(i == enemies.length-1) {
            enemies.pop();
          } else if (i == 0) {
            enemies.shift();
          } else {
            enemies.splice(enemies[i], 1);
          }
          enemyKill++;
        }
      }

    }
}

function drawLevel() {
  context.font = "25px monospace";
  context.fillStyle = "white";
  context.fillText('Level: '+ levelCount, 10, 40);
}

function drawKilled() {
  context.font = "25px monospace";
  context.fillStyle = "white";
  context.fillText('Killed: '+ enemyKill, 10, 80);
}


function playerDead() {
  context.fillStyle = "rgba(0,0,0,0.4)";
  context.fillRect(0,0,1280,720);

  context.font = "30px monospace";
  context.fillStyle = "white";
  context.fillText('You Died!', canvas.width/2 - 70, canvas.height/2-50);
  context.fillText('Killed: '+ enemyKill, canvas.width/2 - 70, canvas.height/2);
  context.fillText('Press ENTER to Try Again!', canvas.width/2 - 200, canvas.height/2+50)
}

function setupInputs() {
  document.addEventListener("keydown", function(event) {
    if(event.key === "w" || event.key === "ArrowUp") {
      upKey = true;
    } else if(event.key === "a" || event.key === "ArrowLeft") {
      leftKey = true;
    } else if(event.key === "s" || event.key === "ArrowDown") {
      downKey = true;
    } else if(event.key === "d" || event.key === "ArrowRight") {
      rightKey = true;
    } else if(event.key === "q") {
      shootKey = true;
    } else if(event.key === "Enter") {
      startKey = true;
    }
  });
  document.addEventListener("keyup", function(event) {
    if(event.key === "w" || event.key === "ArrowUp") {
      upKey = false;
    } else if(event.key === "a" || event.key === "ArrowLeft") {
      leftKey = false;
    } else if(event.key === "s" || event.key === "ArrowDown") {
      downKey = false;
    } else if(event.key === "d" || event.key === "ArrowRight") {
      rightKey = false;
    } else if (event.key === "q") {
      shootKey = false;
    } else if(event.key === "Enter") {
      startKey = false;
    }
  });
}

function swap(a, b) {
  var temp = a;
  a = b;
  b = temp;
}

function checkIntersection(r1, r2) {
  if (r1.x >= r2.x + r2.width) {
    return false;
  } else if (r1.x + r1.width <= r2.x) {
    return false;
  } else if (r1.y >= r2.y + r2.height) {
    return false;
  } else if (r1.y + r1.height <= r2.y) {
    return false;
  } else {
    return true;
  }
}
