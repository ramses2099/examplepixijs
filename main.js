import Controller from "./js/controller.js";
import Display from "./js/display.js";
import Engine from "./js/engine.js";
import Game from "./js/game.js";
/*---------------------------------------------------
PIXI 
----------------------------------------------------*/
const Application = PIXI.Application;

const CANVAS_WIDTH = 600,
  CANVAS_HEIGHT = 500;

const app = new Application({
  width: CANVAS_WIDTH,
  height: CANVAS_HEIGHT,
  antialias: true,
  transparent: false,
  resolution: 1,
});

/*---------------------------------------------------
LOAD DO
----------------------------------------------------*/
window.addEventListener("load", function (event) {
  "use strict";

  ///////////////////////////////////////////////////
  /////////////////FUNCTIONS////////////////////////
  /////////////////////////////////////////////////

  const render = function () {
    //TODO render
    display.renderColor(game.world.background_color);
    display.render();
  };

  const update = function () {
    if(controller.left.active){game.world.player.moveLeft();}
    if(controller.right.active){game.world.player.moveRight();}
    if(controller.up.active){}
    game.update();
  };

  const keyDownUp = function (event) {
    controller.keyDownUp(event.type, event.keyCode);
  };

  const resize = function(event){
    display.resize(document.documentElement.clientWidth, document.documentElement.clientHeight, game.world.height/game.world.width);
    display.render();
  }

  // controller
  let controller = new Controller();
  // display
  let display = new Display(app);
  // game
  let game = new Game();
  // engine
  let engine = new Engine(1000 / 30, render, update);

  ///////////////////////////////////////////////////
  /////////////////INITIALIZE///////////////////////
  /////////////////////////////////////////////////

  window.addEventListener("resize", resize);
  window.addEventListener("keydown", keyDownUp);
  window.addEventListener("keyup", keyDownUp);

  resize();
  engine.start();
});
