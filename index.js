/*------------------------------------------------------------------------------------------
PIXI JS
-------------------------------------------------------------------------------------------*/
//IFFE
(() => {

    const canvasWidth = 800;
    const canvasHeight = 600;
    let keys = [];

    //
    let pointer = new Vector2(0,0);


    const app = new PIXI.Application({
        width: canvasWidth,
        height: canvasHeight
    });

    document.body.appendChild(app.view);

    let textFps = 'none'
    const fps = new PIXI.Text(textFps, { fontFamily: 'Arial', fontSize: 24, fill: 0xffffff });
    fps.x = 10;
    fps.y = 10;
    app.stage.addChild(fps);
    /*------------------------------------------------------------------------------------------
    PIXI JS KEYBOARD
    -------------------------------------------------------------------------------------------*/
    document.body.addEventListener('keydown', function (event) {
        keys[event.code] = true;
    });
    //
    document.body.addEventListener('keyup', function (event) {
        keys[event.code] = false;
    });
    /*------------------------------------------------------------------------------------------
    MOUSE EVENT
    -------------------------------------------------------------------------------------------*/
    const canva = document.querySelector('canvas');    


    canva.addEventListener('mousedown', function(event){
       pointer.add(Vector2(event.clientX, event.clientY));              
    });
    //
    canva.addEventListener('mouseup', function(event){
        pointer = new Vector2(0, 0);
    });
    //
    /*------------------------------------------------------------------------------------------
    UTILS MATH
    -------------------------------------------------------------------------------------------*/
    const getRandomNumber = (min, max) => {
        let n = Math.random() * (max - min) + min;
        return n;
    }

    let n = getRandomNumber(0.0200, 0.120);
    console.log(n);

    /*------------------------------------------------------------------------------------------
    PIXI JS CLASS
    -------------------------------------------------------------------------------------------*/
    class Mover{
        constructor(){
            this.location = new Vector2(25, 25);
            this.acceleration = new Vector2(0,0);
            this.velocity = new Vector2(0.25, 0);
            this.radius = 15;
            
            //graphics
            this.graphics = new PIXI.Graphics();
            this.graphics.x = this.location.x;
            this.graphics.y = this.location.y;
            app.stage.addChild(this.graphics);
 
            console.log(this.velocity);

            console.log(`Id ${+Date.now()}`);
            console.log(`Position (x, y) = [${this.graphics.x},${this.graphics.y}]`);
        }
        //
        Update() {
            this.Edges();

            pointer.subtract(this.location);            
            this.acceleration.scale(0.5);

            //
            this.velocity.add(this.acceleration);
            this.location.add(this.velocity); 
            
            //this.velocity.limit(1);
        }
        //
        Edges(){
            if(this.location.x > canvasWidth){
                this.location.x = 0;
            }
            //
            if(this.location.x < 0){
                this.location.x = canvasWidth;
            }
            //
            if(this.location.y > canvasHeight){
                this.location.y = 0;
            }
            //
            if(this.location.y < 0){
                this.location.y = canvasHeight;
            }
        }
        //
        Draw(){
            // Circle + line style 1
            this.graphics.clear();
            this.graphics.lineStyle(2, 0xFEEB77, 1);
            this.graphics.beginFill(0x650A5A, 1);
            this.graphics.drawCircle(this.location.x, this.location.y, this.radius);
            this.graphics.endFill();
        }

    }
    /*------------------------------------------------------------------------------------------
     PIXI JS INIT OBJECTS
     -------------------------------------------------------------------------------------------*/
    const boid = new Mover();

    /*------------------------------------------------------------------------------------------
    PIXI JS COLLISION DETECT
    -------------------------------------------------------------------------------------------*/
   

    /*------------------------------------------------------------------------------------------
    PIXI JS UTILS FUNCTION
    -------------------------------------------------------------------------------------------*/
   


    /*------------------------------------------------------------------------------------------
    PIXI JS LOOP
    -------------------------------------------------------------------------------------------*/
    app.ticker.add((delta) => {
        textFps = `FPS ${delta.toFixed(2)}`;
        fps.text = textFps;
        //

        
        


        //draw live
        boid.Update();
        boid.Draw();




    });

})();