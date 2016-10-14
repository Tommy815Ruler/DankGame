/*global Phaser*/

var game = new Phaser.Game(1350, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });
var platforms;
var player;
var cursors;
var stars;
var scoreText = 0;
var score = 0;
function preload() {
    game.load.image('sky','assets/sky.png');
    game.load.image('ground','assets/platform.png');
    game.load.image('star','assets/star.png');
    game.load.spritesheet('dude','assets/dude.png',32,48);
    game.load.image('jamandham','assets/dankmemes.png')
    game.load.image('jamespoo','assets/jamandhamdank.png')
}

function create() {
    game.add.sprite(0,0,'jamandham');
    game.add.sprite(1200,0,'sky');
    platforms = game.add.group();
    platforms.enableBody = true;
    var ground = platforms.create(0, game.world.height - 64, 'ground');
    ground.scale.setTo(4,2);
    ground.body.immovable = true;
    var ledge = platforms.create(50, 100, 'ground');
    ledge.body.immovable = true;
    ledge.scale.setTo(0.3,0.5);
    game.physics.startSystem(Phaser.Physics.ARCADE);
    player = game.add.sprite(400, game.world.height - 1520, 'dude');
    game.physics.arcade.enable(player);
    player.body.bounce.y = 0.3;
    player.body.gravity.y = 950;
    player.body.collideWorldBounds = true;
    player.animations.add('left',[0,1,2,3],10,true);
    player.animations.add('right',[5,6,7,8],10,true);
    cursors = game.input.keyboard.createCursorKeys();
    stars = game.add.group();
    stars.enableBody = true;
    for (var i = 0; i < 12; i++){
        var star = stars.create(i * 70,0,'star');
        star.body.gravity.y = 900;
        star.body.bounce.y = 0.7 + Math.random() * 0.2;
    }
    scoreText = game.add.text(16,16, 'Score: 0',{fontSize: '32px',fill: '#00FFD7'});
}

function update() {
    var hitPlatform = game.physics.arcade.collide(player, platforms);
    player.body.velocity.x = 0;
    if(cursors.left.isDown){
        player.body.velocity.x = -150;
        player.animations.play('left');
    }else if(cursors.right.isDown){
        player.body.velocity.x = 150;
        player.animations.play('right');
    }else {
        player.animations.stop();
        player.frame = 4;
    }
    if (cursors.up.isDown && player.body.touching.down && hitPlatform){
        player.body.velocity.y = -500;
    }
    game.physics.arcade.collide(stars,platforms);
    game.physics.arcade.overlap(player, stars, collectStar, null, this);
    scoreText.text = "Score:" + score;
}
function collectStar(player,star){
    star.kill();
    score++;
    scoreText.text = "Score:" + score;
}