const Game = function () {

    this.world = {
    background_color: "0x1099bb", //'0x061639';

    width: 600,
    height: 500,
  };

  this.update = function () {};
};

Game.prototype = {
  constructor: Game,
};

Game.Player = function (x, y) {
  this.color = "#ff0000";
  this.height = 16;
  this.jumping = true;
  this.vx = 0;
  this.vy = 0;
  this.x = x || 100;
  this.y = y || 50;
};

Game.Player.prototype ={
    constructor: Game.Player
}

export default Game;
