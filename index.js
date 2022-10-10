/*------------------------------------------------------------------------------------------
PIXI JS
-------------------------------------------------------------------------------------------*/
//IFFE
(() => {

    const canvasWidth = 800;
    const canvasHeight = 600;
    let keys = [];
    let ship = null;
    let bullets = [];
    let asteroids = [];
    let live = 3;
    let score = 100;

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
    PIXI JS CLASS
    -------------------------------------------------------------------------------------------*/
    class Ship {
        constructor() {
            this.visible = true;
            this.x = canvasWidth / 2;
            this.y = canvasHeight / 2;
            this.movingForward = false;
            this.speed = 0.1;
            this.vx = 0;
            this.vy = 0;
            this.rotateSpeed = 0.001;
            this.radius = 15;
            this.angle = 0;
            this.strokeColor = '0xffffff';
            this.fillColor = '0xAA4F08';
            this.nosex = canvasWidth / 2 + 15;
            this.nosey = canvasHeight / 2;
            //
            this.graphics = new PIXI.Graphics();
            app.stage.addChild(this.graphics);

        }
        //
        Update() {
            let radians = this.angle / Math.PI * 180;
            // oldx + cos(radians) + distances
            // oldy + sin(radians) + distances
            if (this.movingForward) {
                this.vx += Math.cos(radians) * this.speed;
                this.vy += Math.sin(radians) * this.speed;
            }
            //
            if (this.x < this.radius) {
                this.x = canvasWidth;
            }
            //
            if (this.x > canvasWidth) {
                this.x = this.radius;
            }
            //
            if (this.y < this.radius) {
                this.y = canvasHeight;
            }
            //
            if (this.y > canvasHeight) {
                this.y = this.radius;
            }
            //
            this.vx *= 0.99;
            this.vy *= 0.99;

            //
            this.x -= this.vx;
            this.y -= this.vy;

        }
        //
        Rotate(dir) {
            this.angle += this.rotateSpeed * dir;
        }
        //
        SetVisible(b){
            this.visible = b;
        }
        //
        Draw() {
            console.log(this.visible);
            if (this.visible) {
                this.graphics.clear();

                let vertAngle = ((Math.PI * 2) / 3);
                let radians = this.angle / Math.PI * 180;
                //
                this.nosex = this.x - this.radius * Math.cos(radians);
                this.nosex = this.y - this.radius * Math.sin(radians);
                this.graphics.beginFill(this.fillColor);
                this.graphics.lineStyle(1, this.strokeColor, 1);

                this.graphics.moveTo(this.x, this.y);

                for (let i = 0; i < 3; i++) {
                    this.graphics.lineTo((this.x - this.radius * Math.cos(vertAngle * i + radians)),
                        (this.y - this.radius * Math.sin(vertAngle * i + radians)));

                }

                this.graphics.closePath();
                this.graphics.endFill();
            }

        }

    }
    //
    class Bullet {
        constructor(angle) {
            this.visible = true;
            this.angle = angle;
            this.x = ship.nosex;
            this.y = ship.nosey;
            this.fillColor = '0xAA4F08';
            this.width = 4;
            this.height = 4;
            this.speed = 5;
            this.vx = 0;
            this.vy = 0;
            //
            this.graphics = new PIXI.Graphics();
            app.stage.addChild(this.graphics);
        }
        //
        Update() {
            let radians = this.angle / Math.PI * 100;
            this.x -= Math.cos(radians) * this.speed;
            this.y -= Math.sin(radians) * this.speed;

        }
        //
        Draw() {
            this.graphics.clear();
            this.graphics.beginFill(this.fillColor);
            this.graphics.drawRect(this.x, this.y, this.width, this.height);
            this.graphics.endFill();
        }

    }

    class Asteroid {
        constructor(x, y, radius, level, collisionRadius) {
            this.visible = true;
            this.angle = Math.floor(Math.random() * 359);
            this.x = x || Math.floor(Math.random() * canvasWidth);
            this.y = y || Math.floor(Math.random() * canvasHeight);
            this.fillColor = '0xAA4F08';
            this.radius = radius || 50;
            this.speed = 3;
            this.collisionRadius = collisionRadius || 46;
            this.level = level || 1;

            //
            this.graphics = new PIXI.Graphics();
            app.stage.addChild(this.graphics);
        }
        //
        Update() {
            let radians = this.angle / Math.PI * 100;
            this.x += Math.cos(radians) * this.speed;
            this.y += Math.sin(radians) * this.speed;

            //
            if (this.x < this.radius) {
                this.x = canvasWidth;
            }
            //
            if (this.x > canvasWidth) {
                this.x = this.radius;
            }
            //
            if (this.y < this.radius) {
                this.y = canvasHeight;
            }
            //
            if (this.y > canvasHeight) {
                this.y = this.radius;
            }

        }
        //
        Draw() {
            this.graphics.clear();
            this.graphics.beginFill(this.fillColor);
            let vertAngle = ((Math.PI * 2) / 6);
            let radians = this.angle / Math.PI * 180;
            //
            this.graphics.moveTo(this.x, this.y);

            for (let i = 0; i < 6; i++) {
                this.graphics.lineTo((this.x - this.radius * Math.cos(vertAngle * i + radians)),
                    (this.y - this.radius * Math.sin(vertAngle * i + radians)));

            }
            this.graphics.lineTo(this.x, this.y);

            this.graphics.closePath();
            this.graphics.endFill();
        }

    }


    /*------------------------------------------------------------------------------------------
     PIXI JS INIT OBJECTS
     -------------------------------------------------------------------------------------------*/
    ship = new Ship();

    for (let i = 0; i < 8; i++) {
        asteroids.push(new Asteroid());
    }

    /*------------------------------------------------------------------------------------------
    PIXI JS COLLISION DETECT
    -------------------------------------------------------------------------------------------*/
    function CircleCollision(p1x, p1y, r1, p2x, p2y, r2) {
        let radiusSum;
        let xDiff;
        let yDiff;
        radiusSum = r1 + r2;
        xDiff = p1x - p2x;
        yDiff = p1y - p2y;
        if (radiusSum > Math.sqrt(xDiff * xDiff) + (yDiff * yDiff)) {
            return true;
        } else {
            return false;
        }
    }

    /*------------------------------------------------------------------------------------------
    PIXI JS UTILS FUNCTION
    -------------------------------------------------------------------------------------------*/
    function DrawLifeShips() {
        let text = `Live : ${live}`
        const txtLive = new PIXI.Text(text, { fontFamily: 'Arial', fontSize: 24, fill: 0xffffff });
        txtLive.x = canvasWidth / 2 - txtLive.width;
        txtLive.y = 10;
        app.stage.addChild(txtLive);

        if (live === 0) {
            let text = 'GAME OVER';
            const txtGameOver = new PIXI.Text(text, { fontFamily: 'Arial', fontSize: 24, fill: 0xffffff });
            txtGameOver.x = canvasWidth / 2 - txtGameOver.width;
            txtGameOver.y = canvasHeight / 2;
            ship.SetVisible(false);
            app.stage.addChild(txtGameOver);
        }

    }

    function DrawScore() {
        let text = `Score : ${score}`
        const txtLScore = new PIXI.Text(text, { fontFamily: 'Arial', fontSize: 24, fill: 0xffffff });
        txtLScore.x = canvasWidth - txtLScore.width - 80;
        txtLScore.y = 10;
        app.stage.addChild(txtLScore);
    }




    /*------------------------------------------------------------------------------------------
    PIXI JS LOOP
    -------------------------------------------------------------------------------------------*/
    app.ticker.add((delta) => {
        textFps = `FPS ${delta.toFixed(2)}`;
        fps.text = textFps;

        //draw live
        DrawLifeShips();

        //score
        DrawScore();

        //keyboard input
        ship.movingForward = keys['ArrowUp'];
        if (keys['ArrowRight']) {
            ship.Rotate(1);
        }
        if (keys['ArrowLeft']) {
            ship.Rotate(-1);
        }
        if (keys['Space']) {
            bullets.push(new Bullet(ship.angle));
        }
        //keyboard input


        //collision detect
        if (asteroids.length !== 0) {
            for (let i = 0; i < asteroids.length; i++) {
          
            }
        }
        //


        if (asteroids.length !== 0) {
            for (let i = 0; i < asteroids.length; i++) {
                asteroids[i].Update();
                asteroids[i].Draw();
            }
        }
        //
        if (bullets.length !== 0) {
            for (let j = 0; j < bullets.length; j++) {
                bullets[j].Update();
                bullets[j].Draw();
            }
        }
        //ship
        ship.Update();
        ship.Draw();



    });

})();