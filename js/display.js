const Display = function (app) {
  document.body.appendChild(app.view);

  this.handleResize = function (event) {};
  //
  this.render = function () {};
  //
  this.resize = function (w, h, h_w_ratio) {
    if (h / w > h_w_ratio) {
      app.renderer.view.height = w * ratio;
      app.renderer.view.width = w;
    } else {
      app.renderer.view.width = w / ratio;
      app.renderer.view.height = h;
    }
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
