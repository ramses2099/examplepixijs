const Engine = function(time_step, render, update){
        
    

    this.start = function(){
        update();
        render();
    }
}

Engine.prototype ={
    constructor: Engine
}

export default Engine;
