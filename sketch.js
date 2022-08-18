
let vx = 0, vy = 0;
let x = 200, y = 200, w = 20, h = 45;
let islands = [new Island(x, y + 80)];
let player;
let ani = 0;
let run = [];
let left = false;
let l = 5;
let obstacles = [];
let coins = [];
let moneys = 0;
let instruct = 1;
let coin, obstacle;


function preload(){
  islandImg = loadImage("assets/islandImg.png");
  coin = loadImage("assets/coin.png");
  obstacle = loadImage("assets/obstacle.png");
  for(let i = 1; i <= 8; i++){
    run.push(loadImage("assets/Run (" + i + ").png"));
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  x = width >> 1;
  y = height >> 1;
  islands = [new Island(x, y + 80)];
  rectMode(CENTER);
  imageMode(CENTER);
  player = {x: x, y: y, w: w, h: h};
  frameRate(45);
}

function st(){
  vx = 0, vy = 0;
  x = width >> 1, y = height >> 1, w = 20, h = 45;
  islands = [new Island(x, y + 80)];
  ani = 0;
  left = false;
  l = 5;
  obstacles = [];
  moneys = 0;
}

function draw() {
  background(255);

  vx = (keyIsDown(RIGHT_ARROW) - keyIsDown(LEFT_ARROW)) * 2;
  ani += abs(keyIsDown(RIGHT_ARROW) - keyIsDown(LEFT_ARROW)) / 4;
  if(ani > 7){
    ani = 0;
  }

  for(let j of islands){
    j.y--;
    if(collide(player, j) && keyIsDown(UP_ARROW)){
      vy = -5;
    }
    j.y++;
  }
  
  for(let i of islands){
    i.show();
  }
  for(let i of islands){
    if((!collide({x: player.x, y: player.y - vy, w: w, h: h}, i)) && vy > 0 && collide(player, i)){
      for(let j of obstacles){
        j.y -= vy;
      }

      for(let j of coins){
        j.y -= vy;
      }

      vy = 0;
      
      while(collide(player, i)){
        for(let j of islands){
          j.y++;
        }

        for(let j of obstacles){
          j.y++;
        }

        for(let j of coins){
          j.y++;
        }
      }
    }

    if(i.y < -2000){
      if(l <= 0){
        st();
        alert("YOU LOSE😭");
      }
      else{
        l--;
        for(let i of islands){
          i.y -= islands[0].y + y + 80;
          i.x -= islands[0].x + x;
        }
        for(let i of obstacles){
          i.y -= islands[0].y + y + 80;
          i.x -= islands[0].x + x;
        }
      }
    }
  }

  for(let i of obstacles){
    i.show();
    if(collide(player, i)){
      st();
      alert("YOU LOSE😭");
    }
  }

  for(let i in coins){
    coins[i].show();
    if(collide(player, coins[i])){
      coins[i] = null;
      moneys++;
    }
  }

  coins = clean(coins);
  text(moneys, 20, 20);

  if(keyIsDown(LEFT_ARROW)){
    left = true;
  }
  else if(keyIsDown(RIGHT_ARROW)){
    left = false;
  }
  else{
    ani = 0;
  }

  push();
  fill("#FFae00");
  if(left){
    scale(-1, 1);
    image(run[int(ani)], -x, y, w * 4, h * 1.5);
  }
  else{
    image(run[int(ani)], x, y, w * 4, h * 1.5);
  }
  pop();
  vy += 0.13;

  //infinite islands
  if(islands[islands.length-1].x < width){
    let r = random(0, PI - 0);
    let i = islands[islands.length-1];
    islands.push(new Island(i.x + sin(r) * 200, i.y + cos(r) * 100));
    r = random(0.5, PI - 0.5);
    i = islands[islands.length-2];
    obstacles.push(new Obstacle(islands[islands.length-2].x + sin(r) * random(50, 100), i.y - random(10, 80), 20, 20, obstacle));
    r = random(0.5, PI - 0.8);
    i = islands[islands.length-1];
    coins.push(new Obstacle(islands[islands.length-2].x + sin(r) * random(50, 100), i.y - random(10, 100), 20, 20, coin));
  }

  if(islands[0].x < -100){
    islands.splice(0,1);
  }
  
  if(obstacles[0].x < -100){
    obstacles.splice(0,1);
  }

  if(coins[0].x < -100){
    coins.splice(0,1);
  }
}

function collide(x, y){
  return abs(x.x - y.x) <= x.w / 2 + y.w / 2 && abs(x.y - y.y) < x.h / 2 + y.h / 2;
}

function clean(x){
  var y = [];
  for(let i of x){
    if(i){
      y.push(i);
    }
  }
  
  return y;
}

function keyPressed(){
  instruct = 0;
}

/*
let let let let let let let let let let let 
let let let let let let let let let let let 
let let let let let let let let let let let 
let let let let let let let let let let let 
let let let let let let let let let let let 
let let let let let let let let let let let 
let  the let let
*/
