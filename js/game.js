const Game = function () {
  this.world = {
    background_color: "0x1099bb", //'0x061639';

    friction: 0.9,
    gravity: 3,
    player: new Game.Player(),

    width: 600,
    height: 500,

    collideObject: function(object){
        if(object.x < 0){ object.x = 0; object.vx = 0; }
        else if (object.x + object.width > this.width) { object.x = this.width - object.width; }
        if(object.y < 0){object.y =0; object.vy = 0;}
        else if (object.y + object.height > this.height){ object.y = this.height - object.height; object.jumping = false;}
    },

    update: function(){
        this.player.vy += this.gravity;
        this.player.update();

        this.player.vx *= this.friction;
        this.player.vy *= this.friction;

        this.collideObject(this.player);

    }
  };

  this.update = function () {this.world.update();};
};

Game.prototype = {
  constructor: Game,
};

Game.Player = function (x, y) {
  this.color = "#ff0000";
  this.height = 32;
  this.width = 32;
  this.jumping = true;
  this.vx = 0;
  this.vy = 0;
  this.x = x || 100;
  this.y = y || 50;
  
};

Game.Player.prototype = {
  constructor: Game.Player,

  jump: function(){},

  moveLeft: function(){ this.vx -= 0.5;},
  moveRight: function(){ this.vy += 0.5;},

  update: function(){

    this.x += this.vx;
    this.y += this.vy;

  }
};

export default Game;
