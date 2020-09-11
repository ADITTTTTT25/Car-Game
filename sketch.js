var  database;
var form,game,player;
var gameState = 0;
var playerCount;
var allPlayers;
var car1,car2,car3,car4;
var cars;
var car1_img,car2_img,car3_img,car4_img;
var ground_img,track_img;
var carsAtEnd;

function preload(){
  car1_img = loadImage("images/car1.png");
  car2_img = loadImage("images/car2.png");
  car3_img = loadImage("images/car3.png");
  car4_img = loadImage("images/car4.png");
  ground_img = loadImage("images/track.png");
  track_img = loadImage("images/track.jpg");
}
function setup(){
  database = firebase.database();
  
  createCanvas(displayWidth - 30,displayHeight  - 30);

  
  game = new Game();
  game.getState();
  game.start();

}

function draw(){
  background("white");
  
  
    if(playerCount === 4 && gameState != 2){
       game.updateState(1);
     }

    if(gameState === 1){
      clear();
      game.play();
    }

    if(gameState === 2){
      game.end();
    }
    
    if(carsAtEnd === 4){
      clear();
      form.displayLeaderboard();
    }
}


