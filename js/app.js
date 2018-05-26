// Sets an initial player score of 0.
var score = 0;
document.getElementById('playerScore').innerHTML = score;

// Enemies our player must avoid
var Enemy = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x=x;
    this.y=y;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x < 505) {
        this.x += (150 * dt);
    }
    else {this.x = -90;}

  // If the enemy and the player collide.
    if(this.x < player.x + 30 && this.x + 60 > player.x && this.y < player.y + 60 && this.y + 40 > player.y) {
      score = 0;
  		document.getElementById('playerScore').innerHTML = score;
      player.reset();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player=function(){
  this.sprite='images/char-boy.png';
  this.x=350;
  this.y=400;
}

Player.prototype.update=function (dt) {
  if(this.y<20){
    score++;
  	document.getElementById('playerScore').innerHTML = score;
    this.reset();
  }
};
Player.prototype.render=function(){
  ctx.drawImage(Resources.get(this.sprite),this.x,this.y);
};
//the origin point (0,0) is on the upper left hand side
Player.prototype.handleInput = function (direction) {
  if (direction=='left' & this.x>0) {
    this.x-=40;
    console.log('x pos: '+this.x);
  }
  if (direction=='right' & this.x<400) {
    this.x+=40;
    console.log('x pos: '+this.x);
  }
  if (direction=='up' & this.y>0) {
    this.y-=40;
    console.log('y pos: '+this.y);
  }
  if (direction=='down' & this.y<400) {
    this.y+=40;
    console.log('y pos: '+this.y);
  }
};
// Is called when the player is reset to the starting point
Player.prototype.reset = function() {
    this.x = 200;
    this.y = 380;
};
// Now instantiate your objects.
var enemy1 = new Enemy(-90, 60);
var enemy2 = new Enemy(-190, 140);
var enemy3 = new Enemy(-290, 230);
var enemy4 = new Enemy(-390, 140);
var enemy5 = new Enemy(-490, 60);
var enemy6 = new Enemy(-890, 230);
// Place all enemy objects in an array called allEnemies
var allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6];
// Place the player object in a variable called player
var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
