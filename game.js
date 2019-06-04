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
var oldAngle;
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
            oldAngle = sprite.angle;
        } else {
        for (i = 0; i < track.length - 2; i += 2) {
            line1 = new Phaser.Geom.Line(track[i], track[i + 1], track[i + 2], track[i + 3]);
            line2 = new Phaser.Geom.Line(sprite.x, sprite.y, oldposX, oldposY);
            if(Phaser.Geom.Intersects.LineToRectangle(line2,rect)){
                time.stopImmediatePropagation();
            }
            var collisionPoint = new Phaser.Geom.Point(0, 0);
            if (Phaser.Geom.Intersects.LineToLine(line1, line2, collisionPoint)) {
                var velocity = new Phaser.Geom.Line(0, 0, sprite.body.velocity.x, sprite.body.velocity.y);
                console.log("Old velocity: " + velocity.toString());
                console.log("Collision at: " + collisionPoint.toString());
                sprite.angle =  Phaser.Geom.Line.ReflectAngle(line2, line1);
                console.log("New angle: " + sprite.angle);
                var len = Phaser.Geom.Line.Length(velocity)
                var vel2 = Phaser.Geom.Line.SetToAngle(velocity, 0, 0, sprite.angle, len/4);
                console.log("New velocity: " + vel2.toString());
                sprite.setVelocity(-vel2.x2, -vel2.y2);
                var x1 = vel2.x2*-0.001;
                var y1 = vel2.y2*-0.001;
                var Point = new Phaser.Geom.Point(x1,y1);
                var magnitude = Phaser.Geom.Point.GetMagnitude(Point);
                if(magnitude<1) {
                    sprite.x = collisionPoint.x + Phaser.Geom.Point.SetMagnitude(1);
                    sprite.y = collisionPoint.y + Phaser.Geom.Point.SetMagnitude(1);
                    if(!Phaser.Geom.Polygon.Contains(polygon, sprite.x, sprite.y)) {
                        sprite.x = collisionPoint.x - Phaser.Geom.Point.SetMagnitude(1);
                        sprite.y = collisionPoint.y - Phaser.Geom.Point.SetMagnitude(1);
                    }
                }
                sprite.angle= oldAngle;
                oldposX = sprite.x;
                oldposY = sprite.y;
                break;
            }
        }
            }
    this.physics.world.wrap(sprite, 32);
    text.setText("Time: " + time.toString().substr(0, 2));
}
