const Display = function (app) {
  document.body.appendChild(app.view);

  this.handleResize = function (event) {};
  //
  this.render = function () {};
  //
  this.resize = function (w, h, ratio) {
    app.renderer.view.width = w / ratio;
    app.renderer.view.height = h / ratio;
  };
  //
  this.renderColor = function (color) {
    app.renderer.backgroundColor = color;
  };
};

Display.prototype = {
  contructor: Display,
};

export default Display;
