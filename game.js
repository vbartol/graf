var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 1600,
    height: 1200,
    physics: {
        default: "arcade",
        arcade: {
            fps: 60,
            gravity: {y: 0}
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update

    }

};
var polygon;
var sprite;
var cursors;
var graphics;
var game = new Phaser.Game(config);
var track;
var text;
var elapsed;
var timer ;


    function preload ()
{
    this.load.image('bullet', 'assets/games/asteroids/bullets.png');
    this.load.image('ship', 'assets/games/asteroids/ship.png');
}

function create ()
{
        track = [400,600,1200,600,1200,100,50,100,50,390,250,390,250,250,920,250,920,450,400,450,400,600];
        polygon = new Phaser.Geom.Polygon(track);
        graphics = this.add.graphics({lineStyle:{width: 2, color: 0xaa6622}});
        graphics.moveTo(polygon.points[0].x, polygon.points[0].y);
        graphics.lineStyle(2, 0x00aa00);
        graphics.beginPath();

        for (var i = 1; i < polygon.points.length; i++)
        {
            graphics.lineTo(polygon.points[i].x, polygon.points[i].y);
        }
        graphics.closePath();
        graphics.strokePath();

        sprite = this.physics.add.image(500, 530, 'ship');
        sprite.setDamping(true);
        sprite.setDrag(0.99);
        sprite.setMaxVelocity(200);
        
        cursors = this.input.keyboard.createCursorKeys();
        text = this.add.text(10,20);
}

function update (time) {
    var finishLine = 440;
    if (Phaser.Geom.Polygon.Contains(polygon, sprite.x, sprite.y)) {
        if (cursors.up.isDown) {
            this.physics.velocityFromRotation(sprite.rotation, 200, sprite.body.acceleration);
        } else {
            sprite.setAcceleration(0);
        }

        if (cursors.left.isDown) {
            sprite.setAngularVelocity(-300);
        } else if (cursors.right.isDown) {
            sprite.setAngularVelocity(300);
        } else {
            sprite.setAngularVelocity(0);
        }


    } else {
        if(sprite.y>399) {
            if (sprite.y < 451 && sprite.x < 919) {
                sprite.x += 10;
                sprite.y += 30;
            }
            if (sprite.y > 599) {
                sprite.x += 10;
                sprite.y -= 30;
            }
            if (sprite.x > 1199) { //ova radi
                sprite.x -= 10;
            }
            if(sprite.x<405){
                sprite.x+=10;
            }
        }else{
            if(sprite.x>1199){
                sprite.x-=10;
            }
            if(sprite.x<920 && sprite.x>915 ){
                sprite.x+=10;
            }
            if(sprite.y<101){
                sprite.x-=10;
                sprite.y+=30;
            }
            if(sprite.y<255 && sprite.y>245){
                sprite.x-=10;
                sprite.y-=30;
            }
            if(sprite.x<255 && sprite.x>245){
                sprite.x-=10;
            }
            if(sprite.x<101){
                sprite.x+=10;
            }
            if(sprite.y>385 && sprite.y < 399 && sprite.x <255){
                sprite.y-=10;
                sprite.setAcceleration(0);
                time= timer.pause();
            }
        }
    }
        this.physics.world.wrap(sprite, 32);
        text.setText("Time: " + time.toString().substr(0,2));

}


