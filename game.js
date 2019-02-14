var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 1600,
    height: 1200,
    physics: {
        default: "arcade",
        arcade: {debug:true
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
var rect;
var i;
var line1;
var line2;
var point;
var oldposX;
var oldposY;
var angle;
var x1;
var x2;

function preload ()
{
    this.load.image('ship', 'ship.png');
}

function create ()
{
    //koordinate za stazu
    track = [400,600,1200,600,1215,590,1225,580,1235,570,1245,560,1255,550,1255,100,50,100,50,390,250,390,250,250,920,250,920,450,400,450,400,600];

    //kreiranje polygona
    polygon = new Phaser.Geom.Polygon(track);
    graphics = this.add.graphics({lineStyle:{width: 2, color: 0xaa6622}});
    graphics.moveTo(polygon.points[0].x, polygon.points[0].y);
    graphics.beginPath();

    for (var i = 1; i < polygon.points.length; i++)
    {
        graphics.lineTo(polygon.points[i].x, polygon.points[i].y);
    }

    graphics.closePath();
    graphics.strokePath();

    //kreiranje pravokutnika za cilj staze
    rect = new Phaser.Geom.Rectangle(50,370,200,20);
    graphics.strokeRectShape(rect);

    //kreiranje sprite-a sa assertom ship
    sprite = this.physics.add.image(500, 530, 'ship');
    sprite.setDamping(true);
    sprite.setDrag(0.99);
    sprite.setMaxVelocity(200);

    //dodavanje cursora za kordinate
    cursors = this.input.keyboard.createCursorKeys();
    text = this.add.text(10,20);
}

function update (time)
{

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
            oldposX = sprite.x;
            oldposY = sprite.y;

        }


    else {

        for (i = 0; i < track.length - 2; i += 2) {
                line1 = new Phaser.Geom.Line(track[i], track[i + 1], track[i + 2], track[i + 3]);
                line2 = new Phaser.Geom.Line(sprite.x, sprite.y, oldposX, oldposY);
            if(Phaser.Geom.Intersects.LineToRectangle(line2,rect)){
                    time.stopImmediatePropagation();
                }

                if (Phaser.Geom.Intersects.LineToLine(line1, line2)) {

                    if (sprite.x > 1190 && sprite.y > 100) {
                        sprite.setVelocity(-10, 0);
                        sprite.angle = -100;
                        continue;
                    }
                    if (sprite.x < 1195 && sprite.x > 915 && sprite.y < 500 && sprite.y > 110) {
                        sprite.setVelocity(20, 10);
                        sprite.angle = -80;
                        continue;
                    }
                    if (sprite.x < 55 && sprite.x > 45) {
                        sprite.setVelocity(20, 10);
                        sprite.angle = 80;
                        continue;
                    }
                    if (sprite.x > 60 && sprite.x < 255 && sprite.y<370) {
                        sprite.setVelocity(-20, 10);
                        sprite.angle = 100;
                        continue;
                    }
                    if (sprite.y < 300) {
                        if (sprite.y < 120) {
                            sprite.setVelocity(-10, 20);
                            sprite.angle = 170;
                            continue;
                        } else {
                            sprite.setVelocity(-10, -10);
                            sprite.angle = -170;
                            continue;
                        }
                    } else {
                        if (sprite.y > 590) {
                            sprite.setVelocity(10, -10);
                            sprite.angle = -10;
                            continue;
                        } else if (sprite.y>440) {
                            sprite.setVelocity(10, 10);
                            sprite.angle = 10;
                            continue;
                        }
                    }

                }
            }
        }


    this.physics.world.wrap(sprite, 32);
    text.setText("Time: " + time.toString().substr(0, 2));
}
