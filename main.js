/*---------------------------------------------------
LOAD DO
----------------------------------------------------*/
window.addEventListener("load", function (event) {
  "use strict";

  //IPO => input - process - output
  const update = function () {
    output.renderColor(procesor.getRandomColor());
  };

  //input
  const Input = function (fn) {
    this.handlerClick = function (event) {
        fn();
    };
  };

  Input.prototype ={
    constructor: Input
  }

  //process
  const Processor = function () {

    this.getRandomColor = function(){
        let color =Math.floor(Math.random() * 16777215).toString(16);
        return `#${color}`;
    }

  };

  Processor.prototype ={
    constructor: Processor
  }

  //output
  const Output = function (element) {

    this.element = element;

    this.renderColor = function(color){
        this.element.style.backgroundColor = color;
    }

  };

  Output.prototype ={
    constructor: Output
  }

  let input = new Input(update);
  let procesor = new Processor();
  let output = new Output(this.document.body);

  window.addEventListener("click", input.handlerClick);
});
