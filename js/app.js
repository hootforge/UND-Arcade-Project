// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = 1;
    this.y = 50;
    this.maxX = 420;
    this.rightward = true;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.


    if (this['rightward']){ // moving to the right
      this['x'] = this['x']+(dt*400);
      if (this['x'] > this['maxX']){
        this['rightward'] = false;
        this['y'] += 70;
        this['x'] = this['x']-(dt*400);
      }
    }
    else { // moving to the left
      this['x'] = this['x']-(dt*400);
      if (this['x'] <= 0) {
        this['rightward'] = true;
        this['y'] += 70;
        this['x'] = this['x']+(dt*400);
        if (allEnemies.length < 5){
        allEnemies.push(new Enemy);
      };
    }
    }

    if (this['y'] > 435 && allEnemies.length >= 5){
        console.log(allEnemies.shift());
      }

//checks for collission, resets player if a hit.
      if (player.x > (this['x']-50) &&
          player.x < (this['x']+50) &&
          player.y > (this['y']-40) &&
          player.y < (this['y']+40)){
        player.reset();
      }


  //  console.log(this);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class pLayer {
  constructor(){
    this.sprite = 'images/char-boy.png';
    this.x = 210;
    this.y = 435;
    this.maxX = 420;
    this.maxY = 435
  }
  update(dt){
    if (this.y > this.maxY) {this.y = this.maxY};
    if (this.x > this.maxX) {this.x = this.maxX};
    if (this.x < 0) {this.x = 0};
    if (this.y <= 0) {this.reset()};


  }

  render(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  handleInput(i){
    if (i=='left'){
      this.x -= 40;
    }
    if (i=='up'){
      this.y -= 40;
    }
    if (i=='right'){
      this.x += 40;
    }
    if (i=='down'){
      this.y += 40;
    }

    console.log(this);
  }

  reset(){
    this.x = 210;
    this.y = 435;
    allEnemies = [new Enemy];
  }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var enemy1 = new Enemy;
var allEnemies = [enemy1];
var player = new pLayer;



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
