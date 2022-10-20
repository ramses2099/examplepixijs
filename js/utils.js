const Utils = Object.create({}) || {};


Utils.createObject = function(obj, stage, x, y, rotation = Math.PI,
    ax=0.5, ay=null, w =32, h=32){    
    setPosition(obj, x, y, rotation, ax, ay);
    obj.vx = 0;
    obj.vy = 0;
    stage.addChild(obj);
    return obj;
}

Utils.move = function(obj, speedX, speedY = 0){
    obj.vx = speedX;
    obj.vy = speedY;
    //
    obj.x += obj.vx;
    obj.y += obj.vy;
}


function setPosition(obj, x=0, y=0, rotation, ax=0.5, ay=null)
{
    if(ay == null) ay = ax;
    obj.anchor.set(ax);
    obj.x = x;
    obj.y = y;
    obj.rotation = rotation;
}

function setDimension(obj, w, h) {
    obj.width = w;
    obj.height = h;    
}

export { Utils };