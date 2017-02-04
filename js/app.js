var playerX = 200;

var playerY = 400;

var playerLives = 5;

var points = 0;




//enemies our player must avoid


var Enemy = function() {

    this.sprite = 'images/enemy-bug.png';
    this.x = -100;
    this.y = Math.floor(Math.random() * (250 - 50 + 1) + 50);
    this.speed = Math.floor(Math.random() * (500 - 50 + 1) + 50);

};
// Variables applied to each of our instances go here,
// we've provided one for you to get started

// The image/sprite for our enemies, this uses
// a helper we've provided to easily load images

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks

Enemy.prototype.update = function(dt) {
    this.x = this.x + (dt * this.speed);
    if (this.x > 500) {
        this.x = -200;
        this.y = Math.floor(Math.random() * (250 - 50 + 1) + 50);
    };

    // Collison engine. If the player collides with an enemy,
    // the player resets to start position and loses one life.

    if (this.x - playerX < 100 && this.x - playerX > 0 && this.y - playerY < 50 && this.y - playerY > 0) {
        playerX = 200;
        playerY = 400;
        playerLives = playerLives - 1;
    };
    if (this.x - playerX < 100 && this.x - playerX > 0 && playerY - this.y < 50 && playerY - this.y > 0) {
        playerX = 200;
        playerY = 400;
        playerLives = playerLives - 1;
    };

};

// You should multiply any movement by the dt parameter
// which will ensure the game runs at the same speed for
// all computers.

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {

    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);


};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = playerX;
    this.y = playerY;
};

//If player makes it to the water, the game is over and player scores 100 points.

Player.prototype.update = function(dt) {
    this.x = playerX;
    this.y = playerY;
    if (playerY < 10) {

        points = points + 100;
    };

};

// Render the player's image to the screen

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Enable the player avatar to recieve input and move about the screen.

Player.prototype.handleInput = function(key) {
    switch (key) {

        case 'left':
            var moveLeft = playerX - 20;
            playerX = moveLeft;
            if (playerX <= 0) {
                playerX = 1;
            };
            break;
        case 'up':
            var moveUp = playerY - 20;
            playerY = moveUp;
            if (playerY < -10) {
                playerY = -10;
            };
            break;
        case 'right':
            var moveRight = playerX + 20;
            playerX = moveRight;
            if (playerX > 410) {
                playerX = 409;
            };
            break;
        case 'down':
            var moveDown = playerY + 20;
            playerY = moveDown;
            if (playerY > 430) {
                playerY = 429;
            };
            break;
    };
};

// A function to stop movement, called when the game is over.

var playerFreeze = function() {
    moveLeft = playerX - 0;
    moveUp = playerY - 0;
    moveRight = playerX + 0;
    moveDown = playerY + 0;

};

// The collectable items are blue gems that the player can collect by coliding with.

var Item = function() {

    this.sprite = 'images/Gem Blue.png';
    this.x = Math.floor(Math.random() * (400 - 20 + 1) + 20);
    this.y = Math.floor(Math.random() * (250 - 100 + 1) + 100);

}

// Once collison occurs, gem dissapears
// from screen and player score increases by 50 points.

Item.prototype.update = function() {
    this.x = this.x;
    this.y = this.y;

    if (this.x - playerX < 100 && this.x - playerX > 0 && this.y - playerY < 50 && this.y - playerY > 0) {

        points = points + 50;
        this.x = -100;
    };
    if (this.x - playerX < 50 && this.x - playerX > 0 && this.y === playerY) {

        points = points + 50;
        this.x = -100;
    };
};

// Draws the Gem images on screen.

Item.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Now instantiate your objects.

// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
// Gem collectables in an array called allItems.
var allEnemies = [new Enemy(), new Enemy(), new Enemy()];

var player = new Player();

var allItems = [new Item(), new Item, new Item()];


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