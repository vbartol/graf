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
var i;
var j;
var k;
var z;
var rect;



    function preload ()
{
    this.load.image('ship', 'ship.png');
}

function create ()
{
        //koordinate za stazu
        track = [400,600,1200,600,1215,595,1230,590,1250,570,1270,550,1290,530,1290,100,50,100,50,390,250,390,250,250,920,250,920,450,400,450,400,600];

        //kreiranje polygona
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

        //kreiranje pravokutnika za cilj staze
        rect = new Phaser.Geom.Rectangle(50,320,200,70);
        graphics.strokeRectShape(rect);

        //kreiranje sprite-a sa assertom ship
        sprite = this.physics.add.image(500, 530, 'ship');
        sprite.body.collideWorldBounds = true;
        sprite.setBounce(1,1);
        sprite.setDamping(true);
        sprite.setDrag(0.99);
        sprite.setMaxVelocity(200);

        cursors = this.input.keyboard.createCursorKeys();
        text = this.add.text(10,20);
}

function update (time) {

    if (Phaser.Geom.Polygon.Contains(polygon, sprite.x, sprite.y)) {

        if (Phaser.Geom.Rectangle.ContainsPoint(rect, sprite)) {
            time.stopImmediatePropagation();

        }
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
        game.physics.arcade.collide(sprite,polygon)
            sprite.setBounce(1,1);
        }
    



        this.physics.world.wrap(sprite, 32);
        text.setText("Time: " + time.toString().substr(0, 4));


}
