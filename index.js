import { Utils } from "./js/utils.js";
/*------------------------------------------------------------------------------------------
PIXI JS
-------------------------------------------------------------------------------------------*/
//IFFE
(() => {

    const canvasWidth = 800;
    const canvasHeight = 600;
    
    const app = new PIXI.Application({
        width: canvasWidth,
        height: canvasHeight
    });

    document.body.appendChild(app.view);
    /*------------------------------------------------------------------------------------------
    PIXI JS LOAD IMAGES
    -------------------------------------------------------------------------------------------*/
   
    const loader = PIXI.Loader.shared,
          resources = loader.resources,
          Sprite = PIXI.Sprite;
       
    loader.add('spritesheet','images/spritesheet.json').load(setup);         
    
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
    PIXI JS CLASS
    -------------------------------------------------------------------------------------------*/
   
    //enemy_C.png
    class EnemyC{
        constructor(texture){
            this.sprite = new Sprite(texture);
            this.sprite.anchor.set(0.5);
            this.sprite.x = Math.random() * canvasWidth;
            this.sprite.y = Math.random() * canvasHeight / 2;
            this.sprite.rotation = Math.PI;

            app.stage.addChild(this.sprite);                       
        }

        Update(){
            this.sprite.x += 1;
        }


    }
    
    /*------------------------------------------------------------------------------------------
    PIXI JS COLLISION DETECT
    -------------------------------------------------------------------------------------------*/
    
    
    /*------------------------------------------------------------------------------------------
    PIXI JS UTILS FUNCTION
    -------------------------------------------------------------------------------------------*/
    
    
    /*------------------------------------------------------------------------------------------
    PIXI JS START
    -------------------------------------------------------------------------------------------*/
    function setup(){
        
        let textures = resources['spritesheet'].textures;
        /*------------------------------------------------------------------------------------------
         PIXI JS INIT OBJECTS
         -------------------------------------------------------------------------------------------*/
        let enemyC = new EnemyC(textures['ship_A.png']);
        let enemyb = new EnemyC(textures['ship_B.png']);
        let enemyd = Utils.createObject(new Sprite(textures['ship_C.png']), app.stage, 50, 50);       
        

        


        /*------------------------------------------------------------------------------------------
        PIXI JS LOOP
        -------------------------------------------------------------------------------------------*/
        app.ticker.add((delta) => {
            textFps = `FPS ${delta.toFixed(2)}`;
            fps.text = textFps;

            Utils.move(enemyd, 2);







            enemyC.Update();


        });      
        
    }
    

})();