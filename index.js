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

    let textFps = 'none'
    const fps = new PIXI.Text(textFps, { fontFamily: 'Arial', fontSize: 24, fill: 0xffffff });
    fps.x = 10;
    fps.y = 10;
    app.stage.addChild(fps);



    










    /*------------------------------------------------------------------------------------------
    PIXI JS LOOP
    -------------------------------------------------------------------------------------------*/
    app.ticker.add((delta) => {
        textFps = `FPS ${delta.toFixed(2)}`;
        fps.text = textFps;




    });

})();